import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "journal.json");

async function readData() {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    return { categories: [], articles: [] };
  }
}

async function writeData(data: any) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

// GET /api/journal
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const slug = searchParams.get("slug");
  const id = searchParams.get("id");

  const data = await readData();

  if (id || slug) {
    const item = data.articles.find((a: any) => a.id === id || a.slug === slug);
    if (!item) {
      return NextResponse.json({ success: false, error: "Artikel tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: item });
  }

  if (category && category !== "all") {
    const filtered = data.articles.filter((a: any) => a.category === category);
    return NextResponse.json({
      success: true,
      categories: data.categories,
      count: filtered.length,
      data: filtered,
    });
  }

  return NextResponse.json({
    success: true,
    categories: data.categories,
    count: data.articles.length,
    data: data.articles,
  });
}

// POST /api/journal
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.title || !body.excerpt) {
      return NextResponse.json(
        { success: false, error: "Judul dan ringkasan artikel wajib diisi" },
        { status: 400 }
      );
    }

    const data = await readData();
    const newId = body.id || `art-${Date.now()}`;
    const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const newArticle = {
      id: newId,
      title: body.title,
      slug,
      category: body.category || "rundown",
      categoryLabel: body.categoryLabel || "Checklist & Rundown",
      readTime: body.readTime || "5 menit baca",
      date: body.date || new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" }),
      excerpt: body.excerpt,
      image: body.image || "/assets/images/journal-checklist.jpg",
      author: body.author || "Daisy & Tim Kreatif ByDaisy",
      authorRole: body.authorRole || "Executive Matrimonial Directors",
      views: 0,
      status: body.status || "Published",
      sections: body.sections || [],
      keyTakeaways: body.keyTakeaways || [],
      createdAt: new Date().toISOString(),
    };

    data.articles.unshift(newArticle);
    await writeData(data);

    return NextResponse.json(
      { success: true, message: "Artikel jurnal berhasil diterbitkan", data: newArticle },
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

    const data = await readData();
    const index = data.articles.findIndex((a: any) => a.id === body.id);
    if (index === -1) {
      return NextResponse.json({ success: false, error: "Artikel tidak ditemukan" }, { status: 404 });
    }

    data.articles[index] = {
      ...data.articles[index],
      ...body,
      updatedAt: new Date().toISOString(),
    };

    await writeData(data);
    return NextResponse.json({
      success: true,
      message: "Artikel jurnal berhasil diperbarui",
      data: data.articles[index],
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

    const data = await readData();
    const filtered = data.articles.filter((a: any) => a.id !== id);

    if (filtered.length === data.articles.length) {
      return NextResponse.json({ success: false, error: "Artikel tidak ditemukan" }, { status: 404 });
    }

    data.articles = filtered;
    await writeData(data);
    return NextResponse.json({ success: true, message: "Artikel jurnal berhasil dihapus" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
