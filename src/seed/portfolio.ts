import type { Experience, Post, Project } from '../payload-types'
import type { Payload, PayloadRequest } from 'payload'

type ProjectSeed = Omit<Project, 'id' | 'updatedAt' | 'createdAt'>
type ExperienceSeed = Omit<Experience, 'id' | 'updatedAt' | 'createdAt'>
type PostSeed = Omit<Post, 'id' | 'updatedAt' | 'createdAt'>

const richText = (...paragraphs: string[]): Project['content'] => ({
  root: {
    type: 'root',
    children: paragraphs.map((text) => ({
      type: 'paragraph',
      children: [
        {
          detail: 0,
          format: 0,
          mode: 'normal',
          style: '',
          text,
          type: 'text',
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    })),
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  },
})

export const portfolioSeed: {
  projects: ProjectSeed[]
  experiences: ExperienceSeed[]
  posts: PostSeed[]
} = {
  projects: [
    {
      title: 'Eyespeak | Assistive Tech',
      slug: 'eyespeak-assistive-tech',
      summary:
        'An iPadOS AAC app that gives people with motor neuron diseases another way to communicate.',
      role: 'iOS Engineer',
      impact:
        'Facial-expression controls turn small, intentional movements into a practical communication interface.',
      year: 2026,
      technologies: [
        { technology: 'Swift' },
        { technology: 'SwiftUI' },
        { technology: 'iPadOS' },
        { technology: 'ARKit' },
      ],
      links: [
        {
          label: 'App Store',
          url: 'https://apps.apple.com/id/app/eyespeak-assistive-tech/id6755292635?l=id',
        },
        { label: 'Website', url: 'https://www.eyespeakapp.com/' },
      ],
      content: richText(
        'Eyespeak is an iPadOS augmentative and alternative communication app for people with motor neuron diseases.',
        'The interface uses facial expressions such as winks, eyebrow raises, and puckers as input. SwiftData keeps the experience local and responsive, while accessibility details such as VoiceOver support remain part of the product rather than an afterthought.',
      ),
      featured: true,
      order: 1,
    },
    {
      title: 'Revalue Academy | iOS',
      slug: 'revalue-academy-ios',
      summary: 'A learning platform that brings structured courses and protected video to iOS.',
      role: 'iOS Engineer',
      impact:
        'A modular SwiftUI app makes a large course library easier to ship and safer to distribute.',
      year: 2026,
      technologies: [
        { technology: 'Swift' },
        { technology: 'SwiftUI' },
        { technology: 'VDOCipher' },
        { technology: 'MVVM' },
        { technology: 'APNs' },
        { technology: 'Firebase' },
      ],
      links: [
        { label: 'Website', url: 'https://revalueacademy.id/' },
        { label: 'App Store', url: 'https://apps.apple.com/au/app/revalue-academy/id6758129854' },
      ],
      content: richText(
        'Revalue Academy is an iOS learning platform built around structured tracks and protected video lessons.',
        'The app uses Clean Architecture, MVVM, dependency injection, and VDOCipher DRM. The same codebase also supports push updates, assignment reminders, and in-app notifications for the learning experience.',
      ),
      featured: true,
      order: 2,
    },
    {
      title: 'MomoRun',
      slug: 'momorun',
      summary:
        'An endless runner controlled from Apple Watch movement and built around short play sessions.',
      role: 'iOS Developer',
      impact:
        'Motion input and procedural obstacles make a small game feel physical, immediate, and replayable.',
      year: 2025,
      technologies: [
        { technology: 'Swift' },
        { technology: 'SwiftUI' },
        { technology: 'CoreMotion' },
        { technology: 'HealthKit' },
      ],
      links: [],
      content: richText(
        'MomoRun is an endless runner made during Apple Developer Academy Bali.',
        'The game uses Apple Watch movement as its control surface, pairs it with an isometric 3D world, and generates obstacles procedurally. HealthKit integration connects the play loop back to everyday movement.',
      ),
      featured: true,
      order: 3,
    },
    {
      title: 'Findect',
      slug: 'findect',
      summary: 'A networking companion that matches event attendees through semantic search.',
      role: 'iOS & AI Engineer',
      impact:
        'Meaning-based matching helps people find relevant conversations beyond keyword overlap.',
      year: 2025,
      technologies: [
        { technology: 'Swift' },
        { technology: 'SwiftUI' },
        { technology: 'Pinecone' },
        { technology: 'RAG' },
        { technology: 'Vector DB' },
      ],
      links: [],
      content: richText(
        'Findect helps people at networking events discover the conversations most relevant to them.',
        'The product combines a SwiftUI client with a Node REST layer and a Python FastAPI service for vector search and LLM-assisted reasoning.',
      ),
      featured: false,
      order: 4,
    },
    {
      title: 'LangGraph Agent',
      slug: 'langgraph-agent',
      summary: 'A CLI research agent for exploring tool use, web search, and LLM orchestration.',
      role: 'Builder / Researcher',
      impact:
        'A small command-line workflow makes agent planning and tool integration easier to inspect.',
      year: 2026,
      technologies: [
        { technology: 'LangChain' },
        { technology: 'LangGraph' },
        { technology: 'Firecrawl' },
      ],
      links: [{ label: 'GitHub', url: 'https://github.com/dwikis17/advanced-agent-langgraph' }],
      content: richText(
        'This side project is a CLI-based AI research agent built while exploring LangChain and LangGraph.',
        'It searches the web with Firecrawl, extracts tool names with an LLM, researches official documentation, and produces recommendations. The useful part is the visible orchestration: each tool call and handoff can be inspected while the workflow runs.',
      ),
      featured: false,
      order: 5,
    },
  ],
  experiences: [
    {
      company: 'Revalue Academy',
      role: 'Fullstack & iOS Engineer',
      startDate: '2025-10-01',
      endDate: null,
      current: true,
      employmentType: 'Part time',
      location: 'Remote',
      highlights: [
        {
          highlight:
            'Built a full-stack educational platform for 1,000+ students across 5+ learning tracks with Next.js 14, Postgres, Prisma, and TanStack Query.',
        },
        {
          highlight:
            'Shipped a production SwiftUI app with VDOCipher DRM protecting 200+ hours of course content.',
        },
        {
          highlight:
            'Implemented APNs updates, assignment reminders, and in-app notifications for the student experience.',
        },
      ],
      links: [{ label: 'Website', url: 'https://revalueacademy.id/' }],
      order: 1,
    },
    {
      company: 'Apple Developer Academy',
      role: 'Apprentice',
      startDate: '2025-02-01',
      endDate: '2025-12-01',
      current: false,
      employmentType: 'Full time',
      location: 'Bali',
      highlights: [
        {
          highlight:
            'Built modular iOS apps with MVVM, Clean Architecture, and Tuist across 8 Swift packages.',
        },
        {
          highlight:
            'Worked in cross-functional teams of 5 to 6 people with Agile rituals, bi-weekly releases, and shared product ownership.',
        },
      ],
      links: [],
      order: 2,
    },
    {
      company: 'Equinox Cell Technology',
      role: 'Fullstack Engineer',
      startDate: '2024-10-01',
      endDate: '2025-01-01',
      current: false,
      employmentType: 'Full time',
      location: 'Jakarta',
      highlights: [
        {
          highlight:
            'Built Next.js and Elysia JS workflows that connected customer operations across email, Slack, and WhatsApp.',
        },
        {
          highlight:
            'Automated notification steps with Zapier, reducing manual work by 60% and response time from 4 hours to 2 hours.',
        },
      ],
      links: [{ label: 'Company', url: 'https://www.sohnne.com' }],
      order: 3,
    },
    {
      company: 'Mega Finance',
      role: 'Frontend Engineer',
      startDate: '2024-02-01',
      endDate: '2024-08-01',
      current: false,
      employmentType: 'Full time',
      location: 'Jakarta',
      highlights: [
        {
          highlight:
            'Built React and TypeScript interfaces for a financial platform used by more than 1,000 internal users.',
        },
        {
          highlight:
            'Implemented role-based access across 5 departments with JWT-backed permissions and real-time analytics.',
        },
      ],
      links: [],
      order: 4,
    },
    {
      company: 'PT Bank BTPN',
      role: 'Fullstack Engineer',
      startDate: '2022-02-01',
      endDate: '2023-02-01',
      current: false,
      employmentType: 'Internship',
      location: 'Jakarta',
      highlights: [
        {
          highlight:
            'Rebuilt an internal banking dashboard for 200+ officers from jQuery to React and Node.',
        },
        {
          highlight:
            'Improved load times by 40%, reduced reported bugs by 25%, and optimized NoSQL access by 35%.',
        },
      ],
      links: [],
      order: 5,
    },
  ],
  posts: [
    {
      title: 'Building across iOS and the web',
      slug: 'building-across-ios-and-the-web',
      excerpt:
        'What stays consistent when a product moves between a SwiftUI client, a web app, and the systems behind them.',
      publishedAt: '2026-08-17T00:00:00.000Z',
      cover: null,
      content: richText(
        'The most useful thread across my recent work has been learning to move between product surfaces without losing the reason the product exists.',
        'On iOS, that means making interaction feel direct and respectful of the device. On the web, it means giving teams clear workflows and predictable states. In both places, the implementation matters because it protects the person using the product from unnecessary friction.',
        'I am interested in the seams between those worlds: data contracts, notification flows, accessibility, and the small architectural decisions that let a product keep changing after its first release.',
      ),
      _status: 'published',
    },
    {
      title: 'Draft: shipping notes',
      slug: 'draft-not-public',
      excerpt: 'A private working note used to verify draft access.',
      publishedAt: null,
      cover: null,
      content: richText('This draft should never be visible to logged-out visitors.'),
      _status: 'draft',
    },
  ],
}

export async function seedPortfolio(payload: Payload, req?: PayloadRequest): Promise<void> {
  for (const project of portfolioSeed.projects) {
    const existing = await payload.find({
      collection: 'projects',
      limit: 1,
      overrideAccess: true,
      ...(req ? { req } : {}),
      where: { slug: { equals: project.slug } },
    })

    if (!existing.docs.length) {
      await payload.create({
        collection: 'projects',
        data: project,
        overrideAccess: true,
        ...(req ? { req } : {}),
      })
    }
  }

  for (const experience of portfolioSeed.experiences) {
    const existing = await payload.find({
      collection: 'experiences',
      limit: 1,
      overrideAccess: true,
      ...(req ? { req } : {}),
      where: { company: { equals: experience.company }, role: { equals: experience.role } },
    })

    if (!existing.docs.length) {
      await payload.create({
        collection: 'experiences',
        data: experience,
        overrideAccess: true,
        ...(req ? { req } : {}),
      })
    }
  }

  for (const post of portfolioSeed.posts) {
    const existing = await payload.find({
      collection: 'posts',
      limit: 1,
      overrideAccess: true,
      ...(req ? { req } : {}),
      where: { slug: { equals: post.slug } },
    })

    if (!existing.docs.length) {
      await payload.create({
        collection: 'posts',
        data: post,
        overrideAccess: true,
        ...(req ? { req } : {}),
      })
    }
  }
}
