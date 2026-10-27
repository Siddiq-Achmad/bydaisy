import { NextRequest, NextResponse } from "next/server";
import { luximaApi } from "@/lib/luxima-api";

// GET /api/journal
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const slug = searchParams.get("slug");
  const id = searchParams.get("id");

  const result = await luximaApi.journal.getAll();
  const data = result.data || { categories: [], articles: [] };
  const articles = data.articles || [];

  if (id || slug) {
    const item = articles.find((a: any) => a.id === id || a.slug === slug);
    if (!item) {
      return NextResponse.json({ success: false, error: "Artikel tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: item, source: result.source });
  }

  if (category && category !== "all") {
    const filtered = articles.filter((a: any) => a.category === category);
    return NextResponse.json({
      success: true,
      categories: data.categories || [],
      count: filtered.length,
      data: filtered,
      source: result.source,
    });
  }

  return NextResponse.json({
    success: true,
    categories: data.categories || [],
    count: articles.length,
    data: data,
    source: result.source,
  });
}

// POST /api/journal
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.title || !body.category) {
      return NextResponse.json(
        { success: false, error: "Judul dan kategori artikel wajib diisi" },
        { status: 400 }
      );
    }

    const newId = body.id || `art-${Date.now()}`;
    const slug =
      body.slug ||
      body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const newArticle = {
      id: newId,
      slug,
      title: body.title,
      category: body.category,
      author: body.author || "ByDaisy Editorial Team",
      date: body.date || new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" }),
      readTime: body.readTime || "5 Menit Baca",
      image: body.image || "/assets/images/journal-checklist.jpg",
      summary: body.summary || body.excerpt || "",
      views: body.views || "100 pembaca",
      status: body.status || "Published",
      keyTakeaways: body.keyTakeaways || [],
      createdAt: new Date().toISOString(),
    };

    const result = await luximaApi.journal.create(newArticle);

    return NextResponse.json(
      { success: true, message: "Artikel editorial berhasil ditambahkan via LUXIMA-API", data: result.data, source: result.source },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PUT /api/journal
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.id) {
      return NextResponse.json({ success: false, error: "ID artikel wajib disertakan" }, { status: 400 });
    }

    const result = await luximaApi.journal.update(body.id, body);
    if (!result.success) {
      return NextResponse.json({ success: false, error: "Artikel tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Artikel editorial berhasil diperbarui via LUXIMA-API",
      data: result.data,
      source: result.source,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE /api/journal
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "ID parameter wajib disertakan" }, { status: 400 });
    }

    const result = await luximaApi.journal.delete(id);
    return NextResponse.json({ success: true, message: "Artikel berhasil dihapus via LUXIMA-API", source: result.source });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
