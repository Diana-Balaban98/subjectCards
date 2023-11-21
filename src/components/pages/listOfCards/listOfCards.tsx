import { Button, LinearLoader, SubjectСard } from '@/components'
import { useAppSelector } from '@/hooks'

import s from './listOfCards.module.scss'

export const ListOfCards = () => {
  const { isLoading, subjectInfo } = useAppSelector(state => state.subjectInfo)

  if (isLoading) {
    return <LinearLoader />
  }

  const mappedCard = subjectInfo.data.map(card => (
    <div className={s.subjectCard} key={card.uniqueId}>
      <SubjectСard card={card} teachers={subjectInfo.teachers} />
    </div>
  ))

  return (
    <>
      <div className={s.wrapperList}>{mappedCard}</div>
      <Button className={s.btn} variant={'contained'}>
        Сохранить
      </Button>
    </>
  )
}
