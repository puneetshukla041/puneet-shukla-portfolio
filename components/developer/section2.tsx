'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Image from 'next/image';
import { Calendar, MapPin, Briefcase, GraduationCap, GitCommit, GitPullRequest, ArrowRight, CheckCircle2 } from 'lucide-react';

// --- Experience Data (Chronological Order: Oldest -> Newest) ---
const timelineData = [
  {
    id: 'education',
    type: 'education',
    role: "Bachelor of Technology",
    company: "GLA University",
    period: "Sep 2021 - Aug 2025",
    duration: "4 Years",
    location: "Mathura, India",
    logo: "/images/gla-logo.png", 
    commitMsg: "init: computer science foundation (AI/ML)",
    branch: "master",
    points: [
      "Specialized in Artificial Intelligence and Machine Learning.",
      "Core coursework in Data Structures, Algorithms, and Distributed Systems.",
      "Built a strong foundation in software engineering principles."
    ],
    tech: ["C++", "Python", "Data Structures", "Algorithms"]
  },
  {
    id: 'medanta',
    type: 'internship',
    role: "Engineering Intern",
    company: "Medanta",
    period: "May 2023 - Aug 2023",
    duration: "4 mos",
    location: "Gurugram · On-site",
    logo: "/logos/medanta.png",
    commitMsg: "test: api validation & security compliance",
    branch: "qa/security",
    points: [
      "Conducted rigorous API testing (Postman) ensuring 99.9% data integrity.",
      "Established version control best practices using Git flow for the dev team.",
      "Executed penetration testing to validate patient data security protocols.",
      "Automated regression test suites for critical healthcare modules."
    ],
    tech: ["Python", "Postman", "Selenium", "Security Ops"]
  },
  {
    id: 'disney',
    type: 'internship',
    role: "Software Engineer Intern",
    company: "Disney+ Hotstar",
    period: "Oct 2023 - Mar 2024",
    duration: "6 mos",
    location: "Bengaluru · Remote",
    logo: "/logos/disney.png",
    commitMsg: "perf: optimize backend scalability & payment sdk",
    branch: "feature/scalability",
    points: [
      "Implemented audit logging and retry mechanisms for the high-traffic Messenger Service.",
      "Optimized Offer Service cache loaders, reducing latency during peak loads.",
      "Developed dynamic CTA rendering logic for the Entitlement SDK based on user plans.",
      "Executed database query optimizations for the Payments Service."
    ],
    tech: ["Golang", "AWS", "DynamoDB", "High Scale Systems"]
  },
  {
    id: 'ssi',
    type: 'work',
    role: "Software Engineer",
    company: "SS Innovations International, Inc.",
    period: "Apr 2025 - Present",
    duration: "Current",
    location: "Gurugram · On-site",
    logo: "/logos/ssi.png",
    commitMsg: "feat: lead web ecosystem & ssi studios",
    branch: "main",
    active: true, // Marker for current role
    points: [
      "Architecting advanced web/mobile applications adapting to organizational needs.",
      "Spearheaded 'SSI Studios', an all-in-one creative platform consolidating 5+ design tools.",
      "Engineered a zero-learning-curve interface reducing design turnaround time by 80%.",
      "Standardized branding outputs across the organization via centralized asset management."
    ],
    tech: ["Next.js", "React Native", "System Design", "Microservices"]
  }
];

