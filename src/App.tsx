import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Layers, 
  ArrowRight,
  Compass
} from "lucide-react";
import { GridShowcase } from "./components/GridShowcase";
import { BioSection } from "./components/BioSection";
import { ContactDrawer } from "./components/ContactDrawer";
import { designerInfo } from "./data/portfolioData";

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-neutral-900 selection:bg-neutral-900 selection:text-white flex flex-col items-center">
      <header 
        className={`fixed top-0 left-0 w-full z-30 transition-all duration-300 border-b ${
          scrolled 
            ? "bg-[#FAF9F6]/85 backdrop-blur-md py-3.5 border-neutral-200/80 shadow-[0_1px_10px_rgba(0,0,0,0.02)]" 
            : "bg-transparent py-6 border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <Layers className="w-4 h-4 text-neutral-800 transition-transform group-hover:rotate-12" />
            <span className="font-display font-semibold tracking-tight text-neutral-900 text-sm">
              ARTHUR VANCE
            </span>
            <span className="font-mono text-[9px] text-neutral-400 font-medium hidden sm:inline ml-2 border border-neutral-200 px-1.5 py-0.5 rounded">
              HQ_DK
            </span>
          </a>

          <nav className="flex items-center gap-4 sm:gap-8 font-mono text-[10px] tracking-widest text-neutral-500">
            <a href="#projects" className="hover:text-neutral-950 transition-colors uppercase">
              [INDEX]
            </a>
            <a href="#about" className="hover:text-neutral-950 transition-colors uppercase">
              [SYSTEMS]
            </a>
            <button 
              onClick={() => setIsContactOpen(true)}
              className="bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-[10px] font-bold tracking-widest px-4 py-2 rounded-lg transition-all duration-300 shadow-sm shadow-neutral-950/10 cursor-pointer uppercase"
            >
              INQUIRE
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl w-full mx-auto px-6 sm:px-8 pt-32 flex-1">
        <section className="py-12 md:py-20 lg:py-28 border-b border-neutral-200/80 mb-16 relative">
          <div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-neutral-200/50 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-neutral-200/50 via-transparent to-transparent pointer-events-none" />

          <div className="max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 mb-6 text-neutral-400 font-mono text-[10px] tracking-widest"
            >
              <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "15s" }} />
              <span>COPENHAGEN DESIGN STUDIO // SPECIALIST FRONTEND CRAFT</span>
            </motion.div>

            <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-7.5xl leading-[1.05] tracking-tighter text-neutral-950 mb-8">
              Designing <span className="font-serif italic font-normal text-neutral-800">tactile, spatial</span> digital interfaces.
            </h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-sans text-neutral-600 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl font-light"
            >
              I partner with premium architecture studios, creative software houses, and literary agencies to engineer custom web portfolios, functional indices, and mathematical geometries that respect structural boundaries.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12 pt-8 border-t border-neutral-200/60 grid grid-cols-2 md:grid-cols-4 gap-6 text-[10px] font-mono text-neutral-500"
            >
              <div>
                <span className="block text-neutral-300 mb-0.5">LOCATION COORDINATES</span>
                <span className="text-neutral-800 font-medium">55.6761° N, 12.5683° E</span>
              </div>
              <div>
                <span className="block text-neutral-300 mb-0.5">CURRENT DISCIPLINE</span>
                <span className="text-neutral-800 font-medium">CREATIVE FE & SYSTEMS</span>
              </div>
              <div>
                <span className="block text-neutral-300 mb-0.5">DEVELOPMENT STACK</span>
                <span className="text-neutral-800 font-medium">REACT 19 / VITE / TS / TAILWINDv4</span>
              </div>
              <div>
                <span className="block text-neutral-300 mb-0.5">GRID PARALLAX STATUS</span>
                <span className="text-neutral-800 font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                  STABLE ACTIVE
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="projects" className="py-12 md:py-20 scroll-mt-24">
          <GridShowcase />
        </section>

        <section className="scroll-mt-24">
          <BioSection />
        </section>

        <section className="py-20 border-t border-neutral-200 flex flex-col items-center justify-center text-center">
          <span className="font-mono text-[9px] tracking-widest text-neutral-400 uppercase mb-3">
            COLLABORATION PROTOCOL
          </span>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl text-neutral-900 tracking-tight max-w-lg mb-6">
            Have a custom creative platform requiring pristine engineering?
          </h2>
          <p className="font-sans text-xs text-neutral-500 max-w-sm leading-relaxed mb-8">
            Let&rsquo;s discuss custom grid boundaries, interactive typography components, and visual performance scales for your next release.
          </p>
          <button
            onClick={() => setIsContactOpen(true)}
            className="flex items-center gap-2 bg-neutral-950 hover:bg-neutral-800 text-white font-mono text-xs font-bold tracking-widest px-8 py-4 rounded-xl shadow-lg transition-all duration-300 hover:translate-y-[-2px] cursor-pointer"
          >
            <span>CALIBRATE AN INQUIRY</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>

      </main>

      <footer className="w-full bg-[#121212] text-neutral-400 py-12 border-t border-neutral-800 mt-auto">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1 items-center md:items-start">
            <div className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-neutral-300" />
              <span className="font-display font-semibold tracking-tight text-white text-xs">
                ARTHUR VANCE
              </span>
            </div>
            <p className="text-[10px] font-mono text-neutral-600 mt-1">
              &copy; {new Date().getFullYear()} Arthur Vance. All structures, codes, and geometries are legally licensed.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a 
              href={designerInfo.socials.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1.5 text-[10px] font-mono hover:text-white transition"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GITHUB</span>
            </a>
            <a 
              href={designerInfo.socials.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1.5 text-[10px] font-mono hover:text-white transition"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LINKEDIN</span>
            </a>
            <a 
              href={designerInfo.socials.twitter} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1.5 text-[10px] font-mono hover:text-white transition"
            >
              <Twitter className="w-3.5 h-3.5" />
              <span>TWITTER</span>
            </a>
          </div>
        </div>
      </footer>

      <ContactDrawer 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />

    </div>
  );
}
