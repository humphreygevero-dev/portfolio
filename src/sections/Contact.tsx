import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Mail, Github, Linkedin, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { fadeUp, fadeLeft, fadeRight, staggerContainer, viewportConfig } from '../utils/animations';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const contactCards = [
  {
    icon: Mail,
    label: 'Email',
    value: 'humphreygevero25@gmail.com',
    href: 'mailto:humphreygevero25@gmail.com',
    color: '#3B82F6',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/humphrey-gevero',
    href: 'https://www.linkedin.com/in/humphrey-lionel-gevero-5a067b298/',
    color: '#22D3EE',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/hamp25',
    href: 'https://github.com/humphreygevero-dev',
    color: '#A855F7',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Philippines · Remote Worldwide',
    href: '#',
    color: '#6366F1',
  },
];

export default function Contact() {
  const [form, setForm] = useState<FormData>({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = (): boolean => {
    const e: Partial<FormData> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.message.trim()) e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
        },
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
      );
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('EmailJS send failed:', err);
      setStatus('error');
    }
  };

  const field = (
    id: keyof FormData,
    label: string,
    type: string = 'text',
    textarea = false
  ) => (
    <div>
      <label className="block text-xs font-semibold text-white/50 uppercase tracking-widest mb-2">
        {label}
      </label>
      {textarea ? (
        <textarea
          value={form[id]}
          onChange={(e) => setForm((f) => ({ ...f, [id]: e.target.value }))}
          rows={5}
          className={`w-full glass rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 border outline-none resize-none transition-all duration-200 focus:border-primary/50 focus:shadow-lg focus:shadow-primary/5 ${
            errors[id] ? 'border-red-500/50' : 'border-card-border'
          }`}
          placeholder={`Your ${label.toLowerCase()}...`}
        />
      ) : (
        <input
          type={type}
          value={form[id]}
          onChange={(e) => setForm((f) => ({ ...f, [id]: e.target.value }))}
          className={`w-full glass rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 border outline-none transition-all duration-200 focus:border-primary/50 focus:shadow-lg focus:shadow-primary/5 ${
            errors[id] ? 'border-red-500/50' : 'border-card-border'
          }`}
          placeholder={`Your ${label.toLowerCase()}...`}
        />
      )}
      {errors[id] && (
        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
          <AlertCircle size={11} /> {errors[id]}
        </p>
      )}
    </div>
  );

  return (
    <section id="contact" className="relative py-32 px-4">
      <div
        className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(168,85,247,0.05) 0%, transparent 70%)',
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
          <span className="section-label mb-4">Get In Touch</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Let's Build Something
            <br />
            <span className="gradient-text">Amazing Together</span>
          </h2>
          <p className="mt-4 max-w-xl text-white/45 text-balance">
            I'm always open to discussing software development, data analytics, project management,
            freelance work, startup collaborations, and exciting career opportunities.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="space-y-4"
          >
            {contactCards.map((card) => (
              <motion.a
                key={card.label}
                href={card.href}
                target={card.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                variants={fadeLeft}
                className="flex items-center gap-4 glass glass-hover rounded-2xl p-5 border border-card-border group"
                whileHover={{ x: 4 }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: card.color + '18' }}
                >
                  <card.icon size={20} style={{ color: card.color }} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white/35 uppercase tracking-widest mb-0.5">
                    {card.label}
                  </div>
                  <div className="text-white/75 text-sm font-medium group-hover:text-white transition-colors">
                    {card.value}
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {status === 'success' ? (
              <div className="glass rounded-2xl border border-emerald-500/20 p-10 text-center flex flex-col items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/15 flex items-center justify-center">
                  <CheckCircle size={28} className="text-emerald-400" />
                </div>
                <h3 className="text-white font-bold text-xl">Message Sent!</h3>
                <p className="text-white/50 text-sm">
                  Thanks for reaching out — I'll get back to you soon.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-2 px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-light transition-colors"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-2xl border border-card-border p-6 sm:p-8 space-y-5" noValidate>
                {status === 'error' && (
                  <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    <AlertCircle size={16} className="shrink-0" />
                    Something went wrong sending your message. Please try again, or email me
                    directly at humphreygevero25@gmail.com.
                  </div>
                )}
                <div className="grid sm:grid-cols-2 gap-5">
                  {field('name', 'Name')}
                  {field('email', 'Email', 'email')}
                </div>
                {field('subject', 'Subject')}
                {field('message', 'Message', 'text', true)}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-white font-semibold text-sm shadow-xl shadow-primary/20 hover:bg-primary-light hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 transition-all duration-200"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      <Send size={15} /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
