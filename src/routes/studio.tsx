import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { Loom } from "@/components/loom";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "studio — weaverly" },
      { name: "description", content: "the weaverly studio. type a word, choose a style, and weave it into ascii, cross-stitch, woven, lace, or beadwork pattern." },
      { property: "og:title", content: "studio — weaverly" },
      { property: "og:description", content: "weave a word into living textile." },
    ],
  }),
  component: Studio,
});

function Studio() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <section className="border-b border-border bg-stripes-sm">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink">studio · loom mode</p>
            <h1 className="mt-2 font-display text-6xl text-primary sm:text-7xl">the loom</h1>
          </div>
          <p className="max-w-md font-serif-display text-xl text-ink/85">
            type something small. the loom will spin it into thread. nothing is sent anywhere — the cloth lives only in this browser.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <Loom />
      </section>
      <SiteFooter />
    </div>
  );
}
