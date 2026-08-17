'use client'

import Image from 'next/image'
import { useState } from 'react'

type ProjectGalleryImage = {
  alt: string
  url: string
}

export function ProjectGallery({
  title,
  images,
}: {
  title: string
  images: ProjectGalleryImage[]
}) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (!images.length) return null

  function move(direction: number) {
    setActiveIndex((current) => (current + direction + images.length) % images.length)
  }

  return (
    <div className="project-gallery" aria-label={`${title} project images`}>
      <div className="project-gallery-heading">
        <p>Project images</p>
        {images.length > 1 ? (
          <span aria-live="polite">
            {activeIndex + 1} / {images.length}
          </span>
        ) : null}
      </div>
      <div className="project-gallery-viewport">
        <div
          aria-label="Project image carousel"
          className="project-gallery-track"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {images.map(({ alt, url }, index) => (
            <figure
              aria-hidden={index !== activeIndex}
              aria-label={`${index + 1} of ${images.length}`}
              aria-roledescription="slide"
              className="project-gallery-slide"
              key={url}
              role="group"
            >
              <Image
                alt={alt}
                fill
                loading={index === 0 ? 'eager' : 'lazy'}
                sizes="(max-width: 760px) 100vw, 62vw"
                src={url}
              />
            </figure>
          ))}
        </div>
      </div>
      {images.length > 1 ? (
        <nav aria-label="Project image controls" className="project-gallery-controls">
          <button className="gallery-control" onClick={() => move(-1)} type="button">
            Previous
          </button>
          <button className="gallery-control" onClick={() => move(1)} type="button">
            Next
          </button>
        </nav>
      ) : null}
    </div>
  )
}
