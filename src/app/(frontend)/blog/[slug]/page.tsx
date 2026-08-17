import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { RichTextContent, SiteFooter, SiteHeader, formatMonth } from '../../components'
import { getMediaUrl, getPost } from '@/lib/portfolio'

export const dynamic = 'force-dynamic'

type BlogPostPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  return {
    description: post?.excerpt,
    title: post ? `${post.title} | Dwiki` : 'Writing | Dwiki',
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) notFound()

  const cover = getMediaUrl(post.cover)

  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="detail-page blog-index">
        <Link className="back-link" href="/blog">
          Back to writing
        </Link>
        <header className="detail-header">
          <p className="eyebrow">{post.publishedAt ? formatMonth(post.publishedAt) : 'Draft'}</p>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
        </header>
        {cover ? (
          <div className="detail-cover">
            <Image
              alt={`${post.title} cover`}
              fill
              sizes="(max-width: 760px) 100vw, 760px"
              src={cover}
            />
          </div>
        ) : null}
        <RichTextContent data={post.content} />
      </main>
      <SiteFooter />
    </div>
  )
}
