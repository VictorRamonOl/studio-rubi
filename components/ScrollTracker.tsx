"use client"

import { useEffect, useRef } from "react"
import { trackScrollDepth } from "@/lib/analytics"

const THRESHOLDS: Array<25 | 50 | 75 | 90> = [25, 50, 75, 90]

export default function ScrollTracker() {
  const fired = useRef<Set<number>>(new Set())

  useEffect(() => {
    function onScroll() {
      const doc = document.documentElement
      const scrolled = window.scrollY + window.innerHeight
      const total = doc.scrollHeight
      if (total <= 0) return
      const pct = (scrolled / total) * 100

      for (const threshold of THRESHOLDS) {
        if (pct >= threshold && !fired.current.has(threshold)) {
          fired.current.add(threshold)
          trackScrollDepth(threshold)
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return null
}
