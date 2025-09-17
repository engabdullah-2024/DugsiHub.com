"use client";
export default function LogoStrokeStyles() {
  return (
    <style jsx global>{`
      :root { --logo-stroke: transparent; }
      .dark { --logo-stroke: rgba(255, 255, 255, 0.9); }
      .logo-stroked {
        filter:
          drop-shadow(0 1px 0 var(--logo-stroke))
          drop-shadow(0 -1px 0 var(--logo-stroke))
          drop-shadow(1px 0 0 var(--logo-stroke))
          drop-shadow(-1px 0 0 var(--logo-stroke));
      }
      .dark .logo-stroked {
        filter:
          drop-shadow(0 1px 0 var(--logo-stroke))
          drop-shadow(0 -1px 0 var(--logo-stroke))
          drop-shadow(1px 0 0 var(--logo-stroke))
          drop-shadow(-1px 0 0 var(--logo-stroke))
          brightness(1.06) contrast(1.05);
      }
    `}</style>
  );
}
