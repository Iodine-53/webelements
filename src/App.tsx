import { useState, useEffect, useRef } from "react";
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
import { CodingIllustration } from "./components/CodingIllustration";
import { ServicesSection } from "./components/ServicesSection";
import { ContactSection } from "./components/ContactSection";
import fiverrIcon from "./assets/images/fiverr_icon.svg";
import logoImg from "./assets/images/logo.jpg";

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [footerVisibleHeight, setFooterVisibleHeight] = useState(0);
  const footerRef = useRef<HTMLElement>(null);

    useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const visibleHeight = Math.max(0, windowHeight - rect.top);
        setFooterVisibleHeight(visibleHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
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
            <img src={logoImg} alt="Webelements Logo" className="w-6 h-6 object-cover rounded-full" />
            <span className="font-display font-semibold tracking-tight text-neutral-900 text-sm">
              WEBELEMENTS
            </span>
            <span className="font-mono text-[9px] text-neutral-400 font-medium hidden sm:inline ml-2 border border-neutral-200 px-1.5 py-0.5 rounded">
              HQ_GLB
            </span>
          </a>

          <nav className="flex items-center gap-4 sm:gap-8 font-mono text-[10px] tracking-widest text-neutral-500">
            <a 
              href="https://www.fiverr.com/toptrustedguy/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center hover:opacity-85 transition-opacity"
              title="Fiverr Profile"
              id="header-fiverr-link"
            >
              <img 
                src="/fiverr_custom.jpg" 
                alt="Fiverr Icon" 
                className="w-6 h-6 rounded-md object-cover border border-neutral-200" 
              />
            </a>
            <a href="#projects" className="hover:text-neutral-950 transition-colors uppercase">
              [INDEX]
            </a>
            <button 
              onClick={() => setIsContactOpen(true)}
              className="bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-[10px] font-bold tracking-widest px-4 py-2 rounded-lg transition-all duration-300 shadow-sm shadow-neutral-950/10 cursor-pointer uppercase"
            >
              CONTACT
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl w-full mx-auto px-6 sm:px-8 pt-24 sm:pt-28 flex-1">
        <section className="py-8 md:py-12 lg:py-16 border-b border-neutral-200/80 mb-8 relative">
          <div className="absolute top-0 left-0 h-full w-[1px] bg-neutral-200/30 pointer-events-none" />
          <div className="absolute top-0 right-0 h-full w-[1px] bg-neutral-200/30 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center">
            <div className="md:col-span-7 flex flex-col justify-center">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-2 mb-6 text-neutral-400 font-mono text-[10px] tracking-widest"
              >
                <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "15s" }} />
                <span>WEBELEMENTS - FRONTEND DEVELOPMENT STUDIO</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-4 text-neutral-600 font-display text-xl sm:text-2xl flex items-baseline gap-2"
              >
                <span>My</span>
                <div className="wordmark text-neutral-900">
                  <span>P</span><div className="ring ring-1"></div><span>rtf</span><div className="ring ring-2"></div><span>li</span><div className="ring ring-3"></div>
                </div>
                <span>website</span>
              </motion.div>

              <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tighter text-neutral-950 mb-8">
                Building fast, clean, and <span className="font-serif italic font-normal text-neutral-800">functional</span> web experiences.
              </h1>

              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-sans text-neutral-600 text-base sm:text-lg leading-relaxed max-w-xl font-light"
              >
                A frontend studio focused on straightforward design and reliable code. We create web applications and sites that prioritize performance and usability.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-12 pt-8 border-t border-neutral-200/60 grid grid-cols-2 sm:grid-cols-3 gap-6 text-[10px] font-mono text-neutral-500"
              >
                <div>
                  <span className="block text-neutral-300 mb-0.5">CURRENT FOCUS</span>
                  <span className="text-neutral-800 font-medium">FRONTEND DEVELOPMENT</span>
                </div>
                <div>
                  <span className="block text-neutral-300 mb-0.5">DEVELOPMENT STACK</span>
                  <span className="text-neutral-800 font-medium">REACT 19 / VITE / TS / TAILWINDv4</span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="block text-neutral-300 mb-0.5">STATUS</span>
                  <span className="text-neutral-800 font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                    ACCEPTING NEW PROJECTS
                  </span>
                </div>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="md:col-span-5 flex justify-center items-center"
            >
              <CodingIllustration />
            </motion.div>
          </div>
        </section>

        <ServicesSection />

        <section id="projects" className="py-6 md:py-10 scroll-mt-20">
          <GridShowcase />
        </section>

        <section id="contact" className="py-6 md:py-10 scroll-mt-20">
          <ContactSection />
        </section>

      </main>

      <footer ref={footerRef} className="w-full bg-[#121212] text-neutral-400 py-12 border-t border-neutral-800 mt-auto">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1 items-center md:items-start">
            <div className="flex items-center gap-2">
              <img src={logoImg} alt="Webelements Logo" className="w-5 h-5 object-cover rounded-full opacity-80 grayscale" />
              <span className="font-display font-semibold tracking-tight text-white text-xs">
                WEBELEMENTS
              </span>
            </div>
            <p className="text-[10px] font-mono text-neutral-600 mt-1">
              &copy; {new Date().getFullYear()} Webelements. All structures, codes, and layouts are legally licensed.
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

      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3.5 items-end" style={{ transform: `translateY(-${footerVisibleHeight}px)`, transition: 'transform 0.1s ease-out' }}>
        <motion.a
          href="https://www.fiverr.com/toptrustedguy/"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.0, type: "spring", stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#1dbf73] hover:bg-[#10a85c] text-white p-3.5 rounded-xl shadow-lg shadow-green-900/10 flex items-center justify-center group transition-all cursor-pointer"
          aria-label="Hire on Fiverr"
        >
          <span className="absolute right-14 bg-neutral-900 text-white text-[9px] font-mono tracking-wider px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border border-neutral-800 shadow-sm">
            HIRE ON FIVERR
          </span>
          <div className="w-6 h-6 rounded-sm overflow-hidden flex items-center justify-center bg-white">
            <img src={fiverrIcon} alt="Fiverr" className="w-full h-full object-contain" />
          </div>
        </motion.a>

        <motion.a
          href="https://wa.me/2348106124183?text=Hello!%20I'd%20like%20to%20inquire%20about%20a%20project."
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 rounded-full shadow-lg shadow-green-900/10 flex items-center justify-center group transition-all cursor-pointer"
          aria-label="Chat on WhatsApp"
        >
          <span className="absolute right-14 bg-neutral-900 text-white text-[9px] font-mono tracking-wider px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border border-neutral-800 shadow-sm">
            CHAT ON WHATSAPP
          </span>
          <svg viewBox="0 0 24 24" className="w-5.5 h-5.5 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.761.459 3.414 1.259 4.86L2 22l5.352-1.405c1.405.765 3.012 1.205 4.66 1.205 5.506 0 10.012-4.482 10.012-9.988C22.024 6.482 17.518 2 12.012 2zm5.724 13.918c-.247.694-1.424 1.259-1.953 1.341-.53.082-1.07.153-2.588-.447-1.965-.776-3.176-2.776-3.271-2.906-.094-.13-1.129-1.506-1.129-2.87 0-1.365.706-2.035.965-2.306.259-.27.565-.341.753-.341.188 0 .376.012.541.024.176.012.412-.047.647.506.247.588.847 2.071.918 2.224.07.153.118.33.012.541-.106.212-.165.341-.33.53-.165.188-.353.424-.506.565-.165.153-.341.318-.141.659.2.341.882 1.459 1.894 2.365.871.776 1.6 1.012 1.953 1.165.353.153.565.118.776-.13.212-.247.918-1.07 1.165-1.435.247-.365.494-.306.824-.188.33.118 2.106 1.047 2.471 1.224.365.176.612.259.706.412.094.165.094.941-.153 1.635z" />
          </svg>
        </motion.a>
      </div>

    </div>
  );
}
