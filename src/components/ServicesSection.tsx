import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Lottie from "lottie-react";
import servicesLottieData from "../assets/services_tech.json";

import heroImg from "../assets/images/hero_flower_greenhouse_1783352940397.jpg";
import roseImg from "../assets/images/classic_red_rose_1783352957408.jpg";
import tulipImg from "../assets/images/spring_pink_tulip_1783352970134.jpg";
import hibiscusImg from "../assets/images/tropical_red_hibiscus_1783352985761.jpg";
import lavenderImg from "../assets/images/french_lavender_sprig_1783352998323.jpg";
import bouquetImg from "../assets/images/bespoke_flower_bouquet_1783353012943.jpg";
import valentineEmailImg from "../assets/images/valentine_fashion_collection_1783353027682.jpg";
import { 
  Code, 
  Database, 
  Mail, 
  Smartphone, 
  Sparkles, 
  ArrowRight, 
  CloudLightning, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Terminal, 
  RefreshCw, 
  Cpu,
  Monitor,
  Check,
  ChevronRight,
  Sliders,
  Send,
  Eye,
  Settings,
  Wifi,
  Battery,
  Heart,
  ShoppingBag,
  Info
} from "lucide-react";

import { ServiceCard } from "./ServiceCard";
import { AndroidIssueViewer } from "./AndroidIssueViewer";

export type ServiceID = "frontend" | "backend" | "email" | "android";

export interface ServiceItem {
  id: ServiceID;
  title: string;
  category: string;
  icon: React.ComponentType<any>;
  shortDesc: string;
  longDesc: string;
  technologies: string[];
}

const SERVICE_THEMES = {
  frontend: {
    accent: "text-violet-600",
    bgLight: "bg-violet-50/40",
    border: "border-violet-200/80",
    glow: "rgba(139, 92, 246, 0.15)",
    gradient: "from-violet-500 via-indigo-500 to-purple-600",
    textGradient: "from-violet-600 via-purple-600 to-indigo-600",
    iconBg: "bg-violet-50 text-violet-600 border-violet-100",
    iconBgActive: "bg-gradient-to-br from-violet-500 to-indigo-500 text-white border-transparent shadow-[0_4px_14px_rgba(139,92,246,0.25)]",
    tabGlow: "shadow-[0_12px_30px_rgba(139,92,246,0.06)] border-violet-300 bg-white/95",
    badge: "bg-violet-50 text-violet-700 border-violet-200/50"
  },
  backend: {
    accent: "text-teal-600",
    bgLight: "bg-teal-50/40",
    border: "border-teal-200/80",
    glow: "rgba(20, 184, 166, 0.15)",
    gradient: "from-teal-400 via-emerald-500 to-cyan-500",
    textGradient: "from-teal-600 via-emerald-600 to-cyan-600",
    iconBg: "bg-teal-50 text-teal-600 border-teal-100",
    iconBgActive: "bg-gradient-to-br from-teal-400 to-emerald-500 text-white border-transparent shadow-[0_4px_14px_rgba(20,184,166,0.25)]",
    tabGlow: "shadow-[0_12px_30px_rgba(20,184,166,0.06)] border-teal-300 bg-white/95",
    badge: "bg-teal-50 text-teal-700 border-teal-200/50"
  },
  email: {
    accent: "text-amber-600",
    bgLight: "bg-amber-50/40",
    border: "border-amber-200/80",
    glow: "rgba(245, 158, 11, 0.15)",
    gradient: "from-amber-500 via-orange-500 to-rose-500",
    textGradient: "from-amber-600 via-orange-600 to-rose-600",
    iconBg: "bg-amber-50 text-amber-600 border-amber-100",
    iconBgActive: "bg-gradient-to-br from-amber-500 to-orange-500 text-white border-transparent shadow-[0_4px_14px_rgba(245,158,11,0.25)]",
    tabGlow: "shadow-[0_12px_30px_rgba(245,158,11,0.06)] border-amber-300 bg-white/95",
    badge: "bg-amber-50 text-amber-700 border-amber-200/50"
  },
  android: {
    accent: "text-cyan-600",
    bgLight: "bg-cyan-50/40",
    border: "border-cyan-200/80",
    glow: "rgba(6, 182, 212, 0.15)",
    gradient: "from-cyan-400 via-blue-500 to-indigo-600",
    textGradient: "from-cyan-600 via-blue-600 to-indigo-600",
    iconBg: "bg-cyan-50 text-cyan-600 border-cyan-100",
    iconBgActive: "bg-gradient-to-br from-cyan-400 to-blue-500 text-white border-transparent shadow-[0_4px_14px_rgba(6,182,212,0.25)]",
    tabGlow: "shadow-[0_12px_30px_rgba(6,182,212,0.06)] border-cyan-300 bg-white/95",
    badge: "bg-cyan-50 text-cyan-700 border-cyan-200/50"
  }
};

const THEME_ACCENTS = {
  violet: {
    text: "text-violet-600",
    bg: "bg-violet-600",
    hoverBg: "hover:bg-violet-700",
    border: "border-violet-200",
    bgLight: "bg-violet-50",
    badge: "bg-violet-100 text-violet-800 border-violet-200",
    ring: "focus:ring-violet-500/20",
    gradient: "from-violet-500 via-purple-500 to-indigo-600",
    textGradient: "from-violet-600 via-purple-600 to-indigo-600"
  },
  rose: {
    text: "text-rose-600",
    bg: "bg-rose-600",
    hoverBg: "hover:bg-rose-700",
    border: "border-rose-200",
    bgLight: "bg-rose-50",
    badge: "bg-rose-100 text-rose-800 border-rose-200",
    ring: "focus:ring-rose-500/20",
    gradient: "from-rose-500 via-pink-500 to-red-600",
    textGradient: "from-rose-600 via-pink-600 to-red-600"
  },
  teal: {
    text: "text-teal-600",
    bg: "bg-teal-600",
    hoverBg: "hover:bg-teal-700",
    border: "border-teal-200",
    bgLight: "bg-teal-50",
    badge: "bg-teal-100 text-teal-800 border-teal-200",
    ring: "focus:ring-teal-500/20",
    gradient: "from-teal-500 via-emerald-500 to-cyan-600",
    textGradient: "from-teal-600 via-emerald-600 to-cyan-600"
  },
  amber: {
    text: "text-amber-600",
    bg: "bg-amber-600",
    hoverBg: "hover:bg-amber-700",
    border: "border-amber-200",
    bgLight: "bg-amber-50",
    badge: "bg-amber-100 text-amber-800 border-amber-200",
    ring: "focus:ring-amber-500/20",
    gradient: "from-amber-500 via-orange-500 to-yellow-600",
    textGradient: "from-amber-600 via-orange-600 to-yellow-600"
  },
  indigo: {
    text: "text-indigo-600",
    bg: "bg-indigo-600",
    hoverBg: "hover:bg-indigo-700",
    border: "border-indigo-200",
    bgLight: "bg-indigo-50",
    badge: "bg-indigo-100 text-indigo-800 border-indigo-200",
    ring: "focus:ring-indigo-500/20",
    gradient: "from-indigo-500 via-blue-500 to-violet-600",
    textGradient: "from-indigo-600 via-blue-600 to-violet-600"
  }
};

