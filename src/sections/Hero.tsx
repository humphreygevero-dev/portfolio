import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Globe, Briefcase, Plane, Download } from 'lucide-react';
import { fadeUp, staggerContainer } from '../utils/animations';

const badges = [
  { icon: MapPin, text: 'Based in Philippines', color: '#22D3EE' },
  { icon: Globe, text: 'Open to Remote', color: '#3B82F6' },
  { icon: Briefcase, text: 'US Opportunities', color: '#A855F7' },
  { icon: Plane, text: 'Open to Relocation', color: '#6366F1' },
];

const ROLE_TABS = [
  { label: 'Data Analyst',       color: '#22D3EE' },
  { label: 'Software Developer', color: '#3B82F6' },
  { label: 'Project Manager',    color: '#A855F7' },
];

const SQL_QUERIES = [
  "SELECT * FROM opportunities WHERE status = 'open';",
  "SELECT skill, level FROM humphrey ORDER BY level DESC;",
  "INSERT INTO projects (name, stack) VALUES ('SaaS App', 'React, Laravel');",
  "SELECT COUNT(*) FROM experience WHERE years >= 3;",
  "UPDATE humphrey SET availability = 'open_to_work' WHERE id = 1;",
  "SELECT * FROM skills WHERE category = 'Data Analytics';",
  "SELECT client, satisfaction FROM projects WHERE rating = 5;",
  "JOIN experience ON humphrey.id = experience.dev_id WHERE role = 'CEO';",
  "SELECT * FROM certifications WHERE year >= 2023;",
  "SELECT tech FROM stack WHERE type IN ('frontend', 'backend');",
  "CREATE TABLE solutions AS SELECT * FROM problems WHERE solved = true;",
  "SELECT * FROM humphrey WHERE open_to_remote = true AND relocate = true;",
  "SELECT impact FROM projects WHERE delivered = true ORDER BY impact DESC;",
  "UPDATE skills SET level = 'expert' WHERE years_used >= 2;",
  "SELECT dream_role FROM humphrey WHERE passion = 'technology';",
];

function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let raf: number;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.2, speed: Math.random() * 0.25 + 0.05,
      alpha: Math.random(), dalpha: (Math.random() - 0.5) * 0.015,
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

