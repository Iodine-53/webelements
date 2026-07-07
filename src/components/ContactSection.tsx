import React, { useState } from "react";
import { motion } from "motion/react";
import { Send, CheckCircle2, Mail, MessageSquare, MapPin, ArrowRight, ShoppingBag } from "lucide-react";
import fiverrIcon from "../assets/images/fiverr_icon.svg";

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setStatus("submitting");

    const emailSubject = encodeURIComponent(`[Portfolio Inquiry] ${formState.name}`);
    const emailBody = encodeURIComponent(
      `Hello,\n\nI would like to inquire about a project:\n\n` +
      `Name: ${formState.name}\n` +
      `Email: ${formState.email}\n` +
      
      `Inquiry Brief & Goals:\n${formState.message}\n\n` +
      `Best regards,\n${formState.name}`
    );
    const mailtoUrl = `mailto:creativfussion01@gmail.com?subject=${emailSubject}&body=${emailBody}`;

    setTimeout(() => {
      setStatus("success");
      window.location.href = mailtoUrl;
    }, 1200);
  };

  const handleReset = () => {
    setFormState({
      name: "",
      email: "",
      
      message: "",
    });
    setStatus("idle");
  };

  return (
    <div className="w-full py-8 border-t border-neutral-200">
      <div className="mb-12 border-b border-neutral-200 pb-4 flex items-baseline justify-between">
        <h2 className="font-display font-medium text-xs tracking-widest text-neutral-400 uppercase">
          03 CONTACT
        </h2>
        <span className="font-mono text-[10px] text-neutral-500">
          [ESTIMATED RESPONSE: &lt; 24H]
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <h3 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-neutral-900 leading-tight flex items-center flex-wrap gap-x-4 gap-y-3">
              <a 
                href="https://www.fiverr.com/toptrustedguy/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative flex items-center gap-3 bg-white p-2 pr-4 rounded-xl border border-neutral-200 hover:border-[#1dbf73] hover:shadow-sm transition-all shrink-0 cursor-pointer text-left"
              >
                <img src={fiverrIcon} alt="Fiverr" className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-md" />
                <div className="flex flex-col justify-center">
                  <span className="text-[10px] sm:text-[11px] font-mono text-[#1dbf73] font-bold uppercase tracking-widest leading-none mb-1">Available</span>
                  <span className="text-sm sm:text-base font-sans font-semibold text-neutral-700 group-hover:text-[#1dbf73] transition-colors leading-none">Hire on Fiverr</span>
                </div>
              </a>
              <span>Let's build something <span className="font-serif italic font-normal text-neutral-800">together</span>.</span>
            </h3>
            <p className="text-neutral-600 font-sans text-sm leading-relaxed font-light">
              We specialize in custom web applications and high-performance interfaces. Use the form below to send us details about your project, or reach out directly.
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white rounded-2xl border border-neutral-200/80 p-6 sm:p-8 shadow-xs">
          {status !== "success" ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[9px] font-mono text-neutral-400 tracking-wider uppercase mb-1.5">
                    YOUR NAME [REQUIRED]
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. Liam Sterling"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3.5 py-2.5 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-500 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-mono text-neutral-400 tracking-wider uppercase mb-1.5">
                    EMAIL ADDRESS [REQUIRED]
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="e.g. liam@sterling.digital"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3.5 py-2.5 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-500 focus:bg-white transition-all"
                  />
                </div>
              </div>



              <div>
                <label className="block text-[9px] font-mono text-neutral-400 tracking-wider uppercase mb-1.5">
                  PROJECT DETAILS [REQUIRED]
                </label>
                <textarea
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Please provide details about your project..."
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3.5 py-2.5 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-500 focus:bg-white transition-all resize-none leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-xs font-bold tracking-widest py-3.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
              >
                {status === "submitting" ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>SENDING...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>SEND MESSAGE</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center flex flex-col justify-center items-center space-y-6"
            >
              <div className="w-12 h-12 bg-neutral-50 rounded-full flex items-center justify-center border border-green-200">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              </div>
              <div className="space-y-2">
                <h4 className="font-display font-bold text-lg tracking-tight text-neutral-900">
                  MESSAGE SENT
                </h4>
                <p className="text-neutral-500 text-xs font-mono max-w-sm leading-relaxed mx-auto">
                  Your message has been sent successfully. We will get back to you shortly.
                </p>
              </div>

              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
              >
                <span>SEND ANOTHER MESSAGE</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
