import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Lottie from "lottie-react";
import { Wifi, Battery, AlertTriangle, Terminal, Check, RefreshCw } from "lucide-react";
import servicesLottieData from "../assets/services_tech.json";

export const androidIssues = [
  {
    title: "Unresolved Compose View State",
    errorSnippet: `
@Composable
fun MainScreen() {
    val state = remember { mutableStateOf("Vance") }
    // Error: val cannot be reassigned inside onValueChange
    TextField(value = state, onValueChange = { state = it }) 
}`,
    fixedSnippet: `
@Composable
fun MainScreen() {
    // Fix: use "by" delegate so state can be reassigned
    var state by remember { mutableStateOf("Vance") }
    
    TextField(value = state, onValueChange = { state = it })
}`
  },
  {
    title: "Coroutine Leak in lifecycleScope",
    errorSnippet: `
override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
    // Warning: GlobalScope ignores the view lifecycle, causing leaks
    GlobalScope.launch {
        viewModel.analyticsFlow.collect { renderData(it) }
    }
}`,
    fixedSnippet: `
override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
    // Fix: scope tied to view lifecycle, auto-cancels on destroy
    viewLifecycleOwner.lifecycleScope.launch {
        viewLifecycleOwner.repeatOnLifecycle(Lifecycle.State.STARTED) {
            viewModel.analyticsFlow.collect { renderData(it) }
        }
    }
}`
  },
  {
    title: "Gradle Dependency JVM Incompat",
    errorSnippet: `
android {
    compileSdk = 34
    kotlinOptions {
      // Error: jvmTarget 1.8 incompatible with compileSdk 34
      jvmTarget = "1.8" 
    }
}`,
    fixedSnippet: `
android {
    compileSdk = 34
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions {
        // Fix: aligned jvmTarget with sourceCompatibility 17
        jvmTarget = "17"
    }
}`
  }
];

interface AndroidIssueViewerProps {
  compileState: "idle" | "compiling" | "success";
  setCompileState: React.Dispatch<React.SetStateAction<"idle" | "compiling" | "success">>;
  compileProgress: number;
  setCompileProgress: React.Dispatch<React.SetStateAction<number>>;
  triggerKotlinCompiler: () => void;
}