function SqlTerminal() {
  const [queryIndex, setQueryIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  // Cursor blink
  useEffect(() => {
    const t = setInterval(() => setShowCursor(c => !c), 530);
    return () => clearInterval(t);
  }, []);

  // Typing effect
  useEffect(() => {
    const query = SQL_QUERIES[queryIndex];
    if (isTyping) {
      if (displayed.length < query.length) {
        const t = setTimeout(() => setDisplayed(query.slice(0, displayed.length + 1)), 38);
        return () => clearTimeout(t);
      } else {
        // Finished typing — pause then delete
        const t = setTimeout(() => setIsTyping(false), 1800);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(d => d.slice(0, -1)), 18);
        return () => clearTimeout(t);
      } else {
        // Move to next query
        setQueryIndex(i => (i + 1) % SQL_QUERIES.length);
        setIsTyping(true);
      }
    }
  }, [displayed, isTyping, queryIndex]);

  // Syntax highlight
  const highlight = (text: string) => {
    const keywords = ['SELECT', 'FROM', 'WHERE', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'JOIN', 'ON', 'ORDER', 'BY', 'DESC', 'CREATE', 'TABLE', 'AS', 'IN', 'COUNT', 'AND'];
    const parts: { text: string; type: 'keyword' | 'string' | 'number' | 'plain' | 'operator' }[] = [];
    let remaining = text;

    while (remaining.length > 0) {
      // String literals
      const strMatch = remaining.match(/^('[^']*'?)/);
      if (strMatch) {
        parts.push({ text: strMatch[1], type: 'string' });
        remaining = remaining.slice(strMatch[1].length);
        continue;
      }
      // Numbers
      const numMatch = remaining.match(/^(\d+)/);
      if (numMatch) {
        parts.push({ text: numMatch[1], type: 'number' });
        remaining = remaining.slice(numMatch[1].length);
        continue;
      }
      // Keywords
      const kwMatch = keywords.find(kw => remaining.toUpperCase().startsWith(kw) && (remaining.length === kw.length || /\W/.test(remaining[kw.length])));
      if (kwMatch) {
        parts.push({ text: remaining.slice(0, kwMatch.length), type: 'keyword' });
        remaining = remaining.slice(kwMatch.length);
        continue;
      }
      // Operators & special chars
      const opMatch = remaining.match(/^([=,*();])/);
      if (opMatch) {
        parts.push({ text: opMatch[1], type: 'operator' });
        remaining = remaining.slice(1);
        continue;
      }
      // Plain
      const plain = remaining.match(/^([^\s'0-9=,*();A-Z]+|[A-Z][a-zA-Z0-9_]*)/i);
      if (plain) {
        parts.push({ text: plain[1], type: 'plain' });
        remaining = remaining.slice(plain[1].length);
      } else {
        parts.push({ text: remaining[0], type: 'plain' });
        remaining = remaining.slice(1);
      }
    }

    return parts.map((p, i) => {
      const colors: Record<string, string> = {
        keyword:  '#60A5FA', // blue
        string:   '#34D399', // green
        number:   '#F59E0B', // amber
        operator: '#A78BFA', // purple
        plain:    '#E2E8F0', // white
      };
      return <span key={i} style={{ color: colors[p.type] }}>{p.text}</span>;
    });
  };

  return (
    <div
      className="w-full max-w-xl mx-auto rounded-xl overflow-hidden shadow-2xl shadow-black/60"
      style={{ border: '1px solid rgba(255,255,255,0.08)' }}
    >
      {/* macOS title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#1e1e2e]" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        </div>
        <span className="flex-1 text-center text-xs text-white/30 font-medium tracking-wide">
          humphrey.sql — query_engine
        </span>
      </div>

      {/* Terminal body */}
      <div className="bg-[#13131a] px-5 py-4 min-h-[56px] flex items-center">
        <span className="text-[#A855F7] font-mono text-sm mr-2 select-none">❯</span>
        <span className="font-mono text-sm tracking-wide flex-1 text-left">
          {highlight(displayed)}
          <span
            className="inline-block w-[2px] h-4 align-middle ml-0.5"
            style={{
              background: '#60A5FA',
              opacity: showCursor ? 1 : 0,
              transition: 'opacity 0.1s',
            }}
          />
        </span>
      </div>
    </div>
  );
}

export default function Hero() {
  const [imgError, setImgError] = useState(false);

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
        {/* Eyebrow */}
        <motion.div variants={fadeUp} className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-semibold tracking-widest uppercase text-primary border border-primary/20">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Available for opportunities
          </span>
        </motion.div>

        {/* Profile photo */}
        <motion.div variants={fadeUp} className="flex justify-center mb-8">
          <motion.div
            className="relative"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Outer glow */}
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                inset: '-16px',
                background: 'radial-gradient(circle, rgba(59,130,246,0.45) 0%, rgba(168,85,247,0.25) 50%, transparent 70%)',
                filter: 'blur(18px)',
              }}
            />
            {/* Spinning conic border */}
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{
                inset: '-3px',
                background: 'conic-gradient(from 0deg, #3B82F6, #A855F7, #22D3EE, #3B82F6)',
                filter: 'blur(1px)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
            {/* Photo or fallback */}
            {!imgError ? (
              <img
                src="/portfolio/profile-photo.jpg"
                alt="Humphrey Lionel Gevero"
                onError={() => setImgError(true)}
                className="relative w-28 h-28 rounded-full object-cover border-2 border-white/10 shadow-2xl shadow-primary/40"
              />
            ) : (
              <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-primary via-indigo to-purple flex items-center justify-center text-3xl font-extrabold text-white border-2 border-white/10 shadow-2xl shadow-primary/40">
                HG
              </div>
            )}
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

        {/* macOS role tab pills */}
        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2 mb-5">
          {ROLE_TABS.map((tab) => (
            <div
              key={tab.label}
              className="flex items-center gap-2 px-4 py-1.5 rounded-lg glass border text-xs font-semibold"
              style={{ borderColor: tab.color + '35', background: tab.color + '10' }}
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: tab.color, boxShadow: `0 0 6px ${tab.color}` }}
              />
              <span style={{ color: tab.color }}>{tab.label}</span>
            </div>
          ))}
        </motion.div>

        {/* SQL Terminal */}
        <motion.div variants={fadeUp} className="mb-8 px-2">
          <SqlTerminal />
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
