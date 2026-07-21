import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Globe, Briefcase, Plane, Download } from 'lucide-react';
import { fadeUp, staggerContainer } from '../utils/animations';
import { useTypingEffect } from '../hooks/useTypingEffect';

const badges = [
  { icon: MapPin, text: 'Based in Philippines', color: '#22D3EE' },
  { icon: Globe, text: 'Open to Remote', color: '#3B82F6' },
  { icon: Briefcase, text: 'US Opportunities', color: '#A855F7' },
  { icon: Plane, text: 'Open to Relocation', color: '#6366F1' },
];

const ROLES = [
  'Data Analyst',
  'Software Developer',
  'Project Manager',
  'Founder & CEO',
  'Full-Stack Engineer',
];

// macOS-style tab bar roles
const ROLE_TABS = [
  { label: 'Data Analyst', color: '#22D3EE', dot: '#22D3EE' },
  { label: 'Software Developer', color: '#3B82F6', dot: '#3B82F6' },
  { label: 'Project Manager', color: '#A855F7', dot: '#A855F7' },
];

function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let raf: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.2,
      speed: Math.random() * 0.25 + 0.05,
      alpha: Math.random(),
      dalpha: (Math.random() - 0.5) * 0.015,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        s.alpha = Math.max(0.05, Math.min(1, s.alpha + s.dalpha));
        if (s.alpha <= 0.05 || s.alpha >= 1) s.dalpha *= -1;
        s.y -= s.speed;
        if (s.y < 0) { s.y = canvas.height; s.x = Math.random() * canvas.width; }
        ctx.save();
        ctx.globalAlpha = s.alpha * 0.7;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.shadowColor = '#3B82F6';
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.restore();
      });
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

export default function Hero() {
  const typed = useTypingEffect(ROLES, 75, 35, 2200);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-16 px-4 overflow-hidden"
    >
      <StarField />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        {/* Eyebrow badge */}
        <motion.div variants={fadeUp} className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-semibold tracking-widest uppercase text-primary border border-primary/20">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Available for opportunities
          </span>
        </motion.div>

        {/* Profile avatar — larger with strong glow */}
        <motion.div variants={fadeUp} className="flex justify-center mb-8">
          <motion.div
            className="relative"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Outer glow ring — big and visible */}
            <div
              className="absolute rounded-full"
              style={{
                inset: '-12px',
                background: 'radial-gradient(circle, rgba(59,130,246,0.5) 0%, rgba(168,85,247,0.3) 50%, transparent 70%)',
                filter: 'blur(16px)',
              }}
            />
            {/* Spinning gradient border */}
            <motion.div
              className="absolute rounded-full"
              style={{
                inset: '-3px',
                background: 'conic-gradient(from 0deg, #3B82F6, #A855F7, #22D3EE, #3B82F6)',
                filter: 'blur(2px)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
            {/* Avatar */}
            <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-primary via-indigo to-purple flex items-center justify-center text-3xl font-extrabold text-white shadow-2xl shadow-primary/40 border-2 border-white/10">
              HG
            </div>
            {/* Online dot */}
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-bg border-2 border-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-400/30">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          </motion.div>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={fadeUp}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-5 leading-none"
        >
          <span className="text-white">Hi, I'm </span>
          <span className="gradient-text">Humphrey</span>
          <br />
          <span className="gradient-text">Lionel Gevero</span>
        </motion.h1>

        {/* macOS-style role tab bar */}
        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2 mb-5">
          {ROLE_TABS.map((tab) => (
            <div
              key={tab.label}
              className="flex items-center gap-2 px-4 py-1.5 rounded-lg glass border text-xs font-semibold"
              style={{
                borderColor: tab.color + '35',
                background: tab.color + '10',
              }}
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: tab.color, boxShadow: `0 0 6px ${tab.color}` }}
              />
              <span style={{ color: tab.color }}>{tab.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Typing effect */}
        <motion.div variants={fadeUp} className="h-10 flex items-center justify-center mb-6">
          <span className="text-lg sm:text-xl font-medium text-white/50 tracking-wide">
            Currently:&nbsp;
          </span>
          <span className="text-lg sm:text-xl font-bold text-white tracking-wide">
            {typed}
            <span className="inline-block w-0.5 h-5 bg-primary ml-1 animate-pulse align-middle" />
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          className="max-w-2xl mx-auto text-base sm:text-lg text-white/55 leading-relaxed mb-10 text-balance"
        >
          I build modern web applications, transform complex data into actionable insights,
          and lead technology projects that solve real business challenges. My passion lies
          in combining software engineering, analytics, and thoughtful design to create
          scalable digital solutions that deliver measurable impact.
        </motion.p>

        {/* CTA buttons */}
        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-white font-semibold text-sm shadow-xl shadow-primary/25 hover:bg-primary-light hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-200"
          >
            View Projects
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl glass text-white/80 font-semibold text-sm border border-white/10 hover:border-white/25 hover:text-white hover:-translate-y-0.5 transition-all duration-200"
          >
            Contact Me
          </button>
          <a
            href="/portfolio/resume.pdf"
            download
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl glass text-emerald-400 font-semibold text-sm border border-emerald-400/20 hover:border-emerald-400/50 hover:bg-emerald-400/5 hover:-translate-y-0.5 transition-all duration-200"
          >
            <Download size={16} />
            Resume
          </a>
        </motion.div>

        {/* Status badges */}
        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-3">
          {badges.map((badge) => (
            <div
              key={badge.text}
              className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/6 text-xs font-medium text-white/60"
            >
              <badge.icon size={12} style={{ color: badge.color }} />
              {badge.text}
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-primary to-transparent"
        />
        <span className="text-[10px] tracking-widest uppercase text-white/25">Scroll</span>
      </motion.div>
    </section>
  );
}
