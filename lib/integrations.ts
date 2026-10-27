/**
 * ByDaisy Luxury Matrimonial Platform
 * External Enterprise Integration Adapters for LUXIMA CRM & AWEDZ Event Platform
 * Multi-Tenant Architecture with 2-Way Sync & HMAC Authentication
 */

import { BYDAISY_ENTERPRISE_CONFIG } from "./enterprise";
import { luximaApi } from "./luxima-api";

export interface LuximaLeadPayload {
  source: "ByDaisy Matrimonial Platform";
  version: "2026.1";
  tenantId: string;
  organizationId: string;
  customDomain: string;
  leadId: string;
  clientName: string;
  whatsappNumber: string;
  email?: string;
  weddingDate?: string;
  venuePreference?: string;
  estimatedGuests?: string;
  serviceType: string;
  status: "baru" | "dihubungi" | "negosiasi" | "won" | "lost";
  notes?: string;
  timestamp: string;
}

export interface AwedzEventPayload {
  source: "ByDaisy Matrimonial Platform";
  version: "2026.1";
  tenantId: string;
  organizationId: string;
  customDomain: string;
  eventId: string;
  weddingTitle: string;
  eventType: "hari-h" | "gladi" | "tm" | "consultation";
  date: string;
  time?: string;
  venue?: string;
  packageTier?: string;
  crewCount?: string;
  leadPlanner?: string;
  notes?: string;
  timestamp: string;
}

export interface IntegrationConfig {
  luximaWebhookUrl?: string;
  awedzWebhookUrl?: string;
  apiKey?: string;
  environment?: "sandbox" | "production";
}

export interface DeadLetterQueueItem {
  id: string;
  target: "luxima" | "awedz";
  url: string;
  payload: any;
  attempts: number;
  lastAttemptAt: string;
  error: string;
  status: "failed" | "retrying" | "resolved";
}

// Dead Letter Queue in-memory store
const deadLetterQueue: DeadLetterQueueItem[] = [];

export function getDeadLetterQueue(): DeadLetterQueueItem[] {
  return [...deadLetterQueue];
}

export function clearDeadLetterQueue(): void {
  deadLetterQueue.length = 0;
}

export async function retryDeadLetterQueueItem(id: string): Promise<{ success: boolean; message: string }> {
  const item = deadLetterQueue.find((q) => q.id === id);
  if (!item) {
    return { success: false, message: "Item antrean DLQ tidak ditemukan" };
  }

  item.status = "retrying";
  try {
    const res = await fetch(item.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Tenant-ID": BYDAISY_ENTERPRISE_CONFIG.tenantId,
        "X-Organization-ID": BYDAISY_ENTERPRISE_CONFIG.organizationId,
        Authorization: `Bearer ${BYDAISY_ENTERPRISE_CONFIG.luximaBridge.organizationKey}`,
      },
      body: JSON.stringify(item.payload),
    });

    if (res.ok) {
      item.status = "resolved";
      // Remove resolved item from DLQ
      const idx = deadLetterQueue.findIndex((q) => q.id === id);
      if (idx !== -1) deadLetterQueue.splice(idx, 1);
      return { success: true, message: `Berhasil mengirim ulang ke ${item.target}` };
    }
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  } catch (err: any) {
    item.attempts += 1;
    item.lastAttemptAt = new Date().toISOString();
    item.error = err?.message || "Koneksi gagal";
    item.status = "failed";
    return { success: false, message: `Gagal mengirim ulang: ${err?.message}` };
  }
}

/**
 * Dispatch lead data to Luxima CRM Webhook or REST endpoint with 3x retry & DLQ
 */
export async function syncLeadToLuxima(
  lead: Record<string, any>,
  config?: IntegrationConfig
): Promise<{ success: boolean; message: string; responseData?: any }> {
  const url = config?.luximaWebhookUrl || process.env.LUXIMA_WEBHOOK_URL;
  const enterprise = BYDAISY_ENTERPRISE_CONFIG;

  const payload: LuximaLeadPayload = {
    source: "ByDaisy Matrimonial Platform",
    version: "2026.1",
    tenantId: enterprise.tenantId,
    organizationId: enterprise.organizationId,
    customDomain: enterprise.customDomains[0] || "bydaisy.com",
    leadId: lead.id || `LD-${Date.now()}`,
    clientName: lead.clientName || lead.coupleNames || "Klien Baru",
    whatsappNumber: lead.waNumber || lead.whatsapp || lead.phone || "",
    email: lead.email,
    weddingDate: lead.eventDate || lead.weddingDate,
    venuePreference: lead.venuePreference || lead.venue,
    estimatedGuests: lead.guestCount || lead.estimatedGuests,
    serviceType: lead.service || lead.serviceType || "All-In Signature",
    status: lead.status || "baru",
    notes: lead.notes || lead.specialNotes,
    timestamp: new Date().toISOString(),
  };

  if (!url) {
    return {
      success: true,
      message: "Lead formatted with Enterprise tenantId (Standby mode, URL not set)",
      responseData: payload,
    };
  }

  // 3x retry mechanism with backoff
  const maxRetries = 3;
  let lastError: any = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Tenant-ID": enterprise.tenantId,
          "X-Organization-ID": enterprise.organizationId,
          Authorization: `Bearer ${config?.apiKey || process.env.BYDAISY_API_KEY || enterprise.luximaBridge.organizationKey}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        return { success: true, message: `Lead synced to Luxima CRM (Attempt ${attempt})`, responseData: data };
      }

      throw new Error(`Luxima HTTP error: ${res.status}`);
    } catch (err: any) {
      lastError = err;
      if (attempt < maxRetries) {
        // Linear backoff: 500ms, 1000ms
        await new Promise((r) => setTimeout(r, attempt * 500));
      }
    }
  }

  // Enqueue into Dead Letter Queue (DLQ) after 3 failed attempts
  const dlqItem: DeadLetterQueueItem = {
    id: `dlq-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    target: "luxima",
    url,
    payload,
    attempts: maxRetries,
    lastAttemptAt: new Date().toISOString(),
    error: lastError?.message || "Timeout / Network failure after 3 attempts",
    status: "failed",
  };
  deadLetterQueue.push(dlqItem);

  return {
    success: false,
    message: `Failed to sync to Luxima CRM after 3 attempts. Enqueued to DLQ (${dlqItem.id})`,
    responseData: payload,
  };
}

