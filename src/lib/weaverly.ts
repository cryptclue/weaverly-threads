// deterministic procedural generator — name becomes seed
export type StyleKey = "ascii" | "cross-stitch" | "woven" | "lace" | "beadwork";

export const GLYPH_SETS: Record<string, string[]> = {
  ascii: ["·", "•", "◦", "+", "*", "/", "\\", "|", "-", "=", "#", "@", "%", "&"],
  stitch: ["×", "+", "✚", "✦", "✕", "❋", "❖", "✧", "◆", "◇"],
  woven: ["▀", "▄", "█", "▌", "▐", "░", "▒", "▓", "│", "─", "┼", "╋"],
  lace: ["✻", "✼", "❀", "✿", "❁", "❃", "✺", "✱", "◌", "○"],
  bead: ["●", "○", "◐", "◑", "◒", "◓", "◔", "◕", "⬤", "◯"],
};

export const PALETTES = [
  { name: "cobalt & cream", bg: "var(--background)", ink: "var(--primary)", alt: "var(--ink)" },
  { name: "ink on butter",  bg: "var(--accent)",     ink: "var(--ink)",    alt: "var(--primary)" },
  { name: "monochrome",     bg: "var(--background)", ink: "var(--ink)",    alt: "var(--muted-foreground)" },
  { name: "thread & sun",   bg: "var(--background)", ink: "var(--primary)", alt: "var(--accent-foreground)" },
  { name: "reverse atelier",bg: "var(--ink)",        ink: "var(--accent)",  alt: "var(--primary)" },
];

// mulberry32 — tiny deterministic prng
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function hashSeed(text: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export interface GenOptions {
  text: string;
  style: StyleKey;
  density: number;     // 0..1
  symmetry: "none" | "mirror-x" | "mirror-y" | "quad";
  cols: number;
  rows: number;
  paletteIndex: number;
}

export function generateGrid(opts: GenOptions): string[][] {
  const seed = hashSeed(opts.text || "weaverly");
  const rand = mulberry32(seed);
  const glyphs =
    opts.style === "ascii" ? GLYPH_SETS.ascii :
    opts.style === "cross-stitch" ? GLYPH_SETS.stitch :
    opts.style === "woven" ? GLYPH_SETS.woven :
    opts.style === "lace" ? GLYPH_SETS.lace :
    GLYPH_SETS.bead;

  const halfX = Math.ceil(opts.cols / 2);
  const halfY = Math.ceil(opts.rows / 2);
  const grid: string[][] = [];

  for (let y = 0; y < opts.rows; y++) {
    const row: string[] = [];
    for (let x = 0; x < opts.cols; x++) {
      let sx = x, sy = y;
      if (opts.symmetry === "mirror-x" && x >= halfX) sx = opts.cols - 1 - x;
      if (opts.symmetry === "mirror-y" && y >= halfY) sy = opts.rows - 1 - y;
      if (opts.symmetry === "quad") {
        if (x >= halfX) sx = opts.cols - 1 - x;
        if (y >= halfY) sy = opts.rows - 1 - y;
      }
      // deterministic per-cell value based on seed + coords
      const cellSeed = seed ^ (sx * 73856093) ^ (sy * 19349663);
      const r = mulberry32(cellSeed)();
      const r2 = rand(); // also advance global rand for variety per generation
      void r2;
      if (r < opts.density) {
        const g = glyphs[Math.floor(mulberry32(cellSeed + 1)() * glyphs.length)];
        row.push(g);
      } else {
        row.push(" ");
      }
    }
    grid.push(row);
  }
  return grid;
}

export function gridToString(grid: string[][]): string {
  return grid.map((r) => r.join(" ")).join("\n");
}
