import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X, Mail, Download, ArrowRight } from 'lucide-react';
import { useActiveSection } from '../hooks/useActiveSection';

const NAV = [
  { label:'Home',       href:'#home',       emoji:'🏠' },
  { label:'About',      href:'#about',      emoji:'👤' },
  { label:'Experience', href:'#experience', emoji:'💼' },
  { label:'Skills',     href:'#skills',     emoji:'⚡' },
  { label:'Projects',   href:'#projects',   emoji:'🚀' },
  { label:'Blog',       href:'#blog',       emoji:'✍️' },
  { label:'Contact',    href:'#contact',    emoji:'📬' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const ids = NAV.map(n => n.href.replace('#',''));
  const active = useActiveSection(ids);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn, { passive:true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [mobileOpen]);

  const go = (href: string) => {
    setMobileOpen(false);
    // Small delay so menu closes before scroll
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior:'smooth' });
    }, 100);
  };

  return (
    <>
      {/* ── Desktop / Mobile top bar ── */}
      <motion.header
        initial={{ y:-80, opacity:0 }}
        animate={{ y:0, opacity:1 }}
        transition={{ duration:0.7, delay:0.1, ease:[0.25,0.46,0.45,0.94] }}
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 h-16 flex items-center justify-between"
        style={{
          background: scrolled
            ? 'rgba(9,9,11,0.75)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(32px) saturate(200%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(32px) saturate(200%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : 'none',
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
          transition: 'all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
        }}
      >
        {/* Logo */}
        <button onClick={() => go('#home')} className="flex items-center gap-2.5 group z-10">
          <motion.div
            whileHover={{ scale:1.08, rotate:3 }}
            whileTap={{ scale:0.95 }}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black text-white shadow-lg shadow-primary/30 shimmer-border"
            style={{ background:'linear-gradient(135deg, #3B82F6, #6366F1)' }}
          >
            H
          </motion.div>
          <div className="hidden sm:block leading-tight">
            <div className="text-sm font-bold text-white/85 group-hover:text-white transition-colors">Humphrey</div>
            <div className="text-[9px] text-primary/70 tracking-[0.2em] uppercase">Portfolio</div>
          </div>
        </button>

        {/* Desktop pill nav */}
        <nav className="hidden lg:flex items-center gap-1 liquid-glass rounded-2xl px-2 py-1.5">
          {NAV.map(item => {
            const isActive = active === item.href.replace('#','');
            return (
              <button key={item.href} onClick={() => go(item.href)}
                className="relative px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 group"
              >
                {isActive && (
                  <motion.div layoutId="nav-bubble"
                    className="absolute inset-0 rounded-xl liquid-glass-active"
                    transition={{ type:'spring', stiffness:350, damping:35 }}
                  />
                )}
                <span className={`relative z-10 transition-all duration-300 ${isActive ? 'text-white' : 'text-white/40 group-hover:text-white/75'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <motion.a
          href="mailto:humphreylionelgevero@gmail.com"
          whileHover={{ scale:1.04, y:-1 }}
          whileTap={{ scale:0.97 }}
          className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl text-white text-xs font-bold shadow-lg shadow-primary/25 shimmer-border"
          style={{ background:'linear-gradient(135deg, #3B82F6, #6366F1)' }}
        >
          <Mail size={13}/> Hire Me
        </motion.a>

        {/* Mobile burger */}
        <motion.button
          onClick={() => setMobileOpen(o => !o)}
          whileTap={{ scale:0.92 }}
          className="lg:hidden relative z-[60] w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300"
          style={{
            background: mobileOpen ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.06)',
            border: `1px solid ${mobileOpen ? 'rgba(59,130,246,0.4)' : 'rgba(255,255,255,0.1)'}`,
            backdropFilter: 'blur(20px)',
          }}
        >
          <AnimatePresence mode="wait">
            {mobileOpen
              ? <motion.div key="x" initial={{rotate:-90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:90,opacity:0}} transition={{duration:0.2}}>
                  <X size={18} className="text-primary"/>
                </motion.div>
              : <motion.div key="m" initial={{rotate:90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:-90,opacity:0}} transition={{duration:0.2}}>
                  <Menu size={18} className="text-white/70"/>
                </motion.div>
            }
          </AnimatePresence>
        </motion.button>
      </motion.header>

      {/* ── Mobile full-screen menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity:0 }}
              animate={{ opacity:1 }}
              exit={{ opacity:0 }}
              transition={{ duration:0.3 }}
              className="fixed inset-0 z-[55]"
              style={{ background:'rgba(5,5,8,0.92)', backdropFilter:'blur(40px)', WebkitBackdropFilter:'blur(40px)' }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              initial={{ opacity:0, x:'100%' }}
              animate={{ opacity:1, x:0 }}
              exit={{ opacity:0, x:'100%' }}
              transition={{ type:'spring', stiffness:300, damping:32 }}
              className="fixed top-0 right-0 bottom-0 z-[56] w-[85vw] max-w-sm flex flex-col"
              style={{
                background:'rgba(9,9,11,0.85)',
                backdropFilter:'blur(60px) saturate(180%)',
                WebkitBackdropFilter:'blur(60px) saturate(180%)',
                borderLeft:'1px solid rgba(255,255,255,0.08)',
                boxShadow:'-20px 0 60px rgba(0,0,0,0.5)',
              }}
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/6">
                <div>
                  <div className="text-white font-bold text-base">Navigation</div>
                  <div className="text-white/30 text-xs mt-0.5">Humphrey Gevero</div>
                </div>
                <motion.button onClick={() => setMobileOpen(false)}
                  whileTap={{ scale:0.9 }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white transition-colors"
                  style={{ background:'rgba(255,255,255,0.06)' }}
                >
                  <X size={16}/>
                </motion.button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 px-4 py-4 overflow-y-auto">
                {NAV.map((item, i) => {
                  const isActive = active === item.href.replace('#','');
                  return (
                    <motion.button
                      key={item.href}
                      initial={{ opacity:0, x:30 }}
                      animate={{ opacity:1, x:0 }}
                      transition={{ delay:i*0.04, ease:[0.25,0.46,0.45,0.94] }}
                      onClick={() => go(item.href)}
                      className={`w-full text-left flex items-center gap-3 px-4 py-3.5 rounded-2xl mb-1 transition-all duration-200 group ${
                        isActive
                          ? 'liquid-glass-active'
                          : 'hover:bg-white/5'
                      }`}
                    >
                      <span className="text-base">{item.emoji}</span>
                      <span className={`font-semibold text-base transition-colors ${isActive ? 'text-white' : 'text-white/55 group-hover:text-white'}`}>
                        {item.label}
                      </span>
                      {isActive && (
                        <motion.div initial={{opacity:0,x:-4}} animate={{opacity:1,x:0}}
                          className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"
                        />
                      )}
                    </motion.button>
                  );
                })}
              </nav>

              {/* Bottom CTAs */}
              <motion.div
                initial={{ opacity:0, y:20 }}
                animate={{ opacity:1, y:0 }}
                transition={{ delay:0.25 }}
                className="px-5 pb-8 pt-3 space-y-2.5 border-t border-white/6 safe-bottom"
              >
                <motion.a
                  href="mailto:humphreylionelgevero@gmail.com"
                  onClick={() => setMobileOpen(false)}
                  whileTap={{ scale:0.97 }}
                  className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-2xl text-white font-bold text-sm shimmer-border"
                  style={{ background:'linear-gradient(135deg, #3B82F6, #6366F1)', boxShadow:'0 8px 24px rgba(59,130,246,0.3)' }}
                >
                  <Mail size={16}/> Hire Me <ArrowRight size={14}/>
                </motion.a>
                <motion.a
                  href="/portfolio/resume.pdf" download
                  onClick={() => setMobileOpen(false)}
                  whileTap={{ scale:0.97 }}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl text-emerald-400 font-semibold text-sm border border-emerald-400/25 hover:border-emerald-400/50 transition-colors"
                  style={{ background:'rgba(52,211,153,0.06)' }}
                >
                  <Download size={15}/> Download Resume
                </motion.a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
