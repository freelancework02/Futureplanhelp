// src/components/BlogVariantB.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NAVY = "#0d2c55";
const ACCENT_FROM = "#0fb7d4";
const ACCENT_TO = "#1ad1a3";
const FALLBACK_IMG = "/mnt/data/A_digital_illustration_features_financial_advisors.png";

const API_BASE = "https://futureplanhelp.com/api/blogs";

export default function BlogVariantB() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const loadBlogs = async () => {
      try {
        const res = await axios.get(API_BASE);
        const list = res.data?.data || [];

        const detailed = await Promise.all(
          list.map(async (b) => {
            const d = await axios.get(`${API_BASE}/${b.id}`);
            const blog = d.data.blog;
            const imgs = d.data.images || [];

            const cover =
              blog.cover_image_id
                ? `${API_BASE}/image/${blog.cover_image_id}/blob`
                : imgs.length
                ? `${API_BASE}/image/${imgs[0].id}/blob`
                : FALLBACK_IMG;

            return {
              id: blog.id,
              title: blog.title,
              excerpt: blog.excerpt,
              author: "Team",
              publishedAt: blog.created_at,
              tags: [],
              image: cover,
              images: imgs.map((i) => `${API_BASE}/image/${i.id}/blob`),
            };
          })
        );

        if (mounted) setBlogs(detailed);
      } catch (err) {
        console.error("Error loading blogs:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadBlogs();
    return () => (mounted = false);
  }, []);

  const excerpt = (b, n = 140) =>
    b?.excerpt && b.excerpt.length > n
      ? b.excerpt.slice(0, n).trim() + "…"
      : b?.excerpt || "";

  const fmt = (d) =>
    d ? new Date(d).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" }) : "";

  return (
    <section className="mt-16 md:mt-20">
      <div className="max-w-7xl mt-16 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
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
            {/* Featured Blog */}
            {blogs.length > 0 && (
              <article
                className="relative mb-10 rounded-3xl overflow-hidden shadow-[0_18px_60px_rgba(13,44,85,0.06)]"
                style={{ border: "1px solid rgba(13,44,85,0.04)" }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <button
                    onClick={() => navigate(`/blog/${blogs[0].id}`, { state: { blog: blogs[0] } })}
                    className="group block w-full text-left"
                  >
                    <div className="relative h-72 md:h-[420px] lg:h-full w-full overflow-hidden bg-gray-50">
                      <img
                        src={blogs[0].image || FALLBACK_IMG}
                        alt={blogs[0].title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        loading="eager"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute left-6 bottom-6 md:left-10 md:bottom-10 max-w-[85%]">
                        <span
                          className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold"
                          style={{ background: `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_FROM})`, color: NAVY }}
                        >
                          Featured
                        </span>
                        <h3 className="text-white text-2xl md:text-3xl font-bold mt-2">
                          {blogs[0].title}
                        </h3>
                        <p className="mt-2 text-sm text-white/90 hidden md:block">
                          {excerpt(blogs[0], 200)}
                        </p>
                      </div>
                    </div>
                  </button>

                  <div className="p-6 md:p-8 bg-white flex flex-col justify-between">
                    <h4 className="text-xl font-semibold" style={{ color: NAVY }}>
                      {blogs[0].title}
                    </h4>
                    <p className="text-sm text-slate-600 mt-3">{excerpt(blogs[0], 220)}</p>
                    <span className="text-xs text-slate-500 mt-3">{fmt(blogs[0].publishedAt)}</span>

                    <button
                      onClick={() => navigate(`/blog/${blogs[0].id}`, { state: { blog: blogs[0] } })}
                      className="mt-6 inline-flex items-center gap-2 rounded-xl px-4 py-2 font-semibold shadow"
                      style={{
                        background: `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
                        color: NAVY,
                      }}
                    >
                      Read full post →
                    </button>
                  </div>
                </div>
              </article>
            )}

            {/* Remaining blog grid */}
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
              {blogs.slice(1).map((b) => (
                <article
                  key={b.id}
                  className="group relative rounded-2xl overflow-hidden bg-white border border-[rgba(13,44,85,0.04)] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
                >
                  <button
                    onClick={() => navigate(`/blog/${b.id}`, { state: { blog: b } })}
                    className="block text-left w-full"
                  >
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={b.image || FALLBACK_IMG}
                        alt={b.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    <div className="p-5">
                      <h3 className="text-lg font-semibold" style={{ color: NAVY }}>
                        {b.title}
                      </h3>
                      <p className="text-sm text-slate-700 mt-3">{excerpt(b)}</p>
                      <p className="text-xs text-slate-500 mt-4">{fmt(b.publishedAt)}</p>

                      <button
                        className="mt-4 underline text-sm font-semibold"
                        style={{ color: NAVY }}
                      >
                        Read →
                      </button>
                    </div>
                  </button>
                </article>
              ))}
            </div>
          </>
        )}

        {!loading && blogs.length === 0 && (
          <div className="text-center py-20 text-slate-500">No blogs found.</div>
        )}
      </div>
    </section>
  );
}
