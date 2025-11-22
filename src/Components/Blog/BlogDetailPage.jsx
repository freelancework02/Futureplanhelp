// src/components/BlogDetailVariantC1.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Contactus/Contactus";

export default function BlogDetailVariantC1() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const blog = state?.blog;

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="h-20 md:h-24" />
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
          <h2 className="text-2xl font-semibold mb-4 text-[#0d2c55]">
            Blog Not Found
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-6 py-2 rounded-full text-white font-semibold"
            style={{
              background: "linear-gradient(90deg,#0fb7d4,#1ad1a3)",
            }}
          >
            Go Back
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  /* Format content */
  const formatted = (blog.content || "")
    .split("\n")
    .filter((line) => line.trim() !== "");

  const NAVY = "#0d2c55";
  const ACCENT_FROM = "#0fb7d4";
  const ACCENT_TO = "#1ad1a3";
  const GOLD = "#f4b33d";

  return (
    <div className="min-h-screen flex flex-col bg-[#f6fbfa]">
      <Navbar />
      <div className="h-20 md:h-24" />

      {/* ------------------ HERO ------------------ */}
      <header className="relative w-full">
        <div className="relative h-[48vw] max-h-[560px] w-full overflow-hidden rounded-b-3xl shadow-xl">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
        </div>

        {/* Floating Card */}
        <div className="max-w-6xl mx-auto px-4 md:px-6 -mt-20 relative">
          <div
            className="rounded-3xl bg-white backdrop-blur-sm border shadow-xl p-6 md:p-8"
            style={{
              borderColor: "rgba(13,44,85,0.08)",
              boxShadow: "0 22px 50px rgba(13,44,85,0.15)",
            }}
          >
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
              <div className="flex-1">
                <span
                  className="inline-flex px-3 py-1 rounded-full text-xs font-semibold text-white"
                  style={{ background: "rgba(0,0,0,0.4)" }}
                >
                  {new Date(blog.publishedAt).toLocaleDateString()}
                </span>

                <h1
                  className="mt-3 font-extrabold leading-tight"
                  style={{ color: NAVY, fontSize: "1.8rem" }}
                >
                  {blog.title}
                </h1>

                <p className="mt-2 text-sm text-[#4b6a78]">
                  By {blog.author || "Team Future We Secure"}
                </p>

                <p className="mt-4 text-base leading-relaxed text-[#20333f]">
                  {blog.summary ||
                    "A carefully crafted article designed to deliver clarity and insight on financial well-being."}
                </p>
              </div>

              {/* Right-side CTA */}
              <div className="flex-shrink-0 flex flex-col gap-3">
                <button
                  onClick={() => navigate("/blog")}
                  className="px-5 py-2 rounded-full text-sm font-semibold text-white transition"
                  style={{
                    background: `linear-gradient(90deg,${ACCENT_FROM},${ACCENT_TO})`,
                    boxShadow: "0 10px 30px rgba(15,183,212,0.15)",
                  }}
                >
                  Back to Blogs
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ------------------ CONTENT ------------------ */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* IMAGE / LEFT BLOCK */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-[#0d2c5515]">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* MAIN TEXT */}
          <article className="lg:col-span-2 space-y-6 text-[#20333f] leading-relaxed text-[17px]">
            {formatted.map((line, index) => {
              const isList =
                line.trim().match(/^[-*•]/) ||
                line.trim().match(/^\d+\.\s/);

              if (isList) {
                return (
                  <p
                    key={index}
                    className="pl-5 relative"
                    style={{
                      lineHeight: "1.7",
                    }}
                  >
                    {line}
                  </p>
                );
              }

              return (
                <p
                  key={index}
                  style={{
                    lineHeight: "1.9",
                  }}
                >
                  {line}
                </p>
              );
            })}
          </article>
        </div>

        {/* Divider */}
        <div
          className="w-full h-[1px] my-12"
          style={{
            background:
              "linear-gradient(90deg,transparent,#f4b33d60,transparent)",
          }}
        />

        {/* ------------------ CTA SECTION ------------------ */}
        <div
          className="rounded-3xl p-10 text-center bg-white border shadow-xl"
          style={{
            borderColor: "rgba(13,44,85,0.08)",
            boxShadow: "0 18px 50px rgba(13,44,85,0.1)",
          }}
        >
          <h3
            className="text-2xl font-bold"
            style={{ color: NAVY }}
          >
            Want More Expert Insights?
          </h3>
          <p className="mt-3 text-[#4b6a78] max-w-2xl mx-auto">
            Explore strategies, financial literacy breakdowns, and practical guides to help you plan a stronger future.
          </p>

          <button
            onClick={() => navigate("/blog")}
            className="mt-6 px-7 py-3 rounded-full text-sm font-semibold text-white"
            style={{
              background: `linear-gradient(90deg,${ACCENT_FROM},${ACCENT_TO})`,
              boxShadow: "0 12px 40px rgba(15,183,212,0.15)",
            }}
          >
            Browse All Blogs
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
