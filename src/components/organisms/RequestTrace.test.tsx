import { act, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { traceLogs, traceSpans, traceStats } from '../../data/portfolio'
import { RequestTrace } from './RequestTrace'

const props = {
  title: '~/trace',
  method: 'POST',
  path: '/v1/churn/predict',
  status: '200 OK',
  spans: traceSpans,
  logs: traceLogs,
  stats: traceStats,
  label: 'Request trace',
}

describe('RequestTrace', () => {
  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('rotates the visible log tail and clears its timer', () => {
    vi.useFakeTimers()
    vi.stubGlobal('matchMedia', (query: string) => ({ matches: query === '(min-width: 961px)', addEventListener: vi.fn(), removeEventListener: vi.fn() }))
    const clearInterval = vi.spyOn(window, 'clearInterval')
    const { unmount } = render(<RequestTrace {...props} />)
    expect(screen.getByText(traceLogs[0].message)).toBeInTheDocument()

    act(() => vi.advanceTimersByTime(1600))
    expect(screen.getByText(traceLogs[4].message)).toBeInTheDocument()
    expect(screen.queryByText(traceLogs[0].message)).not.toBeInTheDocument()

    unmount()
    expect(clearInterval).toHaveBeenCalled()
  })

  it('does not rotate logs while hidden on a narrow screen', () => {
    vi.useFakeTimers()
    vi.stubGlobal('matchMedia', () => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() }))
    render(<RequestTrace {...props} />)
    act(() => vi.advanceTimersByTime(3200))
    expect(screen.queryByText(traceLogs[4].message)).not.toBeInTheDocument()
  })

  it('keeps the trace static when reduced motion is requested', () => {
    vi.useFakeTimers()
    vi.stubGlobal('matchMedia', () => ({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() }))
    render(<RequestTrace {...props} />)
    act(() => vi.advanceTimersByTime(3200))
    expect(screen.queryByText(traceLogs[4].message)).not.toBeInTheDocument()
  })
})
