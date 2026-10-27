import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "wedding-prices.json");

async function readData() {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    return { categories: [] };
  }
}

async function writeData(data: any) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

// GET /api/packages
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get("category");

  const data = await readData();

  if (categoryId) {
    const category = data.categories.find((c: any) => c.id === categoryId);
    if (!category) {
      return NextResponse.json({ success: false, error: "Kategori paket tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: category });
  }

  return NextResponse.json({
    success: true,
    data: data.categories,
  });
}

// PUT /api/packages (update price or details)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { categoryId, packageId, newPrice, newName, newPax } = body;

    if (!categoryId || !packageId) {
      return NextResponse.json(
        { success: false, error: "categoryId dan packageId wajib disertakan" },
        { status: 400 }
      );
    }

    const data = await readData();
    const category = data.categories.find((c: any) => c.id === categoryId);
    if (!category) {
      return NextResponse.json({ success: false, error: "Kategori tidak ditemukan" }, { status: 404 });
    }

    const pkg = category.packages.find((p: any) => p.id === packageId);
    if (!pkg) {
      return NextResponse.json({ success: false, error: "Paket tidak ditemukan" }, { status: 404 });
    }

    if (newPrice !== undefined) pkg.price = newPrice;
    if (newName) pkg.name = newName;
    if (newPax !== undefined) pkg.pax = newPax;

    await writeData(data);
    return NextResponse.json({
      success: true,
      message: "Data paket berhasil diperbarui",
      data: pkg,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
