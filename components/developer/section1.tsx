'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, Play, FileJson, CheckCircle2, Loader2, 
  Search, GitGraph, Files, Settings, MoreHorizontal, 
  X, Minus, ChevronRight, ChevronDown, Command,
  Hash, LayoutTemplate, Bug, Menu, AlertCircle, ArrowDown, ArrowRight
} from 'lucide-react';

const Section1 = () => {
  // --- State Management ---
  const [activeTab, setActiveTab] = useState<'developer.ts' | 'styles.css' | 'README.md'>('developer.ts');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [buildStep, setBuildStep] = useState(0); // 0: Idle, 1: Building, 2: Success
  const [typedCode, setTypedCode] = useState(''); 
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  // --- File Content ---
  const files = {
    'developer.ts': `const developer = {
  name: "Puneet Shukla",
  role: "Software Developer",
  expertise: "TypeScript & Next.js Expert",
  
  languages: [
    "TypeScript", "JavaScript", 
    "Python", "Java", "C++", "SQL"
  ],
  
  techStack: {
    frontend: ["Next.js", "React.js"],
    backend: ["Node.js", "MongoDB"],
    cloud: ["AWS S3"]
  },

  status: "Writing clean, scalable code"
};

export default developer;`,
    
    'styles.css': `.portfolio-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000000;
  color: #ffffff;
}

.code-editor {
  border: 1px solid #333;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}`,

    'README.md': `# Developer Portfolio

## Introduction
I am a software developer with a strong focus on TypeScript and Next.js.

## Skills
- Full Stack Development
- Database Management (SQL, Mongo)
- Cloud Services (AWS S3)

## Action
Click the "Run Build" button to compile my portfolio.`
  };

  // --- Typing Effect ---
  useEffect(() => {
    if (activeTab === 'developer.ts' && !isRunning) {
      setIsTypingComplete(false);
      let i = 0;
      const code = files['developer.ts'];
      setTypedCode('');
      
      const interval = setInterval(() => {
        setTypedCode(code.substring(0, i + 1));
        i++;
        if (i > code.length) {
          clearInterval(interval);
          setIsTypingComplete(true);
        }
      }, 5); 

      return () => clearInterval(interval);
    } else {
      setTypedCode(files[activeTab]);
      setIsTypingComplete(true);
    }
  }, [activeTab]);

  // Auto-scroll terminal
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [terminalLogs]);

  // --- Handlers ---
  const handleRunCode = () => {
    if (isRunning) return;
    
    setIsRunning(true);
    setIsTerminalOpen(true);
    setBuildStep(1);
    setTerminalLogs([]);

    const steps = [
      { msg: "> npm run build", delay: 500 },
      { msg: "creating an optimized production build...", delay: 1200 },
      { msg: "✓ compiled client and server successfully", delay: 2000, color: 'green' },
      { msg: "collecting page data...", delay: 2800 },
      { msg: "generating static pages (3/3)", delay: 3500 },
      { msg: "✓ Build complete. Ready for production.", delay: 4200, success: true, color: 'green' },
    ];

    steps.forEach((step) => {
      setTimeout(() => {
        setTerminalLogs(prev => [...prev, step.msg]);
        if (step.success) {
           setBuildStep(2);
           setIsRunning(false);
        }
      }, step.delay);
    });
  };

  const handleScrollDown = () => {
    const nextSection = document.getElementById('section2');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  // --- Syntax Highlighter ---
  const CodeRenderer = ({ code, lang }: { code: string, lang: string }) => {
    if (lang === 'ts') {
      return (
        <div className="font-mono text-sm md:text-[15px] leading-relaxed whitespace-pre font-medium">
          {code.split('\n').map((line, i) => (
            <div key={i}>
              {line
                .replace(/const|export|default/g, m => `__K__${m}__E__`)
                .replace(/"[^"]*"/g, m => `__S__${m}__E__`)
                .replace(/:/g, '__P__:__E__')
                .replace(/\[|\]|\{|\}/g, m => `__B__${m}__E__`)
                .split(/(__K__.*?__E__|__S__.*?__E__|__P__.*?__E__|__B__.*?__E__)/g)
                .map((part, j) => {
                  if (part.startsWith('__K__')) return <span key={j} className="text-[#569cd6]">{part.replace(/__K__|__E__/g, '')}</span>; 
                  if (part.startsWith('__S__')) return <span key={j} className="text-[#ce9178]">{part.replace(/__S__|__E__/g, '')}</span>; 
                  if (part.startsWith('__P__')) return <span key={j} className="text-[#d4d4d4]">{part.replace(/__P__|__E__/g, '')}</span>; 
                  if (part.startsWith('__B__')) return <span key={j} className="text-[#ffd700]">{part.replace(/__B__|__E__/g, '')}</span>; 
                  return <span key={j} className="text-[#9cdcfe]">{part}</span>; 
                })}
            </div>
          ))}
        </div>
      );
    }
    if (lang === 'css') {
      return (
        <div className="font-mono text-sm md:text-[15px] leading-relaxed whitespace-pre font-medium">
          {code.split('\n').map((line, i) => (
            <div key={i}>
              {line
                .replace(/\./g, '__D__.__E__')
                .replace(/{|}/g, m => `__B__${m}__E__`)
                .replace(/:/g, '__P__:__E__')
                .replace(/#[0-9a-fA-F]{6}/g, m => `__H__${m}__E__`)
                .split(/(__D__.*?__E__|__B__.*?__E__|__P__.*?__E__|__H__.*?__E__)/g)
                .map((part, j) => {
                  if (part.startsWith('__D__')) return <span key={j} className="text-[#d7ba7d]">{part.replace(/__D__|__E__/g, '')}</span>; 
                  if (part.startsWith('__B__')) return <span key={j} className="text-[#ffd700]">{part.replace(/__B__|__E__/g, '')}</span>;
                  if (part.startsWith('__P__')) return <span key={j} className="text-[#d4d4d4]">{part.replace(/__P__|__E__/g, '')}</span>;
                  if (part.startsWith('__H__')) return <span key={j} className="text-[#ce9178]">{part.replace(/__H__|__E__/g, '')}</span>;
                  return <span key={j} className="text-[#9cdcfe]">{part}</span>; 
                })}
            </div>
          ))}
        </div>
      );
    }
    return <div className="font-mono text-sm text-[#ce9178] whitespace-pre">{code}</div>;
  };

  return (
    <section className="relative w-full h-screen bg-[#000000] text-[#cccccc] flex overflow-hidden font-sans selection:bg-[#264f78] selection:text-white">
      
      {/* 1. ACTIVITY BAR */}
      <div className="hidden md:flex flex-col w-12 bg-[#000000] border-r border-[#333] items-center py-4 gap-6 z-20">
        <Files size={24} className="text-white cursor-pointer hover:text-gray-300 transition-colors" />
        <Search size={24} className="text-[#666] hover:text-white transition-colors cursor-pointer" />
        <GitGraph size={24} className="text-[#666] hover:text-white transition-colors cursor-pointer" />
        <Bug size={24} className="text-[#666] hover:text-white transition-colors cursor-pointer" />
        <div className="mt-auto flex flex-col gap-6">
          <Settings size={24} className="text-[#666] hover:text-white transition-colors cursor-pointer" />
        </div>
      </div>

      {/* 2. SIDEBAR */}
      <motion.div 
        initial={false}
        animate={{ 
          width: isSidebarOpen ? 260 : 0,
          opacity: isSidebarOpen ? 1 : 0 
        }}
        className="hidden md:flex flex-col bg-[#000000] border-r border-[#333] overflow-hidden whitespace-nowrap z-10"
      >
        <div className="px-5 py-3 text-[11px] font-bold tracking-widest text-[#bbbbbb] flex justify-between items-center uppercase bg-[#000000]">
          Explorer <MoreHorizontal size={16} className="cursor-pointer hover:text-white" />
        </div>
        
        <div className="flex flex-col gap-0.5 mt-2">
          <div className="px-4 py-1 flex items-center gap-1 text-white font-bold cursor-pointer hover:bg-[#2a2d2e]">
            <ChevronDown size={14} /> <span>PORTFOLIO</span>
          </div>
          {[
            { name: 'developer.ts', icon: FileJson, color: 'text-[#f1e05a]' },
            { name: 'styles.css', icon: Hash, color: 'text-[#569cd6]' },
            { name: 'README.md', icon: LayoutTemplate, color: 'text-[#cccccc]' }
          ].map((file) => (
            <div 
              key={file.name}
              onClick={() => setActiveTab(file.name as any)}
              className={`pl-8 py-1.5 flex items-center gap-2 cursor-pointer transition-colors border-l-2 
                ${activeTab === file.name 
                  ? 'bg-[#37373d] text-white border-[#007acc]' 
                  : 'border-transparent text-[#cccccc] hover:bg-[#2a2d2e] hover:text-white'}`}
            >
               <file.icon size={14} className={file.color} /> 
               <span className="text-[13px]">{file.name}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 3. MAIN EDITOR */}
      <div className="flex-1 flex flex-col h-full relative bg-[#000000] z-0 min-w-0">
        
        {/* TOP BAR */}
        <div className="flex bg-[#000000] h-9 items-center overflow-x-auto no-scrollbar border-b border-[#333]">
           <div className="md:hidden px-4 border-r border-[#333] h-full flex items-center justify-center text-[#cccccc] cursor-pointer hover:text-white" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
             <Menu size={16} />
           </div>

           {['developer.ts', 'styles.css', 'README.md'].map((tabName) => (
             <div 
               key={tabName}
               onClick={() => setActiveTab(tabName as any)}
               className={`flex items-center gap-2 px-3 h-full text-[13px] cursor-pointer border-r border-[#333] min-w-fit transition-colors
                 ${activeTab === tabName 
                   ? 'bg-[#1e1e1e] text-white border-t-2 border-t-[#007acc]' 
                   : 'bg-[#000000] text-[#999] border-t-2 border-t-transparent hover:bg-[#1e1e1e]'}`}
             >
                {tabName === 'developer.ts' && <FileJson size={14} className="text-[#f1e05a]" />}
                {tabName === 'styles.css' && <Hash size={14} className="text-[#569cd6]" />}
                {tabName === 'README.md' && <LayoutTemplate size={14} className="text-[#cccccc]" />}
                <span>{tabName}</span>
                <X size={12} className="ml-2 hover:bg-[#333] rounded-sm p-[1px]" />
             </div>
           ))}

           <div className="ml-auto flex items-center px-4 gap-4">
             <LayoutTemplate size={14} className="text-[#666] hover:text-white cursor-pointer"/>
             <MoreHorizontal size={14} className="text-[#666] hover:text-white cursor-pointer"/>
           </div>
        </div>

        {/* BREADCRUMBS */}
        <div className="flex items-center gap-1 px-4 py-1 text-[11px] text-[#666] bg-[#000000] border-b border-[#1f1f1f] shadow-sm">
           <span>portfolio</span> <ChevronRight size={10} /> <span>src</span> <ChevronRight size={10} /> <span className="text-white">{activeTab}</span>
        </div>

        {/* EDITOR CONTENT */}
        <div className="flex-1 relative flex overflow-hidden bg-[#000000]">
          <div className="hidden sm:flex w-12 flex-col items-end pr-3 pt-4 text-[#444] text-[13px] font-mono select-none bg-[#000000]">
            {Array.from({ length: 25 }).map((_, i) => (
              <div key={i} className="leading-relaxed">{i + 1}</div>
            ))}
          </div>

          <div className="flex-1 pt-4 pl-4 overflow-auto custom-scrollbar" onClick={() => setIsTerminalOpen(false)}>
            <motion.div
              key={activeTab} 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <CodeRenderer 
                code={activeTab === 'developer.ts' ? typedCode : files[activeTab]} 
                lang={activeTab.split('.')[1]} 
              />
              {activeTab === 'developer.ts' && !isRunning && (
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-2 h-4 bg-[#007acc] ml-1 align-middle"
                />
              )}
            </motion.div>
          </div>

          <div className="hidden lg:block w-24 bg-[#050505] border-l border-[#222] overflow-hidden opacity-50 select-none pointer-events-none">
             <div className="transform scale-[0.15] origin-top-left p-4">
                <CodeRenderer code={files[activeTab]} lang={activeTab.split('.')[1]} />
             </div>
          </div>
        </div>

        {/* --- PROFESSIONAL ACTION BUTTON & HINTS --- */}
        
        {/* 1. Typing Complete Hint */}
        <AnimatePresence>
          {isTypingComplete && !isRunning && buildStep === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-20 right-10 z-50 flex items-center gap-3 pointer-events-none"
            >
              <span className="text-sm font-medium text-white/80 bg-black/80 px-3 py-1 rounded-md border border-white/10">
                Code written. Ready to compile.
              </span>
              <motion.div 
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <ArrowDown className="text-[#007acc]" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2. Run / Success Button */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute bottom-8 right-8 z-40"
        >
          {buildStep === 2 ? (
             // Success State -> Read Documentation
             <motion.button
                initial={{ width: 50, borderRadius: '50%' }}
                animate={{ width: 'auto', borderRadius: '9999px' }}
                onClick={handleScrollDown}
                className="group flex items-center gap-3 px-6 py-3 bg-green-600 hover:bg-green-500 text-white shadow-[0_0_20px_rgba(22,163,74,0.4)] transition-all cursor-pointer"
             >
                <CheckCircle2 size={18} />
                <span className="font-bold whitespace-nowrap">Read Documentation</span>
                <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
             </motion.button>
          ) : (
            // Idle / Running State -> Run Build
             <button
                onClick={handleRunCode}
                disabled={isRunning}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold shadow-2xl transition-all active:scale-95 border border-white/10 cursor-pointer ${
                  isRunning ? 'bg-[#007acc]/80 cursor-wait' : 'bg-[#007acc] hover:bg-[#006bb3] hover:shadow-blue-500/20'
                } ${isTypingComplete && !isRunning ? 'animate-pulse ring-2 ring-blue-500/50' : ''}`}
             >
                {isRunning ? (
                    <> <Loader2 size={18} className="animate-spin text-white"/> <span className="text-white">Compiling...</span> </>
                ) : (
                    <> <Play size={18} fill="currentColor" className="text-white"/> <span className="text-white">Run Build</span> </>
                )}
             </button>
          )}
        </motion.div>

        {/* TERMINAL */}
        <AnimatePresence>
          {isTerminalOpen && (
            <motion.div
              initial={{ y: 300 }}
              animate={{ y: 0 }}
              exit={{ y: 300 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full bg-[#000000] border-t border-[#333] flex flex-col absolute bottom-[22px] z-30 h-[280px] shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
            >
              <div className="flex items-center px-4 gap-6 text-[11px] font-bold text-[#666] border-b border-[#333] h-9 bg-[#000000] select-none">
                 <span className="text-white border-b border-white h-full flex items-center cursor-pointer uppercase">Terminal</span>
                 <span className="hover:text-white cursor-pointer h-full flex items-center uppercase">Output</span>
                 <div className="ml-auto flex gap-3">
                   <Minus size={14} className="cursor-pointer hover:text-white" onClick={() => setIsTerminalOpen(false)} />
                   <X size={14} className="cursor-pointer hover:text-white" onClick={() => setIsTerminalOpen(false)} />
                 </div>
              </div>

              <div ref={scrollRef} className="flex-1 p-4 font-mono text-sm overflow-y-auto custom-scrollbar">
                <div className="mb-2 text-[#666]">Microsoft Windows [Version 10.0.19045.3693]</div>
                <div className="mb-4 text-[#666]">(c) Microsoft Corporation. All rights reserved.</div>

                {terminalLogs.map((log, i) => (
                  <div key={i} className="mt-1">
                     {log.startsWith('>') ? (
                        <span className="text-[#dcdcaa]">{log}</span>
                     ) : log.includes('✓') ? (
                        <span className="text-[#4ec9b0] font-bold">{log}</span>
                     ) : (
                        <span className="text-[#cccccc]">{log}</span>
                     )}
                  </div>
                ))}

                {buildStep === 2 && (
                   <div className="mt-6 p-4 border-l-2 border-green-500 bg-green-900/10 flex flex-col gap-2">
                      <div className="text-[#4ec9b0] font-bold text-sm">Build Successful!</div>
                      <div className="text-gray-400 text-xs">
                         Documentation generated at <span className="text-blue-400">/docs/puneet-shukla</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-white text-sm animate-pulse">
                         <ArrowRight size={14} /> Scroll down or click the button to view documentation
                      </div>
                   </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STATUS BAR */}
        <div className="h-[22px] bg-[#007acc] text-white flex items-center px-3 text-[11px] font-medium justify-between z-40 select-none w-full">
           <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 cursor-pointer hover:bg-white/10 px-1 rounded"><GitGraph size={10}/> main*</span>
              <span className="flex items-center gap-1 cursor-pointer hover:bg-white/10 px-1 rounded"><AlertCircle size={10}/> 0 errors</span>
           </div>
           
           {isRunning && (
             <div className="hidden sm:flex items-center gap-2">
                <Loader2 size={10} className="animate-spin" />
                <span>Building...</span>
             </div>
           )}

           <div className="flex items-center gap-3">
              <span className="hidden sm:block cursor-pointer hover:bg-white/10 px-1 rounded">Ln 12, Col 42</span>
              <span className="hidden sm:block cursor-pointer hover:bg-white/10 px-1 rounded">UTF-8</span>
              <span className="cursor-pointer hover:bg-white/10 px-1 rounded">{activeTab.endsWith('css') ? 'CSS' : activeTab.endsWith('md') ? 'Markdown' : 'TypeScript React'}</span>
              <span className="cursor-pointer hover:bg-white/10 px-1 rounded"><CheckCircle2 size={10}/> Prettier</span>
           </div>
        </div>

      </div>
    </section>
  );
};

export default Section1;