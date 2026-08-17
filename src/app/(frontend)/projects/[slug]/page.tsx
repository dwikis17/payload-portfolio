import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ProjectGallery, RichTextContent, SiteFooter, SiteHeader } from '../../components'
import { getProject } from '@/lib/portfolio'

export const dynamic = 'force-dynamic'

type ProjectPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)

  return {
    description: project?.impact,
    title: project ? `${project.title} | Dwiki` : 'Project | Dwiki',
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) notFound()

  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="detail-page">
        <Link className="back-link" href="/projects">
          Back to projects
        </Link>
        <header className="detail-header">
          <p className="eyebrow">{project.year}</p>
          <h1>{project.title}</h1>
          <p>{project.summary}</p>
        </header>
        <div className="detail-layout">
          <aside className="detail-aside">
            <dl>
              <dt>Role</dt>
              <dd>{project.role}</dd>
              <dt>Year</dt>
              <dd>{project.year}</dd>
            </dl>
            {project.technologies?.length ? (
              <>
                <h2>Technologies</h2>
                <ul>
                  {project.technologies.map(({ technology, id }) => (
                    <li key={id ?? technology}>{technology}</li>
                  ))}
                </ul>
              </>
            ) : null}
            {project.links?.length ? (
              <div className="inline-links">
                {project.links.map(({ label, url, id }) => (
                  <a href={url} key={id ?? url} rel="noreferrer" target="_blank">
                    {label}
                  </a>
                ))}
              </div>
            ) : null}
          </aside>
          <div className="detail-content">
            <ProjectGallery project={project} />
            <p className="project-impact detail-impact">{project.impact}</p>
            <RichTextContent data={project.content} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
