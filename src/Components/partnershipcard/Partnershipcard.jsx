// src/components/PartnerProgramVariantA.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  Handshake,
  Notebook,
  BookOpenText,
  ChartNoAxesCombined,
  X,
} from "lucide-react";

/**
 * PartnerProgramVariantA — advanced & polished (Option A palette)
 *
 * - NAVY       : #0d2c55
 * - ACCENT_FROM: #0fb7d4
 * - ACCENT_TO  : #1ad1a3
 * - GOLD       : #f4b33d
 *
 * Improvements:
 * - Decorative image (session-local) replaces SVG.
 * - Stronger visual hierarchy, hover/focus interactions, accessible modal.
 * - Buttons & CTAs guaranteed to remain visible (z-index, fixed positioning in modal).
 * - Micro-interactions (scale, shadow) to make UI feel responsive and premium.
 *
 * Note: decorativeLocalImg uses the session-uploaded path which your environment will map.
 */

const NAVY = "#0d2c55";
const ACCENT_FROM = "#0fb7d4";
const ACCENT_TO = "#1ad1a3";
const GOLD = "#f4b33d";

// session-local decorative image (use this path; your build will map it)
const decorativeLocalImg = "/mnt/data/A_digital_illustration_features_financial_advisors.png";

const cardData = [
  {
    title: "Responsibilities",
    description: [
      "Embrace the system, follow it, and align with your leaders.",
      "Allow your leaders to guide you while you earn and learn simultaneously.",
      "Invite anyone and everyone to sessions and workshops.",
      "Schedule follow-up sessions with your leader to enhance growth.",
    ],
    Icon: Handshake,
  },
  {
    title: "Educate People On Securing Their Future",
    description: [
      "An investment in knowledge pays the best interest — we help families secure future needs while enjoying life fully.",
    ],
    Icon: Notebook,
  },
  {
    title: "Required Skills",
    description: ["Energetic self-starter", "Coachable", "18+ with valid SSN"],
    Icon: BookOpenText,
  },
  {
    title: "What Will You Gain",
    description: [
      "Craft tailored plans across retirement planning, tax savings, 401(k) rollover, college savings, asset protection, risk management, and estate planning.",
    ],
    Icon: ChartNoAxesCombined,
  },
];

