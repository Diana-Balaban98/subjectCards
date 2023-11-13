import { useEffect } from 'react'

import { Button, LinearLoader, SubjectСard } from '@/components'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { fetchData } from '@/state'

import s from './listOfCards.module.scss'

export const ListOfCards = () => {
  const dispatch = useAppDispatch()
  const { isLoading, subjectInfo } = useAppSelector(state => state.subjectInfo)

  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch])

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
              course={card.course}
              exam={card.exam}
              groupName={card.groupName}
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
