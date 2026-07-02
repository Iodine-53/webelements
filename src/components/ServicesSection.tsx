import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Lottie from "lottie-react";
import servicesLottieData from "../assets/services_tech.json";
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
  ChevronRight
} from "lucide-react";

type ServiceID = "frontend" | "backend" | "email" | "android";

interface ServiceItem {
  id: ServiceID;
  title: string;
  category: string;
  icon: React.ComponentType<any>;
  shortDesc: string;
  longDesc: string;
  technologies: string[];
}

export const ServicesSection: React.FC = () => {
  const [activeService, setActiveService] = useState<ServiceID>("frontend");

  // State for Frontend Playground
  const [fontSize, setFontSize] = useState<number>(20);
  const [tracking, setTracking] = useState<string>("tracking-tight");
  const [fontWeight, setFontWeight] = useState<string>("font-normal");
  const [waveSpeed, setWaveSpeed] = useState<number>(1);
  const [waveAmp, setWaveAmp] = useState<number>(30);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // State for Backend Sync Simulator
  const [syncStatus, setSyncStatus] = useState<"idle" | "syncing" | "synced">("idle");
  const [syncLogs, setSyncLogs] = useState<string[]>([
    "System idle. Ready for database mutation."
  ]);
  const [documentContent, setDocumentContent] = useState<string>("Project status: launch sequence initiated");

  // State for HTML Email Compatibility
  const [emailClient, setEmailClient] = useState<"gmail" | "outlook" | "yahoo">("gmail");

  // State for Android Kotlin Diagnostic
  const [selectedIssue, setSelectedIssue] = useState<number>(0);
  const [compileState, setCompileState] = useState<"idle" | "compiling" | "success">("idle");
  const [compileProgress, setCompileProgress] = useState<number>(0);

  // ----------------------------------------------------
  // List of services
  // ----------------------------------------------------
  const services: ServiceItem[] = [
    {
      id: "frontend",
      title: "Tactile Frontend & UI Craft",
      category: "DESIGN & COMPUTATIONAL IMPLEMENTATION",
      icon: Code,
      shortDesc: "Bespoke, high-precision interfaces engineered with fine typography calibration, strict layout geometry, and physics-based fluid motion.",
      longDesc: "Crafting client-side experiences that feel responsive and physical. Integrating robust component models with fine design system tokens, CSS variable mechanics, and hardware-accelerated animations to keep frame rates locked at 60fps.",
      technologies: ["React 19 / TypeScript", "Vite & Modern Bundling", "Tailwind CSS Architecture", "Framer Motion Dynamics", "HTML5 Canvas Physics"]
    },
    {
      id: "backend",
      title: "Cloud Services & Server Integration",
      category: "DURABLE PERSISTENCE & USER STATE",
      icon: Database,
      shortDesc: "Establishing cloud-hosted, secure database infrastructures, dynamic server logic, and robust real-time synchronizations.",
      longDesc: "Designing dynamic systems powered by Firebase (Firestore, Authentication, Cloud Functions) and Supabase (PostgreSQL, Realtime, Row-Level Security). Building secure database schemas and seamless API layers so users never experience data loss.",
      technologies: ["Firebase Suite", "Supabase Backend", "PostgreSQL Schemas", "Row-Level Security (RLS)", "Offline-First Sync Engines"]
    },
    {
      id: "email",
      title: "Bulletproof HTML Email Engineering",
      category: "RETRO-COMPATIBILITY & MULTI-CLIENT DESIGN",
      icon: Mail,
      shortDesc: "Architecting responsive, pristine HTML newsletters engineered to withstand strict rendering engines like Microsoft Outlook.",
      longDesc: "Building custom nested-table layouts with inlined CSS, strict conditional MSO formatting, and fallback layouts. Rigorously tested to render flawlessly across Apple Mail, Gmail, Yahoo, and vintage legacy desktop Outlook applications.",
      technologies: ["Nested Table Geometry", "Inline CSS Compiling", "Outlook (MSO) Fallbacks", "Media Query Breakpoints", "Litmus & Email Testing"]
    },
    {
      id: "android",
      title: "Native Android & Kotlin Adjustments",
      category: "MOBILE LINTING, GRADLE & JETPACK COMPOSE",
      icon: Smartphone,
      shortDesc: "Fixing core JVM errors, Gradle sync bottlenecks, Compose UI constraints, and mobile activity lifecycle issues.",
      longDesc: "Debugging existing Android Kotlin codebases to solve minor Gradle dependencies conflicts, Gradle-JVM version mismatches, memory leaks in Coroutine lifecycle scopes, and styling issues inside declarative Jetpack Compose interfaces.",
      technologies: ["Kotlin / JVM", "Jetpack Compose", "Gradle Dependency Audits", "Lifecycle & Coroutines", "UI Constraint Debugging"]
    }
  ];

  // ----------------------------------------------------
  // Animation loop for Frontend wave canvas
  // ----------------------------------------------------
  useEffect(() => {
    if (activeService !== "frontend") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let angle = 0;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;

      // Draw horizontal baseline
      ctx.strokeStyle = "rgba(115, 115, 115, 0.1)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(20, h / 2);
      ctx.lineTo(w - 20, h / 2);
      ctx.stroke();

      // Render math sine wave
      ctx.strokeStyle = "rgba(23, 23, 23, 0.85)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();

      for (let x = 20; x < w - 20; x++) {
        // Equation mapping: y = sin(x * frequency + phase) * amplitude + midPoint
        const y = Math.sin((x * 0.015) + angle) * waveAmp + (h / 2);
        if (x === 20) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Render flowing nodes on wave peaks
      ctx.fillStyle = "rgba(23, 23, 23, 1)";
      for (let i = 0; i < 5; i++) {
        const xPos = 40 + i * ((w - 80) / 4);
        const yPos = Math.sin((xPos * 0.015) + angle) * waveAmp + (h / 2);
        ctx.beginPath();
        ctx.arc(xPos, yPos, 4, 0, Math.PI * 2);
        ctx.fill();

        // Connect a vertical coordinate marker line
        ctx.strokeStyle = "rgba(115, 115, 115, 0.15)";
        ctx.setLineDash([2, 3]);
        ctx.beginPath();
        ctx.moveTo(xPos, h / 2);
        ctx.lineTo(xPos, yPos);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      angle += 0.015 * waveSpeed;
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [activeService, waveSpeed, waveAmp]);

  // ----------------------------------------------------
  // Backend database sync simulation logic
  // ----------------------------------------------------
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

  // ----------------------------------------------------
  // Android Kotlin Debugger Mock Database
  // ----------------------------------------------------
  const androidIssues = [
    {
      title: "Unresolved Compose View State",
      errorSnippet: `// ❌ COMPILER ERROR: Type mismatch
@Composable
fun MainScreen() {
    val state = remember { mutableStateOf("Vance") }
    // Error: Val cannot be reassigned or reading incorrectly
    TextField(value = state, onValueChange = { state = it }) 
}`,
      fixedSnippet: `//  COMPILE SUCCESSFUL (State Delegates resolved)
@Composable
fun MainScreen() {
    // Correctly using delegated property syntax:
    var state by remember { mutableStateOf("Vance") }
    
    TextField(value = state, onValueChange = { state = it })
}`
    },
    {
      title: "Coroutine Leak in lifecycleScope",
      errorSnippet: `// ❌ WARNING: Potential Memory Leak inside Fragment
override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
    // Launching globally without scope cancellation triggers leaks
    GlobalScope.launch {
        viewModel.analyticsFlow.collect { renderData(it) }
    }
}`,
      fixedSnippet: `//  COMPILE SUCCESSFUL (Lifecycle-aware collect)
override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
    // Scope safely binds directly to view lifecycle:
    viewLifecycleOwner.lifecycleScope.launch {
        viewLifecycleOwner.repeatOnLifecycle(Lifecycle.State.STARTED) {
            viewModel.analyticsFlow.collect { renderData(it) }
        }
    }
}`
    },
    {
      title: "Gradle Dependency JVM Incompat",
      errorSnippet: `// ❌ BUILD ERROR: Gradle sync failed
android {
    compileSdk = 34
    kotlinOptions {
        // Error: target JVM is incompatible with compiler JDK 21
        jvmTarget = "1.8" 
    }
}`,
      fixedSnippet: `//  COMPILE SUCCESSFUL (JVM Targets Synchronized)
android {
    compileSdk = 34
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions {
        // Perfectly aligned JVM targets
        jvmTarget = "17"
    }
}`
    }
  ];

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
    }, 100);
  };

  useEffect(() => {
    setCompileState("idle");
    setCompileProgress(0);
  }, [selectedIssue]);

  return (
    <div className="w-full border-t border-neutral-200/80 pt-16 md:pt-24 pb-16 relative">
      <div className="absolute top-0 left-0 h-full w-[1px] bg-neutral-200/30 pointer-events-none" />
      <div className="absolute top-0 right-0 h-full w-[1px] bg-neutral-200/30 pointer-events-none" />

      {/* Section Title */}
      <div className="mb-12 md:mb-16 border-b border-neutral-200 pb-4 flex items-baseline justify-between">
        <h2 className="font-display font-medium text-xs tracking-widest text-neutral-400 uppercase">
          02 // SPECIALIST SERVICES
        </h2>
        <span className="font-mono text-[10px] text-neutral-500">
          [CAPABILITIES: 04 ACTIVE]
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
        {/* ================= LEFT COLUMN: SERVICE SELECTORS ================= */}
        <div className="lg:col-span-5 space-y-4">
          <div className="max-w-xl">
            <h3 className="font-display font-bold text-3xl sm:text-4xl text-neutral-950 tracking-tight leading-[1.1] mb-6">
              Precision services calibrated for modern <span className="font-serif italic font-normal text-neutral-800">interfaces</span> and secure <span className="font-serif italic font-normal text-neutral-800">systems</span>.
            </h3>
            <p className="font-sans text-neutral-500 text-sm leading-relaxed font-light mb-8">
              Bridging the boundary between visual art direction and rigid logic. I collaborate on clean code, secure backend integration, and meticulous cross-platform compliance.
            </p>
          </div>

          <div className="space-y-3">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              const isActive = activeService === service.id;

              return (
                <button
                  key={service.id}
                  onClick={() => setActiveService(service.id)}
                  className={`w-full text-left p-5 rounded-xl border transition-all duration-300 relative group overflow-hidden cursor-pointer ${
                    isActive 
                      ? "bg-white border-neutral-900 shadow-[0_10px_30px_rgba(0,0,0,0.03)]" 
                      : "bg-white/50 border-neutral-200/60 hover:bg-white hover:border-neutral-300 hover:shadow-xs"
                  }`}
                >
                  {/* Subtle active colored vertical bar */}
                  <div 
                    className={`absolute left-0 top-0 h-full w-[3px] transition-all duration-300 ${
                      isActive ? "bg-neutral-900" : "bg-transparent group-hover:bg-neutral-300"
                    }`} 
                  />

                  <div className="flex items-start gap-4">
                    <div className={`p-2.5 rounded-lg border transition-colors ${
                      isActive 
                        ? "bg-neutral-900 text-white border-neutral-900" 
                        : "bg-neutral-50 text-neutral-500 border-neutral-100 group-hover:text-neutral-950 group-hover:border-neutral-200"
                    }`}>
                      <IconComponent className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-mono text-[8px] text-neutral-400 font-medium uppercase tracking-widest">
                          {service.category}
                        </span>
                        <span className="font-mono text-[9px] text-neutral-300">
                          [0{index + 1}]
                        </span>
                      </div>
                      
                      <h4 className="font-display font-semibold text-sm text-neutral-900 mb-1.5 flex items-center gap-1.5 group-hover:text-neutral-950">
                        {service.title}
                        <ArrowRight className={`w-3 h-3 transition-transform duration-300 ${
                          isActive ? "translate-x-1 opacity-100" : "opacity-0 -translate-x-1 group-hover:opacity-40 group-hover:translate-x-0"
                        }`} />
                      </h4>
                      
                      <p className="text-neutral-500 text-xs leading-normal font-light">
                        {service.shortDesc}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= RIGHT COLUMN: INTERACTIVE SANDBOX ================= */}
        <div className="lg:col-span-7 flex flex-col h-full lg:sticky lg:top-28">
          
          {/* Main Display Frame */}
          <div className="w-full bg-white border border-neutral-200 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col min-h-[460px]">
            
            {/* Simulation HUD Bar */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-neutral-50 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neutral-900 animate-pulse" />
                <span className="font-mono text-[9px] text-neutral-800 font-semibold uppercase tracking-wider">
                  SANDBOX // {activeService}_COMPLIANCE_TEST
                </span>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[8px] text-neutral-400">
                <span>REACTIVE STATUS</span>
                <span className="text-emerald-500 font-bold">● OK</span>
              </div>
            </div>

            {/* Sandbox Main Area */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between bg-radial-[circle_at_50%_0%] from-neutral-50/20 via-transparent to-transparent">
              
              <AnimatePresence mode="wait">
                {/* ================= 1. FRONTEND PLAYGROUND ================= */}
                {activeService === "frontend" && (
                  <motion.div
                    key="frontend-box"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6 flex-1 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="font-mono text-[9px] text-neutral-400 uppercase">SYSTEM DIAGNOSTIC: INTERACTIVE LAYOUT RULES</span>
                      </div>
                      
                      {/* Interactive Typography Preview */}
                      <div className="p-5 bg-neutral-50/50 border border-neutral-150 rounded-xl flex items-center justify-center min-h-[140px] text-center overflow-hidden transition-all duration-300">
                        <p className={`text-neutral-950 transition-all duration-200 max-w-md select-none ${fontWeight} ${tracking}`} style={{ fontSize: `${fontSize}px` }}>
                          "Designing interfaces with architectural <span className="font-serif italic font-normal">soul</span> and computational <span className="font-serif italic font-normal">rigor</span>."
                        </p>
                      </div>
                    </div>

                    {/* Canvas Wave Visualizer */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[9px] font-mono text-neutral-400">
                        <span>MATHEMATICAL VECTOR COORDINATE (SINE WAVE)</span>
                        <span>{(waveSpeed * 60).toFixed(0)} Hz REF_CLOCK</span>
                      </div>
                      <div className="bg-neutral-50 rounded-xl border border-neutral-150 h-24 overflow-hidden relative">
                        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
                      </div>
                    </div>

                    {/* Sliders Control Panel */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-100">
                      <div className="space-y-3">
                        {/* Font Size Slider */}
                        <div>
                          <div className="flex justify-between font-mono text-[9px] text-neutral-400 mb-1">
                            <span>FONT SIZE SCALE</span>
                            <span className="text-neutral-700">{fontSize}px</span>
                          </div>
                          <input 
                            type="range" 
                            min="14" 
                            max="30" 
                            value={fontSize} 
                            onChange={(e) => setFontSize(Number(e.target.value))}
                            className="w-full accent-neutral-900 cursor-pointer h-1 bg-neutral-100 rounded-lg appearance-none"
                          />
                        </div>

                        {/* Letter Spacing Options */}
                        <div>
                          <span className="block font-mono text-[9px] text-neutral-400 mb-1.5 uppercase">LETTER SPACING (TRACKING)</span>
                          <div className="grid grid-cols-3 gap-1">
                            {["tracking-tight", "tracking-normal", "tracking-widest"].map((t) => (
                              <button
                                key={t}
                                onClick={() => setTracking(t)}
                                className={`py-1 text-[9px] font-mono rounded-md border text-center cursor-pointer transition-all ${
                                  tracking === t 
                                    ? "bg-neutral-900 border-neutral-900 text-white font-medium" 
                                    : "bg-white border-neutral-200 text-neutral-500 hover:text-neutral-800"
                                }`}
                              >
                                {t.replace("tracking-", "").toUpperCase()}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {/* Wave speed slider */}
                        <div>
                          <div className="flex justify-between font-mono text-[9px] text-neutral-400 mb-1">
                            <span>WAVE COMPRESSION SPEED</span>
                            <span className="text-neutral-700">{waveSpeed.toFixed(1)}x</span>
                          </div>
                          <input 
                            type="range" 
                            min="0.2" 
                            max="3" 
                            step="0.1"
                            value={waveSpeed} 
                            onChange={(e) => setWaveSpeed(Number(e.target.value))}
                            className="w-full accent-neutral-900 cursor-pointer h-1 bg-neutral-100 rounded-lg appearance-none"
                          />
                        </div>

                        {/* Font Weight */}
                        <div>
                          <span className="block font-mono text-[9px] text-neutral-400 mb-1.5 uppercase">FONT WEIGHT TOKENS</span>
                          <div className="grid grid-cols-3 gap-1">
                            {["font-light", "font-normal", "font-bold"].map((w) => (
                              <button
                                key={w}
                                onClick={() => setFontWeight(w)}
                                className={`py-1 text-[9px] font-mono rounded-md border text-center cursor-pointer transition-all ${
                                  fontWeight === w 
                                    ? "bg-neutral-900 border-neutral-900 text-white font-medium" 
                                    : "bg-white border-neutral-200 text-neutral-500 hover:text-neutral-800"
                                }`}
                              >
                                {w.replace("font-", "").toUpperCase()}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ================= 2. BACKEND SYNC SIMULATOR ================= */}
                {activeService === "backend" && (
                  <motion.div
                    key="backend-box"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6 flex-1 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-[9px] font-mono text-neutral-400">
                        <span>SECURE DOCUMENT STATE</span>
                        <span>PROVIDER: SUPABASE / FIREBASE</span>
                      </div>

                      {/* Mock Input Field */}
                      <div className="space-y-1">
                        <label className="block text-[10px] font-mono text-neutral-400">MOCK DOCUMENT CONTENT</label>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            value={documentContent}
                            onChange={(e) => {
                              setDocumentContent(e.target.value);
                              if (syncStatus === "synced") setSyncStatus("idle");
                            }}
                            placeholder="Write document content..."
                            className="flex-1 bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-neutral-950 text-neutral-800 font-mono"
                          />
                          <button
                            onClick={triggerSyncSimulation}
                            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold tracking-wider transition-all cursor-pointer flex items-center gap-1.5 shadow-xs ${
                              syncStatus === "syncing"
                                ? "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                                : "bg-neutral-900 text-white hover:bg-neutral-800"
                            }`}
                            disabled={syncStatus === "syncing"}
                          >
                            <CloudLightning className={`w-3.5 h-3.5 ${syncStatus === "syncing" ? "animate-bounce" : ""}`} />
                            MUTATE
                          </button>
                        </div>
                      </div>

                      {/* Visual Flow chart of state */}
                      <div className="p-4 bg-neutral-50/50 border border-neutral-150 rounded-xl relative flex items-center justify-between overflow-hidden">
                        
                        {/* Client Node */}
                        <div className="flex flex-col items-center gap-1 z-10">
                          <div className="w-10 h-10 rounded-full bg-white border border-neutral-200 shadow-xs flex items-center justify-center">
                            <Monitor className="w-4 h-4 text-neutral-600" />
                          </div>
                          <span className="text-[9px] font-mono text-neutral-400 uppercase">CLIENT CACHE</span>
                        </div>

                        {/* Animated pipe path */}
                        <div className="flex-1 h-0.5 bg-neutral-200 mx-4 relative overflow-hidden">
                          {syncStatus === "syncing" && (
                            <div className="absolute top-0 left-0 h-full w-12 bg-neutral-900 animate-[shimmer_1s_infinite_linear]" style={{
                              backgroundImage: "linear-gradient(90deg, transparent, rgba(0,0,0,0.8), transparent)",
                              animationDuration: "1s"
                            }} />
                          )}
                        </div>

                        {/* Database Sync Icon Indicator */}
                        <div className="flex flex-col items-center gap-1 z-10">
                          <div className={`w-10 h-10 rounded-full border shadow-sm flex items-center justify-center transition-all duration-300 ${
                            syncStatus === "synced" 
                              ? "bg-emerald-500 border-emerald-500 text-white" 
                              : syncStatus === "syncing" 
                              ? "bg-amber-500 border-amber-500 text-white animate-pulse" 
                              : "bg-white border-neutral-200 text-neutral-400"
                          }`}>
                            {syncStatus === "synced" ? <Check className="w-5 h-5" /> : <Database className="w-4 h-4" />}
                          </div>
                          <span className="text-[9px] font-mono text-neutral-400 uppercase">CLOUD DATASTORE</span>
                        </div>

                      </div>
                    </div>

                    {/* Console/Terminal Logs */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[9px] font-mono text-neutral-400">
                        <span>TRANSACTION LEDGER & LOGS</span>
                        {syncStatus === "synced" && (
                          <button 
                            onClick={resetSyncSimulation}
                            className="text-neutral-500 hover:text-neutral-900 flex items-center gap-1 uppercase"
                          >
                            <RefreshCw className="w-2.5 h-2.5" /> RESET
                          </button>
                        )}
                      </div>
                      <div className="bg-neutral-900 rounded-xl p-4 font-mono text-[9.5px] leading-relaxed text-neutral-300 min-h-[120px] max-h-[120px] overflow-y-auto border border-neutral-800">
                        {syncLogs.map((log, index) => (
                          <div 
                            key={index} 
                            className={`flex gap-1.5 ${
                              log.includes("STATE_SYNCHRONIZED") 
                                ? "text-emerald-400" 
                                : log.includes("vance") 
                                ? "text-sky-300" 
                                : log.includes("credentials") 
                                ? "text-neutral-400" 
                                : "text-neutral-300"
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

                {/* ================= 3. HTML EMAIL CLIENT TESTER ================= */}
                {activeService === "email" && (
                  <motion.div
                    key="email-box"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6 flex-1 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-center text-[9px] font-mono text-neutral-400 mb-3">
                        <span>RENDERER EMULATOR</span>
                        <span>FALLBACK SCORE: 100% PASS</span>
                      </div>

                      {/* Email Client Selector Tabs */}
                      <div className="grid grid-cols-3 gap-1 p-1 bg-neutral-100 rounded-lg mb-4">
                        {(["gmail", "outlook", "yahoo"] as const).map((client) => (
                          <button
                            key={client}
                            onClick={() => setEmailClient(client)}
                            className={`py-1.5 text-[10px] font-mono tracking-wider font-semibold rounded-md text-center cursor-pointer transition-all ${
                              emailClient === client 
                                ? "bg-white text-neutral-900 shadow-xs" 
                                : "text-neutral-500 hover:text-neutral-800"
                            }`}
                          >
                            {client === "gmail" ? "GMAIL (IOS/WEB)" : client === "outlook" ? "OUTLOOK 2016" : "YAHOO (INLINE)"}
                          </button>
                        ))}
                      </div>

                      {/* Simulated Render Stage */}
                      <div className="bg-neutral-50 rounded-xl border border-neutral-200/80 p-5 min-h-[180px] max-h-[220px] overflow-y-auto relative transition-all duration-300">
                        {emailClient === "gmail" && (
                          <div className="space-y-3 font-sans text-xs text-neutral-700">
                            <div className="bg-white p-4 rounded-xl border border-neutral-100 shadow-2xs space-y-2">
                              <h5 className="font-bold text-neutral-900 text-sm">Arthur Vance Quarterly Update</h5>
                              <div className="h-[2px] bg-neutral-900 w-12" />
                              <p className="text-neutral-500 leading-relaxed font-light">
                                Thank you for subscribing. We craft responsive layout elements supporting absolute font weights and fluid flex columns.
                              </p>
                              <div className="pt-2">
                                <span className="bg-neutral-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-md inline-block uppercase tracking-wider">
                                  LAUNCH EXPERIMENT
                                </span>
                              </div>
                            </div>
                            <p className="text-[10px] text-neutral-400 text-center uppercase tracking-widest font-mono">
                              Responsive Media Queries [ENABLED] // Fluid Width Layout
                            </p>
                          </div>
                        )}

                        {emailClient === "outlook" && (
                          <div className="font-mono text-[10px] text-neutral-600 space-y-3">
                            <div className="border border-dashed border-red-400/40 p-1.5 bg-red-50/20 text-red-500 text-[8px] uppercase flex items-center gap-1.5 mb-1 select-none">
                              <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                              <span>MSO Conditional Comments Active (Outlook Word Rendering Fallback Mode)</span>
                            </div>
                            
                            {/* Visual representation of MSO tables */}
                            <table className="w-full border-collapse border border-neutral-300 text-[9px] text-neutral-800 bg-white shadow-2xs">
                              <tbody>
                                <tr className="border-b border-neutral-300 bg-neutral-50 select-none">
                                  <td className="p-1.5 border-r border-neutral-300 text-neutral-400" style={{ width: "30%" }}>[TABLE CELL 01]</td>
                                  <td className="p-1.5" style={{ width: "70%" }}>Outlook Desktop Geometry Width="600"</td>
                                </tr>
                                <tr>
                                  <td className="p-2 text-xs font-sans text-neutral-900 border-r border-neutral-300 font-bold" colSpan={1}>ARTHUR VANCE</td>
                                  <td className="p-2 text-xs font-sans text-neutral-600 font-light" colSpan={1}>
                                    Solid nesting prevents element alignment breaking. Tested for vintage Outlook engines.
                                  </td>
                                </tr>
                                <tr className="border-t border-neutral-300 bg-neutral-50 select-none text-center">
                                  <td className="p-2 font-mono text-[8px] text-neutral-400" colSpan={2}>
                                    &lt;!--[if mso]&gt; &lt;table align="center" width="600"&gt; &lt;![endif]--&gt;
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        )}

                        {emailClient === "yahoo" && (
                          <div className="space-y-3">
                            <div className="border border-dashed border-sky-400/40 p-1.5 bg-sky-50/20 text-sky-500 text-[8px] uppercase flex items-center gap-1.5 select-none">
                              <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
                              <span>Inline Compilation Injections Enforced</span>
                            </div>

                            <div className="bg-white p-4 border border-neutral-100 rounded-xl space-y-3">
                              <div className="text-[10px] font-mono text-neutral-400 border border-neutral-100 rounded-md p-1.5 bg-neutral-50/50">
                                <span className="text-pink-500">&lt;td</span> style=<span className="text-sky-600">"font-family: Arial, sans-serif; font-size: 14px; line-height: 20px; color: #171717; text-align: left;"</span><span className="text-pink-500">&gt;</span>
                              </div>
                              <p className="text-xs font-sans text-neutral-800 leading-relaxed font-light">
                                Absolute inline attributes prevent rendering filters from discarding our layouts. Complete formatting guarantee.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Email Compliance Report details */}
                    <div className="p-4 bg-neutral-50/60 rounded-xl border border-neutral-200/50 flex flex-wrap gap-x-6 gap-y-2.5 text-[10px] font-mono text-neutral-500 justify-between items-center">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span>OUTLOOK CONDITIONAL CSS COMPLIANT</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span>CSS AUTO-INLINING SAFE</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ================= 4. ANDROID KOTLIN FIXES ================= */}
                {activeService === "android" && (
                  <motion.div
                    key="android-box"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-5 flex-1 flex flex-col justify-between"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch flex-1">
                      {/* Diagnostic Selection & Code (Left Column) */}
                      <div className="md:col-span-8 flex flex-col justify-between space-y-4">
                        <div>
                          {/* Diagnostic Selection Header */}
                          <div className="flex justify-between items-center text-[9px] font-mono text-neutral-400 mb-3">
                            <span>COMPILER DIAGNOSTIC SUITE</span>
                            <span>JVM KOTLIN TOOLING</span>
                          </div>

                          {/* Dropdown/Tabs of common errors */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 p-1 bg-neutral-100 rounded-lg mb-3">
                            {androidIssues.map((issue, idx) => (
                              <button
                                key={idx}
                                onClick={() => setSelectedIssue(idx)}
                                className={`py-1.5 px-2 text-[9px] font-mono tracking-wider font-semibold rounded-md truncate text-left sm:text-center cursor-pointer transition-all ${
                                  selectedIssue === idx 
                                    ? "bg-white text-neutral-900 shadow-xs" 
                                    : "text-neutral-500 hover:text-neutral-800"
                                }`}
                                title={issue.title}
                              >
                                ERROR 0{idx + 1}: {issue.title.split(" ").slice(0, 2).join(" ")}
                              </button>
                            ))}
                          </div>

                          {/* Kotlin code comparison card */}
                          <div className="relative rounded-xl overflow-hidden border border-neutral-200 bg-neutral-950 font-mono text-[9px] sm:text-[10px] leading-relaxed p-4 min-h-[170px] max-h-[170px] overflow-y-auto">
                            <AnimatePresence mode="wait">
                              {compileState === "success" ? (
                                <motion.pre 
                                  key="success-code"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className="text-emerald-400 whitespace-pre-wrap select-all"
                                >
                                  {androidIssues[selectedIssue].fixedSnippet}
                                </motion.pre>
                              ) : (
                                <motion.pre 
                                  key="error-code"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className="text-red-400 whitespace-pre-wrap"
                                >
                                  {androidIssues[selectedIssue].errorSnippet}
                                </motion.pre>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>

                      {/* Live Virtual Emulator (Right Column) */}
                      <div className="md:col-span-4 flex flex-col bg-neutral-50/70 border border-neutral-150 rounded-xl p-4 justify-between relative overflow-hidden min-h-[260px]">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-mono text-[8px] text-neutral-400 uppercase tracking-wider">VIRTUAL EMULATOR</span>
                          <span className={`font-mono text-[8px] font-bold ${compileState === "success" ? "text-emerald-500" : compileState === "compiling" ? "text-amber-500 animate-pulse" : "text-neutral-400"}`}>
                            {compileState === "success" ? "● ONLINE" : compileState === "compiling" ? "● INITIALIZING" : "● OFFLINE"}
                          </span>
                        </div>
                        
                        <div className="flex-1 flex items-center justify-center p-2">
                          {/* physical smartphone device shell */}
                          <div className="relative w-[110px] h-[190px] bg-neutral-900 rounded-2xl p-1.5 shadow-[0_8px_20px_rgba(0,0,0,0.12)] border border-neutral-800 flex flex-col justify-between overflow-hidden">
                            {/* Speaker notch */}
                            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-6 h-1.5 bg-neutral-950 rounded-full z-20" />
                            
                            {/* Screen area */}
                            <div className="w-full h-full bg-neutral-50 rounded-lg overflow-hidden relative flex flex-col justify-center items-center">
                              {compileState === "success" ? (
                                <div className="w-full h-full p-0 flex flex-col justify-between bg-white overflow-hidden">
                                  <Lottie 
                                    animationData={servicesLottieData} 
                                    loop={true} 
                                    style={{ width: "100%", height: "100%", transform: "scale(1.05)" }}
                                  />
                                </div>
                              ) : compileState === "compiling" ? (
                                <div className="flex flex-col items-center justify-center p-2 text-center space-y-1.5">
                                  <RefreshCw className="w-4 h-4 text-neutral-400 animate-spin" />
                                  <span className="font-mono text-[7px] text-neutral-400 tracking-tight leading-none uppercase">BUILDING APK...</span>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center justify-center p-2 text-center space-y-1.5">
                                  <AlertTriangle className="w-5 h-5 text-red-500/90" />
                                  <span className="font-mono text-[7px] text-red-500 font-bold leading-none uppercase">RUNTIME CRASH</span>
                                  <span className="font-mono text-[6px] text-neutral-400 leading-tight">Compile hotfix to launch UI</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="text-center mt-1">
                          <span className="font-mono text-[7px] text-neutral-400 block uppercase tracking-wide">
                            {compileState === "success" ? "UI Thread Active" : compileState === "compiling" ? "Syncing Gradle..." : "Stack Error Detected"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons and compile progress bar */}
                    <div className="space-y-3 pt-2 border-t border-neutral-100">
                      {compileState === "compiling" && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-[8px] font-mono text-neutral-400">
                            <span>RE-COMPILING KOTLIN JVM INSTRUCTIONS...</span>
                            <span>{compileProgress}%</span>
                          </div>
                          <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className="bg-neutral-900 h-full transition-all duration-100" 
                              style={{ width: `${compileProgress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between items-center gap-4">
                        <span className="font-mono text-[8px] text-neutral-400 uppercase">
                          {compileState === "success" 
                            ? "BUILD: SUCCESSFUL. JVM BYTECODE COMPILED" 
                            : "BUILD: CRASH DETECTED ON JVM STACK_TRACE"}
                        </span>
                        
                        {compileState !== "success" ? (
                          <button
                            onClick={triggerKotlinCompiler}
                            disabled={compileState === "compiling"}
                            className="bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-[9px] font-bold tracking-widest px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                          >
                            <Terminal className="w-3 h-3" />
                            RUN HOTFIX DIAGNOSTIC
                          </button>
                        ) : (
                          <button
                            onClick={() => setCompileState("idle")}
                            className="bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 font-mono text-[9px] font-bold tracking-widest px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <Check className="w-3 h-3" />
                            RESET COMPILE
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* Simulated Frame Tech Info Bar */}
            <div className="px-5 py-3.5 bg-neutral-50/50 border-t border-neutral-100 flex justify-between items-center font-mono text-[8px] text-neutral-400 select-none">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Cpu className="w-2.5 h-2.5 text-neutral-400" />
                  COPENHAGEN_HQ
                </span>
                <span className="w-[1px] h-2.5 bg-neutral-200" />
                <span>VERSION 1.0.8</span>
              </div>
              <span>COMPILATION DIRECT</span>
            </div>

          </div>

          {/* Technology badges footer for selected service */}
          <div className="mt-4 flex flex-wrap gap-1.5 justify-end">
            {services.find(s => s.id === activeService)?.technologies.map((tech, i) => (
              <span 
                key={i}
                className="font-mono text-[8px] tracking-widest text-neutral-500 uppercase border border-neutral-200 px-2 py-0.5 rounded-md bg-white/40"
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
