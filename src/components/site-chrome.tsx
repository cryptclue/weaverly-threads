import { Link, useLocation } from "@tanstack/react-router";

export function SiteHeader() {
  const { pathname } = useLocation();
  const link = (to: string, label: string) => (
    <Link
      to={to}
      className={`px-3 py-1.5 text-sm tracking-wide transition-colors ${
        pathname === to ? "text-primary" : "text-foreground/70 hover:text-foreground"
      }`}
    >
      {label}
    </Link>
  );
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="block h-3 w-3 rounded-full bg-primary animate-thread" />
          <span className="font-display text-xl text-primary">weaverly</span>
        </Link>
        <nav className="flex items-center gap-1">
          {link("/", "home")}
          {link("/about", "about")}
          {link("/features", "features")}
          {link("/studio", "studio")}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <span>weaverly — a small loom for digital keepsakes.</span>
        <span className="font-mono">est. mmxxv · woven in the browser</span>
      </div>
    </footer>
  );
}

export function Marquee({ words }: { words: string[] }) {
  const row = (
    <div className="flex shrink-0 items-center gap-10 pr-10">
      {words.map((w, i) => (
        <span key={i} className="font-display text-[14vw] leading-none text-primary">
          {w}
        </span>
      ))}
    </div>
  );
  return (
    <div className="overflow-hidden border-y border-border bg-stripes py-4">
      <div className="flex w-max animate-marquee">
        {row}
        {row}
      </div>
    </div>
  );
}
