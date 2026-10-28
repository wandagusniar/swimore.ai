import React from 'react'

interface BubbleSpec {
  size: number
  left: number
  duration: number
  delay: number
  drift: number
  teal?: boolean
}

const BUBBLES: BubbleSpec[] = [
  { size: 4, left: 4, duration: 16, delay: -2, drift: 14 },
  { size: 7, left: 9, duration: 22, delay: -11, drift: -18, teal: true },
  { size: 5, left: 14, duration: 18, delay: -6, drift: 12 },
  { size: 11, left: 19, duration: 25, delay: -15, drift: -22 },
  { size: 4, left: 23, duration: 14, delay: -4, drift: 10, teal: true },
  { size: 15, left: 28, duration: 28, delay: -19, drift: 24 },
  { size: 6, left: 33, duration: 19, delay: -8, drift: -15 },
  { size: 9, left: 38, duration: 23, delay: -13, drift: 18, teal: true },
  { size: 5, left: 43, duration: 17, delay: -3, drift: -12 },
  { size: 13, left: 48, duration: 26, delay: -21, drift: 20 },
  { size: 4, left: 52, duration: 15, delay: -9, drift: -14, teal: true },
  { size: 8, left: 57, duration: 21, delay: -5, drift: 16 },
  { size: 18, left: 62, duration: 30, delay: -24, drift: -26 },
  { size: 5, left: 66, duration: 16, delay: -12, drift: 11, teal: true },
  { size: 10, left: 71, duration: 24, delay: -7, drift: -19 },
  { size: 6, left: 76, duration: 19, delay: -16, drift: 15 },
  { size: 14, left: 81, duration: 27, delay: -10, drift: -21, teal: true },
  { size: 4, left: 85, duration: 15, delay: -1, drift: 13 },
  { size: 9, left: 90, duration: 22, delay: -14, drift: -17 },
  { size: 12, left: 94, duration: 25, delay: -18, drift: 19, teal: true },
  { size: 5, left: 97, duration: 17, delay: -6, drift: -11 },
  { size: 7, left: 16, duration: 20, delay: -17, drift: 15 },
  { size: 6, left: 46, duration: 18, delay: -13, drift: -16, teal: true },
  { size: 8, left: 73, duration: 21, delay: -20, drift: 17 },
]

export const OceanBubbles: React.FC = () => {
  return (
    <div className="ocean-bubbles" aria-hidden="true">
      {BUBBLES.map((b, idx) => (
        <span
          key={idx}
          className={`ocean-bubble ${b.teal ? 'ocean-bubble--teal' : ''}`}
          style={
            {
              width: `${b.size}px`,
              height: `${b.size}px`,
              left: `${b.left}%`,
              animationDuration: `${b.duration}s`,
              animationDelay: `${b.delay}s`,
              '--bubble-drift': `${b.drift}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}

export default OceanBubbles
