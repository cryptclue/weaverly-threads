import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter, Marquee } from "@/components/site-chrome";
import { useEffect, useState } from "react";
import { generateGrid } from "@/lib/weaverly";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "weaverly — encode names into living textile systems" },
      { name: "description", content: "weaverly is a small browser loom that turns names, words, and sigils into animated ascii, cross-stitch, and woven typographic artifacts." },
      { property: "og:title", content: "weaverly — encode names into living textile systems" },
      { property: "og:description", content: "a generative atelier for ascii, cross-stitch, and woven typography." },
    ],
  }),
  component: Index,
});

function MiniGrid({ seed }: { seed: string }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setPhase((p) => p + 1), 90);
    return () => clearInterval(id);
  }, []);
  const grid = generateGrid({
    text: seed, style: "cross-stitch", density: 0.6, symmetry: "quad",
    cols: 24, rows: 12, paletteIndex: 0,
  });
  const total = grid.length * grid[0].length;
  const shown = phase * 6 % (total + 60);
  return (
    <pre className="m-0 font-mono text-[10px] leading-[1.1] text-primary">
      {grid.map((row, y) => row.map((c, x) => (y * grid[0].length + x < shown ? c : " ")).join(" ")).join("\n")}
    </pre>
  );
}

function Index() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <section className="relative overflow-hidden">
        <div className="bg-stripes">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink">a small browser loom · est. mmxxv</p>
            <h1 className="mt-6 font-display text-[14vw] leading-[0.82] text-primary sm:text-[10vw]">
              weaverly
            </h1>
            <p className="mt-8 max-w-xl font-serif-display text-2xl text-ink/90 sm:text-3xl">
              type a name. watch it become thread, stitch, glyph, and grid — a living textile system spun from the letters you give it.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/studio" className="rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground hover:opacity-90">
                enter the studio
              </Link>
              <Link to="/features" className="rounded-full border border-ink px-6 py-3 text-sm text-ink hover:bg-ink hover:text-background">
                see what it weaves
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Marquee words={["weaverly", "✦", "cross-stitch", "✦", "ascii", "✦", "atelier", "✦", "loom", "✦"]} />

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-10 md:grid-cols-3">
          {[
            { seed: "natalie", title: "names become grids", body: "every letter shifts the seed. the same word always weaves the same cloth — a deterministic sigil for the people you love." },
            { seed: "atelier", title: "patterns breathe", body: "stitches appear one by one. threads pulse softly. the loom plays itself, and you can pause it whenever the cloth feels finished." },
            { seed: "keepsake", title: "made to be kept", body: "export svg, txt, or copy the ascii directly. small enough to print, embroider, tattoo, or paste into a letter to someone far away." },
          ].map((card) => (
            <article key={card.seed} className="animate-fade-up rounded-xl border border-border bg-card p-6">
              <div className="mb-4 overflow-hidden rounded-md border border-border bg-background p-3">
                <MiniGrid seed={card.seed} />
              </div>
              <h3 className="font-display text-2xl text-primary">{card.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-foreground/80">{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">the premise</p>
            <h2 className="mt-4 font-display text-6xl text-primary">encode identity into living textile systems.</h2>
          </div>
          <p className="font-serif-display text-2xl leading-snug text-foreground/85">
            weaverly is not a logo maker. it is a quiet machine for ritual objects — woven from usernames, fandom terms, relationship labels, and the names we whisper to ourselves. type something small. let the loom do the rest.
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
