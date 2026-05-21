import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "about — weaverly" },
      { name: "description", content: "weaverly is an atelier for procedural textiles. a quiet tool for turning words into thread, stitch, and grid." },
      { property: "og:title", content: "about — weaverly" },
      { property: "og:description", content: "a small browser loom for procedural textile pieces." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <section className="bg-stripes-sm">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink">about</p>
          <h1 className="mt-6 font-display text-[12vw] leading-[0.82] text-primary sm:text-[8vw]">a small loom, kept indoors.</h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20 space-y-10 text-lg leading-relaxed text-foreground/85">
        <p className="font-serif-display text-3xl text-ink">
          weaverly began as a question: what would it feel like to give a name to a machine and let the machine give back a piece of cloth?
        </p>
        <p>
          most generative tools want to be impressive. weaverly wants to be intimate. you type a word — the name of a friend, a fandom phrase, a relationship label, a sigil you only show yourself — and the loom translates the letters into stitches, threads, glyphs, and grids. the same word always becomes the same pattern. it is a quiet kind of permanence.
        </p>
        <p>
          we draw from cross-stitch samplers, woven tapestries, lace charts, beadwork grids, and the soft melancholy of late-night terminal sessions. the result sits somewhere between digital embroidery software, kinetic typography, and a private journal.
        </p>
        <p>
          there is no feed, no follower count, no ai trying to guess what you meant. just letters, threads, and a loom that listens.
        </p>
        <div className="border-t border-border pt-10">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">made with</p>
          <p className="mt-3 font-serif-display text-2xl text-ink">
            cobalt ink, butter-yellow stripe, and a deterministic prng small enough to fit in a pocket.
          </p>
        </div>
        <Link to="/studio" className="inline-block rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground hover:opacity-90">
          open the studio →
        </Link>
      </section>
      <SiteFooter />
    </div>
  );
}
