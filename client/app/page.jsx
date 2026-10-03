"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import Carousel from "@/components/Carousel";
import { Ph, Split, Pill, Arrow } from "@/components/ui";

const px = "px-5 md:px-10 lg:px-16";
const price = "₹1,500";
// All images live in /public/images — see /public/images/README.md for the file names
const img = (p) => `/images/${p}`; // no extension needed: .jpg, .png, .webp, .jpeg, .avif all work

const bestSellers = [
  { name: "Beunique Face Oil", img: img("products/best-1") },
  { name: "Beunique Gentle Cleanser", img: img("products/best-2") },
  { name: "Beunique Moisturizing Cream", img: img("products/best-3") },
  { name: "Beunique Vitamin C Serum", img: img("products/best-4") },
];

const withImgs = (key, names) =>
  names.map((name, i) => ({ name, img: img(`products/${key}-${i + 1}`) }));
const categories = {
  Body: withImgs("body", [
    "Beunique Hydrating Body Mist",
    "Exfoliating Body Scrub",
    "Nourishing Body Lotion",
    "Intensive Body Butter",
  ]),
  Skincare: withImgs("skincare", [
    "Gentle Cleanser",
    "Brightening Serum",
    "Moisturizing Cream",
    "Face Oil",
  ]),
  Hair: withImgs("hair", [
    "Nourishing Hair Oil",
    "Gentle Shampoo",
    "Daily Conditioner",
    "Repair Hair Mask",
  ]),
  More: withImgs("more", [
    "Lip Balm",
    "Face Mist",
    "Daily Sunscreen",
    "Eye Cream",
  ]),
};

const steps = [
  {
    title: "cleanse",
    img: img("cleanse"),
    text: "Our Gentle Cleanser removes dirt, excess oil, and buildup while leaving skin fresh and comfortable.",
    cta: "Shop cleanser",
  },
  {
    title: "treat",
    img: img("treat"),
    text: "Follow with our Brightening Serum or Nourishing Face Oil for smooth, radiant-looking skin.",
    cta: "Shop Serum",
  },
  {
    title: "moisturize",
    img: img("moisturize"),
    text: "Finish with our Moisturizing Face Cream to keep skin hydrated, soft, and balanced.",
    cta: "Shop Moisturizer",
  },
];

const reviews = [
  {
    name: "Shraddha S",
    img: img("avatars/shraddha"),
    text: "Been using it for a few weeks and my skin honestly feels softer and more hydrated. The products are light, simple, and easy to use every day.",
  },
  { name: "Arushi M", img: img("avatars/arushi"), text: "" },
  {
    name: "Kashish M",
    img: img("avatars/kashish"),
    text: "My skin feels noticeably softer and more balanced after just a few weeks. The products feel gentle, lightweight, and actually fit into my everyday routine.",
  },
  { name: "Nasreen", img: img("avatars/nasreen"), text: "" },
];

const featured = [
  {
    quote:
      "My routine finally feels simple. My skin feels softer, more hydrated, and I actually look forward to using it every morning.",
    name: "Firdous Kh.",
  },
  {
    quote:
      "Lightweight, gentle, and it genuinely fits into my day. My skin has never felt this balanced.",
    name: "Kashish M",
  },
  {
    quote:
      "Simple products that actually work. My skin feels calm and hydrated all day.",
    name: "Shraddha S",
  },
];

const footerCols = {
  Shop: ["All product", "New Arrivals", "Best Sellers", "Shop by Category"],
  Category: ["Skincare", "Body Care", "Hair Care", "Wellness"],
  Help: ["Shipping", "Return Policy", "Ingredients", "Care Instructions"],
};

/* ---------- small pieces ---------- */
const Stars = () => (
  <span className="text-[11px] tracking-[2px] text-amber-400">★★★★★</span>
);

