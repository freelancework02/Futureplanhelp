// src/components/AboutUs.jsx
import React from "react";
import founderImg from "../../assets/founder.jpeg" 

/**
 * AboutUs — enhanced UI + founder image
 *
 * - Uses brand color tokens (logo-matched)
 * - Uses session-uploaded founder image at: /mnt/data/Futureplanhelp.jpeg
 * - Improved layout: left = copy + stats + CTAs, right = refined portrait card
 * - Small UI enhancements: subtle motion, clearer hierarchy, accessible alt text
 */

const AboutUs = () => {
  const NAVY = "#0d2c55";
  const ACCENT_FROM = "#0fb7d4";
  const ACCENT_TO = "#1ad1a3";
  const GOLD = "#f4b33d";
  const TEXT = "#082033";

  // use the session-uploaded image as the founder portrait

  // lightweight SVG fallback data URI (in case the image fails to load)
  const placeholder = `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='800' viewBox='0 0 800 800'><rect width='100%' height='100%' fill='%23ffffff'/><g fill='%230fb7d4' opacity='0.12'><circle cx='400' cy='400' r='250'/></g><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='28' fill='%23000000' opacity='0.2'>Image unavailable</text></svg>`
  )}`;

  return (
    <section
      className="relative"
      aria-labelledby="about-heading"
      style={{
        background: "linear-gradient(180deg,#ffffff 0%, #f2fcfb 40%, #ffffff 100%)",
      }}
    >
      {/* subtle grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(rgba(13,44,85,0.02) 1px, transparent 1.8px), radial-gradient(rgba(13,44,85,0.02) 1px, transparent 1.8px)",
          backgroundSize: "28px 28px",
          backgroundPosition: "0 0, 14px 14px",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,.6), rgba(0,0,0,.12))",
        }}
      />

      <div className="relative max-w-7xl mx-auto mt-16 px-6 py-16 md:py-20 lg:py-24 text-black">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm border"
            style={{ borderColor: "rgba(13,44,85,0.06)" }}
          >
            <span
              className="text-[13px] font-semibold tracking-widest"
              style={{ color: NAVY }}
            >
              ABOUT US
            </span>
          </div>

          <h1
            id="about-heading"
            className="mt-4 text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight"
            style={{ color: NAVY }}
          >
            About Future We Secure
          </h1>

          <p className="mt-3 max-w-3xl mx-auto text-slate-700">
            We simplify finances so you can protect what matters and pursue growth with confidence.
          </p>
        </div>

        {/* Main content card */}
        <div
          className="rounded-3xl bg-white p-6 md:p-10 shadow-xl border"
          style={{
            borderColor: "rgba(13,44,85,0.04)",
            boxShadow: "0 18px 56px -18px rgba(13,44,85,0.12)",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* LEFT: copy, mission, stats, CTAs */}
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-semibold" style={{ color: NAVY }}>
                Our Mission
              </h2>

              <p className="text-slate-700 leading-relaxed">
                At Future We Secure, we start by teaching the fundamentals—budgeting,
                saving, investing—and then build tailored strategies that map to your
                life goals. We combine clear education with protective planning so your
                decisions are confident and durable.
              </p>

              <p className="text-slate-700 leading-relaxed">
                Whether you’re saving for education, preparing for retirement, or
                building generational security, we provide tools and ongoing support to
                keep your plan on track.
              </p>

              {/* stats row with gentle motion */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div
                  className="flex items-center gap-3 transform transition-transform hover:-translate-y-1"
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 14,
                      display: "grid",
                      placeItems: "center",
                      background: `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
                      color: "white",
                      fontWeight: 800,
                      boxShadow: "0 10px 30px rgba(15,183,212,0.12)",
                      fontSize: 18,
                    }}
                    aria-hidden
                  >
                    99%
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: NAVY }}>Client Satisfaction</div>
                    <div style={{ color: "#6b8a94", fontSize: 13 }}>Measured outcomes</div>
                  </div>
                </div>

                <div
                  className="flex items-center gap-3 transform transition-transform hover:-translate-y-1"
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 14,
                      display: "grid",
                      placeItems: "center",
                      background: GOLD,
                      color: NAVY,
                      fontWeight: 800,
                      fontSize: 18,
                    }}
                    aria-hidden
                  >
                    26+
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: NAVY }}>Years Combined</div>
                    <div style={{ color: "#6b8a94", fontSize: 13 }}>Advisor experience</div>
                  </div>
                </div>
              </div>

              {/* quick features */}
              <div className="grid sm:grid-cols-2 gap-3 mt-4">
                {["Education First", "Personalized Planning", "Ongoing Support", "Fiduciary Care"].map((b, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-lg"
                    style={{
                      background: "rgba(13,44,85,0.02)",
                      border: "1px solid rgba(13,44,85,0.03)",
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 8,
                        display: "grid",
                        placeItems: "center",
                        background: `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
                        color: "white",
                        fontWeight: 700,
                      }}
                      aria-hidden
                    >
                      ✓
                    </div>
                    <div style={{ color: TEXT, fontWeight: 600 }}>{b}</div>
                  </div>
                ))}
              </div>

              {/* short bio + CTA row */}
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                <a
                  href="/services"
                  className="inline-flex items-center gap-3 rounded-xl px-4 py-3 font-semibold"
                  style={{
                    background: `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
                    color: NAVY,
                    boxShadow: "0 12px 36px rgba(15,183,212,0.12)",
                  }}
                >
                  Explore Services
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-xl px-4 py-3 border font-medium"
                  style={{
                    border: "1px solid rgba(13,44,85,0.06)",
                    background: "white",
                    color: NAVY,
                  }}
                >
                  Book a review
                </a>
              </div>

              {/* micro timeline to show process (simple) */}
              <div className="mt-4">
                <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                  {[
                    { k: "1", t: "Listen" },
                    { k: "2", t: "Assess" },
                    { k: "3", t: "Plan" },
                    { k: "4", t: "Review" },
                  ].map((st, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 10,
                          display: "grid",
                          placeItems: "center",
                          background: idx === 2 ? `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_TO})` : "rgba(13,44,85,0.03)",
                          color: idx === 2 ? "white" : NAVY,
                          fontWeight: 700,
                        }}
                        aria-hidden
                      >
                        {st.k}
                      </div>
                      <div style={{ color: "#475e68" }}>{st.t}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: refined portrait card with enhanced UI */}
            <div className="flex items-center justify-center">
              <div
                className="rounded-2xl overflow-hidden p-6 w-full max-w-[420px]"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(255,255,255,0.98))",
                  border: "1px solid rgba(13,44,85,0.04)",
                  boxShadow: "0 22px 60px -24px rgba(13,44,85,0.12)",
                }}
              >
                <div className="flex flex-col items-center text-center gap-4">
                  {/* halo + portrait ring */}
                  <div style={{ position: "relative", width: 220, height: 220 }}>
                    <div
                      aria-hidden
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "50%",
                        filter: "blur(28px)",
                        background: `radial-gradient(circle at 30% 35%, ${ACCENT_FROM}33, transparent 28%), radial-gradient(circle at 70% 70%, ${ACCENT_TO}18, transparent 28%)`,
                        transform: "translateZ(0)",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 12,
                        borderRadius: "50%",
                        background: `linear-gradient(135deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
                        padding: 6,
                        boxShadow: "0 18px 40px rgba(13,44,85,0.12)",
                        transition: "transform 320ms ease",
                      }}
                      className="group"
                    >
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "50%",
                          overflow: "hidden",
                          background: "#fff",
                          display: "block",
                        }}
                      >
                        <img
                          src={founderImg}
                          alt="Founder — Ashish Patel"
                          onError={(e) => {
                            // @ts-ignore
                            e.currentTarget.onerror = null;
                            // @ts-ignore
                            e.currentTarget.src = placeholder;
                          }}
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", OObjectPosition:"center", }}
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div style={{ color: ACCENT_FROM, fontWeight: 800, letterSpacing: 0.8, fontSize: 13 }}>Founder</div>
                    <h3 style={{ color: NAVY, fontSize: 24, fontWeight: 800, marginTop: 6 }}>Jignesh Patel</h3>
                    <div style={{ color: "#6a7d86", marginTop: 4 }}>(License Number – 17702642)</div>

                    <div style={{ height: 10 }} />

                    <div style={{ width: 120, height: 4, margin: "12px auto 0", borderRadius: 999, background: `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_TO})` }} />
                  </div>

                  {/* short founder quote */}
                  <blockquote
                    style={{
                      marginTop: 10,
                      fontStyle: "italic",
                      color: "#3a5562",
                      maxWidth: 320,
                      fontSize: 14,
                    }}
                  >
                    “We plan for what matters — and protect it so your future stays on track.”
                  </blockquote>

                  {/* social / contact quick links */}
                  <div className="flex gap-3 mt-3">
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 rounded-lg px-4 py-2 font-semibold"
                      style={{
                        background: `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
                        color: NAVY,
                      }}
                    >
                      Book a review
                    </a>

                    <a
                      href="/service"
                      className="inline-flex items-center gap-2 rounded-lg px-4 py-2 border font-medium"
                      style={{
                        border: "1px solid rgba(13,44,85,0.06)",
                        background: "white",
                        color: NAVY,
                      }}
                    >
                      our services
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* end right */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
