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
    projectType: "editorial",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setStatus("submitting");

    setTimeout(() => {
      setStatus("success");
    }, 1800);
  };

  const handleReset = () => {
    setFormState({
      name: "",
      email: "",
      projectType: "editorial",
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
                      PROJECT CATEGORY
                    </label>
                    <select
                      value={formState.projectType}
                      onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2.5 text-xs font-mono text-neutral-300 focus:outline-none focus:border-neutral-500 transition-colors"
                    >
                      <option value="travel">SPOT TRAVEL [CURATED TRAVEL DESIGN & ARCHITECTURE]</option>
                      <option value="aura">AURA [DECENTRALIZED SOCIAL ECOSYSTEM / WEB3]</option>
                      <option value="brutalist">KORE [BRUTALIST ARCHITECTURAL GRID]</option>
                      <option value="editorial">VELLUM [EDITORIAL TEXT SYSTEM]</option>
                      <option value="generative">NERO ESTORE [TECHNICAL E-COMMERCE CONFIGURATOR]</option>
                      <option value="custom">BESPOKE BRANDING / SPECIAL INQUIRY</option>
                    </select>
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
                        <span>MUTATING DATA STREAM...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>DISPATCH INQUIRY VECTOR</span>
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
                      TRANSMISSION COMPLETE
                    </h3>
                    <p className="text-neutral-400 text-xs leading-relaxed max-w-xs font-mono">
                      Inquiry coordinates successfully integrated. Webelements will calibrate a detailed analytical response within 24 hours.
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

            <div className="p-6 border-t border-neutral-800 bg-neutral-950/40 text-[9px] font-mono text-neutral-500 flex flex-col gap-2">
              <div className="flex justify-between">
                <span>DIRECT PHONE:</span>
                <span className="text-neutral-400">+45 32 94 88 01</span>
              </div>
              <div className="flex justify-between">
                <span>INBOX COORDINATES:</span>
                <a href={`mailto:${designerInfo.email}`} className="text-neutral-400 hover:underline">
                  {designerInfo.email}
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
