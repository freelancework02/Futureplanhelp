// src/components/ValuepropVariantA.jsx
import React from "react";
import decorativeLocalImg from "../../assets/Logo/logo.png"

/**
 * ValuepropVariantA — brand-aligned overhaul
 *
 * - Color system matched to your logo:
 *   NAVY       : #0d2c55
 *   ACCENT_FROM: #0fb7d4 (teal-blue)
 *   ACCENT_TO  : #1ad1a3 (lime-teal)
 *   GOLD       : #f4b33d
 *
 * - Improvements:
 *   • Uses the services object's own `image` fields (keeps your provided images).
 *   • Alternating left/right layout with stronger visual rhythm.
 *   • Larger imagery, cleaner cards, gradient badges, CTA emphasis.
 *   • Decorative session-local illustration used in the header (path included).
 *
 * - Developer note:
 *   Decorative local asset path used below (uploaded during this session):
 *   "/mnt/data/A_digital_illustration_features_financial_advisors.png"
 */

const NAVY = "#0d2c55";
const ACCENT_FROM = "#0fb7d4";
const ACCENT_TO = "#1ad1a3";
const GOLD = "#f4b33d";

const services = [
  {
    title: "Planning for the Future",
    description: (
      <>
        <p className="text-slate-700 leading-relaxed">
          We’ve helped clients prepare for the unknown while staying aligned with their financial goals. Ask us about:
        </p>
        <ul className="list-disc list-outside mt-3 text-slate-600 pl-5 space-y-1">
          <li>Financial planning</li>
          <li>Tax optimization</li>
          <li>Education funding</li>
          <li>Estate planning</li>
        </ul>
        <p className="mt-3 text-slate-700 leading-relaxed">
          As an independent firm, we source across providers to tailor solutions that fit your exact needs.
        </p>
      </>
    ),
    image:
      "https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/service-img7.jpg",
  },
  {
    title: "Comprehensive End-to-End Approach",
    description:
      "We start with a deep needs analysis, clarify goals, and review your full portfolio. Then we tailor strategies to your risk tolerance and market realities—expect unbiased recommendations built around you.",
    image:
      "https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/service-img8.jpg",
  },
  {
    title: "Committed to Service",
    description:
      "Great strategies begin with great relationships. Our mission is to exceed expectations—on day one and year ten. Let’s map short- and long-term moves that bring your goals within reach.",
    image:
      "https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/service-img9.jpg",
  },
];

// Decorative local illustration (session upload)

export default function ValuepropVariantA() {
  return (
    <section
      className="py-16"
      aria-labelledby="value-heading"
      style={{ background: "linear-gradient(180deg,#ffffff 0%, #f7fcfb 45%, #ffffff 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12">
          <div className="text-center lg:text-left max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <span
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  display: "inline-grid",
                  placeItems: "center",
                  background: `linear-gradient(135deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
                  boxShadow: "0 8px 28px rgba(15,183,212,0.12)",
                }}
                aria-hidden="true"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M7 17L17 7" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M17 7H8" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>

              <div>
                <div className="text-sm font-semibold" style={{ color: NAVY }}>OUR VALUE</div>
                <h2 id="value-heading" className="text-2xl md:text-3xl font-extrabold" style={{ color: NAVY }}>
                  Why clients choose us
                </h2>
              </div>
            </div>

            <p className="text-slate-600">
              Clear guidance. Disciplined strategy. Practical next steps that keep your long-term goals intact.
            </p>
          </div>

          {/* decorative illustration (small) */}
          <div className="hidden sm:block">
            <img
              src={decorativeLocalImg}
              alt="Illustration — financial planning"
              style={{
                width: 140,
                height: 90,
                objectFit: "cover",
                borderRadius: 12,
                boxShadow: "0 10px 30px rgba(13,44,85,0.06)",
                border: "1px solid rgba(13,44,85,0.03)",
              }}
              loading="lazy"
            />
          </div>
        </div>

        {/* Showcase list — alternating layout */}
        <div className="space-y-12">
          {services.map((s, idx) => {
            const reverse = idx % 2 === 1;
            return (
              <article
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch"
                aria-labelledby={`value-${idx}-title`}
              >
                {/* Image column */}
                <div
                  className={`md:col-span-6 rounded-2xl overflow-hidden shadow-lg relative transform transition duration-300 group hover:scale-[1.01]`}
                  style={{ gridColumn: reverse ? "7 / span 6" : "1 / span 6" }}
                >
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-72 md:h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                  <span
                    className="absolute left-4 top-4 rounded-full px-3 py-1 text-sm font-semibold text-white"
                    style={{ background: `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_TO})` }}
                  >
                    {idx === 0 ? "Flagship" : "Featured"}
                  </span>

                  {/* bottom badge */}
                  <div
                    className="absolute left-4 bottom-4 rounded-xl px-3 py-2 bg-white/95 text-sm font-semibold"
                    style={{ boxShadow: "0 8px 24px rgba(13,44,85,0.06)", color: NAVY }}
                  >
                    Trusted
                  </div>
                </div>

                {/* Content column */}
                <div
                  className="md:col-span-6 bg-white rounded-2xl p-6 md:p-10 flex flex-col justify-between border border-slate-100 shadow-sm"
                  style={{ gridColumn: reverse ? "1 / span 6" : "7 / span 6" }}
                >
                  <div>
                    <h3 id={`value-${idx}-title`} className="text-2xl font-bold" style={{ color: NAVY }}>
                      {s.title}
                    </h3>

                    <div className="mt-4 text-slate-700">
                      {s.description}
                    </div>

                    <ul className="mt-6 flex flex-wrap gap-2">
                      <li className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(13,44,85,0.03)", color: NAVY }}>
                        Clarity
                      </li>
                      <li className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(13,44,85,0.03)", color: NAVY }}>
                        Tailored
                      </li>
                      <li className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(13,44,85,0.03)", color: NAVY }}>
                        Ongoing
                      </li>
                    </ul>
                  </div>

                  <div className="mt-6 flex items-center gap-4">
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
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-white font-semibold"
                      style={{
                        background: `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
                        boxShadow: "0 12px 36px rgba(15,183,212,0.12)",
                      }}
                      aria-label={`Talk to an advisor about ${s.title}`}
                    >
                      Talk to an advisor
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M5 12h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>

                    <a
                      className="text-sm font-medium text-slate-700 underline"
                      href="#learn"
                      onClick={(e) => {
                        e.preventDefault();
                        if (typeof window !== "undefined" && window.Calendly?.initPopupWidget) {
                          window.Calendly.initPopupWidget({ url: "https://calendly.com/jigneshcc2905/30min" });
                        } else {
                          window.open("https://calendly.com/jigneshcc2905/30min", "_blank", "noopener,noreferrer");
                        }
                      }}
                    >
                      Learn more
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
