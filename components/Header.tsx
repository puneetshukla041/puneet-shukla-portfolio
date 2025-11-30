'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, SVGMotionProps } from 'framer-motion';
import { Instagram, Linkedin, Github, ChevronRight, Code2, Palette } from 'lucide-react';

interface MenuItem {
  title: string;
  href: string;
}

const Header = () => {
  const router = useRouter();
  const pathname = usePathname(); // ← path from router (no manual tracking needed)

  const [isToggled, setIsToggled] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');

  const lastScrollY = useRef(0);

  // ScrollSpy (only content page)
  useEffect(() => {
    if (!pathname?.includes('/content')) return;

    const sections = [
      { id: 'section-1', name: 'Home' },
      { id: 'section-2', name: 'Gallery' },
      { id: 'section-3', name: 'Films' },
      { id: 'section-4', name: 'Films' },
      { id: 'section-5', name: 'Contact Us' }
    ];

    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 150;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (scrollPosition >= top && scrollPosition < bottom) {
          setActiveSection(section.name);
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy);
    handleScrollSpy();
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [pathname]);

  // Sticky header
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setSticky(window.scrollY > 20);
          lastScrollY.current = window.scrollY;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle Developer ↔ Content
  const handleToggle = () => {
    const goTo = pathname?.includes('/developer') ? '/content' : '/developer';
    setIsToggled(prev => !prev);
    setTimeout(() => router.push(goTo), 400);
  };

  // Mobile + Scroll anchor handler
  const handleLinkClick = (e: React.MouseEvent, item: MenuItem) => {
    if (item.href.startsWith('#')) {
      e.preventDefault();
      const id = item.href.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(item.title);
      }
    }
    setMobileMenuOpen(false);
  };

  const Path = (props: SVGMotionProps<SVGPathElement>) => (
    <motion.path fill="transparent" strokeWidth="2.5" stroke="white" strokeLinecap="round" {...props} />
  );

  const developerMenuItems: MenuItem[] = [
    { title: 'Home', href: '/' },
    { title: 'Gallery', href: '/gallery' },
    { title: 'Films', href: '/films' },
    { title: 'About', href: '/about' },
    { title: 'Contact', href: '/contact' },
  ];

  const contentMenuItems: MenuItem[] = [
    { title: 'Home', href: '#section-1' },
    { title: 'Gallery', href: '#section-2' },
    { title: 'Films', href: '#section-3' },
    { title: 'Contact Us', href: '#section-5' },
  ];

  const currentMenuItems = pathname?.includes('/content') ? contentMenuItems : developerMenuItems;

  const isItemActive = (item: MenuItem) => {
    if (pathname?.includes('/content')) return activeSection === item.title;
    return pathname === item.href;
  };

  return (
    <>
      {/* DESKTOP HEADER */}
      <motion.header
        initial={{ y: 0 }}
        animate={{
          y: 0,
          backgroundColor: sticky ? 'rgba(0, 0, 0, 0.6)' : 'transparent',
          backdropFilter: sticky ? 'blur(12px)' : 'none',
          borderBottom: sticky ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
        }}
        transition={{ duration: 0.4 }}
        className="hidden md:block fixed top-0 left-0 right-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 h-[70px] flex items-center justify-between">

          <Link href="/" className="relative">
            <Image src="/images/logo.png" alt="Logo" width={150} height={40} className="h-10 w-auto object-contain" priority />
          </Link>

          {/* NAV */}
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2">
            <div className="flex items-center space-x-1 bg-white/5 border border-white/10 backdrop-blur-md px-3 py-1.5 rounded-full">
              {currentMenuItems.map((item) => {
                const active = isItemActive(item);
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item)}
                    className={`relative px-5 py-2 rounded-full text-sm font-medium transition ${
                      active ? "text-white" : "text-white/60 hover:text-white"
                    }`}
                  >
                    {active && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-white/10 rounded-full"
                        transition={{ type: "spring", bounce: 0.25, duration: 0.55 }}
                      />
                    )}
                    <span className="relative z-10">{item.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* TOGGLE */}
          <div className="flex items-center gap-3 bg-black/20 backdrop-blur-sm rounded-full p-1 pl-4 border border-white/5">
            <AnimatePresence mode="wait">
              <motion.span
                key={pathname?.includes('/developer') ? "dev" : "content"}
                initial={{ y: 5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -5, opacity: 0 }}
                className="text-xs font-semibold"
              >
                {pathname?.includes('/developer') ? "Turn on Content Mode" : "Turn on Developer Mode"}
              </motion.span>
            </AnimatePresence>

            <button
              onClick={handleToggle}
              className={`w-12 h-7 rounded-full p-1 transition ${isToggled ? 'bg-blue-600/90' : 'bg-white/10'}`}
            >
              <motion.div
                className="w-5 h-5 bg-white rounded-full shadow flex items-center justify-center"
                animate={{ x: isToggled ? 20 : 0 }}
                transition={{ type: "spring", stiffness: 520, damping: 30 }}
              >
                {isToggled ? <Code2 size={10} className="text-blue-600" /> : <Palette size={10} className="text-gray-600" />}
              </motion.div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* MOBILE HEADER */}
      <div className="md:hidden">
        <motion.header
          className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center"
          animate={{
            backgroundColor: (sticky || mobileMenuOpen) ? 'rgba(0,0,0,0.8)' : 'transparent',
            backdropFilter: (sticky || mobileMenuOpen) ? 'blur(16px)' : 'none',
          }}
        >
          <Link href="/" className="relative">
            <Image src="/images/logo.png" alt="Logo" width={120} height={32} className="h-8 w-auto object-contain" />
          </Link>

          <button onClick={() => setMobileMenuOpen(prev => !prev)} className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
            <svg width="22" height="22" viewBox="0 0 24 24">
              <Path variants={{ closed: { d: 'M 4 6 L 20 6' }, open: { d: 'M 6 18 L 18 6' }}} animate={mobileMenuOpen ? 'open' : 'closed'} />
              <Path d="M 4 12 L 20 12" variants={{ closed: { opacity: 1 }, open: { opacity: 0 }}} animate={mobileMenuOpen ? 'open' : 'closed'} />
              <Path variants={{ closed: { d: 'M 4 18 L 20 18' }, open: { d: 'M 6 6 L 18 18' }}} animate={mobileMenuOpen ? 'open' : 'closed'} />
            </svg>
          </button>
        </motion.header>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl pt-28 px-6 pb-10 flex flex-col">
              <nav className="flex flex-col space-y-4">
                {currentMenuItems.map((item, idx) => (
                  <motion.div key={idx} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 + idx * 0.05 }}>
                    <Link
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item)}
                      className={`group flex items-center justify-between p-4 rounded-xl border ${
                        isItemActive(item) ? 'bg-white/10 border-white/20' : 'bg-white/5 border-white/5'
                      }`}
                    >
                      <span className={`text-xl font-medium ${isItemActive(item) ? 'text-white' : 'text-white/70'}`}>{item.title}</span>
                      <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-white group-hover:translate-x-1 transition" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Toggle */}
              <div className="mt-auto space-y-6">
                <button onClick={handleToggle} className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isToggled ? 'bg-blue-600 text-white' : 'bg-white/10 text-white/50'}`}>
                      {isToggled ? <Code2 size={20} /> : <Palette size={20} />}
                    </div>
                    <div className="text-sm text-white font-medium">
                      {pathname?.includes('/developer') ? "Turn on Content Mode" : "Turn on Developer Mode"}
                    </div>
                  </div>

                  <div className={`w-12 h-6 rounded-full p-1 ${isToggled ? 'bg-blue-600' : 'bg-white/20'}`}>
                    <motion.div className="w-4 h-4 bg-white rounded-full" animate={{ x: isToggled ? 24 : 0 }} transition={{ type: "spring", stiffness: 400, damping: 25 }} />
                  </div>
                </button>

                <div className="pt-4 flex justify-center gap-8 border-t border-white/10">
                  {[{ Icon: Instagram, href: "https://instagram.com" }, { Icon: Linkedin, href: "https://linkedin.com" }, { Icon: Github, href: "https://github.com" }].map((s, i) => (
                    <a key={i} href={s.href} target="_blank" className="text-white/60 hover:text-white hover:scale-110 transition">
                      <s.Icon size={24} strokeWidth={1.5} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Header;