export const ServicesSection: React.FC = () => {
  const [activeService, setActiveService] = useState<ServiceID>("frontend");

  const [flowerActiveTab, setFlowerActiveTab] = useState<"home" | "about" | "gallery" | "designer">("home");
  const [flowerCategory, setFlowerCategory] = useState<"all" | "roses" | "tulips" | "hibiscus" | "lavender">("all");
  const [likedFlowers, setLikedFlowers] = useState<string[]>([]);
  const [flowerWrap, setFlowerWrap] = useState<"kraft" | "blush" | "silk">("kraft");
  const [flowerRibbon, setFlowerRibbon] = useState<"twine" | "satin" | "velvet">("twine");
  const [customCard, setCustomCard] = useState<string>("With love");
  const [isArrangementOrdered, setIsArrangementOrdered] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<number>(0);

  const [syncStatus, setSyncStatus] = useState<"idle" | "syncing" | "synced">("idle");
  const [syncLogs, setSyncLogs] = useState<string[]>([
    "System idle. Ready for database mutation."
  ]);
  const [documentContent, setDocumentContent] = useState<string>("Project status: launch sequence initiated");

  const [emailClient, setEmailClient] = useState<"gmail" | "outlook" | "yahoo">("gmail");

  const [compileState, setCompileState] = useState<"idle" | "compiling" | "success">("idle");
  const [compileProgress, setCompileProgress] = useState<number>(0);

  const services: ServiceItem[] = [
    {
      id: "frontend",
      title: "Frontend Development",
      category: "WEB APPLICATIONS",
      icon: Code,
      shortDesc: "Building fast, clean, and functional web applications and single-page sites.",
      longDesc: "I build responsive web interfaces using React and modern CSS. I focus on writing maintainable code and building straightforward user experiences.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "Framer Motion"]
    },
    {
      id: "email",
      title: "HTML Email Templates",
      category: "EMAIL DEVELOPMENT",
      icon: Mail,
      shortDesc: "Developing reliable HTML email templates that work across different clients.",
      longDesc: "I build custom email templates using table-based layouts and inline CSS. They are tested to display correctly in major clients like Gmail, Apple Mail, and Outlook.",
      technologies: ["HTML Tables", "Inline CSS", "Responsive Design", "Cross-Client Testing"]
    },
    {
      id: "backend",
      title: "Cloud Services",
      category: "BACKEND & DATABASES",
      icon: Database,
      shortDesc: "Setting up databases and connecting web applications to cloud services.",
      longDesc: "I integrate frontend applications with backend services like Firebase and Supabase, setting up authentication, databases, and secure data rules.",
      technologies: ["Firebase", "Supabase", "Database Schemas", "Security Rules"]
    },
    {
      id: "android",
      title: "Android & Kotlin Development",
      category: "MOBILE APPS",
      icon: Smartphone,
      shortDesc: "Working on native Android applications using Kotlin and Jetpack Compose.",
      longDesc: "I help maintain and update Android applications. This includes fixing bugs, updating dependencies, and building user interfaces with Jetpack Compose.",
      technologies: ["Kotlin", "Jetpack Compose", "Android Studio", "Gradle"]
    }
  ];

  const triggerSyncSimulation = () => {
    if (syncStatus === "syncing") return;

    setSyncStatus("syncing");
    setSyncLogs([
      `[${new Date().toLocaleTimeString()}] MUTATION_TRIGGERED: Captured local write request.`,
      `[${new Date().toLocaleTimeString()}] payload: { message: "${documentContent.substring(0, 32)}..." }`,
      `[${new Date().toLocaleTimeString()}] indexing state inside client storage...`
    ]);

    setTimeout(() => {
      setSyncLogs(prev => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] dispatching sync payload to Firebase Firestore...`,
        `[${new Date().toLocaleTimeString()}] verifying security credentials & RLS rules: [AUTH_OK]`,
      ]);
    }, 800);

    setTimeout(() => {
      setSyncLogs(prev => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] payload injected. ACK received in 34ms.`,
        `[${new Date().toLocaleTimeString()}] STATE_SYNCHRONIZED: DB updated successfully.`
      ]);
      setSyncStatus("synced");
    }, 1800);
  };

  const resetSyncSimulation = () => {
    setSyncStatus("idle");
    setSyncLogs(["System idle. Ready for database mutation."]);
  };

  const triggerKotlinCompiler = () => {
    if (compileState === "compiling") return;
    setCompileState("compiling");
    setCompileProgress(0);

    const interval = setInterval(() => {
      setCompileProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setCompileState("success");
          return 100;
        }
        return prev + 10;
      });
    }, 120);
  };

  const currentTheme = SERVICE_THEMES[activeService];

  return (
    <div className="w-full border-t border-neutral-200/80 pt-8 md:pt-12 pb-10 relative" id="capabilities-section">
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full pointer-events-none blur-3xl opacity-20 transition-all duration-1000 ease-in-out z-0"
        style={{ backgroundColor: currentTheme.glow }}
      />

      <div className="mb-12 md:mb-16 border-b border-neutral-200 pb-4 flex items-baseline justify-between relative z-10" id="services-header">
        <h2 className="font-display font-medium text-xs tracking-widest text-neutral-400 uppercase">
          02 SERVICES
        </h2>
        <span className="font-mono text-[10px] text-neutral-500">
          [CAPABILITIES: 04 ACTIVE]
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start relative z-10">
        <div className="lg:col-span-5 space-y-4" id="services-selectors-col">
          <div className="max-w-xl">
            <h3 className="font-display font-bold text-3xl sm:text-4xl text-neutral-950 tracking-tight leading-[1.1] mb-6">
              Frontend development for modern <span className="font-serif italic font-normal text-neutral-800">interfaces</span> and stable <span className="font-serif italic font-normal text-neutral-800">systems</span>.
            </h3>
            <p className="font-sans text-neutral-500 text-sm leading-relaxed font-light mb-8">
              I build web applications with clean code, secure integrations, and solid cross-platform performance.
            </p>
          </div>

          <div className="space-y-3" id="selectors-container">
            {services.map((service, index) => {
              const isActive = activeService === service.id;
              const theme = SERVICE_THEMES[service.id];

              return (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={index}
                  isActive={isActive}
                  onClick={() => setActiveService(service.id)}
                  theme={theme}
                />
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col h-full lg:sticky lg:top-28" id="sandbox-display-col">
          
          <div 
            id="sandbox-wrapper"
            className="w-full bg-white border border-neutral-200 rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col min-h-[490px] transition-all duration-500 relative"
            style={{
              boxShadow: `0 20px 50px -12px ${currentTheme.glow}`
            }}
          >
            
            <div className="flex items-center justify-between px-5 py-3.5 bg-neutral-900 border-b border-neutral-950 text-white relative overflow-hidden shrink-0 select-none">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 mr-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                </div>
                <span className="font-mono text-[9px] text-neutral-300 font-semibold uppercase tracking-wider">
                  SANDBOX {activeService}
                </span>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[8px] text-neutral-400">
                <span>SIMULATION STATUS</span>
                <span className={`font-bold transition-all ${
                  activeService === "android" && compileState === "compiling"
                    ? "text-amber-400 animate-pulse"
                    : "text-emerald-400 animate-pulse"
                }`}>● ACTIVE</span>
              </div>

              <div 
                className={`absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r ${currentTheme.gradient} transition-all duration-500`}
              />
            </div>

            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between bg-radial-[circle_at_50%_0%] from-neutral-50/10 via-transparent to-transparent relative overflow-hidden" id="sandbox-viewport">
              
              <AnimatePresence mode="wait">
                {activeService === "frontend" && (
                  <motion.div
                    key="frontend-box"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="flex flex-col flex-1 items-stretch"
                    id="frontend-playground-root"
                  >
                    <div className="w-full flex flex-col justify-between space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-wider">SITE PREVIEW</span>
                        <div className="flex items-center gap-1.5 font-mono text-[8px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                          <span>LIVE_PREVIEW_OK</span>
                        </div>
                      </div>

                      <div className="border border-neutral-200/80 rounded-2xl overflow-hidden shadow-md bg-neutral-50/50 flex flex-col min-h-[560px] relative">
                        <div className="bg-neutral-100 px-4 py-2 border-b border-neutral-200/60 flex items-center justify-between text-[10px] text-neutral-400 font-mono select-none shrink-0">
                          <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                            <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                            <div className="w-2 h-2 rounded-full bg-[#27c93f]" />
                          </div>
                          <div className="bg-white px-4 py-0.5 rounded-md border border-neutral-200 text-[9px] text-neutral-500 w-64 text-center truncate flex items-center justify-center gap-1">
                            <span className="text-emerald-600">🔒</span>
                            <span>fleur-botanica.co/atelier</span>
                          </div>
                          <div className="flex items-center gap-1 text-neutral-600 font-bold font-mono text-[9px]">
                            <ShoppingBag className="w-3.5 h-3.5 text-neutral-600" />
                            <AnimatePresence mode="wait">
                              <motion.span
                                key={cartItems}
                                initial={{ scale: 0.7, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.7, opacity: 0 }}
                                className="bg-neutral-900 text-white rounded-full w-4 h-4 flex items-center justify-center text-[7.5px] leading-none"
                              >
                                {cartItems}
                              </motion.span>
                            </AnimatePresence>
                          </div>
                        </div>

                        <div className="bg-white/80 backdrop-blur-md px-6 py-3 border-b border-neutral-100 flex items-center justify-between z-20 relative shrink-0">
                          <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => setFlowerActiveTab("home")}>
                            <span className="text-sm">🌸</span>
                            <span className="font-sans font-semibold text-[11px] tracking-[0.2em] text-neutral-900">FLEUR & BOTANICA</span>
                          </div>
                          <div className="flex gap-4 font-mono text-[8.5px] text-neutral-400 font-bold tracking-widest items-center">
                            {[
                              { id: "home", label: "HOME" },
                              { id: "about", label: "ABOUT" },
                              { id: "gallery", label: "GALLERY" },
                              { id: "designer", label: "ARRANGE ATELIER" }
                            ].map((tab) => (
                              <button
                                key={tab.id}
                                onClick={() => setFlowerActiveTab(tab.id as any)}
                                className={`transition-all pb-0.5 relative cursor-pointer ${
                                  flowerActiveTab === tab.id 
                                    ? "text-neutral-950 font-extrabold" 
                                    : "hover:text-neutral-900"
                                }`}
                              >
                                {tab.label}
                                {flowerActiveTab === tab.id && (
                                  <motion.div 
                                    layoutId="flowerTabIndicator" 
                                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-neutral-900" 
                                  />
                                )}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="flex-1 flex flex-col bg-white overflow-y-auto max-h-[480px] relative text-left">
                          
                          {flowerActiveTab === "home" && (
                            <motion.div
                              key="page-home"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex flex-col"
                            >
                              <div className="relative h-[250px] overflow-hidden flex items-center">
                                <div className="absolute inset-0 bg-neutral-950/40 z-10" />
                                <img 
                                  src={heroImg} 
                                  alt="Luxury greenhouse" 
                                  className="absolute inset-0 w-full h-full object-cover scale-105 filter brightness-95"
                                  
                                />
                                <div className="relative z-10 px-8 max-w-xl text-white space-y-3">
                                  <span className="font-mono text-[7.5px] font-bold tracking-[0.25em] text-neutral-200 uppercase block">ATELIER COPENHAGEN EST. 2018</span>
                                  <h1 className="font-sans font-light text-2xl sm:text-3xl leading-[1.05] tracking-tight text-white">
                                    Curating Nature's <br />
                                    <span className="font-sans italic font-normal text-rose-200">Silent Poetry</span>
                                  </h1>
                                  <p className="text-[10px] sm:text-[11px] text-neutral-200 font-light leading-relaxed max-w-md">
                                    Artisanal seasonal bouquets and architectural botanical structures hand-crafted in our studio, delivered fresh with modern European balance.
                                  </p>
                                  <div className="flex items-center gap-3 pt-2">
                                    <button 
                                      onClick={() => setFlowerActiveTab("designer")}
                                      className="bg-white hover:bg-neutral-100 text-neutral-900 font-mono font-bold text-[8.5px] tracking-wider px-4 py-2 rounded-full shadow-xs transition-colors cursor-pointer"
                                    >
                                      DESIGN BOUQUET
                                    </button>
                                    <button 
                                      onClick={() => setFlowerActiveTab("gallery")}
                                      className="border border-white/60 hover:bg-white/10 text-white font-mono font-bold text-[8.5px] tracking-wider px-4 py-2 rounded-full transition-colors cursor-pointer"
                                    >
                                      BROWSE COLLECTIONS
                                    </button>
                                  </div>
                                </div>
                              </div>

                              <div className="bg-neutral-50 px-6 py-4 border-b border-neutral-100 grid grid-cols-3 gap-2 text-center">
                                {[
                                  { label: "LOCAL FLOWER FARMS", desc: "100% organic & seasonal" },
                                  { label: "SAME-DAY COURIER", desc: "Delivered in pure chilled water" },
                                  { label: "BESPOKE PACKAGING", desc: "Wrapped in organic linen" }
                                ].map((item, idx) => (
                                  <div key={idx} className="space-y-0.5 border-r border-neutral-200 last:border-0 pr-2">
                                    <span className="font-mono text-[7px] font-extrabold text-neutral-400 block uppercase tracking-wider">{item.label}</span>
                                    <span className="text-[9.5px] font-medium text-neutral-700 block leading-tight">{item.desc}</span>
                                  </div>
                                ))}
                              </div>

                              <div className="p-6 space-y-4">
                                <div className="flex justify-between items-end border-b border-neutral-100 pb-2">
                                  <div>
                                    <span className="font-mono text-[7.5px] font-bold text-neutral-400 tracking-wider block uppercase">LATEST ARRIVALS</span>
                                    <h3 className="font-sans font-semibold text-sm text-neutral-900">SUMMER COLLECTION</h3>
                                  </div>
                                  <button 
                                    onClick={() => setFlowerActiveTab("gallery")}
                                    className="font-mono text-[8px] font-bold text-neutral-800 flex items-center gap-1 hover:gap-1.5 transition-all"
                                  >
                                    VIEW ALL <ArrowRight className="w-3 h-3" />
                                  </button>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  {[
                                    { name: "Classic Red Rose", price: "$25", img: roseImg },
                                    { name: "Spring Tulip", price: "$18", img: tulipImg }
                                  ].map((feat, i) => (
                                    <div 
                                      key={i} 
                                      className="group cursor-pointer"
                                      onClick={() => setFlowerActiveTab("gallery")}
                                    >
                                      <div className="h-32 rounded-lg overflow-hidden relative mb-2">
                                        <img src={feat.img} alt={feat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"  />
                                      </div>
                                      <div className="flex justify-between text-[11px] font-medium text-neutral-900">
                                        <span>{feat.name}</span>
                                        <span className="text-neutral-500">{feat.price}</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}

                          {flowerActiveTab === "about" && (
                            <motion.div
                              key="page-about"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="p-6 space-y-6"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                                <div className="space-y-4">
                                  <span className="font-mono text-[7.5px] font-bold text-neutral-400 tracking-wider uppercase block">OUR PHILOSOPHY</span>
                                  <h2 className="font-sans font-light text-xl text-neutral-900 leading-tight">
                                    We believe flowers should be styled, <span className="italic font-normal text-rose-500">not just arranged.</span>
                                  </h2>
                                  <p className="text-[10px] text-neutral-500 leading-relaxed font-light">
                                    Founded in Copenhagen, Fleur & Botanica is an avant-garde floral agency working with local biological growers. We conceptualize each arrangement with spatial weight, depth, and sculptural expression.
                                  </p>
                                  <p className="text-[10px] text-neutral-500 leading-relaxed font-light">
                                    Instead of packed flower bundles, we celebrate the delicate shape of a bent stem, the raw asymmetry of a wild branch, and the transient beauty of opening buds.
                                  </p>
                                </div>
                                <div className="grid grid-cols-2 gap-2 h-[160px]">
                                  <img 
                                    src={tulipImg} 
                                    alt="Florist work" 
                                    className="w-full h-full object-cover rounded-lg"
                                    
                                  />
                                  <img 
                                    src={lavenderImg} 
                                    alt="Vase setup" 
                                    className="w-full h-full object-cover rounded-lg"
                                    
                                  />
                                </div>
                              </div>

                              <div className="border-t border-neutral-100 pt-5 space-y-3">
                                <h3 className="font-mono text-[8px] font-bold text-neutral-400 uppercase tracking-widest">WHAT WE EXCEL AT</h3>
                                <div className="grid grid-cols-3 gap-3">
                                  {[
                                    { title: "Custom Orders", desc: "Floral arrangements designed specifically for your needs." },
                                    { title: "Event Styling", desc: "Floral installations for events, galleries, and retail spaces." },
                                    { title: "Weddings", desc: "Bridal bouquets and floral decor for wedding ceremonies." }
                                  ].map((serv, sIdx) => (
                                    <div key={sIdx} className="bg-neutral-50 p-3 rounded-lg space-y-1">
                                      <span className="text-[10px] font-semibold text-neutral-900 block">{serv.title}</span>
                                      <p className="text-[8.5px] text-neutral-400 font-light leading-relaxed">{serv.desc}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}

                          {flowerActiveTab === "gallery" && (
                            <motion.div
                              key="page-gallery"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="p-6 space-y-4"
                            >
                              <div className="text-center space-y-1.5">
                                <span className="font-mono text-[7.5px] font-bold text-neutral-400 tracking-wider uppercase block">THE SUMMER ARCHIVES</span>
                                <h2 className="font-sans font-light text-lg text-neutral-900">Botanical Garden Collections</h2>
                                <p className="text-[9.5px] text-neutral-400 max-w-md mx-auto">
                                  Explore our active curated items. Click heart to save collections, or add directly to your bag.
                                </p>
                              </div>

                              <div className="flex justify-center gap-1.5 pb-2 overflow-x-auto">
                                {[
                                  { id: "all", label: "ALL BLOOMS" },
                                  { id: "roses", label: "ROSES" },
                                  { id: "tulips", label: "TULIPS" },
                                  { id: "hibiscus", label: "HIBISCUS" },
                                  { id: "lavender", label: "LAVENDER" }
                                ].map((cat) => (
                                  <button
                                    key={cat.id}
                                    onClick={() => setFlowerCategory(cat.id as any)}
                                    className={`py-1 px-2.5 text-[8px] font-mono font-bold tracking-wider rounded-full border transition-all cursor-pointer whitespace-nowrap ${
                                      flowerCategory === cat.id 
                                        ? "bg-neutral-900 text-white border-neutral-900" 
                                        : "bg-white border-neutral-200 text-neutral-400 hover:text-neutral-700 hover:border-neutral-300"
                                    }`}
                                  >
                                    {cat.label}
                                  </button>
                                ))}
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                {[
                                  {
                                    id: "rose",
                                    name: "Red Rose",
                                    category: "roses",
                                    price: "$25",
                                    image: roseImg,
                                    desc: "A single red rose."
                                  },
                                  {
                                    id: "tulip",
                                    name: "Pink Tulip",
                                    category: "tulips",
                                    price: "$18",
                                    image: tulipImg,
                                    desc: "A pink spring tulip."
                                  },
                                  {
                                    id: "hibiscus",
                                    name: "Red Hibiscus",
                                    category: "hibiscus",
                                    price: "$30",
                                    image: hibiscusImg,
                                    desc: "A bright red hibiscus flower."
                                  },
                                  {
                                    id: "lavender",
                                    name: "Lavender",
                                    category: "lavender",
                                    price: "$15",
                                    image: lavenderImg,
                                    desc: "Fresh sprigs of French lavender."
                                  }
                                ]
                                .filter(item => flowerCategory === "all" || item.category === flowerCategory)
                                .map((item) => {
                                  const isLiked = likedFlowers.includes(item.id);
                                  return (
                                    <motion.div
                                      layout
                                      key={item.id}
                                      className="border border-neutral-100 rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow relative flex flex-col justify-between"
                                    >
                                      <button 
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          if (isLiked) {
                                            setLikedFlowers(likedFlowers.filter(id => id !== item.id));
                                          } else {
                                            setLikedFlowers([...likedFlowers, item.id]);
                                          }
                                        }}
                                        className="absolute top-2.5 right-2.5 z-10 w-6 h-6 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-rose-500 shadow-sm border border-neutral-100 cursor-pointer"
                                      >
                                        <Heart className={`w-3.5 h-3.5 ${isLiked ? "fill-current" : ""}`} />
                                      </button>

                                      <div className="h-32 overflow-hidden relative bg-neutral-100">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover"  />
                                      </div>
                                      
                                      <div className="p-3 space-y-1.5 flex-1 flex flex-col justify-between text-left">
                                        <div className="space-y-0.5">
                                          <div className="flex justify-between items-start">
                                            <h4 className="font-sans font-medium text-[10px] text-neutral-900 leading-tight">{item.name}</h4>
                                            <span className="font-mono text-[10px] font-bold text-neutral-800">{item.price}</span>
                                          </div>
                                          <p className="text-[8px] text-neutral-400 font-light leading-normal line-clamp-2">{item.desc}</p>
                                        </div>

                                        <button 
                                          onClick={() => setCartItems(prev => prev + 1)}
                                          className="w-full bg-neutral-900 hover:bg-rose-900 text-white font-mono font-bold text-[7.5px] py-1.5 rounded-md transition-colors tracking-widest uppercase cursor-pointer"
                                        >
                                          ADD TO BAG
                                        </button>
                                      </div>
                                    </motion.div>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}

                          {flowerActiveTab === "designer" && (
                            <motion.div
                              key="page-designer"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="p-6 space-y-4"
                            >
                              <div className="text-center space-y-1">
                                <span className="font-mono text-[7.5px] font-bold text-neutral-400 tracking-wider uppercase block">BESPOKE SERVICES</span>
                                <h2 className="font-sans font-light text-lg text-neutral-900">The Flower Arrangement Atelier</h2>
                                <p className="text-[9.5px] text-neutral-400 max-w-sm mx-auto">
                                  Configure wrappers, materials, and letterpress cards in real-time. Hand-tied on order.
                                </p>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch relative">
                                <AnimatePresence mode="wait">
                                  {isArrangementOrdered && (
                                    <motion.div 
                                      initial={{ opacity: 0, scale: 0.95 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      exit={{ opacity: 0, scale: 0.95 }}
                                      className="absolute inset-0 bg-white/95 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-6 text-center space-y-3"
                                    >
                                      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                        <Check className="w-5 h-5" />
                                      </div>
                                      <span className="font-mono text-[8px] font-extrabold text-emerald-600 tracking-widest uppercase">ORDER COMPLETE</span>
                                      <h3 className="font-sans font-light text-base text-neutral-900">Your order has been placed</h3>
                                      
                                      <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-100 max-w-xs w-full text-left font-mono text-[8px] text-neutral-500 space-y-1">
                                        <div className="flex justify-between border-b border-neutral-200/60 pb-1 font-bold text-neutral-800">
                                          <span>ITEM</span>
                                          <span>ATELIER ATTESTATION</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span>CANVAS WRAP:</span>
                                          <span className="font-bold text-neutral-700">{flowerWrap.toUpperCase()} PAPER</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span>RIBBON TIE:</span>
                                          <span className="font-bold text-neutral-700">{flowerRibbon.toUpperCase()}</span>
                                        </div>
                                        <div className="flex justify-between max-w-full">
                                          <span className="shrink-0">LETTERPRESS NOTE:</span>
                                          <span className="font-bold text-neutral-700 truncate ml-1">"{customCard}"</span>
                                        </div>
                                        <div className="flex justify-between border-t border-neutral-200/60 pt-1 font-bold text-neutral-800 text-[9px]">
                                          <span>TOTAL VALUE:</span>
                                          <span>$68.00 USD</span>
                                        </div>
                                      </div>
                                      
                                      <p className="text-[9px] text-neutral-400 font-light max-w-xs leading-relaxed">
                                        Our florists are sorting fresh blooms. We'll hand-deliver in organic linen with a chilled water pouch.
                                      </p>

                                      <button 
                                        onClick={() => {
                                          setIsArrangementOrdered(false);
                                          setCustomCard("With love");
                                        }}
                                        className="bg-neutral-950 hover:bg-neutral-850 text-white font-mono font-bold text-[8px] tracking-wider px-4 py-1.5 rounded-full cursor-pointer"
                                      >
                                        DESIGN ANOTHER ARRANGEMENT
                                      </button>
                                    </motion.div>
                                  )}
                                </AnimatePresence>

                                <div className="md:col-span-5 border border-neutral-100 rounded-xl p-4 bg-neutral-50 flex flex-col justify-between relative overflow-hidden h-[260px] text-center">
                                  <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:10px_10px]" />
                                  
                                  <span className="font-mono text-[6.5px] text-neutral-400 uppercase tracking-widest block z-10">LIVE PREVIEW</span>
                                  
                                  <div className="relative my-auto flex flex-col items-center justify-center z-10">
                                    <div className={`relative p-2.5 rounded-2xl border-2 transition-all duration-500 shadow-sm ${
                                      flowerWrap === "kraft" 
                                        ? "bg-amber-50/70 border-amber-250" 
                                        : flowerWrap === "blush" 
                                        ? "bg-rose-50/70 border-rose-200" 
                                        : "bg-neutral-50/60 border-neutral-300"
                                    }`}>
                                      <img 
                                        src={bouquetImg} 
                                        alt="Current bundle" 
                                        className="w-20 h-20 object-cover rounded-xl"
                                        
                                      />
                                      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex flex-col items-center">
                                        <span className={`px-2 py-0.5 rounded-full text-[6px] font-mono font-bold text-white shadow-xs ${
                                          flowerRibbon === "twine" 
                                            ? "bg-amber-850" 
                                            : flowerRibbon === "satin" 
                                            ? "bg-amber-500" 
                                            : "bg-rose-800"
                                        }`}>
                                          🎀 {flowerRibbon.toUpperCase()} TIE
                                        </span>
                                      </div>
                                    </div>

                                    <div className="mt-3.5 bg-amber-50/40 border border-amber-200/80 p-2.5 rounded shadow-[0_4px_12px_rgba(217,119,6,0.06)] max-w-[140px] w-full text-center relative">
                                      <div className="absolute top-1 left-1 w-1 h-1 rounded-full bg-amber-300" />
                                      <div className="absolute top-1 right-1 w-1 h-1 rounded-full bg-amber-300" />
                                      <span className="font-mono text-[5.5px] text-amber-600 block uppercase tracking-widest mb-1">LETTERPRESS NOTECARD</span>
                                      <p className="font-serif italic text-[8.5px] text-neutral-800 leading-tight break-words px-1 font-light min-h-[14px]">
                                        "{customCard || "..."}"
                                      </p>
                                    </div>
                                  </div>

                                  <div className="font-mono text-[6px] text-neutral-400 uppercase tracking-wider block z-10">
                                    WRAP: {flowerWrap.toUpperCase()} | TIE: {flowerRibbon.toUpperCase()}
                                  </div>
                                </div>

                                <div className="md:col-span-7 flex flex-col justify-between space-y-3.5 text-left">
                                  <div className="space-y-1">
                                    <label className="block font-mono text-[7.5px] font-bold text-neutral-400 uppercase tracking-wider">1. WRAPPING CANVAS</label>
                                    <div className="grid grid-cols-3 gap-1.5">
                                      {[
                                        { id: "kraft", label: "Organic Kraft", bg: "bg-amber-100 text-amber-900 border-amber-300" },
                                        { id: "blush", label: "Blush Pink", bg: "bg-rose-100 text-rose-900 border-rose-300" },
                                        { id: "silk", label: "Alabaster Silk", bg: "bg-neutral-150 text-neutral-800 border-neutral-350" }
                                      ].map((opt) => (
                                        <button
                                          key={opt.id}
                                          onClick={() => setFlowerWrap(opt.id as any)}
                                          className={`py-1.5 px-1 rounded-lg border text-[8.5px] font-mono font-bold text-center cursor-pointer transition-all ${
                                            flowerWrap === opt.id 
                                              ? `${opt.bg} shadow-xs scale-[1.02]` 
                                              : "bg-white border-neutral-200 text-neutral-400 hover:bg-neutral-50 hover:text-neutral-600"
                                          }`}
                                        >
                                          {opt.label.toUpperCase()}
                                        </button>
                                      ))}
                                    </div>
                                  </div>

                                  <div className="space-y-1">
                                    <label className="block font-mono text-[7.5px] font-bold text-neutral-400 uppercase tracking-wider">2. ATELIER RIBBON FINISH</label>
                                    <div className="grid grid-cols-3 gap-1.5">
                                      {[
                                        { id: "twine", label: "Rustic Twine", bg: "border-amber-800 text-amber-900" },
                                        { id: "satin", label: "Gold Satin", bg: "border-amber-500 text-amber-600" },
                                        { id: "velvet", label: "Crimson Velvet", bg: "border-rose-800 text-rose-800" }
                                      ].map((opt) => (
                                        <button
                                          key={opt.id}
                                          onClick={() => setFlowerRibbon(opt.id as any)}
                                          className={`py-1.5 px-1 rounded-lg border text-[8.5px] font-mono font-bold text-center cursor-pointer transition-all ${
                                            flowerRibbon === opt.id 
                                              ? `${opt.bg} bg-white shadow-xs font-black ring-1 ring-offset-1 ring-neutral-300 scale-[1.02]` 
                                              : "bg-white border-neutral-200 text-neutral-400 hover:bg-neutral-50 hover:text-neutral-600"
                                          }`}
                                        >
                                          {opt.label.toUpperCase()}
                                        </button>
                                      ))}
                                    </div>
                                  </div>

                                  <div className="space-y-1">
                                    <div className="flex justify-between items-center">
                                      <label className="block font-mono text-[7.5px] font-bold text-neutral-400 uppercase tracking-wider">3. HANDWRITTEN NOTE</label>
                                      <span className="font-mono text-[6.5px] text-neutral-300">{customCard.length}/40 CARACTÉRES</span>
                                    </div>
                                    <input
                                      type="text"
                                      value={customCard}
                                      onChange={(e) => setCustomCard(e.target.value.substring(0, 40))}
                                      placeholder="Write your brief sentiment..."
                                      className="w-full bg-white border border-neutral-200 rounded-lg px-3 py-1.5 text-[9px] font-mono text-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-900 placeholder:text-neutral-300"
                                    />
                                  </div>

                                  <button
                                    onClick={() => {
                                      setIsArrangementOrdered(true);
                                      setCartItems(prev => prev + 1);
                                    }}
                                    className="w-full bg-neutral-900 hover:bg-rose-950 text-white font-mono font-bold text-[9px] tracking-[0.15em] py-2.5 rounded-lg transition-colors cursor-pointer text-center uppercase"
                                  >
                                    ORDER BESPOKE ARRANGEMENT — $68.00
                                  </button>
                                </div>

                              </div>
                            </motion.div>
                          )}

                          <div className="mt-auto border-t border-neutral-100 bg-neutral-50/50 p-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-[8px] font-mono text-neutral-400 shrink-0 select-none text-center sm:text-left">
                            <span>© 2026 FLEUR & BOTANICA INC. — COPENHAGEN ATELIER</span>
                            <div className="flex items-center gap-2 text-neutral-500 font-bold">
                              <span>HAND-TIED WITH ORGANIC LOVE</span>
                              <span className="w-1 h-1 rounded-full bg-neutral-300" />
                              <span className="text-emerald-600 uppercase font-black tracking-wider flex items-center gap-1">
                                <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping" />
                                ONLINE
                              </span>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeService === "backend" && (
                  <motion.div
                    key="backend-box"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="space-y-6 flex-1 flex flex-col justify-between"
                    id="backend-sync-root"
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-[9px] font-mono text-neutral-400">
                        <span>SECURE TRANSACTION STATE</span>
                        <span className="text-teal-600 bg-teal-50 px-2 py-0.5 rounded border border-teal-100">PROV_ACTIVE: SUPABASE & FIREBASE</span>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-mono font-medium text-neutral-600">MUTABLE DATA ENTRY</label>
                        <div className="flex gap-2">
                          <input 
                            id="mutate-payload-input"
                            type="text" 
                            value={documentContent}
                            onChange={(e) => {
                              setDocumentContent(e.target.value);
                              if (syncStatus === "synced") setSyncStatus("idle");
                            }}
                            placeholder="Write secure database document payload..."
                            className="flex-1 bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20 text-neutral-800 font-mono transition-all"
                          />
                          <button
                            id="mutate-payload-btn"
                            onClick={triggerSyncSimulation}
                            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold tracking-wider transition-all cursor-pointer flex items-center gap-1.5 shadow-md hover:scale-[1.02] active:scale-[0.98] ${
                              syncStatus === "syncing"
                                ? "bg-teal-200 text-teal-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-teal-500 to-emerald-500 text-white"
                            }`}
                            disabled={syncStatus === "syncing"}
                          >
                            <CloudLightning className={`w-3.5 h-3.5 ${syncStatus === "syncing" ? "animate-bounce" : ""}`} />
                            MUTATE
                          </button>
                        </div>
                      </div>

                      <div className="p-5 bg-gradient-to-br from-teal-50/20 to-cyan-50/10 border border-teal-100 rounded-2xl relative flex items-center justify-between overflow-hidden shadow-inner">
                        
                        <div className="flex flex-col items-center gap-1.5 z-10">
                          <div className="w-12 h-12 rounded-full bg-white border border-neutral-200 shadow-md flex items-center justify-center relative">
                            <Monitor className="w-5 h-5 text-neutral-700" />
                            <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-blue-500 border-2 border-white animate-pulse" />
                          </div>
                          <span className="text-[9px] font-mono text-neutral-500 uppercase font-semibold">LOCAL CACHE</span>
                        </div>

                        <div className="flex-1 h-1 bg-neutral-100 mx-4 relative rounded-full overflow-visible">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-teal-300 opacity-40 rounded-full" />
                          
                          {syncStatus === "syncing" && (
                            <motion.div
                              initial={{ left: "0%" }}
                              animate={{ left: "100%" }}
                              transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 shadow-[0_0_12px_rgba(20,184,166,0.8)] z-10 flex items-center justify-center"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                            </motion.div>
                          )}
                        </div>

                        <div className="flex flex-col items-center gap-1.5 z-10">
                          <div className="relative">
                            {syncStatus === "synced" && (
                              <motion.div
                                initial={{ scale: 0.8, opacity: 0.5 }}
                                animate={{ scale: 1.8, opacity: 0 }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="absolute -inset-2 rounded-full bg-emerald-400/30 z-0 pointer-events-none"
                              />
                            )}

                            <div className={`w-12 h-12 rounded-full border shadow-md flex items-center justify-center transition-all duration-300 relative z-10 ${
                              syncStatus === "synced" 
                                ? "bg-gradient-to-br from-emerald-400 to-teal-500 border-transparent text-white shadow-[0_4px_14px_rgba(16,185,129,0.3)]" 
                                : syncStatus === "syncing" 
                                ? "bg-gradient-to-br from-amber-400 to-orange-500 border-transparent text-white animate-pulse" 
                                : "bg-white border-neutral-200 text-neutral-400"
                            }`}>
                              {syncStatus === "synced" ? <Check className="w-5 h-5" /> : <Database className="w-5 h-5" />}
                            </div>
                          </div>
                          <span className="text-[9px] font-mono text-neutral-500 uppercase font-semibold">CLOUD STORE</span>
                        </div>

                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[9px] font-mono text-neutral-400">
                        <span>TRANSACTION LEDGER & DATA STREAM</span>
                        {syncStatus === "synced" && (
                          <button 
                            id="reset-sync-btn"
                            onClick={resetSyncSimulation}
                            className="text-neutral-500 hover:text-teal-600 flex items-center gap-1 uppercase text-[8px] font-bold"
                          >
                            <RefreshCw className="w-2.5 h-2.5" /> RESET SYSTEM
                          </button>
                        )}
                      </div>
                      <div className="bg-neutral-950 rounded-xl p-4 font-mono text-[9.5px] leading-relaxed text-neutral-300 min-h-[120px] max-h-[120px] overflow-y-auto border border-neutral-900 shadow-md">
                        {syncLogs.map((log, index) => (
                          <div 
                            key={index} 
                            className={`flex gap-1.5 ${
                              log.includes("STATE_SYNCHRONIZED") 
                                ? "text-emerald-400 font-bold" 
                                : log.includes("MUTATION_TRIGGERED") 
                                ? "text-amber-400"
                                : log.includes("payload") 
                                ? "text-sky-300"
                                : log.includes("credentials") 
                                ? "text-neutral-400" 
                                : "text-sky-300"
                            }`}
                          >
                            <span className="text-neutral-600 select-none">&gt;&gt;</span>
                            <span>{log}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeService === "email" && (
                  <motion.div
                    key="email-box"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="space-y-6 flex-1 flex flex-col justify-between"
                    id="email-tester-root"
                  >
                    <div>
                      <div className="flex justify-between items-center text-[9px] font-mono text-neutral-400 mb-3">
                        <span>CLIENT RENDERER EMULATOR</span>
                        <span className="text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">STRICT TABLE COMPLIANCE: 100%</span>
                      </div>

                      <div className="grid grid-cols-3 gap-1 p-1 bg-neutral-100 rounded-lg mb-4">
                        {(["gmail", "outlook", "yahoo"] as const).map((client) => {
                          const isSelected = emailClient === client;
                          let activeStyle = "";
                          
                          if (isSelected) {
                            if (client === "gmail") activeStyle = "bg-[#ea4335] text-white shadow-md";
                            else if (client === "outlook") activeStyle = "bg-[#0078d4] text-white shadow-md";
                            else activeStyle = "bg-[#6001d2] text-white shadow-md";
                          } else {
                            activeStyle = "text-neutral-600 hover:text-neutral-900";
                          }

                          return (
                            <button
                              key={client}
                              id={`email-client-btn-${client}`}
                              onClick={() => setEmailClient(client)}
                              className={`py-1.5 text-[10px] font-mono tracking-wider font-semibold rounded-md text-center cursor-pointer transition-all ${activeStyle}`}
                            >
                              {client === "gmail" ? "GMAIL APP" : client === "outlook" ? "OUTLOOK 2016" : "YAHOO MAIL"}
                            </button>
                          );
                        })}
                      </div>

                      <div className="bg-gradient-to-b from-neutral-50 to-neutral-100 rounded-xl border border-neutral-200 p-5 min-h-[420px] max-h-[500px] overflow-y-auto relative transition-all duration-300 shadow-inner">
                        
                        {emailClient === "gmail" && (
                          <div className="space-y-3.5 font-sans text-xs text-neutral-700">
                            <div className="flex items-center gap-2 pb-2.5 border-b border-rose-100">
                              <div className="w-6 h-6 rounded-full bg-rose-600 flex items-center justify-center text-white font-serif font-bold text-xs">A</div>
                              <div className="flex-1">
                                <div className="font-bold text-neutral-900 text-[10.5px] leading-tight">Your Valentine Invitation — Maison Amour</div>
                                <div className="text-[7.5px] text-neutral-400 font-mono">From: concierge@maisonamour.com | To: muse@elegance.com</div>
                              </div>
                            </div>

                            <div className="bg-white rounded-2xl border border-rose-50/60 p-4 shadow-xs space-y-4">
                              <div className="text-center py-1">
                                <span className="font-serif text-lg font-light tracking-[0.25em] text-rose-950">MAISON AMOUR</span>
                                <div className="text-[7px] font-mono text-rose-500 tracking-[0.3em] uppercase mt-0.5">VALENTINE SPECIAL CAPSULE</div>
                              </div>

                              <div className="relative rounded-xl overflow-hidden aspect-[4/3] max-h-[160px] border border-rose-50 mx-auto max-w-[280px] w-full">
                                <img 
                                  src={valentineEmailImg} 
                                  alt="Valentine Luxury Collection" 
                                  className="w-full h-full object-cover"
                                  
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-rose-950/70 via-rose-950/20 to-transparent flex items-end p-3 text-left">
                                  <div>
                                    <span className="text-[7px] font-mono text-rose-200 tracking-wider uppercase font-semibold">limited edition</span>
                                    <h4 className="text-xs font-serif font-medium text-white tracking-wide">The Romantic Silks & Tailored Velvets</h4>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-2 text-center px-2">
                                <h5 className="font-serif text-[11px] text-rose-900 font-medium tracking-wide">
                                  Bespoke Elegance for Unforgettable Moments
                                </h5>
                                <p className="text-[9.5px] text-neutral-500 leading-relaxed font-light">
                                  Celebrate the poetry of love with our curated Valentine's collection. Beautiful fluid silk shirts, deep crimson tailored velvet jackets, and timeless accessories designed to inspire passion and grace.
                                </p>
                                
                                <div className="my-3 py-2 px-3 bg-rose-50/50 rounded-lg border border-dashed border-rose-200 inline-block">
                                  <span className="block text-[7px] font-mono text-rose-400 uppercase tracking-widest">exclusive invitation code</span>
                                  <span className="text-xs font-mono font-bold text-rose-700 tracking-wider">AMOUR25</span>
                                  <span className="block text-[7px] text-rose-500 mt-0.5">FOR 25% SAVINGS + PRIVATE ATELIER PACKAGING</span>
                                </div>
                              </div>

                              <div className="text-center pt-1">
                                <span className="bg-rose-950 hover:bg-rose-900 text-white text-[8px] font-mono font-bold tracking-[0.2em] px-5 py-2.5 rounded-lg inline-block shadow-sm transition-all cursor-pointer">
                                  EXPLORE THE CAPSULE
                                </span>
                              </div>
                            </div>

                            <p className="text-[8px] text-neutral-400 text-center uppercase tracking-widest font-mono">
                              Responsive Media Queries [ENABLED] - Fluent Flex Rows
                            </p>
                          </div>
                        )}

                        {emailClient === "outlook" && (
                          <div className="space-y-3.5 font-sans text-xs text-neutral-700">
                            <div className="flex items-center gap-2 pb-2.5 border-b border-blue-100">
                              <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white font-serif font-bold text-xs">A</div>
                              <div className="flex-1">
                                <div className="font-bold text-neutral-900 text-[10.5px] leading-tight">Your Valentine Invitation — Maison Amour [Outlook Safe]</div>
                                <div className="text-[7.5px] text-neutral-400 font-mono">From: concierge@maisonamour.com | To: muse@elegance.com</div>
                              </div>
                            </div>

                            <div className="bg-white rounded-2xl border border-blue-50 p-4 shadow-xs space-y-4">
                              <div className="flex justify-between items-center bg-blue-50/50 px-2 py-1 rounded-md border border-blue-100/60 select-none">
                                <span className="text-[7.5px] font-mono text-blue-700 font-bold">MSO NESTED GRID RENDER ACTIVE</span>
                                <span className="text-[6.5px] font-mono bg-blue-600 text-white px-1.5 py-0.5 rounded-full uppercase tracking-wider">Perfect 600px Width</span>
                              </div>

                              <div className="text-center py-1">
                                <span className="font-serif text-lg font-light tracking-[0.25em] text-rose-950">MAISON AMOUR</span>
                                <div className="text-[7px] font-mono text-rose-500 tracking-[0.3em] uppercase mt-0.5">VALENTINE SPECIAL CAPSULE</div>
                              </div>

                              <div className="relative rounded-xl overflow-hidden aspect-[4/3] max-h-[160px] border border-rose-50 mx-auto max-w-[280px] w-full">
                                <img 
                                  src={valentineEmailImg} 
                                  alt="Valentine Luxury Collection" 
                                  className="w-full h-full object-cover"
                                  
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-rose-950/70 via-rose-950/20 to-transparent flex items-end p-3 text-left">
                                  <div>
                                    <span className="text-[7px] font-mono text-rose-200 tracking-wider uppercase font-semibold">limited edition</span>
                                    <h4 className="text-xs font-serif font-medium text-white tracking-wide">The Romantic Silks & Tailored Velvets</h4>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-2 text-center px-2">
                                <h5 className="font-serif text-[11px] text-rose-900 font-medium tracking-wide">
                                  Bespoke Elegance for Unforgettable Moments
                                </h5>
                                <p className="text-[9.5px] text-neutral-500 leading-relaxed font-light">
                                  Celebrate the poetry of love with our curated Valentine's collection. Beautiful fluid silk shirts, deep crimson tailored velvet jackets, and timeless accessories designed to inspire passion and grace.
                                </p>
                                
                                <div className="my-3 py-2 px-3 bg-rose-50/50 rounded-lg border border-dashed border-rose-200 inline-block">
                                  <span className="block text-[7px] font-mono text-rose-400 uppercase tracking-widest">exclusive invitation code</span>
                                  <span className="text-xs font-mono font-bold text-rose-700 tracking-wider">AMOUR25</span>
                                  <span className="block text-[7px] text-rose-500 mt-0.5">FOR 25% SAVINGS + PRIVATE ATELIER PACKAGING</span>
                                </div>
                              </div>

                              <div className="text-center pt-1">
                                <span className="bg-rose-950 hover:bg-rose-900 text-white text-[8px] font-mono font-bold tracking-[0.2em] px-5 py-2.5 rounded-lg inline-block shadow-sm transition-all cursor-pointer">
                                  EXPLORE THE CAPSULE
                                </span>
                              </div>
                            </div>

                            <p className="text-[8px] text-neutral-400 text-center uppercase tracking-widest font-mono">
                              MSO Table Grid Compatibility [ENABLED] - Flawless Outlook Desktop Render
                            </p>
                          </div>
                        )}

                        {emailClient === "yahoo" && (
                          <div className="space-y-3.5 font-sans text-xs text-neutral-700">
                            <div className="flex items-center gap-2 pb-2.5 border-b border-purple-100">
                              <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-white font-serif font-bold text-xs">A</div>
                              <div className="flex-1">
                                <div className="font-bold text-neutral-900 text-[10.5px] leading-tight">Your Valentine Invitation — Maison Amour [Yahoo Compliant]</div>
                                <div className="text-[7.5px] text-neutral-400 font-mono">From: concierge@maisonamour.com | To: muse@elegance.com</div>
                              </div>
                            </div>

                            <div className="bg-white rounded-2xl border border-purple-50 p-4 shadow-xs space-y-4">
                              <div className="flex justify-between items-center bg-purple-50/50 px-2 py-1 rounded-md border border-purple-100/60 select-none">
                                <span className="text-[7.5px] font-mono text-purple-700 font-bold">ABSOLUTE INLINE CSS INJECTED</span>
                                <span className="text-[6.5px] font-mono bg-purple-600 text-white px-1.5 py-0.5 rounded-full uppercase tracking-wider">Parser Approved</span>
                              </div>

                              <div className="text-center py-1">
                                <span className="font-serif text-lg font-light tracking-[0.25em] text-rose-950">MAISON AMOUR</span>
                                <div className="text-[7px] font-mono text-rose-500 tracking-[0.3em] uppercase mt-0.5">VALENTINE SPECIAL CAPSULE</div>
                              </div>

                              <div className="relative rounded-xl overflow-hidden aspect-[4/3] max-h-[160px] border border-rose-50 mx-auto max-w-[280px] w-full">
                                <img 
                                  src={valentineEmailImg} 
                                  alt="Valentine Luxury Collection" 
                                  className="w-full h-full object-cover"
                                  
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-rose-950/70 via-rose-950/20 to-transparent flex items-end p-3 text-left">
                                  <div>
                                    <span className="text-[7px] font-mono text-rose-200 tracking-wider uppercase font-semibold">limited edition</span>
                                    <h4 className="text-xs font-serif font-medium text-white tracking-wide">The Romantic Silks & Tailored Velvets</h4>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-2 text-center px-2">
                                <h5 className="font-serif text-[11px] text-rose-900 font-medium tracking-wide">
                                  Bespoke Elegance for Unforgettable Moments
                                </h5>
                                <p className="text-[9.5px] text-neutral-500 leading-relaxed font-light">
                                  Celebrate the poetry of love with our curated Valentine's collection. Beautiful fluid silk shirts, deep crimson tailored velvet jackets, and timeless accessories designed to inspire passion and grace.
                                </p>
                                
                                <div className="my-3 py-2 px-3 bg-rose-50/50 rounded-lg border border-dashed border-rose-200 inline-block">
                                  <span className="block text-[7px] font-mono text-rose-400 uppercase tracking-widest">exclusive invitation code</span>
                                  <span className="text-xs font-mono font-bold text-rose-700 tracking-wider">AMOUR25</span>
                                  <span className="block text-[7px] text-rose-500 mt-0.5">FOR 25% SAVINGS + PRIVATE ATELIER PACKAGING</span>
                                </div>
                              </div>

                              <div className="text-center pt-1">
                                <span className="bg-rose-950 hover:bg-rose-900 text-white text-[8px] font-mono font-bold tracking-[0.2em] px-5 py-2.5 rounded-lg inline-block shadow-sm transition-all cursor-pointer">
                                  EXPLORE THE CAPSULE
                                </span>
                              </div>
                            </div>

                            <p className="text-[8px] text-neutral-400 text-center uppercase tracking-widest font-mono">
                              CSS Inlining Safeguard [ENABLED] - Perfect Yahoo Mail Web rendering
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-4 bg-amber-50/30 rounded-xl border border-amber-100 flex flex-wrap gap-x-6 gap-y-2.5 text-[10px] font-mono text-neutral-500 justify-between items-center">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-neutral-700 font-semibold">OUTLOOK MSO COMPLIANT</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-neutral-700 font-semibold">CSS INLINING SECURED</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeService === "android" && (
                  <AndroidIssueViewer
                    compileState={compileState}
                    setCompileState={setCompileState}
                    compileProgress={compileProgress}
                    setCompileProgress={setCompileProgress}
                    triggerKotlinCompiler={triggerKotlinCompiler}
                  />
                )}
              </AnimatePresence>

            </div>

            <div className="px-5 py-3.5 bg-neutral-900 text-neutral-400 border-t border-neutral-950 flex justify-between items-center font-mono text-[8px] select-none shrink-0 relative z-10">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Cpu className="w-2.5 h-2.5 text-neutral-500" />
                  HQ_COPENHAGEN
                </span>
                <span className="w-[1px] h-2.5 bg-neutral-800" />
                <span>SYS_VER_1.0.9</span>
              </div>
              <span className="text-neutral-500">DIRECT COMPILATION MODE</span>
            </div>

          </div>

          <div className="mt-4 flex flex-wrap gap-1.5 justify-end relative z-10 animate-fade-in" id="service-tech-badges">
            {services.find(s => s.id === activeService)?.technologies.map((tech, i) => (
              <span 
                key={i}
                className={`font-mono text-[8px] tracking-widest uppercase border px-2.5 py-1 rounded-md bg-white/70 backdrop-blur-md transition-all duration-500 font-semibold ${
                  activeService === "frontend" 
                    ? "text-violet-600 border-violet-100 shadow-[0_2px_8px_rgba(139,92,246,0.05)]" 
                    : activeService === "backend" 
                    ? "text-teal-600 border-teal-100 shadow-[0_2px_8px_rgba(20,184,166,0.05)]" 
                    : activeService === "email" 
                    ? "text-amber-600 border-amber-100 shadow-[0_2px_8px_rgba(245,158,11,0.05)]" 
                    : "text-cyan-600 border-cyan-100 shadow-[0_2px_8px_rgba(6,182,212,0.05)]"
                }`}
              >
                {tech}
              </span>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};
