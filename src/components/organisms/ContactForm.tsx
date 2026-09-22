import { useRef, useState, type FormEvent } from 'react'
import { Button } from '../atoms/Button'
import { TerminalField } from '../molecules/TerminalField'
import { TerminalWindow } from '../molecules/TerminalWindow'

interface ContactFormProps { email: string; accessKey: string }

interface FormErrors { email: boolean; message: boolean }

export function ContactForm({ email: recipient, accessKey }: ContactFormProps) {
  const [errors, setErrors] = useState<FormErrors>({ email: false, message: false })
  const [status, setStatus] = useState<{ kind: 'error' | 'sent' | ''; message: string }>({ kind: '', message: '' })
  const [sending, setSending] = useState(false)
  const emailRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (sending) return
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()
    const nextErrors = { email: !/\S+@\S+\.\S+/.test(email), message: message.length === 0 }
    setErrors(nextErrors)

    if (nextErrors.email || nextErrors.message) {
      const errorMessage = nextErrors.email ? 'email looks invalid' : 'message is empty'
      setStatus({ kind: 'error', message: `✗ ${errorMessage}` })
      if (nextErrors.email) emailRef.current?.focus()
      else messageRef.current?.focus()
      return
    }

    setSending(true)
    setStatus({ kind: '', message: '… sending' })
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: accessKey, subject: `Portfolio enquiry${name ? ` from ${name}` : ''}`, from_name: name || 'Portfolio visitor', name, email, message, botcheck: Boolean(data.get('botcheck')) }),
      })
      const result = (await response.json()) as { success?: boolean }
      if (!response.ok || !result.success) throw new Error('send failed')
      form.reset()
      setStatus({ kind: 'sent', message: '✓ sent — I’ll reply to your email soon' })
    } catch {
      setStatus({ kind: 'error', message: '✗ couldn’t send — email me directly below' })
    } finally {
      setSending(false)
    }
  }

  return (
    <TerminalWindow as="form" className="cform" title="~/contact" onSubmit={submit} noValidate>
      <div className="term-body">
        <div className="row">
          <TerminalField id="contact-name" label="name" name="name" autoComplete="name" />
          <TerminalField id="contact-email" label="email" name="email" type="email" autoComplete="email" invalid={errors.email} inputRef={emailRef} />
        </div>
        <TerminalField id="contact-message" label="message" name="message" multiline invalid={errors.message} textareaRef={messageRef} />
        <input type="checkbox" name="botcheck" hidden tabIndex={-1} autoComplete="off" />
        <div className="send-row">
          <output className={['out', status.kind ? `is-${status.kind}` : ''].filter(Boolean).join(' ')} role="status" aria-live="polite">{status.message}</output>
          <Button type="submit" size="sm" icon="send" disabled={sending}>Send</Button>
        </div>
        <div className="mail"><span className="cm">// or email me directly</span><a className="mail-link" href={`mailto:${recipient}`}>{recipient}</a></div>
      </div>
    </TerminalWindow>
  )
}
