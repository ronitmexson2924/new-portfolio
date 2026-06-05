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

const GithubIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

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
      'A beautiful, interactive virtual piano. Play musical notes with your mouse, keyboard, or touch device.',
    tech: ['React', 'Vite', 'Web Audio API', 'GSAP'],
    github: 'https://github.com/ronitmexson2924/Music-Box',
    live: 'https://music-box-virtual-piano.netlify.app',
    accent: '#f472b6',
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

  // ── Shared squared preview window content ─────────────────────────────────
  // Rendered inside a flex-column square container; used on both desktop
  // (right column) and mobile (inline, after tech tags).
  const previewWindowInner = (
    <>
      {/* Browser chrome bar */}
      <div
        style={{
          display:        'flex',
          alignItems:     'center',
          gap:             6,
          padding:        '7px 10px',
          borderBottom:   '1px solid rgba(255,255,255,0.09)',
          background:     'rgba(255,255,255,0.05)',
          flexShrink:      0,
        }}
      >
        {/* Traffic-light dots */}
        {['rgba(255,95,86,0.75)', 'rgba(255,189,68,0.75)', 'rgba(40,200,100,0.75)'].map((bg) => (
          <span
            key={bg}
            style={{ width: 8, height: 8, borderRadius: '50%', background: bg, display: 'block', flexShrink: 0 }}
          />
        ))}
        {/* Address bar */}
        <div
          style={{
            flex:          1,
            marginLeft:    4,
            background:    'rgba(255,255,255,0.07)',
            border:        '1px solid rgba(255,255,255,0.1)',
            borderRadius:   4,
            padding:       '3px 8px',
            overflow:      'hidden',
          }}
        >
          <span
            style={{
              fontSize:      9,
              color:         'rgba(255,255,255,0.4)',
              overflow:      'hidden',
              textOverflow:  'ellipsis',
              whiteSpace:    'nowrap',
              display:       'block',
            }}
          >
            {proj.live === '#' ? 'No live demo available' : proj.live.replace(/^https?:\/\//, '')}
          </span>
        </div>
        {proj.live !== '#' && (
          <a
            href={proj.live}
            target="_blank"
            rel="noopener noreferrer"
            title="Open in new tab"
            style={{ color: 'rgba(255,255,255,0.35)', flexShrink: 0, display: 'flex', alignItems: 'center' }}
          >
            <ExternalLink size={11} />
          </a>
        )}
      </div>

      {/* Preview viewport — fills remaining square height */}
      {proj.live !== '#' ? (
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: '#0d0d0d' }}>
          {/*
            The iframe is 200% × 200% of the container, then scaled 0.5 via
            transform so it fills the container exactly at half resolution.
            `position: absolute` + top/left:0 ensures the height percentage
            is relative to the positioned parent, not the flex item.
          */}
          <iframe
            key={proj.id}
            src={proj.live}
            title={`Preview — ${proj.title}`}
            loading="lazy"
            style={{
              position:        'absolute',
              top:              0,
              left:             0,
              width:           '200%',
              height:          '200%',
              border:          'none',
              transform:        'scale(0.5)',
              transformOrigin: 'top left',
              pointerEvents:   'none',
            }}
          />
          {/* Bottom fade */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 28, background: 'linear-gradient(to top, #111, transparent)', pointerEvents: 'none' }} />
          {/* Accent tint */}
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${proj.accent}18 0%, transparent 60%)`, pointerEvents: 'none' }} />
        </div>
      ) : (
        <div
          style={{
            flex:           1,
            display:        'flex',
            flexDirection:  'column',
            alignItems:     'center',
            justifyContent: 'center',
            gap:             8,
            color:          'rgba(255,255,255,0.18)',
            background:     'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.015) 10px, rgba(255,255,255,0.015) 20px)',
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
            <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
          </svg>
          <span style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.18em', fontWeight: 700 }}>
            No live demo
          </span>
        </div>
      )}
    </>
  );

  // Shared outer box styles for the squared window
  const squareBoxStyle: React.CSSProperties = {
    display:        'flex',
    flexDirection:  'column',
    borderRadius:    10,
    overflow:       'hidden',
    border:         '1px solid rgba(255,255,255,0.14)',
    boxShadow:      '0 16px 48px rgba(0,0,0,0.5)',
    background:     '#111',
    aspectRatio:    '1',   // makes the box perfectly square
  };

  return (
    <>
      <style>{`
        @keyframes projectEnter {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0px); }
        }
      `}</style>
      <FlowArt aria-label="Ronit Mexson — Portfolio">

        {/* ══════════════════════════════════════
            01 — HERO  (unchanged)
        ══════════════════════════════════════ */}
        <FlowSection
          aria-label="Hero — About Ronit Mexson"
          style={{ backgroundColor: '#FD5201', color: '#fff' }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white">
            01 — About
          </p>

          <hr className="border-0 border-t border-white/10" />

          <div className="flex flex-col-reverse items-center gap-8 sm:flex-row sm:items-center sm:justify-between sm:gap-[4vw]">
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

            <div
              className="relative shrink-0 group self-center hidden xs:block"
              style={{ width: 'clamp(120px, 22vw, 300px)' }}
            >
              <div
                className="absolute pointer-events-none transition-all duration-700 opacity-60 group-hover:opacity-100 group-hover:scale-110"
                style={{
                  inset: '-32px',
                  background: 'radial-gradient(circle at 50% 50%, rgba(253,82,1,0.4) 0%, transparent 65%)',
                  filter: 'blur(24px)',
                  zIndex: 0,
                }}
              />
              <div
                className="absolute pointer-events-none transition-transform duration-500 group-hover:rotate-3 group-hover:translate-x-1 group-hover:-translate-y-1"
                style={{
                  inset: '-8px 8px 8px -8px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '16px',
                  zIndex: 0,
                }}
              />
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
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 40%, transparent 65%)' }}
                />
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
                <div className="absolute bottom-3.5 left-0 right-0 flex justify-center pointer-events-none">
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
            Desktop/tablet: left column (title, desc, tech, CTAs) +
                            right column (squared preview window)
            Mobile:         stacked — title → desc → tech → square
                            preview → CTAs
        ══════════════════════════════════════ */}
        <FlowSection
          aria-label="Projects"
          style={{ backgroundColor: '#000', color: '#fff' }}
        >
          <div className="flex flex-col justify-between h-full flex-1 w-full gap-8 py-[2vh] sm:py-[4vh]">
            <p className="text-base sm:text-xl lg:text-2xl font-bold uppercase tracking-[0.2em] text-white">02 — Projects</p>

            <hr className="border-0 border-t border-white/10" />

            {/* Tab bar */}
            <div className="flex border-b border-white/10 overflow-x-auto">
            {projects.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setActiveProject(i)}
                style={activeProject === i ? { borderBottomColor: p.accent } : {}}
                className={[
                  'px-[2.5vw] py-4 text-base sm:text-xl lg:text-2xl font-bold uppercase tracking-widest whitespace-nowrap',
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

          {/* ── Main row: content left, preview right ───────────────────── */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:gap-8 lg:gap-12">

            {/* Left column — grows to fill available width */}
            <div className="flex flex-col gap-5 flex-1 min-w-0">

              {/* Project header */}
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <span
                    className="w-2.5 h-2.5 shrink-0"
                    style={{ backgroundColor: proj.accent }}
                  />
                  <p className="text-sm sm:text-base lg:text-xl font-bold uppercase tracking-widest text-white/50">
                    0{proj.id} — Project
                  </p>
                </div>
                <h2
                  className="font-bold leading-[0.88] uppercase tracking-tight"
                  style={{ fontSize: 'clamp(3rem, 10vw, 12rem)', wordBreak: 'break-word', lineHeight: '0.9' }}
                >
                  {proj.title}
                </h2>
              </div>

              {/* Description */}
              <p
                className="leading-relaxed text-white/70"
                style={{ fontSize: 'clamp(1.2rem, 2vw, 1.8rem)', maxWidth: '55ch', lineHeight: '1.6' }}
              >
                {proj.description}
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2">
                {proj.tech.map((t) => (
                  <span
                    key={t}
                    className="text-sm sm:text-base lg:text-lg font-bold uppercase tracking-widest px-4 py-2 border border-white/20 text-white/80"
                    style={{ background: 'rgba(255,255,255,0.06)' }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* ── Mobile-only squared preview (below tech tags) ────────── */}
              {/* Hidden on sm+ because desktop shows it in the right column  */}
              <div className="sm:hidden" style={{ maxWidth: 300 }}>
                <div style={{ ...squareBoxStyle, boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>
                  {previewWindowInner}
                </div>
              </div>

              {/* CTA links */}
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={proj.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-white text-black text-base sm:text-lg lg:text-xl font-bold uppercase tracking-widest px-8 py-4 hover:bg-gray-200 transition-colors w-full sm:w-auto"
                >
                  <ExternalLink size={14} /> Live Demo
                </a>
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 border border-white/30 text-white text-base sm:text-lg lg:text-xl font-bold uppercase tracking-widest px-8 py-4 hover:bg-white/10 hover:border-white/60 transition-colors w-full sm:w-auto"
                >
                  <GithubIcon size={14} /> Code
                </a>
              </div>
            </div>

            {/* ── Desktop / tablet squared preview (right column) ─────────── */}
            {/* Hidden on mobile; the inline version above handles that case    */}
            <div
              className="hidden sm:block shrink-0 self-start"
              style={{ width: 'clamp(190px, 21vw, 260px)' }}
            >
              <div style={squareBoxStyle}>
                {previewWindowInner}
              </div>
            </div>

          </div>
          </div>
        </FlowSection>

        {/* ══════════════════════════════════════
            03 — SKILLS  (5-column vertical layout)
        ══════════════════════════════════════ */}
        <FlowSection
          aria-label="Skills"
          style={{ backgroundColor: '#F5F0E6', color: '#1a1a1a' }}
        >
          <style>{`
            /* Bar animation: starts at 0, triggers when .skills-revealed is added to the grid */
            .sk-bar-fill {
              width: 0 !important;
              transition: width 0.75s cubic-bezier(0.22, 1, 0.36, 1);
            }
            .skills-revealed .sk-bar-fill { width: var(--bw) !important; }
            /* Subtle row hover */
            .sk-row:hover .sk-name { opacity: 1; }
            .sk-row:hover .sk-bar-fill { opacity: 0.85; }
          `}</style>

          {/* ── HEADER ROW ───────────────────────────────────────────── */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', paddingBottom: 16, borderBottom: '0.5px solid rgba(0,0,0,0.12)' }}>
            {/* Left */}
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(0,0,0,0.38)', marginBottom: 6 }}>
                03 — SKILLS
              </p>
              <h2 style={{ fontSize: 'clamp(2.5rem, 7vw, 8rem)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 0.88, textTransform: 'uppercase', margin: 0 }}>
                WHAT I <span style={{ opacity: 0.25 }}>KNOW</span>
              </h2>
            </div>
            {/* Right */}
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 26, fontWeight: 500, lineHeight: 1, letterSpacing: '-0.02em', margin: '0 0 4px' }}>30+</p>
              <p style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(0,0,0,0.38)', margin: 0 }}>
                TOOLS &amp; TECHNOLOGIES
              </p>
            </div>
          </div>

          {/* ── 5-COLUMN GRID ────────────────────────────────────────── */}
          {(() => {
            const cols = [
              {
                key: 'Languages',
                dot: '#7F77DD',
                fill: '#7F77DD',
                skills: [
                  { name: 'JavaScript',  label: 'Expert',       pct: 95 },
                  { name: 'TypeScript',  label: 'Expert',       pct: 90 },
                  { name: 'Python',      label: 'Advanced',     pct: 85 },
                  { name: 'Java',        label: 'Advanced',     pct: 75 },
                  { name: 'C',           label: 'Intermediate', pct: 65 },
                  { name: 'C++',         label: 'Intermediate', pct: 60 },
                ],
              },
              {
                key: 'Frontend',
                dot: '#D85A30',
                fill: '#D85A30',
                skills: [
                  { name: 'React',        label: 'Expert',   pct: 95 },
                  { name: 'HTML5',        label: 'Expert',   pct: 95 },
                  { name: 'CSS3',         label: 'Expert',   pct: 90 },
                  { name: 'Tailwind CSS', label: 'Advanced', pct: 85 },
                  { name: 'Bootstrap',    label: 'Advanced', pct: 80 },
                ],
              },
              {
                key: 'Backend',
                dot: '#1D9E75',
                fill: '#1D9E75',
                skills: [
                  { name: 'Node.js',     label: 'Expert',       pct: 90 },
                  { name: 'Express.js',  label: 'Expert',       pct: 90 },
                  { name: 'MongoDB',     label: 'Advanced',     pct: 80 },
                  { name: 'PostgreSQL',  label: 'Advanced',     pct: 78 },
                  { name: 'MySQL',       label: 'Intermediate', pct: 70 },
                ],
              },
              {
                key: 'AI / ML',
                dot: '#378ADD',
                fill: '#378ADD',
                skills: [
                  { name: 'TensorFlow',   label: 'Advanced',     pct: 80 },
                  { name: 'PyTorch',      label: 'Advanced',     pct: 78 },
                  { name: 'Scikit-learn', label: 'Advanced',     pct: 82 },
                  { name: 'Keras',        label: 'Intermediate', pct: 65 },
                ],
              },
              {
                key: 'DevOps',
                dot: '#E85D24',
                fill: '#E85D24',
                skills: [
                  { name: 'Docker',     label: 'Beginner', pct: 9  },
                  { name: 'Kubernetes', label: 'Beginner', pct: 8  },
                  { name: 'AWS',        label: 'Beginner', pct: 10 },
                  { name: 'GCP',        label: 'Beginner', pct: 10 },
                  { name: 'Linux',      label: 'Advanced', pct: 85 },
                  { name: 'Git',        label: 'Expert',   pct: 95 },
                  { name: 'GitHub',     label: 'Expert',   pct: 95 },
                ],
              },
            ];

            return (
              <div
                ref={skillsGridRef}
                className={skillsVisible ? 'skills-revealed' : ''}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, 1fr)',
                  gap: 1,
                  background: 'rgba(0,0,0,0.10)',
                  borderRadius: 0,
                  overflow: 'hidden',
                  margin: '0 -32px',
                }}
              >
                {cols.map((col, ci) => (
                  <div
                    key={col.key}
                    style={{
                      background: '#F5F0E6',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {/* Column header */}
                    <div style={{ padding: '14px 16px 12px', borderBottom: '0.5px solid rgba(0,0,0,0.10)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
                        <span style={{ width: 7, height: 7, borderRadius: '50%', background: col.dot, flexShrink: 0, display: 'inline-block' }} />
                        <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(0,0,0,0.7)' }}>
                          {col.key}
                        </span>
                      </div>
                      <p style={{ fontSize: 10, color: 'rgba(0,0,0,0.35)', margin: 0, paddingLeft: 14 }}>
                        {col.skills.length} skills
                      </p>
                    </div>

                    {/* Skill rows */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      {col.skills.map((skill, si) => (
                        <div
                          key={skill.name}
                          className="sk-row"
                          style={{
                            padding: '10px 16px 10px',
                            borderBottom: si < col.skills.length - 1 ? '0.5px solid rgba(0,0,0,0.07)' : 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 6,
                          }}
                        >
                          {/* Name + proficiency label */}
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 4 }}>
                            <span
                              className="sk-name"
                              style={{ fontSize: 12, color: 'rgba(0,0,0,0.72)', fontWeight: 500, opacity: 0.85, transition: 'opacity 0.15s' }}
                            >
                              {skill.name}
                            </span>
                            <span style={{ fontSize: 10, color: 'rgba(0,0,0,0.35)', flexShrink: 0, textAlign: 'right' }}>
                              {skill.label}
                            </span>
                          </div>
                          {/* Progress bar */}
                          <div style={{ height: 5, borderRadius: 99, background: 'rgba(0,0,0,0.18)', overflow: 'hidden' }}>
                            <div
                              className="sk-bar-fill"
                              style={{
                                height: '100%',
                                borderRadius: 99,
                                background: col.fill,
                                '--bw': `${skill.pct}%`,
                                transitionDelay: skillsVisible ? `${ci * 0.06 + si * 0.05}s` : '0s',
                                willChange: 'width',
                              } as React.CSSProperties}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}

          {/* ── FOOTER ROW ───────────────────────────────────────────── */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', paddingTop: 16, borderTop: '0.5px solid rgba(0,0,0,0.12)' }}>
            <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.38)' }}>30+ skills &amp; counting</span>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              fontSize: 12,
              padding: '6px 14px',
              border: '0.5px solid rgba(0,0,0,0.18)',
              borderRadius: 9999,
              color: 'rgba(0,0,0,0.65)',
            }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', display: 'inline-block', flexShrink: 0, animation: 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite' }} />
              Open to new projects
            </div>
          </div>
        </FlowSection>

        {/* ══════════════════════════════════════
            04 — CERTIFICATIONS  (unchanged)
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
            05 — CONTACT  (unchanged)
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
          CERTIFICATE PREVIEW MODAL  (unchanged)
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

            <div className="flex items-start justify-between gap-6 px-7 py-5 border-b border-white/[0.07]">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className="text-[9px] font-bold uppercase tracking-[0.2em] px-2 py-0.5 border"
                    style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.45)' }}
                  >
                    {previewCert.issuer}
                  </span>
                  <span className="text-[9px] uppercase tracking-widest opacity-25">· {previewCert.date}</span>
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

            <div
              className="relative w-full flex items-center justify-center overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.02)', minHeight: 320, maxHeight: 500 }}
            >
              {[
                'top-3 left-3 border-t border-l',
                'top-3 right-3 border-t border-r',
                'bottom-3 left-3 border-b border-l',
                'bottom-3 right-3 border-b border-r',
              ].map(cls => (
                <span key={cls} className={`absolute w-4 h-4 pointer-events-none ${cls}`} style={{ borderColor: 'rgba(255,255,255,0.08)' }} />
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

            <div
              className="flex items-center justify-between gap-4 px-7 py-4 border-t border-white/[0.07]"
              style={{ background: 'rgba(255,255,255,0.015)' }}
            >
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
                      background: previewCert.id === c.id ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.15)',
                    }}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const idx = certifications.findIndex(c => c.id === previewCert.id);
                    setPreviewCert(certifications[(idx - 1 + certifications.length) % certifications.length]);
                  }}
                  className="w-8 h-8 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-150 text-xs font-bold"
                  aria-label="Previous certificate"
                >←</button>
                <button
                  onClick={() => {
                    const idx = certifications.findIndex(c => c.id === previewCert.id);
                    setPreviewCert(certifications[(idx + 1) % certifications.length]);
                  }}
                  className="w-8 h-8 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-150 text-xs font-bold"
                  aria-label="Next certificate"
                >→</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
