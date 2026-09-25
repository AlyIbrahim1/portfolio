import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { archiveProjects, nextTimelineItem, nowTimelineItemId, projects, technologies, timeline } from '../data/portfolio'
import { PortfolioPage } from './PortfolioPage'

describe('PortfolioPage', () => {
  it('renders the page landmarks and all typed portfolio content', () => {
    render(<PortfolioPage />)
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1, name: /Engineering production systems and AI products/ })).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    projects.forEach((project) => expect(screen.getByRole('heading', { level: 3, name: project.title })).toBeInTheDocument())
    timeline.forEach((item) => expect(screen.getByRole('heading', { level: 3, name: item.title })).toBeInTheDocument())
    expect(screen.getByRole('heading', { level: 3, name: nextTimelineItem.title })).toBeInTheDocument()
    const nowItem = timeline.find((item) => item.id === nowTimelineItemId)
    expect(nowItem).toBeDefined()
    expect(screen.getByText('Now').closest('.step')).toHaveTextContent(nowItem!.title)
    technologies.forEach((technology) => expect(screen.getAllByText(technology.label)).toHaveLength(2))
    archiveProjects.forEach((project) => expect(screen.getAllByText(project.title).length).toBeGreaterThan(0))
  })
})
