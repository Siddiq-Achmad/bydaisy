import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Berhasil keluar dari sesi LUXIMA Enterprise",
  });

  response.cookies.delete("luxima_auth_token");
  return response;
}
