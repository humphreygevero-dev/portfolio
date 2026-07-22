import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Globe, Briefcase, Plane, Download } from 'lucide-react';
import { fadeUp, staggerContainer } from '../utils/animations';

const badges = [
  { icon:MapPin,    text:'Philippines',  color:'#22D3EE' },
  { icon:Globe,     text:'Remote Ready', color:'#3B82F6' },
  { icon:Briefcase, text:'US / JP Open', color:'#A855F7' },
  { icon:Plane,     text:'Relocatable',  color:'#6366F1' },
];

const ROLE_TABS = [
  { label:'Data Analyst',       color:'#22D3EE' },
  { label:'Software Developer', color:'#3B82F6' },
  { label:'Project Manager',    color:'#A855F7' },
];

const SQL_QUERIES = [
  "SELECT * FROM opportunities WHERE status = 'open';",
  "SELECT skill, level FROM humphrey ORDER BY level DESC;",
  "INSERT INTO projects (name, stack) VALUES ('SaaS', 'React, Laravel');",
  "SELECT COUNT(*) FROM experience WHERE years >= 3;",
  "UPDATE humphrey SET availability = 'open_to_work';",
  "SELECT * FROM skills WHERE category = 'Data Analytics';",
  "SELECT client, rating FROM projects WHERE rating = 5;",
  "SELECT * FROM humphrey WHERE open_to_remote = true;",
  "CREATE TABLE solutions AS SELECT * FROM problems WHERE solved = true;",
  "SELECT tech FROM stack WHERE type IN ('frontend', 'backend');",
  "SELECT impact FROM projects ORDER BY impact DESC;",
  "UPDATE skills SET level = 'expert' WHERE years_used >= 2;",
  "SELECT dream_role FROM humphrey WHERE passion = 'technology';",
  "SELECT * FROM certifications WHERE year >= 2023;",
  "SELECT salary FROM market WHERE role = 'senior_engineer';",
];

