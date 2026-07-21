import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Loader2, Minimize2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

// ─── FAQ knowledge base ────────────────────────────────────────────────────
const FAQ: { keywords: string[]; answer: string }[] = [
  {
    keywords: ['service', 'offer', 'do', 'provide', 'help', 'can you'],
    answer: "Humphrey offers **Software Development** (React, Next.js, Laravel, Node.js), **Data Analytics** (Power BI, Tableau, SQL dashboards), and **Project Management** (Agile/Scrum, Jira, ClickUp). He also provides freelance consulting and startup collaboration. Want to book a session? Use the Contact section below! 🚀",
  },
  {
    keywords: ['hire', 'available', 'availability', 'open', 'work', 'job', 'opportunity', 'freelance'],
    answer: "Yes! Humphrey is currently **open to opportunities** including full-time roles, freelance projects, and startup collaborations. He's based in the Philippines and open to remote work, US opportunities, Japan opportunities, and relocation. Reach out via the Contact section or email humphreylionelgevero@gmail.com 📩",
  },
  {
    keywords: ['tech', 'stack', 'technology', 'skill', 'language', 'framework', 'tool', 'use', 'know'],
    answer: "Humphrey's tech stack includes:\n\n**Frontend:** React, Next.js, TypeScript, Tailwind CSS, Framer Motion\n**Backend:** Node.js, Laravel, PHP, REST APIs\n**Database:** PostgreSQL, SQL\n**Data:** Power BI, Tableau, Excel, DAX\n**Tools:** Git, Jira, ClickUp, Figma, Postman\n**Languages:** JavaScript, TypeScript, Python, PHP",
  },
  {
    keywords: ['contact', 'reach', 'email', 'message', 'get in touch', 'talk'],
    answer: "You can reach Humphrey at **humphreylionelgevero@gmail.com** or use the Contact section at the bottom of this page. He typically responds within 24 hours. You can also connect on LinkedIn or check his GitHub at github.com/hamp25 👋",
  },
  {
    keywords: ['experience', 'year', 'background', 'career', 'history', 'work'],
    answer: "Humphrey has **3+ years of experience** across:\n\n• **Founder & CEO** — CoreTek Digital Solutions (2023–Present)\n• **Project Manager** — Mabizza IT Solutions (2023–Present)\n• **Customer Support Associate** — Dice205 Digital Corporation (2021–2022)\n\nHe combines software engineering, data analytics, and project leadership in everything he does.",
  },
  {
    keywords: ['project', 'portfolio', 'built', 'made', 'created', 'example', 'work'],
    answer: "Here are some of Humphrey's featured projects:\n\n🔵 **CoreTek Digital Solutions** — Business website with React, Tailwind, Vite (live at coretekdigital.netlify.app)\n🟣 **SaaS Ordering System** — Multi-role ordering & inventory platform with Laravel + PostgreSQL\n📊 **Data Analytics Dashboard** — Executive Power BI dashboards with KPIs and reports\n\nCheck out the Projects section above for full details!",
  },
  {
    keywords: ['price', 'cost', 'rate', 'charge', 'budget', 'how much'],
    answer: "Humphrey's rates vary depending on the scope and type of project. For an accurate quote, it's best to reach out directly at **humphreylionelgevero@gmail.com** or through the Contact section. He'll get back to you within 24 hours with a tailored proposal! 💼",
  },
  {
    keywords: ['coretek', 'company', 'ceo', 'founder', 'startup'],
    answer: "**CoreTek Digital Solutions** is Humphrey's software company where he serves as Founder & CEO. The company delivers modern web applications, data analytics solutions, and digital products for clients. You can visit the company website at coretekdigital.netlify.app 🏢",
  },
  {
    keywords: ['location', 'based', 'country', 'philippines', 'remote', 'timezone'],
    answer: "Humphrey is based in the **Philippines** (Philippine Standard Time, UTC+8). He's fully set up for remote work and open to opportunities in the US, Japan, and worldwide. He's also available for relocation. 🇵🇭",
  },
  {
    keywords: ['data', 'analytics', 'power bi', 'tableau', 'dashboard', 'visualization'],
    answer: "Data analytics is one of Humphrey's core specialties! He builds interactive dashboards in **Power BI** and **Tableau**, writes complex **SQL** queries, works with Excel, and transforms raw business data into actionable executive insights. His dashboards are used for real-time KPI tracking and business decision-making. 📊",
  },
  {
    keywords: ['hello', 'hi', 'hey', 'good', 'morning', 'afternoon', 'evening', 'sup', 'wassup'],
    answer: "Hey there! 👋 I'm Humphrey's AI assistant. I can tell you all about his skills, experience, services, and how to get in touch. What would you like to know?",
  },
  {
    keywords: ['thank', 'thanks', 'appreciate', 'great', 'awesome', 'nice', 'good job'],
    answer: "You're welcome! 😊 If you have any more questions about Humphrey or want to discuss a project, feel free to ask — or head to the Contact section to reach out directly!",
  },
];

