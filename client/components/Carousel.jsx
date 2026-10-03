"use client";
import { useEffect, useRef } from "react";
import { gsap, Draggable, ScrollTrigger } from "@/lib/gsap";
import { Arrow } from "./ui";

export default function Carousel({
  items,
  render,
  cell = "basis-[72%] sm:basis-[46%] lg:basis-1/4",
}) {
  const view = useRef(null);
  const track = useRef(null);
  const drag = useRef(null);

  const minX = () =>
    Math.min(0, view.current.clientWidth - track.current.scrollWidth);
  const cardW = () => track.current.children[0].getBoundingClientRect().width;

  const snapTo = (x) => {
    const w = cardW();
    const target = gsap.utils.clamp(minX(), 0, Math.round(x / w) * w);
    gsap.to(track.current, {
      x: target,
      duration: 0.9,
      ease: "power3.out",
      onUpdate: () => drag.current?.update(),
    });
  };

  useEffect(() => {
    const t = track.current;
    const [d] = Draggable.create(t, {
      type: "x",
      cursor: "grab",
      activeCursor: "grabbing",
      edgeResistance: 0.85,
      bounds: { minX: minX(), maxX: 0 },
      onDragEnd() {
        snapTo(this.x);
      },
    });
    drag.current = d;

    const onResize = () => {
      d.applyBounds({ minX: minX(), maxX: 0 });
      gsap.set(t, { x: gsap.utils.clamp(minX(), 0, gsap.getProperty(t, "x")) });
      d.update();
    };
    window.addEventListener("resize", onResize);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        t.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: view.current,
            start: "top 85%",
            once: true,
          },
        },
      );
    }, view);

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
      d.kill();
    };
  }, [items]);

  const go = (dir) =>
    snapTo(gsap.getProperty(track.current, "x") - dir * cardW());

  return (
    <div>
      <div ref={view} className="overflow-hidden border-y border-neutral-200">
        <div
          ref={track}
          className="flex touch-pan-y select-none will-change-transform"
        >
          {items.map((item, i) => (
            <div key={i} className={`shrink-0 grow-0 ${cell}`}>
              {render(item)}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 flex justify-center gap-3 lg:hidden">
        <button
          onClick={() => go(-1)}
          aria-label="Previous"
          className="grid h-10 w-10 place-items-center rounded-full border border-black/30"
        >
          <Arrow className="h-4 w-4 rotate-180" />
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Next"
          className="grid h-10 w-10 place-items-center rounded-full border border-black/30"
        >
          <Arrow className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
