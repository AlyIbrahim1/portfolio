import type { Course } from '../../types/horizon'
import { SectionHead } from '../molecules/SectionHead'

export function CoursesSection({ courses }: { courses: readonly Course[] }) {
  return (
    <section id="courses" className="wrap crs">
      <SectionHead label="Learning" title={<>Courses <span>completed</span></>} />
      <div className="grid3 grid-auto">
        {courses.map((course) => <article className="card" key={course.id}><div className="iss">{course.issuer}</div><time>{course.date}</time><h3>{course.title}</h3></article>)}
      </div>
    </section>
  )
}
