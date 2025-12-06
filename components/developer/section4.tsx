'use client';
import React from 'react';
import { 
  FileText, 
  User, 
  LayoutTemplate, 
  CreditCard, 
  ShieldCheck, 
  Layers, 
  Smartphone, 
  Monitor, 
  Download, 
  Terminal, 
  ArrowRight,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Server,
  Database,
  Zap
} from 'lucide-react';

// --- DATA ---
const MODULES = [
  {
    title: "Certificate Generator",
    role: "Database & Automation",
    status: "Live",
    icon: <FileText className="text-zinc-100" size={24} />,
    stack: ["Next.js", "MongoDB", "pdf-lib"],
    desc: "Automates the entire lifecycle of certificate issuance from data entry to final PDF generation.",
    features: [
      { label: "Centralized DB", text: "Replaces Excel with MongoDB." },
      { label: "Instant PDF", text: "Maps data to coordinates instantly." },
      { label: "Bulk Actions", text: "Export thousands in one click." }
    ],
    problemSolved: "Reduced multi-day manual typing to minutes."
  },
  {
    title: "Visiting Card Generator",
    role: "Identity Management",
    status: "Live",
    icon: <User className="text-zinc-100" size={24} />,
    stack: ["React", "NextAuth", "Tailwind"],
    desc: "Digitizes professional identity assets with a streamlined 'Enter, Save, Generate' workflow.",
    features: [
      { label: "Dual-Theme", text: "Switch Light & Dark templates." },
      { label: "On-Demand", text: "Generate cards anytime." },
      { label: "Direct Email", text: "Dispatch to doctors instantly." }
    ],
    problemSolved: "Decoupled data from design."
  },
  {
    title: "Smart Poster Maker",
    role: "Design Automation",
    status: "Live",
    icon: <LayoutTemplate className="text-zinc-100" size={24} />,
    stack: ["HTML5 Canvas", "CSS Grid"],
    desc: "Specialized design tool automating placement and styling of corporate branding assets.",
    features: [
      { label: "Auto-Center", text: "Calculates geometric center." },
      { label: "Multi-Logo", text: "Aligns co-branding evenly." },
      { label: "Standardization", text: "Enforces consistency." }
    ],
    problemSolved: "Eliminated manual alignment struggles."
  },
  {
    title: "ID Card Maker",
    role: "Credential Management",
    status: "Live",
    icon: <CreditCard className="text-zinc-100" size={24} />,
    stack: ["Next.js", "DOM Rendering"],
    desc: "Comprehensive solution for managing employee credentials and automating ID production.",
    features: [
      { label: "Live Preview", text: "WYSIWYG editor." },
      { label: "Validation", text: "Prevents typos via dropdowns." },
      { label: "Auto-Format", text: "Adjusts fonts for long names." }
    ],
    problemSolved: "Reduced production time to seconds."
  },
  {
    title: "Secure Feedback",
    role: "Intelligence Gathering",
    status: "Live",
    icon: <ShieldCheck className="text-zinc-100" size={24} />,
    stack: ["E2EE Protocols", "Next API"],
    desc: "Specialized communication channel gathering structured, actionable intelligence.",
    features: [
      { label: "Identity-Link", text: "Auto-tags User IDs." },
      { label: "Triage", text: "Routes security vs features." },
      { label: "Evidence", text: "Allows screenshot uploads." }
    ],
    problemSolved: "Turns vague complaints into tickets."
  },
  {
    title: "User Profile Suite",
    role: "Security & Control",
    status: "Live",
    icon: <Layers className="text-zinc-100" size={24} />,
    stack: ["NextAuth", "JWT", "i18n"],
    desc: "Personal command center for identity management, system preferences, and security.",
    features: [
      { label: "Security", text: "2FA & Session Monitoring." },
      { label: "Localization", text: "English, Spanish, French." },
      { label: "Data Control", text: "Permanent delete options." }
    ],
    problemSolved: "Empowered users to secure accounts."
  }
];

