import React from 'react'
import type { Metadata } from 'next'

import './styles.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://heydwiki.com'),
  description:
    'Dwiki is a software engineer building reliable products across iOS, web, and the systems that keep both dependable.',
  openGraph: {
    description:
      'Dwiki is a software engineer building reliable products across iOS, web, and the systems that keep both dependable.',
    title: 'Dwiki | Software Engineer',
    type: 'website',
    url: 'https://heydwiki.com',
  },
  title: 'Dwiki | Software Engineer',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  )
}
