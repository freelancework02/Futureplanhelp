// src/components/ContactSection.jsx
import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Mail, Phone, Calendar, ShieldCheck, MapPin } from "lucide-react";
import emailjs from "emailjs-com";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../../assets/Logo/logo.png"
import Herosection from "../../assets/hero.png"

/**
 * ContactSection — brand refresh
 * - Color system aligned with your logo:
 *   NAVY       : #0d2c55
 *   ACCENT_FROM: #0fb7d4 (teal-blue)
 *   ACCENT_TO  : #1ad1a3 (lime-teal)
 *   GOLD       : #f4b33d
 *
 * - Layout changes:
 *   • Two-column layout with left: form (white card), right: contact options + brand panel.
 *   • Stronger visual hierarchy, cleaner spacing, accessible focus states.
 *   • Inputs use teal focus ring; primary CTAs use teal→green gradient; secondary CTAs use navy/gold accents.
 *
 * - Asset note:
 *   The FAQ/visual image uses the local session-generated asset path below. The dev environment
 *   will transform the local path into a usable URL for your app when you build/deploy.
 */
const ContactSection = () => {
  // brand tokens
  const NAVY = "#0d2c55";
  const ACCENT_FROM = "#0fb7d4";
  const ACCENT_TO = "#1ad1a3";
  const GOLD = "#f4b33d";
  const TEXT = "#082033";

  // local image generated during this session (developer will map the path to a URL)
  const faqImgPath = "/mnt/data/A_digital_illustration_features_financial_advisors.png";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    company: "", // honeypot
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = "Please enter your full name (at least 2 characters).";
    }
    const email = String(formData.email || "").trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
    if (!emailOk) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.message || formData.message.trim().length < 12) {
      newErrors.message = "Tell us a bit more (at least 12 characters).";
    }
    if (formData.company && formData.company.trim().length > 0) {
      newErrors.company = "Spam detected.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) =>
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const templateParams = {
      from_name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    emailjs
      .send(
        "service_o49f57q",
        "template_zueof2i",
        templateParams,
        "_NCXgVXdplNNFVAvR"
      )
      .then(
        () => {
          toast.success("🎉 Thanks! Your message has been sent.");
          setFormData({ name: "", email: "", message: "", company: "" });
          setErrors({});
        },
        (error) => {
          console.error(error);
          toast.error("❌ Could not send your message. Please try again.");
        }
      )
      .finally(() => setIsSubmitting(false));
  };

  return (
    <section
      className="relative overflow-hidden"
      aria-labelledby="contact-heading"
      style={{
        background:
          `radial-gradient(900px 340px at 12% -10%, rgba(15,183,212,0.06), transparent 40%), ` +
          `linear-gradient(180deg, ${NAVY}, #071428 55%)`,
      }}
    >
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Accent texture (subtle) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1.6px), radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1.6px)",
          backgroundSize: "28px 28px",
          backgroundPosition: "0 0, 14px 14px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
        {/* header */}
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full text-sm font-semibold"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "white",
            }}
          >
            <ShieldCheck size={16} style={{ color: ACCENT_FROM }} />
            We reply within 24 hours
          </div>

          <h2
            id="contact-heading"
            className="mt-6 text-3xl md:text-4xl font-extrabold text-white"
          >
            Let’s talk about your goals
          </h2>

          <p className="mt-3 text-white/80 max-w-2xl mx-auto">
            Send a message, chat on WhatsApp, or book a quick call—whatever works best for you.
          </p>
        </div>

        {/* main grid */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* left: form card */}
          <div
            className="rounded-2xl p-6 md:p-8"
            style={{
              background: "linear-gradient(180deg, #ffffff 0%, #f7fbfa 100%)",
              border: "1px solid rgba(13,44,85,0.06)",
              boxShadow: "0 20px 60px -30px rgba(13,44,85,0.28)",
            }}
          >
            <h3 style={{ color: NAVY }} className="text-xl md:text-2xl font-bold mb-1 text-center">
              Contact Us
            </h3>
            <p className="text-center text-slate-600 mb-6">
              We'll get back to you quickly with clear next steps.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate aria-describedby="form-errors">
              {/* honeypot */}
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Full name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Jane Doe"
                  value={formData.name}
                  onChange={handleChange}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className="w-full p-3 rounded-lg border transition focus:outline-none"
                  style={{
                    borderColor: errors.name ? "#fca5a5" : "rgba(13,44,85,0.08)",
                    boxShadow: errors.name ? "0 6px 20px rgba(244,114,114,0.08)" : "none",
                    outline: "none",
                  }}
                  onFocus={(e) => (e.currentTarget.style.boxShadow = `0 6px 20px ${ACCENT_FROM}22`)}
                  onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                />
                {errors.name && (
                  <p id="name-error" className="text-sm mt-1" style={{ color: "#dc2626" }}>
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className="w-full p-3 rounded-lg border transition focus:outline-none"
                  style={{
                    borderColor: errors.email ? "#fca5a5" : "rgba(13,44,85,0.08)",
                    outline: "none",
                  }}
                  onFocus={(e) => (e.currentTarget.style.boxShadow = `0 6px 20px ${ACCENT_FROM}22`)}
                  onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                />
                {errors.email && (
                  <p id="email-error" className="text-sm mt-1" style={{ color: "#dc2626" }}>
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="How can we help?"
                  value={formData.message}
                  onChange={handleChange}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className="w-full p-3 rounded-lg border min-h-[140px] transition focus:outline-none resize-y"
                  style={{
                    borderColor: errors.message ? "#fca5a5" : "rgba(13,44,85,0.08)",
                    outline: "none",
                  }}
                  onFocus={(e) => (e.currentTarget.style.boxShadow = `0 6px 20px ${ACCENT_FROM}22`)}
                  onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                />
                {errors.message && (
                  <p id="message-error" className="text-sm mt-1" style={{ color: "#dc2626" }}>
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                className="w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-3 transition-transform"
                style={{
                  background: isSubmitting ? "linear-gradient(90deg,#9adbd6,#bff0db)" : `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
                  color: NAVY,
                  boxShadow: isSubmitting ? "none" : "0 12px 36px rgba(15,183,212,0.14)",
                }}
              >
                {isSubmitting ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/60 border-t-white" />
                    Sending…
                  </>
                ) : (
                  "Send Message"
                )}
              </button>

              <p id="form-errors" className="text-xs text-slate-500 text-center mt-2">
                We respect your privacy. We’ll never share your details.
              </p>
            </form>
          </div>

          {/* right: contact options + brand panel */}
          <aside className="space-y-6">
            {/* contact methods card */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: `linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))`,
                border: "1px solid rgba(255,255,255,0.06)",
                backdropFilter: "blur(6px)",
              }}
            >
              <p className="text-lg font-semibold mb-4 text-white">Prefer a quick conversation?</p>

              <div className="grid sm:grid-cols-2 gap-3 mb-4">
                <a
                  href="mailto:Info@futurewesecure.com"
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 transition text-white"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  <Mail size={18} />
                  Email Us
                </a>

                <a
                  href="tel:+1516-917-0756"
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 transition text-white"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  <Phone size={18} />
                  Call Us
                </a>
              </div>

              <a
                href="https://api.whatsapp.com/send?phone=15165818909&text=Hello!"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-3 rounded-xl px-4 py-3 text-white font-semibold mb-3"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
                  boxShadow: "0 10px 30px rgba(15,183,212,0.14)",
                }}
              >
                <FaWhatsapp className="w-5 h-5" />
                Message us on WhatsApp
              </a>

              <button
                onClick={() =>
                  window.Calendly?.initPopupWidget?.({
                    url: "https://calendly.com/jigneshcc2905/30min",
                  })
                }
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold border"
                style={{
                  background: "white",
                  color: NAVY,
                  border: "1px solid rgba(13,44,85,0.06)",
                }}
              >
                <Calendar size={18} />
                Book a Call
              </button>
            </div>

            {/* brand panel */}
            <div
              className="rounded-2xl p-6 flex items-start gap-4"
              style={{
                background: `linear-gradient(180deg, ${NAVY}, rgba(13,44,85,0.92))`,
                color: "white",
                border: "1px solid rgba(13,44,85,0.05)",
                boxShadow: "0 20px 50px -20px rgba(13,44,85,0.32)",
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 12,
                  display: "grid",
                  placeItems: "center",
                  background: "white",
                  flexShrink: 0,
                }}
              >
                <img
                  src={Logo}
                  alt="brand"
                  style={{ width: 54, height: 54, objectFit: "contain", borderRadius: 10 }}
                />
              </div>

              <div>
                <h4 className="text-lg font-bold" style={{ color: "white" }}>
                  Future Plan Help
                </h4>
                <p className="text-white/90 mb-3">📞 516-917-0756</p>
                <p className="text-white/90">📧 Info@futurewesecure.com</p>

                <div className="flex items-center gap-2 mt-3 text-white/80">
                  <MapPin size={16} />
                  <span>Mount Airy, MD</span>
                </div>
              </div>
            </div>

            {/* visual badge panel */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                border: "1px solid rgba(13,44,85,0.04)",
                background: "white",
                boxShadow: "0 14px 40px -18px rgba(13,44,85,0.06)",
              }}
            >
              <div style={{ height: 200, overflow: "hidden" }}>
                <img
                  src={Herosection}
                  alt="Advisors reviewing charts"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="p-4">
                <div style={{ fontWeight: 700, color: NAVY }}>Trusted by 1,200+ families</div>
                <div style={{ color: "#64748b", marginTop: 4 }}>Real guidance. Real clarity. Real results.</div>
              </div>
            </div>
          </aside>
        </div>

        {/* footer */}
        <div className="mt-12 text-center text-white/70 text-sm border-t border-white/10 pt-6">
          © {new Date().getFullYear()} Future We Secure. All Rights Reserved.
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
