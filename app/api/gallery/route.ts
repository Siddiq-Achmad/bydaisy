import { NextRequest, NextResponse } from "next/server";
import { luximaApi } from "@/lib/luxima-api";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  const result = await luximaApi.gallery.getAll();
  const items = result.data || [];

  if (category && category !== "all") {
    const filtered = items.filter((i: any) => i.category === category);
    return NextResponse.json({ success: true, count: filtered.length, data: filtered, source: result.source });
  }

  return NextResponse.json({ success: true, count: items.length, data: items, source: result.source });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.title || !body.image) {
      return NextResponse.json(
        { success: false, error: "Judul dan URL gambar wajib diisi" },
        { status: 400 }
      );
    }

    const newItem = {
      id: body.id || `gal-${Date.now().toString().slice(-4)}`,
      title: body.title,
      category: body.category || "decor",
      label: body.label || "Dokumentasi ByDaisy",
      venue: body.venue || "Banda Aceh",
      image: body.image,
      aspect: body.aspect || "aspect-[16/10]",
      createdAt: new Date().toISOString(),
    };

    const result = await luximaApi.gallery.create(newItem);

    return NextResponse.json(
      { success: true, message: "Foto galeri berhasil ditambahkan via LUXIMA-API", data: result.data, source: result.source },
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
      return NextResponse.json({ success: false, error: "ID foto wajib disertakan" }, { status: 400 });
    }

    const result = await luximaApi.gallery.update(body.id, body);
    if (!result.success) {
      return NextResponse.json({ success: false, error: "Foto tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Data galeri berhasil diperbarui via LUXIMA-API",
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

    const result = await luximaApi.gallery.delete(id);
    return NextResponse.json({ success: true, message: "Foto galeri berhasil dihapus via LUXIMA-API", source: result.source });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
