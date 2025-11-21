// FoundationalCommitments.VariantA.jsx
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Mail, HelpCircle } from "lucide-react";
import logo from "../../assets/Logo/logo.png"

/**
 * FoundationalCommitments.VariantA (brand-updated)
 *
 * - Color system matched to the logo:
 *   NAVY       : #0d2c55
 *   ACCENT_FROM: #0fb7d4 (teal-blue)
 *   ACCENT_TO  : #1ad1a3 (lime-teal)
 *   GOLD       : #f4b33d
 *
 * - Layout changes:
 *   • Two-column composition with the accordion narrow and stacked on the right,
 *     and a richer brand visual on the left (image + badges).
 *   • Accordion uses gradient active border, softer shadows, and gold focus ring.
 *   • Improved spacing, clearer type scale, and accessible height animation.
 *
 * - Note: the image used for the panel references the local session asset path.
 *   Update the path if you prefer a different image.
 */

const commitmentsData = [
  {
    title:
      "Is it possible to engage a financial advisor if I don't have a substantial amount of disposable income?",
    content:
      "Yes — financial advice scales. We help you prioritize, reduce needless fees, and create a plan appropriate for your current resources and future goals.",
  },
  {
    title: "Can you help make my investments more secure?",
    content:
      "We work with you to balance risk and reward, aligning investments to time horizons and comfort levels while protecting key assets.",
  },
  {
    title: "Could you please review my portfolio?",
    content:
      "Absolutely. Regular reviews let us rebalance, check assumptions, and keep your plan aligned with life changes and market realities.",
  },
  {
    title: "What kind of kids' education plans do you offer?",
    content:
      "We model future costs, build a personalized funding plan, and recommend tax-smart solutions where appropriate.",
  },
  {
    title: "Do you provide assistance with life insurance?",
    content:
      "Yes. We assess need, compare carriers and solutions, and help you choose coverage that protects your family and goals.",
  },
];

