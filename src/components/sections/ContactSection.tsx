import { ContactForm } from '../organisms/ContactForm'

interface ContactSectionProps { email: string; accessKey: string }

export function ContactSection({ email, accessKey }: ContactSectionProps) {
  return (
    <section className="contact-band" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact">
          <div className="head"><h2 className="ctitle" id="contact-title">Interested in collaboration or have an offer? <strong>Contact me.</strong></h2><p className="sub">Open to internships, projects, and any question you may have about my work.</p></div>
          <ContactForm email={email} accessKey={accessKey} />
        </div>
      </div>
    </section>
  )
}
