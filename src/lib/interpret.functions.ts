// interprets an unknown word into a binary shape mask via Lovable AI.
// each call uses a fresh nonce + art-direction prompt so the same word
// produces a different drawing every time — never the same shape twice.
import { createServerFn } from "@tanstack/react-start";

export type InterpretResult = {
  word: string;
  label: string;     // a short caption of what the loom decided to draw
  mask: number[][];  // rows of 0/1 — 1 = stitch, 0 = empty
  size: number;
  nonce: number;
};

const STYLES = [
  "an art-deco silhouette", "a folk-art motif", "a sacred geometry sigil",
  "a children's-book sketch", "a constellation diagram", "a tarot-card icon",
  "a botanical illustration", "a heraldic crest", "a minimalist pictogram",
  "a baroque ornament", "an iron-on patch design", "an embroidered emblem",
  "a woodblock print", "a pixel-art glyph", "a stained-glass medallion",
];

export const interpretWord = createServerFn({ method: "POST" })
  .inputValidator((input: { word: string; nonce?: number; size?: number }) => ({
    word: String(input.word || "").slice(0, 64),
    nonce: typeof input.nonce === "number" ? input.nonce : Math.floor(Math.random() * 1e9),
    size: Math.min(48, Math.max(16, input.size ?? 32)),
  }))
  .handler(async ({ data }): Promise<InterpretResult> => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("LOVABLE_API_KEY missing");

    const size = data.size;
    const style = STYLES[data.nonce % STYLES.length];
    const variant = ((data.nonce >> 3) % 9) + 1;

    const system = `you are the weaverly loom — an oracle that draws concepts as binary stitch masks on a square grid.
you reply ONLY by calling the draw_mask function.
the mask is rows of strings using '#' for a filled stitch and '.' for empty.
draw a single bold, recognizable, centered subject that fills most of the grid.
leave generous empty margins. no text, no letters, no borders.
treat the concept literally where possible (a rose → an actual rose, a wolf → a wolf silhouette, a galaxy → a swirl).
abstract or emotional words become evocative symbols.`;

    const user = `concept: "${data.word}"
grid size: ${size} x ${size}
art direction: ${style}, variation #${variant}
make this version visually distinct from any other drawing of "${data.word}" — change pose, angle, framing, or composition.
return EXACTLY ${size} rows, each EXACTLY ${size} characters of '#' or '.'.`;

    const body = {
      model: "google/gemini-3-flash-preview",
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      tools: [{
        type: "function",
        function: {
          name: "draw_mask",
          description: "submit the finished stitch mask",
          parameters: {
            type: "object",
            properties: {
              label: { type: "string", description: "1-4 word caption of what was drawn" },
              rows: {
                type: "array",
                description: `exactly ${size} strings, each exactly ${size} characters of '#' or '.'`,
                items: { type: "string" },
                minItems: size,
                maxItems: size,
              },
            },
            required: ["label", "rows"],
            additionalProperties: false,
          },
        },
      }],
      tool_choice: { type: "function", function: { name: "draw_mask" } },
    };

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!resp.ok) {
      const t = await resp.text().catch(() => "");
      if (resp.status === 429) throw new Error("the loom is busy — too many requests. try again in a moment.");
      if (resp.status === 402) throw new Error("ai credits exhausted. add funds in lovable workspace settings.");
      throw new Error(`ai gateway error ${resp.status}: ${t.slice(0, 200)}`);
    }

    const json = await resp.json();
    const call = json?.choices?.[0]?.message?.tool_calls?.[0];
    const args = call ? JSON.parse(call.function.arguments) : null;
    if (!args?.rows || !Array.isArray(args.rows)) throw new Error("loom returned no drawing");

    const mask: number[][] = [];
    for (let y = 0; y < size; y++) {
      const raw = String(args.rows[y] ?? "").padEnd(size, ".").slice(0, size);
      const row: number[] = [];
      for (let x = 0; x < size; x++) row.push(raw[x] === "#" ? 1 : 0);
      mask.push(row);
    }

    return {
      word: data.word,
      label: String(args.label || data.word).toLowerCase().slice(0, 40),
      mask,
      size,
      nonce: data.nonce,
    };
  });
