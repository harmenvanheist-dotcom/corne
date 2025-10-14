import type { ChatKitOptions } from "@openai/chatkit";

const COLOR_PRIMARY = "#DA6A2F";

const fontSources = [
  {
    family: "OpenAI Sans",
    src: "https://cdn.openai.com/common/fonts/openai-sans/v2/OpenAISans-Regular.woff2",
    weight: 400,
    style: "normal" as const,
    display: "swap" as const,
  },
];

export function getBaseChatKitOptions(): Omit<ChatKitOptions, "api"> {
  return {
    theme: {
      colorScheme: "light",
      radius: "pill",
      density: "normal",
      color: {
        grayscale: {
          hue: 0,
          tint: 0,
        },
        accent: {
          primary: COLOR_PRIMARY,
          level: 1,
        },
        surface: {
          background: "#ffffff",
          foreground: "#ffffff",
        },
      },
      typography: {
        baseSize: 16,
        fontFamily:
          '"OpenAI Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif',
        fontFamilyMono:
          'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
        fontSources,
      },
    },
    composer: {
      placeholder: "Stel hier je onderhoudsvraag.",
      attachments: {
        enabled: true,
        maxCount: 5,
        maxSize: 10_485_760,
      },
    },
    startScreen: {
      greeting: "Onderhoudsassistent Trappenfabriek Vermeulen",
      prompts: [],
    },
  };
}
