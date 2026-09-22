import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ContactForm } from './ContactForm'

describe('ContactForm', () => {
  it('announces validation errors and focuses the first invalid field', async () => {
    const user = userEvent.setup()
    render(<ContactForm email="aly@example.com" accessKey="test-key" />)
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

  it('sends the message without leaving the page and clears the form', async () => {
    const user = userEvent.setup()
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify({ success: true })))
    render(<ContactForm email="aly@example.com" accessKey="test-key" />)

    await user.type(screen.getByLabelText(/name/), 'Ada Lovelace')
    await user.type(screen.getByLabelText(/email/), 'ada@example.com')
    await user.type(screen.getByLabelText(/message/), 'Hello & welcome')
    await user.click(screen.getByRole('button', { name: /Send/ }))

    expect(await screen.findByText(/✓ sent/)).toBeInTheDocument()
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe('https://api.web3forms.com/submit')
    expect(JSON.parse(String(init?.body))).toMatchObject({ access_key: 'test-key', name: 'Ada Lovelace', email: 'ada@example.com', message: 'Hello & welcome', subject: 'Portfolio enquiry from Ada Lovelace' })
    expect(screen.getByLabelText(/message/)).toHaveValue('')
  })

  it('reports a failed send and keeps the message', async () => {
    const user = userEvent.setup()
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify({ success: false }), { status: 400 }))
    render(<ContactForm email="aly@example.com" accessKey="bad-key" />)

    await user.type(screen.getByLabelText(/email/), 'ada@example.com')
    await user.type(screen.getByLabelText(/message/), 'Hello')
    await user.click(screen.getByRole('button', { name: /Send/ }))

    expect(await screen.findByText(/couldn’t send/)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/)).toHaveValue('Hello')
  })
})
