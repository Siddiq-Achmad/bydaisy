import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "settings.json");

async function readData() {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    return {
      studioName: "ByDaisy Planner",
      address: "Jl. Batee Suasa, Lambhuk, Banda Aceh, Aceh",
      hotline1: "+62 822-7709-4277",
      hotline2: "+62 821-6222-1468",
      instagram: "@bydaisyplanner",
      email: "concierge@bydaisy.com",
      hours: "Senin - Minggu: 09.00 - 21.00 WIB",
    };
  }
}

async function writeData(data: any) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET() {
  const settings = await readData();
  return NextResponse.json({ success: true, data: settings });
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const current = await readData();
    const updated = {
      ...current,
      ...body,
      updatedAt: new Date().toISOString(),
    };

    await writeData(updated);
    return NextResponse.json({
      success: true,
      message: "Pengaturan studio berhasil diperbarui",
      data: updated,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
