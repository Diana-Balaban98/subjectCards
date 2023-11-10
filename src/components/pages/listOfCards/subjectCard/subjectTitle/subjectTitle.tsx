import { FunctionComponent } from 'react'

import { RiBookOpenFill } from 'react-icons/ri'

import s from './subject.module.scss'

export type SubjectTitleProps = {
  subjectName: string
}

export const SubjectTitle: FunctionComponent<SubjectTitleProps> = ({ subjectName }) => (
  <div className={s.subjectTitle}>
    <RiBookOpenFill />
    <h4>{subjectName}</h4>
  </div>
)
