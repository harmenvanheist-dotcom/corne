export const runtime = "nodejs";

// Workflows worden via de Agent Builder aangemaakt; deze helper bestaat enkel voor compatibiliteit.
export async function POST() {
  return new Response(
    JSON.stringify({
      error:
        "Maak een workflow aan in de Agent Builder en vul het ID in app/assistant-config.ts in.",
    }),
    {
      status: 400,
      headers: { "Content-Type": "application/json" },
    }
  );
}
