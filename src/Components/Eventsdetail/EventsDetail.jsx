import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import {
  FiCalendar,
  FiUser,
  FiExternalLink,
  FiImage,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const NAVY = "#0d2c55";
const ACCENT_FROM = "#0fb7d4";
const ACCENT_TO = "#1ad1a3";
const GOLD = "#f4b33d";
const GRADIENT = `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_TO})`;
const API_BASE = "https://futureplanhelp.com/api/events";
const FALLBACK_IMG = "/mnt/data/A_digital_illustration_features_financial_advisors.png";

export default function EventsDetailVariantA() {
  const [eventData, setEventData] = useState(null);
  const [previousEvents, setPreviousEvents] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const heroRef = useRef(null);
  const lightboxRef = useRef(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const res = await axios.get(API_BASE);
      const events = res.data?.data || [];

      if (!events.length) {
        setLoading(false);
        return;
      }

      const latest = events[0];
      const rest = events.slice(1);

      setPreviousEvents(rest);

      const formatted = {
        title: latest.title,
        date: latest.event_date,
        description: latest.description,
        event_timezone: latest.event_timezone, // 👈 THIS LINE
        host: latest.hosted_by,
        meetingLink: latest.link,
        thumbnailUrl: latest.cover_image_id
          ? `${API_BASE}/image/${latest.cover_image_id}/blob`
          : FALLBACK_IMG,
        id: latest.id,
      };

      setEventData(formatted);

      const galleryRes = await axios.get(`${API_BASE}/${latest.id}`);
      setGalleryImages(
        (galleryRes.data?.images || []).map(
          (img) => `${API_BASE}/image/${img.id}/blob`
        )
      );
    } catch (e) {
      console.error("Event load error:", e);
    } finally {
      setLoading(false);
    }
  }

  const model = eventData;
  const images = galleryImages;
  const hasGallery = images.length > 0;

  const [topOffset, setTopOffset] = useState(null);
 
  function formatDate(input, timeZone) {
  if (!input) return "";
  const d = new Date(input);
  if (isNaN(d.getTime())) return input;

  return d.toLocaleString("en-US", {
    timeZone: timeZone || "UTC",
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}


  function isHtml(s) {
    return typeof s === "string" && /<\/?[a-z][\s\S]*>/i.test(s);
  }

  function safeHtml(html) {
    try {
      const div = document.createElement("div");
      div.innerHTML = html;
      return div.innerHTML;
    } catch {
      return html;
    }
  }

  useEffect(() => {
    function computeOffset() {
      const nav = document.getElementById("site-navbar");
      if (nav) {
        setTopOffset(nav.getBoundingClientRect().height + 12);
      } else {
        setTopOffset(72);
      }
    }
    computeOffset();
  }, []);

  const safeTop = topOffset ?? 72;

  const openLightbox = (i) => {
    if (!images.length) return;
    setLightboxIndex(i);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  };
  const nextImage = () => setLightboxIndex((i) => (i + 1) % images.length);
  const prevImage = () =>
    setLightboxIndex((i) => (i - 1 + images.length) % images.length);

  if (loading) return <div className="py-40 text-center">Loading Event…</div>;
  if (!model) return <div className="py-40 text-center text-red-500">No Event Found</div>;

  return (
    <section className="w-full" aria-labelledby="event-title" style={{ paddingTop: `${safeTop}px`, paddingBottom: 28 }}>
      {/* HERO */}
      <div ref={heroRef} className="relative w-full overflow-hidden rounded-2xl" style={{ height: "min(56vh, 520px)", maxHeight: 560 }}>
        <img src={model.thumbnailUrl} alt={model.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        <div className="absolute left-4 right-4 bottom-4 md:left-12 md:bottom-12 md:w-[46%]">
          <article className="rounded-2xl bg-white/98 px-4 py-4 shadow-[0_18px_45px_rgba(3,7,18,0.12)]">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
               <div className="inline-flex items-center gap-2 rounded-full bg-black/45 px-3 py-1 text-xs text-white">
  <FiCalendar className="opacity-80" />

  <span className="font-semibold">
    {formatDate(model.date)}
  </span>

  <span className="text-white">
    {model.event_timezone}
  </span>
</div>


                <h1 id="event-title" className="mt-2 text-sm md:text-lg font-extrabold text-white truncate">
                  {model.title}
                </h1>

                {model.host && <p className="mt-1 text-xs text-white">{model.host}</p>}
              </div>

              <div className="flex flex-col gap-2">
                {model.meetingLink && (
                  <a href={model.meetingLink} className="rounded-full px-3 py-1.5 text-sm font-semibold inline-flex items-center gap-2" style={{ background: GRADIENT, color: NAVY }}>
                    <FiExternalLink /> Join
                  </a>
                )}
                {hasGallery && (
                  <button onClick={() => openLightbox(0)} className="rounded-full px-3 py-1 text-sm bg-white">
                    View gallery
                  </button>
                )}
              </div>
            </div>
          </article>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* MAIN CONTENT */}
          <div className="lg:col-span-2 space-y-6">

            {/* ABOUT SECTION */}
            <section className="rounded-2xl bg-white p-5 border shadow-sm">
              <header className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: GRADIENT }}>
                  <FiImage className="text-white" />
                </div>
                <h2 className="text-lg font-semibold">About this event</h2>
              </header>

              <div className="prose max-w-none text-black/75">
                {isHtml(model.description) ? (
                  <div dangerouslySetInnerHTML={{ __html: safeHtml(model.description) }} />
                ) : (
                  <p>{model.description}</p>
                )}
              </div>
            </section>

            {/* GALLERY */}
            <section>
              <h3 className="text-lg font-semibold mb-3">Gallery</h3>
              {hasGallery ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {images.map((src, i) => (
                    <button key={i} onClick={() => openLightbox(i)}>
                      <img className="w-full h-40 object-cover rounded-xl" src={src} alt="" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border p-6 text-center text-black/60">
                  Gallery will appear soon.
                </div>
              )}
            </section>

          </div>

          {/* SIDEBAR */}
          <aside>
            <div className="rounded-2xl bg-white p-4 border shadow-sm sticky top-[90px]">
              <h4 className="font-semibold mb-3">Event details</h4>
              <ul className="text-sm">
                <li className="flex items-center gap-2 mb-2 text-sm text-slate-700">
  <FiCalendar className="text-slate-500" />

  <span className="font-medium">
    {formatDate(model.date)}
  </span>

  <span className="text-xs text-slate-500">
    ({model.event_timezone})
  </span>
</li>

                {model.host && (
                  <li className="flex items-center gap-3">
                    <FiUser />
                    <span>{model.host}</span>
                  </li>
                )}
              </ul>
            </div>

            <div className="mt-4 rounded-2xl bg-white p-3 shadow-sm border">
              <h5 className="text-sm font-semibold mb-2">Previous events</h5>
              {previousEvents.slice(0, 3).map((p) => (
                <div key={p.id} className="flex items-center gap-3 mb-2">
                  <img
                    src={
                      p.cover_image_id
                        ? `${API_BASE}/image/${p.cover_image_id}/blob`
                        : FALLBACK_IMG
                    }
                    alt={p.title}
                    className="w-14 h-10 object-cover rounded-md"
                  />
                  <div>
                    <div className="text-sm font-medium">{p.title}</div>
                  </div>
                </div>
              ))}
              {!previousEvents.length && <p className="text-xs text-black/60">No past events available</p>}
            </div>
          </aside>
        </div>
      </div>

      
      {/* LIGHTBOX */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex justify-center items-center p-4" onClick={closeLightbox}>
          <img src={images[lightboxIndex]} className="max-h-[80vh] rounded-lg" alt="" />

          <button className="absolute top-4 right-4 text-white text-xl" onClick={closeLightbox}>
            <FiX />
          </button>

          {images.length > 1 && (
            <>
              <button className="absolute left-4 text-white text-3xl" onClick={(e) => { e.stopPropagation(); prevImage(); }}>
                <FiChevronLeft />
              </button>

              <button className="absolute right-4 text-white text-3xl" onClick={(e) => { e.stopPropagation(); nextImage(); }}>
                <FiChevronRight />
              </button>
            </>
          )}
        </div>
      )}

    </section>
  );
}
