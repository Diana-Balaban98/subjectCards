import { SubjectСard } from '@/components'
import data from '@/data.json'

import s from './listOfCards.module.scss'

export const ListOfCards = () => {
  return (
    <div className={s.wrapperList}>
      {data.data.map(card => {
        return (
          <div className={s.subjectCard} key={card.uniqueId}>
            <SubjectСard
              additionalInfo={card.additionalInfo}
              course={card.course}
              exam={card.exam}
              groupName={card.groupName}
              laboratoryHours={card.laboratoryHours}
              lecturesHours={card.lecturesHours}
              offset={card.offset}
              practiceHours={card.practicHours}
              semester={card.semestr}
              seminarHours={card.seminarHours}
              studentsCount={card.studentsNumber}
              subjectName={card.subjectName}
            />
          </div>
        )
      })}
    </div>
  )
}
