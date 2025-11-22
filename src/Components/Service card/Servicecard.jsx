// src/components/ServicecardVariantA.jsx
import React from "react";
import  decorativeLocalImg from "../../assets/Logo/logo.png"


/**
 * ServicecardVariantA — updated to use each service's provided image.
 *
 * - Uses the service objects' `image` values you supplied.
 * - Keeps brand color tokens (logo-matched).
 * - Layout improvements: denser 3-up grid on desktop, richer image band, clearer CTA.
 * - Includes a small decorative local brand image (session asset) placed in the header.
 *
 * Note: the session-local asset uploaded during this session is used as a decorative image:
 * "/mnt/data/A_digital_illustration_features_financial_advisors.png"
 */

const services = [
  {
    title: "Retirement Planning",
    description:
      "Plan your retirement so your lifestyle is shaped by choice, not just assets at retirement.",
    image:
      "https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/service-img1.jpg",
  },
  {
    title: "Estate Planning",
    description:
      "Protect what you’ve built from probate, litigation, and unfavorable taxation.",
    image:
      "https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/service-img2.jpg",
  },
  {
    title: "Kids Education Planning",
    description:
      "Choose a smart, disciplined path to fund your children’s education.",
    image:
      "https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/service-img3.jpg",
  },
  {
    title: "Lifetime Income Planning",
    description:
      "No pension? Create one—and secure predictable, lifetime income streams.",
    image:
      "https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/service-img4.jpg",
  },
  {
    title: "Life Insurance Planning",
    description:
      "Right-sized coverage with living benefits and quotes that fit your budget.",
    image:
      "https://s3.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/files/images/240314022303_Life%20Insurance%20at%20Various%20Life%20Stages.jpeg",
  },
  {
    title: "Investments Planning",
    description:
      "Grow capital the smart way. Know the difference between nominal and real returns.",
    image:
      "https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/service-img6.jpg",
  },
];

export default function ServicecardVariantA() {
  // brand tokens (matched to your logo)
  const NAVY = "#0d2c55";
  const ACCENT_FROM = "#0fb7d4";
  const ACCENT_TO = "#1ad1a3";
  const GOLD = "#f4b33d";

  // decorative local asset uploaded during this session (used in header)

  return (
    <section
      className="py-16"
      aria-labelledby="services-heading"
      style={{
        background: "linear-gradient(180deg, #ffffff 0%, #f7fdfc 45%, #ffffff 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="text-center md:text-left">
            <div
              className="inline-flex items-center justify-center gap-3 px-4 py-1 rounded-full bg-white border shadow-sm"
              style={{ borderColor: "rgba(13,44,85,0.04)" }}
            >
              <span
                className="w-3 h-3 rounded-full"
                style={{ background: `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_TO})` }}
              />
              <span className="text-sm font-medium" style={{ color: NAVY }}>
                OUR SERVICES
              </span>
            </div>

            <h2
              id="services-heading"
              className="mt-4 text-3xl md:text-4xl font-extrabold"
              style={{ color: NAVY }}
            >
              Professional Services
            </h2>

            <p className="mt-3 text-sm md:text-base text-slate-600 max-w-2xl">
              Expert guidance and tailored solutions to help you secure a stronger financial future.
            </p>
          </div>

          {/* decorative image (small) */}
          <div className="hidden sm:block">
            <img
              src={decorativeLocalImg}
              alt="brand illustration"
              style={{
                width: 120,
                height: 80,
                objectFit: "cover",
                borderRadius: 12,
                boxShadow: "0 10px 30px rgba(13,44,85,0.06)",
                border: "1px solid rgba(13,44,85,0.03)",
              }}
              loading="lazy"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <article
              key={i}
              className="group rounded-3xl overflow-hidden flex flex-col border"
              style={{
                borderColor: "rgba(13,44,85,0.04)",
                boxShadow: "0 12px 40px -18px rgba(13,44,85,0.06)",
                transition: "transform 220ms ease, box-shadow 220ms ease",
              }}
            >
              {/* Image band (uses service.image) */}
              <div className="relative h-48 md:h-56 w-full overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                {/* floating tag */}
                <div
                  className="absolute left-4 bottom-4 rounded-full px-3 py-1 text-xs font-semibold"
                  style={{
                    background: "rgba(255,255,255,0.94)",
                    color: NAVY,
                    boxShadow: "0 8px 24px rgba(13,44,85,0.06)",
                  }}
                >
                  Trusted
                </div>

                {/* corner badge */}
                <div
                  className="absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold text-white"
                  style={{
                    background: `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
                    boxShadow: "0 8px 26px rgba(15,183,212,0.12)",
                  }}
                >
                  Popular
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-7 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: NAVY }}>
                    {s.title}
                  </h3>
                  <p className="text-sm text-slate-700 mb-4" style={{ lineHeight: 1.6 }}>
                    {s.description}
                  </p>

                  <ul className="flex flex-wrap gap-2 mb-4">
                    <li
                      className="text-xs px-3 py-1 rounded-full"
                      style={{ background: "rgba(13,44,85,0.03)", color: NAVY }}
                    >
                      Clarity
                    </li>
                    <li
                      className="text-xs px-3 py-1 rounded-full"
                      style={{ background: "rgba(13,44,85,0.03)", color: NAVY }}
                    >
                      Tailored
                    </li>
                    <li
                      className="text-xs px-3 py-1 rounded-full"
                      style={{ background: "rgba(13,44,85,0.03)", color: NAVY }}
                    >
                      Ongoing
                    </li>
                  </ul>
                </div>

                <div className="flex items-center justify-between gap-4 mt-4">
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
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold"
                    style={{
                      background: `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
                      color: NAVY,
                      boxShadow: "0 10px 30px rgba(15,183,212,0.12)",
                      transition: "transform 180ms ease",
                    }}
                  >
                    Book a review
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M5 12h12M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
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
                    className="text-sm font-medium"
                    style={{ color: NAVY }}
                  >
                    Learn more →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className="mt-12 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border"
          style={{
            borderColor: "rgba(13,44,85,0.04)",
            boxShadow: "0 12px 40px -18px rgba(13,44,85,0.06)",
          }}
        >
          <div>
            <h3 className="text-lg font-bold" style={{ color: NAVY }}>
              Want help choosing a service?
            </h3>
            <p className="text-sm text-slate-600">Book a short review and we'll point you to the fastest path forward.</p>
          </div>

          <div className="flex gap-3">
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
              className="rounded-full inline-flex items-center gap-2 px-5 py-3 font-semibold"
              style={{
                background: `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
                color: NAVY,
                boxShadow: "0 12px 36px rgba(15,183,212,0.12)",
              }}
            >
              Book a review
            </a>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.Calendly?.initPopupWidget?.({
                  url: "https://calendly.com/jigneshcc2905/30min",
                });
              }}
              className="rounded-full inline-flex items-center gap-2 px-5 py-3 font-semibold border"
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
