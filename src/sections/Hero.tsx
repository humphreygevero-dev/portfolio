import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Globe, Briefcase, Plane } from 'lucide-react';
import { fadeUp, staggerContainer } from '../utils/animations';
import TypingSQL from '../components/TypingSQL';

const techIcons = ['⚛️', '🐍', '📊', '⚡', '🗄️', '🎯', '🔷', '📐'];

const badges = [
  { icon: MapPin, text: 'Based in Philippines', color: '#22D3EE' },
  { icon: Globe, text: 'Open to Remote', color: '#3B82F6' },
  { icon: Briefcase, text: 'US, Japan & Canada Opportunities', color: '#A855F7' },
  { icon: Plane, text: 'Open to Relocation', color: '#6366F1' },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-24 px-4 overflow-hidden"
    >
      {/* Floating tech icons */}
      {techIcons.map((icon, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl select-none pointer-events-none"
          style={{
            top: `${10 + ((i * 11) % 75)}%`,
            left: `${5 + ((i * 13) % 85)}%`,
          }}
          animate={{
            y: [0, -15, 0, 10, 0],
            x: [0, 8, -5, 10, 0],
            rotate: [0, 10, -5, 8, 0],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 6 + i * 1.2,
            delay: i * 0.4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {icon}
        </motion.div>
      ))}

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        {/* Eyebrow */}
        <motion.div variants={fadeUp} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-semibold tracking-widest uppercase text-primary border border-primary/20">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Available for opportunities
          </span>
        </motion.div>

        {/* Profile avatar */}
        <motion.div variants={fadeUp} className="flex justify-center mb-8">
          <motion.div
            className="relative"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-purple to-cyan opacity-40 blur-xl scale-110" />
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 shadow-2xl shadow-primary/30">
              <img
                src={`${import.meta.env.BASE_URL}profile-photo.jpg`}
                alt="Profile photo"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Status dot */}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-bg border-2 border-emerald-400 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          </motion.div>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={fadeUp}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 leading-none"
        >
          <span className="text-white">Hi, I'm </span>
          <span className="gradient-text">Humphrey</span>
          <br />
          <span className="gradient-text">Lionel Gevero</span>
        </motion.h1>

        {/* Typing SQL queries */}
        <motion.div variants={fadeUp} className="flex justify-center mb-6">
          <TypingSQL />
        </motion.div>

        {/* Roles */}
        <motion.p
          variants={fadeUp}
          className="text-lg sm:text-xl text-white/40 font-medium tracking-widest uppercase mb-6"
        >
          Data Analyst &nbsp;·&nbsp; Software Engineer &nbsp;·&nbsp; Project Manager
        </motion.p>

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
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
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
        </motion.div>

        {/* Status badges */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-3"
        >
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
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
