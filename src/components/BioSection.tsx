import React, { useEffect, useState } from "react";
import { designerInfo } from "../data/portfolioData";
import { Compass, Clock, Terminal, Feather, Cpu, Layout } from "lucide-react";

export const BioSection: React.FC = () => {
  const [copenhagenTime, setCopenhagenTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      try {
        const options: Intl.DateTimeFormatOptions = {
          timeZone: "Europe/Copenhagen",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        };
        const formatter = new Intl.DateTimeFormat("en-US", options);
        setCopenhagenTime(formatter.format(new Date()));
      } catch (err) {
        const d = new Date();
        setCopenhagenTime(d.toTimeString().split(" ")[0]);
      }
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full border-t border-neutral-200 pt-16 md:pt-24 pb-16" id="about">
      {/* Section Header */}
      <div className="mb-12 border-b border-neutral-100 pb-4 flex items-baseline justify-between">
        <h2 className="font-display font-medium text-xs tracking-widest text-neutral-400 uppercase">
          ABOUT & SYSTEM PHILOSOPHY
        </h2>
        <span className="font-mono text-[10px] text-neutral-500">
          [STATUS: AVAILABLE FOR INQUIRIES]
        </span>
      </div>

      {/* Main Content Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16">
        {/* Left Column: Narrative Bio */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <h3 className="font-serif text-3xl sm:text-4xl italic text-neutral-900 font-normal leading-tight tracking-tight mb-6">
              &ldquo;Design is the physical structure of digital thoughts.&rdquo;
            </h3>
            <p className="text-neutral-700 text-sm leading-relaxed mb-6">
              {designerInfo.bio}
            </p>
            <p className="text-neutral-600 text-sm leading-relaxed">
              {designerInfo.philosophy}
            </p>
          </div>

          {/* Metadata Badges */}
          <div className="mt-8 pt-6 border-t border-neutral-200/50 flex flex-wrap gap-x-8 gap-y-3">
            <div className="flex items-center gap-2 text-neutral-500 font-mono text-[10px]">
              <Compass className="w-3.5 h-3.5 text-neutral-400" />
              <span>LOCATION: {designerInfo.location.toUpperCase()}</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-800 font-mono text-[10px] font-semibold">
              <Clock className="w-3.5 h-3.5 text-neutral-500" />
              <span>TIMEZONE: {copenhagenTime || "00:00:00"} {designerInfo.timezone}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Clean, Stable Calibration Terminal Panel */}
        <div className="lg:col-span-5 flex items-stretch">
          <div className="w-full bg-neutral-100/60 rounded-xl p-6 border border-neutral-200/50 flex flex-col justify-between relative overflow-hidden select-none">
            {/* Visual Header */}
            <div className="flex justify-between items-center pb-4 border-b border-neutral-200/80">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neutral-900 animate-pulse" />
                <span className="font-mono text-[9px] text-neutral-800 font-semibold tracking-wider">SYSTEM_CORE_ONLINE</span>
              </div>
              <span className="font-mono text-[9px] text-neutral-400">ID: AV-094</span>
            </div>

            {/* Core Stats / Grid Simulation Visualizer */}
            <div className="my-6 space-y-4">
              <div className="p-3 bg-white border border-neutral-200/60 rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                <div className="flex justify-between text-[8px] font-mono text-neutral-400 mb-1.5">
                  <span>CANVAS_BOUNDING</span>
                  <span>100% x 100%</span>
                </div>
                <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-neutral-900 h-full w-4/5" />
                </div>
              </div>

              <div className="p-3 bg-white border border-neutral-200/60 rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                <div className="flex justify-between text-[8px] font-mono text-neutral-400 mb-1.5">
                  <span>CALIBRATION_FREQUENCY</span>
                  <span>220 Hz Base</span>
                </div>
                <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-neutral-900 h-full w-3/5" />
                </div>
              </div>
            </div>

            {/* Visual Footer */}
            <div className="flex justify-between items-center pt-4 border-t border-neutral-200/80 font-mono text-[8px] text-neutral-400">
              <span>COPENHAGEN_HQ</span>
              <span>BUILD_VER_1.0.4</span>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-neutral-200/60">
        {/* Visual Systems Card */}
        <div className="p-5 bg-white rounded-xl border border-neutral-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-neutral-300 transition-colors duration-200">
          <div className="flex items-center gap-2 mb-4">
            <Feather className="w-4 h-4 text-neutral-500" />
            <h4 className="font-display font-semibold text-xs tracking-wider text-neutral-900 uppercase">
              VISUAL SYSTEMS
            </h4>
          </div>
          <ul className="space-y-2.5">
            {designerInfo.skills.design.map((skill, idx) => (
              <li key={idx} className="flex items-baseline gap-2 text-neutral-600 text-xs font-mono">
                <span className="text-neutral-300 text-[9px]">[{String(idx+1).padStart(2, "0")}]</span>
                <span>{skill}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Creative Code Card */}
        <div className="p-5 bg-white rounded-xl border border-neutral-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-neutral-300 transition-colors duration-200">
          <div className="flex items-center gap-2 mb-4">
            <Terminal className="w-4 h-4 text-neutral-500" />
            <h4 className="font-display font-semibold text-xs tracking-wider text-neutral-900 uppercase">
              CREATIVE CODE
            </h4>
          </div>
          <ul className="space-y-2.5">
            {designerInfo.skills.development.map((skill, idx) => (
              <li key={idx} className="flex items-baseline gap-2 text-neutral-600 text-xs font-mono">
                <span className="text-neutral-300 text-[9px]">[{String(idx+1).padStart(2, "0")}]</span>
                <span>{skill}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Environment & Tools Card */}
        <div className="p-5 bg-white rounded-xl border border-neutral-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-neutral-300 transition-colors duration-200">
          <div className="flex items-center gap-2 mb-4">
            <Layout className="w-4 h-4 text-neutral-500" />
            <h4 className="font-display font-semibold text-xs tracking-wider text-neutral-900 uppercase">
              ENVIRONMENT & TOOLS
            </h4>
          </div>
          <ul className="space-y-2.5">
            {designerInfo.skills.tools.map((skill, idx) => (
              <li key={idx} className="flex items-baseline gap-2 text-neutral-600 text-xs font-mono">
                <span className="text-neutral-300 text-[9px]">[{String(idx+1).padStart(2, "0")}]</span>
                <span>{skill}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
