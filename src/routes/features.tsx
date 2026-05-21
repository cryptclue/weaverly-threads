import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "features — weaverly" },
      { name: "description", content: "every feature inside weaverly: glyph systems, symmetry engines, palette work, weave playback, and quiet export." },
      { property: "og:title", content: "features — weaverly" },
      { property: "og:description", content: "what the loom can do." },
    ],
  }),
  component: Features,
});

const groups = [
  {
    title: "generation",
    items: [
      ["deterministic seed", "the same word always weaves the same cloth. small letter changes ripple into entirely new arrangements."],
      ["five textile styles", "ascii, cross-stitch, woven, lace, and beadwork — each with its own glyph vocabulary."],
      ["symmetry engines", "none, mirror-x, mirror-y, and quad. fold the pattern across its own seams."],
      ["density control", "from sparse constellations to dense embroidered fields."],
    ],
  },
  {
    title: "motion",
    items: [
      ["loom playback", "stitches appear one by one, like a hand weaving in real time."],
      ["speed control", "from meditative single stitches to a cascading terminal rain."],
      ["pause and replay", "stop the cloth at any moment. start the weave again from the first thread."],
      ["ambient pulse", "the cobalt thread breathes softly across the entire studio."],
    ],
  },
  {
    title: "palette",
    items: [
      ["cobalt & cream", "the house palette — electric blue on warm paper."],
      ["ink on butter", "soft yellow ground with deep ink stitches."],
      ["monochrome", "for the purists. ink, paper, nothing else."],
      ["reverse atelier", "night mode. cobalt thread on near-black cloth."],
    ],
  },
  {
    title: "export",
    items: [
      ["svg", "scalable vector textile, ready for print or embroidery transfer."],
      ["plain text", "the raw ascii — perfect for letters, readmes, or terminal art."],
      ["copy to clipboard", "one click, into any other quiet document."],
      ["printable charts", "every grid is already a stitch chart in disguise."],
    ],
  },
];

function Features() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <section className="bg-stripes">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink">features</p>
          <h1 className="mt-6 font-display text-[12vw] leading-[0.82] text-primary sm:text-[8vw]">what the loom can do.</h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2">
          {groups.map((g) => (
            <div key={g.title} className="rounded-xl border border-border bg-card p-8">
              <h2 className="font-display text-4xl text-primary">{g.title}</h2>
              <ul className="mt-6 divide-y divide-border">
                {g.items.map(([name, desc]) => (
                  <li key={name} className="grid gap-1 py-4 sm:grid-cols-[160px_1fr] sm:gap-6">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink">{name}</span>
                    <span className="text-base leading-relaxed text-foreground/80">{desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start gap-4 rounded-xl border border-border bg-accent p-10">
          <p className="font-serif-display text-3xl text-ink">there is more woven in. open the studio and pull a thread.</p>
          <Link to="/studio" className="rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground hover:opacity-90">
            enter the studio →
          </Link>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
