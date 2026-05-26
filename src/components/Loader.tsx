import { useEffect, useState } from 'react';

// ─── Timing constants ─────────────────────────────────────────────────────────
const LOADER_DURATION  = 2400;  // ms – progress 0 → 100
const COMPLETE_HOLD    = 380;   // ms – sit at 100% so the bar finishes visually
const ORANGE_FLASH     = 320;   // ms – background transitions to #FD5201
const EXIT_SLIDE       = 720;   // ms – orange curtain wipes up off screen
const ACCENT           = '#FD5201';

// Four distinct phases make each visual effect crisply separated
type Phase = 'loading' | 'complete' | 'flashing' | 'sliding' | 'gone';

export default function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase]       = useState<Phase>('loading');

  useEffect(() => {
    const start = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const pct   = Math.min((now - start) / LOADER_DURATION, 1);
      const eased = 1 - Math.pow(1 - pct, 3); // ease-out cubic
      setProgress(eased);

      if (pct < 1) {
        raf = requestAnimationFrame(tick);
        return;
      }

      // Lock to exactly 1 so counter shows "100" cleanly
      setProgress(1);
      setPhase('complete');

      // ① Hold at 100% — bar & counter are fully visible
      setTimeout(() => {
        setPhase('flashing');

        // ② Background fades to #FD5201
        setTimeout(() => {
          setPhase('sliding');

          // ③ Orange curtain wipes up, revealing site beneath
          setTimeout(() => {
            setPhase('gone');
            onDone();
          }, EXIT_SLIDE);
        }, ORANGE_FLASH);
      }, COMPLETE_HOLD);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  if (phase === 'gone') return null;

  const isOrange  = phase === 'flashing' || phase === 'sliding';
  const isSliding = phase === 'sliding';

  // All colours invert when bg turns orange so everything stays readable
  const colorFg1    = isOrange ? '#0a0a0a'              : '#fff';
  const colorFg2    = isOrange ? '#0a0a0a'              : ACCENT;
  const colorMuted  = isOrange ? 'rgba(0,0,0,0.35)'    : 'rgba(255,255,255,0.3)';
  const colorTrack  = isOrange ? 'rgba(0,0,0,0.08)'    : 'rgba(255,255,255,0.06)';
  const colorFill   = isOrange ? 'rgba(0,0,0,0.18)'    : 'rgba(255,255,255,0.2)';
  const colorAccBar = isOrange ? '#0a0a0a'              : ACCENT;

  // Per-letter stagger for entrance only; color transition has 0s delay so flash is instant
  const letterTransition = (i: number) =>
    `transform 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.04}s, ` +
    `opacity 0.4s ease ${i * 0.04}s, ` +
    `color ${ORANGE_FLASH}ms ease 0s`;

  const name1 = ['R', 'O', 'N', 'I', 'T'];
  const name2 = ['M', 'E', 'X', 'S', 'O', 'N'];

  return (
    <div
      aria-hidden="true"
      style={{
        position:       'fixed',
        inset:           0,
        zIndex:          99999,
        background:      isOrange ? ACCENT : '#0a0a0a',
        display:         'flex',
        flexDirection:   'column',
        alignItems:      'center',
        justifyContent:  'center',
        gap:             '2.5rem',
        // bg fades during flash; then translate kicks in during slide
        transition:
          `background ${ORANGE_FLASH}ms ease, ` +
          `transform ${EXIT_SLIDE}ms cubic-bezier(0.76, 0, 0.24, 1)`,
        transform:       isSliding ? 'translateY(-100%)' : 'translateY(0)',
        willChange:      'transform, background',
      }}
    >

      {/* ── Top accent bar ────────────────────────────────────────────────── */}
      {/*
          Uses scaleX so the bar is always pixel-perfect at full width when
          progress === 1. The 0.1 s linear lag only matters mid-animation.
          COMPLETE_HOLD (380 ms) gives the browser plenty of time to render
          scaleX(1) before the exit sequence even starts.
      */}
      <div
        style={{
          position:        'absolute',
          top:              0,
          left:             0,
          right:            0,
          height:           '2px',
          background:       colorAccBar,
          transform:        `scaleX(${progress})`,
          transformOrigin:  'left center',
          transition:
            `transform 0.1s linear, ` +
            `background ${ORANGE_FLASH}ms ease`,
        }}
      />

      {/* ── Name block ────────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>

        {/* RONIT — white / dark */}
        <div style={{ display: 'flex', gap: '0.15em', overflow: 'hidden' }}>
          {name1.map((ch, i) => (
            <span
              key={i}
              style={{
                display:       'block',
                fontSize:      'clamp(3rem, 10vw, 7rem)',
                fontWeight:     900,
                lineHeight:     1,
                color:          colorFg1,
                letterSpacing: '-0.04em',
                fontFamily:    'system-ui, sans-serif',
                transform:      progress > i * 0.12 ? 'translateY(0)' : 'translateY(110%)',
                opacity:        progress > i * 0.12 ? 1 : 0,
                transition:     letterTransition(i),
              }}
            >
              {ch}
            </span>
          ))}
        </div>

        {/* MEXSON — accent / dark */}
        <div style={{ display: 'flex', gap: '0.15em', overflow: 'hidden' }}>
          {name2.map((ch, i) => (
            <span
              key={i}
              style={{
                display:       'block',
                fontSize:      'clamp(3rem, 10vw, 7rem)',
                fontWeight:     900,
                lineHeight:     1,
                color:          colorFg2,
                letterSpacing: '-0.04em',
                fontFamily:    'system-ui, sans-serif',
                transform:      progress > 0.15 + i * 0.1 ? 'translateY(0)' : 'translateY(110%)',
                opacity:        progress > 0.15 + i * 0.1 ? 1 : 0,
                transition:     letterTransition(i),
              }}
            >
              {ch}
            </span>
          ))}
        </div>
      </div>

      {/* ── Tagline ───────────────────────────────────────────────────────── */}
      <p
        style={{
          fontSize:      '0.7rem',
          fontWeight:     700,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color:          colorMuted,
          fontFamily:    'system-ui, sans-serif',
          margin:         0,
          opacity:        progress > 0.5 ? 1 : 0,
          transform:      progress > 0.5 ? 'translateY(0)' : 'translateY(8px)',
          transition:
            `opacity 0.5s ease, ` +
            `transform 0.5s ease, ` +
            `color ${ORANGE_FLASH}ms ease`,
        }}
      >
        MERN Stack · AI Enthusiast
      </p>

      {/* ── Progress counter ──────────────────────────────────────────────── */}
      <div
        style={{
          position:   'absolute',
          bottom:     '2rem',
          right:      '2.5rem',
          display:    'flex',
          alignItems: 'baseline',
          gap:        '0.25rem',
        }}
      >
        <span
          style={{
            fontSize:           'clamp(1.5rem, 4vw, 2.5rem)',
            fontWeight:          900,
            color:               colorFg1,
            fontFamily:         'system-ui, sans-serif',
            fontVariantNumeric: 'tabular-nums',
            lineHeight:          1,
            transition:         `color ${ORANGE_FLASH}ms ease`,
          }}
        >
          {Math.floor(progress * 100)}
        </span>
        <span
          style={{
            fontSize:   '0.75rem',
            fontWeight:  700,
            color:       colorMuted,
            fontFamily: 'system-ui, sans-serif',
            transition: `color ${ORANGE_FLASH}ms ease`,
          }}
        >
          %
        </span>
      </div>

      {/* ── Bottom progress bar track ─────────────────────────────────────── */}
      <div
        style={{
          position:   'absolute',
          bottom:      0,
          left:        0,
          right:       0,
          height:     '1px',
          background:  colorTrack,
          transition: `background ${ORANGE_FLASH}ms ease`,
        }}
      >
        <div
          style={{
            height:     '100%',
            background:  colorFill,
            width:      `${progress * 100}%`,
            transition:
              `width 0.1s linear, ` +
              `background ${ORANGE_FLASH}ms ease`,
          }}
        />
      </div>
    </div>
  );
}
