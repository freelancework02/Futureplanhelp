// src/components/HeroSection.jsx
import React, { useEffect } from "react";
import {
  Mail,
  Phone,
  ShieldCheck,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Calendar,
} from "lucide-react";

import heroImg from "../../assets/herosection.png"

/**
 * Brand colors matched to logo:
 * - NAVY: #0d2c55  (primary / headings)
 * - ACCENT START: #0fb7d4 (teal-blue)
 * - ACCENT END:   #1ad1a3 (lime-teal / green)
 * - GOLD:         #f4b33d (warm highlight)
 *
 * Visual asset path: use the uploaded image (local dev path) for quick testing.
 */


/* Calendly loader (idempotent) */
function useCalendlyLoader() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.Calendly) return;
    const existing = document.getElementById("calendly-script");
    if (existing) return;
    const s = document.createElement("script");
    s.id = "calendly-script";
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    document.body.appendChild(s);
  }, []);
}

const HeroSection = ({ topOffset = 88 }) => {
  useCalendlyLoader();

  const openCalendly = (e) => {
    e?.preventDefault();
    try {
      if (window.Calendly?.initPopupWidget) {
        window.Calendly.initPopupWidget({
          url: "https://calendly.com/jigneshcc2905/30min",
        });
      } else {
        window.open(
          "https://calendly.com/jigneshcc2905/30min",
          "_blank",
          "noopener,noreferrer"
        );
      }
    } catch {
      window.open(
        "https://calendly.com/jigneshcc2905/30min",
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  const benefits = [
    "Personalized retirement & income plans",
    "Asset protection & legacy strategies",
    "Evidence-based investing discipline",
    "Plain-English education & reviews",
  ];

  const stats = [
    { k: "99%", v: "Client Satisfaction" },
    // { k: "26+ yrs", v: "Combined Expertise" },
    { k: "1,200+", v: "Plans Reviewed" },
  ];

  const NAVY = "#0d2c55";
  const ACCENT_FROM = "#0fb7d4";
  const ACCENT_TO = "#1ad1a3";
  const GOLD = "#f4b33d";

  return (
    <section
      aria-label="Hero — Future Plan Help"
      className="relative overflow-visible"
      style={{ paddingTop: `${topOffset}px`, background: "white" }}
    >
      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center py-20">
          {/* LEFT: copy */}
          <div className="space-y-6">
            {/* small pill trust */}
            <div
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full"
              style={{
                background: "rgba(13,44,85,0.06)",
                border: `1px solid rgba(13,44,85,0.06)`,
                color: NAVY,
              }}
              aria-label="Fiduciary-minded guidance"
            >
              <ShieldCheck className="w-4 h-4" style={{ color: ACCENT_FROM }} aria-hidden />
              <span className="text-sm font-semibold" style={{ color: NAVY }}>
                Fiduciary-minded guidance
              </span>
            </div>

            {/* Heading with gradient accent */}
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold leading-tight tracking-tight"
              style={{ color: NAVY }}
            >
              Build a{" "}
              <span
                className="inline-block"
                style={{
                  background: `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Stronger Financial Future
              </span>{" "}
              — with clarity and protection.
            </h1>

            <p className="text-base md:text-lg" style={{ color: "#27415e" }}>
              Clear plans. Smart protection. Disciplined growth. We combine education and
              strategy so you can pursue growth without risking stability.
            </p>

            {/* CTAs: primary gradient + subtle navy ghost */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
              <button
                onClick={openCalendly}
                className="inline-flex items-center gap-3 justify-center text-lg font-semibold py-3 px-6 rounded-xl shadow-lg transform transition-transform duration-150 hover:-translate-y-1 focus:outline-none"
                style={{
                  background: `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
                  color: NAVY,
                  boxShadow: "0 16px 40px -20px rgba(15,183,212,0.14)",
                }}
                aria-label="Book a free consultation"
              >
                <Calendar className="w-5 h-5" style={{ color: "white" }} aria-hidden />
                <span style={{ color: "white" }}>Book a Consultation</span>
              </button>

              <a
                href="/service"
                className="inline-flex items-center gap-3 justify-center text-lg font-semibold py-3 px-6 rounded-xl border"
                style={{
                  borderColor: "rgba(13,44,85,0.08)",
                  background: "white",
                  color: NAVY,
                }}
                aria-label="Explore our services"
              >
                Explore Services
                <ArrowRight className="w-4 h-4" style={{ color: NAVY }} aria-hidden />
              </a>
            </div>

            {/* Benefits two-column list with teal accents */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {benefits.map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <div
                    className="mt-1 rounded-full flex-none"
                    style={{
                      width: 36,
                      height: 36,
                      display: "grid",
                      placeItems: "center",
                      background: `linear-gradient(135deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
                      boxShadow: "0 8px 22px -10px rgba(15,183,212,0.12)",
                    }}
                    aria-hidden
                  >
                    <CheckCircle2 className="w-4 h-4" style={{ color: "white" }} />
                  </div>
                  <span style={{ color: "#15324a", fontWeight: 600 }}>{t}</span>
                </li>
              ))}
            </ul>

            {/* Contact */}
            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5" style={{ color: ACCENT_FROM }} aria-hidden="true" />
                <a
                  href="mailto:INFO@FUTUREPLANHELP.COM"
                  className="font-medium"
                  style={{ color: NAVY }}
                >
                  INFO@FUTUREPLANHELP.COM
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5" style={{ color: ACCENT_FROM }} aria-hidden="true" />
                <a href="tel:+1267-225-1909" className="font-medium" style={{ color: NAVY }}>
                  267-225-1909
                </a>
              </div>
            </div>

            {/* Stats — stylized row */}
            <div className="pt-6 grid grid-cols-3 gap-3 max-w-xl">
              {stats.map((s, idx) => (
                <div
                  key={s.k}
                  className="rounded-xl px-4 py-3 text-center"
                  style={{
                    background: idx === 1 ? `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_TO})` : "white",
                    border: "1px solid rgba(13,44,85,0.06)",
                    color: idx === 1 ? "white" : NAVY,
                    boxShadow: "0 10px 30px -18px rgba(13,44,85,0.06)",
                  }}
                  aria-label={`${s.v}: ${s.k}`}
                >
                  <div className="text-xl md:text-2xl font-extrabold">{s.k}</div>
                  <div className="text-xs mt-1" style={{ color: idx === 1 ? "rgba(255,255,255,0.85)" : "#47617a" }}>
                    {s.v}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: visual/art — navy card with rising-curve overlay */}
          <div className="relative flex justify-center md:justify-end">
            <figure className="relative w-full max-w-md md:max-w-lg lg:max-w-xl">
              {/* Navy container that holds the image */}
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  border: `1px solid rgba(13,44,85,0.08)`,
                  background: "linear-gradient(180deg, rgba(13,44,85,0.98), rgba(13,44,85,0.92))",
                  boxShadow: "0 30px 80px -30px rgba(13,44,85,0.45)",
                }}
              >
                {/* Decorative rising curve (echo of logo arrow/graph) */}
                <svg
                  viewBox="0 0 800 220"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute -top-8 left-0 w-full h-[160px]"
                  aria-hidden
                >
                  {/* <defs>
                    <linearGradient id="g1" x1="0" x2="1">
                      <stop offset="0%" stopColor={ACCENT_FROM} stopOpacity="1" />
                      <stop offset="100%" stopColor={ACCENT_TO} stopOpacity="1" />
                    </linearGradient>
                  </defs> */}
                  <path
                    d="M0,160 C140,60 320,40 420,120 C520,200 700,80 800,40 L800 0 L0 0 Z"
                    fill="url(#g1)"
                    opacity="0.98"
                    transform="translate(0,20)"
                  />
                </svg>

                {/* actual image */}
                <img
                  src={heroImg}
                  alt="Financial advisors reviewing growth charts and plans"
                  className="w-full h-[320px] md:h-[420px] lg:h-[480px] object-cover object-center"
                  loading="eager"
                />

                {/* subtle overlay to tint image slightly to match brand */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(13,44,85,0.14) 0%, rgba(0,0,0,0.12) 40%, rgba(13,44,85,0.06) 100%)",
                  }}
                />
              </div>

              {/* Floating stat pill that overlaps into content */}
              <figcaption className="absolute -bottom-6 left-3 sm:left-0">
                <div
                  className="rounded-2xl px-4 py-3 flex items-center gap-3"
                  style={{
                    background: "white",
                    color: "#082033",
                    boxShadow: "0 18px 44px -20px rgba(8,32,51,0.28)",
                    border: `1px solid rgba(13,44,85,0.06)`,
                    minWidth: 220,
                  }}
                >
                  <div style={{ display: "grid", placeItems: "center", width: 42, height: 42, borderRadius: 10, background: GOLD }}>
                    <TrendingUp className="w-5 h-5" style={{ color: NAVY }} aria-hidden />
                  </div>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: NAVY }}>
                      On-track Projection
                    </div>
                    <div className="text-2xl font-extrabold" style={{ color: NAVY }}>
                      +12.4%
                    </div>
                    <div className="text-xs" style={{ color: "#60748a" }}>
                      12-mo rolling
                    </div>
                  </div>
                </div>
              </figcaption>

              {/* small decorative shield echo (top-right) */}
              <div className="absolute top-3 right-3">
                <div
                  style={{
                    background: "white",
                    borderRadius: 12,
                    padding: 8,
                    boxShadow: "0 8px 22px -12px rgba(13,44,85,0.12)",
                    border: `1px solid rgba(13,44,85,0.04)`,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    minWidth: 120,
                  }}
                >
                  <div style={{ width: 36, height: 36, display: "grid", placeItems: "center", borderRadius: 8, background: `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_TO})` }}>
                    <ShieldCheck className="w-4 h-4" style={{ color: "white" }} aria-hidden />
                  </div>
                  <div style={{ color: NAVY }}>
                    <div style={{ fontWeight: 700 }}>Protected</div>
                    <div style={{ fontSize: 12, color: "#60748a" }}>Fiduciary-first</div>
                  </div>
                </div>
              </div>
            </figure>
          </div>
        </div>
      </div>

      {/* bottom fade to gently separate hero from next section */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0), rgba(13,44,85,0.02))" }}
      />
    </section>
  );
};

export default HeroSection;
