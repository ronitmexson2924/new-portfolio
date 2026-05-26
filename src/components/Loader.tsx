import { useEffect, useState } from 'react';

const LOADER_DURATION = 2400; // ms before exit starts
const EXIT_DURATION   = 800;  // ms for slide-up exit

export default function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting]   = useState(false);
  const [gone, setGone]         = useState(false);

  useEffect(() => {
    // Animate progress bar from 0 → 100 over LOADER_DURATION
    const start   = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct     = Math.min(elapsed / LOADER_DURATION, 1);
      // Ease-out curve so it feels natural
      setProgress(1 - Math.pow(1 - pct, 3));

      if (pct < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        // Begin exit
        setExiting(true);
        setTimeout(() => {
          setGone(true);
          onDone();
        }, EXIT_DURATION);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  if (gone) return null;

  const name   = ['R', 'O', 'N', 'I', 'T'];
  const name2  = ['M', 'E', 'X', 'S', 'O', 'N'];

  return (
    <div
      aria-hidden="true"
      style={{
        position:   'fixed',
        inset:       0,
        zIndex:      99999,
        background:  '#0a0a0a',
        display:     'flex',
        flexDirection:'column',
        alignItems:  'center',
        justifyContent:'center',
        gap:          '2.5rem',
        // Slide-up exit
        transition:  `transform ${EXIT_DURATION}ms cubic-bezier(0.76, 0, 0.24, 1), opacity ${EXIT_DURATION}ms ease`,
        transform:   exiting ? 'translateY(-100%)' : 'translateY(0)',
        opacity:     exiting ? 0 : 1,
        willChange:  'transform, opacity',
      }}
    >
      {/* ── Top accent line ── */}
      <div
        style={{
          position:   'absolute',
          top:         0,
          left:        0,
          right:       0,
          height:      '2px',
          background:  '#FD5201',
          transform:  `scaleX(${progress})`,
          transformOrigin: 'left center',
          transition:  'transform 0.1s linear',
        }}
      />

      {/* ── Monogram / name block ── */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>

        {/* Letters: RONIT */}
        <div style={{ display: 'flex', gap: '0.15em', overflow: 'hidden' }}>
          {name.map((ch, i) => (
            <span
              key={i}
              style={{
                display:    'block',
                fontSize:   'clamp(3rem, 10vw, 7rem)',
                fontWeight:  900,
                lineHeight:  1,
                color:       '#fff',
                letterSpacing: '-0.04em',
                fontFamily:  'system-ui, sans-serif',
                transform:   progress > i * 0.12 ? 'translateY(0)' : 'translateY(110%)',
                opacity:     progress > i * 0.12 ? 1 : 0,
                transition:  'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease',
                transitionDelay: `${i * 0.04}s`,
              }}
            >
              {ch}
            </span>
          ))}
        </div>

        {/* Letters: MEXSON — in accent orange */}
        <div style={{ display: 'flex', gap: '0.15em', overflow: 'hidden' }}>
          {name2.map((ch, i) => (
            <span
              key={i}
              style={{
                display:    'block',
                fontSize:   'clamp(3rem, 10vw, 7rem)',
                fontWeight:  900,
                lineHeight:  1,
                color:       '#FD5201',
                letterSpacing: '-0.04em',
                fontFamily:  'system-ui, sans-serif',
                transform:   progress > 0.15 + i * 0.1 ? 'translateY(0)' : 'translateY(110%)',
                opacity:     progress > 0.15 + i * 0.1 ? 1 : 0,
                transition:  'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease',
                transitionDelay: `${i * 0.04}s`,
              }}
            >
              {ch}
            </span>
          ))}
        </div>
      </div>

      {/* ── Tagline ── */}
      <p
        style={{
          fontSize:    '0.7rem',
          fontWeight:   700,
          letterSpacing:'0.25em',
          textTransform:'uppercase',
          color:        'rgba(255,255,255,0.3)',
          fontFamily:   'system-ui, sans-serif',
          opacity:      progress > 0.5 ? 1 : 0,
          transform:    progress > 0.5 ? 'translateY(0)' : 'translateY(8px)',
          transition:   'opacity 0.5s ease, transform 0.5s ease',
        }}
      >
        MERN Stack · AI Enthusiast
      </p>

      {/* ── Progress counter ── */}
      <div
        style={{
          position:   'absolute',
          bottom:      '2rem',
          right:       '2.5rem',
          display:     'flex',
          alignItems:  'baseline',
          gap:         '0.25rem',
        }}
      >
        <span
          style={{
            fontSize:   'clamp(1.5rem, 4vw, 2.5rem)',
            fontWeight:  900,
            color:       '#fff',
            fontFamily:  'system-ui, sans-serif',
            fontVariantNumeric: 'tabular-nums',
            lineHeight:  1,
          }}
        >
          {Math.floor(progress * 100)}
        </span>
        <span
          style={{
            fontSize:  '0.75rem',
            fontWeight: 700,
            color:      'rgba(255,255,255,0.3)',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          %
        </span>
      </div>

      {/* ── Bottom progress bar track ── */}
      <div
        style={{
          position:   'absolute',
          bottom:      0,
          left:        0,
          right:       0,
          height:      '1px',
          background:  'rgba(255,255,255,0.06)',
        }}
      >
        <div
          style={{
            height:          '100%',
            background:      'rgba(255,255,255,0.2)',
            width:           `${progress * 100}%`,
            transition:      'width 0.1s linear',
          }}
        />
      </div>
    </div>
  );
}
