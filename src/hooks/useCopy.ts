import { useEffect, useReducer, useRef } from 'react'

export type CopyStatus = 'idle' | 'copied' | 'failed'
type CopyAction = { type: 'copied' } | { type: 'failed' } | { type: 'reset' }

function copyReducer(_status: CopyStatus, action: CopyAction): CopyStatus {
  switch (action.type) {
    case 'copied': return 'copied'
    case 'failed': return 'failed'
    case 'reset': return 'idle'
  }
}

export function useCopy(text: string) {
  const [status, dispatch] = useReducer(copyReducer, 'idle')
  const timer = useRef(0)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  async function copy() {
    if (status !== 'idle') return
    try {
      await navigator.clipboard.writeText(text)
      dispatch({ type: 'copied' })
    } catch {
      dispatch({ type: 'failed' })
    }
    timer.current = window.setTimeout(() => dispatch({ type: 'reset' }), 1600)
  }

  return { status, copy }
}
