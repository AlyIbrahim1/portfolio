import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { navigation } from '../../data/portfolio'
import { NavBar } from './NavBar'

describe('NavBar', () => {
  beforeEach(() => {
    Object.defineProperty(document.documentElement, 'scrollHeight', { configurable: true, value: 3000 })
    Object.defineProperty(window, 'innerHeight', { configurable: true, writable: true, value: 1000 })
    Object.defineProperty(window, 'innerWidth', { configurable: true, writable: true, value: 390 })
    vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (this: Element) {
      const element = this as HTMLElement
      const topById: Record<string, number> = { stack: 200, work: 800, experience: 1400, contact: 2000 }
      const top = topById[element.id] ?? 0
      return { top, bottom: element.classList.contains('nav-inner') ? 60 : top + 50, left: 0, right: 0, width: 0, height: 50, x: 0, y: top, toJSON: () => ({}) }
    })
  })

  afterEach(() => vi.restoreAllMocks())

  function renderNav() {
    return render(<><NavBar name="Aly Ibrahim" links={navigation} cta={{ id: 'cta', href: '#contact', label: 'Let’s talk' }} /><div id="stack" /><div id="work" /><div id="experience" /><div id="contact" /></>)
  }

  it('opens and closes the mobile menu through its supported interactions', async () => {
    const user = userEvent.setup()
    renderNav()
    const button = screen.getByRole('button', { name: 'Open menu' })

    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('button', { name: 'Close menu' })).toBeInTheDocument()

    await user.click(within(document.getElementById('mobile-navigation')!).getByRole('link', { name: /Work/ }))
    expect(button).toHaveAttribute('aria-expanded', 'false')

    await user.click(button)
    await user.keyboard('{Escape}')
    expect(button).toHaveFocus()
    expect(button).toHaveAttribute('aria-expanded', 'false')

    await user.click(button)
    await user.click(document.body)
    expect(button).toHaveAttribute('aria-expanded', 'false')

    await user.click(button)
    window.innerWidth = 1024
    fireEvent(window, new Event('resize'))
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })

  it('marks the section at the viewport probe as current', async () => {
    renderNav()
    await waitFor(() => expect(screen.getByRole('link', { name: 'Stack' })).toHaveAttribute('aria-current', 'true'))
  })
})
