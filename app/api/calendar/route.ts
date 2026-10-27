import { NextRequest, NextResponse } from "next/server";
import { luximaApi } from "@/lib/luxima-api";
import { syncEventToAwedz } from "@/lib/integrations";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  const result = await luximaApi.calendar.getAll();
  const items = result.data || [];

  if (type && type !== "all") {
    const filtered = items.filter((i: any) => i.type === type);
    return NextResponse.json({ success: true, count: filtered.length, data: filtered, source: result.source });
  }

  return NextResponse.json({ success: true, count: items.length, data: items, source: result.source });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.title || !body.date) {
      return NextResponse.json(
        { success: false, error: "Judul agenda dan tanggal wajib diisi" },
        { status: 400 }
      );
    }

    const newItem = {
      id: body.id || `ev-${Date.now().toString().slice(-4)}`,
      title: body.title,
      type: body.type || "hari-h",
      date: body.date,
      time: body.time || "09.00 - 17.00 WIB",
      venue: body.venue || "Banda Aceh",
      package: body.package || "Wedding Event",
      crewCount: body.crewCount || "10 Personil",
      lead: body.lead || "Daisy Iskandar",
      notes: body.notes || "",
      color:
        body.type === "hari-h"
          ? "border-forest-green bg-forest-green/5"
          : body.type === "gladi"
          ? "border-amber-400 bg-amber-50/50"
          : "border-blue-400 bg-blue-50/50",
      badge:
        body.type === "hari-h"
          ? "Hari H Resepsi"
          : body.type === "gladi"
          ? "Gladi Bersih H-1"
          : "Technical Meeting",
      badgeColor:
        body.type === "hari-h"
          ? "bg-forest-green text-white"
          : body.type === "gladi"
          ? "bg-amber-100 text-amber-900 border-amber-300"
          : "bg-blue-100 text-blue-900 border-blue-300",
      createdAt: new Date().toISOString(),
    };

    const result = await luximaApi.calendar.create(newItem);

    // Background sync to Awedz Event Platform if configured
    syncEventToAwedz(result.data).catch((err) =>
      console.warn("Awedz background sync note:", err)
    );

    return NextResponse.json(
      { success: true, message: "Agenda acara berhasil ditambahkan via LUXIMA-API", data: result.data, source: result.source },
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

    const result = await luximaApi.calendar.update(body.id, body);
    if (!result.success) {
      return NextResponse.json({ success: false, error: "Agenda tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Agenda berhasil diperbarui via LUXIMA-API",
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
      return NextResponse.json({ success: false, error: "ID parameter wajib disertakan" }, { status: 400 });
    }

    const result = await luximaApi.calendar.delete(id);
    return NextResponse.json({ success: true, message: "Agenda acara berhasil dihapus via LUXIMA-API", source: result.source });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
