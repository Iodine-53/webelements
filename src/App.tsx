import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Layers, 
  Compass
} from "lucide-react";
import { GridShowcase } from "./components/GridShowcase";
import { ContactDrawer } from "./components/ContactDrawer";
import { designerInfo } from "./data/portfolioData";
import heroImage from "./assets/images/hero_image_new.jpg";

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
          <div className="absolute top-0 left-0 h-full w-[1px] bg-neutral-200/30 pointer-events-none" />
          <div className="absolute top-0 right-0 h-full w-[1px] bg-neutral-200/30 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Text Content */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-2 mb-6 text-neutral-400 font-mono text-[10px] tracking-widest"
              >
                <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "15s" }} />
                <span>COPENHAGEN DESIGN STUDIO // SPECIALIST FRONTEND CRAFT</span>
              </motion.div>

              <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tighter text-neutral-950 mb-8">
                Designing interfaces with architectural <span className="font-serif italic font-normal text-neutral-800">soul</span> and computational <span className="font-serif italic font-normal text-neutral-800">rigor</span>.
              </h1>

              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-sans text-neutral-600 text-base sm:text-lg leading-relaxed max-w-xl font-light"
              >
                An independent developer and designer calibrating space, typography, and physics-based motion to build bespoke web portfolios, structured indexes, and tactile digital architectures.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-12 pt-8 border-t border-neutral-200/60 grid grid-cols-2 gap-6 text-[10px] font-mono text-neutral-500"
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

            {/* Right Column: Hero Image with Frame/Aspect Style */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:col-span-5 flex justify-center items-center"
            >
              <div className="relative group w-full max-w-md lg:max-w-none">
                {/* Decorative border frame to add editorial/structural feel */}
                <div className="absolute -inset-3 rounded-2xl border border-neutral-200/50 pointer-events-none group-hover:scale-[1.02] transition-transform duration-500" />
                <div className="absolute inset-0 bg-neutral-900/5 rounded-xl pointer-events-none" />
                
                {/* Main Image */}
                <div className="aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] xl:aspect-[3/4] overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 shadow-md">
                  <img 
                    src={heroImage}
                    alt="Creative Direction Craft" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out scale-100 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                {/* Structural subtitle accent for image */}
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm border border-neutral-200 px-3 py-1.5 rounded-lg text-[9px] font-mono tracking-widest text-neutral-600 shadow-sm">
                  IMG_REF // 1782767108088
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="projects" className="py-12 md:py-20 scroll-mt-24">
          <GridShowcase />
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
