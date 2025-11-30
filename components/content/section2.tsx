'use client';

import React from 'react';
import Image from 'next/image'; // 1. FIX: Added Image import
import { ArrowUpRight } from 'lucide-react';

// NOTE: In a real Next.js application, for performance, these images should be imported
// directly rather than referenced as strings, so Next.js can read their dimensions.
// For now, we manually provide width/height to satisfy the Image component requirement.

// Define default dimensions for Image component usage
const defaultCardWidth = 800;
const defaultCardHeight = 1000;
const defaultGoldenWidth = 1600;
const defaultGoldenHeight = 900;

const portfolioItems = [
  { id: 1, src: '/images/card1.jpg', title: 'Urban Shadows', category: 'Street', width: defaultCardWidth, height: defaultCardHeight },
  { id: 2, src: '/images/card2.jpg', title: 'Silent Noise', category: 'Portrait', width: defaultCardWidth, height: defaultCardHeight },
  { id: 3, src: '/images/card3.jpg', title: 'Neon Dreams', category: 'Editorial', width: defaultCardWidth, height: defaultCardHeight },
  { id: 4, src: '/images/card4.jpg', title: 'Abstract Reality', category: 'Fine Art', width: defaultCardWidth, height: defaultCardHeight },
  { id: 5, src: '/images/card5.jpg', title: 'Motion & Blur', category: 'Experimental', width: defaultCardWidth, height: defaultCardHeight },
  { id: 6, src: '/images/card6.jpg', title: 'Monochrome Soul', category: 'B&W', width: defaultCardWidth, height: defaultCardHeight },
];

const goldenSeries = [
  { id: 1, src: '/images/golden1.jpg', title: 'The Golden Hour', subtitle: 'Warmth & Light', width: defaultGoldenWidth, height: defaultGoldenHeight },
  { id: 2, src: '/images/golden2.jpg', title: 'Sun Kissed', subtitle: 'Natural Glow', width: defaultGoldenWidth, height: defaultGoldenHeight },
  { id: 3, src: '/images/golden3.jpg', title: 'Evening Haze', subtitle: 'Atmosphere', width: defaultGoldenWidth, height: defaultGoldenHeight },
  { id: 4, src: '/images/golden4.jpg', title: 'Final Light', subtitle: 'Dusk', width: defaultGoldenWidth, height: defaultGoldenHeight },
];

