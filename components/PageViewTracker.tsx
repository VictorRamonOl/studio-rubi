"use client"

import { useEffect } from "react"
import { trackBlogPostView, trackServicePageView } from "@/lib/analytics"

type Props =
  | { kind: "service"; slug: string }
  | { kind: "blog"; slug: string; category: string }

export default function PageViewTracker(props: Props) {
  useEffect(() => {
    if (props.kind === "service") {
      trackServicePageView(props.slug)
    } else {
      trackBlogPostView(props.slug, props.category)
    }
  }, [props])

  return null
}
