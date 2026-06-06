import { NextResponse } from "next/server"
import { getPostBySlug } from "@/data/blog"
import { generateCaption } from "@/lib/instagram/caption"

export const runtime = "nodejs"

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  const post = getPostBySlug(params.slug)
  if (!post) {
    return new NextResponse("Post not found", { status: 404 })
  }
  return new NextResponse(generateCaption(post), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  })
}
