export const runtime = "nodejs";

// Workflows beheren hun eigen tools; deze endpoint blijft voor backward compatibility.
export async function POST() {
  return new Response(
    JSON.stringify({
      error:
        "Tool output streaming wordt in deze workflow-template niet ondersteund. Voeg je eigen endpoint toe indien nodig.",
    }),
    {
      status: 410,
      headers: { "Content-Type": "application/json" },
    }
  );
}
