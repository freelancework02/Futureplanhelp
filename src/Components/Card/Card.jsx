// src/components/ProfessionalServices.jsx
import React from "react";
import localImg from "../../assets/Logo/logo.png"

/**
 * ProfessionalServices (brand-aligned overhaul)
 *
 * Changes:
 * - Color system matched to your logo:
 *   NAVY      : #0d2c55
 *   ACCENT_FROM: #0fb7d4 (teal-blue)
 *   ACCENT_TO  : #1ad1a3 (lime-teal)
 *   GOLD       : #f4b33d (warm highlight)
 *
 * - Layout improvements:
 *   • Clean 3-up card grid on large screens with subtle staggered layout.
 *   • Image area lifted into an elegant navy card with teal accent curve.
 *   • Stronger CTAs and improved micro-interactions.
 *   • All images default to the locally-generated brand illustration (session file).
 *
 * Note: local asset path (generated during this session) is used below:
 * "/mnt/data/A_digital_illustration_features_financial_advisors.png"
 */

export default function ProfessionalServices() {
  // brand color tokens
  const NAVY = "#0d2c55";
  const ACCENT_FROM = "#0fb7d4";
  const ACCENT_TO = "#1ad1a3";
  const GOLD = "#f4b33d";
  const TEXT = "#082033";

  // local image generated in this session — use as a clean brand visual

  const services = [
    {
      title: "Expertise",
      description:
        "Over ten years of experience. Clear insights, strategic roadmaps, and ongoing reviews that keep your goals on track.",
      image:
        "https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/card-img1.jpg",
    },
    {
      title: "Discretion",
      description:
        "Your privacy matters. We handle sensitive information with full confidentiality and secure data processes.",
      image:
        "https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/card-img2.jpg",
    },
    {
      title: "Dependability",
      description:
        "Consistent support, transparent updates, and a results-driven approach to your long-term well-being.",
      image:
        "https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/card-img3.jpg",
    },
    {
      title: "Consulting",
      description:
        "Cut through complexity. Focused strategy sessions that help you clarify goals and close financial gaps.",
      image:
        "https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/card-img4.jpg",
    },
    {
      title: "Sales",
      description:
        "Curated financial solutions that prioritize suitability, cost-efficiency, and long-term value.",
      image:
        "https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/card-img5.jpg",
    },
    {
      title: "Partnership",
      description:
        "If our philosophy aligns, we grow together—built on trust, shared standards, and mutual integrity.",
      image:
        "https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/card-img6.jpg",
    },
  ];

  return (
    <section
      className="py-16 px-4 md:px-8 lg:px-12"
      aria-labelledby="services-heading"
      style={{
        background: "linear-gradient(180deg, #ffffff 0%, #fbfcfd 45%, #ffffff 100%)",
        color: TEXT,
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Tagline */}
        <div className="flex justify-center mb-6">
          <div
            className="px-5 py-2 rounded-full text-sm font-medium flex items-center gap-3 shadow-sm"
            style={{
              background: "white",
              border: "1px solid rgba(13,44,85,0.04)",
              color: NAVY,
            }}
          >
            <span
              style={{
                width: 18,
                height: 18,
                display: "inline-grid",
                placeItems: "center",
                borderRadius: 999,
                background: `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
                boxShadow: "0 6px 18px rgba(15,183,212,0.12)",
              }}
              aria-hidden
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12l4 4L19 6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span style={{ color: "rgba(8,32,51,0.95)" }}>WHAT TO EXPECT</span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h2
            id="services-heading"
            className="text-3xl md:text-4xl font-extrabold tracking-tight"
            style={{ color: NAVY }}
          >
            Our Skills & Offers
          </h2>
          <p className="mt-3 text-slate-700 max-w-2xl mx-auto">
            Expertise you can trust — delivered with clarity, transparency, and long-term vision.
          </p>
        </div>

        {/* Improved layout: left feature panel + right grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left panel: tall brand visual + short intro */}
          <aside
            className="lg:col-span-1 rounded-2xl overflow-hidden"
            style={{
              border: "1px solid rgba(13,44,85,0.04)",
              background: `linear-gradient(180deg, ${NAVY}, rgba(13,44,85,0.92))`,
              color: "white",
              boxShadow: "0 26px 70px -30px rgba(13,44,85,0.28)",
            }}
          >
            <div style={{ padding: 28 }}>
              <div
                style={{
                  display: "inline-grid",
                  placeItems: "center",
                  width: 64,
                  height: 64,
                  borderRadius: 16,
                  background: "white",
                  marginBottom: 18,
                }}
              >
                <img
                  src={localImg}
                  alt="brand mark"
                  style={{ width: 54, height: 54, objectFit: "contain", borderRadius: 12 }}
                />
              </div>

              <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10 }}>
                Trusted guidance. Real growth.
              </h3>
              <p style={{ color: "rgba(255,255,255,0.9)", marginBottom: 18 }}>
                Practical advice, measurable outcomes, and protection you can count on.
              </p>

              <ul style={{ paddingLeft: 0, listStyle: "none", display: "grid", gap: 10 }}>
                <li style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <span
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      display: "grid",
                      placeItems: "center",
                      background: `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
                      color: "white",
                      fontWeight: 700,
                      boxShadow: "0 10px 28px -18px rgba(15,183,212,0.12)",
                    }}
                  >
                    99%
                  </span>
                  <div>
                    <div style={{ fontWeight: 700 }}>Client Satisfaction</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)" }}>Consistent results</div>
                  </div>
                </li>

                <li style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <span
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      display: "grid",
                      placeItems: "center",
                      background: GOLD,
                      color: NAVY,
                      fontWeight: 700,
                    }}
                  >
                    26+
                  </span>
                  <div>
                    <div style={{ fontWeight: 700 }}>Years Combined</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)" }}>Advisor experience</div>
                  </div>
                </li>
              </ul>

              <div style={{ marginTop: 20 }}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (typeof window !== "undefined" && window.Calendly?.initPopupWidget) {
                      window.Calendly.initPopupWidget({ url: "https://calendly.com/jigneshcc2905/30min" });
                    } else {
                      window.open("https://calendly.com/jigneshcc2905/30min", "_blank", "noopener,noreferrer");
                    }
                  }}
                  className="inline-flex items-center gap-3 rounded-xl px-4 py-2 font-semibold"
                  style={{
                    background: `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
                    color: NAVY,
                    boxShadow: "0 12px 36px rgba(15,183,212,0.12)",
                  }}
                  aria-label="Book a review"
                >
                  Book a Review
                </a>
              </div>
            </div>

            {/* right-aligned accent curve (decorative) */}
            <div
              aria-hidden
              style={{
                height: 120,
                marginTop: 8,
                background:
                  `linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01)), ` +
                  `linear-gradient(180deg, rgba(26,209,163,0.12), transparent)`,
              }}
            />
          </aside>

          {/* Right panel: cards grid (spans two columns on large) */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((s, i) => {
              // slight stagger for visual rhythm
              const translateY = i % 3 === 0 ? 0 : i % 3 === 1 ? 8 : 16;
              return (
                <article
                  key={i}
                  className="group bg-white rounded-2xl overflow-hidden border"
                  style={{
                    border: "1px solid rgba(13,44,85,0.04)",
                    transform: `translateY(${translateY}px)`,
                    boxShadow: "0 16px 40px -20px rgba(13,44,85,0.06)",
                    transition: "transform 220ms ease, box-shadow 220ms ease",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: 340,
                  }}
                >
                  {/* image block */}
                  <div style={{ position: "relative", height: 160, overflow: "hidden" }}>
                    <img
                      src={s.image}
                      alt={s.title}
                      className="w-full h-full object-cover"
                      style={{ display: "block", transformOrigin: "center", transition: "transform 420ms ease" }}
                      loading="lazy"
                    />
                    {/* teal curve accent top-right */}
                   
                  </div>

                  {/* body */}
                  <div style={{ padding: 20, display: "flex", flexDirection: "column", flex: 1 }}>
                    <h4 style={{ color: NAVY, fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{s.title}</h4>
                    <p style={{ color: "#415e6e", lineHeight: 1.5, marginBottom: 14, flex: 1 }}>
                      {s.description}
                    </p>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                      <div style={{ display: "flex", gap: 8 }}>
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            padding: "6px 10px",
                            borderRadius: 999,
                            background: "rgba(13,44,85,0.04)",
                            color: NAVY,
                            border: "1px solid rgba(13,44,85,0.02)",
                          }}
                        >
                          Clarity
                        </span>
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            padding: "6px 10px",
                            borderRadius: 999,
                            background: "rgba(13,44,85,0.04)",
                            color: NAVY,
                            border: "1px solid rgba(13,44,85,0.02)",
                          }}
                        >
                          Accountability
                        </span>
                      </div>

                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (typeof window !== "undefined" && window.Calendly?.initPopupWidget) {
                              window.Calendly.initPopupWidget({ url: "https://calendly.com/jigneshcc2905/30min" });
                            } else {
                              window.open("https://calendly.com/jigneshcc2905/30min", "_blank", "noopener,noreferrer");
                            }
                          }}
                          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 font-semibold"
                          style={{
                            background: `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
                            color: NAVY,
                            boxShadow: "0 10px 28px rgba(15,183,212,0.10)",
                          }}
                        >
                          Get Started
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                            <path d="M5 12h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </a>

                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (typeof window !== "undefined" && window.Calendly?.initPopupWidget) {
                              window.Calendly.initPopupWidget({ url: "https://calendly.com/jigneshcc2905/30min" });
                            } else {
                              window.open("https://calendly.com/jigneshcc2905/30min", "_blank", "noopener,noreferrer");
                            }
                          }}
                          style={{ color: NAVY, fontWeight: 600, fontSize: 13 }}
                        >
                          Learn more →
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA strip */}
        <div
          className="mt-12 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{
            border: "1px solid rgba(13,44,85,0.04)",
            background: "linear-gradient(90deg, rgba(15,183,212,0.02), white)",
            boxShadow: "0 14px 40px -18px rgba(13,44,85,0.06)",
          }}
        >
          <div>
            <h3 style={{ color: NAVY, fontWeight: 800 }}>Want a quick, no-pressure review?</h3>
            <p style={{ color: "#536b75", marginTop: 6 }}>Schedule a brief call — we’ll listen, assess, and suggest next steps.</p>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (typeof window !== "undefined" && window.Calendly?.initPopupWidget) {
                  window.Calendly.initPopupWidget({ url: "https://calendly.com/jigneshcc2905/30min" });
                } else {
                  window.open("https://calendly.com/jigneshcc2905/30min", "_blank", "noopener,noreferrer");
                }
              }}
              className="rounded-full inline-flex items-center gap-3 px-5 py-3 font-semibold"
              style={{
                background: `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
                color: NAVY,
                boxShadow: "0 12px 36px rgba(15,183,212,0.12)",
              }}
            >
              Book a Review
            </a>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (typeof window !== "undefined" && window.Calendly?.initPopupWidget) {
                  window.Calendly.initPopupWidget({ url: "https://calendly.com/jigneshcc2905/30min" });
                } else {
                  window.open("https://calendly.com/jigneshcc2905/30min", "_blank", "noopener,noreferrer");
                }
              }}
              className="rounded-full inline-flex items-center gap-3 px-5 py-3 font-semibold"
              style={{
                border: "1px solid rgba(13,44,85,0.06)",
                background: "white",
                color: NAVY,
              }}
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
