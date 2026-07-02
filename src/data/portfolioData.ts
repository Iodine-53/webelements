import { Project, DesignerInfo } from "../types";
import imageAura from "../assets/images/aura_app.jpg";
import imageKore from "../assets/images/project_kore_1782747499933.jpg";
import imageVellum from "../assets/images/project_vellum_1782747513385.jpg";
import imageNero from "../assets/images/project_nero.png";
import imageSpotTravel from "../assets/images/spot_travel.jpg";

export const designerInfo: DesignerInfo = {
  name: "Webelements",
  title: "Bespoke Frontend & UI Studio",
  bio: "Webelements is an independent frontend design and development studio crafting high-precision visual systems, performance-driven web interfaces, and fluid digital experiences. Working at the intersection of clean structural layouts, modern development frameworks, and tactile interactive animations.",
  philosophy: "We believe the web is an expressive, physical medium. Great digital work is not about wrapping content in generic layouts—it is about the meticulous calibration of spacing, typography, and physical micro-interactions to curate a distinct aesthetic and seamless functional flow.",
  location: "Remote / Global",
  timezone: "GMT/UTC",
  email: "hello@webelements.design",
  socials: {
    github: "https://github.com/Iodine-53",
    linkedin: "https://linkedin.com/in/webelements",
    twitter: "https://twitter.com/webelements",
    instagram: "https://instagram.com/webelements.design",
  },
  skills: {
    design: [
      "Typographic Calibration",
      "Structural Layout Grids",
      "Interactive Wireframing",
      "Art Direction & Branding",
      "Visual Color Systems",
      "Asymmetric Spacing Rules"
    ],
    development: [
      "TypeScript & Modern ES6+",
      "React Framework Architecture",
      "HTML5 Canvas & Math Vectors",
      "Framer Motion Animations",
      "Tailwind CSS Utility Design",
      "Web Audio Synthesis"
    ],
    tools: [
      "Figma Prototyping",
      "Vite & Esbuild",
      "Git & Collaborative Workflow",
      "Adobe Creative Suite",
      "Chrome Performance Tooling",
      "VS Code Environment"
    ]
  }
};

export const projects: Project[] = [
  {
    id: "spottravel",
    title: "SPOT TRAVEL",
    subtitle: "Curated Bespoke Journeys",
    year: "2026",
    role: "Lead Interactive Designer",
    tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
    description: "At Spots, we design highly curated, editorially driven bespoke journeys for discerning travelers. Rather than standard tourist itineraries or boilerplate hotel bookings, we focus on an intentional, highly personalized approach to travel design.",
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
    subtitle: "Decentralized Social Ecosystem",
    year: "2026",
    role: "Lead Protocol & UI Architect",
    tags: ["React 19", "TypeScript", "Tailwind v4", "Framer Motion", "Web Audio API"],
    description: "Aura is a decentralized, mobile-first social media ecosystem designed to return complete ownership and control of digital identity, content, and relationships to creators and users. Built on decentralized Web3 protocols (specifically the Lens Protocol and XMTP).",
    technicalDetails: "React 19 + TypeScript\nTailwind v4\nFramer Motion\nWeb Audio API (no libraries — hand-rolled synth)",
    image: imageAura,
    liveUrl: "https://aurapp-red.vercel.app/",
    githubUrl: "https://github.com/Iodine-53/aurapp",
    color: "bg-[#0c0914]",
    accentColor: "#a855f7"
  },
  {
    id: "kore",
    title: "KORE INDEX",
    subtitle: "Brutalist Architecture Archive",
    year: "2025",
    role: "Lead Frontend Architect",
    tags: ["TypeScript", "Dynamic CSS Grids", "Custom Intersection API"],
    description: "A high-density web-based photographic archive cataloging brutalist structural architecture worldwide. Prioritizes harsh structural layouts, monochromatic high-contrast photography, and a modular index.",
    technicalDetails: "Leverages a customized CSS Grid Subgrid structure and low-level IntersectionObservers to achieve seamless lazy-loading, smooth entry thresholds, and staggered visual reveals without affecting main-thread frame rates.",
    image: imageKore,
    liveUrl: "https://kore.arthurvance.design",
    githubUrl: "https://github.com/arthurvance/kore-index",
    color: "bg-neutral-900",
    accentColor: "#f5f5f5"
  },
  {
    id: "vellum",
    title: "VELLUM",
    subtitle: "Editorial Reading Interface",
    year: "2026",
    role: "UI/UX Designer & Developer",
    tags: ["CSS Variable Injection", "Local Storage Sync", "Refined Typography"],
    description: "A distraction-free digital publishing environment crafted for long-form critical essays and literature. It strips away all standard browser chrome, rendering text in mathematically calibrated columns with premium serif hierarchy.",
    technicalDetails: "Implements real-time CSS variable mutations supporting an eye-care theme engine (Warm Linen, Solarized Cream, Obsidian Slate), fluid sliding transitions, dynamic reading pace trackers, and offline page state persistence.",
    image: imageVellum,
    liveUrl: "https://vellum.arthurvance.design",
    githubUrl: "https://github.com/arthurvance/vellum-reader",
    color: "bg-[#F4F1EA]",
    accentColor: "#9a3412"
  },
  {
    id: "nero",
    title: "NERO ESTORE",
    subtitle: "Technical Apparel System",
    year: "2026",
    role: "Creative Frontend Engineer",
    tags: ["React 19", "Tailwind v4", "Motion", "Vite 6"],
    description: "Nero isn't just sports clothing; it’s a thoughtfully engineered system of apparel. It’s designed for individuals who demand technical mastery from their activewear but still appreciate the quiet elegance of high-end, minimalist design. Whether they are pushing through a chilly morning run or heading straight to a meeting in the city, Nero is built to transition beautifully with them.",
    technicalDetails: "Engineered using React 19, TypeScript 5.8, and Vite 6 for high performance. Powered by Tailwind CSS v4 for clean, utility-first styling and Motion for physical, fluid micro-interactions, responsive grids, and elegant layout transitions.",
    image: imageNero,
    liveUrl: "https://nerofashion.vercel.app/",
    githubUrl: "https://github.com/Iodine-53/nerofashion",
    color: "bg-neutral-950",
    accentColor: "#f5f5f5"
  }
];
