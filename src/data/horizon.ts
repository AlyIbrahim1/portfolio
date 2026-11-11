import statuslinePreview from '../assets/project-previews/claude-statusline-card.webp'
import ragPreview from '../assets/project-previews/eand-rag-agent-card.webp'
import telecomPreview from '../assets/project-previews/telecom-retention-preview.webp'
import type { Course, ContactRow, Milestone, ShowcaseProject, SkillGroup } from '../types/horizon'
import type { NavLink } from '../types/portfolio'
import { profile, socialLinks } from './portfolio'

const github = socialLinks.find((link) => link.id === 'github')!.href
const linkedin = socialLinks.find((link) => link.id === 'linkedin')!.href

export const horizonNav = [
  { id: 'work', href: '#work', label: 'Projects' },
  { id: 'experience', href: '#experience', label: 'Experience' },
  { id: 'skills', href: '#skills', label: 'Skills' },
  { id: 'contact', href: '#contact', label: 'Contact' },
] as const satisfies readonly NavLink[]

export const showcase = [
  { id: 'claude-statusline', title: 'claude-statusline', description: 'An open-source status line for Claude Code with a Rust renderer, 4,193 npm downloads and native builds for five platforms.', stack: 'Rust, JavaScript, Node.js', period: 'Mar 2026 to now', context: 'Open source', href: `${github}/claude-statusline`, preview: { src: statuslinePreview, alt: 'claude-statusline session history dashboard', tone: 'violet' } },
  { id: 'telecom-retention-workbench', title: 'Telecom retention workbench', description: 'Churn scores for 7,043 telecom customers, turned into capacity-limited retention campaigns that a reviewer can adjust.', stack: 'scikit-learn, FastAPI, PostgreSQL, React', period: 'Aug to Sep 2026', context: 'e& Egypt', href: `${github}/telecom-retention-campaign-workbench`, preview: { src: telecomPreview, alt: 'Retention workbench overview with churn predictions', tone: 'rose' } },
  { id: 'customer-service-assistant', title: 'Customer-service assistant', description: 'An English and Arabic assistant that answers from product guides and links each answer to its source page.', stack: 'LangGraph, ChromaDB, MCP, React', period: 'Aug to Sep 2026', context: 'e& Egypt', href: `${github}/rag-customer-service-agent`, preview: { src: ragPreview, alt: 'Website replica with the assistant chat open', tone: 'blue' } },
  { id: 'rent-manager', title: 'Rent Manager', description: 'A family rent-tracking web app with dashboards and PDF receipts.', stack: 'FastAPI, Supabase, React, TypeScript', period: 'Jan 2026 to now', context: 'Private' },
  { id: 'data-visualisation-gallery', title: 'Data Visualisation Gallery', description: 'Nine p5.js and WebGL visualisations on a shared load lifecycle, with a 20-class object-oriented design.', stack: 'JavaScript, p5.js, WebGL', period: 'May to Aug 2026', context: 'University, private' },
] as const satisfies readonly ShowcaseProject[]

// Experience is a star chart: x is time, each entry a star. The line is solid up to the latest star and dashed after it.
export const milestones = [
  { id: 'degree', when: 'Oct 2024', year: 2024.79, y: 70, title: 'BSc Computer Science', place: 'University of London (Goldsmiths), studied at EUE in Cairo', description: 'On the Machine Learning and Artificial Intelligence track. Modules include Algorithms and Data Structures, Object Oriented Programming, Software Design and Development, Web Development and Discrete Mathematics.', status: 'past', builds: { label: 'From this degree', projects: [{ id: 'data-visualisation-gallery', x: 15, y: 46 }] } },
  { id: 'eand-internship', when: 'Aug to Sep 2026', year: 2026.62, y: 26, title: 'AI and Advanced Analytics intern', place: 'e& Egypt, Cairo', description: 'On the AI and Advanced Analytics team. Each intern built their own version of the same two briefs, a churn prediction pipeline and a RAG customer-service assistant. I built both on my own.', status: 'latest', builds: { label: 'Built here', projects: [{ id: 'telecom-retention-workbench', x: 38, y: 11 }, { id: 'customer-service-assistant', x: 58, y: 12 }] } },
  { id: 'graduation', when: 'Sep 2028, expected', year: 2028.67, y: 58, title: 'Graduation', place: 'University of London', description: 'BSc Computer Science on the Machine Learning and Artificial Intelligence track. Until then, open to software engineering and AI internships.', status: 'future' },
] as const satisfies readonly Milestone[]

export const skillGroups = [
  { id: 'python', title: 'Python', tools: 'FastAPI, scikit-learn, LangGraph' },
  { id: 'js-ts', title: 'JavaScript and TypeScript', tools: 'React, TypeScript, Node.js, p5.js' },
  { id: 'systems', title: 'Systems programming', tools: 'Rust, C++' },
  { id: 'web', title: 'Web development', tools: 'React, Vite, WebGL' },
  { id: 'backend', title: 'Backend and databases', tools: 'FastAPI, PostgreSQL, Supabase, ChromaDB' },
  { id: 'ml', title: 'Machine learning and AI', tools: 'scikit-learn, random forests, embeddings' },
  { id: 'llm', title: 'LLM and agent tooling', tools: 'LangGraph, MCP, RAG, Claude Code' },
  { id: 'data', title: 'Data and visualisation', tools: 'p5.js, WebGL, PDF reports' },
  { id: 'devops', title: 'Engineering and DevOps', tools: 'Docker Compose, CI, Jest, npm releases' },
] as const satisfies readonly SkillGroup[]

export const courses = [
  { id: 'claude-code', issuer: 'Anthropic', title: 'Claude Code in Action and Claude Code 101', date: 'Apr 2026' },
  { id: 'cpp', issuer: 'European Universities in Egypt', title: 'Advanced C++', date: 'Jul 2026' },
  { id: 'python', issuer: 'Code With Mosh', title: 'Complete Python Mastery', date: 'May 2026' },
  { id: 'cs50x', issuer: 'Harvard, through edX', title: 'CS50x', date: '2025' },
] as const satisfies readonly Course[]

export const contactRows = [
  { id: 'github', label: 'GitHub', value: 'AlyIbrahim1', href: github },
  { id: 'linkedin', label: 'LinkedIn', value: 'alyibrahim1', href: linkedin },
] as const satisfies readonly ContactRow[]

export const heroCopy = {
  greeting: `Hello, I'm ${profile.name}`,
  headline: 'Building backends, developer tools & AI',
  sub: 'Computer science student at the University of London, based in Cairo.',
} as const

export const workIntro = 'Open-source tools, internship work and private apps. Public ones link to their code.'
