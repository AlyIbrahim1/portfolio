import type { SkillGroup } from '../../types/horizon'
import { SectionHead } from '../molecules/SectionHead'

export function SkillsSection({ groups }: { groups: readonly SkillGroup[] }) {
  return (
    <section id="skills" className="wrap sk">
      <SectionHead label="Tools" title={<>Languages <span>and tools</span></>} intro="What I build with, grouped by the work it does." />
      <div className="grid3">
        {groups.map((group) => <article className="card" key={group.id}><h3>{group.title}</h3><p>{group.tools}</p></article>)}
      </div>
    </section>
  )
}