const Section2 = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 50%"] // Adjusted offsets for better draw timing
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="section2" className="relative w-full min-h-screen bg-[#000000] text-gray-300 py-24 px-4 sm:px-8 font-sans selection:bg-blue-500/30">
      
      {/* Background: Minimalist Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 pl-4 md:pl-0"
        >
          <div className="flex items-center gap-3 text-sm font-mono text-blue-500 mb-4 opacity-80">
            <GitPullRequest size={16} />
            <span>git log --graph --date=relative</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Timeline</span>
          </h2>
          <p className="text-gray-500 mt-4 text-lg max-w-2xl font-light">
            My engineering journey from foundational education to leading scalable production systems.
          </p>
        </motion.div>

        {/* Timeline Wrapper */}
        <div ref={containerRef} className="relative">
          
          {/* Vertical Git Line (Static Track) */}
          <div className="absolute left-[19px] md:left-[249px] top-4 bottom-0 w-[2px] bg-[#1f1f1f]" />
          
          {/* Vertical Git Line (Animated Fill) */}
          <motion.div 
            style={{ scaleY }}
            className="absolute left-[19px] md:left-[249px] top-4 bottom-0 w-[2px] bg-blue-600 origin-top" 
          />

          <div className="space-y-16">
            {timelineData.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }} // Staggered delay
                className="relative flex flex-col md:flex-row gap-8 group"
              >
                {/* 1. Left Meta (Desktop) */}
                <div className="hidden md:flex flex-col items-end w-[200px] pt-1 text-right gap-1 pr-8">
                  <span className={`font-mono text-sm font-bold tracking-wide ${item.active ? 'text-green-400' : 'text-gray-300'}`}>
                    {item.period.split(' - ')[0]}
                  </span>
                  <span className="font-mono text-xs text-gray-500">{item.duration}</span>
                  <div className="mt-2 flex items-center gap-1 text-[10px] text-gray-500 bg-[#0a0a0a] px-2 py-1 rounded border border-[#1f1f1f]">
                    <GitCommit size={10} /> {item.branch}
                  </div>
                </div>

                {/* 2. Timeline Node */}
                <div className="absolute left-[11px] md:left-[241px] top-1.5 z-10 bg-[#000000]">
                  <div className={`w-[18px] h-[18px] rounded-full border-[3px] bg-[#000000] transition-all duration-300 group-hover:scale-125
                    ${item.active 
                      ? 'border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)] animate-pulse' 
                      : item.type === 'education' 
                        ? 'border-purple-500'
                        : 'border-blue-500'}`} 
                  />
                </div>

                {/* 3. Card Content */}
                <div className="flex-1 ml-10 md:ml-0">
                  {/* Mobile Meta (Visible only on small screens) */}
                  <div className="md:hidden flex items-center gap-2 mb-3 text-xs font-mono text-gray-500">
                    <Calendar size={12} /> {item.period}
                  </div>

                  <div className={`relative bg-[#050505] border rounded-xl p-6 md:p-8 transition-all duration-300 group-hover:bg-[#0a0a0a]
                    ${item.active ? 'border-green-900/30 shadow-[0_0_30px_rgba(22,163,74,0.05)]' : 'border-[#1f1f1f] hover:border-blue-900/30'}`}
                  >
                    
                    {/* Card Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6 border-b border-[#1f1f1f] pb-6">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-1 shrink-0 overflow-hidden">
                           <Image src={item.logo} alt={item.company} width={45} height={45} className="object-contain" />
                        </div>
                        <div>
                          <h3 className={`text-xl font-bold transition-colors ${item.active ? 'text-green-400' : 'text-white group-hover:text-blue-400'}`}>
                            {item.role}
                          </h3>
                          <div className="text-gray-400 font-medium text-sm flex items-center gap-2 mt-1">
                            {item.company} 
                            <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-gray-600" />
                            <span className="text-gray-600 text-xs flex items-center gap-1"><MapPin size={10} /> {item.location}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Commit Badge */}
                      <div className="font-mono text-[10px] text-gray-500 bg-[#0a0a0a] px-3 py-1.5 rounded border border-[#1f1f1f] max-w-[200px] truncate">
                        {item.commitMsg}
                      </div>
                    </div>

                    {/* Bullet Points */}
                    <ul className="space-y-3 mb-6">
                      {item.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-400 leading-relaxed group/item">
                          <ArrowRight size={14} className={`mt-1 transition-colors shrink-0 ${item.active ? 'text-green-500' : 'text-gray-600 group-hover/item:text-blue-500'}`} />
                          {point}
                        </li>
                      ))}
                    </ul>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2">
                      {item.tech.map((t, i) => (
                        <span key={i} className="px-2.5 py-1 text-[11px] font-medium text-gray-500 bg-[#0f0f0f] border border-[#1f1f1f] rounded hover:text-white hover:border-gray-600 transition-colors cursor-default">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Decorative Icon for Education vs Work */}
                    <div className="absolute top-6 right-6 opacity-10 text-gray-500">
                       {item.type === 'education' ? <GraduationCap size={24} /> : <Briefcase size={24} />}
                    </div>

                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* End Node */}
          <div className="absolute left-[15px] md:left-[245px] bottom-[-20px] w-[10px] h-[10px] rounded-full bg-[#1f1f1f]" />

        </div>
      </div>
    </section>
  );
};

export default Section2;