import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { Project } from "../types";
import { ExternalLink, Github, Code2, Monitor, Cpu, RotateCw } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<"mockup" | "sandbox">("mockup");
  const [shouldRenderIframe, setShouldRenderIframe] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showFallbackWarning, setShowFallbackWarning] = useState(false);
  const [iframeUrl, setIframeUrl] = useState(project.liveUrl);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [showTechDetails, setShowTechDetails] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Preload iframe when card gets close to the viewport (350px margin)
  useEffect(() => {
    if (!cardRef.current) return;
    
    if (typeof IntersectionObserver !== "undefined") {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setShouldRenderIframe(true);
            observer.disconnect();
          }
        },
        { rootMargin: "350px" }
      );
      observer.observe(cardRef.current);
      return () => observer.disconnect();
    } else {
      setShouldRenderIframe(true);
    }
  }, []);

  useEffect(() => {
    setIframeUrl(project.liveUrl);
    setIsLoading(true);
  }, [project.liveUrl]);

  useEffect(() => {
    if (viewMode === "sandbox") {
      // If we haven't rendered the iframe yet, ensure it is rendered now
      setShouldRenderIframe(true);
      setShowFallbackWarning(false);
      
      const timer = setTimeout(() => {
        setShowFallbackWarning(true);
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [viewMode, iframeUrl]);

  const handleReload = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLoading(true);
    if (iframeRef.current) {
      iframeRef.current.src = project.liveUrl;
    }
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const parallaxValue = index % 2 === 0 ? [-30, 30] : [30, -30];
  const yRaw = useTransform(scrollYProgress, [0, 1], parallaxValue);
  const ySpring = useSpring(yRaw, { stiffness: 100, damping: 25, mass: 0.5 });
  const y = isMobile ? 0 : ySpring;

  return (
    <motion.div
      ref={cardRef}
      style={{ y }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: isMobile ? "-10px" : "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col bg-white border border-neutral-200/80 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
      id={`project-${project.id}`}
    >
      <div 
        className={`relative w-full bg-neutral-950 overflow-hidden group border-b border-neutral-100 transition-all duration-500 ease-in-out ${
          viewMode === "mockup" ? "aspect-[16:10]" : "h-[480px] sm:h-[560px]"
        }`}
      >
        {/* Absolute Toggle Pill on Top Right */}
        <div className="absolute top-[7px] right-2.5 flex bg-neutral-900/90 backdrop-blur-md p-0.5 rounded-lg border border-neutral-800/80 shadow-md z-30">
          <button
            onClick={() => setViewMode("mockup")}
            className={`flex items-center gap-1 px-2.5 py-1 text-[9px] font-mono tracking-wider transition rounded-md cursor-pointer ${
              viewMode === "mockup"
                ? "bg-white text-neutral-950 font-bold shadow-sm"
                : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            <Monitor className="w-3 h-3" />
            <span>MOCKUP</span>
          </button>
          <button
            onClick={() => setViewMode("sandbox")}
            className={`flex items-center gap-1 px-2.5 py-1 text-[9px] font-mono tracking-wider transition rounded-md cursor-pointer ${
              viewMode === "sandbox"
                ? "bg-white text-neutral-950 font-bold shadow-sm"
                : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            <Cpu className="w-3 h-3" />
            <span>SANDBOX</span>
          </button>
        </div>

        {/* Mockup Preview layer (always in DOM, visible/hidden via opacity for transition) */}
        <div 
          className={`w-full h-full relative overflow-hidden transition-opacity duration-300 ${
            viewMode === "mockup" ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none absolute inset-0"
          }`}
        >
          <motion.img
            src={project.image}
            alt={`${project.title} Mockup Preview`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          />
          {/* Index Badge */}
          <div className="absolute bottom-3 left-3 bg-neutral-900/80 backdrop-blur-md text-[9px] font-mono text-neutral-300 px-2 py-0.5 rounded-md border border-neutral-800">
            INDEX_{String(index + 1).padStart(2, "0")}
          </div>
        </div>

        {/* Interactive Sandbox Preloader layer */}
        {shouldRenderIframe && (
          <div 
            className={`w-full h-full bg-neutral-950 flex flex-col transition-opacity duration-300 ${
              viewMode === "sandbox" ? "opacity-100 pointer-events-auto relative" : "opacity-0 pointer-events-none absolute inset-0"
            }`}
          >
            {/* Top Browser Bar UI */}
            <div className="bg-neutral-900 h-10 px-3 flex items-center justify-between gap-3 shrink-0 select-none">
              <div className="flex items-center gap-1.5 shrink-0">
                <div className="w-2 h-2 rounded-full bg-neutral-700" />
                <div className="w-2 h-2 rounded-full bg-neutral-700" />
                <div className="w-2 h-2 rounded-full bg-neutral-700" />
              </div>
              
              {/* Address Bar with Embedded Controls */}
              <div className="flex-1 max-w-[150px] xs:max-w-[200px] sm:max-w-[280px] md:max-w-[150px] lg:max-w-[260px] bg-neutral-950 border border-neutral-800/60 rounded px-2.5 py-1 text-[8px] sm:text-[9px] font-mono text-neutral-400 flex items-center justify-between gap-2 overflow-hidden">
                <span className="truncate flex-1 select-all text-left">{project.liveUrl}</span>
                <div className="flex items-center gap-2 shrink-0 text-neutral-500">
                  <button 
                    onClick={handleReload}
                    className="hover:text-neutral-300 transition-colors cursor-pointer"
                    title="Reload Sandbox"
                  >
                    <RotateCw className="w-2.5 h-2.5" />
                  </button>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-neutral-300 transition-colors"
                    title="Open in New Tab"
                  >
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>

              {/* Leave space for the absolute toggle pill on the right */}
              <div className="w-32 shrink-0" />
            </div>

            {/* Sandbox IFrame & Loader & Fallback */}
            <div className="flex-1 relative bg-white overflow-hidden">
              {isLoading && (
                <div className="absolute inset-0 z-10 bg-neutral-950 flex flex-col items-center justify-center p-6 text-center select-none">
                  <div className="relative w-8 h-8 mb-4">
                    <div className="absolute inset-0 rounded-full border border-neutral-800" />
                    <div className="absolute inset-0 rounded-full border-t border-neutral-400 animate-spin" />
                  </div>
                  <div className="font-mono text-[9px] tracking-widest text-neutral-400 uppercase">
                    ESTABLISHING SANDBOX CONNECTION
                  </div>
                  <div className="font-mono text-[8px] text-neutral-600 mt-1">
                    TUNNELING PORT 443 &larr; HTTPS
                  </div>
                </div>
              )}

              {/* Show the sandbox fallback warning overlay inside the iframe box */}
              {showFallbackWarning && (
                <div className="absolute bottom-2.5 left-2.5 right-2.5 z-20 bg-neutral-900/95 backdrop-blur-md p-3 rounded-lg border border-neutral-800 flex items-center justify-between gap-3 text-left">
                  <div className="flex-1">
                    <div className="font-mono text-[9px] font-bold text-neutral-300">
                      EMBEDDED CONNECTION ACTIVE
                    </div>
                    <div className="font-mono text-[8px] text-neutral-500 leading-normal mt-0.5">
                      If browser security limits the iframe display, launch directly below.
                    </div>
                  </div>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 bg-white hover:bg-neutral-100 text-neutral-950 font-mono text-[9px] px-2.5 py-1.5 rounded font-bold transition flex items-center gap-1 shadow-sm"
                  >
                    LAUNCH DIRECTLY
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              )}

              <iframe
                ref={iframeRef}
                src={iframeUrl}
                onLoad={() => setIsLoading(false)}
                referrerPolicy="no-referrer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                className="w-full h-full border-none bg-white"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            </div>
          </div>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between border-t border-neutral-100">
        <div>
          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 mb-2">
            <span className="uppercase tracking-widest">{project.role}</span>
            <span>{project.year}</span>
          </div>

          <div className="mb-3">
            <h3 className="font-display text-xl tracking-tight text-neutral-900 font-semibold mb-0.5">
              {project.title}
            </h3>
            <p className="text-xs font-mono text-neutral-500 font-medium">
              {project.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap gap-1 mb-4">
            {project.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="bg-neutral-100 text-neutral-600 font-mono text-[9px] px-2 py-0.5 rounded border border-neutral-200/40"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-neutral-600 text-xs leading-relaxed mb-4">
            {project.description}
          </p>

          <div className="mb-4">
            <button
              onClick={() => setShowTechDetails(!showTechDetails)}
              className="flex items-center gap-1 text-[10px] font-mono text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>{showTechDetails ? "HIDE TECHNICAL METRICS" : "EXPAND TECHNICAL METRICS"}</span>
            </button>
            {showTechDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 p-3 bg-neutral-50 rounded-lg border border-neutral-100"
              >
                <p className="text-neutral-500 font-mono text-[9px] leading-relaxed">
                  {project.technicalDetails}
                </p>
              </motion.div>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-500 hover:text-neutral-950 transition"
          >
            <Github className="w-3.5 h-3.5" />
            <span>SOURCE CODE</span>
          </a>

          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[10px] font-mono text-neutral-900 font-semibold hover:opacity-80 transition"
          >
            <span>LAUNCH PLATFORM</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};
