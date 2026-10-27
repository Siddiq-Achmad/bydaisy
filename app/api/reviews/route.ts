import { NextRequest, NextResponse } from "next/server";
import { luximaApi } from "@/lib/luxima-api";

// GET /api/reviews
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const result = await luximaApi.reviews.getAll();
  const reviews = result.data || [];

  if (id) {
    const item = reviews.find((r: any) => r.id === id);
    if (!item) {
      return NextResponse.json({ success: false, error: "Ulasan tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: item, source: result.source });
  }

  return NextResponse.json({ success: true, count: reviews.length, data: reviews, source: result.source });
}

// POST /api/reviews
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.couple || !body.quote) {
      return NextResponse.json(
        { success: false, error: "Nama pasangan dan kutipan ulasan wajib diisi" },
        { status: 400 }
      );
    }

    const newId = body.id || `rev-${Date.now()}`;
    const newReview = {
      id: newId,
      couple: body.couple,
      date: body.date || new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" }),
      venue: body.venue || "Banda Aceh",
      theme: body.theme || "Traditional & Modern Wedding",
      rating: body.rating || 5,
      image: body.image || "/assets/images/tradisi-aceh.jpg",
      quote: body.quote,
      service: body.service || "The Signature Planner",
      status: body.status || "Published",
      createdAt: new Date().toISOString(),
    };

    const result = await luximaApi.reviews.create(newReview);

    return NextResponse.json(
      { success: true, message: "Ulasan berhasil ditambahkan via LUXIMA-API", data: result.data, source: result.source },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PUT /api/reviews
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.id) {
      return NextResponse.json({ success: false, error: "ID ulasan wajib disertakan" }, { status: 400 });
    }

    const result = await luximaApi.reviews.update(body.id, body);
    if (!result.success) {
      return NextResponse.json({ success: false, error: "Ulasan tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Ulasan berhasil diperbarui via LUXIMA-API",
      data: result.data,
      source: result.source,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE /api/reviews
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "ID parameter wajib disertakan" }, { status: 400 });
    }

    const result = await luximaApi.reviews.delete(id);
    return NextResponse.json({ success: true, message: "Ulasan berhasil dihapus via LUXIMA-API", source: result.source });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
