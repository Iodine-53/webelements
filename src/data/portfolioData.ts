import { Project, DesignerInfo } from "../types";
import imageAura from "../assets/images/aura_app.jpg";
import imageNero from "../assets/images/project_nero.png";
import imageSpotTravel from "../assets/images/spot_travel.jpg";

export const designerInfo: DesignerInfo = {
  name: "Webelements",
  title: "Frontend & UI Studio",
  bio: "Webelements is a frontend design and development studio. We build websites and web applications, focusing on clean layouts, modern frameworks, and smooth interactions.",
  philosophy: "We focus on building functional and fast websites. A good digital experience comes from well-written code, clear typography, and thoughtful design choices.",
  location: "Remote / Global",
  timezone: "GMT/UTC",
  email: "creativfussion01@gmail.com",
  socials: {
    github: "https://github.com/Iodine-53",
    linkedin: "https://linkedin.com/in/webelements",
    twitter: "https://twitter.com/webelements",
    instagram: "https://instagram.com/webelements.design",
  },
  skills: {
    design: [
      "Typography",
      "Layout Design",
      "Wireframing",
      "Art Direction",
      "Color Systems",
      "Spacing"
    ],
    development: [
      "TypeScript & ES6+",
      "React Framework",
      "HTML5 & CSS",
      "Framer Motion",
      "Tailwind CSS",
      "Web Audio API"
    ],
    tools: [
      "Figma",
      "Vite & Esbuild",
      "Git",
      "Adobe Creative Suite",
      "Performance Profiling",
      "VS Code"
    ]
  }
};

export const projects: Project[] = [
  {
    id: "spottravel",
    title: "SPOT TRAVEL",
    subtitle: "Travel Planning Site",
    year: "2026",
    role: "Frontend Developer",
    tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
    description: "A travel planning site for a boutique agency. The focus was the homepage — instead of a generic hero banner, we built a curated photo layout that actually shows the kind of trips they plan.",
    technicalDetails: "Built with React, TypeScript, Tailwind CSS, and Framer Motion. Bundled with Vite.",
    image: imageSpotTravel,
    liveUrl: "https://spotravel.vercel.app/",
    githubUrl: "https://github.com/Iodine-53/styletravel",
    color: "bg-[#0b1210]",
    accentColor: "#d4af37"
  },
  {
    id: "aura",
    title: "AURA",
    subtitle: "Social App Concept",
    year: "2026",
    role: "Frontend Developer",
    tags: ["React 19", "TypeScript", "Tailwind v4", "Framer Motion", "Web Audio API"],
    description: "A social app concept exploring decentralized identity (Lens Protocol). My role was the entire frontend — component architecture, animation, and the audio system.",
    technicalDetails: "React 19 + TypeScript\nTailwind v4\nFramer Motion\nWeb Audio API (no libraries — hand-rolled synth)",
    image: imageAura,
    liveUrl: "https://aurapp-red.vercel.app/",
    githubUrl: "https://github.com/Iodine-53/aurapp",
    color: "bg-[#0c0914]",
    accentColor: "#a855f7"
  },
  {
    id: "nero",
    title: "NERO ESTORE",
    subtitle: "Running Apparel E-commerce",
    year: "2026",
    role: "Frontend Developer",
    tags: ["React 19", "Tailwind v4", "Motion", "Vite 6"],
    description: "An e-commerce site for a running apparel brand. Built the whole shopping flow — product pages, gallery, cart — with a dark, minimal look that matches the brand's photography instead of fighting it.",
    technicalDetails: "Built with React 19, TypeScript 5.8, and Vite 6. Uses Tailwind CSS v4 for styling and Motion for animations and transitions.",
    image: imageNero,
    liveUrl: "https://nerofashion.vercel.app/",
    githubUrl: "https://github.com/Iodine-53/nerofashion",
    color: "bg-neutral-950",
    accentColor: "#f5f5f5"
  }
];
