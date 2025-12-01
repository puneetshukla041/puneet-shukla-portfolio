'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, FileJson, CheckCircle2, Loader2, 
  Search, GitGraph, Files, Settings, MoreHorizontal, 
  X, Minus, ChevronRight, ChevronDown, 
  Hash, LayoutTemplate, Bug, Menu, AlertCircle, 
  ArrowDown, ArrowRight, Save, Copy, Terminal, Command
} from 'lucide-react';

// --- Types & Constants ---
type TabName = 'developer.ts' | 'styles.css' | 'README.md';
type ViewName = 'EXPLORER' | 'SEARCH' | 'SCM' | 'EXTENSIONS' | 'SETTINGS';

const FILES_CONTENT: Record<TabName, string> = {
  'developer.ts': `import { Developer } from "@universe/human";

const puneet: Developer = {
  name: "Puneet Shukla",
  role: "Software Engineer",
  location: "India",
  
  skills: {
    languages: ["TypeScript", "JavaScript", "Python", "SQL"],
    frameworks: ["Next.js", "React", "Node.js", "Tailwind"],
    tools: ["Git", "Docker", "AWS", "Figma"]
  },

  hardWorker: true,
  problemSolver: true,

  hire: () => {
    return "Ready to build the future.";
  }
};

export default puneet;`,
  
  'styles.css': `:root {
  --primary: #007acc;
  --bg: #1e1e1e;
}

.career-path {
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;
}

.success-rate {
  width: 100%;
  height: 100%;
  content: "100%";
}`,

  'README.md': `# Portfolio v2.0

## Status
Current Status: **Open to Work**
Location: Remote / Hybrid

## Objectives
1. Build scalable web applications.
2. Design intuitive user interfaces.
3. Optimize backend performance.

## Usage
Run the build command to see the magic happen.`
};

const MOCK_COMMITS = [
  { hash: '8f4d2a', msg: 'feat: add advanced typescript skills', time: '2 mins ago' },
  { hash: '3a1b9c', msg: 'fix: optimize next.js rendering', time: '1 hour ago' },
  { hash: '7e2f1d', msg: 'style: improve ui aesthetics', time: 'Yesterday' },
  { hash: '9c8b4a', msg: 'init: start professional journey', time: '4 years ago' },
];

const EXTENSIONS = [
  { name: 'Prettier', desc: 'Code formatter', install: true },
  { name: 'ESLint', desc: 'JS Linter', install: true },
  { name: 'Tailwind CSS', desc: 'IntelliSense', install: true },
];

// --- Sub-Components ---

