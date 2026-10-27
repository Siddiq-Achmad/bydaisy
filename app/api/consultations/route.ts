import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "consultations.json");

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

export async function GET() {
  const items = await readData();
  return NextResponse.json({ success: true, count: items.length, data: items });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.coupleNames) {
      return NextResponse.json(
        { success: false, error: "Nama pasangan wajib diisi" },
        { status: 400 }
      );
    }

    const items = await readData();
    const newItem = {
      id: body.id || `CS-${Date.now().toString().slice(-4)}`,
      coupleNames: body.coupleNames,
      scheduledDate: body.scheduledDate || "Segera Ditentukan",
      time: body.time || "14.00 - 15.30 WIB",
      type: body.type || "Tatap Muka di Studio Lambhuk",
      venueInterest: body.venueInterest || "Konsultasi All-In",
      leadPlanner: body.leadPlanner || "Daisy Iskandar",
      status: body.status || "Terkonfirmasi",
      statusColor: body.statusColor || "bg-forest-green/10 text-forest-green border-forest-green/30",
      hotline: body.hotline || "+62 822-7709-4277",
      notes: body.notes || "",
      createdAt: new Date().toISOString(),
    };

    items.unshift(newItem);
    await writeData(items);

    return NextResponse.json(
      { success: true, message: "Jadwal konsultasi berhasil dibuat", data: newItem },
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
      return NextResponse.json({ success: false, error: "ID wajib disertakan" }, { status: 400 });
    }

    const items = await readData();
    const index = items.findIndex((i: any) => i.id === body.id);
    if (index === -1) {
      return NextResponse.json({ success: false, error: "Data tidak ditemukan" }, { status: 404 });
    }

    items[index] = {
      ...items[index],
      ...body,
      updatedAt: new Date().toISOString(),
    };

    await writeData(items);
    return NextResponse.json({
      success: true,
      message: "Jadwal konsultasi berhasil diperbarui",
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
      return NextResponse.json({ success: false, error: "Data tidak ditemukan" }, { status: 404 });
    }

    await writeData(filtered);
    return NextResponse.json({ success: true, message: "Jadwal konsultasi berhasil dihapus" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
