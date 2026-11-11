import { useEffect, useRef } from 'react'

// Lets an animation loop read the newest value without restarting when it changes
export function useLatest<T>(value: T) {
  const ref = useRef(value)
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref
}
