import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter, Marquee } from "@/components/site-chrome";
import { generate, SUPPORTED_WORDS } from "@/lib/weaverly";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "weaverly, turn words into living textile pattern" },
      { name: "description", content: "weaverly is a tiny browser loom. type rose, heart, moon, mountain, and watch it bloom in ascii, cross-stitch, woven, lace, and beadwork." },
      { property: "og:title", content: "weaverly, turn words into living textiles" },
      { property: "og:description", content: "type rose, see a rose." },
    ],
  }),
  component: Index,
});

function MiniGrid({ seed, style = "cross-stitch" as const }: { seed: string; style?: "ascii" | "cross-stitch" | "woven" | "lace" | "beadwork" }) {
  const { grid } = generate({
    text: seed, style, density: 0.9, symmetry: "none",
    cols: 22, rows: 14, paletteIndex: 0,
  });
  return (
    <pre className="m-0 font-mono text-[10px] leading-[1.1] text-primary">
      {grid.map((row) => row.join(" ")).join("\n")}
    </pre>
  );
}

function Index() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* hero */}
      <section className="bg-stripes border-b border-ink">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
          <div className="card-dashed px-8 py-14 sm:px-16 sm:py-20 text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink">introducing</p>
            <h1 className="mt-6 font-display text-5xl leading-[1.05] text-ink sm:text-6xl">
              a small browser loom for any word <br className="hidden sm:block" /> you'd like to turn into cloth:
            </h1>
            <p className="mt-8 font-display text-4xl italic sm:text-6xl">
              <span className="marker">"type a rose, see a rose."</span>
            </p>
            <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-ink/75">
              weaverly listens to your word, recognises a shape, rose, heart, moon, mountain, butterfly, and weaves it
              one stitch at a time in ascii, cross-stitch, woven, lace, or beadwork.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link to="/studio" className="btn-ember">enter the studio</Link>
              <Link to="/features" className="rounded-md border border-ink px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] hover:bg-stripe/40">
                see what it weaves →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Marquee words={["rose", "✿", "heart", "✦", "moon", "✿", "mountain", "✦", "butterfly", "✿", "lace", "·", "thread", "·", "loom"]} />

      {/* three cards */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { seed: "rose", title: "words become shapes", body: "type rose and a rose blooms. type heart and a heart appears. type moon and a crescent rises. weaverly interprets the word, then weaves the shape." },
            { seed: "star", title: "stitches you can choose", body: "the same shape lives differently in each stitch: ascii dots, cross-stitch x's, woven blocks, lace florals, or beaded circles. pick the cloth that fits the word." },
            { seed: "butterfly", title: "made to be kept", body: "every weave can be paused, copied as plain ascii, or exported as svg, small enough to print, embroider, or paste into a letter." },
          ].map((card) => (
            <article key={card.seed} className="card-dashed animate-fade-up p-6">
              <div className="mb-5 overflow-hidden rounded-lg border border-ink/30 bg-background p-3">
                <MiniGrid seed={card.seed} />
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/60">no. {card.seed}</p>
              <h3 className="mt-2 font-display text-3xl text-ink">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/75">{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* stitch gallery */}
      <section className="border-y border-ink bg-background">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink">the stitches</p>
              <h2 className="mt-3 font-display text-5xl text-ink">one word, five cloths.</h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-ink/70">
              the same "rose" reads differently in ascii, cross-stitch, woven, lace, and beadwork. choose the cloth that matches your mood.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {(["ascii", "cross-stitch", "woven", "lace", "beadwork"] as const).map((s) => (
              <div key={s} className="card-dashed overflow-hidden p-4">
                <div className="rounded-md border border-ink/30 bg-background p-3">
                  <MiniGrid seed="rose" style={s} />
                </div>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-primary">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* premise */}
      <section className="border-b border-ink bg-stripes-sm">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <div className="card-dashed grid gap-10 p-12 md:grid-cols-2 md:items-center">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink">the premise</p>
              <h2 className="mt-4 font-display text-5xl text-ink">
                encode small things into <span className="marker italic">living textile.</span>
              </h2>
            </div>
            <p className="text-lg leading-relaxed text-ink/80">
              weaverly is not a logo maker. it is a quiet machine for ritual objects, woven from the names of flowers,
              creatures, weather, and quiet symbols. type something small. let the loom do the rest.
            </p>
          </div>
        </div>
      </section>

      {/* how it works */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink">how it works</p>
        <h2 className="mt-3 font-display text-5xl text-ink">three quiet steps.</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { n: "01", t: "type a word", b: "any name, feeling, fandom term, or symbol. lowercase, plural, alias, the loom is generous." },
            { n: "02", t: "watch it interpret", b: "if it knows the shape, it weaves it. if not, the oracle drafts a fresh interpretation, never the same twice." },
            { n: "03", t: "keep the cloth", b: "pause, replay, copy the ascii, or export as svg. small enough to print, big enough to feel." },
          ].map((s) => (
            <div key={s.n} className="card-dashed p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">step {s.n}</p>
              <h3 className="mt-3 font-display text-3xl text-ink">{s.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/75">{s.b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* word index */}
      <section className="border-y border-ink bg-background">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:items-start">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink">the herbarium</p>
              <h2 className="mt-3 font-display text-5xl text-ink">
                words the <span className="marker italic">loom knows.</span>
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink/70">
                a small library of recognised shapes. anything outside it is drawn fresh by the oracle, never the same way twice.
              </p>
            </div>
            <div className="card-dashed p-6">
              <div className="flex flex-wrap gap-1.5">
                {SUPPORTED_WORDS.map((w) => (
                  <span key={w} className="rounded-full border border-ink/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ink">
                    {w}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* testimonials / quiet voices */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink">quiet voices</p>
        <h2 className="mt-3 font-display text-5xl text-ink">notes from the studio.</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { q: "i typed my grandmother's name and got something i wanted to embroider.", a: "n., a knitter" },
            { q: "the only generative tool that doesn't feel like a slot machine.", a: "r., a typographer" },
            { q: "i print one every sunday and tape it inside my notebook.", a: "j., a quiet archivist" },
          ].map((t) => (
            <figure key={t.a} className="card-dashed p-8">
              <blockquote className="font-display text-2xl italic text-ink">"{t.q}"</blockquote>
              <figcaption className="mt-5 font-mono text-[10px] uppercase tracking-[0.25em] text-ink/60">{t.a}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* final cta */}
      <section className="border-t border-ink bg-stripes">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <div className="card-dashed px-10 py-16 text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink">step inside</p>
            <h2 className="mt-5 font-display text-5xl text-ink sm:text-6xl">
              the loom is <span className="marker italic">always warm.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-ink/75">
              one word is enough. type something small, and watch it become cloth.
            </p>
            <div className="mt-10 flex justify-center">
              <Link to="/studio" className="btn-ember">open the studio</Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
