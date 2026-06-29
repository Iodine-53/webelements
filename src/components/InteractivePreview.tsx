import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Layout, 
  BookOpen, 
  Sparkles,
  RefreshCw
} from "lucide-react";

interface InteractivePreviewProps {
  projectId: string;
}

export const InteractivePreview: React.FC<InteractivePreviewProps> = ({ projectId }) => {
  switch (projectId) {
    case "aether":
      return <AetherSimulation />;
    case "kore":
      return <KoreSimulation />;
    case "vellum":
      return <VellumSimulation />;
    case "helix":
      return <HelixSimulation />;
    default:
      return (
        <div className="h-full flex items-center justify-center text-zinc-400 font-mono text-sm">
          Simulation unavailable.
        </div>
      );
  }
};

function AetherSimulation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [frequency, setFrequency] = useState(220);
  const [intensity, setIntensity] = useState(0.5);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeHarmonics, setActiveHarmonics] = useState<number[]>([1, 1.5, 2, 2.5]);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const intensityRef = useRef(intensity);
  const activeHarmonicsRef = useRef(activeHarmonics);
  const mousePosRef = useRef(mousePos);

  useEffect(() => {
    intensityRef.current = intensity;
  }, [intensity]);

  useEffect(() => {
    activeHarmonicsRef.current = activeHarmonics;
  }, [activeHarmonics]);

  useEffect(() => {
    mousePosRef.current = mousePos;
  }, [mousePos]);

  useEffect(() => {
    if (isPlaying) {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1000, ctx.currentTime);
        filterRef.current = filter;

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.12 * intensity, ctx.currentTime + 0.5);
        gainNodeRef.current = gain;

        const osc = ctx.createOscillator();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(frequency, ctx.currentTime);
        oscRef.current = osc;

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
      } catch (err) {
        console.warn("Audio initiation blocked or unsupported:", err);
      }
    } else {
      cleanupAudio();
    }

    return () => cleanupAudio();
  }, [isPlaying]);

  useEffect(() => {
    if (oscRef.current && audioCtxRef.current) {
      oscRef.current.frequency.exponentialRampToValueAtTime(frequency, audioCtxRef.current.currentTime + 0.1);
    }
  }, [frequency]);

  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.linearRampToValueAtTime(0.12 * intensity, audioCtxRef.current.currentTime + 0.2);
    }
    if (filterRef.current && audioCtxRef.current) {
      filterRef.current.frequency.setValueAtTime(500 + intensity * 1500, audioCtxRef.current.currentTime);
    }
  }, [intensity]);

  const cleanupAudio = () => {
    if (oscRef.current) {
      try { oscRef.current.stop(); } catch (e) {}
      oscRef.current.disconnect();
      oscRef.current = null;
    }
    if (gainNodeRef.current) {
      gainNodeRef.current.disconnect();
      gainNodeRef.current = null;
    }
    if (filterRef.current) {
      filterRef.current.disconnect();
      filterRef.current = null;
    }
    if (audioCtxRef.current) {
      if (audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close();
      }
      audioCtxRef.current = null;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let phase = 0;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const render = () => {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      
      ctx.clearRect(0, 0, w, h);

      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      const currentIntensity = intensityRef.current;
      const currentActiveHarmonics = activeHarmonicsRef.current;
      const currentMousePos = mousePosRef.current;

      phase += 0.015 * (1 + currentIntensity);

      currentActiveHarmonics.forEach((harmonic, index) => {
        ctx.beginPath();
        ctx.lineWidth = index === 0 ? 2 : 1;
        ctx.strokeStyle = index === 0 
          ? `rgba(56, 189, 248, ${0.4 + currentIntensity * 0.4})` 
          : `rgba(255, 255, 255, ${0.12 - index * 0.02})`;

        for (let x = 0; x < w; x++) {
          const dx = x - currentMousePos.x;
          const dy = h/2 - currentMousePos.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          const cursorInteraction = Math.max(0, 1 - dist / 300) * 40 * currentIntensity;

          const sineValue1 = Math.sin(x * 0.005 * harmonic + phase * harmonic);
          const sineValue2 = Math.cos(x * 0.01 + phase * 0.5);
          
          const y = h / 2 
            + sineValue1 * (30 * currentIntensity + cursorInteraction) 
            + sineValue2 * 10 
            + (index * 15 - 30);

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      if (currentMousePos.x > 0 && currentMousePos.x < w && currentMousePos.y > 0 && currentMousePos.y < h) {
        ctx.beginPath();
        const radGrd = ctx.createRadialGradient(currentMousePos.x, currentMousePos.y, 0, currentMousePos.x, currentMousePos.y, 100);
        radGrd.addColorStop(0, "rgba(56, 189, 248, 0.08)");
        radGrd.addColorStop(1, "rgba(56, 189, 248, 0)");
        ctx.fillStyle = radGrd;
        ctx.arc(currentMousePos.x, currentMousePos.y, 100, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = "rgba(56, 189, 248, 0.6)";
        ctx.arc(currentMousePos.x, currentMousePos.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    const pctX = x / rect.width;
    const pctY = 1 - (y / rect.height);

    setFrequency(Math.round(110 + pctX * 330));
    setIntensity(0.2 + pctY * 0.8);
  };

  const toggleSound = () => {
    setIsPlaying(!isPlaying);
  };

  const randomizeHarmonics = () => {
    const base = [1];
    for (let i = 0; i < 3; i++) {
      base.push(Number((1 + Math.random() * 3).toFixed(1)));
    }
    setActiveHarmonics(base.sort((a, b) => a - b));
  };

  return (
    <div className="h-full bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex flex-col relative select-none">
      <div className="p-3 bg-slate-900/60 border-b border-slate-800/80 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          <span className="font-mono text-xs text-slate-400 tracking-wider">AETHER WAVE VECTOR SIMULATOR</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={randomizeHarmonics}
            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition"
            title="Randomize Harmonics"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={toggleSound}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono tracking-wide transition ${
              isPlaying 
                ? "bg-sky-500/20 text-sky-400 border border-sky-500/30" 
                : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-transparent"
            }`}
          >
            {isPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5" />
                <span>MUTE AUDIO</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span>PLAY SYNTH</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div 
        className="flex-1 relative cursor-crosshair overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePos({ x: -100, y: -100 })}
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        
        <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur border border-slate-800 px-3 py-2 rounded-lg pointer-events-none">
          <p className="text-[10px] font-mono text-slate-400 leading-normal">
            [Y-AXIS] AMPLITUDE MODULATION: <span className="text-sky-400">{(intensity * 100).toFixed(0)}%</span>
          </p>
          <p className="text-[10px] font-mono text-slate-400 leading-normal">
            [X-AXIS] FREQUENCY CARRIER: <span className="text-sky-400">{frequency} Hz</span>
          </p>
        </div>

        <div className="absolute top-4 right-4 text-right pointer-events-none font-mono text-[9px] text-slate-500">
          <p>DAMPING_FACTOR: 0.94</p>
          <p>HARMONICS: [{activeHarmonics.join(", ")}]</p>
          <p>LATENCY_BUFFER: LOCAL</p>
        </div>
      </div>
    </div>
  );
}

function KoreSimulation() {
  const [gridColumns, setGridColumns] = useState(3);
  const [gapSize, setGapSize] = useState(8);
  const [monochromeLevel, setMonochromeLevel] = useState(100);
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const images = [
    { title: "Slab No. 4", loc: "Berlin, DE", code: "52.5200° N" },
    { title: "Monolith v2", loc: "Belgrade, RS", code: "44.7866° N" },
    { title: "Column Core", loc: "London, UK", code: "51.5074° N" },
    { title: "Brut Block C", loc: "Paris, FR", code: "48.8566° N" },
    { title: "Span Anchor", loc: "Tokyo, JP", code: "35.6762° N" },
    { title: "Atrium Void", loc: "Montreal, CA", code: "45.5017° N" }
  ];

  return (
    <div className="h-full bg-[#151515] text-[#ededed] rounded-xl overflow-hidden border border-neutral-800 flex flex-col select-none">
      <div className="p-3 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <Layout className="w-4 h-4 text-neutral-400" />
          <span className="font-mono text-xs text-neutral-400 tracking-wider">KORE GRID STRUCTURE COMPOSER</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => { setGridColumns(3); setGapSize(8); setMonochromeLevel(100); }}
            className="flex items-center gap-1 px-2 py-0.5 border border-neutral-700 hover:border-white rounded text-[10px] font-mono transition"
          >
            <RotateCcw className="w-2.5 h-2.5" /> RESET
          </button>
        </div>
      </div>

      <div className="p-3 bg-neutral-900/40 border-b border-neutral-800/60 grid grid-cols-3 gap-3">
        <div>
          <label className="block text-[9px] font-mono text-neutral-400 mb-1">GRID COLUMNS: {gridColumns}</label>
          <div className="flex gap-1.5">
            {[1, 2, 3, 5].map((cols) => (
              <button
                key={cols}
                onClick={() => setGridColumns(cols)}
                className={`flex-1 py-1 border text-xs font-mono transition ${
                  gridColumns === cols 
                    ? "bg-[#ededed] text-black border-transparent" 
                    : "border-neutral-700 text-neutral-400 hover:border-neutral-500"
                }`}
              >
                C-{cols}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-[9px] font-mono text-neutral-400 mb-1">GRID GAP: {gapSize}px</label>
          <input 
            type="range" 
            min="0" 
            max="24" 
            value={gapSize} 
            onChange={(e) => setGapSize(Number(e.target.value))}
            className="w-full accent-neutral-200"
          />
        </div>

        <div>
          <label className="block text-[9px] font-mono text-neutral-400 mb-1">MONO_CONTRAST: {monochromeLevel}%</label>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={monochromeLevel} 
            onChange={(e) => setMonochromeLevel(Number(e.target.value))}
            className="w-full accent-neutral-200"
          />
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto bg-[#101010] custom-scrollbar">
        <div 
          className="grid transition-all duration-300"
          style={{ 
            gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
            gap: `${gapSize}px`
          }}
        >
          {images.map((item, idx) => (
            <motion.div
              key={idx}
              layout
              onClick={() => setActiveItem(activeItem === idx ? null : idx)}
              className="group cursor-pointer relative bg-neutral-900 border border-neutral-800 overflow-hidden"
              whileHover={{ scale: 0.99 }}
            >
              <div 
                className="w-full h-24 relative flex items-center justify-center overflow-hidden transition-all duration-500"
                style={{ 
                  filter: `grayscale(${monochromeLevel / 100}) contrast(${1 + (100 - monochromeLevel)/100})` 
                }}
              >
                <div className="absolute inset-0 bg-neutral-950 flex items-center justify-center p-3 opacity-80">
                  <div className="w-full h-full border border-neutral-800 flex flex-col justify-between p-2 relative">
                    <div className="absolute top-0 right-0 border-b border-l border-neutral-700 w-4 h-4" />
                    <div className="absolute bottom-0 left-0 border-t border-r border-neutral-700 w-4 h-4" />
                    <span className="font-mono text-[9px] text-neutral-600">STRUCTURE {idx + 1}</span>
                    <div className="flex gap-1 items-end h-8">
                      <div className="bg-neutral-800 w-3" style={{ height: `${20 + idx * 10}%` }} />
                      <div className="bg-neutral-600 w-5" style={{ height: `${40 + idx * 8}%` }} />
                      <div className="bg-neutral-700 w-2" style={{ height: `${30 + idx * 12}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-2 border-t border-neutral-800 bg-neutral-900">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-sans font-medium text-xs tracking-tight text-neutral-300 group-hover:text-white transition">
                    {item.title}
                  </h4>
                  <span className="font-mono text-[8px] text-neutral-500">{item.code}</span>
                </div>
                <div className="flex justify-between mt-1 text-[8px] font-mono text-neutral-400">
                  <span>{item.loc}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition text-neutral-200">[DISCOVER]</span>
                </div>
              </div>

              {activeItem === idx && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/90 p-3 flex flex-col justify-between text-neutral-200 z-10"
                >
                  <div>
                    <h5 className="font-mono text-[10px] text-neutral-500 tracking-wider">COMPILER PARAMETERS</h5>
                    <p className="font-sans text-xs mt-1 font-medium">{item.title}</p>
                    <p className="font-mono text-[9px] text-neutral-400 mt-2">
                      GAP_VAL: {gapSize}px<br />
                      GRID_RATIO: {gridColumns === 1 ? "1:1 STACK" : `${gridColumns}:COLUMN`}<br />
                      FILTER: GS_{monochromeLevel}%
                    </p>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setActiveItem(null); }}
                    className="text-[9px] font-mono border border-neutral-700 text-center py-1 hover:border-white transition"
                  >
                    CLOSE PARAMETERS
                  </button>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VellumSimulation() {
  const [theme, setTheme] = useState<"linen" | "charcoal" | "solarized">("linen");
  const [fontSize, setFontSize] = useState(16);
  const [marginNotes, setMarginNotes] = useState(true);
  const [lineHeight, setLineHeight] = useState(1.6);

  const themeClasses = {
    linen: "bg-[#F7F5F0] text-[#1E1E1C] border-[#E5E2D9]",
    charcoal: "bg-[#1C1C1D] text-[#E4E4E6] border-[#2C2C2E]",
    solarized: "bg-[#FDF6E3] text-[#073642] border-[#ECE4CE]"
  };

  return (
    <div className={`h-full rounded-xl overflow-hidden border flex flex-col transition-colors duration-300 ${themeClasses[theme]}`}>
      <div className={`p-3 border-b flex items-center justify-between z-10 font-mono text-xs ${
        theme === "charcoal" ? "bg-[#121213]" : "bg-black/5"
      }`}>
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 opacity-70" />
          <span className="tracking-wider">VELLUM INTERACTIVE WRITING WORKSPACE</span>
        </div>
        <div className="flex items-center gap-1.5">
          {(["linen", "charcoal", "solarized"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`px-1.5 py-0.5 text-[9px] border uppercase transition ${
                theme === t 
                  ? "border-current font-semibold" 
                  : "border-transparent opacity-50 hover:opacity-100"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className={`p-3 border-b grid grid-cols-3 gap-3 text-[10px] font-mono ${
        theme === "charcoal" ? "bg-[#181819]" : "bg-black/2"
      }`}>
        <div className="flex flex-col gap-1">
          <span>FONT SCALE: {fontSize}px</span>
          <div className="flex gap-1">
            <button 
              onClick={() => setFontSize(Math.max(12, fontSize - 2))}
              className="flex-1 py-0.5 border border-current/25 hover:border-current text-center text-xs"
            >
              A-
            </button>
            <button 
              onClick={() => setFontSize(Math.min(24, fontSize + 2))}
              className="flex-1 py-0.5 border border-current/25 hover:border-current text-center text-xs"
            >
              A+
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span>SPACING: {lineHeight}x</span>
          <div className="flex gap-1">
            {[1.4, 1.6, 1.8].map((lh) => (
              <button 
                key={lh}
                onClick={() => setLineHeight(lh)}
                className={`flex-1 py-0.5 border text-[9px] transition ${
                  lineHeight === lh ? "border-current" : "border-current/20 opacity-60"
                }`}
              >
                {lh}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span>MARGIN NOTES</span>
          <button 
            onClick={() => setMarginNotes(!marginNotes)}
            className={`py-1 border text-[9px] uppercase transition ${
              marginNotes ? "border-current bg-current/5" : "border-current/20 opacity-60"
            }`}
          >
            {marginNotes ? "VISIBLE" : "HIDDEN"}
          </button>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto custom-scrollbar flex gap-6">
        <div className="flex-1 max-w-xl mx-auto">
          <span className="font-mono text-[9px] tracking-widest uppercase opacity-60 block mb-2">CHAPTER II: ARCHITECTURAL GRAIN</span>
          <h1 className="font-serif text-xl sm:text-2xl font-semibold mb-4 leading-tight tracking-tight">
            The physicality of digital text layouts.
          </h1>
          <p 
            className="font-serif text-justify transition-all duration-300"
            style={{ fontSize: `${fontSize}px`, lineHeight: lineHeight }}
          >
            To craft an editorial web environment is to align pixels as though they were physical fibers. The digital medium is often treated as formless water, pouring into generic columns. Yet, when constraints are hard-coded, text gains weight. It ceases to scroll aimlessly and begins to present itself as a designed object. We calibrate reading speed by managing paragraph widths, forcing the eye to dwell on key structural accents.
          </p>
        </div>

        {marginNotes && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 0.7, x: 0 }}
            className="w-32 border-l border-current/15 pl-4 hidden sm:flex flex-col justify-start text-[9px] font-mono leading-relaxed"
          >
            <span className="text-orange-600 font-semibold mb-1">NOTE 04:</span>
            <span>calibrated layout is the physical texture of design philosophy, not decorative.</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function HelixSimulation() {
  const [points, setPoints] = useState(120);
  const [multiplier, setMultiplier] = useState(4);
  const [speed, setSpeed] = useState(1);
  const [colorMode, setColorMode] = useState<"violet" | "emerald" | "amber">("violet");
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    let frameId: number;
    const animate = () => {
      setPhase((prev) => prev + 0.01 * speed);
      frameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frameId);
  }, [speed]);

  const width = 300;
  const height = 300;
  const radius = 100;
  const cx = width / 2;
  const cy = height / 2;

  const svgLines: React.JSX.Element[] = [];
  const coords: { x: number; y: number }[] = [];

  for (let i = 0; i < points; i++) {
    const angle = (i / points) * Math.PI * 2 + phase;
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;
    coords.push({ x, y });
  }

  for (let i = 0; i < points; i++) {
    const nextIdx = Math.round(i * multiplier) % points;
    const start = coords[i];
    const end = coords[nextIdx];
    
    if (start && end) {
      const colorVal = `hsla(${
        colorMode === "violet" ? 270 : colorMode === "emerald" ? 150 : 35
      }, 85%, 65%, ${0.15 + (i / points) * 0.35})`;

      svgLines.push(
        <line
          key={i}
          x1={start.x}
          y1={start.y}
          x2={end.x}
          y2={end.y}
          stroke={colorVal}
          strokeWidth="1"
          strokeLinecap="round"
        />
      );
    }
  }

  const colors = {
    violet: { bg: "bg-zinc-950", border: "border-purple-900/30", stroke: "#a855f7" },
    emerald: { bg: "bg-zinc-950", border: "border-emerald-900/30", stroke: "#10b981" },
    amber: { bg: "bg-zinc-950", border: "border-amber-900/30", stroke: "#f59e0b" }
  };

  return (
    <div className={`h-full ${colors[colorMode].bg} text-zinc-100 rounded-xl overflow-hidden border ${colors[colorMode].border} flex flex-col select-none`}>
      <div className="p-3 bg-zinc-900/90 border-b border-zinc-800/80 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4" style={{ color: colors[colorMode].stroke }} />
          <span className="font-mono text-xs text-zinc-400 tracking-wider">HELIX GEOMETRIC VECTOR PLOTTER</span>
        </div>
        <div className="flex items-center gap-1.5">
          {(["violet", "emerald", "amber"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setColorMode(mode)}
              className="w-2.5 h-2.5 rounded-full transition-all hover:scale-125"
              style={{ 
                backgroundColor: mode === "violet" ? "#a855f7" : mode === "emerald" ? "#10b981" : "#f59e0b",
                border: colorMode === mode ? "1.5px solid white" : "none"
              }}
              title={`${mode} Palette`}
            />
          ))}
        </div>
      </div>

      <div className="p-3 bg-zinc-900/40 border-b border-zinc-800/40 grid grid-cols-3 gap-3">
        <div>
          <label className="block text-[9px] font-mono text-zinc-400 mb-1">DENSITY (POINTS): {points}</label>
          <input 
            type="range" 
            min="20" 
            max="200" 
            step="10"
            value={points} 
            onChange={(e) => setPoints(Number(e.target.value))}
            className="w-full accent-purple-500"
          />
        </div>

        <div>
          <label className="block text-[9px] font-mono text-zinc-400 mb-1">MULTIPLIER: {multiplier}</label>
          <input 
            type="range" 
            min="2" 
            max="12" 
            step="0.5"
            value={multiplier} 
            onChange={(e) => setMultiplier(Number(e.target.value))}
            className="w-full accent-purple-500"
          />
        </div>

        <div>
          <label className="block text-[9px] font-mono text-zinc-400 mb-1">ROTATION SPEED: {speed}x</label>
          <input 
            type="range" 
            min="0" 
            max="4" 
            step="0.5"
            value={speed} 
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-full accent-purple-500"
          />
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center bg-black relative overflow-hidden">
        <svg 
          viewBox={`0 0 ${width} ${height}`} 
          className="w-64 h-64 max-w-full max-h-full transition-transform duration-300"
        >
          <circle 
            cx={cx} 
            cy={cy} 
            r={radius} 
            fill="none" 
            stroke="rgba(255, 255, 255, 0.03)" 
            strokeWidth="1" 
          />
          {svgLines}
        </svg>

        <div className="absolute top-3 left-3 font-mono text-[9px] text-zinc-500 pointer-events-none">
          <p>MATH_FORMULA: P[i] → P[(i * {multiplier}) % {points}]</p>
          <p>MATRIX_MUTATION: ACTIVE</p>
          <p>RENDERING: SVG VECTOR PATH</p>
        </div>
      </div>
    </div>
  );
}
