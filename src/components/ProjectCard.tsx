import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { Project } from "../types";
import { InteractivePreview } from "./InteractivePreview";
import { ExternalLink, Github, Monitor, Cpu, Code2 } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<"mockup" | "simulation">("mockup");
  const [showTechDetails, setShowTechDetails] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
      <div className="relative aspect-[16:10] w-full bg-neutral-950 overflow-hidden group">
        {viewMode === "mockup" ? (
          <div className="w-full h-full relative overflow-hidden">
            <motion.img
              src={project.image}
              alt={`${project.title} Mockup Preview`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-neutral-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="bg-white/90 backdrop-blur text-neutral-900 font-mono text-[10px] tracking-wider px-3 py-1.5 rounded-full shadow-sm">
                VIEW LIVE SIMULATION IN PANEL
              </span>
            </div>
          </div>
        ) : (
          <div className="w-full h-full p-2 bg-neutral-950">
            <InteractivePreview projectId={project.id} />
          </div>
        )}

        <div className="absolute top-3 right-3 flex bg-white/95 backdrop-blur-md p-0.5 rounded-lg border border-neutral-200 shadow-sm z-20">
          <button
            onClick={() => setViewMode("mockup")}
            className={`flex items-center gap-1 px-2.5 py-1 text-[10px] font-mono tracking-wider transition rounded-md ${
              viewMode === "mockup"
                ? "bg-neutral-900 text-white font-medium"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            <Monitor className="w-3 h-3" />
            <span>MOCKUP</span>
          </button>
          <button
            onClick={() => setViewMode("simulation")}
            className={`flex items-center gap-1 px-2.5 py-1 text-[10px] font-mono tracking-wider transition rounded-md ${
              viewMode === "simulation"
                ? "bg-neutral-900 text-white font-medium"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            <Cpu className="w-3 h-3" />
            <span>SANDBOX</span>
          </button>
        </div>

        <div className="absolute bottom-3 left-3 bg-neutral-900/80 backdrop-blur-md text-[9px] font-mono text-neutral-300 px-2 py-0.5 rounded-md border border-neutral-800">
          INDEX_{String(index + 1).padStart(2, "0")}
        </div>
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