function ProductCard({ name, img }) {
  return (
    <article className="border-r border-neutral-200 bg-white">
      <Ph
        src={img}
        alt={name}
        className="aspect-[3/4] w-full"
        label="Product"
      />
      <div className="border-t border-neutral-200 py-4 text-center">
        <p className="text-[13px] text-neutral-800">{name}</p>
        <p className="mt-1 text-xs text-neutral-500">{price}</p>
      </div>
    </article>
  );
}

function ReviewCard({ name, text, img }) {
  return (
    <div
      data-rev
      className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-[0_2px_14px_rgba(0,0,0,0.04)]"
    >
      <div className="flex items-center gap-3">
        <Ph
          src={img}
          alt={name}
          sizes="40px"
          className="h-10 w-10 shrink-0 rounded-full"
          label=""
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm">{name}</p>
          <p className="text-[10px] text-neutral-400">
            Verified beunique customer
          </p>
          {text && <Stars />}
        </div>
        {!text && <Stars />}
      </div>
      {text && (
        <p className="mt-3 text-[11px] leading-relaxed text-neutral-600">
          {text}
        </p>
      )}
    </div>
  );
}

/* ---------- marquee glyphs ---------- */
const Burst = ({ n = 12 }) => (
  <svg
    viewBox="0 0 48 48"
    className="h-11 w-11"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
  >
    {Array.from({ length: n }).map((_, i) => (
      <line
        key={i}
        x1="24"
        y1="4"
        x2="24"
        y2="14"
        transform={`rotate(${(360 / n) * i} 24 24)`}
      />
    ))}
  </svg>
);
const glyphs = [
  <Burst key="a" />,
  <svg key="b" viewBox="0 0 64 40" className="h-10 w-16">
    <circle cx="24" cy="20" r="17" fill="currentColor" />
    <circle
      cx="42"
      cy="20"
      r="15"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
    />
  </svg>,
  <svg key="c" viewBox="0 0 48 48" className="h-11 w-11" fill="currentColor">
    <rect x="3" y="3" width="19" height="19" rx="9" />
    <rect x="26" y="3" width="19" height="19" rx="9" />
    <rect x="3" y="26" width="19" height="19" rx="9" />
    <rect x="26" y="26" width="19" height="19" rx="9" />
  </svg>,
  <svg
    key="d"
    viewBox="0 0 64 40"
    className="h-10 w-16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    {[18, 13, 8, 3].map((r) => (
      <ellipse key={r} cx="32" cy="20" rx={r * 1.7} ry={r} />
    ))}
  </svg>,
  <Burst key="e" n={16} />,
  <svg
    key="f"
    viewBox="0 0 64 40"
    className="h-10 w-16"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
  >
    <circle cx="24" cy="20" r="16" />
    <circle cx="40" cy="20" r="16" />
  </svg>,
  <svg key="g" viewBox="0 0 64 40" className="h-10 w-16" fill="currentColor">
    {[0, 1, 2, 3].map((i) => (
      <polygon
        key={i}
        points={`${8 + i * 14},38 ${20 + i * 14},2 ${26 + i * 14},2 ${14 + i * 14},38`}
      />
    ))}
  </svg>,
  <svg key="h" viewBox="0 0 48 48" className="h-11 w-11" fill="currentColor">
    <polygon points="4,4 44,4 24,24" />
    <polygon points="4,44 44,44 24,24" />
  </svg>,
  <svg
    key="i"
    viewBox="0 0 48 48"
    className="h-11 w-11"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <circle cx="24" cy="24" r="20" />
    <ellipse cx="24" cy="24" rx="9" ry="20" />
    <path d="M4 24h40M7 14h34M7 34h34" />
  </svg>,
  <svg key="j" viewBox="0 0 64 48" className="h-11 w-14" fill="currentColor">
    <polygon points="2,46 24,6 46,46" />
    <polygon points="26,46 44,16 62,46" />
  </svg>,
];

