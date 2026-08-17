import Link from 'next/link'

import { ProjectCard, SiteFooter, SiteHeader } from '../components'
import { getProjects } from '@/lib/portfolio'

export const dynamic = 'force-dynamic'

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="detail-page">
        <Link className="back-link" href="/">
          Back home
        </Link>
        <header className="detail-header">
          <p className="eyebrow">Work</p>
          <h1>Projects</h1>
          <p>Products and experiments built across iOS, web, and applied AI.</p>
        </header>
        {projects.length ? (
          <div className="project-grid">
            {projects.map((project, index) => (
              <ProjectCard featured={index === 0} key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <p className="empty-state">Projects will appear here soon.</p>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}
