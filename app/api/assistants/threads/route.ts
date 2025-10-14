import { getOpenAIClient } from "@/app/openai";

export const runtime = "nodejs";

// Maak een nieuw gesprek aan voor de workflow
export async function POST() {
  try {
    const openai = getOpenAIClient();
    const conversation = await openai.conversations.create();
    return Response.json({ threadId: conversation.id });
  } catch (error) {
    console.error("Kon geen workflow-conversatie starten:", error);
    return new Response(
      JSON.stringify({
        error:
          "Kan geen workflow starten. Controleer of OPENAI_API_KEY is ingesteld.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
