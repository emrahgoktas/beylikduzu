import Image from "next/image";
import Link from "next/link";
import { CtaButtons } from "@/components/cta-buttons";
import { REVIEWS } from "@/data/reviews";
import { SERVICES } from "@/data/services";
import { BUSINESS } from "@/lib/site";

const leaves = [
  { left: "8%", size: 16, duration: 16, delay: 1 },
  { left: "18%", size: 22, duration: 19, delay: 5 },
  { left: "31%", size: 18, duration: 17, delay: 3 },
  { left: "42%", size: 26, duration: 22, delay: 7 },
  { left: "54%", size: 14, duration: 15, delay: 9 },
  { left: "67%", size: 24, duration: 20, delay: 2 },
  { left: "78%", size: 19, duration: 18, delay: 11 },
  { left: "88%", size: 17, duration: 16, delay: 6 },
];

function LeafIcon() {
  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      aria-hidden="true"
    >
      <path d="M4 14C4 8 9 3 20 3C20 14 15 19 9 19C6.5 19 5 17.5 4 14Z" />
      <path d="M4 20C6 16 9 13 13 11" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 md:px-10">
        <div className="nav-sheen relative mx-auto flex w-full max-w-6xl items-center justify-between gap-3 overflow-hidden rounded-2xl border border-[rgba(224,164,88,.22)] bg-[rgba(12,23,18,.68)] px-4 py-3 shadow-[0_20px_50px_-30px_rgba(0,0,0,.9)] backdrop-blur md:px-6">
          <span className="font-display text-xl italic text-[var(--amber)] md:text-2xl">
            Masaj Beylikduzu
          </span>
          <nav className="hidden items-center gap-6 text-xs tracking-[0.1em] text-[var(--cream)]/90 lg:flex">
            {[
              ["#hizmetler", "Hizmetler"],
              ["#galeri", "Galeri"],
              ["#mekan", "Mekan"],
              ["#yorumlar", "Yorumlar"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="rounded-full px-3 py-1.5 transition hover:bg-[rgba(224,164,88,.12)] hover:text-[var(--amber)]"
              >
                {label}
              </a>
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
          </nav>
          <a
            href={`tel:${BUSINESS.phoneE164}`}
            className="rounded-full border border-[var(--amber)] bg-[rgba(224,164,88,.08)] px-4 py-2 text-[10px] uppercase tracking-[0.12em] text-[var(--amber)] transition hover:bg-[var(--amber)] hover:text-[var(--forest-deep)] md:text-xs"
          >
            {BUSINESS.phoneDisplay}
          </a>
        </div>
      </header>

      <main>
        <section className="relative flex min-h-screen items-end overflow-hidden bg-[radial-gradient(ellipse_at_30%_20%,rgba(224,164,88,.16),transparent_55%),radial-gradient(ellipse_at_80%_70%,rgba(92,122,92,.18),transparent_55%),linear-gradient(180deg,var(--forest-deep)_0%,var(--forest)_60%,#1B2E23_100%)] pb-20 pt-44 md:pb-28">
          <div className="absolute inset-0">
            <Image
              src="/images/galery-9.jpeg"
              alt="Masaj Beylikduzu icin dogal ambiyansli hero arka plan"
              fill
              priority
              className="object-cover opacity-28"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(12,23,18,.94)_24%,rgba(12,23,18,.56)_62%,rgba(12,23,18,.94)_100%)]" />
          </div>
          <div className="hero-glow absolute right-[4%] top-[6%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(224,164,88,.38),transparent_70%)] blur-[10px]" />
          <div className="absolute inset-0 pointer-events-none">
            {leaves.map((leaf, index) => (
              <div
                key={`${leaf.left}-${index}`}
                className="leaf-fall absolute opacity-55 text-[var(--amber)]"
                style={{
                  left: leaf.left,
                  width: `${leaf.size}px`,
                  height: `${leaf.size}px`,
                  animationDuration: `${leaf.duration}s`,
                  animationDelay: `${leaf.delay}s`,
                }}
              >
                <LeafIcon />
              </div>
            ))}
          </div>

          <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-8 px-4 md:grid-cols-[1.2fr_0.8fr] md:px-10">
            <div>
              <p className="fade-up mb-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.23em] text-[var(--amber)]">
                <span className="inline-block h-px w-8 bg-[var(--amber)]" />
                Beylikduzu · Sehir Icinde Dogal Siginak
              </p>
              <h1 className="fade-up fade-up-delay-1 max-w-4xl text-4xl leading-[1.08] text-[var(--cream)] sm:text-6xl md:text-7xl">
                Beylikduzu Masaj Salonu - Ruhunuza iyi gelen{" "}
                <em className="italic text-[var(--amber)]">sessiz bir mola</em>
              </h1>
              <p className="fade-up fade-up-delay-2 mt-6 max-w-2xl text-base text-[#C9C2AE] md:text-lg">
                Masaj Beylikduzu, Beylikduzu&rsquo;nde ahsap dokular, mum isigi
                ve profesyonel terapistlerle klasik, aromaterapi, sicak tas ve
                sportif masaj hizmetlerini randevulu olarak sunar.
              </p>
              <div className="fade-up fade-up-delay-3 mt-9">
                <CtaButtons />
              </div>
              <p className="mt-8 flex items-center gap-2 text-sm text-[#B7B09B]">
                <span className="tracking-[0.2em] text-[var(--amber)]">
                  ★★★★★
                </span>
                Misafir memnuniyeti odakli deneyim · 10:00-21:00 randevu
              </p>
            </div>

            <aside className="border-pulse fade-up fade-up-delay-3 self-end rounded-2xl border border-[rgba(224,164,88,.28)] bg-[rgba(12,23,18,.78)] p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,.95)]">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--amber)]">
                Hizli Randevu Bilgisi
              </p>
              <ul className="mt-4 space-y-3 text-sm text-[#C9C2AE]">
                <li className="flex items-start justify-between gap-3 border-b border-[rgba(224,164,88,.18)] pb-2">
                  <span>Klasik Masaj</span>
                  <span className="font-display italic text-[var(--amber)]">
                    60 dk
                  </span>
                </li>
                <li className="flex items-start justify-between gap-3 border-b border-[rgba(224,164,88,.18)] pb-2">
                  <span>Aromaterapi</span>
                  <span className="font-display italic text-[var(--amber)]">
                    70 dk
                  </span>
                </li>
                <li className="flex items-start justify-between gap-3 border-b border-[rgba(224,164,88,.18)] pb-2">
                  <span>Sicak Tas</span>
                  <span className="font-display italic text-[var(--amber)]">
                    90 dk
                  </span>
                </li>
              </ul>
              <a
                href={BUSINESS.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center rounded-full border border-[var(--amber)] px-4 py-3 text-xs uppercase tracking-[0.15em] text-[var(--amber)] transition hover:bg-[var(--amber)] hover:text-[var(--forest-deep)]"
              >
                WhatsApp ile Hizli Rezervasyon
              </a>
            </aside>
          </div>
        </section>

        <section id="hizmetler" className="mx-auto max-w-6xl px-4 py-28 md:px-10">
          <div className="mb-16 text-center">
            <p className="mb-4 text-xs uppercase tracking-[0.24em] text-[var(--amber)]">
              Bitkilerden Ilham
            </p>
            <h2 className="text-3xl sm:text-4xl">
              Beylikduzu&rsquo;nde Masaj Hizmetlerimiz
            </h2>
          </div>
          <div className="grid gap-px bg-[rgba(224,164,88,.15)] md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <article
                key={service.slug}
                className="bg-[var(--forest)] p-8 transition hover:-translate-y-1 hover:bg-[#1C2E23]"
              >
                <div className="mb-5 h-7 w-7 text-[var(--moss)]">
                  <LeafIcon />
                </div>
                <h3 className="text-2xl text-[var(--cream)]">{service.name}</h3>
                <p className="mt-3 text-sm text-[#B7B09B]">
                  {service.shortDescription}
                </p>
                <p className="mt-5 border-t border-[rgba(224,164,88,.15)] pt-4 font-display text-sm italic text-[var(--amber)]">
                  {service.duration} · {service.price}
                </p>
                <Link
                  href={`/hizmetler/${service.slug}`}
                  className="mt-5 inline-block text-xs uppercase tracking-[0.14em] text-[var(--amber)]"
                >
                  Detayi Incele
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section id="galeri" className="mx-auto max-w-6xl px-4 py-10 md:px-10">
          <div className="mb-12 text-center">
            <p className="mb-4 text-xs uppercase tracking-[0.24em] text-[var(--amber)]">
              Mekandan
            </p>
            <h2 className="text-3xl sm:text-4xl">Mekanimizdan Kareler</h2>
          </div>
          <div className="grid auto-rows-[220px] gap-4 md:grid-cols-3">
            <div className="lift-group relative overflow-hidden rounded-lg shadow-[0_30px_70px_-28px_rgba(0,0,0,.6)] md:row-span-2">
              <Image
                src="/images/galery-1.jpeg"
                alt="Masaj Beylikduzu ic mekan gorunumu"
                fill
                className="lift-image object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="lift-group relative overflow-hidden rounded-lg shadow-[0_30px_70px_-28px_rgba(0,0,0,.6)]">
              <Image
                src="/images/galery-2.jpeg"
                alt="Beylikduzu spa terapi odasi ambiyansi"
                fill
                className="lift-image object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="lift-group relative overflow-hidden rounded-lg shadow-[0_30px_70px_-28px_rgba(0,0,0,.6)]">
              <Image
                src="/images/galery-3.jpeg"
                alt="Masaj Beylikduzu mum isigi ve ahsap detaylar"
                fill
                className="lift-image object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="lift-group relative overflow-hidden rounded-lg shadow-[0_30px_70px_-28px_rgba(0,0,0,.6)] md:col-span-2">
              <Image
                src="/images/galery-4.jpeg"
                alt="Beylikduzu masaj salonu dinlenme alani"
                fill
                className="lift-image object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        <section id="mekan" className="mt-20 bg-[var(--forest-deep)] py-24">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-2 md:px-10">
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-[rgba(224,164,88,.2)] shadow-[0_50px_100px_-35px_rgba(0,0,0,.6)]">
              <Image
                src="/images/galery-5.jpeg"
                alt="Masaj Beylikduzu terapi alani genel gorunum"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <article>
              <h2 className="text-3xl sm:text-4xl">
                Neden Masaj Beylikduzu&rsquo;nu Secmelisiniz
              </h2>
              <p className="mt-6 text-[#C9C2AE]">
                Mekanda her oda gercek ahsap dokularla, dogal mum isigiyla ve
                canli bitkilerle tasarlandi. Masaj Beylikduzu,
                Beylikduzu&rsquo;nde masaj deneyimini yogun sehir temposundan ayrisan
                sakin bir ritimde sunar.
              </p>
              <p className="mt-4 text-[#C9C2AE]">
                Beylikduzu&rsquo;nun yesil alanlarina yakin, sakin bir sokakta
                randevulu ve az sayida misafirle calisiyoruz.
              </p>
              <div className="mt-8 flex gap-10">
                <div>
                  <p className="font-display text-4xl italic text-[var(--amber)]">
                    7
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.08em] text-[#8A9086]">
                    Yillik Deneyim
                  </p>
                </div>
                <div>
                  <p className="font-display text-4xl italic text-[var(--amber)]">
                    4
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.08em] text-[#8A9086]">
                    Ozel Oda
                  </p>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="bg-[linear-gradient(180deg,var(--forest),var(--forest-deep))] py-24 text-center">
          <div className="mx-auto max-w-6xl px-4 md:px-10">
            <h2 className="text-3xl sm:text-4xl">Salonumuz Hangi Saatlerde Acik?</h2>
            <p className="mx-auto mt-4 max-w-xl text-[#B7B09B]">
              Masaj Beylikduzu, Beylikduzu&rsquo;nde her gun 10:00-21:00 saatleri
              arasinda randevu kabul eder.
            </p>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["10:00", "Sabah Sakinligi"],
                ["14:00", "Oglen Molasi"],
                ["19:00", "Aksam Rahatlamasi"],
                ["21:00", "Son Randevu"],
              ].map(([time, label]) => (
                <div key={time}>
                  <p className="font-display text-3xl italic text-[var(--amber)]">
                    {time}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.1em] text-[#8A9086]">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="yorumlar" className="mx-auto max-w-6xl px-4 py-24 md:px-10">
          <h2 className="text-center text-3xl sm:text-4xl">
            Misafir Yorumlari ve Sosyal Kanit
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {REVIEWS.map((review, index) => (
              <article
                key={`${review.author}-${index}`}
                className="rounded-xl border border-[rgba(224,164,88,.2)] bg-[rgba(12,23,18,.7)] p-6"
              >
                <p className="text-[var(--amber)]">{"★".repeat(review.rating)}</p>
                <p className="mt-3 text-sm text-[#C9C2AE]">
                  &ldquo;{review.text}&rdquo;
                </p>
                <p className="mt-4 text-xs uppercase tracking-[0.08em] text-[#9ea593]">
                  {review.author} · {review.source}
                </p>
              </article>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-[#8A9086]">
            TODO: Google Places API ile gercek yorumlar dinamik olarak
            baglanacak.
          </p>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-10 md:px-10">
          <article className="rounded-2xl border border-[rgba(224,164,88,.2)] bg-[rgba(12,23,18,.7)] p-8">
            <h2 className="text-3xl sm:text-4xl">Sikca Sorulan Sorular</h2>
            <p className="mt-4 max-w-3xl text-[#C9C2AE]">
              Masaj Beylikduzu hakkinda fiyat, randevu,
              cift masaji ve aromaterapi gibi sorularin net cevaplarini SSS
              sayfasinda bulabilirsiniz.
            </p>
            <Link
              href="/sss"
              className="mt-6 inline-block rounded-full border border-[var(--amber)] px-6 py-3 text-xs uppercase tracking-[0.14em] text-[var(--amber)]"
            >
              Tum SSS Icerigini Gor
            </Link>
          </article>
        </section>

        <section id="iletisim" className="border-t border-[rgba(224,164,88,.14)] bg-[var(--forest-deep)] py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 md:px-10">
            <article>
              <h2 className="text-3xl sm:text-4xl">Bize Ulasin</h2>
              <p className="mt-5 text-[#C9C2AE]">
                Masaj Beylikduzu, Beylikduzu&rsquo;nde randevulu calisan bir masaj
                salonudur. Telefon ve WhatsApp hatti uzerinden hizli sekilde
                seans saati planlayabilirsiniz.
              </p>
              <div className="mt-6 space-y-2 text-sm text-[#B7B09B]">
                <p>Telefon: {BUSINESS.phoneDisplay}</p>
                <p>Adres: {BUSINESS.addressLine}</p>
                <p>Saatler: {BUSINESS.openingHours}</p>
              </div>
              <div className="mt-7">
                <CtaButtons compact />
              </div>
            </article>
            <article className="rounded-xl border border-[rgba(224,164,88,.15)] p-6">
              <h3 className="text-2xl">Yol Tarifi</h3>
              <p className="mt-4 text-sm text-[#B7B09B]">
                Google Haritalar uzerinden dogrudan rota almak icin baglantiyi
                kullanin.
              </p>
              <a
                href={BUSINESS.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-block rounded-full border border-[var(--amber)] px-5 py-3 text-xs uppercase tracking-[0.14em] text-[var(--amber)]"
              >
                Yol Tarifi Al
              </a>
            </article>
          </div>
        </section>
      </main>

      <footer className="footer-ambient border-t border-[rgba(224,164,88,.14)] bg-[var(--forest-deep)] pb-24 pt-16 md:pb-12">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-3 md:px-10">
          <div>
            <span className="font-display text-2xl italic text-[var(--amber)]">
              Masaj Beylikduzu
            </span>
            <p className="mt-3 text-sm text-[#B7B09B]">
              Dogal dokular, sakin atmosfer ve profesyonel terapistlerle
              Beylikduzu&rsquo;nde randevulu masaj deneyimi.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--amber)]">
              Hizli Erisim
            </p>
            <div className="mt-3 space-y-2 text-sm text-[#B7B09B]">
              <p>{BUSINESS.addressLine}</p>
              <a href={`tel:${BUSINESS.phoneE164}`} className="block hover:text-[var(--amber)]">
                {BUSINESS.phoneDisplay}
              </a>
              <a href={BUSINESS.whatsappUrl} target="_blank" rel="noreferrer" className="block hover:text-[var(--amber)]">
                WhatsApp ile Iletisim
              </a>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--amber)]">
              Cevrimici Randevu
            </p>
            <p className="mt-3 text-sm text-[#B7B09B]">
              Her gun 10:00 - 21:00 arasi telefon ve WhatsApp uzerinden seans
              planlanir.
            </p>
            <a
              href={`tel:${BUSINESS.phoneE164}`}
              className="mt-4 inline-flex rounded-full border border-[var(--amber)] px-4 py-2 text-xs uppercase tracking-[0.14em] text-[var(--amber)] transition hover:bg-[var(--amber)] hover:text-[var(--forest-deep)]"
            >
              Hemen Ara
            </a>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-6xl border-t border-[rgba(224,164,88,.14)] px-4 pt-6 text-center text-xs tracking-[0.05em] text-[#6E756A] md:px-10">
          © 2026 masajbeylikduzu.com - Masaj Beylikduzu
        </div>
      </footer>
    </>
  );
}
