import { NextRequest, NextResponse } from "next/server";
import { luximaApi } from "@/lib/luxima-api";

export async function GET() {
  const result = await luximaApi.settings.get();
  return NextResponse.json({ success: true, data: result.data, source: result.source });
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await luximaApi.settings.update(body);
    return NextResponse.json({
      success: true,
      message: "Pengaturan studio berhasil diperbarui via LUXIMA-API",
      data: result.data,
      source: result.source,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
