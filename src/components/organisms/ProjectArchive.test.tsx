import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { archiveProjects, projects } from '../../data/portfolio'
import { WorkSection } from '../sections/WorkSection'

describe('ProjectArchive', () => {
  it('opens, closes, restores focus, and cleans up scroll locking', async () => {
    const user = userEvent.setup()
    render(<WorkSection projects={projects} archiveProjects={archiveProjects} />)
    const opener = screen.getByRole('button', { name: /All Projects/ })

    await user.click(opener)
    const dialog = screen.getByRole('dialog') as HTMLDialogElement
    expect(dialog.open).toBe(true)
    expect(document.documentElement).toHaveClass('dialog-open')

    await user.click(screen.getByRole('button', { name: 'Close' }))
    await waitFor(() => expect(dialog.open).toBe(false))
    expect(document.documentElement).not.toHaveClass('dialog-open')
    expect(opener).toHaveFocus()

    await user.click(opener)
    fireEvent(dialog, new Event('cancel', { cancelable: true }))
    await waitFor(() => expect(dialog.open).toBe(false))

    await user.click(opener)
    fireEvent.click(dialog)
    await waitFor(() => expect(dialog.open).toBe(false))
  })
})
