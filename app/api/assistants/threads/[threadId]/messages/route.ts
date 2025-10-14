import { workflowId as configuredWorkflowId } from "@/app/assistant-config";
import { getOpenAIClient } from "@/app/openai";
import { Stream } from "openai/streaming";

export const runtime = "nodejs";

type RouteContext = {
  params: {
    threadId: string;
  };
};

type SendMessagePayload = {
  content: string;
  fileIds?: string[];
  workflowId?: string;
};

// Verstuur een nieuw bericht naar de workflow-conversatie
export async function POST(request: Request, { params }: RouteContext) {
  if (!configuredWorkflowId) {
    return new Response(
      JSON.stringify({ error: "Geen workflow ID geconfigureerd." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const { threadId } = params;
  const { content, fileIds = [], workflowId } =
    (await request.json()) as SendMessagePayload;

  if (!content || typeof content !== "string") {
    return new Response(
      JSON.stringify({ error: "Berichtinhoud ontbreekt." }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const targetWorkflowId = workflowId?.trim() || configuredWorkflowId;

  const messageContent = [
    { type: "input_text", text: content } as const,
    ...fileIds
      .filter((id): id is string => typeof id === "string" && id.length > 0)
      .map((id) => ({
        type: "input_file" as const,
        file_id: id,
      })),
  ];

  let client;
  try {
    client = getOpenAIClient();
  } catch (error) {
    console.error("OpenAI client niet beschikbaar:", error);
    return new Response(
      JSON.stringify({
        error: "OpenAI client niet beschikbaar. Controleer je API-sleutel.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  let responseStream;
  try {
    responseStream = client.responses.stream({
      model: targetWorkflowId,
      conversation: threadId,
      input: [
        {
          role: "user",
          content: messageContent,
          type: "message",
        },
      ],
    });
  } catch (error) {
    console.error("Kan workflow-run niet starten:", error);
    return new Response(
      JSON.stringify({ error: "Het uitvoeren van de workflow is mislukt." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const readable = new Stream(
    responseStream[Symbol.asyncIterator].bind(responseStream),
    responseStream.controller
  ).toReadableStream();

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
