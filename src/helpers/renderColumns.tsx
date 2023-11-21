import { Button, Column } from '@/components'
import { AiOutlinePlus } from 'react-icons/ai'
import { BiTrash } from 'react-icons/bi'

export const renderColumns = (countPodgroups: string, deletePodgroup: () => void): Column[] => {
  const columns: Column[] = [
    { key: 'lesson', title: 'Занятие' },
    { key: 'hours', title: 'Часы' },
  ]

  const totalCountPodgroups = Number(countPodgroups)

  if (totalCountPodgroups > 1) {
    for (let i = 1; i <= totalCountPodgroups; i++) {
      columns.push({
        icon:
          i > 1 ? (
            <Button onClick={deletePodgroup}>
              <BiTrash />
            </Button>
          ) : (
            ''
          ),
        key: `podgroup-${i}`,
        title: `Подгруппа ${i}`,
      })
    }
  } else {
    columns.push({
      icon:
        totalCountPodgroups > 1 ? (
          <Button>
            <AiOutlinePlus />
          </Button>
        ) : (
          ''
        ),
      key: 'teacher',
      title: 'Преподаватель',
    })
  }

  return columns
}
