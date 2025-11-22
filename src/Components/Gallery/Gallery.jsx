// src/components/EventsGalleryVariantA.jsx
import React, { useEffect, useState, useCallback, useRef } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";

/* --------------------- Firebase (unchanged) --------------------- */
const firebaseConfig = {
  apiKey: "AIzaSyBg2p1nPZQ39AU91CDzRWeYtQjBs5HHf-Y",
  authDomain: "ajazgraphic-da740.firebaseapp.com",
  projectId: "ajazgraphic-da740",
  storageBucket: "ajazgraphic-da740.appspot.com",
  messagingSenderId: "600209988666",
  appId: "1:600209988666:web:d806f6d7dfd10fa394a903",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * EventsGalleryVariantA — Apple-style Elegance
 * - Soft palette, airy spacing, 32px rounded cards
 * - Gentle parallax/scale on hero images, soft shadows
 * - Sticky side info, large whitespace, refined typography
 * - Uses session-local fallback image path for missing media:
 *   "/mnt/data/A_digital_illustration_features_financial_advisors.png"
 */

const NAVY = "#0d2c55";
const ACCENT_FROM = "#0fb7d4";
const ACCENT_TO = "#1ad1a3";
const GOLD = "#f4b33d";

const fallbackLocalImg = "/mnt/data/A_digital_illustration_features_financial_advisors.png";

export default function EventsGalleryVariantA() {
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [lightbox, setLightbox] = useState({ open: false, images: [], index: 0, title: "" });
  const [visibleIds, setVisibleIds] = useState(new Set());
  const observerRef = useRef(null);

  // fetch
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const qs = await getDocs(collection(db, "properedgefinance"));
        const events = qs.docs.map((doc) => ({ id: Number.isNaN(parseInt(doc.id, 10)) ? doc.id : parseInt(doc.id, 10), ...doc.data() }));
        events.sort((a, b) => {
          const an = typeof a.id === "number";
          const bn = typeof b.id === "number";
          if (an && bn) return b.id - a.id;
          return String(b.id).localeCompare(String(a.id));
        });
        if (mounted) setEventsData(events);
      } catch (e) {
        console.error(e);
        if (mounted) setErr("Unable to load gallery — try again later.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // observer for reveal
  useEffect(() => {
    if (typeof window === "undefined") return;
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-event-id");
          if (!id) return;
          if (entry.isIntersecting) {
            setVisibleIds((s) => {
              if (s.has(id)) return s;
              const next = new Set(s);
              next.add(id);
              return next;
            });
            observerRef.current.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );
    return () => observerRef.current?.disconnect?.();
  }, []);

  const setCardRef = useCallback((el) => {
    if (!el) return;
    const id = el.getAttribute("data-event-id");
    if (!id) return;
    observerRef.current && observerRef.current.observe(el);
  }, []);

  // lightbox controls
  const openLightbox = useCallback((images = [], index = 0, title = "") => {
    const imgs = Array.isArray(images) && images.length ? images : [];
    if (!imgs.length) return;
    setLightbox({ open: true, images: imgs, index: Math.min(index, imgs.length - 1), title });
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox((s) => ({ ...s, open: false }));
    document.body.style.overflow = "";
  }, []);

  const prevImage = useCallback(() => {
    setLightbox((s) => ({ ...s, index: (s.index - 1 + s.images.length) % s.images.length }));
  }, []);

  const nextImage = useCallback(() => {
    setLightbox((s) => ({ ...s, index: (s.index + 1) % s.images.length }));
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (!lightbox.open) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox.open, closeLightbox, prevImage, nextImage]);

  const heroFor = (ev) => {
    if (Array.isArray(ev.images) && ev.images.length) return ev.images[0];
    if (ev.thumbnail) return ev.thumbnail;
    if (ev.image) return ev.image;
    return fallbackLocalImg;
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 mt-16">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold" style={{ color: NAVY }}>
          Events — Elegant Magazine
        </h1>
        <p className="mt-3 text-slate-600">
          Minimal, airy layout — large photography, soft motion, and refined CTAs.
        </p>
      </div>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-64 rounded-3xl bg-gray-100 animate-pulse" />
          ))}
        </div>
      )}

      {!loading && err && <div className="text-center py-20 text-slate-700">{err}</div>}

      <div className="space-y-14">
        {!loading &&
          eventsData.map((ev) => {
            const hero = heroFor(ev);
            const images = Array.isArray(ev.images) ? ev.images : hero ? [hero] : [];
            const visible = visibleIds.has(String(ev.id));
            return (
              <article
                key={ev.id}
                data-event-id={String(ev.id)}
                ref={setCardRef}
                className={`grid grid-cols-1 lg:grid-cols-3 gap-8 items-start rounded-3xl transition-all transform ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transition: "opacity .6s ease, transform .6s cubic-bezier(.2,.9,.2,1)" }}
              >
                {/* hero column */}
                <div className="lg:col-span-2 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(13,44,85,0.06)] bg-white">
                  <button
                    onClick={() => openLightbox(images, 0, ev.title || `Event ${ev.id}`)}
                    className="group block w-full text-left"
                    aria-label={`Open gallery for ${ev.title || `Event ${ev.id}`}`}
                  >
                    <div className="relative h-72 md:h-[460px] overflow-hidden bg-gray-50">
                      <img
                        src={hero}
                        alt={ev.title || ""}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        loading="lazy"
                      />

                      {/* subtle parallax layer */}
                      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, transparent, rgba(8,20,35,0.35))" }} />

                      <div className="absolute left-6 bottom-6">
                        <h3 className="text-white text-2xl font-semibold drop-shadow-lg">{ev.title}</h3>
                        <p className="text-white/90 mt-2 hidden md:block">{ev.subtitle || (ev.description ? String(ev.description).slice(0, 140) + "…" : "")}</p>
                      </div>
                    </div>
                  </button>

                  <div className="p-6 md:p-8">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h4 className="text-lg font-semibold" style={{ color: NAVY }}>{ev.title}</h4>
                        <p className="text-slate-600 mt-2">{ev.subtitle || (ev.description ? String(ev.description).slice(0, 250) + "…" : "")}</p>
                      </div>

                      <div className="text-right">
                        <div className="text-sm font-semibold" style={{ color: GOLD }}>{ev.date || ""}</div>
                        <div className="text-xs text-slate-500 mt-1">{ev.location || ""}</div>
                      </div>
                    </div>

                    <div className="mt-6 flex gap-3">
                      <button
                        onClick={() => openLightbox(images, 0, ev.title)}
                        className="px-4 py-2 rounded-xl text-sm font-semibold shadow"
                        style={{ background: NAVY, color: "white" }}
                      >
                        View photos
                      </button>

                      {/* <a
                        href={ev.meetingLink || "#"}
                        onClick={(e) => {
                          if (!ev.meetingLink) e.preventDefault();
                        }}
                        className="px-4 py-2 rounded-xl text-sm font-medium border"
                        style={{ borderColor: "rgba(13,44,85,0.06)", color: NAVY }}
                      >
                        {ev.meetingLink ? "Join meeting" : "More info"}
                      </a> */}
                    </div>
                  </div>
                </div>

                {/* right side previews (sticky on large screens) */}
                <aside className="relative">
                  <div className="sticky top-8 space-y-4">
                    <div className="rounded-2xl p-4 bg-white border border-slate-100 shadow-sm">
                      <h5 className="text-sm font-semibold" style={{ color: NAVY }}>{ev.title}</h5>
                      <p className="text-xs text-slate-600 mt-2">{ev.subtitle || "Event details"}</p>
                      <div className="mt-3 grid grid-cols-2 gap-3">
                        {images.slice(0, 4).map((src, i) => (
                          <button
                            key={i}
                            onClick={() => openLightbox(images, i, ev.title)}
                            className="rounded-xl overflow-hidden block"
                            aria-label={`Open image ${i + 1}`}
                          >
                            <div className="aspect-[4/3] w-full bg-gray-100">
                              <img src={src || fallbackLocalImg} alt={`preview ${i + 1}`} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" loading="lazy" />
                            </div>
                          </button>
                        ))}
                      </div>

                      <div className="mt-4">
                        <button
                          onClick={() => openLightbox(images, 0, ev.title)}
                          className="w-full px-3 py-2 rounded-xl text-sm font-semibold"
                          style={{ background: `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_TO})`, color: NAVY }}
                        >
                          Open gallery
                        </button>
                      </div>
                    </div>

                    <div className="rounded-2xl p-4 bg-white border border-slate-100 shadow-sm text-sm">
                      <div style={{ color: NAVY, fontWeight: 700 }}>Want a private walkthrough?</div>
                      <div className="text-xs text-slate-600 mt-2">Book a short call and we’ll show you highlights.</div>
                      <div className="mt-3">
                        <button onClick={() => window.open("https://calendly.com/jigneshcc2905/30min", "_blank")} className="w-full px-3 py-2 rounded-xl" style={{ background: NAVY, color: "white" }}>
                          Book a call
                        </button>
                      </div>
                    </div>
                  </div>
                </aside>
              </article>
            );
          })}
      </div>

      {/* Lightbox */}
      {lightbox.open && (
        <div className="fixed inset-0 z-[1200] grid place-items-center p-4" onClick={closeLightbox} role="dialog" aria-modal="true">
          <div className="relative w-full max-w-4xl rounded-3xl overflow-hidden bg-white" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <div className="text-sm font-semibold" style={{ color: NAVY }}>{lightbox.title}</div>
              <div className="flex items-center gap-3">
                <div className="px-3 py-1 text-xs rounded-md" style={{ background: `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_TO})`, color: NAVY }}>
                  {lightbox.index + 1}/{lightbox.images.length}
                </div>
                <button onClick={closeLightbox} className="p-2 rounded hover:bg-gray-100">✕</button>
              </div>
            </div>

            <div className="bg-black flex items-center justify-center" style={{ minHeight: "60vh", maxHeight: "78vh" }}>
              <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-6 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow">‹</button>

              <img src={lightbox.images[lightbox.index] || fallbackLocalImg} alt={`slide ${lightbox.index + 1}`} className="max-h-[78vh] w-auto object-contain" />

              <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-6 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow">›</button>
            </div>

            <div className="bg-white border-t px-4 py-3 overflow-x-auto">
              <div className="flex items-center gap-3">
                {lightbox.images.map((src, i) => (
                  <button key={i} onClick={(e) => { e.stopPropagation(); setLightbox((s) => ({ ...s, index: i })); }} className={`rounded-lg overflow-hidden ${i === lightbox.index ? "ring-2 ring-offset-2 ring-[rgba(15,183,212,0.12)]" : ""}`} style={{ minWidth: 92 }}>
                    <div className="aspect-[4/3] w-24">
                      <img src={src || fallbackLocalImg} alt={`thumb ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
