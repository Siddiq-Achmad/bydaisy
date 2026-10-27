import { NextRequest, NextResponse } from "next/server";
import { luximaApi } from "@/lib/luxima-api";

export async function GET() {
  const result = await luximaApi.consultations.getAll();
  const items = result.data || [];
  return NextResponse.json({ success: true, count: items.length, data: items, source: result.source });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.coupleNames) {
      return NextResponse.json(
        { success: false, error: "Nama pasangan wajib diisi" },
        { status: 400 }
      );
    }

    const newItem = {
      id: body.id || `CS-${Date.now().toString().slice(-4)}`,
      coupleNames: body.coupleNames,
      scheduledDate: body.scheduledDate || "Segera Ditentukan",
      time: body.time || "14.00 - 15.30 WIB",
      type: body.type || "Tatap Muka di Studio Lambhuk",
      venueInterest: body.venueInterest || "Konsultasi All-In",
      leadPlanner: body.leadPlanner || "Daisy Iskandar",
      status: body.status || "Terkonfirmasi",
      statusColor: body.statusColor || "bg-forest-green/10 text-forest-green border-forest-green/30",
      hotline: body.hotline || "+62 822-7709-4277",
      notes: body.notes || "",
      createdAt: new Date().toISOString(),
    };

    const result = await luximaApi.consultations.create(newItem);

    return NextResponse.json(
      { success: true, message: "Jadwal konsultasi berhasil dibuat via LUXIMA-API", data: result.data, source: result.source },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.id) {
      return NextResponse.json({ success: false, error: "ID wajib disertakan" }, { status: 400 });
    }

    const result = await luximaApi.consultations.update(body.id, body);
    if (!result.success) {
      return NextResponse.json({ success: false, error: "Data tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Jadwal konsultasi berhasil diperbarui via LUXIMA-API",
      data: result.data,
      source: result.source,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "ID wajib disertakan" }, { status: 400 });
    }

    const result = await luximaApi.consultations.delete(id);
    return NextResponse.json({ success: true, message: "Jadwal konsultasi berhasil dihapus via LUXIMA-API", source: result.source });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
