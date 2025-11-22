// src/components/BlogVariantB.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Components/Firebase/firebase";
import { useNavigate } from "react-router-dom";

/**
 * BlogVariantB — refreshed (logo-matched palette)
 *
 * - Brand tokens (matched to your logo):
 *   NAVY       : #0d2c55
 *   ACCENT_FROM: #0fb7d4
 *   ACCENT_TO  : #1ad1a3
 *   GOLD       : #f4b33d
 *
 * - Improvements:
 *   • Featured hero post at top + responsive 3-column masonry beneath
 *   • Stronger visual hierarchy (big image, overlay caption)
 *   • Gradient accent, subtle glass card, micro-interactions
 *   • Accessible buttons and clearer CTA hierarchy
 *   • Local fallback image used when a post image is missing:
 *     "/mnt/data/A_digital_illustration_features_financial_advisors.png"
 *
 * Drop this file into src/components and import where needed.
 */

const NAVY = "#0d2c55";
const ACCENT_FROM = "#0fb7d4";
const ACCENT_TO = "#1ad1a3";
const GOLD = "#f4b33d";

// Developer note: use the session-local asset path (it will be transformed by your build system).
const FALLBACK_IMG = "/mnt/data/A_digital_illustration_features_financial_advisors.png";

export default function BlogVariantB() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    const loadBlogs = async () => {
      try {
        const q = await getDocs(collection(db, "blogs"));
        const items = q.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        // prefer newer items first if there's a date field
        items.sort((a, b) => {
          const da = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
          const dbt = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
          return dbt - da;
        });
        if (mounted) setBlogs(items);
      } catch (e) {
        console.error("Failed to load blogs", e);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    loadBlogs();
    return () => {
      mounted = false;
    };
  }, []);

  // helper: short excerpt
  const excerpt = (b, n = 140) => {
    if (!b) return "";
    if (b.summary) return b.summary.length > n ? b.summary.slice(0, n).trim() + "…" : b.summary;
    const text = (b.content || "").replace(/<\/?[^>]+(>|$)/g, "");
    return text.length > n ? text.slice(0, n).trim() + "…" : text;
  };

  // helper: format date
  const fmt = (d) => {
    if (!d) return "";
    const dt = new Date(d);
    if (isNaN(dt.getTime())) return d;
    return dt.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  };

  return (
    <section className="mt-16 md:mt-20">
      <div className="max-w-7xl mt-16 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div
            className="inline-flex items-center gap-3 px-4 py-1 rounded-full mb-4"
            style={{
              background: "white",
              border: `1px solid rgba(13,44,85,0.04)`,
              boxShadow: "0 6px 20px rgba(13,44,85,0.04)",
            }}
          >
            {/* <span
              className="w-3 h-3 rounded-full inline-block"
              style={{ background: `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_TO})` }}
            />
            <span className="text-sm font-medium" style={{ color: NAVY }}>
              Thought Leadership
            </span> */}
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: NAVY }}>
            Blog & Insights
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Curated perspectives on planning, investing, protection and building a secure future.
          </p>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-2xl bg-gray-100 h-64" />
            ))}
          </div>
        )}

        {/* Content */}
        {!loading && (
          <>
            {/* Featured hero (first post) */}
            {blogs.length > 0 && (
              <article
                className="relative mb-10 rounded-3xl overflow-hidden shadow-[0_18px_60px_rgba(13,44,85,0.06)]"
                style={{ border: "1px solid rgba(13,44,85,0.04)" }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <button
                    onClick={() => navigate(`/blog/${blogs[0].id}`, { state: { blog: blogs[0] } })}
                    className="group block w-full text-left"
                    aria-label={blogs[0].title}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="relative h-72 md:h-[420px] lg:h-full w-full overflow-hidden bg-gray-50">
                      <img
                        src={blogs[0].image || FALLBACK_IMG}
                        alt={blogs[0].title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        loading="eager"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      <div className="absolute left-6 bottom-6 md:left-10 md:bottom-10 max-w-[85%]">
                        <div className="inline-flex items-center gap-3 mb-3">
                          <span
                            className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold"
                            style={{ background: `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_TO})`, color: NAVY }}
                          >
                            Featured
                          </span>
                          <span className="text-xs text-white/90">{fmt(blogs[0].publishedAt)}</span>
                        </div>

                        <h3 className="text-white text-2xl md:text-3xl font-bold leading-tight drop-shadow">
                          {blogs[0].title}
                        </h3>
                        <p className="mt-2 text-sm text-white/90 hidden md:block drop-shadow">{excerpt(blogs[0], 200)}</p>
                      </div>
                    </div>
                  </button>

                  <div className="p-6 md:p-8 flex flex-col justify-between bg-white">
                    <div>
                      <div className="mb-3">
                        <div className="text-sm text-slate-500">{blogs[0].author || "Team"}</div>
                        <h4 className="text-xl font-semibold mt-2" style={{ color: NAVY }}>
                          {blogs[0].title}
                        </h4>
                        <p className="text-sm text-slate-600 mt-3">{excerpt(blogs[0], 220)}</p>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-3">
                        {(blogs[0].tags || []).slice(0, 4).map((t, i) => (
                          <span
                            key={i}
                            className="text-xs font-medium px-3 py-1 rounded-full"
                            style={{
                              background: "rgba(13,44,85,0.04)",
                              color: NAVY,
                              border: `1px solid rgba(13,44,85,0.03)`,
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 flex items-center gap-3">
                      <button
                        onClick={() => navigate(`/blog/${blogs[0].id}`, { state: { blog: blogs[0] } })}
                        className="inline-flex items-center gap-2 rounded-xl px-4 py-2 font-semibold shadow"
                        style={{
                          background: `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
                          color: NAVY,
                        }}
                      >
                        Read full post
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path d="M5 12h12M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>

                      {/* <a
                        href="#subscribe"
                        onClick={(e) => e.preventDefault()}
                        className="text-sm text-slate-600 underline"
                      >
                        Subscribe
                      </a> */}
                    </div>
                  </div>
                </div>
              </article>
            )}

            {/* Masonry / grid for remaining posts */}
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
              {blogs.slice(1).map((blog) => (
                <article
                  key={blog.id}
                  className="group relative rounded-2xl overflow-hidden bg-white border border-[rgba(13,44,85,0.04)] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
                >
                  <button
                    onClick={() => navigate(`/blog/${blog.id}`, { state: { blog } })}
                    className="block text-left w-full"
                    aria-label={blog.title}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={blog.image || FALLBACK_IMG}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                      <div className="absolute left-4 bottom-4 right-4">
                        <h3 className="text-white text-lg font-semibold drop-shadow">{blog.title}</h3>
                        <div className="mt-2 flex items-center gap-3">
                          <span className="inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-semibold" style={{ background: "rgba(255,255,255,0.92)", color: NAVY }}>
                            {blog.author || "Team"}
                          </span>
                          <span className="text-xs text-white/90 hidden sm:inline">{fmt(blog.publishedAt)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-5">
                      <p className="text-sm text-slate-700 mb-4">{excerpt(blog)}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {(blog.tags || []).slice(0, 2).map((t, i) => (
                            <span key={i} className="text-xs px-2 py-1 rounded-full" style={{ background: "rgba(13,44,85,0.03)", color: NAVY }}>
                              {t}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/blog/${blog.id}`, { state: { blog } });
                            }}
                            className="inline-flex items-center gap-2 text-sm font-semibold"
                            style={{
                              background: `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
                              color: NAVY,
                              padding: "8px 12px",
                              borderRadius: 12,
                            }}
                          >
                            Read → 
                          </button>
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* accent bar */}
                  <div
                    className="absolute bottom-0 left-0 w-full h-1"
                    style={{ background: `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_TO})` }}
                  />
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
