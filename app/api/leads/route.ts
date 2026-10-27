import { NextRequest, NextResponse } from "next/server";
import { luximaApi } from "@/lib/luxima-api";
import { syncLeadToLuxima } from "@/lib/integrations";

// GET /api/leads
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const id = searchParams.get("id");

  const result = await luximaApi.leads.getAll();
  const rawLeads = result.data || [];

  // Normalize aliases so both coupleNames and clientName, waNumber and phone are present
  const leads = rawLeads.map((l: any) => ({
    ...l,
    clientName: l.clientName || l.coupleNames || "Calon Pengantin",
    coupleNames: l.coupleNames || l.clientName || "Calon Pengantin",
    phone: l.phone || l.waNumber || "",
    waNumber: l.waNumber || l.phone || "",
    source: l.source || l.hotline || "Website Consultation",
    hotline: l.hotline || l.source || "Website Consultation",
    packageInterest: l.packageInterest || l.service || "Wedding Planner",
    service: l.service || l.packageInterest || "Wedding Planner",
    weddingDate: l.weddingDate || l.eventDate || "Belum ditentukan",
    eventDate: l.eventDate || l.weddingDate || "Belum ditentukan",
    venue: l.venue || l.venueLocation || "Banda Aceh",
    venueLocation: l.venueLocation || l.venue || "Banda Aceh",
  }));

  if (id) {
    const item = leads.find((l: any) => l.id === id);
    if (!item) {
      return NextResponse.json({ success: false, error: "Lead tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: item, source: result.source });
  }

  if (status && status !== "all") {
    const filtered = leads.filter((l: any) => l.status === status);
    return NextResponse.json({ success: true, count: filtered.length, data: filtered, source: result.source });
  }

  return NextResponse.json({ success: true, count: leads.length, data: leads, source: result.source });
}

// POST /api/leads
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const couple = body.coupleNames || body.clientName;
    const wa = body.waNumber || body.phone;

    if (!couple && !wa) {
      return NextResponse.json(
        { success: false, error: "Nama pasangan atau nomor WhatsApp wajib diisi" },
        { status: 400 }
      );
    }

    const newId = body.id || `lead-${Date.now()}`;
    const newLead = {
      id: newId,
      coupleNames: couple || "Calon Pengantin",
      clientName: couple || "Calon Pengantin",
      hotline: body.hotline || body.source || "Hotline 1 (+62 822-7709-4277)",
      source: body.source || body.hotline || "Hotline 1 (+62 822-7709-4277)",
      waNumber: wa || "",
      phone: wa || "",
      service: body.service || body.packageInterest || "Wedding Planner",
      packageInterest: body.packageInterest || body.service || "Wedding Planner",
      guestCount: body.guestCount || "500 Tamu",
      eventDate: body.eventDate || body.weddingDate || "Belum ditentukan",
      weddingDate: body.weddingDate || body.eventDate || "Belum ditentukan",
      venueLocation: body.venueLocation || body.venue || "Banda Aceh",
      venue: body.venue || body.venueLocation || "Banda Aceh",
      budgetRange: body.budgetRange || "-",
      status: body.status || "Baru Masuk",
      notes: body.notes || "",
      createdAt: new Date().toISOString(),
    };

    const result = await luximaApi.leads.create(newLead);

    // Background sync to Luxima CRM if configured
    syncLeadToLuxima(result.data).catch((err) =>
      console.warn("Luxima background sync note:", err)
    );

    return NextResponse.json(
      { success: true, message: "Reservasi konsultasi berhasil disimpan via LUXIMA-API", data: result.data, source: result.source },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PUT /api/leads
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.id) {
      return NextResponse.json({ success: false, error: "ID lead wajib disertakan" }, { status: 400 });
    }

    const result = await luximaApi.leads.update(body.id, body);
    if (!result.success) {
      return NextResponse.json({ success: false, error: "Lead tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Status lead berhasil diperbarui via LUXIMA-API",
      data: result.data,
      source: result.source,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE /api/leads
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "ID parameter wajib disertakan" }, { status: 400 });
    }

    const result = await luximaApi.leads.delete(id);
    return NextResponse.json({ success: true, message: "Lead berhasil dihapus via LUXIMA-API", source: result.source });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
