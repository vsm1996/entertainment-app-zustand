"use client"

import type React from "react"

import { useRef } from "react"

interface CarouselProps {
  items: React.ReactNode[]
  className?: string
}

const Carousel = ({ items, className }: CarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  if (items.length === 0) return null

  return (
    <div className={`relative overflow-hidden w-full ${className}`}>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory scrollbar-hide"
      >
        {items.map((item, index) => (
          <div key={index} className="flex-shrink-0 snap-center">
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Carousel
