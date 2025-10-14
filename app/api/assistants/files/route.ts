import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "Geen bestand ontvangen." }, { status: 400 });
  }

  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY ontbreekt in de serveromgeving." },
        { status: 500 }
      );
    }

    const openai = new OpenAI({ apiKey });
    const uploaded = await openai.files.create({
      file,
      purpose: "assistants",
    });

    return NextResponse.json({
      fileId: uploaded.id,
      filename: uploaded.filename,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Upload mislukt." }, { status: 500 });
  }
}
