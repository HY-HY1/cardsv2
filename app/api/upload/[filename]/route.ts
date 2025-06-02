import { NextResponse } from "next/server";
import { join } from "path";
import { readFile } from "fs/promises";

export async function GET(
  req: Request,
  { params }: { params: { filename: string } }
) {
  try {
    const filePath = join(process.cwd(), "public", "uploads", params.filename);
    const fileBuffer = await readFile(filePath);

    const ext = params.filename.split('.').pop()?.toLowerCase();
    const contentType = ext === "jpg" || ext === "jpeg"
      ? "image/jpeg"
      : ext === "png"
      ? "image/png"
      : "application/octet-stream"; // fallback

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${params.filename}"`,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "File not found" },
      { status: 404 }
    );
  }
}
