import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, MouseEvent } from 'react';
import { ExternalLink, Github, Layers } from 'lucide-react';
import { projects } from '../utils/data';
import { Project } from '../types';
import { fadeUp, cardVariant, staggerContainer, viewportConfig } from '../utils/animations';

function TiltCard({ project, children }: { project: Project; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });
  const glowX = useTransform(x, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(y, [-0.5, 0.5], [0, 100]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current!.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariant}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
      className="relative glass rounded-2xl border border-card-border overflow-hidden group cursor-default"
      whileHover={{ borderColor: `${project.color}35`, boxShadow: `0 25px 60px rgba(0,0,0,0.5), 0 0 40px ${project.color}15` }}
    >
      {/* Dynamic glow follow */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, ${project.color}18 0%, transparent 60%)`
          ),
        }}
      />
      {children}
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-32 px-4">
      {/* Ambient */}
      <div
        className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(59,130,246,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Label */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex flex-col items-center text-center mb-20"
        >
          <span className="section-label mb-4">Selected Work</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Featured Projects
          </h2>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        </motion.div>

        {/* Projects grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <TiltCard key={project.title} project={project}>
              {/* Thumbnail */}
              <div className={`relative h-44 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    background: `radial-gradient(circle at 30% 70%, ${project.color}60 0%, transparent 60%)`,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10 backdrop-blur-sm"
                    style={{ background: project.color + '20' }}
                  >
                    <Layers size={28} style={{ color: project.color }} />
                  </div>
                </div>
                {/* Shimmer on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, transparent 30%, ${project.color}08 50%, transparent 70%)`,
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-primary-light transition-colors">
                  {project.title}
                </h3>
                <p className="text-white/45 text-sm leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Tech badges */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.techs.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md text-xs font-medium border"
                      style={{
                        background: project.color + '10',
                        borderColor: project.color + '25',
                        color: project.color + 'BB',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
                      style={{ background: project.color, boxShadow: `0 4px 12px ${project.color}30` }}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ExternalLink size={12} />
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white/70 glass border border-white/10 hover:text-white hover:border-white/25 transition-all duration-200"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Github size={12} />
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </TiltCard>
          ))}
        </motion.div>

        {/* More projects CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/hamp25"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-white/10 text-white/60 text-sm font-semibold hover:text-white hover:border-white/25 transition-all duration-200"
          >
            <Github size={16} />
            View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
