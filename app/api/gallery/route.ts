import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "gallery.json");

async function readData() {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
}

async function writeData(data: any) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  const items = await readData();
  if (category && category !== "all") {
    const filtered = items.filter((i: any) => i.category === category);
    return NextResponse.json({ success: true, count: filtered.length, data: filtered });
  }

  return NextResponse.json({ success: true, count: items.length, data: items });
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

    const items = await readData();
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

    items.unshift(newItem);
    await writeData(items);

    return NextResponse.json(
      { success: true, message: "Foto galeri berhasil ditambahkan", data: newItem },
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

    const items = await readData();
    const index = items.findIndex((i: any) => i.id === body.id);
    if (index === -1) {
      return NextResponse.json({ success: false, error: "Foto tidak ditemukan" }, { status: 404 });
    }

    items[index] = {
      ...items[index],
      ...body,
      updatedAt: new Date().toISOString(),
    };

    await writeData(items);
    return NextResponse.json({
      success: true,
      message: "Data galeri berhasil diperbarui",
      data: items[index],
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

    const items = await readData();
    const filtered = items.filter((i: any) => i.id !== id);
    if (filtered.length === items.length) {
      return NextResponse.json({ success: false, error: "Foto tidak ditemukan" }, { status: 404 });
    }

    await writeData(filtered);
    return NextResponse.json({ success: true, message: "Foto galeri berhasil dihapus" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