function StarField() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!; const ctx = c.getContext('2d')!; let raf: number;
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    resize(); window.addEventListener('resize', resize);
    const stars = Array.from({length:80}, () => ({
      x: Math.random()*c.width, y: Math.random()*c.height,
      r: Math.random()*1.1+0.2, s: Math.random()*0.18+0.04,
      a: Math.random(), da: (Math.random()-0.5)*0.01,
    }));
    const draw = () => {
      ctx.clearRect(0,0,c.width,c.height);
      for (const s of stars) {
        s.a = Math.max(0.05, Math.min(0.9, s.a+s.da));
        if (s.a<=0.05||s.a>=0.9) s.da *= -1;
        s.y -= s.s; if (s.y<0) { s.y=c.height; s.x=Math.random()*c.width; }
        ctx.save(); ctx.globalAlpha=s.a*0.55;
        ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
        ctx.fillStyle='#fff'; ctx.shadowColor='#60A5FA'; ctx.shadowBlur=5;
        ctx.fill(); ctx.restore();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize',resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none"/>;
}

function SqlTerminal() {
  const [qi, setQi]       = useState(0);
  const [text, setText]   = useState('');
  const [typing, setT]    = useState(true);
  const [blink, setBlink] = useState(true);

  useEffect(() => { const t = setInterval(() => setBlink(b=>!b), 530); return () => clearInterval(t); }, []);
  useEffect(() => {
    const q = SQL_QUERIES[qi];
    if (typing) {
      if (text.length < q.length) {
        const t = setTimeout(() => setText(q.slice(0, text.length+1)), 34);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setT(false), 2000);
        return () => clearTimeout(t);
      }
    } else {
      if (text.length > 0) {
        const t = setTimeout(() => setText(s => s.slice(0,-1)), 13);
        return () => clearTimeout(t);
      } else { setQi(i => (i+1)%SQL_QUERIES.length); setT(true); }
    }
  }, [text, typing, qi]);

  const hl = (s: string) => {
    const KW = ['SELECT','FROM','WHERE','INSERT','INTO','VALUES','UPDATE','SET',
                 'JOIN','ON','ORDER','BY','DESC','CREATE','TABLE','AS','IN','COUNT','AND','true','false'];
    const out: {t:string;c:string}[] = []; let r = s;
    while (r.length > 0) {
      const str = r.match(/^('[^']*'?)/);
      if (str) { out.push({t:str[1],c:'#34D399'}); r=r.slice(str[1].length); continue; }
      const num = r.match(/^(\d+)/);
      if (num) { out.push({t:num[1],c:'#FBBF24'}); r=r.slice(num[1].length); continue; }
      const kw = KW.find(k => r.toUpperCase().startsWith(k) && (r.length===k.length||/\W/.test(r[k.length])));
      if (kw) { out.push({t:r.slice(0,kw.length),c:'#60A5FA'}); r=r.slice(kw.length); continue; }
      const op = r.match(/^([=,*();])/);
      if (op) { out.push({t:op[1],c:'#C084FC'}); r=r.slice(1); continue; }
      const pl = r.match(/^([^\s'0-9=,*();]+)/);
      if (pl) { out.push({t:pl[1],c:'#E2E8F0'}); r=r.slice(pl[1].length); continue; }
      out.push({t:r[0],c:'#E2E8F0'}); r=r.slice(1);
    }
    return out.map((tk,i) => <span key={i} style={{color:tk.c}}>{tk.t}</span>);
  };

  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-2xl shadow-black/50"
      style={{border:'1px solid rgba(255,255,255,0.08)', background:'rgba(10,10,18,0.9)', backdropFilter:'blur(20px)'}}>
      {/* macOS title bar */}
      <div className="flex items-center gap-2 px-3 py-2.5"
        style={{background:'rgba(20,20,32,0.9)', borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57] shadow-sm shadow-red-500/50"/>
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] shadow-sm shadow-yellow-500/50"/>
          <div className="w-2.5 h-2.5 rounded-full bg-[#28C840] shadow-sm shadow-green-500/50"/>
        </div>
        <span className="flex-1 text-center text-[10px] text-white/20 font-mono tracking-wider truncate">
          humphrey.sql — query_engine v2.0
        </span>
      </div>
      {/* Terminal body */}
      <div className="px-3 sm:px-4 py-3">
        <div className="flex items-start gap-2 font-mono text-[11px] sm:text-sm leading-relaxed">
          <span className="text-[#C084FC] flex-shrink-0 mt-0.5 font-bold">❯</span>
          <span className="break-all flex-1 text-left">
            {hl(text)}
            <span className="inline-block w-[2px] h-[12px] sm:h-[14px] align-middle ml-0.5 rounded-sm"
              style={{background:'#60A5FA', opacity:blink?1:0, transition:'opacity 0.08s'}}/>
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const [imgErr, setImgErr] = useState(false);

  return (
    <section id="home"
      className="relative min-h-screen w-full flex flex-col items-center justify-center pt-20 pb-16 overflow-hidden"
    >
      <StarField/>

      {/* Ambient glow behind avatar */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full pointer-events-none"
        style={{background:'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)', filter:'blur(40px)'}}/>

      <motion.div
        variants={staggerContainer} initial="hidden" animate="visible"
        className="relative z-10 w-full max-w-2xl mx-auto text-center px-5 sm:px-6"
      >
        {/* Available badge */}
        <motion.div variants={fadeUp} className="mb-7">
          <motion.span
            animate={{ boxShadow:['0 0 0 0 rgba(59,130,246,0.4)','0 0 0 8px rgba(59,130,246,0)','0 0 0 0 rgba(59,130,246,0)'] }}
            transition={{ duration:2.5, repeat:Infinity }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass text-[10px] sm:text-xs font-bold tracking-widest uppercase text-primary"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0"/>
            Available for opportunities
          </motion.span>
        </motion.div>

        {/* Profile photo */}
        <motion.div variants={fadeUp} className="flex justify-center mb-7">
          <motion.div className="relative"
            animate={{ y:[0,-8,0] }}
            transition={{ duration:4, repeat:Infinity, ease:'easeInOut' }}
          >
            {/* Outer glow */}
            <div className="absolute rounded-full pointer-events-none"
              style={{ inset:'-20px',
                background:'radial-gradient(circle, rgba(59,130,246,0.4) 0%, rgba(168,85,247,0.2) 60%, transparent 75%)',
                filter:'blur(20px)' }}/>
            {/* Spinning ring */}
            <motion.div className="absolute rounded-full pointer-events-none"
              style={{ inset:'-4px',
                background:'conic-gradient(from 0deg, #3B82F6 0%, #A855F7 33%, #22D3EE 66%, #3B82F6 100%)',
                filter:'blur(2px)', opacity:0.8 }}
              animate={{ rotate:360 }}
              transition={{ duration:5, repeat:Infinity, ease:'linear' }}/>
            {/* Inner white ring */}
            <div className="absolute rounded-full" style={{ inset:'-2px', background:'rgba(9,9,11,0.5)' }}/>

            {!imgErr ? (
              <motion.img
                src="/portfolio/profile-photo.jpg"
                alt="Humphrey Lionel Gevero"
                onError={() => setImgErr(true)}
                className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover shadow-2xl"
                style={{ border:'2px solid rgba(255,255,255,0.12)' }}
                whileHover={{ scale:1.04 }}
                transition={{ type:'spring', stiffness:300 }}
              />
            ) : (
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center text-2xl sm:text-3xl font-black text-white shadow-2xl"
                style={{ background:'linear-gradient(135deg, #3B82F6, #6366F1, #A855F7)', border:'2px solid rgba(255,255,255,0.12)' }}>
                HG
              </div>
            )}
            {/* Online indicator */}
            <div className="absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full flex items-center justify-center"
              style={{ background:'#09090B', border:'2px solid #09090B' }}>
              <div className="w-4 h-4 rounded-full flex items-center justify-center"
                style={{ background:'rgba(52,211,153,0.2)', border:'1px solid rgba(52,211,153,0.5)' }}>
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Name */}
        <motion.h1 variants={fadeUp}
          className="text-[2.4rem] sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.02] mb-5"
        >
          <span className="text-white/90">Hi, I'm </span>
          <span className="gradient-text">Humphrey</span>
          <br/>
          <span className="gradient-text">Lionel Gevero</span>
        </motion.h1>

        {/* Role pills */}
        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2 mb-4">
          {ROLE_TABS.map(tab => (
            <motion.div key={tab.label}
              whileHover={{ scale:1.05, y:-1 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold cursor-default"
              style={{
                background: tab.color+'12',
                border:`1px solid ${tab.color}35`,
                backdropFilter:'blur(16px)',
                WebkitBackdropFilter:'blur(16px)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full"
                style={{ background:tab.color, boxShadow:`0 0 8px ${tab.color}` }}/>
              <span style={{ color:tab.color }}>{tab.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* SQL Terminal */}
        <motion.div variants={fadeUp} className="mb-6">
          <SqlTerminal/>
        </motion.div>

        {/* Description */}
        <motion.p variants={fadeUp}
          className="text-sm sm:text-base text-white/45 leading-relaxed mb-8 max-w-lg mx-auto"
        >
          I build modern web applications, transform complex data into actionable insights,
          and lead technology projects that solve real business challenges — combining
          engineering, analytics, and design to deliver measurable impact.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-center gap-3 mb-8">
          <motion.button
            onClick={() => document.querySelector('#projects')?.scrollIntoView({behavior:'smooth'})}
            whileHover={{ scale:1.03, y:-2 }}
            whileTap={{ scale:0.97 }}
            className="group flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-white font-bold text-sm shadow-xl shimmer-border"
            style={{ background:'linear-gradient(135deg, #3B82F6, #6366F1)', boxShadow:'0 8px 24px rgba(59,130,246,0.3)' }}
          >
            View Projects <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform"/>
          </motion.button>
          <motion.button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({behavior:'smooth'})}
            whileHover={{ scale:1.03, y:-2 }}
            whileTap={{ scale:0.97 }}
            className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl liquid-glass text-white/75 font-semibold text-sm hover:text-white transition-colors"
          >
            Contact Me
          </motion.button>
          <motion.a
            href="/portfolio/resume.pdf" download
            whileHover={{ scale:1.03, y:-2 }}
            whileTap={{ scale:0.97 }}
            className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-emerald-400 font-semibold text-sm transition-all"
            style={{ background:'rgba(52,211,153,0.06)', border:'1px solid rgba(52,211,153,0.25)', backdropFilter:'blur(16px)' }}
          >
            <Download size={15}/> Resume
          </motion.a>
        </motion.div>

        {/* Status badges */}
        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2">
          {badges.map(b => (
            <div key={b.text}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-medium text-white/45"
              style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)', backdropFilter:'blur(12px)' }}
            >
              <b.icon size={10} style={{color:b.color}}/>
              {b.text}
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2.5}}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div animate={{y:[0,8,0]}} transition={{duration:1.5,repeat:Infinity,ease:'easeInOut'}}
          className="w-px h-8 bg-gradient-to-b from-primary to-transparent"/>
        <span className="text-[9px] tracking-widest uppercase text-white/20">Scroll</span>
      </motion.div>
    </section>
  );
}
