import { NextRequest, NextResponse } from "next/server";
import { luximaApi } from "@/lib/luxima-api";

export async function GET(request: NextRequest) {
  const token =
    request.cookies.get("luxima_auth_token")?.value ||
    request.headers.get("authorization")?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
  }

  const verifyResult = await luximaApi.auth.verify(token);

  if (verifyResult.success) {
    return NextResponse.json({
      authenticated: true,
      tenantId: "bydaisy",
      organizationId: "luxima-awedz-ent-01",
      user: {
        name: "Daisy Iskandar",
        email: "concierge@bydaisy.com",
        role: "Enterprise Owner & Lead Planner",
      },
      source: verifyResult.source,
    });
  }

  return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
}
