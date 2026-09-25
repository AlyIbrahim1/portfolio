import { render, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { TimelineItem } from '../../types/portfolio'
import { Timeline } from './Timeline'

const first: TimelineItem = { id: 'first', date: '2024', title: 'First role', description: 'First description' }
const second: TimelineItem = { id: 'second', date: '2025', title: 'Second role', description: 'Second description' }
const next: TimelineItem = { id: 'next', date: 'Next', title: 'Future role', description: 'Future description' }

describe('Timeline', () => {
  it('highlights the final experience after the items are reordered and always ends with Next', () => {
    const { container, rerender } = render(<Timeline items={[first, second]} nextItem={next} />)
    const steps = () => Array.from(container.querySelectorAll('.timeline > li'))

    expect(steps().map((step) => within(step as HTMLElement).getByRole('heading').textContent)).toEqual(['First role', 'Second role', 'Future role'])
    expect(steps()[0]).not.toHaveClass('is-highlighted')
    expect(steps()[1]).toHaveClass('is-highlighted')
    expect(steps()[1]).toHaveAttribute('aria-current', 'step')
    expect(within(steps()[1] as HTMLElement).getByText('Now')).toBeInTheDocument()
    expect(steps()[2]).toHaveClass('is-next')

    rerender(<Timeline items={[second, first]} nextItem={next} />)

    expect(steps().map((step) => within(step as HTMLElement).getByRole('heading').textContent)).toEqual(['Second role', 'First role', 'Future role'])
    expect(steps()[0]).not.toHaveClass('is-highlighted')
    expect(steps()[1]).toHaveClass('is-highlighted')
    expect(within(steps()[1] as HTMLElement).getByText('Now')).toBeInTheDocument()
    expect(steps()[2]).toHaveClass('is-next')
  })

  it('shows Now on a different experience when its ID is supplied', () => {
    const { container } = render(<Timeline items={[first, second]} nextItem={next} nowItemId={first.id} />)
    const steps = Array.from(container.querySelectorAll('.timeline > li'))

    expect(steps[0]).toHaveAttribute('aria-current', 'step')
    expect(within(steps[0] as HTMLElement).getByText('Now')).toBeInTheDocument()
    expect(steps[1]).toHaveClass('is-highlighted')
    expect(steps[1]).not.toHaveAttribute('aria-current')
    expect(within(steps[1] as HTMLElement).queryByText('Now')).not.toBeInTheDocument()
    expect(steps[2]).toHaveClass('is-next')
  })
})
