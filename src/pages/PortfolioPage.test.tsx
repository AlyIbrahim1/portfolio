import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { milestones, showcase, skillGroups } from '../data/horizon'
import { PortfolioPage } from './PortfolioPage'

describe('PortfolioPage', () => {
  it('renders the landmarks and all typed portfolio content', () => {
    render(<PortfolioPage />)
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1, name: /Building backends, developer tools & AI/ })).toBeInTheDocument()
    showcase.forEach((project) => expect(screen.getByRole('heading', { level: 3, name: project.title })).toBeInTheDocument())
    milestones.forEach((m) => expect(screen.getByRole('heading', { level: 3, name: m.title, hidden: true })).toBeInTheDocument())
    skillGroups.forEach((group) => expect(screen.getByRole('heading', { level: 3, name: group.title })).toBeInTheDocument())
  })

  it('starts on the latest star and switches entries when another star is selected', () => {
    render(<PortfolioPage />)
    const latest = milestones.findIndex((m) => m.status === 'latest')
    const stars = screen.getAllByRole('button', { pressed: undefined }).filter((b) => b.hasAttribute('aria-controls'))
    expect(stars[latest]).toHaveAttribute('aria-pressed', 'true')
    fireEvent.click(stars[0])
    expect(stars[0]).toHaveAttribute('aria-pressed', 'true')
    expect(stars[latest]).toHaveAttribute('aria-pressed', 'false')
  })
})
