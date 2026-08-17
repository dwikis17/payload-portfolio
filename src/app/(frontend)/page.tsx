import Link from 'next/link'

import { ExperienceRow, PostRow, ProjectCard, SiteFooter, SiteHeader } from './components'
import { getExperiences, getPosts, getProjects } from '@/lib/portfolio'
import './styles.css'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const [projects, experiences, posts] = await Promise.all([
    getProjects({ featuredOnly: true, limit: 3 }),
    getExperiences(5),
    getPosts(3),
  ])

  return (
    <div className="site-shell">
      <SiteHeader />

      <main>
        <header className="portfolio-intro" aria-labelledby="intro-title">
          <p className="eyebrow">Hi, I&apos;m Dwiki.</p>
          <h1 id="intro-title">A lifelong learner and software engineer.</h1>
          <p>
            I&apos;m currently learning about AI and machine learning. See my journey through the
            projects, experience, and notes below.
          </p>
        </header>

        <section className="content-section" id="work" aria-labelledby="work-title">
          <div className="section-heading">
            <h2 id="work-title">Selected projects</h2>
            <p>A few products and experiments across iOS, web, and applied AI.</p>
          </div>
          {projects.length ? (
            <div className="project-grid">
              {projects.map((project, index) => (
                <ProjectCard featured={index === 0} key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <p className="empty-state">Projects will appear here soon.</p>
          )}
          <Link className="section-link" href="/projects">
            View all projects
          </Link>
        </section>

        <section className="content-section" id="experience" aria-labelledby="experience-title">
          <div className="section-heading">
            <h2 id="experience-title">Experience</h2>
            <p>Roles where I learned to move from product questions to production systems.</p>
          </div>
          {experiences.length ? (
            <div className="experience-list">
              {experiences.map((experience) => (
                <ExperienceRow key={experience.id} experience={experience} />
              ))}
            </div>
          ) : (
            <p className="empty-state">Experience will appear here soon.</p>
          )}
        </section>

        <section
          className="content-section writing-section"
          id="writing"
          aria-labelledby="writing-title"
        >
          <div className="section-heading">
            <h2 id="writing-title">Writing</h2>
            <p>Notes on building software, working across platforms, and learning in public.</p>
          </div>
          {posts.length ? (
            <div className="post-list">
              {posts.map((post) => (
                <PostRow key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p className="empty-state">No published notes yet.</p>
          )}
          <Link className="section-link" href="/blog">
            Read all writing
          </Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
