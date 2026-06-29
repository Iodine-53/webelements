import React from "react";
import { ProjectCard } from "./ProjectCard";
import { projects } from "../data/portfolioData";

export const GridShowcase: React.FC = () => {
  return (
    <div className="w-full">
      <div className="mb-12 md:mb-16 border-b border-neutral-200 pb-4 flex items-baseline justify-between">
        <h2 className="font-display font-medium text-xs tracking-widest text-neutral-400 uppercase">
          SELECTED COMMISSIONED WORKS
        </h2>
        <span className="font-mono text-[10px] text-neutral-500">
          [COUNT: {projects.length}]
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 md:gap-y-24 items-start pb-20">
        {projects.map((project, index) => {
          const alignmentClass =
            index === 1
              ? "md:pt-24 lg:pt-36"
              : index === 2
              ? "md:-mt-12 lg:-mt-16"
              : index === 3
              ? "md:pt-12 lg:pt-16"
              : "";

          return (
            <div 
              key={project.id} 
              className={`w-full ${alignmentClass}`}
            >
              <ProjectCard project={project} index={index} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
