"use client";

import { useEffect, useMemo, useState } from "react";
import { ChatKit, useChatKit } from "@openai/chatkit-react";
import type { UseChatKitOptions } from "@openai/chatkit-react";
import { getBaseChatKitOptions } from "@/app/chatkit/options";
import { loadChatKit } from "@/app/utils/load-chatkit";

const WORKFLOW_STORAGE_KEY = "selectedWorkflow";

async function requestClientSecret(
  currentClientSecret: string | null,
  workflowOverride: string | null
) {
  const response = await fetch("/api/chatkit/client-secret", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      clientSecret: currentClientSecret,
      workflowId: workflowOverride,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    const message =
      typeof error?.error === "string"
        ? error.error
        : "ChatKit client secret ophalen mislukt.";
    throw new Error(message);
  }

  const payload = await response.json();
  return payload.clientSecret as string;
}

function useWorkflowPreference() {
  const [workflow, setWorkflow] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(WORKFLOW_STORAGE_KEY);
    if (stored) {
      setWorkflow(stored);
    }
  }, []);

  return workflow;
}

export default function Chat() {
  const [ready, setReady] = useState(false);
  const workflowOverride = useWorkflowPreference();

  useEffect(() => {
    loadChatKit()
      .then(() => setReady(true))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const options = useMemo<UseChatKitOptions>(() => {
    const baseOptions = getBaseChatKitOptions();
    return {
      ...baseOptions,
      api: {
        getClientSecret: (currentClientSecret) =>
          requestClientSecret(currentClientSecret, workflowOverride),
      },
    };
  }, [workflowOverride]);

  const { control } = useChatKit(options);

  if (!ready) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <span>ChatKit wordt geladen…</span>
      </div>
    );
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <ChatKit control={control} style={{ height: "100%", width: "100%" }} />
    </div>
  );
}