export const AndroidIssueViewer: React.FC<AndroidIssueViewerProps> = ({
  compileState,
  setCompileState,
  compileProgress,
  setCompileProgress,
  triggerKotlinCompiler,
}) => {
  const [selectedIssue, setSelectedIssue] = useState<number>(0);

  useEffect(() => {
    setCompileState("idle");
    setCompileProgress(0);
  }, [selectedIssue]);

  const renderKotlinIDE = (code: string) => {
    return code.split("\n").map((line, lIdx) => {
      if (line.trim().startsWith("//")) {
        const isError = line.includes("❌") || line.includes("Error");
        const isSuccess = line.includes("SUCCESSFUL");
        return (
          <div key={lIdx} className={isError ? "text-rose-400 font-mono italic" : isSuccess ? "text-emerald-400 font-mono font-medium" : "text-neutral-500 font-mono"}>
            {line}
          </div>
        );
      }
      
      const words = line.split(/(\s+|\(|\)|\{|\}|\[|\]|\=|\,)/);
      const renderedLine = words.map((word, wIdx) => {
        const trimmed = word.trim();
        if (["fun", "val", "var", "by", "remember", "mutableStateOf", "override", "class", "interface", "return"].includes(trimmed)) {
          return <span key={wIdx} className="text-purple-400 font-bold font-mono">{word}</span>;
        }
        if (trimmed.startsWith("@")) {
          return <span key={wIdx} className="text-amber-400 font-mono font-medium">{word}</span>;
        }
        if (["MainScreen", "TextField", "onValueChange", "onViewCreated", "GlobalScope", "launch", "repeatOnLifecycle", "collect", "analyticsFlow", "viewLifecycleOwner", "lifecycleScope", "renderData", "compileSdk", "jvmTarget", "sourceCompatibility", "targetCompatibility", "JavaVersion", "VERSION_17"].includes(trimmed)) {
          return <span key={wIdx} className="text-sky-300 font-mono font-semibold">{word}</span>;
        }
        if (trimmed.match(/^\d+$/) || (trimmed.startsWith('"') && trimmed.endsWith('"')) || trimmed.startsWith("'")) {
          return <span key={wIdx} className="text-emerald-300 font-mono">{word}</span>;
        }
        return <span key={wIdx} className="text-neutral-300 font-mono">{word}</span>;
      });

      return (
        <div key={lIdx} className="font-mono min-h-[1.2rem] whitespace-pre-wrap">
          {renderedLine}
        </div>
      );
    });
  };

  return (
    <motion.div
      key="android-box"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="space-y-5 flex-1 flex flex-col justify-between"
      id="android-debugger-root"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch flex-1">
        <div className="md:col-span-8 flex flex-col justify-between space-y-4" id="ide-debugger-panel">
          <div>
            <div className="flex justify-between items-center text-[9px] font-mono text-neutral-400 mb-3">
              <span>KOTLIN JVM COMPILER DIAGNOSTIC</span>
              <span className="text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-100 font-bold">KOTLIN 2.0</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 p-1 bg-neutral-100 rounded-lg mb-3">
              {androidIssues.map((issue, idx) => (
                <button
                  key={idx}
                  id={`android-issue-btn-${idx}`}
                  onClick={() => setSelectedIssue(idx)}
                  className={`py-1.5 px-2 text-[9px] font-mono tracking-wider font-semibold rounded-md truncate text-left sm:text-center cursor-pointer transition-all ${
                    selectedIssue === idx 
                      ? "bg-white text-cyan-600 shadow-md font-bold border border-cyan-100" 
                      : "text-neutral-500 hover:text-neutral-800"
                  }`}
                  title={issue.title}
                >
                  ERROR 0{idx + 1}: {issue.title.split(" ").slice(0, 2).join(" ")}
                </button>
              ))}
            </div>

            <div className="relative rounded-xl overflow-hidden border border-neutral-900 bg-neutral-950 font-mono text-[9px] sm:text-[10px] leading-relaxed p-4 min-h-[175px] max-h-[175px] overflow-y-auto shadow-inner">
              <div className="absolute top-2 right-3 font-mono text-[7px] text-neutral-600 select-none">KotlinSource.kt</div>
              <AnimatePresence mode="wait">
                {compileState === "success" ? (
                  <motion.div 
                    key="success-code"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="whitespace-pre-wrap select-all text-neutral-300"
                  >
                    {renderKotlinIDE(androidIssues[selectedIssue].fixedSnippet)}
                  </motion.div>
                ) : (
                  <motion.div 
                    key="error-code"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="whitespace-pre-wrap text-neutral-300"
                  >
                    {renderKotlinIDE(androidIssues[selectedIssue].errorSnippet)}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="md:col-span-4 flex flex-col bg-neutral-50 border border-neutral-200 rounded-xl p-4 justify-between relative overflow-hidden min-h-[265px]" id="phone-emulator-panel">
          <div className="flex justify-between items-center mb-1">
            <span className="font-mono text-[8px] text-neutral-400 uppercase tracking-wider">JVM EMULATOR</span>
            <span className={`font-mono text-[8px] font-bold ${compileState === "success" ? "text-emerald-500 animate-pulse" : compileState === "compiling" ? "text-amber-500 animate-pulse" : "text-rose-500"}`}>
              {compileState === "success" ? "● LIVE" : compileState === "compiling" ? "● BULK_SYNC" : "● OFFLINE"}
            </span>
          </div>
          
          <div className="flex-1 flex items-center justify-center p-1">
            <div 
              className={`relative w-[115px] h-[195px] bg-neutral-950 rounded-2xl p-1.5 shadow-xl border border-neutral-800 flex flex-col justify-between overflow-hidden transition-all duration-500 ${
                compileState === "success" 
                  ? "ring-2 ring-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.25)]" 
                  : compileState === "compiling" 
                  ? "ring-2 ring-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.25)]" 
                  : "ring-2 ring-rose-500/40 shadow-[0_0_15px_rgba(239,68,68,0.15)]"
              }`}
            >
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-1.5 bg-neutral-900 rounded-full z-20 flex items-center justify-center">
                <div className="w-1.5 h-0.5 bg-neutral-800 rounded-full" />
              </div>
              
              <div className="w-full h-full bg-neutral-950 rounded-lg overflow-hidden relative flex flex-col justify-between items-center text-white">
                <div className="w-full px-2 pt-1 flex items-center justify-between text-[6px] text-neutral-400 select-none font-mono shrink-0">
                  <span>09:41</span>
                  <div className="flex items-center gap-1">
                    <Wifi className="w-1.5 h-1.5" />
                    <Battery className="w-2 h-1" />
                  </div>
                </div>

                <div className="flex-1 w-full flex flex-col justify-center items-center">
                  {compileState === "success" ? (
                    <div className="w-full h-full flex flex-col justify-between bg-white overflow-hidden p-0 relative">
                      <Lottie 
                        animationData={servicesLottieData} 
                        loop={true} 
                        style={{ width: "100%", height: "100%", transform: "scale(1.05)" }}
                      />
                      <div className="absolute bottom-1.5 left-0 right-0 text-center">
                        <span className="font-mono text-[5px] bg-emerald-500 text-white font-bold px-1 py-0.5 rounded shadow-sm uppercase tracking-widest">APP RUNNING</span>
                      </div>
                    </div>
                  ) : compileState === "compiling" ? (
                    <div className="flex flex-col items-center justify-center p-2 text-center space-y-2">
                      <RefreshCw className="w-5 h-5 text-amber-400 animate-spin" />
                      <span className="font-mono text-[6.5px] text-amber-300 font-bold tracking-widest leading-none uppercase animate-pulse">BUILDING APK</span>
                      <span className="font-mono text-[5px] text-neutral-500 leading-none">{compileProgress}% completed</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-2 text-center space-y-2 animate-pulse">
                      <AlertTriangle className="w-6 h-6 text-rose-500" />
                      <span className="font-mono text-[7px] text-rose-500 font-bold leading-none uppercase">RUNTIME CRASH</span>
                      <span className="font-mono text-[5.5px] text-neutral-400 leading-normal px-1">Execute diagnostic hotfix to rebuild APK</span>
                    </div>
                  )}
                </div>

                <div className="w-8 h-0.5 bg-neutral-800 rounded-full mx-auto mb-1 shrink-0" />
              </div>
            </div>
          </div>

          <div className="text-center mt-1">
            <span className="font-mono text-[7px] text-neutral-400 block uppercase tracking-wide">
              {compileState === "success" ? "UI Thread Locked @ 60fps" : compileState === "compiling" ? "Injecting Stack Bytecode..." : "Gradle Error State"}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3 pt-2 border-t border-neutral-100">
        {compileState === "compiling" && (
          <div className="space-y-1">
            <div className="flex justify-between text-[8px] font-mono text-neutral-400">
              <span>RE-COMPILING KOTLIN JVM INSTRUCTIONS...</span>
              <span className="text-cyan-500 font-bold">{compileProgress}%</span>
            </div>
            <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden shadow-inner">
              <div 
                className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full transition-all duration-120" 
                style={{ width: `${compileProgress}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex justify-between items-center gap-4">
          <span className="font-mono text-[8px] text-neutral-400 uppercase">
            {compileState === "success" 
              ? "BUILD STATUS: SUCCESSFUL. APK REBUILT" 
              : "BUILD STATUS: COMPILATION FAILURE"}
          </span>
          
          {compileState !== "success" ? (
            <button
              id="run-hotfix-btn"
              onClick={triggerKotlinCompiler}
              disabled={compileState === "compiling"}
              className="bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:opacity-95 text-white font-mono text-[9px] font-bold tracking-widest px-4 py-2.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              <Terminal className="w-3 h-3" />
              RUN HOTFIX DIAGNOSTIC
            </button>
          ) : (
            <button
              id="reset-compile-btn"
              onClick={() => setCompileState("idle")}
              className="bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 font-mono text-[9px] font-bold tracking-widest px-4 py-2.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Check className="w-3 h-3" />
              RESET COMPILE
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
