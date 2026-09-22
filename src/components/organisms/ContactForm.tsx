import { useRef, useState, type FormEvent } from 'react'
import { createMailtoUrl } from '../../utils/mailto'
import { Button } from '../atoms/Button'
import { TerminalField } from '../molecules/TerminalField'
import { TerminalWindow } from '../molecules/TerminalWindow'

interface ContactFormProps { email: string }

interface FormErrors { email: boolean; message: boolean }

export function ContactForm({ email: recipient }: ContactFormProps) {
  const [errors, setErrors] = useState<FormErrors>({ email: false, message: false })
  const [status, setStatus] = useState<{ kind: 'error' | 'sent' | ''; message: string }>({ kind: '', message: '' })
  const emailRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
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

    setStatus({ kind: 'sent', message: `✓ opening your mail app — reply goes to ${email}` })
    window.location.href = createMailtoUrl(recipient, name, email, message)
  }

  return (
    <TerminalWindow as="form" className="cform" title="~/contact" onSubmit={submit} noValidate>
      <div className="term-body">
        <div className="row">
          <TerminalField id="contact-name" label="name" name="name" autoComplete="name" />
          <TerminalField id="contact-email" label="email" name="email" type="email" autoComplete="email" invalid={errors.email} inputRef={emailRef} />
        </div>
        <TerminalField id="contact-message" label="message" name="message" multiline invalid={errors.message} textareaRef={messageRef} />
        <div className="send-row">
          <output className={['out', status.kind ? `is-${status.kind}` : ''].filter(Boolean).join(' ')} role="status" aria-live="polite">{status.message}</output>
          <Button type="submit" size="sm" icon="send">Send</Button>
        </div>
        <div className="mail"><span className="cm">// or email me directly</span><a className="mail-link" href={`mailto:${recipient}`}>{recipient}</a></div>
      </div>
    </TerminalWindow>
  )
}
