import React, { useRef, useState, useEffect } from "react";

const images = [
  "/ankgor_wat.jpg",
  "/maldives.jpg",
  "/waterfall.jpg",
  "/trolltunga.jpg",
  "/bachalpsee.jpg",
  "/dolomites.jpg",
];

// starting positions (%)
const positions = [
  { top: 25,  left: 25  },
  { top: 40, left: 82 },
  { top: 65, left: 15 },
  { top: 70, left: 85 },
  { top: 15,  left: 55 },
  { top: 85, left: 50 },
];

function HomePage() {
  const sectionRef = useRef(null);
  const touchStartY = useRef(0);
  const [progress, setProgress] = useState(0); // 0..1
  const [locked, setLocked] = useState(true);

  // lock scroll and use wheel/touch to advance progress
  useEffect(() => {
    // lock page scroll
    const prevOverflow = document.body.style.overflow;
    if (locked) document.body.style.overflow = "hidden";

    const step = (delta) => {
      // tune sensitivity: larger denom = slower progress
      const next = Math.max(0, Math.min(1, progress + delta / 2000));
      setProgress(next);
      if (next >= 1 && locked) {
        setLocked(false);
        // restore scroll
        document.body.style.overflow = prevOverflow || "";
      }
    };

    const onWheel = (e) => {
      if (!locked) return;
      e.preventDefault(); // block page scroll
      step(e.deltaY);     // scroll down → positive delta
    };

    const onTouchStart = (e) => {
      if (!locked) return;
      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchMove = (e) => {
      if (!locked) return;
      const currentY = e.touches[0].clientY;
      const dy = touchStartY.current - currentY; // swipe up = positive
      if (Math.abs(dy) > 0) {
        e.preventDefault();
        step(dy); // use dy like wheel delta
        touchStartY.current = currentY;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      // ensure overflow restored if unmount early
      document.body.style.overflow = prevOverflow || "";
    };
  }, [locked, progress]);

  return (
    <div
      ref={sectionRef}
      className="relative w-screen min-h-screen overflow-hidden bg-white flex items-center justify-center"
    >
      {/* Logo (color: black → white with progress) */}
      <h1
        className="absolute z-10 font-bold sm:text-3xl md:text-7xl text-center"
        style={{
          fontFamily: '"Arvo", serif',
          color: `rgb(${0 + 255 * progress}, ${0 + 255 * progress}, ${0 + 255 * progress})`,
        }}
      >
        EXPOSURE <br /> EXPLORERS
      </h1>

      {/* Images converge to exact center (50%,50%) */}
      {images.map((src, i) => {
        const t = positions[i].top + (50 - positions[i].top) * progress;
        const l = positions[i].left + (50 - positions[i].left) * progress;
        const s = 0.8 + (1.1 - 0.8) * progress; // end slightly larger than start

        return (
          <img
            key={i}
            src={src}
            className="absolute object-cover rounded-lg"
            style={{
              top: `${t}%`,
              left: `${l}%`,
              transform: "translate(-50%, -50%) scale(" + s + ")",
              width: "30vw",
              height: "28vh",
              zIndex: 1,            // under the text
              willChange: "transform",
            }}
            alt=""
          />
        );
      })}
    </div>
  );
}

export default HomePage;
