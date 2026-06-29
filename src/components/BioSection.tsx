import React, { useEffect, useState } from "react";
import { designerInfo } from "../data/portfolioData";
import { Compass, Clock, Terminal, Feather } from "lucide-react";

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
      <div className="mb-12 border-b border-neutral-100 pb-4 flex items-baseline justify-between">
        <h2 className="font-display font-medium text-xs tracking-widest text-neutral-400 uppercase">
          ABOUT & SYSTEM PHILOSOPHY
        </h2>
        <span className="font-mono text-[10px] text-neutral-500">
          [STATUS: AVAILABLE FOR INQUIRIES]
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16">
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

          <div className="mt-8 pt-6 border-t border-neutral-200/50 flex flex-wrap gap-x-8 gap-y-3">
            <div className="flex items-center gap-2 text-neutral-500 font-mono text-[10px]">
              <Compass className="w-3.5 h-3.5 text-neutral-400" />
              <span>LOCATION: {designerInfo.location.toUpperCase()}</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-800 font-mono text-[10px] font-semibold">
              <Clock className="w-3.5 h-3.5 text-neutral-500 animate-spin" style={{ animationDuration: "12s" }} />
              <span>TIMEZONE: {copenhagenTime || "00:00:00"} {designerInfo.timezone}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex items-center justify-center relative bg-neutral-50 rounded-xl p-6 border border-neutral-200/40 overflow-hidden">
          <div className="w-full h-full min-h-[220px] border border-neutral-200/80 rounded p-4 relative flex flex-col justify-between select-none">
            <div className="absolute top-0 left-12 h-full w-[1px] bg-neutral-200/50" />
            <div className="absolute top-0 right-24 h-full w-[1px] bg-neutral-200/50" />
            <div className="absolute top-20 left-0 w-full h-[1px] bg-neutral-200/50" />

            <div className="flex justify-between items-start font-mono text-[8px] text-neutral-400">
              <span>CANVAS_BOUNDING: [100% x 100%]</span>
              <span>CALIBRATION: ACTIVE</span>
            </div>

            <div className="space-y-2 z-10">
              <div className="w-16 h-1 bg-neutral-900" />
              <div className="w-3/4 h-3 border border-neutral-300 bg-white" />
              <div className="w-1/2 h-2 border border-neutral-300 bg-white" />
            </div>

            <div className="flex justify-between items-end font-mono text-[8px] text-neutral-400">
              <span>COPENHAGEN_HQ</span>
              <span>v1.0.4</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-neutral-100">
        <div className="p-5 bg-neutral-50/50 rounded-lg border border-neutral-200/30">
          <div className="flex items-center gap-2 mb-4">
            <Feather className="w-4 h-4 text-neutral-400" />
            <h4 className="font-display font-medium text-xs tracking-wider text-neutral-900 uppercase">
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

        <div className="p-5 bg-neutral-50/50 rounded-lg border border-neutral-200/30">
          <div className="flex items-center gap-2 mb-4">
            <Terminal className="w-4 h-4 text-neutral-400" />
            <h4 className="font-display font-medium text-xs tracking-wider text-neutral-900 uppercase">
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

        <div className="p-5 bg-neutral-50/50 rounded-lg border border-neutral-200/30">
          <div className="flex items-center gap-2 mb-4">
            <Compass className="w-4 h-4 text-neutral-400" />
            <h4 className="font-display font-medium text-xs tracking-wider text-neutral-900 uppercase">
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