function Marquee() {
  const ref = useRef(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = gsap.to(ref.current, {
      xPercent: -50,
      duration: 40,
      ease: "none",
      repeat: -1,
    });
    return () => t.kill();
  }, []);
  const row = glyphs.map((g, i) => (
    <div key={i} className="flex items-center gap-8 pr-8 md:gap-14 md:pr-14">
      {g}
      <span className="text-lg">✦</span>
    </div>
  ));
  return (
    <div className="overflow-hidden py-10 text-black md:py-12">
      <div ref={ref} className="flex w-max">
        <div className="flex">{row}</div>
        <div className="flex" aria-hidden="true">
          {row}
        </div>
      </div>
    </div>
  );
}

/* ---------- page ---------- */
export default function Page() {
  const root = useRef(null);
  const [tab, setTab] = useState("Body");
  const [fi, setFi] = useState(0);
  const quoteRef = useRef(null);
  const catRef = useRef(null);

  /* hero intro + scroll reveals */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-img]", {
        scale: 1.12,
        duration: 1.8,
        ease: "power3.out",
        stagger: 0.12,
      });
      gsap.from("[data-hero]", {
        opacity: 0,
        y: 24,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.7,
      });
      gsap.utils.toArray("[data-fade]").forEach((el) =>
        gsap.from(el, {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        }),
      );
      gsap.utils.toArray("[data-stagger]").forEach((wrap) =>
        gsap.from(wrap.children, {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: { trigger: wrap, start: "top 85%", once: true },
        }),
      );
      gsap.from("[data-rev]", {
        opacity: 0,
        y: 30,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-rev]", start: "top 90%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const changeTab = (t) => {
    if (t === tab) return;
    gsap.to(catRef.current, {
      opacity: 0,
      y: 12,
      duration: 0.25,
      onComplete: () => {
        setTab(t);
        gsap.to(catRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        });
      },
    });
  };

  const slideQuote = (dir) => {
    gsap.to(quoteRef.current, {
      opacity: 0,
      x: -30 * dir,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setFi((i) => (i + dir + featured.length) % featured.length);
        gsap.fromTo(
          quoteRef.current,
          { opacity: 0, x: 30 * dir },
          { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" },
        );
      },
    });
  };

  return (
    <main ref={root} className="bg-white text-black">
      {/* NAV */}
      <header className={`flex h-16 items-center justify-between ${px}`}>
        <a href="#" className="text-xl tracking-tight">
          beunique.
        </a>
        <nav className="flex gap-5 text-[11px] uppercase tracking-wide md:gap-10">
          {["Home", "Collection", "About", "Cart (0)"].map((l) => (
            <a key={l} href="#" className="transition-opacity hover:opacity-60">
              {l}
            </a>
          ))}
        </nav>
      </header>

      {/* HERO */}
      <section className="relative h-[78vh] min-h-[520px] overflow-hidden bg-neutral-900 text-white md:h-[calc(100vh-4rem)] md:max-h-[760px]">
        <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`overflow-hidden ${i > 0 ? "hidden md:block" : ""}`}
            >
              <Ph
                data-hero-img
                dark
                src={img("hero")}
                alt=""
                priority
                sizes="(min-width:768px) 33vw, 100vw"
                label="Hero image"
                className="h-full w-full"
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/10" />
        <div
          className={`absolute inset-x-0 bottom-0 flex flex-col justify-between gap-8 pb-10 md:flex-row md:items-end ${px}`}
        >
          <div>
            <Split
              as="h1"
              onScroll={false}
              delay={0.3}
              text={"better skin starts\nwith better care."}
              className="text-[clamp(2.6rem,6.5vw,5.5rem)] font-light leading-[0.95] tracking-tight"
            />
            <div data-hero className="mt-8 flex gap-3">
              <Pill variant="light">Skincare</Pill>
              <Pill variant="outline">
                Show all <Arrow />
              </Pill>
            </div>
          </div>
          <div
            data-hero
            className="flex flex-col gap-10 md:items-end md:text-right"
          >
            <p className="max-w-[260px] text-sm text-white/70">
              Daily skincare designed to nourish, hydrate, and support your skin
              barrier.
            </p>
            <span className="hidden text-[10px] uppercase text-white/60 md:block">
              Scroll down to see more
            </span>
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="pt-16 md:pt-24">
        <div className={`mb-8 flex items-end justify-between ${px}`}>
          <Split
            text="best sellers"
            className="text-5xl font-medium tracking-tight md:text-6xl"
          />
          <a
            href="#"
            data-fade
            className="flex items-center gap-2 pb-2 text-sm"
          >
            View all <Arrow />
          </a>
        </div>
        <Carousel items={bestSellers} render={(p) => <ProductCard {...p} />} />
      </section>

      {/* SKINCARE MADE SIMPLE */}
      <section className="pt-16 md:pt-24">
        <Split
          text="skincare made simple"
          className={`mb-8 text-4xl font-medium tracking-tight md:text-6xl ${px}`}
        />
        <div data-stagger className="grid grid-cols-1 md:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.title}
              className="relative aspect-[3/4] overflow-hidden md:aspect-[2/3]"
            >
              <Ph
                dark
                src={s.img}
                alt={s.title}
                label="Image"
                className="absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/0" />
              <h3 className="absolute left-5 top-5 text-4xl font-medium tracking-tight text-white md:text-[2.6rem]">
                {s.title}
              </h3>
              <div className="absolute inset-x-5 bottom-5 text-white">
                <p className="mb-4 text-xs text-white/80">{s.text}</p>
                <Pill variant="light" className="!px-4 !py-1.5 text-[11px]">
                  {s.cta}
                </Pill>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Marquee />

      {/* BANNER */}
      <section className="relative min-h-[380px] overflow-hidden md:min-h-[520px]">
        <Ph
          src={img("banner")}
          alt=""
          sizes="100vw"
          label="Banner image"
          className="absolute inset-0"
        />
        <div
          className={`relative flex min-h-[380px] flex-col justify-center md:min-h-[520px] ${px}`}
        >
          <Split
            text={"it’s never late to take\ncare of your skin"}
            className="max-w-[560px] text-4xl font-light leading-[1.05] tracking-tight text-neutral-700 md:text-6xl"
          />
          <p data-fade className="mt-6 max-w-[300px] text-sm text-neutral-600">
            Elevate your skincare routine with beunique where simplicity meets
            effectiveness for radiant skin everyday
          </p>
          <div data-fade className="mt-8">
            <Pill variant="dark" className="rounded-none px-6 py-3">
              Shop now
            </Pill>
          </div>
        </div>
      </section>

      {/* SHOP BY CATEGORY */}
      <section className="pt-16 md:pt-24">
        <div
          className={`mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end ${px}`}
        >
          <Split
            text="Shop by Category"
            className="text-4xl font-medium tracking-tight md:text-6xl"
          />
          <div data-fade className="flex gap-6 text-base md:pb-2">
            {Object.keys(categories).map((t) => (
              <button
                key={t}
                onClick={() => changeTab(t)}
                className={`transition-colors ${tab === t ? "text-black" : "text-neutral-400 hover:text-neutral-600"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div ref={catRef}>
          <Carousel
            items={categories[tab]}
            render={(p) => <ProductCard {...p} />}
          />
        </div>
      </section>

      {/* REVIEWS */}
      <section className={`pt-16 md:pt-24 ${px}`}>
        <Split
          text="Reviews"
          className="text-5xl font-medium tracking-tight md:text-6xl"
        />
        <p data-fade className="mt-3 max-w-md text-sm text-neutral-500">
          See why thousands are choosing beunique for simpler, healthier-looking
          skin and making it part of their daily routine.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-4 lg:items-end">
          <div className="flex flex-col gap-4">
            <button
              onClick={() => slideQuote(-1)}
              aria-label="Previous review"
              className="hidden h-11 w-11 place-items-center rounded-full bg-black text-white lg:grid"
            >
              <Arrow className="h-4 w-4 rotate-180" />
            </button>
            <ReviewCard {...reviews[0]} />
            <ReviewCard {...reviews[1]} />
          </div>
          <Ph
            src={img("review-main")}
            alt=""
            sizes="(min-width:1024px) 25vw, 100vw"
            label="Review image"
            className="aspect-[4/5] w-full rounded-sm lg:self-stretch"
          />
          <div
            ref={quoteRef}
            className="flex flex-col justify-between gap-10 lg:self-stretch"
          >
            <p className="text-lg leading-snug text-neutral-800 lg:text-[15px]">
              “{featured[fi].quote}”
            </p>
            <div className="flex items-center justify-between border-t border-neutral-200 pt-3 text-sm">
              <div>
                <p className="text-neutral-700">{featured[fi].name}</p>
                <p className="text-[10px] text-neutral-400">
                  Verified beunique customer
                </p>
              </div>
              <Stars />
            </div>
          </div>
          <div className="flex flex-col items-end gap-4">
            <button
              onClick={() => slideQuote(1)}
              aria-label="Next review"
              className="hidden h-11 w-11 place-items-center rounded-full bg-black text-white lg:grid"
            >
              <Arrow className="h-4 w-4" />
            </button>
            <div className="w-full">
              <ReviewCard {...reviews[2]} />
            </div>
            <div className="w-full">
              <ReviewCard {...reviews[3]} />
            </div>
          </div>
        </div>

        <div data-fade className="mt-8 flex gap-3">
          <Pill variant="dark" className="px-10">
            Shop
          </Pill>
          <Pill variant="outlineDark">More reviews</Pill>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="relative mt-16 min-h-[360px] overflow-hidden md:mt-24 md:min-h-[480px]">
        <Ph
          src={img("newsletter")}
          alt=""
          sizes="100vw"
          label="Newsletter image"
          className="absolute inset-0"
        />
        <div
          className={`relative flex min-h-[360px] flex-col justify-center md:min-h-[480px] ${px}`}
        >
          <Split
            text={"Subscribe to\nour newsletter"}
            className="text-5xl font-light leading-[1.02] tracking-tight text-neutral-800 md:text-7xl"
          />
          <p data-fade className="mt-6 text-sm text-neutral-600">
            For skincare insights, new launches &amp; occasional treat
          </p>
          <form
            data-fade
            onSubmit={(e) => e.preventDefault()}
            className="mt-8 flex w-full max-w-[320px] items-center border-b border-neutral-500 pb-2"
          >
            <input
              type="email"
              placeholder="Enter your email"
              aria-label="Email"
              className="w-full bg-transparent text-xs outline-none placeholder:text-neutral-500"
            />
            <button aria-label="Subscribe">
              <Arrow className="h-4 w-4" />
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={`bg-black pt-12 text-white ${px}`}>
        <div className="grid gap-10 pb-24 md:grid-cols-[1.2fr_1fr_1fr_1fr] md:pb-40">
          <div>
            <p className="text-lg">beunique</p>
            <div className="mt-6 flex gap-4">
              {["X", "IG", "YT", "in"].map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  className="grid h-6 w-6 place-items-center text-xs font-medium transition-opacity hover:opacity-60"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
          {Object.entries(footerCols).map(([h, links]) => (
            <div key={h}>
              <p className="mb-5 text-sm font-medium">{h}</p>
              <ul className="space-y-3 text-sm text-white/80">
                {links.map((l) => (
                  <li key={l}>
                    <a href="#" className="transition-opacity hover:opacity-60">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-between gap-2 pb-5 text-[10px] text-white/70 sm:flex-row">
          <span>Powered by zenvokstudio</span>
          <span>@zenvok.inbox@gmail.com</span>
        </div>
      </footer>
    </main>
  );
}
