import { Experience, Project, SkillCategory } from '../types';

export const experiences: Experience[] = [
  {
    role: 'CSA / Technical Specialist',
    company: 'Dice205 Digital Corporation',
    period: '2024 – Present',
    type: 'Full-time',
    description: 'Collaborated with clients, developers, and internal stakeholders to analyze business needs, resolve technical challenges, and deliver scalable software solutions that enhanced user experience and operational performance.',
    responsibilities: [
      'Technical support & software troubleshooting',
      'Client communication & escalation handling',
      'Documentation & knowledge base maintenance',
      'Cross-functional team collaboration',
      'Problem resolution & quality assurance',
    ],
    color: '#22D3EE',
  },
  {
    role: 'Founder & CEO',
    company: 'CoreTek Digital Solutions',
    period: '2025 – Present',
    type: 'Self-employed',
    description: 'Founded and lead a small software development company, driving product strategy, client relationships, and full-stack development from inception to deployment.',
    responsibilities: [
      'Lead software development & architecture',
      'Client discovery & stakeholder management',
      'Project planning & delivery oversight',
      'Team coordination & mentorship',
      'Product strategy & roadmap',
      'Full-stack development (React, Node.js, Laravel)',
    ],
    color: '#3B82F6',
  },
  {
    role: 'Project Manager',
    company: 'Mabizza IT Solutions',
    period: '2023 – 2024',
    type: 'Full-time',
    description: 'Leading agile software delivery for clients using modern project management methodologies, tooling, and stakeholder communication frameworks.',
    responsibilities: [
      'Agile / Scrum project management',
      'Sprint planning & retrospectives',
      'Team leadership & performance tracking',
      'Jira & ClickUp workflow management',
      'Stakeholder reporting & communication',
      'Risk identification & mitigation',
    ],
    color: '#A855F7',
  },
];

export const skillCategories: SkillCategory[] = [
  {
    name: 'Programming',
    icon: '⟨/⟩',
    color: '#3B82F6',
    skills: [
      { name: 'JavaScript', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'Python', level: 80 },
      { name: 'PHP', level: 78 },
    ],
  },
  {
    name: 'Frontend',
    icon: '◻',
    color: '#22D3EE',
    skills: [
      { name: 'React', level: 92 },
      { name: 'Next.js', level: 85 },
      { name: 'HTML / CSS', level: 95 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'Framer Motion', level: 82 },
    ],
  },
  {
    name: 'Backend',
    icon: '⚙',
    color: '#6366F1',
    skills: [
      { name: 'Node.js', level: 82 },
      { name: 'Laravel', level: 85 },
      { name: 'REST APIs', level: 88 },
    ],
  },
  {
    name: 'Database',
    icon: '⬡',
    color: '#A855F7',
    skills: [
      { name: 'SQL', level: 88 },
      { name: 'PostgreSQL', level: 82 },
    ],
  },
  {
    name: 'Data Analytics',
    icon: '▲',
    color: '#F59E0B',
    skills: [
      { name: 'Power BI', level: 90 },
      { name: 'Tableau', level: 80 },
      { name: 'Excel', level: 92 },
      { name: 'Data Visualization', level: 88 },
    ],
  },
  {
    name: 'Tools & Workflow',
    icon: '◈',
    color: '#10B981',
    skills: [
      { name: 'Git & GitHub', level: 90 },
      { name: 'Jira', level: 85 },
      { name: 'ClickUp', level: 82 },
      { name: 'Postman', level: 80 },
      { name: 'Figma', level: 75 },
      { name: 'Slack', level: 88 },
    ],
  },
  {
    name: 'Soft Skills',
    icon: '✦',
    color: '#EC4899',
    skills: [
      { name: 'Leadership', level: 90 },
      { name: 'Communication', level: 92 },
      { name: 'Critical Thinking', level: 88 },
      { name: 'Problem Solving', level: 90 },
      { name: 'Team Collaboration', level: 92 },
    ],
  },
];

export const projects: Project[] = [
  {
    title: 'CoreTek Digital Solutions',
    description: 'A modern business website showcasing software development services with responsive design, elegant animations, and scalable architecture. Built to attract enterprise clients and communicate technical credibility.',
    techs: ['React', 'Tailwind CSS', 'Vite', 'Framer Motion'],
    liveUrl: 'https://coretekdigital.netlify.app',
    githubUrl: 'https://github.com/humphreygevero-dev',
    color: '#3B82F6',
    gradient: 'from-blue-600/20 via-indigo-600/10 to-transparent',
    codeSnippet: {
      filename: 'Hero.tsx',
      lines: [
        'export default function Hero() {',
        '  return (',
        '    <motion.section',
        '      initial={{ opacity: 0 }}',
        '      animate={{ opacity: 1 }}',
        '    >',
        "      <h1>Scalable Software Solutions</h1>",
        '    </motion.section>',
        '  );',
        '}',
      ],
    },
  },
  {
    title: "LJ's Pastil Hub POS",
    description: 'A point-of-sale and kitchen order system built for a local food business — menu-based cart, GCash QR and cash payment flows, order tracking, and an admin/reports view, packaged as an installable PWA.',
    techs: ['React', 'Vite', 'Supabase', 'PWA'],
    githubUrl: 'https://github.com/humphreygevero-dev',
    color: '#F97316',
    gradient: 'from-orange-600/20 via-amber-600/10 to-transparent',
    codeSnippet: {
      filename: 'POS.jsx',
      lines: [
        'const total = cart.reduce(',
        '  (sum, item) => sum + item.price,',
        '  0',
        ');',
        '',
        'function saveOrder(order) {',
        "  const existing = JSON.parse(",
        '    localStorage.getItem("orders")',
        '  ) || [];',
        '  existing.push({ ...order, date: new Date() });',
        '}',
      ],
    },
  },
  {
    title: 'H&J Visuals Photography',
    description: 'A photography studio website for a husband-and-wife team specializing in events, occasions, and portrait sessions across Cagayan de Oro and Northern Mindanao — filterable gallery, service packages, testimonials, and an inquiry form.',
    techs: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    githubUrl: 'https://github.com/humphreygevero-dev',
    color: '#A8823C',
    gradient: 'from-amber-700/20 via-yellow-600/10 to-transparent',
    codeSnippet: {
      filename: 'businessInfo.ts',
      lines: [
        'export const business = {',
        "  name: 'H&J Visuals',",
        "  tagline: 'Real moments, beautifully kept.',",
        "  location: 'Cagayan de Oro, Philippines',",
        '} as const;',
      ],
    },
  },
];

export const stats = [
  { value: '3+', label: 'Years Experience', description: 'Across tech & business', icon: 'calendar', color: '#3B82F6' },
  { value: '10+', label: 'Projects Delivered', description: 'From MVP to production', icon: 'layers', color: '#A855F7' },
  { value: '3', label: 'Roles in Parallel', description: 'Dev, PM & Founder', icon: 'users', color: '#22D3EE' },
  { value: '100%', label: 'Remote Ready', description: 'US, JP & worldwide', icon: 'globe', color: '#10B981' },
];

export const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];
