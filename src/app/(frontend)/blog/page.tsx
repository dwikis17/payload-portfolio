import Link from 'next/link'

import { PostRow, SiteFooter, SiteHeader } from '../components'
import { getPosts } from '@/lib/portfolio'

export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="detail-page blog-index">
        <Link className="back-link" href="/">
          Back home
        </Link>
        <header className="detail-header">
          <p className="eyebrow">Writing</p>
          <h1>Notes from the work.</h1>
          <p>Short notes on building software, working across platforms, and learning in public.</p>
        </header>
        {posts.length ? (
          <div className="post-list">
            {posts.map((post) => (
              <PostRow key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="empty-state">No published notes yet.</p>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}
