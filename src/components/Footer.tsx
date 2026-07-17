import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const socials = [
  { icon: Github, href: 'https://github.com/humphreygevero-dev', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/humphrey-gevero', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:humphreylionelgevero@gmail.com', label: 'Email' },
];

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative border-t border-card-border py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          {/* Left */}
          <div className="text-center sm:text-left">
            <div className="text-white font-bold text-lg mb-1">Humphrey Lionel Gevero</div>
            <div className="text-white/35 text-sm">
              Data Analyst · Software Developer · Project Manager
            </div>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-xl glass border border-card-border flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5"
              >
                <s.icon size={16} />
              </a>
            ))}
          </div>

          {/* Back to top */}
          <div className="flex items-center gap-4">
            <p className="text-white/25 text-xs">
              © {new Date().getFullYear()} Humphrey Gevero
            </p>
            <button
              onClick={scrollTop}
              className="w-9 h-9 rounded-xl glass border border-card-border flex items-center justify-center text-white/40 hover:text-white hover:border-primary/30 transition-all duration-200 hover:-translate-y-1"
              aria-label="Back to top"
            >
              <ArrowUp size={15} />
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
