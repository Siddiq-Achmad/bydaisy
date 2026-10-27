import { NextRequest, NextResponse } from "next/server";
import { luximaApi } from "@/lib/luxima-api";
import { BYDAISY_ENTERPRISE_CONFIG } from "@/lib/enterprise";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const payload = await request.json();

    // Verify event payload structure
    if (!payload.eventId && !payload.title) {
      return NextResponse.json({ success: false, error: "eventId or title required" }, { status: 400 });
    }

    const result = await luximaApi.calendar.getAll();
    const events = result.data || [];
    const existing = events.find((e: any) => e.id === payload.eventId || e.title === payload.title);

    let resultAction = "created";
    if (existing) {
      await luximaApi.calendar.update(existing.id, {
        ...existing,
        ...payload,
        awedzSynced: true,
        lastAwedzUpdate: new Date().toISOString(),
      });
      resultAction = "updated";
    } else {
      const newEvent = {
        id: payload.eventId || `ev-${Date.now()}`,
        title: payload.title || payload.weddingTitle,
        type: payload.type || payload.eventType || "hari-h",
        date: payload.date || "TBD",
        time: payload.time || "09.00 - 17.00 WIB",
        venue: payload.venue || "Banda Aceh",
        package: payload.package || payload.packageTier || "All-In Signature",
        crewCount: payload.crewCount || "10 Personil",
        lead: payload.lead || payload.leadPlanner || "Daisy Iskandar",
        notes: `[Inbound via Awedz Hub]: ${payload.notes || "Auto-synced from Awedz HQ"}`,
        awedzSynced: true,
        createdAt: new Date().toISOString(),
      };
      await luximaApi.calendar.create(newEvent);
    }

    return NextResponse.json({
      success: true,
      message: `Event successfully ${resultAction} via Awedz Event Platform Sync`,
      tenantId: BYDAISY_ENTERPRISE_CONFIG.tenantId,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process Awedz inbound webhook" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "active",
    bridge: "ByDaisy Enterprise Bridge for AWEDZ Event Platform",
    tenantId: BYDAISY_ENTERPRISE_CONFIG.tenantId,
    mode: "two-way-sync",
    endpoint: "/api/integrations/awedz-sync",
  });
}
