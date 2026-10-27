import { NextRequest, NextResponse } from "next/server";
import { luximaApi } from "@/lib/luxima-api";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email dan password wajib diisi" },
        { status: 400 }
      );
    }

    const authResult = await luximaApi.auth.login({ email, password });

    if (!authResult.success) {
      return NextResponse.json(
        { success: false, error: authResult.error || "Autentikasi gagal" },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "Berhasil masuk via LUXIMA Enterprise Single Sign-On (SSO)",
      user: authResult.data.user,
      token: authResult.data.token,
      source: authResult.source,
    });

    // Set secure HTTP-only cookie for session persistence
    response.cookies.set("luxima_auth_token", authResult.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Server Error" },
      { status: 500 }
    );
  }
}