// 1. Tooltip
const Tooltip = ({ text, children }: { text: string, children: React.ReactNode }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative flex items-center justify-center" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      <AnimatePresence>
        {show && (
          <motion.div 
            initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
            className="absolute left-full ml-2 px-2 py-1 bg-[#252526] text-white text-[10px] border border-[#454545] rounded shadow-xl z-50 whitespace-nowrap"
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// 2. Syntax Highlighter (Improved)
const CodeRenderer = ({ code, lang }: { code: string, lang: string }) => {
    const lines = code.split('\n');
    return (
      <div className="font-mono text-[13px] md:text-[14px] leading-relaxed whitespace-pre font-medium">
        {lines.map((line, i) => (
          <div key={i} className="table-row">
             <span className="table-cell text-right pr-4 text-[#858585] select-none w-8 text-[12px]">{i + 1}</span>
             <span className="table-cell">
               {line.split(/(\s+|[{}()[\],:;'"=])/g).map((token, j) => {
                 let color = "#d4d4d4"; // Default
                 if (lang === 'ts') {
                   if (['import', 'from', 'const', 'export', 'default', 'return', 'true', 'false'].includes(token)) color = "#c586c0";
                   else if (['Developer', 'String', 'Array'].includes(token)) color = "#4ec9b0";
                   else if (token.startsWith('"') || token.startsWith("'")) color = "#ce9178";
                   else if (!isNaN(Number(token))) color = "#b5cea8";
                   else if (token.match(/^[A-Z]/)) color = "#4ec9b0"; // Types
                   else if (line.includes(':') && !line.includes('import') && token !== ':' && token.trim() !== '') {
                      // Simple heuristic for object keys
                      const parts = line.split(':');
                      if(parts[0].includes(token)) color = "#9cdcfe";
                   }
                 } else if (lang === 'css') {
                   if (token.startsWith('.')) color = "#d7ba7d";
                   else if (token.startsWith('#')) color = "#d7ba7d";
                   else if (token.includes(':')) color = "#9cdcfe"; // Properties
                   else if (['flex', 'column', 'center', 'all'].includes(token)) color = "#ce9178"; 
                   else if (token.match(/[0-9]/)) color = "#b5cea8";
                 } else if (lang === 'md') {
                   if (token.startsWith('#')) color = "#569cd6";
                   else if (token.startsWith('**')) color = "#ce9178";
                 }
                 return <span key={j} style={{ color }}>{token}</span>;
               })}
             </span>
          </div>
        ))}
      </div>
    );
};

const Section1 = () => {
  // --- State ---
  const [activeTab, setActiveTab] = useState<TabName>('developer.ts');
  const [openTabs, setOpenTabs] = useState<TabName[]>(['developer.ts', 'styles.css', 'README.md']);
  const [activeView, setActiveView] = useState<ViewName>('EXPLORER');
  const [sidebarWidth, setSidebarWidth] = useState(260);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Terminal State
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [buildStep, setBuildStep] = useState(0);

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  
  // Editor State
  const [typedCode, setTypedCode] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  // --- Keyboard Shortcuts ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        setUnsavedChanges(false);
        // Trigger a fake "Save" notification or logic
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        setIsSidebarOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // --- Typing Effect for Developer.ts ---
  useEffect(() => {
    if (activeTab === 'developer.ts' && !isRunning && typedCode.length === 0) {
      setIsTypingComplete(false);
      let i = 0;
      const code = FILES_CONTENT['developer.ts'];
      const interval = setInterval(() => {
        setTypedCode(code.substring(0, i + 1));
        i++;
        if (i > code.length) {
          clearInterval(interval);
          setIsTypingComplete(true);
        }
      }, 3); 
      return () => clearInterval(interval);
    } else {
        setIsTypingComplete(true);
    }
  }, [activeTab]);

  // --- Handlers ---
  const handleTabClick = (tab: TabName) => {
    if (!openTabs.includes(tab)) setOpenTabs([...openTabs, tab]);
    setActiveTab(tab);
  };

  const handleCloseTab = (e: React.MouseEvent, tab: TabName) => {
    e.stopPropagation();
    const newTabs = openTabs.filter(t => t !== tab);
    setOpenTabs(newTabs);
    if (activeTab === tab && newTabs.length > 0) {
      setActiveTab(newTabs[newTabs.length - 1]);
    }
  };

  const handleRunCode = () => {
    if (isRunning) return;
    setIsRunning(true);
    setIsTerminalOpen(true);
    setBuildStep(1);
    setTerminalLogs([]);
    const steps = [
      { msg: "> pnpm run build", delay: 300 },
      { msg: "wait  - compiling...", delay: 1000 },
      { msg: "event - compiled client and server successfully in 1241 ms", delay: 1800, color: '#4ec9b0' },
      { msg: "info  - Collecting page data...", delay: 2400 },
      { msg: "info  - Generating static pages (3/3)", delay: 3200 },
      { msg: "info  - Finalizing page optimization...", delay: 4000 },
      { msg: "✓ Build complete. Ready for production.", delay: 4800, success: true, color: '#4ec9b0' },
    ];
    steps.forEach((step) => {
      setTimeout(() => {
        setTerminalLogs(prev => [...prev, step.msg]);
        if (step.success) { setBuildStep(2); setIsRunning(false); }
      }, step.delay);
    });
  };

  const handleScrollDown = () => {
    const nextSection = document.getElementById('section2');
    if (nextSection) nextSection.scrollIntoView({ behavior: 'smooth' });
    else window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  };

  // --- RENDER SIDEBAR CONTENT ---
  const renderSidebarContent = () => {
    switch (activeView) {
      case 'EXPLORER':
        return (
          <>
            <div className="px-4 py-2 text-xs font-bold text-[#bbbbbb] flex justify-between items-center bg-[#000000]">
              EXPLORER <MoreHorizontal size={14} />
            </div>
            <div className="flex flex-col">
              <div className="px-2 py-1 flex items-center gap-1 text-white font-bold cursor-pointer bg-[#2a2d2e]/50">
                <ChevronDown size={14} /> <span>PORTFOLIO</span>
              </div>
              {Object.keys(FILES_CONTENT).map((file) => (
                <div 
                  key={file}
                  onClick={() => handleTabClick(file as TabName)}
                  className={`pl-6 py-1 flex items-center gap-2 cursor-pointer transition-colors border-l-2 text-[13px]
                    ${activeTab === file ? 'bg-[#37373d] text-white border-[#007acc]' : 'border-transparent text-[#cccccc] hover:bg-[#2a2d2e] hover:text-white'}`}
                >
                   {file.endsWith('ts') && <FileJson size={14} className="text-[#f1e05a]" />}
                   {file.endsWith('css') && <Hash size={14} className="text-[#569cd6]" />}
                   {file.endsWith('md') && <LayoutTemplate size={14} className="text-[#cccccc]" />}
                   <span>{file}</span>
                </div>
              ))}
            </div>
          </>
        );
      case 'SEARCH':
        return (
          <>
             <div className="px-4 py-3 text-xs font-bold text-[#bbbbbb]">SEARCH</div>
             <div className="px-4 mb-4">
               <div className="bg-[#3c3c3c] flex items-center px-2 py-1 rounded border border-[#3c3c3c] focus-within:border-[#007acc]">
                 <input 
                   type="text" 
                   placeholder="Search" 
                   className="bg-transparent border-none outline-none text-white w-full text-xs placeholder:text-[#858585]"
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                 />
                 <div className="flex gap-1">
                   <span className="text-[10px] text-[#858585] border border-[#858585] rounded px-1">Ab</span>
                 </div>
               </div>
             </div>
             {searchQuery && (
               <div className="px-4 text-xs text-[#cccccc]">
                 {Object.entries(FILES_CONTENT).map(([name, content]) => {
                    const match = content.toLowerCase().includes(searchQuery.toLowerCase());
                    return match ? (
                      <div key={name} className="mb-2" onClick={() => handleTabClick(name as TabName)}>
                        <div className="flex items-center gap-2 font-bold cursor-pointer hover:text-white">
                          <ChevronRight size={12}/> {name}
                        </div>
                        <div className="pl-6 text-[#858585] truncate opacity-70">
                          {content.substring(content.toLowerCase().indexOf(searchQuery.toLowerCase()), content.toLowerCase().indexOf(searchQuery.toLowerCase()) + 30)}...
                        </div>
                      </div>
                    ) : null;
                 })}
               </div>
             )}
          </>
        );
      case 'SCM':
         return (
           <>
             <div className="px-4 py-3 text-xs font-bold text-[#bbbbbb] flex justify-between">
                <span>SOURCE CONTROL</span>
                <div className="flex gap-2"><CheckCircle2 size={14}/><MoreHorizontal size={14}/></div>
             </div>
             <div className="px-4 mb-2">
                <div className="bg-[#3c3c3c] px-2 py-1.5 rounded text-xs text-[#858585] italic">Message (Ctrl+Enter to commit)</div>
             </div>
             <div className="px-4 text-xs font-bold text-[#bbbbbb] mb-2 mt-4">COMMITS</div>
             <div className="flex flex-col relative">
                {MOCK_COMMITS.map((commit, i) => (
                  <div key={i} className="px-4 py-2 border-l border-[#333] ml-4 relative cursor-pointer hover:bg-[#2a2d2e]">
                     <div className="absolute -left-[5px] top-3 w-2.5 h-2.5 rounded-full bg-[#007acc] border-2 border-[#1e1e1e]"></div>
                     <div className="text-white truncate font-medium">{commit.msg}</div>
                     <div className="flex justify-between text-[10px] text-[#858585] mt-1">
                       <span>{commit.hash}</span>
                       <span>{commit.time}</span>
                     </div>
                  </div>
                ))}
             </div>
           </>
         );
      case 'EXTENSIONS':
         return (
            <>
              <div className="px-4 py-3 text-xs font-bold text-[#bbbbbb]">EXTENSIONS</div>
              <div className="px-4 mb-3">
                 <input type="text" placeholder="Search Extensions in Marketplace" className="w-full bg-[#3c3c3c] px-2 py-1 rounded text-xs text-white outline-none focus:ring-1 ring-[#007acc]" />
              </div>
              <div className="flex flex-col">
                 {EXTENSIONS.map((ext, i) => (
                   <div key={i} className="px-4 py-2 flex gap-3 hover:bg-[#2a2d2e] cursor-pointer group">
                      <div className="w-8 h-8 bg-[#333] flex items-center justify-center text-[#007acc] font-bold text-xs rounded">
                         {ext.name.substring(0, 2)}
                      </div>
                      <div className="flex-1">
                         <div className="flex justify-between items-center">
                            <span className="text-white text-xs font-bold">{ext.name}</span>
                            <span className="text-[10px] bg-[#252526] px-1 rounded text-[#858585]">v1.0</span>
                         </div>
                         <div className="text-[10px] text-[#858585]">{ext.desc}</div>
                         <div className="flex gap-2 mt-1">
                            <button className="bg-[#0e639c] text-white text-[10px] px-2 py-0.5 rounded">Install</button>
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
            </>
         );
      default: return null;
    }
  };

  return (
    <section className="relative w-full h-screen bg-[#000000] text-[#cccccc] flex overflow-hidden font-sans selection:bg-[#264f78] selection:text-white">
      
      {/* 1. ACTIVITY BAR (Leftmost) */}
      <div className="hidden md:flex flex-col w-12 bg-[#000000] border-r border-[#333] items-center py-3 gap-4 z-30 select-none">
        <Tooltip text="Explorer (Ctrl+Shift+E)">
           <Files size={24} className={`cursor-pointer transition-colors ${activeView === 'EXPLORER' && isSidebarOpen ? 'text-white' : 'text-[#666] hover:text-[#bbb]'}`} onClick={() => { setActiveView('EXPLORER'); setIsSidebarOpen(true); }} />
        </Tooltip>
        <Tooltip text="Search (Ctrl+Shift+F)">
           <Search size={24} className={`cursor-pointer transition-colors ${activeView === 'SEARCH' && isSidebarOpen ? 'text-white' : 'text-[#666] hover:text-[#bbb]'}`} onClick={() => { setActiveView('SEARCH'); setIsSidebarOpen(true); }} />
        </Tooltip>
        <Tooltip text="Source Control (Ctrl+Shift+G)">
           <GitGraph size={24} className={`cursor-pointer transition-colors ${activeView === 'SCM' && isSidebarOpen ? 'text-white' : 'text-[#666] hover:text-[#bbb]'}`} onClick={() => { setActiveView('SCM'); setIsSidebarOpen(true); }} />
        </Tooltip>
        <Tooltip text="Extensions (Ctrl+Shift+X)">
           <Bug size={24} className={`cursor-pointer transition-colors ${activeView === 'EXTENSIONS' && isSidebarOpen ? 'text-white' : 'text-[#666] hover:text-[#bbb]'}`} onClick={() => { setActiveView('EXTENSIONS'); setIsSidebarOpen(true); }} />
        </Tooltip>
        
        <div className="mt-auto flex flex-col gap-6 mb-2">
          <Tooltip text="Settings">
             <Settings size={24} className="text-[#666] hover:text-white transition-colors cursor-pointer" />
          </Tooltip>
        </div>
      </div>

      {/* 2. SIDEBAR PANEL */}
      <motion.div 
        initial={false}
        animate={{ width: isSidebarOpen ? sidebarWidth : 0, opacity: isSidebarOpen ? 1 : 0 }}
        className="hidden md:flex flex-col bg-[#000000] border-r border-[#333] overflow-hidden whitespace-nowrap z-20 h-full"
      >
        {renderSidebarContent()}
      </motion.div>

      {/* 3. MAIN EDITOR AREA */}
      <div className="flex-1 flex flex-col h-full relative bg-[#1e1e1e] z-10 min-w-0">
        
        {/* TABS BAR */}
        <div className="flex bg-[#000000] h-9 items-center overflow-x-auto no-scrollbar border-b border-[#333] select-none">
           <div className="md:hidden px-4 h-full flex items-center justify-center text-[#cccccc] cursor-pointer" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
             <Menu size={16} />
           </div>

           {openTabs.map((tabName) => (
             <div 
               key={tabName}
               onClick={() => setActiveTab(tabName)}
               className={`group flex items-center gap-2 px-3 h-full text-[13px] cursor-pointer border-r border-[#333] min-w-fit transition-colors relative
                 ${activeTab === tabName ? 'bg-[#1e1e1e] text-white border-t-2 border-t-[#007acc]' : 'bg-[#000000] text-[#999] border-t-2 border-t-transparent hover:bg-[#1e1e1e]'}`}
             >
                {tabName === 'developer.ts' && <FileJson size={14} className="text-[#f1e05a]" />}
                {tabName === 'styles.css' && <Hash size={14} className="text-[#569cd6]" />}
                {tabName === 'README.md' && <LayoutTemplate size={14} className="text-[#cccccc]" />}
                <span>{tabName}</span>
                {/* Unsaved indicator or Close button */}
                {activeTab === tabName && unsavedChanges ? (
                   <div className="w-2 h-2 rounded-full bg-white ml-2 group-hover:hidden"></div>
                ) : null}
                <X size={14} className={`ml-2 rounded-sm p-[1px] hover:bg-[#444] ${activeTab === tabName || unsavedChanges ? 'block' : 'hidden group-hover:block'}`} onClick={(e) => handleCloseTab(e, tabName)} />
             </div>
           ))}
        </div>

        {/* BREADCRUMBS */}
        <div className="flex items-center gap-1 px-4 py-0.5 text-[11px] text-[#666] bg-[#1e1e1e] shadow-sm">
           <span>portfolio</span> <ChevronRight size={10} /> <span>src</span> <ChevronRight size={10} /> <span className="text-white/80">{activeTab}</span>
        </div>

        {/* EDITOR CONTENT */}
        <div className="flex-1 relative flex overflow-hidden bg-[#1e1e1e]">
          {/* Line Numbers */}
          <div className="hidden sm:block w-12 pr-4 pt-4 text-[#6e7681] text-[13px] font-mono text-right select-none bg-[#1e1e1e]">
            {/* Auto-generated based on lines */}
          </div>

          <div className="flex-1 pt-4 pl-0 overflow-auto custom-scrollbar" onClick={() => { if(!isRunning) setUnsavedChanges(true); }}>
            <motion.div
              key={activeTab} 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.1 }}
              className="min-h-full"
            >
              <CodeRenderer 
                code={activeTab === 'developer.ts' ? (isTypingComplete ? FILES_CONTENT['developer.ts'] : typedCode) : FILES_CONTENT[activeTab]} 
                lang={activeTab.split('.')[1]} 
              />
            </motion.div>
          </div>
          
          {/* Minimap (Visual Only) */}
          <div className="hidden lg:block w-20 bg-[#1e1e1e] overflow-hidden opacity-30 select-none pointer-events-none absolute right-0 top-0 bottom-0">
              <div className="transform scale-[0.1] origin-top-left p-2">
                 <pre className="text-white">{FILES_CONTENT[activeTab]}</pre>
              </div>
          </div>
        </div>

        {/* --- ACTION OVERLAY (Play/Success) --- */}
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="absolute bottom-12 right-12 z-40">
           {buildStep === 2 ? (
              <motion.button
                onClick={handleScrollDown}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 px-6 py-3 bg-green-600 text-white shadow-2xl rounded-md cursor-pointer border border-green-500"
              >
                 <CheckCircle2 size={20} /> <span className="font-bold">View Deployment</span> <ArrowRight size={20} />
              </motion.button>
           ) : (
              <motion.button
                 onClick={handleRunCode}
                 disabled={isRunning}
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 className={`flex items-center gap-3 px-6 py-3 rounded-md font-bold shadow-2xl border border-white/10 ${isRunning ? 'bg-[#007acc]/80 cursor-not-allowed' : 'bg-[#007acc] hover:bg-[#006bb3] text-white cursor-pointer'}`}
              >
                 {isRunning ? <Loader2 size={20} className="animate-spin" /> : <Play size={20} fill="currentColor" />}
                 <span>{isRunning ? 'Compiling...' : 'Run Build'}</span>
              </motion.button>
           )}
        </motion.div>

        {/* TERMINAL PANEL */}
        <AnimatePresence>
          {isTerminalOpen && (
            <motion.div
              initial={{ y: 250 }} animate={{ y: 0 }} exit={{ y: 250 }} transition={{ type: "spring", damping: 20 }}
              className="absolute bottom-0 left-0 right-0 h-[250px] bg-[#1e1e1e] border-t border-[#333] z-30 shadow-2xl"
            >
              <div className="flex items-center px-4 gap-6 text-[11px] font-bold text-[#666] border-b border-[#333] h-8 select-none">
                 <span className="text-white border-b border-white h-full flex items-center cursor-pointer uppercase">Terminal</span>
                 <span className="hover:text-white cursor-pointer h-full flex items-center uppercase">Output</span>
                 <span className="hover:text-white cursor-pointer h-full flex items-center uppercase">Debug Console</span>
                 <div className="ml-auto flex gap-3">
                    <Minus size={14} className="cursor-pointer hover:text-white" onClick={() => setIsTerminalOpen(false)} />
                    <X size={14} className="cursor-pointer hover:text-white" onClick={() => setIsTerminalOpen(false)} />
                 </div>
              </div>
              <div ref={scrollRef} className="p-4 font-mono text-sm overflow-y-auto h-[calc(100%-32px)] custom-scrollbar">
                 <div className="text-[#cccccc] mb-2">Microsoft Windows [Version 10.0.19045]</div>
                 {terminalLogs.map((log, i) => (
                    <div key={i} className="mt-0.5">
                       {log.startsWith('>') ? <span className="text-[#dcdcaa]">{log}</span> : 
                        log.startsWith('wait') ? <span className="text-white">{log}</span> :
                        log.startsWith('event') ? <span className="text-[#4ec9b0]">{log}</span> :
                        log.startsWith('warn') ? <span className="text-[#cca700]">{log}</span> :
                        <span className="text-[#cccccc]">{log}</span>}
                    </div>
                 ))}
                 {buildStep === 2 && (
                    <div className="mt-4 text-[#4ec9b0]">
                       Done in 4.82s. <span className="text-white animate-pulse">_</span>
                    </div>
                 )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STATUS BAR */}
        <div className="h-6 bg-[#007acc] text-white flex items-center px-3 text-[11px] justify-between z-40 select-none w-full absolute bottom-0">
           <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 hover:bg-white/20 px-1 rounded cursor-pointer"><GitGraph size={12}/> main*</span>
              <span className="flex items-center gap-1 hover:bg-white/20 px-1 rounded cursor-pointer"><AlertCircle size={12}/> 0</span>
           </div>
           <div className="flex items-center gap-3">
              <span className="hidden sm:block">Ln {FILES_CONTENT[activeTab].split('\n').length}, Col 1</span>
              <span>UTF-8</span>
              <span>{activeTab.endsWith('ts') ? 'TypeScript' : activeTab.endsWith('css') ? 'CSS' : 'Markdown'}</span>
              <span className="hover:bg-white/20 px-1 rounded cursor-pointer"><CheckCircle2 size={12}/> Prettier</span>
           </div>
        </div>

      </div>
    </section>
  );
};

export default Section1;