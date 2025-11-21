// src/pages/Home.jsx
import React from "react";
import {
  Presentation,
  FileText,
  ShieldCheck,
  Briefcase,
  Calculator,
  CheckCircle,
  TrendingUp,
  Users,
} from "lucide-react";

import  logoSrc from "../../assets/Logo/logo.png"


/**
 * Home page — updated:
 * - Color palette matched to logo:
 *   NAVY      : #0d2c55
 *   ACCENT_FROM: #0fb7d4 (teal-blue)
 *   ACCENT_TO  : #1ad1a3 (lime-teal)
 *   GOLD       : #f4b33d
 *
 * - Layout changes:
 *   • Cleaner intro block (no hero image)
 *   • Emphasized gradients for CTA & icons
 *   • Cards reflow with icon + heading left, description right for readable scanning
 *   • Feature strip simplified and more focused
 *
 * Note: small brand image (logo) references the uploaded file path from your session:
 * "/mnt/data/Futureplanhelp.jpeg"
 */

export default function Home() {
  // brand colors
  const NAVY = "#0d2c55";
  const ACCENT_FROM = "#0fb7d4";
  const ACCENT_TO = "#1ad1a3";
  const GOLD = "#f4b33d";
  const TEXT = "#082033";


  const cards = [
    {
      title: "We Help You Plan For Future Needs",
      description:
        "Enjoy today while preparing for tomorrow. Gain clarity on your finances and build a roadmap toward a secure future.",
      Icon: Presentation,
    },
    {
      title: "Educate People On Securing Their Future",
      description:
        "We break down financial concepts into simple, actionable insights so you can make informed wealth decisions.",
      Icon: FileText,
    },
    {
      title: "Protect Your Assets & Loved Ones",
      description:
        "Minimize taxes, reduce risks, and create protections that secure your assets for the next generation.",
      Icon: ShieldCheck,
    },
    {
      title: "Build & Diversify Your Income",
      description:
        "Explore structured and strategic income streams tailored to your goals and lifestyle aspirations.",
      Icon: Briefcase,
    },
  ];

  return (
    <main
      className="min-h-screen py-16 md:py-24 px-4 sm:px-6 lg:px-8"
      style={{
        background: "linear-gradient(180deg, #ffffff 0%, #fbfcfd 50%, #ffffff 100%)",
        color: TEXT,
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Top row: tiny brand + condensed intro (no hero) */}
        <header className="flex items-start justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <img
              src={logoSrc}
              alt="Future Plan Help logo"
              style={{
                width: 64,
                height: 64,
                objectFit: "contain",
                borderRadius: 12,
                border: "1px solid rgba(13,44,85,0.05)",
                boxShadow: "0 8px 20px -12px rgba(13,44,85,0.08)",
                background: "white",
              }}
            />
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: NAVY }}>
                Future Plan Help
              </div>
              <div style={{ fontSize: 13, color: "#64748b" }}>Secure • Grow • Protect</div>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-4">
            <a
              href="#book"
              onClick={(e) => {
                e.preventDefault();
                window.Calendly?.initPopupWidget?.({
                  url: "https://calendly.com/futurewesecure-info/30min",
                });
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold"
              style={{
                background: `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
                color: NAVY,
                boxShadow: "0 10px 28px -18px rgba(15,183,212,0.12)",
              }}
            >
              <Calculator className="w-4 h-4" style={{ color: "white" }} />
              Book a Consultation
            </a>

            <a
              href="/service"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border"
              style={{
                border: "1px solid rgba(13,44,85,0.06)",
                background: "white",
                color: NAVY,
              }}
            >
              Explore Services
            </a>
          </div>
        </header>

        {/* Section header */}
        <div className="text-left mb-12">
          <div
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full text-sm font-semibold mb-4"
            style={{
              background: `linear-gradient(90deg, rgba(15,183,212,0.08), rgba(26,209,163,0.05))`,
              border: "1px solid rgba(13,44,85,0.04)",
              color: NAVY,
            }}
          >
            <CheckCircle className="w-4 h-4" style={{ color: ACCENT_FROM }} />
            What We Do
          </div>

          <h1
            className="text-3xl sm:text-4xl lg:text-4xl font-extrabold leading-tight mb-4"
            style={{ color: NAVY }}
          >
            Empowering you with{" "}
            <span
              style={{
                background: `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              clarity & steady growth
            </span>
            , and a plan that protects what matters.
          </h1>

          <p className="text-slate-700 max-w-3xl">
            Strategic planning, disciplined investing, and practical protection — delivered
            in plain language so you can make confident decisions.
          </p>
        </div>

        {/* Cards grid — new layout: icon column + content column for easier scanning */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {cards.map((card, idx) => (
            <article
              key={idx}
              className="flex gap-6 items-start rounded-2xl p-6"
              style={{
                border: "1px solid rgba(13,44,85,0.04)",
                background: "white",
                boxShadow: "0 10px 28px -12px rgba(13,44,85,0.06)",
                transition: "transform 180ms ease, box-shadow 180ms ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-6px)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <div
                className="flex-none rounded-xl"
                style={{
                  width: 76,
                  height: 76,
                  display: "grid",
                  placeItems: "center",
                  background: `linear-gradient(135deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
                  boxShadow: "0 14px 40px -22px rgba(15,183,212,0.12)",
                  color: "white",
                }}
              >
                <card.Icon className="w-8 h-8" />
              </div>

              <div>
                <h3 style={{ color: NAVY, fontWeight: 700, fontSize: 18, marginBottom: 6 }}>
                  {card.title}
                </h3>
                <p style={{ color: "#486169", fontSize: 14, lineHeight: 1.5 }}>
                  {card.description}
                </p>

                <div style={{ marginTop: 12 }}>
                  <a
                    href="/service"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-md font-medium"
                    style={{
                      color: NAVY,
                      background: "transparent",
                      border: `1px solid rgba(13,44,85,0.06)`,
                    }}
                  >
                    Learn more
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M5 12h14" stroke={NAVY} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 5l7 7-7 7" stroke={NAVY} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Feature strip (compact, without hero) */}
        <section
          className="rounded-2xl px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12"
          style={{
            border: "1px solid rgba(13,44,85,0.04)",
            background: "linear-gradient(180deg, rgba(15,183,212,0.02), white)",
            boxShadow: "0 12px 40px -18px rgba(13,44,85,0.06)",
          }}
        >
          <div className="flex items-start gap-4">
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 12,
                display: "grid",
                placeItems: "center",
                background: `linear-gradient(135deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
                color: "white",
                boxShadow: "0 12px 36px -18px rgba(15,183,212,0.12)",
              }}
            >
              <TrendingUp className="w-6 h-6" />
            </div>

            <div>
              <h3 style={{ color: NAVY, fontSize: 18, fontWeight: 700 }}>
                Let’s analyze your financial game plan
              </h3>
              <p style={{ color: "#586b75", marginTop: 6 }}>
                Get a personalized evaluation of your financial strategy — projections,
                risk posture and practical next steps.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <a
              href="#book"
              onClick={(e) => {
                e.preventDefault();
                window.Calendly?.initPopupWidget?.({
                  url: "https://calendly.com/futurewesecure-info/30min",
                });
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold"
              style={{
                background: `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
                color: NAVY,
              }}
            >
              <Calculator className="w-4 h-4" style={{ color: "white" }} />
              Book a Consultation
            </a>

            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border font-medium"
              style={{
                border: "1px solid rgba(13,44,85,0.06)",
                color: NAVY,
                background: "white",
              }}
            >
              Contact Us
            </a>
          </div>
        </section>

        {/* Mini feature row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Trusted Advisors",
              desc: "Decades of experience guiding individuals and families with honesty and precision.",
              Icon: Users,
              color: ACCENT_FROM,
            },
            {
              title: "Tailored Solutions",
              desc: "Every plan is built uniquely around your long-term personal goals.",
              Icon: CheckCircle,
              color: ACCENT_TO,
            },
            {
              title: "Data-Driven Approach",
              desc: "We look at real numbers, real projections, and real-life variables.",
              Icon: Presentation,
              color: NAVY,
            },
            {
              title: "Transparent Guidance",
              desc: "No hidden agendas—just clear, actionable, and trustworthy advice.",
              Icon: FileText,
              color: GOLD,
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl"
              style={{
                border: "1px solid rgba(13,44,85,0.04)",
                background: "white",
                boxShadow: "0 8px 26px -14px rgba(13,44,85,0.04)",
                textAlign: "center",
              }}
            >
              <item.Icon className="w-10 h-10 mx-auto mb-3" style={{ color: item.color }} />
              <h4 style={{ color: NAVY, fontWeight: 700, marginBottom: 6 }}>{item.title}</h4>
              <p style={{ color: "#526b77", fontSize: 14 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
