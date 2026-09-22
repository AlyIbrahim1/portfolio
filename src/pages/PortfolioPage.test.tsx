import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { archiveProjects, projects, technologies, timeline } from '../data/portfolio'
import { PortfolioPage } from './PortfolioPage'

describe('PortfolioPage', () => {
  it('renders the page landmarks and all typed portfolio content', () => {
    render(<PortfolioPage />)
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1, name: /Engineering backend systems for AI products/ })).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    projects.forEach((project) => expect(screen.getByRole('heading', { level: 3, name: project.title })).toBeInTheDocument())
    timeline.forEach((item) => expect(screen.getByRole('heading', { level: 3, name: item.title })).toBeInTheDocument())
    technologies.forEach((technology) => expect(screen.getAllByText(technology.label)).toHaveLength(2))
    archiveProjects.forEach((project) => expect(screen.getByText(project.title)).toBeInTheDocument())
  })
})
