export function createMailtoUrl(recipient: string, name: string, email: string, message: string) {
  const subject = `Portfolio enquiry${name ? ` from ${name}` : ''}`
  const body = `${message}\n\n— ${name || 'Sent from your portfolio'} (${email})`
  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
