import type {
  ArchiveProject,
  NavLink,
  Project,
  SocialLink,
  Technology,
  TimelineItem,
  TraceLog,
  TraceSpan,
  TraceStat,
} from '../types/portfolio'

export const profile = {
  name: 'Aly Ibrahim',
  email: 'aly.ibrahim.2007@gmail.com',
  city: 'Cairo',
  timeZone: 'Africa/Cairo',
  location: 'Cairo, Egypt',
  education: 'BSc CS · AI/ML track',
} as const

export const navigation = [
  { id: 'stack', href: '#stack', label: 'Stack' },
  { id: 'work', href: '#work', label: 'Work' },
  { id: 'experience', href: '#experience', label: 'Experience' },
  { id: 'contact', href: '#contact', label: 'Contact' },
] as const satisfies readonly NavLink[]

export const socialLinks = [
  { id: 'github', label: 'GitHub', icon: 'github', href: 'https://github.com/AlyIbrahim1', external: true },
  { id: 'linkedin', label: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/', external: true },
  { id: 'email', label: 'Email', icon: 'mail', href: `mailto:${profile.email}` },
] as const satisfies readonly SocialLink[]

export const technologies = [
  { id: 'python', logo: 'python', label: 'Python' },
  { id: 'fastapi', logo: 'fastapi', label: 'FastAPI' },
  { id: 'postgresql', logo: 'postgresql', label: 'PostgreSQL' },
  { id: 'sqlalchemy', logo: 'sqlalchemy', label: 'SQLAlchemy' },
  { id: 'langgraph', logo: 'langgraph', label: 'LangGraph' },
  { id: 'scikit-learn', logo: 'scikit-learn', label: 'scikit-learn' },
  { id: 'typescript', logo: 'typescript', label: 'TypeScript' },
  { id: 'react', logo: 'react', label: 'React' },
  { id: 'tailwind-css', logo: 'tailwind-css', label: 'Tailwind CSS' },
  { id: 'supabase', logo: 'supabase', label: 'Supabase' },
  { id: 'github-actions', logo: 'github-actions', label: 'GitHub Actions' },
] as const satisfies readonly Technology[]

export const projects = [
  {
    id: 'rag-customer-service-agent',
    title: 'RAG customer-service agent',
    description: 'Answers customer questions from internal documents, with retrieval over embedded knowledge and a LangGraph flow for routing and follow-ups.',
    href: 'https://github.com/AlyIbrahim1',
    art: 'chat',
    artLabel: 'Placeholder screenshot of a chat interface',
    tags: ['Individual project · e&', 'LangGraph · ChromaDB · Embeddings'],
    lead: true,
    external: true,
  },
  {
    id: 'customer-churn-prediction',
    title: 'Customer churn prediction',
    description: 'Flags telecom customers likely to leave so retention teams can act first — an end-to-end pipeline from feature engineering to scored output.',
    href: 'https://github.com/AlyIbrahim1',
    art: 'chart',
    artLabel: 'Placeholder screenshot of a model evaluation view',
    tags: ['Individual project · e&', 'Python · ML pipeline'],
    lead: true,
    external: true,
  },
  {
    id: 'rent-management-app',
    title: 'Rent Management app',
    description: 'Tracks properties, tenants and rent payments and generates PDF documents — re-architected onto a FastAPI backend and a typed React front end, with CI on every push.',
    href: 'https://github.com/AlyIbrahim1',
    art: 'table',
    artLabel: 'Placeholder screenshot of a rent payments table',
    tags: ['Solo build', 'FastAPI · React · Supabase'],
    lead: true,
    external: true,
  },
  {
    id: 'ai-property-price-estimator',
    title: 'AI Property Price Estimator',
    description: 'Predicts a property’s price from its listing features — a scikit-learn model served as a FastAPI endpoint and backed by PostgreSQL.',
    href: 'https://github.com/AlyIbrahim1',
    art: 'code',
    artLabel: 'Placeholder screenshot of API source code',
    tags: ['Capstone', 'scikit-learn · FastAPI · PostgreSQL'],
    lead: true,
    external: true,
  },
] as const satisfies readonly Project[]

export const archiveProjects = [
  { id: 'claude-statusline', title: 'claude-statusline', description: 'A Neovim statusline that reads Claude Code’s live JSON over stdin.', stack: 'Neovim · CLI', href: 'https://github.com/AlyIbrahim1' },
  { id: 'egyptian-adventure', title: 'Egyptian Adventure', description: 'A 2D platformer that started as a university final project.', stack: 'JavaScript · p5.js', href: 'https://github.com/AlyIbrahim1' },
  { id: 'internet-history', title: 'Internet History', description: 'A history site rendered from structured JSON with templates.', stack: 'Handlebars · JSON', href: 'https://github.com/AlyIbrahim1' },
] as const satisfies readonly ArchiveProject[]

export const timeline = [
  { id: 'feedforward', state: 'done', date: 'Aug 2026', org: 'EUE UOL CS Society', title: 'FeedForward hackathon', description: 'A 24-hour build with a small team, using AI coding tools to go from idea to working prototype.' },
  { id: 'etisalat-internship', state: 'done', date: 'Aug 2026 — Sep 2026', org: 'e& Egypt', title: 'AI & Analytics Intern', description: 'Worked on the AI & Advanced Analytics team, owning two projects end to end.', bullets: ['Built a customer-churn prediction pipeline, from feature engineering to scored output.', 'Shipped a RAG customer-service agent on LangGraph and ChromaDB.'] },
  { id: 'goldsmiths', state: 'current', date: '2025 — Present', org: 'Goldsmiths, University of London', title: 'BSc Computer Science — AI/ML track', description: 'Studying remotely from Cairo, with a focus on machine learning and backend systems.' },
  { id: 'next-role', state: 'upcoming', date: 'Next', title: 'Software engineering internship', description: 'Looking for a backend or AI/ML engineering role.' },
] as const satisfies readonly TimelineItem[]

export const traceSpans = [
  { id: 'request', name: 'http.request', start: 0, width: 100, ms: 48 },
  { id: 'auth', name: 'auth.verify', start: 2, width: 6, ms: 3, io: true },
  { id: 'customer', name: 'db.get_customer', start: 8, width: 23, ms: 11, io: true },
  { id: 'features', name: 'features.build', start: 31, width: 13, ms: 6 },
  { id: 'model', name: 'model.predict', start: 44, width: 44, ms: 21 },
  { id: 'cache', name: 'cache.set', start: 88, width: 6, ms: 3, io: true },
] as const satisfies readonly TraceSpan[]

export const traceLogs = [
  ['request-1', 'INFO', 'req 7f3a…c1 · POST /v1/churn/predict'],
  ['model-1', 'INFO', 'model churn_clf v3 · p(churn)=0.81'],
  ['cache-set-1', 'INFO', 'cache set churn:58213 · ttl 1h'],
  ['ok-1', 'INFO', '200 OK · 48ms'],
  ['request-2', 'INFO', 'req 9b1e…04 · POST /v1/churn/predict'],
  ['cache-hit-1', 'INFO', 'cache hit churn:58213 · 2ms'],
  ['ok-2', 'INFO', '200 OK · 3ms'],
  ['request-3', 'INFO', 'req c42d…9a · POST /v1/churn/predict'],
  ['slow-query', 'WARN', 'db: slow query · 180ms · retrying replica'],
  ['model-2', 'INFO', 'model churn_clf v3 · p(churn)=0.12'],
  ['ok-3', 'INFO', '200 OK · 221ms'],
  ['request-4', 'INFO', 'req 1d07…e2 · POST /v1/churn/predict'],
  ['expired-token', 'WARN', 'auth: token expired · sub=svc-dashboard'],
  ['unauthorized', 'WARN', '401 Unauthorized · 2ms'],
  ['request-5', 'INFO', 'req 5a9c…3f · POST /v1/churn/batch · 250 ids'],
  ['rows', 'INFO', 'db: 250 rows · 38ms'],
  ['model-3', 'INFO', 'model churn_clf v3 · 250 scored · 31 high-risk'],
  ['ok-4', 'INFO', '200 OK · 164ms'],
  ['request-6', 'INFO', 'req e810…7b · POST /v1/churn/predict'],
  ['not-found-db', 'WARN', 'db: customer 99999 not found'],
  ['not-found', 'WARN', '404 Not Found · 6ms'],
  ['request-7', 'INFO', 'req 3c6f…d8 · POST /v1/churn/predict'],
  ['validation', 'WARN', 'validation: tenure must be ≥ 0'],
  ['unprocessable', 'WARN', '422 Unprocessable Entity · 1ms'],
  ['request-8', 'INFO', 'req 88b2…41 · POST /v1/churn/predict'],
  ['cache-hit-2', 'INFO', 'cache hit churn:60177 · 2ms'],
  ['ok-5', 'INFO', '200 OK · 4ms'],
].map(([id, level, message]) => ({ id, level, message })) as TraceLog[]

export const traceStats = [
  { id: 'p95', label: 'p95', value: '52ms' },
  { id: 'errors', label: 'errors', value: '0.0%' },
  { id: 'uptime', label: 'uptime', value: '99.9%' },
] as const satisfies readonly TraceStat[]
