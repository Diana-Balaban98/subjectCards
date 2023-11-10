import { FunctionComponent } from 'react'

import s from './subjectInfo.module.scss'

export type SubjectInfoProps = {
  course: string
  groupName: string
  semester: string
  studentsCount: string
}

export const SubjectInfo: FunctionComponent<SubjectInfoProps> = ({
  course,
  groupName,
  semester,
  studentsCount,
}) => {
  const renderBlock = (name: string, count: string) => {
    return (
      <div className={s.block}>
        <span className={s.name}>{name}</span>
        <span className={s.count}>{count}</span>
      </div>
    )
  }

  return (
    <div className={s.subjectInfo}>
      {renderBlock('Группа', groupName)}
      {renderBlock('Количество курсантов', studentsCount)}
      {renderBlock('Курс', course)}
      {renderBlock('Семестр', semester)}
    </div>
  )
}