const NATIVE_APPS = {
  title: "Native Ecosystem",
  desc: "Expanded beyond the browser. Specialized compiled binaries for high-performance workflows.",
  features: [
    { name: "Android APK", detail: "Touch-optimized / On-the-go approvals", icon: <Smartphone size={16}/> },
    { name: "Windows EXE", detail: "Electron / Local asset loading", icon: <Terminal size={16}/> },
    { name: "Real-time Sync", detail: "Seamless state continuity", icon: <Zap size={16}/> }
  ]
};

// --- COMPONENTS ---

const SectionHeader = ({ sub, title }: { sub: string, title: string }) => (
  <div className="mb-12 md:mb-20 border-l-2 border-white/10 pl-4 md:pl-6">
    <h2 className="text-xs md:text-sm font-mono text-zinc-500 mb-2 tracking-widest uppercase">
      {sub}
    </h2>
    <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
      {title}
    </h3>
  </div>
);

export default function CaseStudySection() {
  return (
    <section className="relative min-h-screen bg-transparent text-zinc-100 font-sans selection:bg-zinc-800 selection:text-white py-12 md:py-24 z-10">
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* --- 1. EXECUTIVE SUMMARY --- */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 mb-32 items-end">
           <div className="border-l-2 border-white/10 pl-4 md:pl-6">
              <h2 className="text-xs md:text-sm font-mono text-zinc-500 mb-2 tracking-widest uppercase">
                Case Study
              </h2>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.9] tracking-tight mb-6">
                SSI<span className="text-zinc-600">STUDIOS</span>
              </h1>
              <p className="text-base md:text-lg text-zinc-400 font-light leading-relaxed max-w-xl">
                A custom workflow solution bridging the gap between data management and graphic design. 
                By automating "busy work," we empower the <span className="text-white font-medium">SSimaya Team</span> to focus on high-value creative tasks.
              </p>
           </div>

           <div className="flex flex-col items-start lg:items-end gap-4">
              <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-4 rounded-lg">
                 <div className="text-right">
                    <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Project Lead</p>
                    <p className="text-sm font-bold text-white">Puneet Shukla</p>
                 </div>
                 <div className="h-8 w-px bg-white/10"></div>
                 <div className="text-right">
                    <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Supervision</p>
                    <p className="text-sm font-bold text-white">Naveen A. Kumar</p>
                 </div>
              </div>
           </div>
        </div>

        {/* --- 2. PROBLEM VS SOLUTION --- */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-32">
          {/* Problem Card */}
          <div className="p-8 md:p-10 bg-white/5 border border-white/10 rounded-xl hover:bg-white/[0.07] transition-colors">
            <div className="flex items-center gap-3 mb-6 text-red-400">
              <AlertTriangle size={20} />
              <h2 className="text-sm font-mono uppercase tracking-widest">The Bottleneck</h2>
            </div>
            <p className="text-zinc-400 leading-relaxed mb-8">
              Designers were manually editing hundreds of files for bulk orders, leading to burnout. 
              Client data lived in spreadsheets while designs lived in Photoshop—a disconnect causing 
              frequent synchronization errors and wasted hours on administrative labor.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] uppercase tracking-wider rounded-full">Wasted Time</span>
              <span className="px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] uppercase tracking-wider rounded-full">Scattered Data</span>
            </div>
          </div>

          {/* Solution Card */}
          <div className="p-8 md:p-10 bg-white/5 border border-white/10 rounded-xl hover:bg-white/[0.07] transition-colors">
            <div className="flex items-center gap-3 mb-6 text-emerald-400">
              <CheckCircle2 size={20} />
              <h2 className="text-sm font-mono uppercase tracking-widest">The Ecosystem</h2>
            </div>
            <p className="text-zinc-400 leading-relaxed mb-8">
              We built a unified ecosystem where design tools and databases coexist. 
              SSISTUDIOS integrates seven specific tools into one dashboard, acting as the "Single Source of Truth" 
              and automating asset generation instantly.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] uppercase tracking-wider rounded-full">Automation</span>
              <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] uppercase tracking-wider rounded-full">Centralization</span>
            </div>
          </div>
        </div>

        {/* --- 3. MODULE DEEP DIVE --- */}
        <SectionHeader sub="System Architecture" title="Core Modules." />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
          {MODULES.map((mod, idx) => (
            <div key={idx} className="group p-6 md:p-8 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 transition-all flex flex-col h-full">
              
              {/* Card Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-zinc-900 border border-white/10 rounded-lg group-hover:bg-zinc-800 transition-colors">
                  {mod.icon}
                </div>
                <span className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider rounded-full">
                  {mod.status}
                </span>
              </div>

              <h4 className="text-xl font-bold text-white mb-1">
                {mod.title}
              </h4>
              <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">{mod.role}</p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {mod.stack.map((tech, tIdx) => (
                  <span key={tIdx} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-zinc-400">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                {mod.desc}
              </p>

              {/* Features List */}
              <ul className="space-y-2 mb-8 flex-grow">
                {mod.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-start text-xs text-zinc-500">
                    <ArrowRight size={12} className="mr-2 mt-0.5 text-zinc-300 shrink-0" />
                    <span>
                      <strong className="text-zinc-300">{feat.label}:</strong> {feat.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Impact Footer */}
              <div className="mt-auto pt-4 border-t border-white/5">
                 <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-2">Impact</p>
                 <p className="text-xs text-zinc-300 italic border-l-2 border-white/20 pl-3">
                   "{mod.problemSolved}"
                 </p>
              </div>

            </div>
          ))}
        </div>

        {/* --- 4. NATIVE APPS --- */}
        <SectionHeader sub="Cross Platform" title="Native Ecosystem." />

        <div className="relative mb-32 group">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
          
          <div className="bg-black/40 border border-white/10 backdrop-blur-xl p-12 relative overflow-hidden rounded-xl">
             <div className="grid md:grid-cols-3 gap-16 relative z-10">
               <div className="md:col-span-1 flex flex-col justify-center">
                 <h3 className="text-3xl font-bold text-white mb-4">{NATIVE_APPS.title}</h3>
                 <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                   {NATIVE_APPS.desc}
                 </p>
                 <div className="flex flex-col gap-4">
                    {/* BUTTON 1 - APK */}
                    <button className="group relative px-6 py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-between overflow-hidden bg-white/5 border border-white/10 text-white transition-all hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                      <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-500 ease-in-out group-hover:left-full z-0" />
                      <span className="relative z-10">Download APK</span>
                      <Download size={16} className="relative z-10 text-white/50 group-hover:text-white transition-colors" />
                    </button>
                    
                    {/* BUTTON 2 - EXE */}
                    <button className="group relative px-6 py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-between overflow-hidden bg-white/5 border border-white/10 text-white transition-all hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                      <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-500 ease-in-out group-hover:left-full z-0" />
                      <span className="relative z-10">Windows EXE</span>
                      <Download size={16} className="relative z-10 text-white/50 group-hover:text-white transition-colors" />
                    </button>
                 </div>
               </div>

               <div className="md:col-span-2 grid sm:grid-cols-3 gap-4">
                 {NATIVE_APPS.features.map((feat, i) => (
                   <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-xl hover:border-white/30 transition-all flex flex-col justify-center items-center text-center group/card">
                     <div className="text-zinc-400 mb-4 group-hover/card:text-white group-hover/card:scale-110 transition-all duration-300">{feat.icon}</div>
                     <h5 className="text-white text-sm font-bold uppercase tracking-wider mb-2">{feat.name}</h5>
                     <p className="text-[10px] text-zinc-500 font-mono">{feat.detail}</p>
                   </div>
                 ))}
               </div>
             </div>
          </div>
        </div>

        {/* --- 5. CONCLUSION --- */}
        <div className="text-center max-w-2xl mx-auto pb-20">
          <Database className="mx-auto text-zinc-600 mb-6" size={40} />
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Workflow Transformed.</h2>
          <p className="text-zinc-400 leading-loose">
            SSISTUDIOS has successfully migrated our operations from manual to automated. 
            By centralizing data and automating design generation, we have significantly 
            reduced turnaround times. This project ensures our team spends their time 
            <span className="text-white font-medium border-b border-white/20 pb-0.5"> designing, not typing.</span>
          </p>
          <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          <p className="mt-8 text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
            End of Report // Status: Complete
          </p>
        </div>

      </div>
    </section>
  );
}