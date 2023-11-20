import { Button, LinearLoader, SubjectСard } from '@/components'
import { useAppSelector } from '@/hooks'

import s from './listOfCards.module.scss'

export const ListOfCards = () => {
  const { isLoading, subjectInfo } = useAppSelector(state => state.subjectInfo)

  if (isLoading) {
    return <LinearLoader />
  }

  return (
    <div className={s.wrapperList}>
      {subjectInfo.data.map(card => {
        return (
          <div className={s.subjectCard} key={card.uniqueId}>
            <SubjectСard
              cardId={card.uniqueId}
              countPodgroups={card.countPodgroups}
              course={card.course}
              exam={card.exam}
              groupName={card.groupName}
              info={card.additionalInfo}
              laboratoryHours={card.laboratoryHours}
              lecturesHours={card.lecturesHours}
              offset={card.offset}
              podgroups={card.podgroups}
              practiceHours={card.practicHours}
              semester={card.semestr}
              seminarHours={card.seminarHours}
              studentsCount={card.studentsNumber}
              subjectName={card.subjectName}
              teachers={subjectInfo.teachers}
            />
          </div>
        )
      })}
      <Button variant={'contained'}>Сохранить</Button>
    </div>
  )
}
