import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { navigation, socialLinks } from '../../data/portfolio'
import { Footer } from './Footer'

describe('Footer', () => {
  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('renders live Cairo details, scrolls to the top, and cleans up its timer', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    const clearInterval = vi.spyOn(window, 'clearInterval')
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined)
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    const { unmount } = render(<Footer name="Aly Ibrahim" links={navigation} elsewhere={socialLinks} city="Cairo" timeZone="Africa/Cairo" />)

    expect(screen.getByText(new RegExp(`© ${new Date().getFullYear()} Aly Ibrahim`))).toBeInTheDocument()
    expect(screen.getByText(/Cairo/)).toHaveTextContent(/UTC[+-]\d+/)
    await user.click(screen.getByRole('button', { name: 'Back to top' }))
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })

    unmount()
    expect(clearInterval).toHaveBeenCalled()
  })
})
