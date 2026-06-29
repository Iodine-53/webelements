import { Project, DesignerInfo } from "../types";
import imageAether from "../assets/images/project_aether_1782747484936.jpg";
import imageKore from "../assets/images/project_kore_1782747499933.jpg";
import imageVellum from "../assets/images/project_vellum_1782747513385.jpg";
import imageHelix from "../assets/images/project_helix_1782747528637.jpg";

export const designerInfo: DesignerInfo = {
  name: "Arthur Vance",
  title: "Creative Frontend Designer",
  bio: "Arthur Vance is an independent frontend developer and digital designer crafting bespoke visual systems for digital products, architectural indices, and art publications. Working at the intersection of typography, mathematical geometry, and fluid reactive motion, he creates web environments that feel both tactile and digital.",
  philosophy: "I believe the web is an expressive, physical medium. Design is not about wrapping content in standard frameworks; it is about calibrating layout, typography, and negative space to construct a distinct atmosphere. My work focuses on structured asymmetry, subtle physical interactions, and modular system design.",
  location: "Copenhagen, Denmark",
  timezone: "CET (UTC+1)",
  email: "hello@arthurvance.design",
  socials: {
    github: "https://github.com/arthurvance",
    linkedin: "https://linkedin.com/in/arthurvance",
    twitter: "https://twitter.com/arthurvance",
    instagram: "https://instagram.com/arthurvance.design",
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
    id: "aether",
    title: "AETHER",
    subtitle: "Ambient Sound Synth",
    year: "2026",
    role: "Design & Creative Development",
    tags: ["Web Audio API", "HTML5 Canvas", "React", "Framer Motion"],
    description: "An interactive ambient soundscape generator designed for deep concentration and sensory grounding. Users modulate multi-channel ambient frequencies and binaural rhythms via real-time spatial cursor vectors over a flowing particulate wave.",
    technicalDetails: "Engineered using raw Web Audio API oscillators and gain nodes mapped to dynamic mouse movement. The background visual consists of a mathematical wave-mesh rendered on high-density HTML5 Canvas with custom damping equations.",
    image: imageAether,
    liveUrl: "https://aether.arthurvance.design",
    githubUrl: "https://github.com/arthurvance/aether-synth",
    color: "bg-slate-950",
    accentColor: "#38bdf8"
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
    id: "helix",
    title: "HELIX",
    subtitle: "Generative Pattern Space",
    year: "2025",
    role: "Creative Technologist",
    tags: ["SVG Trigonometry", "Generative Geometry", "Reactive Controllers"],
    description: "An interactive, browser-based mathematical canvas exploring recursive geometry, chaos theory spiral graphs, and matrix coordinate mutations through dynamic sliders.",
    technicalDetails: "Constructed utilizing raw reactive SVG vector path elements rendering pure mathematical curves (Lissajous knots and Rose curves) in real-time. Leverages standard React state-binding optimized for high-frequency coordinate changes.",
    image: imageHelix,
    liveUrl: "https://helix.arthurvance.design",
    githubUrl: "https://github.com/arthurvance/helix-patterns",
    color: "bg-purple-950",
    accentColor: "#a855f7"
  }
];