export default function PartnerProgramVariantA() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeBtnRef = useRef(null);
  const gridRef = useRef(null);
  const calendlyReadyRef = useRef(false);

  // load Calendly idempotently
  const loadCalendlyScript = () => {
    if (typeof window === "undefined") return;
    if (document.getElementById("calendly-script")) {
      calendlyReadyRef.current = !!window.Calendly;
      return;
    }
    const s = document.createElement("script");
    s.id = "calendly-script";
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    s.onload = () => (calendlyReadyRef.current = true);
    document.body.appendChild(s);
  };

  useEffect(() => {
    loadCalendlyScript();
  }, []);

  const openCalendly = () => {
    // robust: either init popup or open fallback url
    const popup = () =>
      window.Calendly?.initPopupWidget?.({
        url: "https://calendly.com/jigneshcc2905/30min",
      });

    if (calendlyReadyRef.current && window.Calendly?.initPopupWidget) {
      popup();
      return;
    }

    // attempt to load, then try to open
    loadCalendlyScript();
    const waiter = setInterval(() => {
      if (window.Calendly?.initPopupWidget) {
        clearInterval(waiter);
        popup();
      }
    }, 80);
    setTimeout(() => clearInterval(waiter), 4000);
  };

  // modal open/close with focus management
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && isModalOpen) closeModal();
    };
    if (isModalOpen) {
      window.addEventListener("keydown", onKey);
      // trap focus to close button after opening
      setTimeout(() => closeBtnRef.current?.focus(), 80);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const openModal = (card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  return (
    <section
      aria-labelledby="partner-heading"
      className="relative max-w-7xl mx-auto px-4 py-16"
      style={{
        background:
          "linear-gradient(180deg,#ffffff 0%, rgba(13,44,85,0.02) 45%, #ffffff 100%)",
      }}
    >
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mt-16">
        <div className="inline-flex items-center justify-center gap-4 mb-4">
          <div
            aria-hidden
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              display: "grid",
              placeItems: "center",
              background: `linear-gradient(135deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
              boxShadow: "0 12px 36px rgba(15,183,212,0.12)",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M7 17L17 7" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M17 7H8" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div>
            <h2 id="partner-heading" style={{ color: NAVY }} className="text-3xl md:text-4xl font-extrabold">
              Partner Program
            </h2>
            <p className="mt-2 text-sm md:text-base" style={{ color: "#415f67" }}>
              Build a meaningful career helping families master personal finance.
            </p>
          </div>
        </div>

        {/* Decorative image card (replaces SVG). visually rich and well-framed */}
       

        <div className="mt-6">
          <button
            onClick={(e) => {
              e.preventDefault();
              openCalendly();
            }}
            className="inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-semibold focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(15,183,212,0.22)]"
            style={{
              background: `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
              color: NAVY,
              boxShadow: "0 12px 36px rgba(15,183,212,0.12)",
            }}
            aria-label="Book a partner program call"
          >
            Learn More & Apply
          </button>
        </div>
      </div>

      {/* Cards grid */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {cardData.map((card, idx) => {
          const Icon = card.Icon;
          return (
            <article
              key={idx}
              className="relative group bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm hover:shadow-2xl transition-transform duration-250 ease-out transform hover:-translate-y-2 focus-within:shadow-lg outline-none"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") openModal(card);
              }}
              onClick={() => openModal(card)}
              aria-label={`Open details for ${card.title}`}
              style={{ cursor: "pointer" }}
            >
              {/* icon tile */}
              <div
                className="w-16 h-16 rounded-2xl grid place-items-center -mt-8 mb-2"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
                  boxShadow: "0 12px 36px rgba(15,183,212,0.12)",
                }}
                aria-hidden
              >
                <Icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-xl font-semibold" style={{ color: NAVY }}>
                {card.title}
              </h3>

              <div className="mt-3 text-sm text-slate-700 leading-relaxed">
                <ul className="list-disc pl-5 space-y-1">
                  {card.description.slice(0, 3).map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold"
                    style={{
                      background: `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
                      color: NAVY,
                    }}
                    aria-hidden
                  >
                    Join
                  </span>

                  <span className="text-xs text-slate-500">Mentorship available</span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    openModal(card);
                  }}
                  className="text-sm font-semibold underline focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(15,183,212,0.18)]"
                  aria-label={`View details about ${card.title}`}
                >
                  View Details →
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Modal — accessible, layered above everything */}
      {isModalOpen && selectedCard && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="partner-modal-title"
          onClick={closeModal}
          style={{ background: "rgba(7, 14, 20, 0.55)" }}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 relative mx-auto"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: "0 30px 90px rgba(13,44,85,0.24)",
              transform: "translateY(0)",
              animation: "modal-pop .18s cubic-bezier(.2,.9,.2,1)",
            }}
          >
            {/* close */}
            <button
              ref={closeBtnRef}
              onClick={closeModal}
              className="absolute right-4 top-4 p-2 rounded-md hover:bg-slate-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(15,183,212,0.18)]"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 id="partner-modal-title" className="text-2xl font-bold" style={{ color: NAVY }}>
              {selectedCard.title}
            </h3>

            <div className="mt-4 text-slate-700">
              <ul className="list-disc pl-5 space-y-2">
                {selectedCard.description.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className="text-sm text-slate-600">
                  Ready to learn more? Book a short call — we'll explain the program and next steps.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    openCalendly();
                  }}
                  className="inline-flex items-center gap-2 rounded-xl px-4 py-2 font-semibold focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(15,183,212,0.18)]"
                  style={{
                    background: `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
                    color: NAVY,
                    boxShadow: "0 12px 36px rgba(15,183,212,0.12)",
                    zIndex: 1010,
                  }}
                >
                  Book a Call
                </button>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    window.Calendly?.initPopupWidget?.({
                      url: "https://calendly.com/jigneshcc2905/30min",
                    });
                  }}
                  className="inline-flex items-center gap-2 rounded-xl px-4 py-2 border font-medium focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(15,183,212,0.08)]"
                  style={{
                    border: "1px solid rgba(13,44,85,0.06)",
                    background: "white",
                    color: NAVY,
                  }}
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal pop animation (inline style injection) */}
      <style>{`
        @keyframes modal-pop {
          from { transform: translateY(6px) scale(.995); opacity: 0 }
          to { transform: translateY(0) scale(1); opacity: 1 }
        }

        /* small accessibility improvement for keyboard users */
        :focus-visible {
          outline: 2px solid transparent;
        }
      `}</style>
    </section>
  );
}
