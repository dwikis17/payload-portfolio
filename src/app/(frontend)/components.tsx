import Image from 'next/image'
import Link from 'next/link'
import { RichText } from '@payloadcms/richtext-lexical/react'

import type { Category, Experience, Post, Project } from '@/payload-types'

import { getMediaUrl } from '@/lib/portfolio'

import { siteConfig } from './site-config'
import { ProjectGallery as ProjectGalleryClient } from './ProjectGallery'

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="site-mark" href="/" aria-label="Dwiki home">
        Dwiki
      </Link>
      <nav aria-label="Primary navigation" className="site-nav">
        <Link href="/#work">Work</Link>
        <Link href="/#experience">Experience</Link>
        <Link href="/#writing">Writing</Link>
        <a href={siteConfig.resumeUrl} rel="noreferrer" target="_blank">
          Resume
        </a>
      </nav>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p className="footer-kicker">Contact</p>
      <div className="footer-links">
        <a href={`mailto:${siteConfig.email}`}>Email</a>
        <a href={siteConfig.social.linkedin} rel="noreferrer" target="_blank">
          LinkedIn
        </a>
        <a href={siteConfig.social.github} rel="noreferrer" target="_blank">
          GitHub
        </a>
      </div>
    </footer>
  )
}

export function formatMonth(value: string | null | undefined) {
  if (!value) return ''

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    timeZone: 'UTC',
    year: 'numeric',
  }).format(new Date(value))
}

export function formatDateRange(
  startDate: string,
  endDate?: string | null,
  current?: boolean | null,
) {
  return `${formatMonth(startDate)} - ${current ? 'Present' : formatMonth(endDate)}`
}

function getProjectImages(project: Project) {
  const cover =
    getMediaUrl(project.cover) ??
    (project.slug === 'eyespeak-assistive-tech' ? '/portfolio/eyespeak.webp' : null)
  const images = [
    cover ? { alt: `${project.title} project preview`, url: cover } : null,
    ...(project.gallery ?? []).map((media) => {
      const url = getMediaUrl(media)
      if (!url) return null

      return {
        alt:
          media && typeof media !== 'number' && media.alt
            ? media.alt
            : `${project.title} project image`,
        url,
      }
    }),
  ].filter((image): image is { alt: string; url: string } => Boolean(image))

  return images.filter((image, index) => images.findIndex(({ url }) => url === image.url) === index)
}

function getProjectCover(project: Project) {
  return getProjectImages(project)[0]?.url ?? null
}

function getProjectTechnologies(project: Project) {
  return project.technologies
    ?.map(({ technology }) => technology)
    .filter(Boolean)
    .join(' / ')
}

export function ProjectCard({
  project,
  featured = false,
}: {
  project: Project
  featured?: boolean
}) {
  const cover = getProjectCover(project)

  return (
    <article className={`project-card${featured ? ' project-card-featured' : ''}`}>
      <Link className="project-card-link" href={`/projects/${project.slug}`}>
        {cover && (
          <div className="project-card-image">
            <Image
              alt={`${project.title} project preview`}
              fill
              sizes={featured ? '(max-width: 760px) 100vw, 62vw' : '(max-width: 760px) 100vw, 42vw'}
              src={cover}
            />
          </div>
        )}
        <div className="project-card-body">
          <div className="project-card-heading">
            <p className="project-year">{project.year}</p>
            <h3>{project.title}</h3>
          </div>
          <p className="project-impact">{project.impact}</p>
          <div className="project-card-meta">
            <span>{project.role}</span>
            {getProjectTechnologies(project) && <span>{getProjectTechnologies(project)}</span>}
          </div>
        </div>
      </Link>
    </article>
  )
}

export function ProjectGallery({ project }: { project: Project }) {
  const images = getProjectImages(project)
  if (!images.length) return null

  return <ProjectGalleryClient images={images} title={project.title} />
}

export function ExperienceRow({ experience }: { experience: Experience }) {
  return (
    <article className="experience-row">
      <div className="experience-heading">
        <h3>
          {experience.role} <span>at {experience.company}</span>
        </h3>
        <p>{formatDateRange(experience.startDate, experience.endDate, experience.current)}</p>
      </div>
      <div className="experience-detail">
        <p className="experience-meta">
          {[experience.employmentType, experience.location].filter(Boolean).join(' / ')}
        </p>
        <ul>
          {experience.highlights?.map(({ highlight, id }) => (
            <li key={id ?? highlight}>{highlight}</li>
          ))}
        </ul>
        {experience.links?.length ? (
          <div className="inline-links">
            {experience.links.map(({ label, url, id }) => (
              <a href={url} key={id ?? url} rel="noreferrer" target="_blank">
                {label}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  )
}

export function CategoryNav({ categories, activeSlug }: { categories: Category[]; activeSlug?: string }) {
  return (
    <nav aria-label="Writing categories" className="category-nav">
      <Link
        aria-current={activeSlug === undefined ? 'page' : undefined}
        className={`category-link${activeSlug === undefined ? ' category-link-active' : ''}`}
        href="/blog"
      >
        All notes
      </Link>
      {categories.map((category) => (
        <Link
          aria-current={activeSlug === category.slug ? 'page' : undefined}
          className={`category-link${activeSlug === category.slug ? ' category-link-active' : ''}`}
          href={`/blog/category/${category.slug}`}
          key={category.id}
        >
          {category.name}
        </Link>
      ))}
    </nav>
  )
}

export function PostCategoryLinks({ post }: { post: Post }) {
  const categories = (post.categories ?? []).filter(
    (category): category is Category => typeof category !== 'number',
  )

  if (!categories.length) return null

  return (
    <nav aria-label={`${post.title} categories`} className="post-categories">
      {categories.map((category) => (
        <Link href={`/blog/category/${category.slug}`} key={category.id}>
          {category.name}
        </Link>
      ))}
    </nav>
  )
}

export function PostRow({ post }: { post: Post }) {
  return (
    <article className="post-row">
      <Link className="post-row-link" href={`/blog/${post.slug}`}>
        <div>
          <p className="post-date">{post.publishedAt ? formatMonth(post.publishedAt) : 'Draft'}</p>
          <h3>{post.title}</h3>
        </div>
        <p className="post-excerpt">{post.excerpt}</p>
        <span className="arrow-link">Read</span>
      </Link>
      <PostCategoryLinks post={post} />
    </article>
  )
}

export function RichTextContent({
  data,
}: {
  data: NonNullable<Project['content']> | NonNullable<Post['content']>
}) {
  return (
    <div className="rich-text">
      <RichText data={data} />
    </div>
  )
}
