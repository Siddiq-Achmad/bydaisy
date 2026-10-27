import { NextRequest, NextResponse } from "next/server";
import { handleInboundLuximaLead } from "@/lib/integrations";
import { BYDAISY_ENTERPRISE_CONFIG } from "@/lib/enterprise";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const tenantHeader = request.headers.get("x-tenant-id");

    // Enterprise security check
    const expectedSecret = BYDAISY_ENTERPRISE_CONFIG.luximaBridge.webhookSecret;
    if (authHeader && !authHeader.includes(expectedSecret) && !authHeader.includes("Bearer")) {
      return NextResponse.json({ success: false, error: "Unauthorized webhook signature" }, { status: 401 });
    }

    const payload = await request.json();
    const result = await handleInboundLuximaLead(payload);

    return NextResponse.json({
      success: true,
      message: `Lead successfully ${result.action} via Luxima CRM Sync`,
      data: result.lead,
      tenantId: tenantHeader || BYDAISY_ENTERPRISE_CONFIG.tenantId,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process Luxima inbound webhook" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "active",
    bridge: "ByDaisy Enterprise Bridge for LUXIMA CRM",
    tenantId: BYDAISY_ENTERPRISE_CONFIG.tenantId,
    mode: "two-way-sync",
    endpoint: "/api/integrations/luxima-sync",
  });
}
