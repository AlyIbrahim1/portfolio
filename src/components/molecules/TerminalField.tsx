import type { Ref } from 'react'

interface TerminalFieldProps {
  id: string
  label: string
  name: string
  type?: 'text' | 'email'
  autoComplete?: string
  invalid?: boolean
  multiline?: boolean
  inputRef?: Ref<HTMLInputElement>
  textareaRef?: Ref<HTMLTextAreaElement>
}

export function TerminalField({ id, label, name, type = 'text', autoComplete, invalid, multiline, inputRef, textareaRef }: TerminalFieldProps) {
  return (
    <label className="fld" htmlFor={id}>
      <span className="key"><span className="prompt" aria-hidden="true">&gt;</span> {label}</span>
      {multiline ? (
        <textarea ref={textareaRef} className="tin" id={id} name={name} rows={4} aria-invalid={invalid || undefined} />
      ) : (
        <input ref={inputRef} className="tin" id={id} name={name} type={type} autoComplete={autoComplete} spellCheck={false} aria-invalid={invalid || undefined} />
      )}
    </label>
  )
}
