import { IconSprite } from '../components/atoms/IconSprite'
import { ContactSection } from '../components/sections/ContactSection'
import { ExperienceSection } from '../components/sections/ExperienceSection'
import { HeroSection } from '../components/sections/HeroSection'
import { StackSection } from '../components/sections/StackSection'
import { WorkSection } from '../components/sections/WorkSection'
import { Footer } from '../components/organisms/Footer'
import { NavBar } from '../components/organisms/NavBar'
import {
  archiveProjects,
  navigation,
  nextTimelineItem,
  nowTimelineItemId,
  profile,
  projects,
  socialLinks,
  technologies,
  timeline,
  traceLogs,
  traceSpans,
  traceStats,
} from '../data/portfolio'

export function PortfolioPage() {
  return (
    <>
      <IconSprite />
      <NavBar name={profile.name} links={navigation} cta={{ id: 'contact-cta', href: '#contact', label: 'Let’s talk' }} />
      <main id="top">
        <HeroSection socials={socialLinks} spans={traceSpans} logs={traceLogs} stats={traceStats} location={profile.location} education={profile.education} />
        <StackSection technologies={technologies} />
        <WorkSection projects={projects} archiveProjects={archiveProjects} />
        <ExperienceSection items={timeline} nextItem={nextTimelineItem} nowItemId={nowTimelineItemId} />
        <ContactSection email={profile.email} accessKey={profile.contactFormKey} />
      </main>
      <Footer name={profile.name} links={navigation} elsewhere={socialLinks} city={profile.city} timeZone={profile.timeZone} />
    </>
  )
}
