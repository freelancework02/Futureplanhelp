// src/components/EventsGalleryVariantA.jsx
import React, { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";

const NAVY = "#0d2c55";
const fallbackLocalImg = "/fallback-image.jpg"; // update if needed

export default function EventsGalleryVariantA() {
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [lightbox, setLightbox] = useState({ open: false, images: [], index: 0, title: "" });
  const [visibleIds, setVisibleIds] = useState(new Set());
  const observerRef = useRef(null);

  const API_BASE = "http://localhost:3000/api/galleries";

  // Fetch Data
  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const res = await axios.get(API_BASE);
        const paginatedList = res.data?.data || [];

        const detailed = await Promise.all(
          paginatedList.map(async (g) => {
            const detail = await axios.get(`${API_BASE}/${g.id}`);
            const gallery = detail.data.gallery;
            const imgs = detail.data.images || [];

            return {
              id: gallery.id,
              title: gallery.title,
              description: gallery.description,
              cover_image_id: gallery.cover_image_id,
              images: imgs.map((i) =>
                `${API_BASE}/image/${i.id}/blob`
              )
            };
          })
        );

        if (mounted) {
          setEventsData(detailed);
        }
      } catch (error) {
        console.error(error);
        if (mounted) setErr("Unable to load ERP gallery.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => (mounted = false);
  }, []);

  // Reveal animation
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-event-id");
          if (entry.isIntersecting && id) {
            setVisibleIds((prev) => new Set(prev.add(id)));
            observerRef.current.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    return () => observerRef.current.disconnect();
  }, []);

  const setCardRef = useCallback((el) => {
    if (el) observerRef.current.observe(el);
  }, []);

  // Lightbox
  const openLightbox = (imgs, index, title) => {
    setLightbox({ open: true, images: imgs, index, title });
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightbox((s) => ({ ...s, open: false }));
    document.body.style.overflow = "";
  };

  const prevImage = () =>
    setLightbox((s) => ({ ...s, index: (s.index - 1 + s.images.length) % s.images.length }));

  const nextImage = () =>
    setLightbox((s) => ({ ...s, index: (s.index + 1) % s.images.length }));

  const heroFor = (ev) => ev.images[0] || fallbackLocalImg;

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h1 className="text-center text-4xl font-bold mb-10" style={{ color: NAVY }}>
        Events — ERP Gallery
      </h1>

      {loading && <div className="text-center py-20">Loading...</div>}
      {err && <div className="text-center text-red-600 py-20">{err}</div>}

      <div className="space-y-14">
        {eventsData.map((ev) => (
          <article
            key={ev.id}
            data-event-id={ev.id}
            ref={setCardRef}
            className={`grid grid-cols-1 lg:grid-cols-3 gap-8 rounded-2xl shadow-lg transition-all ${
              visibleIds.has(String(ev.id))
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            {/* Main image */}
            <div className="lg:col-span-2 overflow-hidden bg-white rounded-2xl">
              <button onClick={() => openLightbox(ev.images, 0, ev.title)} className="block w-full">
                <img
                  src={heroFor(ev)}
                  alt={ev.title}
                  className="w-full h-72 object-cover"
                />
              </button>

              <div className="p-6">
                <h3 className="text-xl font-semibold" style={{ color: NAVY }}>
                  {ev.title}
                </h3>
                <p className="text-gray-600 mt-2">{ev.description}</p>

                {ev.images.length > 0 && (
                  <button
                    className="mt-4 px-4 py-2 rounded-lg font-medium text-white"
                    style={{ background: NAVY }}
                    onClick={() => openLightbox(ev.images, 0, ev.title)}
                  >
                    View Photos
                  </button>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            <aside>
              <div className="bg-white p-4 rounded-xl shadow-md sticky top-8">
                <div className="grid grid-cols-2 gap-3">
                  {ev.images.slice(0, 4).map((src, i) => (
                    <button key={i} onClick={() => openLightbox(ev.images, i, ev.title)}>
                      <img
                        src={src}
                        className="rounded-lg w-full h-20 object-cover"
                        alt={`thumb-${i}`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          </article>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox.open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 grid place-items-center p-6 z-50"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-4xl rounded-lg bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.images[lightbox.index]}
              className="max-h-[75vh] mx-auto object-contain"
              alt="gallery-full"
            />

            {/* Navigation */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl"
              onClick={prevImage}
            >
              ‹
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl"
              onClick={nextImage}
            >
              ›
            </button>

            <button
              className="absolute top-3 right-3 text-white text-2xl"
              onClick={closeLightbox}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
