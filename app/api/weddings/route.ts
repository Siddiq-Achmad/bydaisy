import { NextRequest, NextResponse } from "next/server";
import { luximaApi } from "@/lib/luxima-api";

// GET /api/weddings
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const id = searchParams.get("id");

  const result = await luximaApi.weddings.getAll();
  const weddings = result.data || [];

  if (id) {
    const item = weddings.find((w: any) => w.id === id);
    if (!item) {
      return NextResponse.json({ success: false, error: "Wedding not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: item, source: result.source });
  }

  if (category && category !== "all") {
    const filtered = weddings.filter((w: any) => w.category === category);
    return NextResponse.json({ success: true, count: filtered.length, data: filtered, source: result.source });
  }

  return NextResponse.json({ success: true, count: weddings.length, data: weddings, source: result.source });
}

// POST /api/weddings
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.couple || !body.venue) {
      return NextResponse.json(
        { success: false, error: "Nama pasangan dan venue wajib diisi" },
        { status: 400 }
      );
    }

    const newItem = {
      id: body.id || `wedding-${Date.now()}`,
      title: body.title || `${body.couple} Wedding Showcase`,
      couple: body.couple,
      date: body.date || "TBD",
      venue: body.venue,
      guests: body.guests || "500 Tamu Undangan",
      category: body.category || "adat-aceh",
      categoryLabel: body.categoryLabel || "Tradisi Adat",
      service: body.service || "Wedding Planner & Full Organizer",
      image: body.image || "/assets/images/tradisi-aceh.jpg",
      story: body.story || "",
      highlights: body.highlights || [],
      vendors: body.vendors || "ByDaisy Planner",
      status: body.status || "Published",
      createdAt: new Date().toISOString(),
    };

    const result = await luximaApi.weddings.create(newItem);

    return NextResponse.json(
      { success: true, message: "Dokumentasi pernikahan berhasil disimpan via LUXIMA-API", data: result.data, source: result.source },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PUT /api/weddings
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.id) {
      return NextResponse.json({ success: false, error: "ID wajib disertakan" }, { status: 400 });
    }

    const result = await luximaApi.weddings.update(body.id, body);
    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error || "Wedding not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Dokumentasi pernikahan berhasil diperbarui via LUXIMA-API",
      data: result.data,
      source: result.source,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE /api/weddings
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "ID parameter wajib disertakan" }, { status: 400 });
    }

    const result = await luximaApi.weddings.delete(id);
    return NextResponse.json({ success: true, message: "Dokumentasi berhasil dihapus via LUXIMA-API", source: result.source });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
