"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

const EXTS = ["jpg", "png", "webp", "jpeg", "avif"];
const HAS_EXT = /\.(jpe?g|png|webp|avif|gif|svg)$/i;

/* Image placeholder – replace with <Image /> / <img /> later */
export function Ph({
  className = "",
  label = "Image",
  dark = false,
  src,
  alt = "",
  priority = false,
  sizes = "(min-width:1024px) 33vw, 100vw",
  ...rest
}) {
  // Tries .jpg, .png, .webp ... in order until one loads; none found = gray placeholder
  const [fail, setFail] = useState({ src: null, i: 0 });
  const candidates = !src
    ? []
    : HAS_EXT.test(src)
      ? [src]
      : EXTS.map((e) => `${src}.${e}`);
  const i = fail.src === src ? fail.i : 0;
  const current = candidates[i];

  if (current) {
    const pos = /\babsolute\b/.test(className) ? "" : "relative";
    return (
      <div {...rest} className={`${pos} overflow-hidden ${className}`}>
        <Image
          key={current}
          src={current}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          draggable={false}
          onError={() => setFail({ src, i: i + 1 })}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      {...rest}
      className={`flex items-center justify-center text-xs ${
        dark
          ? "bg-neutral-600 text-neutral-400"
          : "bg-neutral-200 text-neutral-400"
      } ${className}`}
    >
      {label}
    </div>
  );
}

/* Staggered word-by-word reveal. Use "\n" for line breaks. */
export function Split({
  text,
  as: Tag = "h2",
  className = "",
  delay = 0,
  onScroll = true,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const words = ref.current.querySelectorAll("[data-w]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.set(words, { yPercent: 115 });
    const tween = gsap.to(words, {
      yPercent: 0,
      duration: 1.1,
      ease: "power4.out",
      stagger: 0.07,
      delay,
      scrollTrigger: onScroll
        ? { trigger: ref.current, start: "top 88%", once: true }
        : undefined,
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay, onScroll]);

  return (
    <Tag ref={ref} className={className} aria-label={text.replace("\n", " ")}>
      {text.split("\n").map((line, i) => (
        <span key={i} className="block" aria-hidden="true">
          {line.split(" ").map((w, j) => (
            <span
              key={j}
              className="inline-block overflow-hidden align-top pb-[0.12em] -mb-[0.12em]"
            >
              <span data-w className="inline-block will-change-transform">
                {w}
                {"\u00A0"}
              </span>
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}

export function Pill({ children, variant = "light", className = "", ...rest }) {
  const styles = {
    light: "bg-white text-black",
    dark: "bg-black text-white",
    outline: "border border-white/70 text-white",
    outlineDark: "border border-black/40 text-black",
  };
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm transition-transform duration-300 hover:scale-[1.04] ${styles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export const Arrow = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 16 16"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
  >
    <path d="M2 8h12M9 3l5 5-5 5" />
  </svg>
);
