import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './styles/tokens.css'
import './styles/bundle.css'
import './styles/app.css'
import { App } from './App'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// The build prerenders the page into #root (scripts/prerender.js); the dev server does not.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
