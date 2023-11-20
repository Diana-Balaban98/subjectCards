import { FunctionComponent } from 'react'
import React from 'react'

import { Subgroups, Teachers } from '@/api'
import {
  Button,
  Column,
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
import { useAppDispatch } from '@/hooks'
import { setIdTeacher, updateAllTeachers } from '@/state'
import { AiOutlinePlus } from 'react-icons/ai'
import { BiCollection, BiTrash } from 'react-icons/bi'
import { v1 } from 'uuid'

import s from './subjectCard.module.scss'

type SubjectCardProps = {
  cardId: string
  countPodgroups: string
  course: string
  exam: boolean
  groupName: string
  info: string
  laboratoryHours: string
  lecturesHours: string
  offset: boolean
  podgroups: Subgroups[]
  practiceHours: string
  semester: string
  seminarHours: string
  studentsCount: string
  subjectName: string
  teachers: Teachers[]
}

export const SubjectСard: FunctionComponent<SubjectCardProps> = props => {
  const {
    cardId,
    countPodgroups,
    course,
    exam,
    groupName,
    info,
    laboratoryHours,
    lecturesHours,
    offset,
    podgroups,
    practiceHours,
    semester,
    seminarHours,
    studentsCount,
    subjectName,
    teachers,
    ...restProps
  } = props

  const dispatch = useAppDispatch()

  // const dataForRenderTableRow = [
  //   { hours: lecturesHours, label: 'Лекции' },
  //   { hours: laboratoryHours, label: 'Лабораторные работы' },
  //   { hours: practiceHours, label: 'Практические' },
  //   { hours: seminarHours, label: 'Семинарские' },
  //   { hours: '', label: 'Зачёт' },
  //   { hours: '', label: 'Экзамен' },
  // ]

  const nameOfSelect: Record<string, string> = {
    Зачёт: 'offsetTeacher',
    'Лабораторные работы': 'laboratoryTeacher',
    Лекции: 'lectureTeacher',
    'Практические работы': 'practiceTeacher',
    'Семинарские работы': 'seminarTeacher',
    Экзамен: 'examTeacher',
  }

  const valuesForTeachers = [{ id: '9', name: 'Вакансия' }, ...teachers]

  const selectTeacher = (idCard: string, teacherId: string, label: string) => {
    console.log(valuesForTeachers)
    dispatch(setIdTeacher(idCard, teacherId, label))
  }

  const renderColumns = (countPodgroups: string): Column[] => {
    const columns: Column[] = [
      { key: v1(), title: 'Занятие' },
      { key: v1(), title: 'Часы' },
    ]

    if (Number(countPodgroups) > 1) {
      for (let i = 1; i <= Number(countPodgroups); i++) {
        columns.push({ icon: i > 1 ? <BiTrash /> : '', key: v1(), title: `Подгруппа ${i}` })
      }
    } else {
      columns.push({
        icon:
          Number(countPodgroups) > 1 ? (
            <Button>
              <AiOutlinePlus />
            </Button>
          ) : (
            ''
          ),
        key: v1(),
        title: 'Преподаватель',
      })
    }

    return columns
  }

  const mappedColumns = renderColumns(countPodgroups)

  const renderTableRow = (
    label: string,
    value: string,
    selectEnabled: boolean,
    podgroupName: string,
    btn?: boolean
  ) => {
    const updateAllTeachersHandler = () => {
      dispatch(updateAllTeachers(cardId, '10', podgroupName))
    }

    return (
      <TableRow>
        <TableCell>{label}</TableCell>
        <TableCell>{value}</TableCell>
        {podgroups.map((el, i) => {
          //console.log(`${i} ${typeof el[podgroupsName]}`)

          const selectTeacherHandler = (value: string) => {
            dispatch(setIdTeacher(cardId, value, podgroupName, i))
            console.log(el[podgroupName] === '', value, podgroupName, i)
          }

          return (
            <TableCell key={i}>
              <Select
                disabled={selectEnabled}
                onValueChange={selectTeacherHandler}
                //onValueChange={(value: string) => console.log(value)}
                options={valuesForTeachers}
                value={el[podgroupName] ? el[podgroupName] : '9'}
              />
              {btn && (
                <Button onClick={updateAllTeachersHandler} variant={'contained'}>
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
    <div className={s.wrapperCard} {...restProps}>
      <SubjectTitle subjectName={subjectName} />
      <SubjectInfo
        course={course}
        groupName={groupName}
        semester={semester}
        studentsCount={studentsCount}
      />
      <Table>
        <TableHeader columns={mappedColumns} />
        <TableBody>
          <>
            {renderTableRow('Лекции', lecturesHours, !+lecturesHours, 'lectureTeacher', true)}
            {renderTableRow(
              'Лабораторные работы',
              laboratoryHours,
              !+laboratoryHours,
              'laboratoryTeacher'
            )}
            {renderTableRow(
              'Практические работы',
              practiceHours,
              !+practiceHours,
              'practiceTeacher'
            )}
            {renderTableRow('Семинарские работы', seminarHours, !+seminarHours, 'seminarTeacher')}
            {offset && renderTableRow('Зачёт', '', false, 'offsetTeacher')}
            {exam && renderTableRow('Экзамен', '', false, 'examTeacher')}
            {/*{mappedDataForRenderTableRow}*/}
            <TableRow>
              <TableCell>Примечание (для составления примечания)</TableCell>
              <TableCell></TableCell>
              <TableCell>
                <Textarea value={info && info} />
              </TableCell>
            </TableRow>
          </>
        </TableBody>
      </Table>
    </div>
  )
}