const Section2 = () => {
  return (
    <section id="section-2" className="relative w-full min-h-screen bg-black text-white py-20 sm:py-32">
      
      {/* ---------------- HEADER ---------------- */}
      <div className="container mx-auto px-6 mb-24 md:mb-32">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-white/10 pb-8">
          <div>
            <h2 className="text-sm font-light tracking-[0.4em] text-gray-400 mb-4 uppercase">
              Selected Works
            </h2>
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase font-sans">
              Visual Narratives
            </h3>
          </div>
          <p className="max-w-md text-gray-400 text-sm md:text-base leading-relaxed text-right md:text-left">
            A curated collection of moments frozen in time. Exploring the intersection of light, shadow, and human emotion through the lens.
          </p>
        </div>
      </div>

      {/* ---------------- PART 1: THE EDITORIAL MASONRY (Cards) ---------------- */}
      <div className="container mx-auto px-4 sm:px-6 mb-32">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {portfolioItems.map((item) => (
            <div key={item.id} className="group relative break-inside-avoid cursor-pointer overflow-hidden">
              {/* Image Container */}
              <div className="relative w-full overflow-hidden bg-gray-900 aspect-[3/4] sm:aspect-auto">
                {/* 2. FIX: Replaced <img> with <Image> */}
                <Image
                  src={item.src}
                  alt={item.title}
                  width={item.width}
                  height={item.height}
                  className="w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                
                {/* Content Reveal */}
                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <div className="overflow-hidden">
                    <p className="text-xs font-medium tracking-widest text-yellow-500 uppercase mb-1 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-100">
                      {item.category}
                    </p>
                  </div>
                  <div className="flex justify-between items-end">
                    <h4 className="text-2xl font-bold tracking-tight text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-200">
                      {item.title}
                    </h4>
                    <ArrowUpRight className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 delay-300 transform translate-y-4 group-hover:translate-y-0" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------------- DIVIDER / QUOTE ---------------- */}
      <div className="w-full bg-white/5 py-24 sm:py-32 my-24 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          {/* 3. FIX: Escaped double quotes */}
          <p className="text-xl sm:text-3xl md:text-4xl font-light italic text-gray-300 leading-relaxed font-serif">
            &quot;Photography is the story I fail to put into words.&quot;
          </p>
          <div className="w-24 h-[1px] bg-yellow-500 mx-auto mt-8" />
        </div>
        {/* Abstract Background Blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-600/10 rounded-full blur-[120px] pointer-events-none" />
      </div>

      {/* ---------------- PART 2: THE GOLDEN SERIES (Polished 16:9) ---------------- */}
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-16 border-l-2 border-yellow-500 pl-6">
          <h2 className="text-sm font-light tracking-[0.4em] text-yellow-500 mb-2 uppercase">
            Featured Series
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tight">
            Golden Hour
          </h3>
        </div>

        <div className="space-y-24">
          
          {/* Feature 1: Hero Cinematic 16:9 */}
          <div className="group relative w-full aspect-video overflow-hidden shadow-2xl ring-1 ring-white/10">
            {/* 2. FIX: Replaced <img> with <Image> */}
            <Image 
              src={goldenSeries[0].src} 
              alt={goldenSeries[0].title}
              width={goldenSeries[0].width}
              height={goldenSeries[0].height}
              className="w-full h-full object-cover object-center transition-transform duration-[2000ms] group-hover:scale-105 filter grayscale-[30%] group-hover:grayscale-0"
            />
            {/* Cinematic Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700" />
            
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col items-start justify-end">
               <span className="inline-block px-3 py-1 mb-4 text-[10px] font-bold tracking-[0.2em] text-black bg-yellow-500 uppercase transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                 Featured Shot
               </span>
              <h4 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                {goldenSeries[0].title}
              </h4>
              <p className="text-lg tracking-[0.3em] font-light text-gray-300 opacity-80 group-hover:opacity-100 transition-opacity duration-700">
                {goldenSeries[0].subtitle}
              </p>
            </div>
          </div>

          {/* Feature 2 & 3: Split View 16:9 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            
            {/* Card 2 */}
            <div className="group cursor-pointer flex flex-col gap-4">
              <div className="overflow-hidden aspect-video relative ring-1 ring-white/10 shadow-lg">
                {/* 2. FIX: Replaced <img> with <Image> */}
                <Image 
                  src={goldenSeries[1].src} 
                  alt={goldenSeries[1].title}
                  width={goldenSeries[1].width}
                  height={goldenSeries[1].height}
                  className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110 filter grayscale-[50%] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <div className="flex justify-between items-baseline border-b border-white/10 pb-4 group-hover:border-yellow-500/50 transition-colors duration-500">
                <div>
                   <h5 className="text-2xl font-bold text-white mb-1 group-hover:text-yellow-400 transition-colors duration-300">{goldenSeries[1].title}</h5>
                   <p className="text-xs text-gray-500 uppercase tracking-widest">{goldenSeries[1].subtitle}</p>
                </div>
                <span className="text-4xl font-black text-white/10 group-hover:text-white/30 transition-colors duration-500">02</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group cursor-pointer flex flex-col gap-4 md:mt-24">
              <div className="overflow-hidden aspect-video relative ring-1 ring-white/10 shadow-lg">
                {/* 2. FIX: Replaced <img> with <Image> */}
                <Image 
                  src={goldenSeries[2].src} 
                  alt={goldenSeries[2].title}
                  width={goldenSeries[2].width}
                  height={goldenSeries[2].height}
                  className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110 filter grayscale-[50%] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <div className="flex justify-between items-baseline border-b border-white/10 pb-4 group-hover:border-yellow-500/50 transition-colors duration-500">
                  <div>
                   <h5 className="text-2xl font-bold text-white mb-1 group-hover:text-yellow-400 transition-colors duration-300">{goldenSeries[2].title}</h5>
                   <p className="text-xs text-gray-500 uppercase tracking-widest">{goldenSeries[2].subtitle}</p>
                </div>
                <span className="text-4xl font-black text-white/10 group-hover:text-white/30 transition-colors duration-500">03</span>
              </div>
            </div>

          </div>

          {/* Feature 4: Wide Cinematic Layout */}
          <div className="py-12 border-t border-neutral-900">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
              <div className="w-full lg:w-3/4 overflow-hidden aspect-video bg-neutral-900 group relative ring-1 ring-white/5">
                {/* 2. FIX: Replaced <img> with <Image> */}
                   <Image 
                      src={goldenSeries[3].src} 
                      alt={goldenSeries[3].title}
                      width={goldenSeries[3].width}
                      height={goldenSeries[3].height}
                      className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    />
                   <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent lg:hidden" />
              </div>
              <div className="w-full lg:w-1/4 space-y-8 relative">
                {/* Decorative Line */}
                <div className="hidden lg:block absolute -left-10 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-yellow-500/50 to-transparent" />
                
                <div>
                   <span className="block text-xs font-bold text-yellow-600 mb-3 tracking-[0.2em]">FINAL CHAPTER</span>
                   <h4 className="text-4xl md:text-5xl font-medium text-white tracking-tight leading-none">{goldenSeries[3].title}</h4>
                   <p className="text-sm text-gray-500 mt-2">{goldenSeries[3].subtitle}</p>
                </div>
                <p className="text-neutral-400 leading-relaxed font-light text-lg">
                  A study of the fleeting moments before darkness. Capturing the raw emotion of the final light.
                </p>
                <button className="text-xs font-bold tracking-[0.2em] text-white border-b border-white pb-1 hover:text-yellow-500 hover:border-yellow-500 transition-colors uppercase pt-4">
                  View Full Gallery
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Footer / Connect */}
      <div className="w-full border-t border-white/10 pt-20 pb-10 text-center">
        <h2 className="text-4xl sm:text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent tracking-tighter cursor-default select-none">
          PUNEET SHUKLA
        </h2>
      </div>

    </section>
  );
};

export default Section2;