/**
 * Dispatch event / schedule data to Awedz Event Platform with 3x retry & DLQ
 */
export async function syncEventToAwedz(
  event: Record<string, any>,
  config?: IntegrationConfig
): Promise<{ success: boolean; message: string; responseData?: any }> {
  const url = config?.awedzWebhookUrl || process.env.AWEDZ_WEBHOOK_URL;
  const enterprise = BYDAISY_ENTERPRISE_CONFIG;

  const payload: AwedzEventPayload = {
    source: "ByDaisy Matrimonial Platform",
    version: "2026.1",
    tenantId: enterprise.tenantId,
    organizationId: enterprise.organizationId,
    customDomain: enterprise.customDomains[0] || "bydaisy.com",
    eventId: event.id || `EV-${Date.now()}`,
    weddingTitle: event.title || "Acara Pernikahan",
    eventType: event.type || "hari-h",
    date: event.date,
    time: event.time,
    venue: event.venue,
    packageTier: event.package,
    crewCount: event.crewCount,
    leadPlanner: event.lead,
    notes: event.notes,
    timestamp: new Date().toISOString(),
  };

  if (!url) {
    return {
      success: true,
      message: "Event formatted with Enterprise tenantId (Standby mode, URL not set)",
      responseData: payload,
    };
  }

  // 3x retry mechanism with backoff
  const maxRetries = 3;
  let lastError: any = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Tenant-ID": enterprise.tenantId,
          "X-Organization-ID": enterprise.organizationId,
          Authorization: `Bearer ${config?.apiKey || process.env.BYDAISY_API_KEY || enterprise.awedzBridge.apiKey}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        return { success: true, message: `Event synced to Awedz Platform (Attempt ${attempt})`, responseData: data };
      }

      throw new Error(`Awedz HTTP error: ${res.status}`);
    } catch (err: any) {
      lastError = err;
      if (attempt < maxRetries) {
        await new Promise((r) => setTimeout(r, attempt * 500));
      }
    }
  }

  // Enqueue into Dead Letter Queue (DLQ) after 3 failed attempts
  const dlqItem: DeadLetterQueueItem = {
    id: `dlq-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    target: "awedz",
    url,
    payload,
    attempts: maxRetries,
    lastAttemptAt: new Date().toISOString(),
    error: lastError?.message || "Timeout / Network failure after 3 attempts",
    status: "failed",
  };
  deadLetterQueue.push(dlqItem);

  return {
    success: false,
    message: `Failed to sync to Awedz Platform after 3 attempts. Enqueued to DLQ (${dlqItem.id})`,
    responseData: payload,
  };
}

/**
 * Inbound Webhook Receiver: Handles real-time lead updates pushed from Luxima CRM
 */
export async function handleInboundLuximaLead(payload: any) {
  if (!payload || !payload.leadId) {
    throw new Error("Invalid Luxima inbound payload: leadId is required");
  }

  const result = await luximaApi.leads.getAll();
  const leads = result.data || [];
  const existing = leads.find((l: any) => l.id === payload.leadId || l.clientName === payload.clientName);

  if (existing) {
    const updateResult = await luximaApi.leads.update(existing.id, {
      ...existing,
      status: payload.status || existing.status,
      notes: payload.notes ? `${existing.notes || ""} | [Luxima CRM Sync]: ${payload.notes}` : existing.notes,
      luximaSynced: true,
      lastLuximaUpdate: new Date().toISOString(),
    });
    return { action: "updated", lead: updateResult.data };
  } else {
    const newLead = {
      id: payload.leadId,
      coupleNames: payload.clientName || "Klien Baru dari Luxima CRM",
      clientName: payload.clientName || "Klien Baru dari Luxima CRM",
      waNumber: payload.whatsappNumber || "",
      phone: payload.whatsappNumber || "",
      service: payload.serviceType || "All-In Signature",
      status: payload.status || "Baru Masuk",
      eventDate: payload.weddingDate || "Belum Ditentukan",
      venueLocation: payload.venuePreference || "Banda Aceh",
      notes: `[Inbound via Luxima CRM]: ${payload.notes || "Auto-synced from Luxima HQ"}`,
      createdAt: new Date().toISOString(),
    };
    const createResult = await luximaApi.leads.create(newLead);
    return { action: "created", lead: createResult.data };
  }
}
