let loaderPromise: Promise<void> | null = null;

const CHATKIT_SCRIPT_URL =
  process.env.NEXT_PUBLIC_CHATKIT_SCRIPT_URL ??
  "https://cdn.openai.com/chatkit/v1/index.js";

export function loadChatKit(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (customElements.get("openai-chatkit")) {
    return Promise.resolve();
  }

  if (!loaderPromise) {
    loaderPromise = new Promise((resolve, reject) => {
      const existingScript = document.querySelector<HTMLScriptElement>(
        `script[data-chatkit-loader="true"]`
      );
      if (existingScript) {
        existingScript.addEventListener("load", () => resolve(), { once: true });
        existingScript.addEventListener(
          "error",
          () => reject(new Error("Kan ChatKit script niet laden.")),
          { once: true }
        );
        return;
      }

      const script = document.createElement("script");
      script.type = "module";
      script.src = CHATKIT_SCRIPT_URL;
      script.dataset.chatkitLoader = "true";
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () =>
        reject(new Error(`Laden van ChatKit script (${CHATKIT_SCRIPT_URL}) mislukt.`));
      document.head.appendChild(script);
    });
  }

  return loaderPromise;
}
