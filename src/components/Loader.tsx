import { useEffect, useRef, useState } from 'react';

// ─── Timing constants ──────────────────────────────────────────────────────────
const LOADER_DURATION = 2600;   // ms  – progress 0 → 100
const COMPLETE_HOLD   = 480;    // ms  – pause at 100 so bar visually locks
const ORANGE_FLASH    = 320;    // ms  – bg transitions to #FD5201
const EXIT_SLIDE      = 740;    // ms  – curtain wipes up off screen
const ACCENT          = '#FD5201';

// ─── Utility ──────────────────────────────────────────────────────────────────
/** Ease-out cubic applied to a raw 0-1 value */
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/** Clamp a progress sub-range to 0-1 (linear slice of already-eased progress) */
const sub = (progress: number, from: number, to: number) =>
  Math.max(0, Math.min(1, (progress - from) / (to - from)));

type Phase = 'loading' | 'complete' | 'flashing' | 'sliding' | 'gone';

// ─── Component ────────────────────────────────────────────────────────────────
export default function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase]       = useState<Phase>('loading');
  const [label, setLabel]       = useState('INITIALISING');

  /**
   * FIX: Store onDone in a ref so the animation effect can safely use the
   * latest version without listing it as a dependency. If onDone is an inline
   * arrow function in the parent, it gets a new reference every render —
   * putting it in the dep array causes the entire animation to restart.
   */
  const onDoneRef = useRef(onDone);
  useEffect(() => { onDoneRef.current = onDone; }, [onDone]);

  // ── Font injection (idempotent) ──────────────────────────────────────────
  useEffect(() => {
    const FONT_ID = '__loader-gfonts';
    if (!document.getElementById(FONT_ID)) {
      const link    = document.createElement('link');
      link.id       = FONT_ID;
      link.rel      = 'stylesheet';
      link.href     = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@700&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  // ── Main animation — runs exactly once ───────────────────────────────────
  useEffect(() => {
    /**
     * FIX: `cleanedUp` is scoped per effect invocation.
     * In React StrictMode, the component is mounted → unmounted → remounted.
     * The first invocation's RAF is canceled and all setTimeout callbacks
     * short-circuit via this flag, so only the second (real) invocation
     * runs to completion.
     */
    let cleanedUp = false;
    const start   = performance.now();
    let raf: number;

    // Label cycling during loading phase
    const labels = ['INITIALISING', 'BUILDING', 'CONNECTING', 'READY'];
    let labelIdx = 0;
    const labelTimer = setInterval(() => {
      labelIdx = (labelIdx + 1) % labels.length;
      if (!cleanedUp) setLabel(labels[labelIdx]);
    }, 600);

    const tick = (now: number) => {
      if (cleanedUp) return;

      const raw   = Math.min((now - start) / LOADER_DURATION, 1);
      const eased = easeOut(raw);
      setProgress(eased);

      if (raw < 1) {
        raf = requestAnimationFrame(tick);
        return;
      }

      // Lock to exactly 1
      setProgress(1);
      setLabel('COMPLETE');
      setPhase('complete');
      clearInterval(labelTimer);

      setTimeout(() => {
        if (cleanedUp) return;
        setPhase('flashing');

        setTimeout(() => {
          if (cleanedUp) return;
          setPhase('sliding');

          setTimeout(() => {
            if (cleanedUp) return;
            setPhase('gone');
            onDoneRef.current();
          }, EXIT_SLIDE);
        }, ORANGE_FLASH);
      }, COMPLETE_HOLD);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cleanedUp = true;
      clearInterval(labelTimer);
      cancelAnimationFrame(raf);
    };
  }, []); // ← intentionally empty: run once per mount lifetime

  if (phase === 'gone') return null;

  const isOrange  = phase === 'flashing' || phase === 'sliding';
  const isSliding = phase === 'sliding';

  // ── Color tokens — flip on orange flash ──────────────────────────────────
  const C = {
    fg:     isOrange ? '#0a0a0a'             : '#ffffff',
    acc:    isOrange ? '#0a0a0a'             : ACCENT,
    muted:  isOrange ? 'rgba(0,0,0,0.40)'   : 'rgba(255,255,255,0.22)',
    rule:   isOrange ? 'rgba(0,0,0,0.10)'   : 'rgba(255,255,255,0.06)',
    fill:   isOrange ? 'rgba(0,0,0,0.15)'   : 'rgba(255,255,255,0.1)',
    brkt:   isOrange ? 'rgba(0,0,0,0.28)'   : 'rgba(255,255,255,0.18)',
  };

  const CT = (prop = 'color') => `${prop} ${ORANGE_FLASH}ms ease`;
  const pct = Math.floor(progress * 100);

  // Sub-range progress values
  const pRonit  = sub(progress, 0.05, 0.38);
  const pMexson = sub(progress, 0.18, 0.52);
  const pSep    = sub(progress, 0.32, 0.62);
  const pTag    = sub(progress, 0.58, 0.82);
  const pBrkt   = sub(progress, 0.08, 0.45);
  const pRules  = sub(progress, 0.0,  0.75);
  const pStatus = sub(progress, 0.12, 0.40);

  return (
    <div
      aria-hidden="true"
      style={{
        position:        'fixed',
        inset:            0,
        zIndex:           99999,
        backgroundColor:  isOrange ? ACCENT : '#0a0a0a',
        display:          'flex',
        flexDirection:    'column',
        alignItems:       'center',
        justifyContent:   'center',
        overflow:         'hidden',
        transition:
          `background-color ${ORANGE_FLASH}ms ease, ` +
          `transform ${EXIT_SLIDE}ms cubic-bezier(0.76, 0, 0.24, 1)`,
        transform:        isSliding ? 'translateY(-100%)' : 'translateY(0)',
        willChange:       'transform, background-color',
      }}
    >

      {/* ── Top progress bar ──────────────────────────────────────────────── */}
      {/*
          scaleX drives the bar so it hits exactly 1.0 at progress === 1.
          COMPLETE_HOLD gives the browser two full frames to paint scaleX(1)
          before the exit sequence begins — the bar is always visually complete.
      */}
      <div style={{
        position:        'absolute',
        top:              0, left: 0, right: 0,
        height:           '2px',
        backgroundColor:  C.acc,
        transform:        `scaleX(${progress})`,
        transformOrigin:  'left center',
        transition:       CT('background-color'),
      }} />

      {/* ── Left architectural rule ───────────────────────────────────────── */}
      <div style={{
        position:        'absolute',
        left:             'clamp(1.25rem, 3.5vw, 2.75rem)',
        top:              0, bottom: 0,
        width:            '1px',
        backgroundColor:  C.rule,
        transform:        `scaleY(${pRules})`,
        transformOrigin:  'top center',
        transition:       CT('background-color'),
      }} />

      {/* ── Right architectural rule ──────────────────────────────────────── */}
      <div style={{
        position:        'absolute',
        right:            'clamp(1.25rem, 3.5vw, 2.75rem)',
        top:              0, bottom: 0,
        width:            '1px',
        backgroundColor:  C.rule,
        transform:        `scaleY(${pRules})`,
        transformOrigin:  'top center',
        transition:       CT('background-color'),
      }} />

      {/* ── Corner brackets ───────────────────────────────────────────────── */}
      {(
        [
          { top: 'clamp(0.9rem, 2vw, 1.6rem)', left:  'clamp(1.5rem, 4vw, 3rem)', borderTop: `1px solid ${C.brkt}`, borderLeft: `1px solid ${C.brkt}`, borderRight: 'none', borderBottom: 'none' },
          { top: 'clamp(0.9rem, 2vw, 1.6rem)', right: 'clamp(1.5rem, 4vw, 3rem)', borderTop: `1px solid ${C.brkt}`, borderRight: `1px solid ${C.brkt}`, borderLeft: 'none', borderBottom: 'none' },
          { bottom: 'clamp(0.9rem, 2vw, 1.6rem)', left:  'clamp(1.5rem, 4vw, 3rem)', borderBottom: `1px solid ${C.brkt}`, borderLeft: `1px solid ${C.brkt}`, borderTop: 'none', borderRight: 'none' },
          { bottom: 'clamp(0.9rem, 2vw, 1.6rem)', right: 'clamp(1.5rem, 4vw, 3rem)', borderBottom: `1px solid ${C.brkt}`, borderRight: `1px solid ${C.brkt}`, borderTop: 'none', borderLeft: 'none' },
        ] as React.CSSProperties[]
      ).map((style, i) => (
        <div
          key={i}
          style={{
            position:     'absolute',
            width:         'clamp(0.9rem, 2vw, 1.4rem)',
            height:        'clamp(0.9rem, 2vw, 1.4rem)',
            opacity:       pBrkt,
            transition:    CT('border-color'),
            ...style,
          }}
        />
      ))}

      {/* ── Name block ────────────────────────────────────────────────────── */}
      <div style={{ textAlign: 'center', position: 'relative', userSelect: 'none' }}>

        {/* "RONIT" — clips upward from below the overflow boundary */}
        <div style={{ overflow: 'hidden', lineHeight: 0.88 }}>
          <span
            style={{
              display:     'block',
              fontFamily:  "'Bebas Neue', 'Arial Black', sans-serif",
              fontSize:    'clamp(4.5rem, 15vw, 10rem)',
              fontWeight:   400,
              letterSpacing: '0.07em',
              color:         C.fg,
              transform:    `translateY(${(1 - pRonit) * 108}%)`,
              transition:    CT(),
            }}
          >
            RONIT
          </span>
        </div>

        {/* Separator — draws outward from center */}
        <div
          style={{
            height:          '1.5px',
            backgroundColor:  C.acc,
            margin:           '0.25rem auto',
            transform:        `scaleX(${pSep})`,
            transformOrigin:  'center',
            transition:       CT('background-color'),
          }}
        />

        {/* "MEXSON" — clips upward with a slight delay */}
        <div style={{ overflow: 'hidden', lineHeight: 0.88 }}>
          <span
            style={{
              display:     'block',
              fontFamily:  "'Bebas Neue', 'Arial Black', sans-serif",
              fontSize:    'clamp(4.5rem, 15vw, 10rem)',
              fontWeight:   400,
              letterSpacing: '0.07em',
              color:         C.acc,
              transform:    `translateY(${(1 - pMexson) * 108}%)`,
              transition:    CT(),
            }}
          >
            MEXSON
          </span>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontFamily:    "'Space Mono', 'Courier New', monospace",
            fontSize:      '0.62rem',
            fontWeight:     700,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color:          C.muted,
            margin:         'clamp(1.2rem, 2.5vw, 1.8rem) 0 0',
            opacity:        pTag,
            transform:      `translateY(${(1 - pTag) * 10}px)`,
            transition:     CT(),
          }}
        >
          MERN Stack · AI Enthusiast
        </p>
      </div>

      {/* ── Bottom status bar ─────────────────────────────────────────────── */}
      <div
        style={{
          position:   'absolute',
          bottom:     'clamp(1.25rem, 3vw, 2rem)',
          left:       'clamp(1.5rem, 4vw, 3rem)',
          right:      'clamp(1.5rem, 4vw, 3rem)',
          display:    'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          opacity:    pStatus,
        }}
      >
        {/* Status label — cycles during load, locks to COMPLETE */}
        <span
          style={{
            fontFamily:    "'Space Mono', monospace",
            fontSize:      '0.58rem',
            fontWeight:     700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color:          C.muted,
            transition:    CT(),
          }}
        >
          {label}
        </span>

        {/* Percentage counter */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.2rem' }}>
          <span
            style={{
              fontFamily:         "'Space Mono', monospace",
              fontSize:           'clamp(1.2rem, 3vw, 1.9rem)',
              fontWeight:          700,
              color:               C.fg,
              fontVariantNumeric: 'tabular-nums',
              lineHeight:          1,
              transition:          CT(),
            }}
          >
            {/* Zero-padded so the counter never jumps width */}
            {String(pct).padStart(3, '0')}
          </span>
          <span
            style={{
              fontFamily:    "'Space Mono', monospace",
              fontSize:      '0.62rem',
              fontWeight:     700,
              color:          C.muted,
              transition:    CT(),
            }}
          >
            %
          </span>
        </div>
      </div>

      {/* ── Bottom edge track ─────────────────────────────────────────────── */}
      <div
        style={{
          position:        'absolute',
          bottom:           0, left: 0, right: 0,
          height:           '1px',
          backgroundColor:  C.rule,
          transition:       CT('background-color'),
        }}
      >
        <div
          style={{
            height:          '100%',
            width:           `${progress * 100}%`,
            backgroundColor:  C.fill,
            transition:      `width 0.08s linear, ${CT('background-color')}`,
          }}
        />
      </div>
    </div>
  );
}
