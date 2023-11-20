import { useEffect } from 'react'

import { ListOfCards } from '@/components'
import { useAppDispatch } from '@/hooks'
import { fetchData } from '@/state'

export function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch])

  return <ListOfCards />
}
