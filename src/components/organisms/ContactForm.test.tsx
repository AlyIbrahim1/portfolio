import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { createMailtoUrl } from '../../utils/mailto'
import { ContactForm } from './ContactForm'

describe('ContactForm', () => {
  it('announces validation errors and focuses the first invalid field', async () => {
    const user = userEvent.setup()
    render(<ContactForm email="aly@example.com" />)
    const email = screen.getByLabelText(/email/) as HTMLInputElement
    const message = screen.getByLabelText(/message/) as HTMLTextAreaElement

    await user.click(screen.getByRole('button', { name: /Send/ }))
    expect(screen.getByRole('status')).toHaveTextContent('email looks invalid')
    expect(email).toHaveFocus()
    expect(email).toHaveAttribute('aria-invalid', 'true')

    await user.type(email, 'visitor@example.com')
    await user.click(screen.getByRole('button', { name: /Send/ }))
    expect(screen.getByRole('status')).toHaveTextContent('message is empty')
    expect(message).toHaveFocus()
  })

  it('builds an encoded mail handoff', () => {
    const url = createMailtoUrl('aly@example.com', 'Ada Lovelace', 'ada@example.com', 'Hello & welcome')
    expect(url).toContain('mailto:aly@example.com?subject=Portfolio%20enquiry%20from%20Ada%20Lovelace')
    expect(url).toContain('Hello%20%26%20welcome')
    expect(url).toContain('ada%40example.com')
  })
})
