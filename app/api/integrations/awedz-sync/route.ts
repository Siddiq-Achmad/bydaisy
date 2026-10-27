import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { BYDAISY_ENTERPRISE_CONFIG } from "@/lib/enterprise";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const payload = await request.json();

    // Verify event payload structure
    if (!payload.eventId && !payload.title) {
      return NextResponse.json({ success: false, error: "eventId or title required" }, { status: 400 });
    }

    const events = await db.calendar.getAll();
    const index = events.findIndex((e: any) => e.id === payload.eventId || e.title === payload.title);

    let resultAction = "created";
    if (index !== -1) {
      events[index] = {
        ...events[index],
        ...payload,
        awedzSynced: true,
        lastAwedzUpdate: new Date().toISOString(),
      };
      await db.calendar.saveAll(events);
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
      events.unshift(newEvent);
      await db.calendar.saveAll(events);
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
