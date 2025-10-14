import OpenAI from "openai";

// download file by file ID
export async function GET(_request: Request, { params: { fileId } }) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error: "OPENAI_API_KEY ontbreekt in de serveromgeving.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const client = new OpenAI({ apiKey });

  const [file, fileContent] = await Promise.all([
    client.files.retrieve(fileId),
    client.files.content(fileId),
  ]);

  return new Response(fileContent.body, {
    headers: {
      "Content-Disposition": `attachment; filename="${file.filename}"`,
    },
  });
}
