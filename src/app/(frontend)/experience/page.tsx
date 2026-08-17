import Link from 'next/link'

import { ExperienceRow, SiteFooter, SiteHeader } from '../components'
import { getExperiences } from '@/lib/portfolio'

export const dynamic = 'force-dynamic'

export default async function ExperiencePage() {
  const experiences = await getExperiences()

  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="detail-page">
        <Link className="back-link" href="/">
          Back home
        </Link>
        <header className="detail-header">
          <p className="eyebrow">Experience</p>
          <h1>Roles and outcomes.</h1>
          <p>A timeline of the teams, products, and systems I have worked on.</p>
        </header>
        {experiences.length ? (
          <div className="experience-list">
            {experiences.map((experience) => (
              <ExperienceRow experience={experience} key={experience.id} />
            ))}
          </div>
        ) : (
          <p className="empty-state">Experience will appear here soon.</p>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}
