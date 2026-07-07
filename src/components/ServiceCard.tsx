import React from "react";
import { ArrowRight } from "lucide-react";
import { ServiceItem } from "./ServicesSection";

export interface ServiceCardProps {
  service: ServiceItem;
  index: number;
  isActive: boolean;
  onClick: () => void;
  theme: {
    accent: string;
    bgLight: string;
    border: string;
    glow: string;
    gradient: string;
    textGradient: string;
    iconBg: string;
    iconBgActive: string;
    tabGlow: string;
    badge: string;
  };
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  index,
  isActive,
  onClick,
  theme,
}) => {
  const IconComponent = service.icon;

  return (
    <button
      id={`service-tab-${service.id}`}
      onClick={onClick}
      className={`w-full text-left p-5 rounded-xl border transition-all duration-300 relative group overflow-hidden cursor-pointer ${
        isActive 
          ? `${theme.tabGlow} border-neutral-900 bg-white` 
          : "bg-white/50 border-neutral-200/60 hover:bg-white hover:border-neutral-300 hover:shadow-xs"
      }`}
    >
      <div 
        className={`absolute left-0 top-0 h-full w-[4px] transition-all duration-300 ${
          isActive ? `bg-gradient-to-b ${theme.gradient}` : "bg-transparent group-hover:bg-neutral-300"
        }`} 
      />

      <div className="flex items-start gap-4">
        <div className={`p-2.5 rounded-lg border transition-all duration-300 ${
          isActive 
            ? theme.iconBgActive 
            : "bg-neutral-50 text-neutral-500 border-neutral-100 group-hover:text-neutral-950 group-hover:border-neutral-200"
        }`}>
          <IconComponent className="w-4 h-4" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className={`font-mono text-[8px] font-semibold uppercase tracking-widest transition-colors duration-300 ${
              isActive ? theme.accent : "text-neutral-400"
            }`}>
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
};