export default function FoundationalCommitmentsVariantA() {
  const [open, setOpen] = useState(0);
  const contentRefs = useRef({});

  // Brand colors
  const NAVY = "#0d2c55";
  const ACCENT_FROM = "#0fb7d4";
  const ACCENT_TO = "#1ad1a3";
  const GOLD = "#f4b33d";
  const TEXT = "#082033";

  // local image generated in the session (use as the FAQ visual)
  const faqImgPath = "/mnt/data/A_digital_illustration_features_financial_advisors.png";

  useEffect(() => {
    // keep accessible height animation in sync with open state
    Object.keys(contentRefs.current).forEach((k) => {
      const el = contentRefs.current[k];
      if (!el) return;
      if (Number(k) === open) {
        el.style.maxHeight = el.scrollHeight + "px";
      } else {
        el.style.maxHeight = "0px";
      }
    });
  }, [open]);

  return (
    <section
      id="faq"
      className="py-16 px-6 md:px-10"
      aria-labelledby="faq-heading"
      style={{ background: "linear-gradient(180deg,#ffffff 0%, #f7fdfc 40%)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2
            id="faq-heading"
            className="text-sm uppercase tracking-wider font-semibold mb-2"
            style={{ color: ACCENT_FROM }}
          >
            Frequently Asked Questions
          </h2>
          <h1
            className="text-3xl md:text-4xl font-extrabold"
            style={{ color: NAVY }}
          >
            Everything you want to know
          </h1>
          <p className="mt-3 text-base md:text-lg text-slate-700 max-w-2xl mx-auto">
            Common questions we hear before clients start working with us — answered plainly.
          </p>
        </div>

        {/* Layout: left visual / right accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* LEFT: brand visual panel */}
          <aside
            className="rounded-2xl overflow-hidden relative"
            style={{
              background: `linear-gradient(180deg, ${NAVY}, rgba(13,44,85,0.92))`,
              color: "white",
              border: "1px solid rgba(13,44,85,0.06)",
              boxShadow: "0 30px 80px -30px rgba(13,44,85,0.28)",
            }}
          >
            <div style={{ padding: 28 }}>
              <div
                className="inline-grid place-items-center mb-4"
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 14,
                  background: "white",
                }}
              >
                <img
                  src={logo}
                  alt="Brand mark"
                  style={{ width: 60, height: 60, objectFit: "contain", borderRadius: 10 }}
                />
              </div>

              <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10 }}>
                We answer real questions, clearly.
              </h3>
              <p style={{ color: "rgba(255,255,255,0.92)", marginBottom: 14 }}>
                Start here to understand how we work, what's included, and how we protect your interests.
              </p>

              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
                <li style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      display: "grid",
                      placeItems: "center",
                      background: `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
                      color: "white",
                      fontWeight: 800,
                      boxShadow: "0 12px 36px -18px rgba(15,183,212,0.12)",
                    }}
                    aria-hidden
                  >
                    99%
                  </div>
                  <div>
                    <div style={{ fontWeight: 700 }}>Client Satisfaction</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)" }}>Measured outcomes</div>
                  </div>
                </li>

                <li style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      display: "grid",
                      placeItems: "center",
                      background: GOLD,
                      color: NAVY,
                      fontWeight: 800,
                    }}
                    aria-hidden
                  >
                    26+
                  </div>
                  <div>
                    <div style={{ fontWeight: 700 }}>Years Combined</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)" }}>Advisor experience</div>
                  </div>
                </li>
              </ul>

              <div style={{ marginTop: 18 }}>
                <a
                  href="#book"
                  onClick={(e) => {
                    e.preventDefault();
                    if (typeof window !== "undefined" && window.Calendly?.initPopupWidget) {
                      window.Calendly.initPopupWidget({ url: "https://calendly.com/jigneshcc2905/30min" });
                    } else {
                      window.open("https://calendly.com/jigneshcc2905/30min", "_blank", "noopener,noreferrer");
                    }
                  }}
                  className="inline-flex items-center gap-3 rounded-lg px-4 py-2 font-semibold"
                  style={{
                    background: `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
                    color: NAVY,
                    boxShadow: "0 12px 36px rgba(15,183,212,0.14)",
                  }}
                  aria-label="Book a review"
                >
                  Book a Review
                </a>
              </div>
            </div>

            {/* Visual: large image anchored to the bottom */}
            <div style={{ height: 220, overflow: "hidden" }}>
              {/* <img
                src={faqImgPath}
                alt="Advisors reviewing charts"
                className="w-full h-full object-cover"
                style={{ display: "block", filter: "saturate(1.02) contrast(0.98)" }}
                loading="lazy"
              /> */}

              {/* subtle teal curve overlay bottom-right */}
              {/* <svg
                viewBox="0 0 800 200"
                preserveAspectRatio="none"
                aria-hidden
                style={{ position: "absolute", right: 0, bottom: 0, width: "40%", height: 120, opacity: 0.95 }}
              >
                <defs>
                  <linearGradient id="faqCurve" x1="0" x2="1">
                    <stop offset="0%" stopColor={ACCENT_FROM} />
                    <stop offset="100%" stopColor={ACCENT_TO} />
                  </linearGradient>
                </defs>
                <path d="M0,160 C160,80 360,120 800,40 L800,200 L0,200 Z" fill="url(#faqCurve)" opacity="0.95" />
              </svg> */}
            </div>
          </aside>

          {/* RIGHT: Accordion */}
          <div>
            <div className="space-y-4">
              {commitmentsData.map((item, i) => {
                const isOpen = open === i;
                return (
                  <div
                    key={i}
                    className="rounded-2xl overflow-hidden"
                    style={{
                      border: isOpen
                        ? `2px solid transparent`
                        : "1px solid rgba(13,44,85,0.06)",
                      background: isOpen ? "white" : "linear-gradient(180deg, rgba(255,255,255,0.98), #fffefc)",
                      boxShadow: isOpen ? "0 18px 40px -18px rgba(13,44,85,0.12)" : "0 6px 18px -8px rgba(13,44,85,0.04)",
                      position: "relative",
                    }}
                  >
                    {/* gradient border when open (separate element so we can keep rounded corners) */}
                    {isOpen && (
                      <div
                        aria-hidden
                        style={{
                          position: "absolute",
                          inset: 0,
                          borderRadius: 14,
                          padding: 1.5,
                          background: `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
                          WebkitMask:
                            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                          WebkitMaskComposite: "xor",
                          maskComposite: "exclude",
                          pointerEvents: "none",
                        }}
                      />
                    )}

                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      className="w-full px-6 py-5 text-left flex items-start gap-4 focus:outline-none"
                      style={{
                        background: "transparent",
                        position: "relative",
                      }}
                      // custom focus styling to use brand gold
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setOpen(isOpen ? null : i);
                        }
                      }}
                    >
                      <div className="flex-1">
                        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
                          <h3 className="font-semibold text-base md:text-lg" style={{ color: NAVY }}>
                            {item.title}
                          </h3>
                        </div>
                        <div className="mt-2 text-sm text-slate-600 line-clamp-2">{/* preview intentionally left blank */}</div>
                      </div>

                      <ChevronDown
                        className={`w-6 h-6 transform transition-transform ${isOpen ? "rotate-180" : ""}`}
                        style={{ color: ACCENT_FROM }}
                        aria-hidden
                      />
                    </button>

                    <div
                      id={`faq-panel-${i}`}
                      ref={(el) => (contentRefs.current[i] = el)}
                      className="px-6 overflow-hidden transition-[max-height] duration-300 ease-in-out"
                      style={{ maxHeight: 0 }}
                    >
                      <div className="py-4 pb-6 text-sm text-slate-700" style={{ lineHeight: 1.6 }}>
                        {item.content}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-6">
              <div
                className="inline-flex items-center gap-4 px-5 py-4 rounded-2xl"
                style={{
                  border: "1px solid rgba(13,44,85,0.06)",
                  background: "white",
                  boxShadow: "0 8px 28px -18px rgba(13,44,85,0.06)",
                }}
              >
                <Mail className="w-5 h-5" style={{ color: ACCENT_FROM }} />
                <div className="text-sm" style={{ color: TEXT }}>
                  Still have questions? Email{" "}
                  <a
                    href="mailto:Info@futurewesecure.com"
                    className="font-semibold"
                    style={{ color: ACCENT_TO }}
                  >
                    Info@futurewesecure.com
                  </a>
                </div>
              </div>
            </div>

            {/* help badge anchored at bottom on small screens */}
            <div className="mt-6 flex items-center gap-3">
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  display: "grid",
                  placeItems: "center",
                  background: `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
                  boxShadow: "0 12px 36px -18px rgba(15,183,212,0.12)",
                  color: "white",
                }}
                aria-hidden
              >
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <div style={{ fontWeight: 700, color: NAVY }}>Need help now?</div>
                <div style={{ fontSize: 13, color: "#64748b" }}>Call or email and we'll respond quickly.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
