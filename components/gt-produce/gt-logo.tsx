"use client"

import Image from 'next/image'

interface GTLogoProps {
  height?: number
  className?: string
}

// Using placeholder for now - you'll need to add your actual logo images
export function GTLogo({ height = 42, className = '' }: GTLogoProps) {
  return (
    <span className={`gt-logo-wrap ${className}`}>
      {/* Light mode logo */}
      <Image
        src="/gt-logo-light.png"
        alt="GT Produce"
        width={height * 3}
        height={height}
        className="gt-logo-light gt-logo-img"
        priority
      />
      {/* Dark mode logo */}
      <Image
        src="/gt-logo-dark.png"
        alt="GT Produce"
        width={height * 3}
        height={height}
        className="gt-logo-dark gt-logo-img"
        priority
      />
    </span>
  )
}

// Fallback SVG logo if images aren't available
export function GTLogoSVG({ height = 42, className = '' }: GTLogoProps) {
  return (
    <span className={`gt-logo-wrap ${className}`}>
      <svg
        viewBox="0 0 300 100"
        style={{ height: `${height}px`, width: 'auto' }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <text
          x="10"
          y="70"
          fontFamily="Cormorant Garamond, serif"
          fontSize="60"
          fontWeight="600"
          fill="var(--green)"
        >
          GT
        </text>
        <text
          x="100"
          y="70"
          fontFamily="Cormorant Garamond, serif"
          fontSize="40"
          fontWeight="400"
          fill="var(--text)"
        >
          PRODUCE
        </text>
      </svg>
    </span>
  )
}
