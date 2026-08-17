import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { CategoryNav, PostRow, SiteFooter, SiteHeader } from '../../../components'
import { getCategories, getCategory, getPosts } from '@/lib/portfolio'

export const dynamic = 'force-dynamic'

type CategoryPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategory(slug)

  return {
    description: category ? `Notes about ${category.name}.` : 'Writing category',
    title: category ? `${category.name} | Writing | Dwiki` : 'Writing | Dwiki',
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const [category, categories] = await Promise.all([getCategory(slug), getCategories()])

  if (!category) notFound()

  const posts = await getPosts({ categoryId: category.id })

  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="detail-page blog-index">
        <Link className="back-link" href="/blog">
          Back to writing
        </Link>
        <header className="detail-header">
          <p className="eyebrow">Writing / {category.name}</p>
          <h1>{category.name}</h1>
          <p>Notes from this part of the journey.</p>
        </header>
        <CategoryNav activeSlug={category.slug} categories={categories} />
        {posts.length ? (
          <div className="post-list">
            {posts.map((post) => (
              <PostRow key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="empty-state">No published notes in this category yet.</p>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}
