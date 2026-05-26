import React, { useState, useEffect, useRef } from 'react';
import FlowArt, { FlowSection } from '../components/ui/story-scroll.tsx';
import {
  Mail,
  ExternalLink,
  Code2,
  BrainCircuit,
  Monitor,
  X,
  Eye,
} from 'lucide-react';
import heroImg from '../assets/hero.png';

// GitHub icon — removed from lucide-react; using the official mark SVG instead
const GithubIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

// LinkedIn icon — removed from lucide-react; using the official mark SVG instead
const LinkedinIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

// ─────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────

const projects = [
  {
    id: 1,
    shortTitle: 'Portfolio',
    title: 'Portfolio Website',
    description:
      'A fast, recruiter-focused portfolio that turns identity, proof, and potential into a scannable story.',
    tech: ['React', 'Vite', 'Tailwind', 'Framer Motion', 'GSAP'],
    github: 'https://github.com/ronitmexson2924/ronit-mexson',
    live: 'https://ronitmexson.netlify.app',
    accent: '#FD5201',
  },
  {
    id: 2,
    shortTitle: 'LearnOpto',
    title: 'LearnOpto',
    description:
      'A platform where a learner can find the optimum resources for his/her study needs. The outputs are totally unbiased.',
    tech: ['React', 'Node', 'AI/ML', 'Data Analysis', 'API'],
    github: 'https://github.com/ronitmexson2924/LearnOpto',
    live: 'https://learn-quest-hub-41.lovable.app',
    accent: '#34d399',
  },
  {
    id: 3,
    shortTitle: 'Algo Viz',
    title: 'Algorithm Visualizer',
    description:
      'An interactive visual tool that makes algorithmic thinking easier to understand and explain.',
    tech: ['JavaScript', 'React', 'Data Structures', 'Animation'],
    github: 'https://github.com/ronitmexson2924/Algorithm-Visulizer',
    live: 'https://ronitmexson2924.github.io/Algorithm-Visulizer/',
    accent: '#60a5fa',
  },
  {
    id: 4,
    shortTitle: 'C++ OOP',
    title: 'Inheritance in C++',
    description:
      "A tool that can teach a person about 'Inheritance in C++' by simple texts and graphs. Made as a subject project in College.",
    tech: ['HTML', 'CSS', 'JavaScript', 'Animation'],
    github: 'https://github.com/ronitmexson2924/Inheritance-in-C-',
    live: 'https://ronitmexson2924.github.io/Inheritance-in-C-/',
    accent: '#a78bfa',
  },
  {
    id: 5,
    shortTitle: 'Piano',
    title: 'Virtual Piano',
    description:
      'A fun tool to play with, made in First Sem as a project. A fully interactive virtual piano built with Python.',
    tech: ['Python'],
    github: 'https://github.com/ronitmexson2924/Music-Box',
    live: '#',
    accent: '#f472b6',
  },
];

