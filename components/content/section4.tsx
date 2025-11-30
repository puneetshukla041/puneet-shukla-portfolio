'use client';

// 🚀 FIX 1: Import useCallback
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Volume2, VolumeX, Clapperboard, Award } from 'lucide-react';

const Section4 = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showIntro, setShowIntro] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // ---------------------------------------------------------------------------
  // 1. LOADING ALGORITHM
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + Math.floor(Math.random() * 15) + 1;
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  // ---------------------------------------------------------------------------
  // 2. INTRO SEQUENCE LOGIC
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!isLoading) {
      const startTimer = setTimeout(() => {
        setShowIntro(true);
      }, 3000);

      const endTimer = setTimeout(() => {
        setShowIntro(false);
      }, 6000);

      return () => {
        clearTimeout(startTimer);
        clearTimeout(endTimer);
      };
    }
  }, [isLoading]);

  const handleVideoLoad = () => {
    if (videoRef.current) {
        videoRef.current.defaultMuted = false;
    }
    setProgress(100);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  // ---------------------------------------------------------------------------
  // 3. AGGRESSIVE SOUND-ON PLAYBACK LOGIC (Wrapped in useCallback)
  // ---------------------------------------------------------------------------
  const attemptPlay = useCallback(async () => { // 🚀 FIX 2: Wrapped in useCallback
    if (videoRef.current) {
      try {
        // FORCE sound settings every time we try to play
        videoRef.current.volume = 1.0;
        videoRef.current.muted = false; 
        
        await videoRef.current.play();
        setIsMuted(false); // Success: Sound is ON
      } catch (_) { // 🚀 FIX 3: Changed 'e' to '_' to silence the unused variable warning
        console.log("Browser blocked unmuted autoplay. Falling back to muted.");
        // Fallback: Mute and play so the video doesn't freeze
        if (videoRef.current) {
            videoRef.current.muted = true;
            await videoRef.current.play();
            setIsMuted(true); 
        }
      }
    }
  }, []); // Dependencies are empty -> function is stable

  const pauseVideo = useCallback(() => { // 🚀 FIX 4: Wrapped in useCallback
    if (videoRef.current && !videoRef.current.paused) {
        videoRef.current.pause();
    }
  }, []); // Dependencies are empty -> function is stable

  // ---------------------------------------------------------------------------
  // 4. INTERSECTION OBSERVER (Scroll Detection)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (isLoading) return; 

    // Copy ref value to a constant variable inside the effect body (Fixes cleanup warning)
    const currentSectionRef = sectionRef.current;
    
    const observer = new IntersectionObserver(
        (entries) => {
            const entry = entries[0];
            if (entry.isIntersecting) {
                // User sees the section -> FORCE PLAY WITH SOUND
                attemptPlay();
            } else {
                // User scrolled away -> PAUSE
                pauseVideo();
            }
        },
        { threshold: 0.5 } 
    );

    if (currentSectionRef) {
        observer.observe(currentSectionRef);
    }

    return () => {
        if (currentSectionRef) {
            // Use the local variable in the cleanup function
            observer.unobserve(currentSectionRef);
        }
    };
    // 🚀 FIX 5: Dependencies are clean now.
  }, [isLoading, attemptPlay, pauseVideo]); 


  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section 
        ref={sectionRef}
        className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center"
    >
      
      {/* ---------------------------------------------------------------------------
          LOADER OVERLAY
          --------------------------------------------------------------------------- */}
      <div 
        className={`
          absolute inset-0 z-50 flex flex-col items-center justify-center bg-black
          transition-opacity duration-1000 ease-out
          ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
      >
        <div className="flex flex-col items-center gap-4">
          <Clapperboard className="w-8 h-8 text-neutral-600 animate-pulse" />
          <div className="h-[1px] w-32 bg-neutral-800">
            <div 
              className="h-full bg-white transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[10px] font-mono tracking-widest text-neutral-500">
            INITIALIZING SCENE {progress}%
          </span>
        </div>
      </div>

      {/* ---------------------------------------------------------------------------
          VIDEO LAYER
          --------------------------------------------------------------------------- */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover transform-gpu"
          loop
          playsInline
          preload="auto"
          onCanPlayThrough={handleVideoLoad}
        >
          <source src="/videos/herotwo.mp4" type="video/mp4" />
        </video>
        {/* Darker cinematic overlay for text contrast */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      </div>

      {/* ---------------------------------------------------------------------------
          DIRECTOR'S INTRO OVERLAY (Timing Modified)
          --------------------------------------------------------------------------- */}
      <div 
        className={`
          absolute inset-0 z-30 flex flex-col items-center justify-center text-center pointer-events-none
          transition-all duration-[1000ms] ease-out
          ${showIntro && !isLoading ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-110 blur-xl'}
        `}
      >
        <div className="space-y-6">
          {/* Animated "Directed By" */}
          <p className="text-xs md:text-sm font-bold tracking-[0.6em] text-yellow-500 uppercase animate-fade-in-slow">
            A Film Directed By
          </p>
          
          {/* Massive Name */}
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black text-white tracking-tighter uppercase drop-shadow-2xl animate-scale-slow">
            PUNEET SHUKLA
          </h1>

          <div className="flex items-center justify-center gap-3 animate-fade-in-slow delay-500">
            <div className="h-[1px] w-12 bg-white/50" />
            <Award className="w-5 h-5 text-neutral-300" />
            <div className="h-[1px] w-12 bg-white/50" />
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------------
          ALWAYS VISIBLE CONTROLS
          --------------------------------------------------------------------------- */}
      {!isLoading && (
        <>
{/* LEFT: Captured On Card */}
<div className="absolute bottom-12 left-8 z-40 animate-fade-in hidden md:block">
    <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md px-5 py-3 rounded-sm border border-white/10 hover:bg-black/60 transition-colors">
        <div className="text-left">
            <div className="text-[10px] text-neutral-400 uppercase tracking-widest mb-1">
                Captured On
            </div>
            <div className="text-sm font-bold text-white tracking-wider">
                SONY ALPHA
            </div>
        </div>
    </div>
</div>


          {/* RIGHT: Sound Controls */}
          <div className="absolute bottom-12 right-8 z-40 flex items-center gap-4 animate-fade-in">
          <div className="text-right hidden sm:block">
              <p className="text-[10px] font-bold tracking-widest text-white uppercase">Sound Experience</p>
              <p className="text-[10px] text-neutral-400 font-mono">DOLBY DIGITAL 5.1</p>
          </div>
          <button 
              onClick={toggleSound}
              className="p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 group"
          >
              {isMuted ? (
              <VolumeX className="w-5 h-5 text-white/70 group-hover:text-white" />
              ) : (
              <Volume2 className="w-5 h-5 text-white group-hover:text-yellow-400" />
              )}
          </button>
          </div>
        </>
      )}

      {/* ---------------------------------------------------------------------------
          CSS ANIMATIONS
          --------------------------------------------------------------------------- */}
      <style jsx global>{`
        @keyframes fade-in-slow {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-slow {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in-slow {
          animation: fade-in-slow 2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .animate-scale-slow {
          animation: scale-slow 2.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .animate-fade-in {
          animation: fade-in-slow 1s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Section4;