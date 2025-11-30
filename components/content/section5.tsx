'use client';

import React, { useState } from 'react';
import { Mail, Instagram, Linkedin, MapPin, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Section5 = () => {
  const [formState, setFormState] = useState({ name: '', email: '', type: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [isFocused, setIsFocused] = useState('');

  const projectTypes = ['Brand Film', 'Music Video', 'Corporate', 'Photography', 'Other'];

  const handleFocus = (field: string) => setIsFocused(field);
  const handleBlur = () => setIsFocused('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic Validation simulation
    if (!formState.name || !formState.email) return;

    setStatus('loading');

    // Simulate API call delay
    setTimeout(() => {
      setStatus('success');
      // Reset form logic would go here if you wanted them to submit again later
    }, 2000);
  };

  return (
    <section id="section-5" className="relative w-full min-h-screen bg-neutral-950 text-white flex flex-col justify-between pt-24 sm:pt-40 pb-12 overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute top-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-yellow-600/5 rounded-full blur-[120px]" 
        />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-neutral-800/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 flex-grow">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-32">
          
          {/* ---------------- LEFT: THE STATEMENT ---------------- */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 space-y-12 sm:space-y-16"
          >
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: 48 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="h-[1px] bg-yellow-600"
                />
                <span className="text-xs font-bold tracking-[0.4em] text-neutral-500 uppercase">
                  Contact
                </span>
              </div>
              <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
                Let&apos;s Create <br /> {/* FIX: Escaped the apostrophe */}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 to-neutral-700">
                  Something Iconic
                </span>
              </h2>
            </div>

            <div className="space-y-8">
              <p className="text-neutral-400 text-base sm:text-lg leading-relaxed max-w-md">
                Available for commissions worldwide. <span className="text-white font-medium">Puneet Shukla Films</span> specializes in high-end visual storytelling, cinematic direction, and editorial photography.
              </p>
              
              <div className="flex flex-col gap-6">
                 {/* Email Block */}
                 <a href="mailto:puneetshukla041@gmail.com" className="group flex items-center gap-4 sm:gap-6 p-4 sm:p-6 border border-neutral-800 hover:border-yellow-600/30 hover:bg-yellow-900/5 transition-all duration-500 rounded-sm">
                    <div className="p-3 bg-neutral-900 rounded-full group-hover:scale-110 transition-transform duration-500">
                      <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-300 group-hover:text-yellow-500 transition-colors" />
                    </div>
                    <div className="overflow-hidden">
                      <span className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-1">Email Me Directly</span>
                      <span className="text-base sm:text-xl font-medium text-white group-hover:text-yellow-500 transition-colors break-all">puneetshukla041@gmail.com</span>
                    </div>
                 </a>

                 {/* Location Block */}
                 <div className="flex items-center gap-4 sm:gap-6 p-4 sm:p-6 border border-neutral-800 rounded-sm">
                    <div className="p-3 bg-neutral-900 rounded-full">
                      <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-300" />
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-1">Based In</span>
                      <span className="text-lg sm:text-xl font-medium text-white">Gurugram, India</span>
                    </div>
                 </div>
              </div>
            </div>

            {/* Socials Grid */}
            <div className="pt-8 border-t border-neutral-900">
              <span className="block text-xs uppercase tracking-widest text-neutral-600 mb-6">Follow The Journey</span>
              <div className="flex gap-4 sm:gap-8">
                {[
                  { icon: Instagram, label: 'Instagram', link: '#' },
                  { icon: Linkedin, label: 'LinkedIn', link: '#' }
                ].map((social, idx) => (
                  <a 
                    key={idx} 
                    href={social.link} 
                    target="_blank"
                    rel="noreferrer"
                    className="group flex flex-col items-center gap-2 cursor-pointer"
                  >
                    <div className="p-3 sm:p-4 border border-neutral-800 rounded-full group-hover:border-white group-hover:bg-white transition-all duration-300">
                      <social.icon className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400 group-hover:text-black transition-colors" />
                    </div>
                  </a>
                ))}
              </div>
            </div>

          </motion.div>

          {/* ---------------- RIGHT: THE FORM (ANIMATED CONTAINER) ---------------- */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-full lg:w-1/2 bg-neutral-900/30 border border-neutral-800 backdrop-blur-md rounded-sm min-h-[600px] relative overflow-hidden flex flex-col"
          >
             <AnimatePresence mode="wait">
                 {status === 'success' ? (
                    /* SUCCESS STATE */
                    <motion.div
                     key="success"
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0 }}
                     transition={{ duration: 0.5, ease: "circOut" }}
                     className="flex-grow flex flex-col items-center justify-center text-center p-12 space-y-6"
                    >
                      <motion.div 
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", damping: 12, stiffness: 100, delay: 0.2 }}
                        className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-4"
                      >
                         <CheckCircle2 className="w-10 h-10 text-green-500" />
                      </motion.div>
                      <h3 className="text-3xl font-light text-white">Message Received</h3>
                      <p className="text-neutral-400 max-w-xs leading-relaxed">
                        Thank you for reaching out, <span className="text-white font-medium capitalize">{formState.name}</span>. We will review your project details and get back to you shortly.
                      </p>
                      <button 
                        onClick={() => { setStatus('idle'); setFormState({ name: '', email: '', type: '', message: '' })}}
                        className="mt-8 text-xs uppercase tracking-widest text-neutral-500 hover:text-white transition-colors"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                ) : (
                    /* FORM STATE */
                    <motion.div
                     key="form"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0, filter: "blur(10px)" }}
                     transition={{ duration: 0.5 }}
                     className="p-6 sm:p-12 h-full flex flex-col"
                    >
                      <h3 className="text-xl sm:text-2xl font-light tracking-wide mb-8 sm:mb-10 text-white">
                        Project Inquiry
                      </h3>

                      <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10 flex-grow">
                        
                        {/* Name Input */}
                        <div className="relative group">
                          <input 
                            required
                            type="text" 
                            name="name"
                            value={formState.name}
                            onChange={(e) => setFormState({...formState, name: e.target.value})}
                            placeholder=" "
                            className={`block py-4 px-0 w-full text-base sm:text-lg text-white bg-transparent border-0 border-b appearance-none focus:outline-none focus:ring-0 transition-colors duration-300 ${isFocused === 'name' ? 'border-yellow-600' : 'border-neutral-700'}`}
                            onFocus={() => handleFocus('name')}
                            onBlur={handleBlur}
                          />
                          <label className={`absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${isFocused === 'name' || formState.name ? 'text-yellow-600' : 'text-neutral-500'}`}>
                            Your Name *
                          </label>
                        </div>

                        {/* Email Input */}
                        <div className="relative group">
                          <input 
                            required
                            type="email" 
                            name="email"
                            value={formState.email}
                            onChange={(e) => setFormState({...formState, email: e.target.value})}
                            placeholder=" "
                            className={`block py-4 px-0 w-full text-base sm:text-lg text-white bg-transparent border-0 border-b appearance-none focus:outline-none focus:ring-0 transition-colors duration-300 ${isFocused === 'email' ? 'border-yellow-600' : 'border-neutral-700'}`}
                            onFocus={() => handleFocus('email')}
                            onBlur={handleBlur}
                          />
                          <label className={`absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${isFocused === 'email' || formState.email ? 'text-yellow-600' : 'text-neutral-500'}`}>
                            Email Address *
                          </label>
                        </div>

                        {/* Project Type Grid */}
                        <div className="space-y-4">
                          <span className="text-xs uppercase tracking-widest text-neutral-500">Interest</span>
                          <div className="flex flex-wrap gap-2 sm:gap-3">
                            {projectTypes.map((type) => (
                              <button
                                type="button"
                                key={type}
                                onClick={() => setFormState({ ...formState, type: type })}
                                className={`px-3 py-2 sm:px-4 sm:py-2 text-[10px] sm:text-xs uppercase tracking-wider border transition-all duration-300 ${
                                  formState.type === type 
                                  ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.1)]' 
                                  : 'bg-transparent text-neutral-400 border-neutral-800 hover:border-neutral-600'
                                }`}
                              >
                                {type}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Message Input */}
                        <div className="relative group pt-4">
                          <textarea 
                            name="message"
                            rows={3}
                            value={formState.message}
                            onChange={(e) => setFormState({...formState, message: e.target.value})}
                            placeholder=" "
                            className={`block py-4 px-0 w-full text-base sm:text-lg text-white bg-transparent border-0 border-b appearance-none focus:outline-none focus:ring-0 transition-colors duration-300 resize-none ${isFocused === 'message' ? 'border-yellow-600' : 'border-neutral-700'}`}
                            onFocus={() => handleFocus('message')}
                            onBlur={handleBlur}
                          />
                          <label className={`absolute text-sm duration-300 transform -translate-y-6 scale-75 top-7 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${isFocused === 'message' || formState.message ? 'text-yellow-600' : 'text-neutral-500'}`}>
                            Tell me about your project
                          </label>
                        </div>

                        {/* Animated Submit Button */}
                        <button 
                          disabled={status === 'loading'}
                          type="submit"
                          className="group relative w-full flex items-center justify-center gap-4 py-4 sm:py-5 bg-neutral-800 text-white uppercase tracking-[0.2em] text-xs sm:text-sm font-bold overflow-hidden transition-all duration-500 hover:bg-neutral-700 disabled:opacity-70 disabled:cursor-not-allowed mt-auto"
                        >
                           <AnimatePresence mode="wait">
                              {status === 'loading' ? (
                                 <motion.div
                                   key="loader"
                                   initial={{ opacity: 0, y: 10 }}
                                   animate={{ opacity: 1, y: 0 }}
                                   exit={{ opacity: 0, y: -10 }}
                                   className="flex items-center gap-2"
                                 >
                                   <Loader2 className="w-4 h-4 animate-spin" />
                                   <span>Processing</span>
                                 </motion.div>
                              ) : (
                                 <motion.div
                                   key="idle"
                                   initial={{ opacity: 0, y: 10 }}
                                   animate={{ opacity: 1, y: 0 }}
                                   exit={{ opacity: 0, y: -10 }}
                                   className="flex items-center gap-3 z-10"
                                 >
                                   <span>Send Message</span> <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                 </motion.div>
                              )}
                           </AnimatePresence>
                           
                           {/* Hover Effect Background */}
                           {status !== 'loading' && (
                              <div className="absolute inset-0 bg-white mix-blend-difference transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-0 pointer-events-none" />
                           )}
                        </button>

                      </form>
                    </motion.div>
                )}
             </AnimatePresence>
          </motion.div>
        </div>
        
      </div>

      {/* ---------------- FOOTER BAR ---------------- */}
      <div className="w-full border-t border-neutral-900 mt-16 sm:mt-24 pt-8">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-neutral-600 uppercase tracking-widest text-center md:text-left">
           <span>&copy; 2024 Puneet Shukla Films. All Rights Reserved.</span>
           <div className="flex gap-8">
             <span className="cursor-pointer hover:text-white transition-colors">Privacy Policy</span>
             <span className="cursor-pointer hover:text-white transition-colors">Terms of Use</span>
           </div>
        </div>
      </div>

    </section>
  );
};

export default Section5;