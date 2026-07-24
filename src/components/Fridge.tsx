import { forwardRef, type ReactNode } from 'react'

interface FridgeProps {
  children: ReactNode
}

// Rounded silhouette: generous top curve, tighter base — classic retro fridge profile.
const BODY_PATH =
  'M72,6 H248 A64,64 0 0 1 312,70 V550 A22,22 0 0 1 290,572 H30 A22,22 0 0 1 8,550 V70 A64,64 0 0 1 72,6 Z'

export const Fridge = forwardRef<HTMLDivElement, FridgeProps>(function Fridge(
  { children },
  canvasRef,
) {
  return (
    <div className="relative mx-auto h-full w-full max-w-[360px] select-none sm:max-w-[380px]">
      <svg
        viewBox="0 0 320 580"
        className="absolute inset-0 h-full w-full"
        style={{
          filter:
            'drop-shadow(0 24px 48px rgba(50,38,22,0.3)) drop-shadow(0 6px 14px rgba(50,38,22,0.18))',
        }}
        aria-hidden="true"
      >
        <defs>
          <clipPath id="bodyClip">
            <path d={BODY_PATH} />
          </clipPath>
          <linearGradient id="chrome" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f6f6f4" />
            <stop offset="28%" stopColor="#cfcdc6" />
            <stop offset="52%" stopColor="#ffffff" />
            <stop offset="76%" stopColor="#b7b4ac" />
            <stop offset="100%" stopColor="#e9e7e1" />
          </linearGradient>
          <radialGradient id="sheen" cx="30%" cy="18%" r="55%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.32" />
            <stop offset="60%" stopColor="#ffffff" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* body */}
        <path d={BODY_PATH} fill="var(--fridge)" />
        <g clipPath="url(#bodyClip)">
          <rect x="8" y="380" width="304" height="192" fill="var(--fridge-dark)" opacity="0.45" />
          <rect x="8" y="6" width="304" height="566" fill="url(#sheen)" />

          {/* ribbed base skirt */}
          <g stroke="var(--fridge-line)" strokeWidth="2" opacity="0.45">
            <line x1="8" y1="546" x2="312" y2="546" />
            <line x1="8" y1="554" x2="312" y2="554" />
            <line x1="8" y1="562" x2="312" y2="562" />
          </g>
        </g>

        {/* feet */}
        <rect x="46" y="566" width="24" height="14" rx="6" fill="var(--fridge-foot)" />
        <rect x="250" y="566" width="24" height="14" rx="6" fill="var(--fridge-foot)" />

        {/* brand plate */}
        <text
          x="160"
          y="66"
          textAnchor="middle"
          fontSize="15"
          fontFamily="'Quicksand', sans-serif"
          fontWeight="600"
          letterSpacing="6"
          fill="var(--fridge-line)"
          opacity="0.5"
        >
          MEMORY
        </text>

        {/* freezer door */}
        <rect
          x="26"
          y="88"
          width="268"
          height="88"
          rx="20"
          fill="none"
          stroke="var(--fridge-line)"
          strokeWidth="2"
          opacity="0.6"
        />

        {/* freezer handle */}
        <rect x="40" y="160" width="210" height="16" rx="8" fill="url(#chrome)" />
        <rect x="34" y="158" width="10" height="20" rx="4" fill="var(--fridge-handle-dark)" opacity="0.5" />
        <rect x="246" y="158" width="10" height="20" rx="4" fill="var(--fridge-handle-dark)" opacity="0.5" />

        {/* main door */}
        <rect
          x="26"
          y="200"
          width="268"
          height="338"
          rx="20"
          fill="none"
          stroke="var(--fridge-line)"
          strokeWidth="2"
          opacity="0.6"
        />

        {/* main handle */}
        <rect x="40" y="210" width="210" height="18" rx="9" fill="url(#chrome)" />
        <rect x="34" y="207" width="10" height="24" rx="4" fill="var(--fridge-handle-dark)" opacity="0.5" />
        <rect x="246" y="207" width="10" height="24" rx="4" fill="var(--fridge-handle-dark)" opacity="0.5" />
      </svg>

      <div
        ref={canvasRef}
        className="absolute touch-none"
        style={{ left: '10%', top: '38%', width: '80%', height: '54%' }}
      >
        {children}
      </div>
    </div>
  )
})
