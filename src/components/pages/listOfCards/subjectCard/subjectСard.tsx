import { FunctionComponent, useState } from 'react'

import { TSubjectInfo, Teachers } from '@/api'
import {
  Button,
  Select,
  SubjectInfo,
  SubjectTitle,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Textarea,
} from '@/components'
import { renderColumns } from '@/helpers'
import { useAppDispatch } from '@/hooks'
import { removePodgroup, setIdTeacher, updateAllTeachers } from '@/state'
import { BiCollection } from 'react-icons/bi'

import s from './subjectCard.module.scss'

type SubjectCardProps = {
  card: TSubjectInfo
  teachers: Teachers[]
}

export const SubjectСard: FunctionComponent<SubjectCardProps> = ({ card, teachers }) => {
  const [lectureTeacherValue, setLectureTeacherValue] = useState('')
  const dispatch = useAppDispatch()

  const valuesForTeachers = [{ id: '9', name: 'Вакансия' }, ...teachers]

  const deletePodgroup = () => {
    dispatch(removePodgroup(card.uniqueId, 1))
  }

  const mappedColumns = renderColumns(card.countPodgroups, deletePodgroup)

  const renderTableRow = (
    title: string,
    countHours: string,
    selectEnabled: boolean,
    podgroupName: string,
    isButton?: boolean
  ) => {
    return (
      <TableRow>
        <TableCell>{title}</TableCell>
        <TableCell>{countHours}</TableCell>
        {card.podgroups.map((el, index) => {
          //console.log(`${i} ${typeof el[podgroupsName]}`)

          const selectTeacherHandler = (valueId: string) => {
            if (podgroupName === 'lectureTeacher') {
              setLectureTeacherValue(valueId)
            }
            dispatch(setIdTeacher(card.uniqueId, valueId, podgroupName, index))
            //  console.log(podgroupName, selectEnabled)
          }

          const updateAllTeachersHandler = (indexPodgroup: number) => {
            dispatch(updateAllTeachers(card.uniqueId, lectureTeacherValue, indexPodgroup))
          }

          return (
            <TableCell key={`tableCell-${index}`}>
              <Select
                className={s.select}
                disabled={selectEnabled}
                onValueChange={selectTeacherHandler}
                options={valuesForTeachers}
                value={el[podgroupName] ? el[podgroupName] : valuesForTeachers[0].id}
              />
              {isButton && (
                <Button onClick={() => updateAllTeachersHandler(index)} variant={'contained'}>
                  <BiCollection />
                </Button>
              )}
            </TableCell>
          )
        })}
      </TableRow>
    )
  }

  // const mappedDataForRenderTableRow = dataForRenderTableRow.map((d, i) => {
  //   return renderTableRow(d.label, d.hours, !+d.hours, '', i === 0)
  // })

  return (
    <div className={s.wrapperCard}>
      <SubjectTitle subjectName={card.subjectName} />
      <SubjectInfo
        course={card.course}
        groupName={card.groupName}
        semester={card.semestr}
        studentsCount={card.studentsNumber}
      />
      <Table>
        <TableHeader columns={mappedColumns} />
        <TableBody>
          <>
            {renderTableRow(
              'Лекции',
              card.lecturesHours,
              !Number(card.lecturesHours),
              'lectureTeacher',
              true
            )}
            {renderTableRow(
              'Лабораторные работы',
              card.laboratoryHours,
              !Number(card.laboratoryHours),
              'laboratoryTeacher'
            )}
            {renderTableRow(
              'Практические',
              card.practicHours,
              !Number(card.practicHours),
              'practiceTeacher'
            )}
            {renderTableRow(
              'Семинарские',
              card.seminarHours,
              !Number(card.seminarHours),
              'seminarTeacher'
            )}
            {card.offset && renderTableRow('Зачёт', '', false, 'offsetTeacher')}
            {card.exam && renderTableRow('Экзамен', '', false, 'examTeacher')}
            {/*{mappedDataForRenderTableRow}*/}
            <TableRow>
              <TableCell>Примечание (для составления примечания)</TableCell>
              <TableCell></TableCell>
              <TableCell>
                <Textarea value={card.additionalInfo && card.additionalInfo} />
              </TableCell>
            </TableRow>
          </>
        </TableBody>
      </Table>
    </div>
  )
}