function getSmartReply(userInput: string): string {
  const input = userInput.toLowerCase();

  // Score each FAQ by how many keywords match
  let bestMatch = { score: 0, answer: '' };

  for (const faq of FAQ) {
    const score = faq.keywords.filter((kw) => input.includes(kw)).length;
    if (score > bestMatch.score) {
      bestMatch = { score, answer: faq.answer };
    }
  }

  if (bestMatch.score >= 1) return bestMatch.answer;

  // Fallback
  return "That's a great question! I may not have the exact answer, but you can reach Humphrey directly at **humphreylionelgevero@gmail.com** — he'll personally respond within 24 hours. Alternatively, scroll down to the Contact section to send him a message! 😊";
}

// Simple markdown bold renderer
function renderMarkdown(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1
      ? <strong key={i} className="text-white font-semibold">{part}</strong>
      : <span key={i}>{part}</span>
  );
}

function MessageBubble({ content }: { content: string }) {
  return (
    <div className="leading-relaxed">
      {content.split('\n').map((line, i) => (
        <div key={i} className={line === '' ? 'mt-2' : ''}>
          {renderMarkdown(line)}
        </div>
      ))}
    </div>
  );
}

const QUICK_REPLIES = [
  "What services does Humphrey offer?",
  "Is he available for hire?",
  "What tech stack does he use?",
  "How can I contact him?",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: "👋 Hi! I'm Humphrey's AI assistant. Ask me anything about his skills, experience, services, or availability!",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    setInput('');

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content };
    setMessages((m) => [...m, userMsg]);
    setLoading(true);

    // Simulate natural typing delay (600–1200ms)
    const delay = 600 + Math.random() * 600;
    await new Promise((r) => setTimeout(r, delay));

    const reply = getSmartReply(content);
    setMessages((m) => [...m, { id: Date.now().toString() + '1', role: 'assistant', content: reply }]);
    setLoading(false);
  };

  const showQuickReplies = messages.length <= 1;

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-[999] w-14 h-14 rounded-full bg-primary shadow-2xl shadow-primary/40 flex items-center justify-center text-white hover:bg-primary-light transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 3, type: 'spring', stiffness: 300 }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle size={22} />
            </motion.div>
          )}
        </AnimatePresence>
        {unread > 0 && !open && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 text-black text-xs font-bold flex items-center justify-center"
          >
            {unread}
          </motion.div>
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            className="fixed bottom-24 right-6 z-[998] w-[360px] max-w-[calc(100vw-3rem)] rounded-2xl overflow-hidden shadow-2xl shadow-black/60"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary/90 to-indigo/90 backdrop-blur-xl px-4 py-3.5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                <Bot size={18} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-semibold text-sm">Humphrey's Assistant</div>
                <div className="flex items-center gap-1.5 text-white/60 text-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online · Ask me anything
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/50 hover:text-white transition-colors">
                <Minimize2 size={16} />
              </button>
            </div>

            {/* Messages */}
            <div
              className="h-80 overflow-y-auto px-4 py-4 space-y-4 bg-[#0d0d10]"
              style={{ scrollbarWidth: 'thin', scrollbarColor: '#3B82F6 transparent' }}
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      msg.role === 'assistant' ? 'bg-primary/20 text-primary' : 'bg-white/10 text-white/70'
                    }`}
                  >
                    {msg.role === 'assistant' ? <Bot size={14} /> : <User size={14} />}
                  </div>
                  <div
                    className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm ${
                      msg.role === 'assistant'
                        ? 'bg-white/6 text-white/80 rounded-tl-sm border border-white/6'
                        : 'bg-primary text-white rounded-tr-sm shadow-lg shadow-primary/20'
                    }`}
                  >
                    {msg.role === 'assistant'
                      ? <MessageBubble content={msg.content} />
                      : msg.content
                    }
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                    <Bot size={14} />
                  </div>
                  <div className="bg-white/6 border border-white/6 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-white/40"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick replies */}
            {showQuickReplies && (
              <div className="px-3 py-2 bg-[#0d0d10] flex flex-wrap gap-1.5 border-t border-white/4">
                {QUICK_REPLIES.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="px-3 py-1.5 rounded-xl text-xs text-primary border border-primary/25 hover:bg-primary/10 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="bg-[#111113] border-t border-white/6 px-3 py-3 flex gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1 bg-white/5 border border-white/8 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-primary/40 transition-colors"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || loading}
                className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary-light transition-colors flex-shrink-0"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={15} />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
