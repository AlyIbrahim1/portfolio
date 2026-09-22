import { useEffect, useRef, type RefObject } from 'react'
import type { ArchiveProject } from '../../types/portfolio'
import { Button } from '../atoms/Button'
import { ArchiveItem } from '../molecules/ArchiveItem'

interface ProjectArchiveProps {
  items: readonly ArchiveProject[]
  open: boolean
  onClose: () => void
  openerRef: RefObject<HTMLButtonElement | null>
}

export function ProjectArchive({ items, open, onClose, openerRef }: ProjectArchiveProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const wasOpen = useRef(false)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) {
      if (typeof dialog.showModal === 'function') dialog.showModal()
      else dialog.setAttribute('open', '')
    } else if (!open && dialog.open) {
      if (typeof dialog.close === 'function') dialog.close()
      else dialog.removeAttribute('open')
    }

    document.documentElement.classList.toggle('dialog-open', open)
    if (wasOpen.current && !open) openerRef.current?.focus()
    wasOpen.current = open

    return () => document.documentElement.classList.remove('dialog-open')
  }, [open, openerRef])

  return (
    <dialog
      ref={dialogRef}
      id="projects-dialog"
      className="pdialog"
      aria-labelledby="projects-dialog-title"
      onCancel={onClose}
      onClose={onClose}
      onClick={(event) => { if (event.target === event.currentTarget) onClose() }}
    >
      <div className="pd-head">
        <div><div className="eyebrow">Archive</div><h2 className="pd-title" id="projects-dialog-title">All projects</h2></div>
        <Button variant="icon" aria-label="Close" onClick={onClose} icon="close" />
      </div>
      <ul className="more">{items.map((item) => <ArchiveItem key={item.id} item={item} />)}</ul>
    </dialog>
  )
}
