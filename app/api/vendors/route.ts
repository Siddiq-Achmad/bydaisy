import { NextRequest, NextResponse } from "next/server";
import { luximaApi } from "@/lib/luxima-api";

// GET /api/vendors
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const id = searchParams.get("id");

  const result = await luximaApi.vendors.getAll();
  const rawData = result.data;
  const categories = rawData?.categories || [];
  const vendors = Array.isArray(rawData) ? rawData : (rawData?.vendors || []);

  if (id) {
    const item = vendors.find((v: any) => v.id === id);
    if (!item) {
      return NextResponse.json({ success: false, error: "Vendor tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: item, source: result.source });
  }

  if (category && category !== "all") {
    const filtered = vendors.filter((v: any) => v.category === category);
    return NextResponse.json({
      success: true,
      categories,
      count: filtered.length,
      data: filtered,
      source: result.source,
    });
  }

  return NextResponse.json({
    success: true,
    categories,
    count: vendors.length,
    data: vendors,
    source: result.source,
  });
}

// POST /api/vendors
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name || !body.category) {
      return NextResponse.json(
        { success: false, error: "Nama vendor dan kategori wajib diisi" },
        { status: 400 }
      );
    }

    const newId = body.id || `v-${Date.now()}`;
    const newVendor = {
      id: newId,
      name: body.name,
      category: body.category,
      categoryLabel: body.categoryLabel || "Rekanan Vendor",
      rating: body.rating || "5.0",
      priceRange: body.priceRange || "Custom Pricing",
      location: body.location || "Banda Aceh",
      instagram: body.instagram || "@bydaisyplanner",
      description: body.description || "",
      deliverables: body.deliverables || ["Layanan Profesional Sesuai Kontrak"],
      image: body.image || "/assets/images/vendor-photography.jpg",
      status: body.status || "Official Partner",
      createdAt: new Date().toISOString(),
    };

    const result = await luximaApi.vendors.create(newVendor);

    return NextResponse.json(
      { success: true, message: "Vendor berhasil ditambahkan via LUXIMA-API", data: result.data, source: result.source },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PUT /api/vendors
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.id) {
      return NextResponse.json({ success: false, error: "ID vendor wajib disertakan" }, { status: 400 });
    }

    const result = await luximaApi.vendors.update(body.id, body);
    if (!result.success) {
      return NextResponse.json({ success: false, error: "Vendor tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Data vendor berhasil diperbarui via LUXIMA-API",
      data: result.data,
      source: result.source,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE /api/vendors
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "ID parameter wajib disertakan" }, { status: 400 });
    }

    const result = await luximaApi.vendors.delete(id);
    return NextResponse.json({ success: true, message: "Vendor berhasil dihapus via LUXIMA-API", source: result.source });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
