// src/components/EventsDetail.VariantA.Enhanced.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FiCalendar,
  FiUser,
  FiExternalLink,
  FiImage,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

/**
 * EventsDetail.VariantA.Enhanced.jsx
 *
 * - Color system matched to the uploaded brand/logo (NAVY + teal gradient accents).
 * - Cleaner layout: constrained hero height, responsive floating info card,
 *   improved sticky right column, accessible lightbox with keyboard nav,
 *   better focus handling and clearly visible CTA buttons.
 * - Uses a session-local image as fallback when event image is missing:
 *   "/mnt/data/A_digital_illustration_features_financial_advisors.png"
 *
 * Notes:
 * - The code is self-contained React (no external CSS required beyond Tailwind/utility classes).
 * - Replace the fallback path if you want a different default image.
 */

const NAVY = "#0d2c55";
const ACCENT_FROM = "#0fb7d4"; // teal
const ACCENT_TO = "#1ad1a3"; // lime-teal
const GOLD = "#f4b33d";
const GRADIENT = `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_TO})`;

// session-local fallback asset (uploaded during this session)
const FALLBACK_IMG = "/mnt/data/A_digital_illustration_features_financial_advisors.png";

export default function EventsDetailVariantA({ event = {}, previousEvents = [] }) {
  // fallback demo data for local testing when no event prop provided
  const demo = useMemo(
    () => ({
      title: "Design Systems & DX: A Practical Deep Dive",
      date: "2025-11-18T17:30:00+05:30",
      description:
        "<p>A hands-on session covering design tokens, accessibility, and performance budgets. Bring your questions and screens!</p>",
      host: "Future plan Help — Jignesh Patel",
      meetingLink: "https://meet.example.com/weplanfuture-demo",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1400&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1400&auto=format&fit=crop",
      ],
    }),
    []
  );

  const model = { ...demo, ...event };
  const images = Array.isArray(model.gallery) ? model.gallery : [];
  const hasGallery = images.length > 0;

  // lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const lightboxRef = useRef(null);

  // measure top offset to avoid content being hidden by fixed navbar
  const [topOffset, setTopOffset] = useState(null);
  const heroRef = useRef(null);

  useEffect(() => {
    function computeOffset() {
      const byId = document.getElementById("site-navbar");
      const byAttr = document.querySelector("[data-fixed-navbar='true']");
      const nav = byId || byAttr;
      if (nav) {
        const rect = nav.getBoundingClientRect();
        const style = window.getComputedStyle(nav);
        const isFixed = Math.abs(rect.top) < 6 || style.position === "fixed" || style.position === "sticky";
        if (isFixed) {
          setTopOffset(Math.ceil(rect.height) + 12);
          return;
        }
      }
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      setTopOffset(vw < 768 ? 64 : 96);
    }
    computeOffset();
    window.addEventListener("resize", computeOffset);
    return () => window.removeEventListener("resize", computeOffset);
  }, []);

  // lightbox helpers
  const openLightbox = (index = 0) => {
    if (!hasGallery) return;
    setLightboxIndex(index);
    setLightboxOpen(true);
    // lock scroll
    document.body.style.overflow = "hidden";
    setTimeout(() => lightboxRef.current?.focus?.(), 40);
  };
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  };
  const nextImage = () => setLightboxIndex((p) => (p + 1) % images.length);
  const prevImage = () => setLightboxIndex((p) => (p - 1 + images.length) % images.length);

  // keyboard for lightbox
  useEffect(() => {
    const onKey = (e) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, images.length]);

  // hero parallax micro-movement
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const pct = Math.min(Math.max((window.innerHeight - rect.top) / (window.innerHeight + rect.height), 0), 1);
      const translate = (1 - pct) * 6; // subtle
      el.style.transform = `translateY(${translate}px)`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // safe top for layout while measuring
  const safeTop = topOffset ?? 64;

  // small helpers
  function formatDate(input) {
    try {
      const d = new Date(input);
      if (isNaN(d.getTime())) return String(input || "");
      return d.toLocaleString(undefined, { weekday: "short", year: "numeric", month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit" });
    } catch {
      return String(input || "");
    }
  }
  function isHtml(s) {
    return typeof s === "string" && /<\/?[a-z][\s\S]*>/i.test(s);
  }
  function safeHtml(html) {
    // minimal sanitize: keep allowed tags only (B,I,STRONG,EM,P,BR,UL,OL,LI,A)
    try {
      const div = document.createElement("div");
      div.innerHTML = html;
      const allowed = ["B", "I", "STRONG", "EM", "P", "BR", "UL", "OL", "LI", "A"];
      const walker = document.createTreeWalker(div, NodeFilter.SHOW_ELEMENT, null);
      const toStrip = [];
      while (walker.nextNode()) {
        const n = walker.currentNode;
        if (!allowed.includes(n.nodeName)) toStrip.push(n);
        if (n.nodeName === "A") {
          const href = n.getAttribute("href") || "";
          if (!/^https?:\/\//i.test(href)) n.setAttribute("href", "#");
          n.setAttribute("rel", "noopener noreferrer");
          n.setAttribute("target", "_blank");
        }
      }
      toStrip.forEach((n) => n.replaceWith(...n.childNodes));
      return div.innerHTML;
    } catch {
      return String(html || "");
    }
  }

  const thumbnail = model.thumbnailUrl || FALLBACK_IMG;
  const eventTitle = model.title || "Event";

  return (
    <section
      className="w-full"
      aria-labelledby="event-title"
      style={{ paddingTop: `${safeTop}px`, paddingBottom: 28 }}
    >
      {/* HERO */}
      <div ref={heroRef} className="relative w-full overflow-hidden rounded-2xl" style={{ height: "min(56vh, 520px)", maxHeight: 560 }}>
        <img
          src={thumbnail}
          alt={eventTitle}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 will-change-transform"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* floating info card (left) */}
        <div className="absolute left-4 right-4 bottom-4 md:left-12 md:right-auto md:bottom-12 md:w-[46%]">
          <article
            className="rounded-2xl bg-white/98 backdrop-blur-sm px-4 py-4 shadow-[0_18px_45px_rgba(3,7,18,0.12)] border border-black/6"
            role="region"
            aria-label={`Event info: ${eventTitle}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="inline-flex items-center gap-2 text-xs font-semibold rounded-full px-2 py-0.5" style={{ background: "rgba(0,0,0,0.45)", color: "white" }}>
                  <FiCalendar /> <span>{formatDate(model.date)}</span>
                </div>

                <h1 id="event-title" className="mt-2 text-sm md:text-lg font-extrabold text-white truncate" title={eventTitle}>
                  {eventTitle}
                </h1>

                {model.host && <p className="mt-1 text-xs text-white line-clamp-2">{model.host}</p>}

                <p className="mt-2 text-xs text-white">Format: Live · Q&A · Slides</p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <div className="flex flex-col gap-2">
                  {model.meetingLink ? (
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full px-3 py-1.5 text-sm font-semibold inline-flex items-center gap-2"
                      style={{ background: GRADIENT, color: NAVY, boxShadow: "0 10px 30px rgba(15,183,212,0.12)" }}
                    >
                      <FiExternalLink /> Join
                    </a>
                  ) : (
                    <button
                      onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}
                      className="rounded-full px-3 py-1.5 text-sm font-semibold border border-black/10 bg-white text-black shadow-sm"
                    >
                      Contact organizer
                    </button>
                  )}

                  {hasGallery && (
                    <button
                      onClick={() => openLightbox(0)}
                      className="rounded-full px-3 py-1 text-sm font-medium text-black border border-black/6 bg-white/95"
                    >
                      View gallery
                    </button>
                  )}
                </div>

                <div className="text-xs text-white">Approx. 90 mins</div>
              </div>
            </div>
          </article>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* left: main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About section */}
            <section className="rounded-2xl border border-black/8 bg-white p-5 md:p-6 shadow-sm">
              <header className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: GRADIENT }}>
                  <FiImage className="text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-black">About this event</h2>
                  <p className="text-xs text-black/60">What to expect & how to prepare</p>
                </div>
              </header>

              <div className="prose max-w-none text-black/75">
                {isHtml(model.description) ? (
                  <div dangerouslySetInnerHTML={{ __html: safeHtml(model.description) }} />
                ) : (
                  <p>{model.description}</p>
                )}
              </div>
            </section>

            {/* Gallery */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-black">Gallery</h3>
                {hasGallery && <div className="text-sm text-black/60">{images.length} photos</div>}
              </div>

              {hasGallery ? (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {images.slice(0, 6).map((src, i) => (
                      <button
                        key={i}
                        onClick={() => openLightbox(i)}
                        className="group relative overflow-hidden rounded-xl border border-black/6 focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(15,183,212,0.12)]"
                        aria-label={`Open image ${i + 1}`}
                        title="Open image"
                      >
                        <div className="aspect-[4/3]">
                          <img src={src} alt={`Event photo ${i + 1}`} className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105" loading="lazy" />
                        </div>

                        <div className="absolute left-2 top-2 px-2 py-0.5 rounded-md text-xs text-white" style={{ background: GRADIENT }}>
                          #{i + 1}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/8 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>

                  {images.length > 6 && (
                    <div className="mt-3 flex justify-center">
                      <button onClick={() => openLightbox(6)} className="rounded-lg px-4 py-2 text-sm font-semibold bg-white border border-black/8 shadow-sm">
                        View more
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="rounded-xl border border-dashed border-black/10 p-6 text-center text-black/60">Gallery will appear soon.</div>
              )}
            </section>
          </div>

          {/* right: sticky details */}
          <aside className="lg:col-span-1">
            <div
              className="rounded-2xl border border-black/8 bg-white p-4 shadow-sm sticky top-[calc(12px+var(--safe-navbar,0px))]"
              style={{ alignSelf: "start" }}
            >
              <h4 className="font-semibold text-black mb-3">Event details</h4>
              <ul className="text-sm text-black/70 space-y-4">
                <li className="flex items-start gap-3">
                  <FiCalendar className="mt-0.5 text-black/50" />
                  <div>
                    <div className="font-medium text-black">Date & time</div>
                    <div className="text-sm">{formatDate(model.date)}</div>
                  </div>
                </li>

                {model.host && (
                  <li className="flex items-start gap-3">
                    <FiUser className="mt-0.5 text-black/50" />
                    <div>
                      <div className="font-medium text-black">Host</div>
                      <div className="text-sm">{model.host}</div>
                    </div>
                  </li>
                )}
              </ul>

              <div className="mt-4">
                {model.meetingLink ? (
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold"
                    style={{ background: GRADIENT, color: NAVY }}
                  >
                    Join Meeting
                  </a>
                ) : (
                  <a href="#contact" className="w-full inline-block text-center rounded-xl px-4 py-2.5 text-sm font-semibold border border-black/8">
                    Contact Organizer
                  </a>
                )}
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-black/8 bg-white p-3 shadow-sm">
              <h5 className="text-sm font-semibold text-black/80 mb-2">Previous events</h5>
              <div className="space-y-3">
                {(previousEvents.length ? previousEvents : []).slice(0, 3).map((p, idx) => (
                  <div key={p.id || idx} className="flex items-center gap-3">
                    <img src={p.thumbnailUrl || FALLBACK_IMG} alt={p.title} className="w-14 h-10 object-cover rounded-md" />
                    <div>
                      <div className="text-sm font-medium text-black">{p.title}</div>
                      <div className="text-xs text-black/60">{formatDate(p.date)}</div>
                    </div>
                  </div>
                ))}
                {previousEvents.length === 0 && <div className="text-sm text-black/60">No past events available</div>}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* LIGHTBOX */}
      {lightboxOpen && hasGallery && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onClick={closeLightbox}
        >
          <div
            ref={lightboxRef}
            tabIndex={-1}
            className="relative w-full max-w-5xl rounded-xl outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={images[lightboxIndex]} alt={`Preview ${lightboxIndex + 1}`} className="w-full max-h-[78vh] object-contain rounded-md shadow-lg" loading="eager" />

            {/* Top left caption */}
            <div className="absolute left-4 top-4 rounded-md px-3 py-1 text-sm text-white" style={{ background: "rgba(0,0,0,0.35)" }}>
              {eventTitle}
            </div>

            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 inline-flex items-center justify-center rounded-full p-2 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
              aria-label="Close preview"
            >
              <FiX />
            </button>

            {/* Prev / Next */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full p-3 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              <FiChevronLeft size={20} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              aria-label="Next image"
              className="absolute right-4 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full p-3 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              <FiChevronRight size={20} />
            </button>

            {/* Footer controls */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/40 rounded-full px-3 py-1.5">
              <span className="text-xs text-white/90">{lightboxIndex + 1} / {images.length}</span>
              <button
                onClick={() => window.open(images[lightboxIndex], "_blank", "noopener,noreferrer")}
                className="text-xs text-white/90 underline"
              >
                Open original
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