const skillCategories = [
  {
    emoji: '🗣️',
    label: 'Languages',
    items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C', 'C++'],
  },
  {
    emoji: '🎨',
    label: 'Frontend',
    items: ['React', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap'],
  },
  {
    emoji: '⚙️',
    label: 'Backend',
    items: ['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'MySQL'],
  },
  {
    emoji: '🤖',
    label: 'AI / ML',
    items: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras'],
  },
  {
    emoji: '☁️',
    label: 'DevOps & Cloud',
    items: ['Docker', 'Kubernetes', 'AWS', 'GCP', 'Linux', 'Git', 'GitHub'],
  },
];

interface Cert {
  id: number;
  title: string;
  issuer: string;
  date: string;
  icon: typeof BrainCircuit;
  file: string;
}

const certifications: Cert[] = [
  { id: 4,  title: 'AI For Everyone',                                    issuer: 'DeepLearning.AI', date: '2025', icon: BrainCircuit, file: '/certificates/ai-for-everyone.png'        },
  { id: 5,  title: 'Intro to Git and GitHub',                            issuer: 'Google',          date: '2024', icon: Code2,        file: '/certificates/intro-to-git-and-github.png' },
  { id: 6,  title: 'Using Python to Interact with the Operating System', issuer: 'Google',          date: '2024', icon: Code2,        file: '/certificates/python-to-interact-with-os.png' },
  { id: 7,  title: 'Intro to Front-End Development',                     issuer: 'Meta',            date: '2024', icon: Monitor,      file: '/certificates/intro-to-front-end.png'      },
  { id: 8,  title: 'Databases and SQL for Data Science with Python',     issuer: 'IBM',             date: '2024', icon: Code2,        file: '/certificates/databases-sql.png'           },
  { id: 9,  title: 'Generative AI: Prompt Engineering Basics',           issuer: 'IBM',             date: '2025', icon: BrainCircuit, file: '/certificates/prompt-eng-basics.png'       },
  { id: 10, title: 'Generative AI: Introduction and Applications',       issuer: 'IBM',             date: '2025', icon: BrainCircuit, file: '/certificates/gen-ai-basics.png'           },
  { id: 11, title: 'Introduction to Artificial Intelligence(AI)',         issuer: 'IBM',             date: '2025', icon: BrainCircuit, file: '/certificates/intro-to-gen-ai.png'         },
  { id: 12, title: 'Deep Learning & Neural Networks',                    issuer: 'IBM',             date: '2025', icon: BrainCircuit, file: '/certificates/dl-basics.png'               },
  { id: 13, title: 'Machine Learning in Python',                         issuer: 'IBM',             date: '2025', icon: BrainCircuit, file: '/certificates/ml-basics.png'               },
  { id: 14, title: 'C Programming Bootcamp',                             issuer: 'Udemy',           date: '2025', icon: Code2,        file: '/certificates/c-programming.png'            },
];

const socials = [
  { label: 'Email', href: 'mailto:workwithronit.25@gmail.com', displayHref: 'workwithronit.25@gmail.com', Icon: Mail },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ronit-mexson/', displayHref: 'linkedin.com/in/ronit-mexson', Icon: LinkedinIcon },
  { label: 'GitHub', href: 'https://github.com/ronitmexson2924', displayHref: 'github.com/ronitmexson2924', Icon: GithubIcon },
];

// ─────────────────────────────────────────────────────────────────
// PORTFOLIO
// ─────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [activeProject, setActiveProject] = useState(0);
  const [previewCert, setPreviewCert] = useState<Cert | null>(null);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const skillsGridRef = useRef<HTMLDivElement>(null);

  // Auto-reveal skill bars when the section scrolls into view
  useEffect(() => {
    const el = skillsGridRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setSkillsVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const proj = projects[activeProject];

  return (
    <>
      <style>{`
        @keyframes projectEnter {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0px);
          }
        }
      `}</style>
      <FlowArt aria-label="Ronit Mexson — Portfolio">

        {/* ══════════════════════════════════════
            01 — HERO
        ══════════════════════════════════════ */}
        <FlowSection
          aria-label="Hero — About Ronit Mexson"
          style={{ backgroundColor: '#FD5201', color: '#fff' }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white">
            01 — About
          </p>

          <hr className="border-0 border-t border-white/10" />

          {/* Main hero row — stacks on mobile */}
          <div className="flex flex-col-reverse items-center gap-8 sm:flex-row sm:items-center sm:justify-between sm:gap-[4vw]">
            {/* Left: copy */}
            <div className="flex flex-col gap-5 w-full sm:max-w-[55%]">
              <div>
                <p className="text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-white mb-3">
                  MERN Stack Developer &amp; AI Enthusiast
                </p>
                <h1
                  className="font-bold leading-[0.88] uppercase tracking-tight"
                  style={{ fontSize: 'clamp(2.5rem, 10vw, 10rem)', wordBreak: 'break-word' }}
                >
                  Ronit<br />Mexson
                </h1>
              </div>

              <p
                className="leading-relaxed font-semibold text-white"
                style={{ fontSize: 'clamp(0.875rem, 1.3vw, 1.1rem)', maxWidth: '44ch' }}
              >
                CS student passionate about building production-grade software — from intelligent AI
                systems to scalable web platforms. Turning complex problems into elegant, working
                solutions.
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:workwithronit.25@gmail.com"
                  className="inline-flex items-center justify-center gap-2 bg-white text-black text-xs font-bold uppercase tracking-widest px-6 py-3 hover:bg-gray-100 transition-colors w-full sm:w-auto"
                >
                  Get in Touch →
                </a>
              </div>
            </div>

            {/* Right: photo — premium frame, hidden on very small screens */}
            <div
              className="relative shrink-0 group self-center hidden xs:block"
              style={{ width: 'clamp(120px, 22vw, 300px)' }}
            >

              {/* ── Ambient glow behind the frame ── */}
              <div
                className="absolute pointer-events-none transition-all duration-700 opacity-60 group-hover:opacity-100 group-hover:scale-110"
                style={{
                  inset: '-32px',
                  background: 'radial-gradient(circle at 50% 50%, rgba(253,82,1,0.4) 0%, transparent 65%)',
                  filter: 'blur(24px)',
                  zIndex: 0,
                }}
              />

              {/* ── Outer offset ghost border ── */}
              <div
                className="absolute pointer-events-none transition-transform duration-500 group-hover:rotate-3 group-hover:translate-x-1 group-hover:-translate-y-1"
                style={{
                  inset: '-8px 8px 8px -8px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '16px',
                  zIndex: 0,
                }}
              />

              {/* ── Main photo frame ── */}
              <div
                className="relative overflow-hidden transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_24px_48px_rgba(0,0,0,0.6)]"
                style={{
                  aspectRatio: '3/4',
                  border: '1px solid rgba(255,255,255,0.25)',
                  borderRadius: '16px',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.5), 0 4px 12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
                  zIndex: 1,
                }}
              >
                {/* Photo */}
                <img
                  src={heroImg}
                  alt="Ronit Mexson"
                  className="w-full h-full object-cover object-center"
                  style={{ display: 'block' }}
                  onError={(e) => {
                    const el = e.currentTarget as HTMLImageElement;
                    el.style.display = 'none';
                    const p = el.parentElement;
                    if (p) {
                      p.style.cssText +=
                        'display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.04)';
                      p.innerHTML =
                        '<span style="font-size:clamp(2rem,6vw,5rem);font-weight:700;color:rgba(255,255,255,.15);letter-spacing:-.02em">RM</span>';
                    }
                  }}
                />

                {/* Bottom gradient vignette */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 40%, transparent 65%)' }}
                />

                {/* ── Corner tick marks ── */}
                {(['top-2.5 left-2.5 border-t border-l',
                   'top-2.5 right-2.5 border-t border-r',
                   'bottom-2.5 left-2.5 border-b border-l',
                   'bottom-2.5 right-2.5 border-b border-r'] as const).map(cls => (
                  <span
                    key={cls}
                    className={`absolute w-3.5 h-3.5 pointer-events-none ${cls}`}
                    style={{ borderColor: 'rgba(255,255,255,0.35)' }}
                  />
                ))}

                {/* ── Floating status badge ── */}
                <div
                  className="absolute bottom-3.5 left-0 right-0 flex justify-center pointer-events-none"
                >
                  <div
                    className="flex items-center gap-1.5 px-3 py-1.5 transition-all duration-300 group-hover:bg-white/10"
                    style={{
                      background: 'rgba(0,0,0,0.55)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '99px',
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shrink-0" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/80">
                      Full time Human Being
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <hr className="border-0 border-t border-white/10" />

          {/* Stats row — 2-col grid on mobile, flex on larger */}
          <div className="grid grid-cols-2 gap-x-[6vw] gap-y-4 sm:flex sm:flex-wrap sm:gap-[4vw]">
            {[
              { val: '5+', lbl: 'Projects' },
              { val: '11+', lbl: 'Certifications' },
              { val: '2028', lbl: 'Graduating' },
            ].map(({ val, lbl }) => (
              <div key={lbl}>
                <p className="font-bold leading-none" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 3rem)' }}>{val}</p>
                <p className="text-[10px] uppercase tracking-widest font-bold text-white mt-1">{lbl}</p>
              </div>
            ))}
          </div>
        </FlowSection>

        {/* ══════════════════════════════════════
            02 — PROJECTS
        ══════════════════════════════════════ */}
        <FlowSection
          aria-label="Projects"
          style={{ backgroundColor: '#000', color: '#fff' }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white">02 — Projects</p>

          <hr className="border-0 border-t border-white/10" />

          {/* Tab bar */}
          <div className="flex border-b border-white/10 overflow-x-auto">
            {projects.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setActiveProject(i)}
                style={activeProject === i ? { borderBottomColor: p.accent } : {}}
                className={[
                  'px-[2.5vw] py-3 text-xs font-bold uppercase tracking-widest whitespace-nowrap',
                  'border-b-2 -mb-px transition-all duration-200',
                  activeProject === i
                    ? 'text-white'
                    : 'border-transparent text-white/30 hover:text-white/70',
                ].join(' ')}
              >
                {p.shortTitle}
              </button>
            ))}
          </div>

          {/* Active project detail */}
          {/* <div
            key={proj.id}
            className="flex flex-col gap-5"
            style={{ animation: 'projectEnter 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94) both' }}
          > */}
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <span
                  className="w-2.5 h-2.5 shrink-0"
                  style={{ backgroundColor: proj.accent }}
                />
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                  0{proj.id} — Project
                </p>
              </div>
              <h2
                className="font-bold leading-[0.88] uppercase tracking-tight"
                style={{ fontSize: 'clamp(2rem, 7vw, 8rem)', wordBreak: 'break-word' }}
              >
                {proj.title}
              </h2>
            </div>

            <p
              className="leading-relaxed text-white/70"
              style={{ fontSize: 'clamp(0.875rem, 1.3vw, 1.1rem)', maxWidth: '55ch' }}
            >
              {proj.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {proj.tech.map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 border border-white/20 text-white/80"
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* ── Mini browser preview window ─────────────────────────── */}
            <div
              style={{
                borderRadius:  10,
                overflow:      'hidden',
                border:        `1px solid rgba(255,255,255,0.14)`,
                boxShadow:     '0 16px 48px rgba(0,0,0,0.5)',
                background:    '#111',
                willChange:    'transform',
              }}
            >
              {/* Browser chrome bar */}
              <div
                style={{
                  display:        'flex',
                  alignItems:     'center',
                  gap:            8,
                  padding:        '8px 12px',
                  borderBottom:   '1px solid rgba(255,255,255,0.09)',
                  background:     'rgba(255,255,255,0.05)',
                }}
              >
                {/* Traffic-light dots */}
                {['rgba(255,95,86,0.75)', 'rgba(255,189,68,0.75)', 'rgba(40,200,100,0.75)'].map((bg) => (
                  <span key={bg} style={{ width: 10, height: 10, borderRadius: '50%', background: bg, display: 'block', flexShrink: 0 }} />
                ))}
                {/* Address bar */}
                <div
                  style={{
                    flex:          1,
                    margin:        '0 8px',
                    display:       'flex',
                    alignItems:    'center',
                    gap:           6,
                    background:    'rgba(255,255,255,0.07)',
                    border:        '1px solid rgba(255,255,255,0.1)',
                    borderRadius:  6,
                    padding:       '4px 10px',
                    overflow:      'hidden',
                  }}
                >
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  </svg>
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                    {proj.live === '#' ? 'No live demo available' : proj.live.replace(/^https?:\/\//, '')}
                  </span>
                </div>
                {/* Open-in-new-tab button */}
                {proj.live !== '#' && (
                  <a
                    href={proj.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open in new tab"
                    style={{ color: 'rgba(255,255,255,0.35)', flexShrink: 0, display: 'flex', alignItems: 'center' }}
                    className="hover:text-white transition-colors"
                  >
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>

              {/* Preview viewport */}
              {proj.live !== '#' ? (
                <div style={{ position: 'relative', width: '100%', height: 210, overflow: 'hidden', background: '#0d0d0d' }}>
                  {/* Scaled-down iframe — 2× wide + 2× tall, scaled 50% → fills the container */}
                  <iframe
                    key={proj.id}           /* remount when project changes */
                    src={proj.live}
                    title={`Preview — ${proj.title}`}
                    loading="lazy"
                    style={{
                      width:           '200%',
                      height:          '420px',
                      border:          'none',
                      transform:        'scale(0.5)',
                      transformOrigin: 'top left',
                      pointerEvents:   'none',  /* don't intercept clicks */
                    }}
                  />
                  {/* Gradient fade at bottom to blend into chrome */}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 48, background: 'linear-gradient(to top, #111, transparent)', pointerEvents: 'none' }} />
                  {/* Subtle accent tint overlay matching project accent */}
                  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${proj.accent}10 0%, transparent 60%)`, pointerEvents: 'none' }} />
                </div>
              ) : (
                <div
                  style={{
                    height:         160,
                    display:        'flex',
                    flexDirection:  'column',
                    alignItems:     'center',
                    justifyContent: 'center',
                    gap:            10,
                    color:          'rgba(255,255,255,0.18)',
                    background:     'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.015) 10px, rgba(255,255,255,0.015) 20px)',
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                    <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
                  </svg>
                  <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.18em', fontWeight: 700 }}>
                    No live demo available
                  </span>
                </div>
              )}
            </div>

          <hr className="border-0 border-t border-white/10" />

          {/* CTA links — stack on mobile */}
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={proj.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-black text-xs font-bold uppercase tracking-widest px-6 py-3 hover:bg-gray-200 transition-colors w-full sm:w-auto"
            >
              <ExternalLink size={14} /> Live Demo
            </a>
            <a
              href={proj.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-white/30 text-white text-xs font-bold uppercase tracking-widest px-6 py-3 hover:bg-white/10 hover:border-white/60 transition-colors w-full sm:w-auto"
            >
              <GithubIcon size={14} /> Code
            </a>
          </div>
        </FlowSection>

        {/* ══════════════════════════════════════
            03 — SKILLS
        ══════════════════════════════════════ */}
        <FlowSection
          aria-label="Skills"
          style={{ backgroundColor: '#F5F0E6', color: '#1a1a1a' }}
        >
          {/* Inject skill hover + auto-reveal styles */}
          <style>{`
            .skill-col { transition: background 0.3s ease; }
            .skill-col:hover { background: var(--col-hover-bg) !important; }
            .skill-col:hover .skill-cat-label { color: var(--col-accent) !important; opacity: 1; }
            .skill-col:hover .skill-dot { transform: scale(1.4); }
            .skill-row { transition: background 0.18s ease, padding-left 0.18s ease; border-radius: 6px; }
            .skill-row:hover { background: var(--col-accent-soft); padding-left: 8px; }
            .skill-row:hover .skill-name { color: var(--col-accent) !important; font-weight: 700; }
            .skill-bar-fill {
              transition: width 0.7s cubic-bezier(0.22, 1, 0.36, 1);
              width: 0 !important;
            }
            /* Reveal on hover (desktop) */
            .skill-col:hover .skill-bar-fill { width: var(--bar-w) !important; }
            /* Auto-reveal when section enters viewport (all devices) */
            .skills-revealed .skill-bar-fill { width: var(--bar-w) !important; }
            .skill-dot { transition: transform 0.3s ease; }
          `}</style>

          <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: 'rgba(0,0,0,0.4)' }}>03 — Skills</p>

          <hr className="border-0 border-t" style={{ borderColor: 'rgba(0,0,0,0.08)' }} />

          <div className="flex items-end justify-between gap-8 flex-wrap">
            <h2
              className="font-bold leading-[0.88] uppercase tracking-tight"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 6.5rem)', color: '#1a1a1a' }}
            >
              What I<br />Know
            </h2>
            <div className="flex flex-col items-end gap-2 pb-1">
              <span
                className="font-black leading-none select-none"
                style={{ fontSize: 'clamp(3rem,5vw,5rem)', color: 'rgba(0,0,0,0.06)', letterSpacing: '-0.04em' }}
              >
                30+
              </span>
              <p className="text-xs uppercase tracking-[0.12em] max-w-[200px] leading-relaxed text-right" style={{ color: 'rgba(0,0,0,0.35)' }}>
                Tools &amp; technologies across the full stack
              </p>
            </div>
          </div>

          <hr className="border-0 border-t" style={{ borderColor: 'rgba(0,0,0,0.08)' }} />

          {/* Vertical skill rows — one full-width band per category, no orphan gap */}
          <div
            ref={skillsGridRef}
            className={`flex flex-col gap-[1px]${skillsVisible ? ' skills-revealed' : ''}`}
            style={{ background: 'rgba(0,0,0,0.06)', borderRadius: '12px', overflow: 'hidden' }}
          >
            {skillCategories.map((cat, ci) => {
              const accents = [
                { color: '#7c3aed', soft: 'rgba(124,58,237,0.08)', hover: 'rgba(124,58,237,0.05)' },
                { color: '#ea580c', soft: 'rgba(234,88,12,0.08)',  hover: 'rgba(234,88,12,0.05)'  },
                { color: '#059669', soft: 'rgba(5,150,105,0.08)',   hover: 'rgba(5,150,105,0.05)'  },
                { color: '#2563eb', soft: 'rgba(37,99,235,0.08)',   hover: 'rgba(37,99,235,0.05)'  },
                { color: '#db2777', soft: 'rgba(219,39,119,0.08)',  hover: 'rgba(219,39,119,0.05)' },
              ];
              const proficiency: Record<string, number> = {
                JavaScript: 90, TypeScript: 40, Python: 95, Java: 70, C: 89, 'C++': 92,
                React: 70, HTML5: 100, CSS3: 98, 'Tailwind CSS': 92, Bootstrap: 90,
                'Node.js': 62, 'Express.js': 58, MongoDB: 75, PostgreSQL: 50, MySQL: 75,
                TensorFlow: 80, PyTorch: 72, 'Scikit-learn': 75, Keras: 78,
                Docker: 5, Kubernetes: 10, AWS: 20, GCP: 5, Linux: 90, Git: 95, GitHub: 92,
              };
              const { color, soft, hover } = accents[ci];
              return (
                <div
                  key={cat.label}
                  className="skill-col flex flex-col sm:flex-row sm:items-start gap-4 p-4 sm:p-5 cursor-default"
                  style={{
                    background: '#F5F0E6',
                    '--col-accent':      color,
                    '--col-accent-soft': soft,
                    '--col-hover-bg':    hover,
                  } as React.CSSProperties}
                >
                  {/* Category label — fixed-width column on sm+ */}
                  <div className="flex items-center gap-2 sm:w-36 shrink-0 sm:pt-1">
                    <span
                      className="skill-dot w-2 h-2 rounded-full shrink-0"
                      style={{ background: color }}
                    />
                    <span
                      className="skill-cat-label text-[10px] font-bold uppercase tracking-[0.18em] transition-colors duration-300"
                      style={{ color: 'rgba(0,0,0,0.4)' }}
                    >
                      {cat.emoji}&nbsp; {cat.label}
                    </span>
                  </div>

                  {/* Vertical divider on desktop */}
                  <div
                    className="hidden sm:block w-px self-stretch shrink-0"
                    style={{ background: 'rgba(0,0,0,0.07)' }}
                  />

                  {/* Skill pills — wrap freely, no orphan */}
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((skill, si) => {
                      const pct = proficiency[skill] ?? 70;
                      return (
                        <div
                          key={skill}
                          className="skill-row flex flex-col gap-1.5 px-3 py-2"
                          style={{
                            background:   'rgba(0,0,0,0.04)',
                            borderRadius:  8,
                            minWidth:      76,
                          }}
                        >
                          <span
                            className="skill-name text-[11.5px] font-semibold leading-none transition-all duration-200"
                            style={{ color: 'rgba(0,0,0,0.58)' }}
                          >
                            {skill}
                          </span>
                          <div
                            className="h-[2.5px] rounded-full"
                            style={{ background: 'rgba(0,0,0,0.08)' }}
                          >
                            <div
                              className="skill-bar-fill h-full rounded-full"
                              style={{
                                '--bar-w':       `${pct}%`,
                                background:       color,
                                transitionDelay:  skillsVisible ? `${ci * 0.08 + si * 0.04}s` : '0s',
                                willChange:       'width',
                              } as React.CSSProperties}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom row */}
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-between sm:flex-wrap pt-2">
            <div className="flex items-center gap-4">
              <span
                className="font-black leading-none select-none"
                style={{ fontSize: 'clamp(1.5rem,3vw,2.5rem)', color: 'rgba(0,0,0,0.12)', letterSpacing: '-0.04em' }}
              >
                30+
              </span>
              <span className="text-[11px] uppercase tracking-[0.14em]" style={{ color: 'rgba(0,0,0,0.3)' }}>
                Skills &amp; counting
              </span>
            </div>
            <div
              className="flex items-center gap-2 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em]"
              style={{
                border: '1px solid rgba(0,0,0,0.1)',
                background: 'rgba(0,0,0,0.03)',
                borderRadius: '99px',
                color: 'rgba(0,0,0,0.5)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Open to new projects
            </div>
          </div>
        </FlowSection>


        {/* ══════════════════════════════════════
            04 — CERTIFICATIONS
        ══════════════════════════════════════ */}
        <FlowSection
          aria-label="Certifications"
          style={{ backgroundColor: '#1A3DE8', color: '#fff' }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white">04 — Certifications</p>

          <hr className="border-0 border-t border-white/20" />

          <h2
            className="font-bold leading-[0.88] uppercase tracking-tight"
            style={{ fontSize: 'clamp(2rem, 7vw, 6rem)' }}
          >
            {certifications.length} Certifications<br />&amp; Counting
          </h2>

          <hr className="border-0 border-t border-white/20" />

          {/* Compact cert grid — 1 col mobile, 2 col tablet, 4 col desktop */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {certifications.map((cert) => {
              const Icon = cert.icon;
              return (
                <div
                  key={cert.id}
                  className="border border-white/20 p-3 sm:p-4 flex flex-col gap-2 hover:border-white/50 hover:bg-white/10 transition-all group cursor-default"
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                >
                  <div className="flex items-center justify-between gap-1">
                    <Icon size={14} className="text-white/60 shrink-0" />
                    <span className="text-[10px] uppercase tracking-wider text-white/60 font-bold">
                      {cert.issuer}
                    </span>
                  </div>

                  <p
                    className="text-[13px] font-bold leading-snug text-white"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {cert.title}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-1">
                    <span className="text-[11px] text-white/50 font-semibold">{cert.date}</span>
                    <button
                      onClick={() => setPreviewCert(cert)}
                      className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-white/70 hover:text-white transition-colors"
                    >
                      <Eye size={11} /> Preview
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </FlowSection>

        {/* ══════════════════════════════════════
            05 — CONTACT
        ══════════════════════════════════════ */}
        <FlowSection
          aria-label="Contact"
          style={{ backgroundColor: '#000', color: '#fff' }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-50">
            05 — Let's Connect
          </p>

          <hr className="border-0 border-t border-white/10" />

          <h2
            className="font-bold leading-[0.85] uppercase tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 10vw, 11rem)', wordBreak: 'break-word' }}
          >
            Let's<br />Build<br />Something
          </h2>

          <hr className="border-0 border-t border-white/10" />

          <div className="flex flex-col gap-8 sm:flex-row sm:flex-wrap sm:gap-[4vw] sm:items-start">
            {/* Left: message + contact link */}
            <div className="flex-1 min-w-[200px] flex flex-col gap-5">
              <p
                className="leading-relaxed opacity-55"
                style={{ fontSize: 'clamp(0.875rem, 1.3vw, 1.1rem)', maxWidth: '44ch' }}
              >
                Open to freelance work, full-time roles, and creative collaborations. Whether you
                have a project in mind or just want to say hi — drop me a message.
              </p>

              <div className="flex flex-col gap-3">
                {socials.map(({ label, href, displayHref, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={label !== 'Email' ? '_blank' : undefined}
                    rel={label !== 'Email' ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-3 group w-fit"
                  >
                    <span className="w-9 h-9 border border-white/15 flex items-center justify-center group-hover:bg-white group-hover:text-black group-hover:border-white transition-all shrink-0">
                      <Icon size={15} />
                    </span>
                    <span className="text-sm opacity-50 group-hover:opacity-100 transition-opacity break-all">
                      {displayHref}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Right: info tiles */}
            <div className="flex flex-col gap-3 w-full sm:min-w-[200px] sm:w-auto">
              <div className="border border-white/10 p-4 sm:p-5">
                <p className="text-[10px] uppercase tracking-widest opacity-35 mb-2">Location</p>
                <p className="text-sm font-bold">Vellore, Tamil Nadu, India</p>
              </div>
              <div className="border border-white/10 p-4 sm:p-5">
                <p className="text-[10px] uppercase tracking-widest opacity-35 mb-2">Status</p>
                <p className="text-sm font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
                  Open to opportunities
                </p>
              </div>
            </div>
          </div>

          <hr className="border-0 border-t border-white/10" />

          <p className="text-[10px] uppercase tracking-widest opacity-25">
            © 2026 Ronit Mexson
          </p>
        </FlowSection>

      </FlowArt>

      {/* ══════════════════════════════════════
          CERTIFICATE PREVIEW MODAL
      ══════════════════════════════════════ */}
      {previewCert && (
  <div
    className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-[4vw]"
    style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(20px)' }}
    onClick={() => setPreviewCert(null)}
  >
    <div
      className="relative w-full sm:max-w-2xl flex flex-col"
      style={{
        background: '#0c1220',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
        maxHeight: '95dvh',
        overflowY: 'auto',
      }}
      onClick={e => e.stopPropagation()}
    >
      {/* ── Top accent line coloured by issuer ── */}
      <div
        className="h-[2px] w-full shrink-0"
        style={{
          background: (() => {
            const map: Record<string, string> = {
              'DeepLearning.AI': '#fb923c',
              Google:            '#60a5fa',
              Meta:              '#818cf8',
              IBM:               '#34d399',
              Udemy:             '#a78bfa',
            };
            return map[previewCert.issuer] ?? 'rgba(255,255,255,0.2)';
          })(),
        }}
      />

      {/* ── Modal header ── */}
      <div className="flex items-start justify-between gap-6 px-7 py-5 border-b border-white/[0.07]">
        <div className="flex flex-col gap-1.5">
          {/* Issuer badge */}
          <div className="flex items-center gap-2">
            <span
              className="text-[9px] font-bold uppercase tracking-[0.2em] px-2 py-0.5 border"
              style={{
                borderColor: 'rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.04)',
                color: 'rgba(255,255,255,0.45)',
              }}
            >
              {previewCert.issuer}
            </span>
            <span className="text-[9px] uppercase tracking-widest opacity-25">
              · {previewCert.date}
            </span>
          </div>
          <h3 className="text-[15px] font-bold text-white leading-snug max-w-[36ch]">
            {previewCert.title}
          </h3>
        </div>

        <button
          onClick={() => setPreviewCert(null)}
          aria-label="Close preview"
          className="shrink-0 mt-0.5 w-8 h-8 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-150"
        >
          <X size={13} />
        </button>
      </div>

      {/* ── Certificate image ── */}
      <div
        className="relative w-full flex items-center justify-center overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.02)', minHeight: 320, maxHeight: 500 }}
      >
        {/* Subtle corner marks */}
        {[
          'top-3 left-3 border-t border-l',
          'top-3 right-3 border-t border-r',
          'bottom-3 left-3 border-b border-l',
          'bottom-3 right-3 border-b border-r',
        ].map(cls => (
          <span
            key={cls}
            className={`absolute w-4 h-4 pointer-events-none ${cls}`}
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          />
        ))}

        <img
          src={previewCert.file}
          alt={previewCert.title}
          className="w-full h-full object-contain px-6 py-6"
          style={{ maxHeight: 500 }}
          onError={e => {
            const el = e.currentTarget as HTMLImageElement;
            el.style.display = 'none';
            const parent = el.parentElement;
            if (parent) {
              parent.innerHTML = `
                <div style="display:flex;flex-direction:column;align-items:center;gap:16px;padding:4rem;color:rgba(255,255,255,.2);text-align:center">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" style="opacity:.4">
                    <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z"/>
                  </svg>
                  <div>
                    <p style="font-size:13px;font-weight:700;color:rgba(255,255,255,.35);margin-bottom:6px">Certificate not found</p>
                    <p style="font-size:11px;line-height:1.7;color:rgba(255,255,255,.2)">
                      Place the file at<br/>
                      <code style="font-family:monospace;background:rgba(255,255,255,.06);padding:2px 6px;border-radius:3px;font-size:10px">
                        public/certificates/
                      </code>
                    </p>
                  </div>
                </div>
              `;
            }
          }}
        />
      </div>

      {/* ── Footer action bar ── */}
      <div
        className="flex items-center justify-between gap-4 px-7 py-4 border-t border-white/[0.07]"
        style={{ background: 'rgba(255,255,255,0.015)' }}
      >
        {/* Cert index indicator */}
        <div className="flex items-center gap-3">
          {certifications.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setPreviewCert(certifications[i])}
              aria-label={`View ${c.title}`}
              className="transition-all duration-200"
              style={{
                width: previewCert.id === c.id ? 20 : 5,
                height: 3,
                borderRadius: 2,
                background:
                  previewCert.id === c.id
                    ? 'rgba(255,255,255,0.7)'
                    : 'rgba(255,255,255,0.15)',
              }}
            />
          ))}
        </div>

        {/* Prev / Next nav */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const idx = certifications.findIndex(c => c.id === previewCert.id);
              const prev = certifications[(idx - 1 + certifications.length) % certifications.length];
              setPreviewCert(prev);
            }}
            className="w-8 h-8 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-150 text-xs font-bold"
            aria-label="Previous certificate"
          >
            ←
          </button>
          <button
            onClick={() => {
              const idx = certifications.findIndex(c => c.id === previewCert.id);
              const next = certifications[(idx + 1) % certifications.length];
              setPreviewCert(next);
            }}
            className="w-8 h-8 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-150 text-xs font-bold"
            aria-label="Next certificate"
          >
            →
          </button>
        </div>
      </div>

    </div>
  </div>
)}
    </>
  );
}
