import Link from "next/link";
import type { BusinessSettings } from "@/lib/site-settings";

const navItems = [
  { href: "/#hizmetler", label: "Hizmetler" },
  { href: "/#galeri", label: "Galeri" },
  { href: "/#mekan", label: "Mekan" },
  { href: "/#yorumlar", label: "Yorumlar" },
];

export function SiteHeader({ business }: { business: BusinessSettings }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 md:px-10">
      <div className="nav-sheen relative mx-auto flex w-full max-w-6xl items-center justify-between gap-3 overflow-hidden rounded-2xl border border-[rgba(224,164,88,.22)] bg-[rgba(12,23,18,.68)] px-4 py-3 shadow-[0_20px_50px_-30px_rgba(0,0,0,.9)] backdrop-blur md:px-6">
        <Link
          href="/"
          className="font-display text-xl italic text-[var(--amber)] md:text-2xl"
        >
          {business.shortName}
        </Link>

        <nav className="hidden items-center gap-6 text-xs tracking-[0.1em] text-[var(--cream)]/90 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 transition hover:bg-[rgba(224,164,88,.12)] hover:text-[var(--amber)]"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/sss"
            className="rounded-full px-3 py-1.5 transition hover:bg-[rgba(224,164,88,.12)] hover:text-[var(--amber)]"
          >
            SSS
          </Link>
          <Link
            href="/iletisim"
            className="rounded-full px-3 py-1.5 transition hover:bg-[rgba(224,164,88,.12)] hover:text-[var(--amber)]"
          >
            Iletisim
          </Link>
          <Link
            href="/admin"
            className="rounded-full border border-[rgba(224,164,88,.45)] px-3 py-1.5 transition hover:bg-[rgba(224,164,88,.16)] hover:text-[var(--amber)]"
          >
            Admin
          </Link>
        </nav>

        <a
          href={`tel:${business.phoneE164}`}
          className="rounded-full border border-[var(--amber)] bg-[rgba(224,164,88,.08)] px-4 py-2 text-[10px] uppercase tracking-[0.12em] text-[var(--amber)] transition hover:bg-[var(--amber)] hover:text-[var(--forest-deep)] md:text-xs"
        >
          {business.phoneDisplay}
        </a>
      </div>
    </header>
  );
}
