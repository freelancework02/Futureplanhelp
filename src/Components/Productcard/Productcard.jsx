// src/components/ProductcardVariantB.jsx
import React, { useEffect, useRef } from "react";
import decorativeLocalImg from "../../assets/Logo/logo.png"

/**
 * ProductcardVariantB — brand refreshed
 *
 * - Color system matched to your logo:
 *   NAVY       : #0d2c55
 *   ACCENT_FROM: #0fb7d4 (teal-blue)
 *   ACCENT_TO  : #1ad1a3 (lime-teal)
 *   GOLD       : #f4b33d
 *
 * - Changes made:
 *   • Recolored UI to match the logo (teal → lime accents + deep navy).
 *   • Layout improvements: denser card grid, larger imagery, info overlay, stronger CTA.
 *   • Uses each service object's `image` (keeps your provided images).
 *   • Decorative header illustration uses the session-uploaded local asset path.
 *
 * - Note: decorativeLocalImg points to a session-local file uploaded earlier;
 *   your build/deployment will map that path to a public URL.
 */

export default function ProductcardVariantB() {
  const NAVY = "#0d2c55";
  const ACCENT_FROM = "#0fb7d4";
  const ACCENT_TO = "#1ad1a3";
  const GOLD = "#f4b33d";

  // decorative session-local illustration (dev will transform to public URL)

  // Calendly loader logic (keeps behavior more resilient)
  const calendlyReadyRef = useRef(false);

  const openCalendly = () => {
    const openPopup = () =>
      window.Calendly?.initPopupWidget?.({
        url: "https://calendly.com/jigneshcc2905/30min",
      });

    if (calendlyReadyRef.current && window.Calendly) {
      openPopup();
      return;
    }

    let script = document.getElementById("calendly-script");
    if (!script) {
      script = document.createElement("script");
      script.id = "calendly-script";
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = () => {
        calendlyReadyRef.current = true;
        openPopup();
      };
      document.body.appendChild(script);
    } else {
      const wait = setInterval(() => {
        if (window.Calendly) {
          clearInterval(wait);
          calendlyReadyRef.current = true;
          openPopup();
        }
      }, 50);

      setTimeout(() => clearInterval(wait), 5000);
    }
  };

  useEffect(() => {
    if (!document.getElementById("calendly-script")) {
      const s = document.createElement("script");
      s.id = "calendly-script";
      s.src = "https://assets.calendly.com/assets/external/widget.js";
      s.async = true;
      s.onload = () => (calendlyReadyRef.current = true);
      document.body.appendChild(s);
    } else {
      calendlyReadyRef.current = !!window.Calendly;
    }
  }, []);

  const services = [
    {
      title: "Fixed & Indexed Annuities",
      description:
        "A contract with an insurer that can guarantee principal and interest while offering potential lifelong income withdrawals.",
      image:
        "https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/product-img4.jpg",
    },
    {
      title: "Indexed Universal Life",
      description:
        "Death benefit protection plus portfolio diversification with the potential for tax-advantaged growth.",
      image:
        "https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/product-img3.jpg",
    },
    {
      title: "Term Life",
      description:
        "Straightforward coverage for the years you need it most—protect temporary responsibilities with confidence.",
      image:
        "https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/product-img2.jpg",
    },
    {
      title: "Traditional IRA / Roth IRA",
      description:
        "Tax-deferred growth with Traditional IRAs or tax-free qualified withdrawals with Roth IRAs—plan an efficient retirement.",
      image: "https://wesecurefuture.com/wp-content/uploads/2024/12/2148793763.jpg",
    },
    {
      title: "Whole Life Insurance",
      description:
        "Lifetime coverage with guaranteed benefits and cash value that can grow over time.",
      image: "https://wesecurefuture.com/wp-content/uploads/2024/12/2163.jpg",
    },
    {
      title: "Will & Trust",
      description:
        "Establish your Will & Trust plus four other core estate documents to protect wishes and heirs.",
      image:
        "https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/product-img1.jpg",
    },
  ];

  return (
    <section
      className="py-16 mt-16"
      style={{
        background:
          "linear-gradient(180deg, #ffffff 0%, rgba(15,44,85,0.02) 45%, #ffffff 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header row with decorative image */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold" style={{ color: NAVY }}>
              Products
            </h2>
            <p className="text-sm mt-1" style={{ color: "#536b78" }}>
              Explore our product suite — quick CTAs let customers act fast.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <img
              src={decorativeLocalImg}
              alt="Illustration"
              style={{
                width: 140,
                height: 88,
                objectFit: "cover",
                borderRadius: 12,
                border: "1px solid rgba(13,44,85,0.04)",
                boxShadow: "0 10px 30px rgba(13,44,85,0.06)",
              }}
              loading="lazy"
            />

            <button
              onClick={(e) => {
                e.preventDefault();
                openCalendly();
              }}
              className="text-sm font-semibold px-4 py-2 rounded-md shadow-sm"
              style={{
                background: `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
                color: NAVY,
              }}
            >
              Book an appointment
            </button>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <article
              key={i}
              className="relative bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all transform hover:-translate-y-2"
              style={{ minHeight: 360 }}
            >
              {/* decorative angled accent — now thinner & anchored to top-left */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  left: -28,
                  top: 8,
                  width: 40,
                  height: 10,
                  transform: "skewX(-18deg)",
                  borderRadius: 6,
                  background: `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
                  boxShadow: "0 8px 30px rgba(15,183,212,0.08)",
                }}
              />

              {/* image */}
              <div className="h-44 md:h-48 w-full overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                {/* soft overlay with product tag */}
                {/* <div
                  style={{
                    position: "absolute",
                    left: 12,
                    bottom: 12,
                    background: "rgba(255,255,255,0.95)",
                    padding: "6px 10px",
                    borderRadius: 12,
                    color: NAVY,
                    fontWeight: 700,
                    boxShadow: "0 8px 26px rgba(13,44,85,0.06)",
                  }}
                >
                  Product
                </div> */}
              </div>

              {/* body */}
              <div className="p-6 flex flex-col justify-between h-[calc(100%-192px)]">
                <div>
                  <h3 className="text-lg font-semibold" style={{ color: NAVY }}>
                    {s.title}
                  </h3>

                  <p className="mt-3 text-sm text-slate-700 leading-relaxed" style={{ minHeight: 62 }}>
                    {s.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span
                      className="text-xs px-3 py-1 rounded-full"
                      style={{
                        background: "rgba(13,44,85,0.03)",
                        color: NAVY,
                      }}
                    >
                      Info
                    </span>
                    <span
                      className="text-xs px-3 py-1 rounded-full"
                      style={{
                        background: "rgba(13,44,85,0.03)",
                        color: NAVY,
                      }}
                    >
                      Quick Call
                    </span>
                    <span
                      className="text-xs px-3 py-1 rounded-full"
                      style={{
                        background: "rgba(13,44,85,0.03)",
                        color: NAVY,
                      }}
                    >
                      Analysis
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between gap-4">
                  <button
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
                      boxShadow: "0 12px 36px rgba(15,183,212,0.10)",
                    }}
                  >
                    Get details
                  </button>

                  {/* <div style={{ color: "#6b7780", fontSize: 13 }}>Quick call • 15m</div> */}
                </div>
              </div>

              {/* floating CTA badge bottom-right */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (typeof window !== "undefined" && window.Calendly?.initPopupWidget) {
                    window.Calendly.initPopupWidget({ url: "https://calendly.com/jigneshcc2905/30min" });
                  } else {
                    window.open("https://calendly.com/jigneshcc2905/30min", "_blank", "noopener,noreferrer");
                  }
                }}
                className="absolute right-4 bottom-4 rounded-full px-4 py-2 text-sm font-semibold shadow-md"
                style={{
                  background: `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
                  color: NAVY,
                }}
                aria-label={`Start ${s.title}`}
              >
                Start
              </button>
            </article>
          ))}
        </div>

        {/* compact bottom strip CTA */}
        <div
          className="mt-12 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{
            background: "linear-gradient(90deg, rgba(15,44,85,0.02), rgba(15,44,85,0.01))",
            border: "1px solid rgba(13,44,85,0.04)",
            boxShadow: "0 12px 40px -18px rgba(13,44,85,0.06)",
          }}
        >
          <div>
            <div style={{ color: NAVY, fontWeight: 800 }}>Need help picking a product?</div>
            <div style={{ color: "#6b7780", marginTop: 6 }}>Book a short review and we'll recommend the best fit.</div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={(e) => {
                e.preventDefault();
                openCalendly();
              }}
              className="rounded-full inline-flex items-center gap-2 px-5 py-3 font-semibold"
              style={{
                background: `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
                color: NAVY,
                boxShadow: "0 12px 36px rgba(15,183,212,0.12)",
              }}
            >
              Book a review
            </button>

            <a
              href="/contact"
              className="rounded-full inline-flex items-center gap-2 px-5 py-3 font-semibold"
              style={{
                border: "1px solid rgba(13,44,85,0.06)",
                background: "white",
                color: NAVY,
                boxShadow: "0 6px 20px rgba(13,44,85,0.04)",
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
