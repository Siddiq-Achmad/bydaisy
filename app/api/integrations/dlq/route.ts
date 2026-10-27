import { NextRequest, NextResponse } from "next/server";
import {
  getDeadLetterQueue,
  retryDeadLetterQueueItem,
  clearDeadLetterQueue,
} from "@/lib/integrations";

// GET /api/integrations/dlq
export async function GET() {
  try {
    const queue = getDeadLetterQueue();
    return NextResponse.json({
      success: true,
      count: queue.length,
      data: queue,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to read DLQ" },
      { status: 500 }
    );
  }
}

// POST /api/integrations/dlq
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, id } = body;

    if (action === "retry") {
      if (!id) {
        return NextResponse.json(
          { success: false, error: "ID item DLQ wajib disertakan" },
          { status: 400 }
        );
      }
      const result = await retryDeadLetterQueueItem(id);
      return NextResponse.json(result);
    }

    if (action === "clear") {
      clearDeadLetterQueue();
      return NextResponse.json({
        success: true,
        message: "Seluruh antrean Dead Letter Queue berhasil dibersihkan",
      });
    }

    return NextResponse.json(
      { success: false, error: "Aksi tidak dikenali (gunakan 'retry' atau 'clear')" },
      { status: 400 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Server Error" },
      { status: 500 }
    );
  }
}
