import { forwardRef, type ReactNode } from 'react'

interface FridgeProps {
  children: ReactNode
}

export const Fridge = forwardRef<HTMLDivElement, FridgeProps>(function Fridge(
  { children },
  canvasRef,
) {
  return (
    <div className="relative mx-auto h-full w-full max-w-[420px] select-none sm:max-w-[440px]">
      <svg
        viewBox="0 0 380 540"
        className="absolute inset-0 h-full w-full"
        style={{ filter: 'drop-shadow(0 22px 45px rgba(50,38,22,0.28)) drop-shadow(0 6px 14px rgba(50,38,22,0.18))' }}
        aria-hidden="true"
      >
        {/* body */}
        <rect x="10" y="10" width="360" height="500" rx="38" fill="var(--fridge)" />
        <rect x="10" y="330" width="360" height="180" rx="38" fill="var(--fridge-dark)" opacity="0.55" />
        <rect x="10" y="10" width="360" height="500" rx="38" fill="url(#glass)" />

        {/* feet */}
        <rect x="52" y="500" width="26" height="22" rx="8" fill="var(--fridge-foot)" />
        <rect x="302" y="500" width="26" height="22" rx="8" fill="var(--fridge-foot)" />

        {/* freezer door */}
        <rect
          x="30"
          y="30"
          width="320"
          height="118"
          rx="22"
          fill="none"
          stroke="var(--fridge-line)"
          strokeWidth="2"
        />
        <rect x="34" y="34" width="60" height="30" rx="14" fill="#ffffff" opacity="0.12" />

        {/* freezer handle */}
        <rect
          x="308"
          y="52"
          width="12"
          height="74"
          rx="6"
          fill="var(--fridge-handle)"
          stroke="var(--fridge-handle-dark)"
          strokeWidth="1"
        />

        {/* main door outline */}
        <rect
          x="30"
          y="164"
          width="320"
          height="328"
          rx="24"
          fill="none"
          stroke="var(--fridge-line)"
          strokeWidth="2"
        />
        <rect x="34" y="168" width="70" height="34" rx="16" fill="#ffffff" opacity="0.1" />

        {/* main handle */}
        <rect
          x="308"
          y="196"
          width="14"
          height="108"
          rx="7"
          fill="var(--fridge-handle)"
          stroke="var(--fridge-handle-dark)"
          strokeWidth="1"
        />

        {/* little brand plate */}
        <text
          x="190"
          y="120"
          textAnchor="middle"
          fontSize="13"
          fontFamily="'Caveat', cursive"
          fill="var(--fridge-line)"
          opacity="0.7"
        >
          memory fridge
        </text>

        <defs>
          <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.16" />
            <stop offset="35%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.05" />
          </linearGradient>
        </defs>
      </svg>

      <div
        ref={canvasRef}
        className="absolute touch-none"
        style={{ left: '8%', top: '30.5%', width: '84%', height: '61%' }}
      >
        {children}
      </div>
    </div>
  )
})
