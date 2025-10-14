import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getOpenAIClient } from "@/app/openai";
import { workflowId } from "@/app/assistant-config";

export const runtime = "nodejs";

const COOKIE_NAME = "chatkit_uid";

function ensureUserId(): { value: string; isNew: boolean } {
  const cookieStore = cookies();
  const existing = cookieStore.get(COOKIE_NAME)?.value;
  if (existing) {
    return { value: existing, isNew: false };
  }
  const id = `user_${crypto.randomUUID()}`;
  return { value: id, isNew: true };
}

function applyUserCookie(response: NextResponse, userId: string) {
  response.cookies.set({
    name: COOKIE_NAME,
    value: userId,
    sameSite: "lax",
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const requestedWorkflowId =
    typeof body?.workflowId === "string" && body.workflowId.startsWith("wf_")
      ? body.workflowId
      : null;

  const activeWorkflowId = requestedWorkflowId ?? workflowId;

  if (!activeWorkflowId) {
    return NextResponse.json(
      { error: "Geen workflow ID geconfigureerd." },
      { status: 500 }
    );
  }

  const ensured = ensureUserId();
  const userId = ensured.value;

  const domainKey = process.env.CHATKIT_DOMAIN_KEY;
  const client = domainKey
    ? getOpenAIClient().withOptions({
        defaultHeaders: { "OpenAI-Domain-Key": domainKey },
      })
    : getOpenAIClient();

  try {
    const session = await client.beta.chatkit.sessions.create({
      user: userId,
      workflow: { id: activeWorkflowId },
    });

    const response = NextResponse.json({
      clientSecret: session.client_secret,
      sessionId: session.id,
      workflowId: activeWorkflowId,
    });

    if (ensured.isNew) {
      applyUserCookie(response, userId);
    }

    return response;
  } catch (error) {
    console.error("Kon ChatKit sessie niet aanmaken:", error);
    return NextResponse.json(
      { error: "Aanmaken van een nieuwe ChatKit sessie is mislukt." },
      { status: 500 }
    );
  }
}
