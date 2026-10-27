import { NextRequest, NextResponse } from "next/server";
import { luximaApi } from "@/lib/luxima-api";

// GET /api/packages
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get("category");

  const result = await luximaApi.packages.get();
  const data = result.data || { categories: [] };
  const categories = data.categories || [];

  if (categoryId) {
    const category = categories.find((c: any) => c.id === categoryId);
    if (!category) {
      return NextResponse.json({ success: false, error: "Kategori paket tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: category, source: result.source });
  }

  return NextResponse.json({
    success: true,
    data: categories,
    source: result.source,
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

    const currentResult = await luximaApi.packages.get();
    const data = currentResult.data || { categories: [] };
    const category = (data.categories || []).find((c: any) => c.id === categoryId);

    if (!category) {
      return NextResponse.json({ success: false, error: "Kategori tidak ditemukan" }, { status: 404 });
    }

    const pkg = (category.packages || []).find((p: any) => p.id === packageId);
    if (!pkg) {
      return NextResponse.json({ success: false, error: "Paket tidak ditemukan" }, { status: 404 });
    }

    if (newPrice !== undefined) pkg.price = Number(newPrice);
    if (newName !== undefined) pkg.name = newName;
    if (newPax !== undefined) pkg.pax = newPax;

    const saveResult = await luximaApi.packages.update(data);

    return NextResponse.json({
      success: true,
      message: "Harga paket berhasil diperbarui via LUXIMA-API",
      data: pkg,
      source: saveResult.source,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
