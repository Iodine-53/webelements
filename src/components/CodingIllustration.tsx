import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Gauge, 
  Sparkles, 
  Terminal, 
  Mail, 
  Code,
  Laptop,
  Maximize2
} from "lucide-react";
import animationData from "../assets/hero_coding.json";

export function CodingIllustration() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [hoveredBadge, setHoveredBadge] = useState<string | null>(null);
  const [showHUD, setShowHUD] = useState(true);
  
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  const handlePlayPause = () => {
    if (!lottieRef.current) return;
    if (isPlaying) {
      lottieRef.current.pause();
    } else {
      lottieRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    if (!lottieRef.current) return;
    lottieRef.current.stop();
    lottieRef.current.play();
    setIsPlaying(true);
  };

  const handleSpeedChange = (newSpeed: number) => {
    if (!lottieRef.current) return;
    lottieRef.current.setSpeed(newSpeed);
    setSpeed(newSpeed);
  };

  return (
    <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] xl:aspect-[3/4] flex flex-col items-center justify-center overflow-visible select-none py-4">
      <div className="absolute inset-0 bg-radial-[circle_at_50%_50%] from-sky-400/10 via-violet-500/5 to-transparent pointer-events-none blur-3xl animate-pulse" />

      <style>{`
        .lottie-orbit-container {
          perspective: 1200px;
          transform-style: preserve-3d;
        }
        
        .orbit-axis-1 {
          transform: rotateX(72deg) rotateY(-10deg) rotateZ(15deg);
        }
        .orbit-axis-2 {
          transform: rotateX(65deg) rotateY(18deg) rotateZ(-12deg);
        }

        @keyframes float-lottie-card {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(0.5deg); }
        }
        .lottie-card-float {
          animation: float-lottie-card 6s infinite ease-in-out;
        }

        @keyframes orbit-react {
          0% { transform: rotate(0deg) translateX(155px) rotate(0deg) scale(0.9); z-index: 30; }
          25% { scale: 1.1; }
          50% { transform: rotate(180deg) translateX(155px) rotate(-180deg) scale(0.8); z-index: -30; }
          75% { scale: 0.9; }
          100% { transform: rotate(360deg) translateX(155px) rotate(-360deg) scale(0.9); z-index: 30; }
        }

        @keyframes orbit-ts {
          0% { transform: rotate(120deg) translateX(155px) rotate(-120deg) scale(0.8); z-index: -30; }
          25% { scale: 0.9; }
          50% { transform: rotate(300deg) translateX(155px) rotate(-300deg) scale(1.1); z-index: 30; }
          75% { scale: 1.0; }
          100% { transform: rotate(480deg) translateX(155px) rotate(-480deg) scale(0.8); z-index: -30; }
        }

        @keyframes orbit-terminal {
          0% { transform: rotate(240deg) translateX(155px) rotate(-240deg) scale(1.0); z-index: 30; }
          50% { transform: rotate(60deg) translateX(155px) rotate(-60deg) scale(0.8); z-index: -30; }
          100% { transform: rotate(600deg) translateX(155px) rotate(-600deg) scale(1.0); z-index: 30; }
        }

        .orbiting-react { animation: orbit-react 18s infinite linear; }
        .orbiting-ts { animation: orbit-ts 18s infinite linear; }
        .orbiting-terminal { animation: orbit-terminal 18s infinite linear; }

        .orbiting-react:hover, .orbiting-ts:hover, .orbiting-terminal:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="relative w-full max-w-[430px] lottie-card-float flex flex-col items-center justify-center">
        
        <div className="absolute inset-0 lottie-orbit-container pointer-events-none flex items-center justify-center scale-105">
          <div className="absolute w-[310px] h-[310px] rounded-full border border-dashed border-neutral-300/40 orbit-axis-1" />
          <div className="absolute w-[310px] h-[310px] rounded-full border border-dashed border-neutral-300/30 orbit-axis-2" />
        </div>

        <div className="relative w-full bg-white/75 backdrop-blur-xl border border-neutral-200/80 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.06)] overflow-hidden transition-all duration-300 hover:shadow-[0_24px_60px_rgba(0,0,0,0.08)]">
          
          <div className="flex items-center justify-between px-4 py-3 bg-neutral-50/50 border-b border-neutral-200/50">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-red-400/20" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-yellow-400/20" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-green-400/20" />
              <span className="ml-2 font-mono text-[10px] text-neutral-400 uppercase tracking-widest flex items-center gap-1">
                <Laptop className="w-3 h-3 text-neutral-400" />
                WORKSPACE
              </span>
            </div>
            
            <button 
              onClick={() => setShowHUD(!showHUD)}
              className="text-neutral-400 hover:text-neutral-600 transition-colors p-1 rounded-md hover:bg-neutral-100"
              title="Toggle Controls"
            >
              <Maximize2 className="w-3 h-3" />
            </button>
          </div>

          <div className="relative bg-gradient-to-b from-neutral-50/40 to-white/90 p-4 flex items-center justify-center min-h-[250px] sm:min-h-[280px]">
            <div className="w-full max-w-[340px] aspect-video sm:aspect-square flex items-center justify-center overflow-hidden">
              <Lottie 
                lottieRef={lottieRef}
                animationData={animationData} 
                loop={true} 
                autoplay={true}
                className="w-full h-full object-contain scale-[1.08]"
              />
            </div>

            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-[8px] text-emerald-700 tracking-wider">ANIMATION LIVE</span>
            </div>

            <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-md bg-neutral-100 border border-neutral-200/40 pointer-events-none">
              <span className="font-mono text-[8px] text-neutral-500">{speed.toFixed(1)}x SPEED</span>
            </div>
          </div>

          <AnimatePresence>
            {showHUD && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="border-t border-neutral-200/50 bg-neutral-50/30 px-4 py-3 flex flex-wrap items-center justify-between gap-3 overflow-hidden"
              >
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handlePlayPause}
                    className="p-1.5 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 active:scale-95 transition-all shadow-sm"
                    title={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  </button>
                  <button
                    onClick={handleRestart}
                    className="p-1.5 rounded-lg bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50 active:scale-95 transition-all shadow-xs"
                    title="Restart Animation"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-1 bg-white border border-neutral-200/80 p-0.5 rounded-lg shadow-2xs">
                  <span className="px-2 text-[9px] font-mono text-neutral-400 flex items-center gap-1">
                    <Gauge className="w-2.5 h-2.5" />
                    RATE
                  </span>
                  {[0.5, 1, 1.5, 2].map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSpeedChange(s)}
                      className={`px-2 py-0.5 text-[9px] font-mono rounded-md transition-all ${
                        speed === s 
                          ? "bg-neutral-900 text-white font-bold" 
                          : "text-neutral-500 hover:bg-neutral-100"
                      }`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          
          <div 
            className="absolute p-1 select-none pointer-events-auto orbiting-react cursor-pointer"
            onMouseEnter={() => setHoveredBadge("React Core Rendering")}
            onMouseLeave={() => setHoveredBadge(null)}
          >
            <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-neutral-200/80 shadow-md flex items-center justify-center hover:border-sky-400 hover:shadow-sky-100 transition-all duration-300 transform hover:scale-110">
              <svg className="w-6 h-6 text-sky-500 animate-[spin_12s_infinite_linear]" viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
                <g stroke="currentColor" strokeWidth="1" fill="none">
                  <ellipse rx="11" ry="4.2"/>
                  <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
                  <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
                </g>
              </svg>
            </div>
          </div>

          <div 
            className="absolute p-1 select-none pointer-events-auto orbiting-ts cursor-pointer"
            onMouseEnter={() => setHoveredBadge("TypeScript Type Safety")}
            onMouseLeave={() => setHoveredBadge(null)}
          >
            <div className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md border border-neutral-200/80 shadow-md flex items-center justify-center hover:border-blue-500 hover:shadow-blue-100 transition-all duration-300 transform hover:scale-110">
              <div className="font-mono text-xs font-black text-blue-600 bg-blue-50/80 px-1 py-0.5 rounded leading-none">
                TS
              </div>
            </div>
          </div>

          <div 
            className="absolute p-1 select-none pointer-events-auto orbiting-terminal cursor-pointer"
            onMouseEnter={() => setHoveredBadge("Computational Logic")}
            onMouseLeave={() => setHoveredBadge(null)}
          >
            <div className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 shadow-lg flex items-center justify-center hover:border-emerald-400 hover:shadow-emerald-950/20 transition-all duration-300 transform hover:scale-110">
              <Terminal className="w-4 h-4 text-emerald-400" />
            </div>
          </div>

        </div>

        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-30 h-8">
          <AnimatePresence mode="wait">
            {hoveredBadge ? (
              <motion.div
                key={hoveredBadge}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="bg-neutral-950/95 backdrop-blur-md text-white border border-neutral-800 px-3.5 py-1.5 rounded-full text-[9px] font-mono tracking-widest flex items-center gap-1.5 shadow-lg whitespace-nowrap"
              >
                <Sparkles className="w-3 h-3 text-sky-400 animate-pulse" />
                <span>{hoveredBadge.toUpperCase()}</span>
              </motion.div>
            ) : (
              <motion.div
                key="default"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase text-center transition-opacity"
              >
                INTERACTIVE LOTTIE CANVAS
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
