import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, CheckCircle2, ArrowRight } from "lucide-react";
import { designerInfo } from "../data/portfolioData";

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactDrawer: React.FC<ContactDrawerProps> = ({ isOpen, onClose }) => {
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

    const emailSubject = encodeURIComponent(`[Project Request] ${formState.name}`);
    const emailBody = encodeURIComponent(
      `Hello,\n\nI would like to inquire about a project:\n\n` +
      `Name: ${formState.name}\n` +
      `Email: ${formState.email}\n` +
      
      `Project Synopsis & Boundaries:\n${formState.message}\n\n` +
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
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-950 z-40"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-neutral-900 text-neutral-100 shadow-2xl z-50 flex flex-col justify-between overflow-y-auto"
          >
            <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                <span className="font-mono text-xs text-neutral-400 tracking-widest">CALIBRATE PROJECT REQUEST</span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-neutral-800 rounded-lg text-neutral-400 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 p-6">
              {status !== "success" ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-mono text-neutral-400 tracking-wider uppercase mb-1.5">
                      YOUR NAME [REQUIRED]
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Elena Rostova"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-neutral-400 tracking-wider uppercase mb-1.5">
                      EMAIL COORDINATES [REQUIRED]
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="e.g. elena@studio.co"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
                    />
                  </div>



                  <div>
                    <label className="block text-[10px] font-mono text-neutral-400 tracking-wider uppercase mb-1.5">
                      PROJECT SYNOPSIS & BOUNDARIES
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Briefly detail your visual requirements, timeline thresholds, and structural goals..."
                      className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors resize-none leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full bg-white hover:bg-neutral-100 text-neutral-950 py-3 rounded text-xs font-mono tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer font-bold disabled:opacity-50"
                  >
                    {status === "submitting" ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
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
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col justify-center items-center text-center space-y-6 py-12"
                >
                  <CheckCircle2 className="w-12 h-12 text-green-400" />
                  <div>
                    <h3 className="font-display font-medium text-lg tracking-tight text-white mb-2">
                      MESSAGE SENT
                    </h3>
                    <p className="text-neutral-400 text-xs leading-relaxed max-w-xs font-mono">
                      Message sent successfully. We will get back to you within 24 hours.
                    </p>
                  </div>

                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-300 hover:text-white transition"
                  >
                    <span>RETURN TO SHOWCASE</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
