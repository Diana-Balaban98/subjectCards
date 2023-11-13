import { FunctionComponent } from 'react'

import { Subgroups, Teachers } from '@/api'
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
import { useAppDispatch } from '@/hooks'
import { setIdTeacher, updateAllTeachers } from '@/state'
import { AiOutlinePlus } from 'react-icons/ai'
import { BiCollection } from 'react-icons/bi'

import s from './subjectCard.module.scss'

type SubjectCardProps = {
  cardId: string
  course: string
  exam: boolean
  groupName: string
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
    course,
    exam,
    groupName,
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
    dispatch(setIdTeacher(idCard, teacherId, label))
  }

  const renderTableRow = (
    label: string,
    value: string,
    selectEnabled: boolean,
    podgroup: string,
    btn?: boolean
  ) => {
    const selectTeacherHandler = (value: string) => {
      selectTeacher(cardId, value, nameOfSelect[label])
    }
    const updateAllTeachersHandler = () => {
      dispatch(updateAllTeachers(cardId, '10', nameOfSelect[label]))
    }

    return (
      <TableRow>
        <TableCell>{label}</TableCell>
        <TableCell>{value}</TableCell>
        <Select
          defaultValue={'9'}
          disabled={selectEnabled}
          onValueChange={selectTeacherHandler}
          options={valuesForTeachers}
          value={podgroup ? podgroup : '9'}
        />
        {btn && (
          <Button onClick={updateAllTeachersHandler} variant={'contained'}>
            <BiCollection />
          </Button>
        )}
      </TableRow>
    )
  }

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
        <TableHeader
          columns={[
            { key: '1', title: 'Занятие' },
            { key: '2', title: 'Часы' },
            {
              icon: (
                <Button>
                  <AiOutlinePlus />
                </Button>
              ),
              key: '3',
              title: 'Преподаватель',
            },
          ]}
        />
        <TableBody>
          <>
            {renderTableRow(
              'Лекции',
              lecturesHours,
              !+lecturesHours,
              podgroups[0].lectureTeacher,
              true
            )}
            {renderTableRow(
              'Лабораторные работы',
              laboratoryHours,
              !+laboratoryHours,
              podgroups[0].laboratoryTeacher
            )}
            {renderTableRow(
              'Практические работы',
              practiceHours,
              !+practiceHours,
              podgroups[0].practiceTeacher
            )}
            {renderTableRow(
              'Семинарские работы',
              seminarHours,
              !+seminarHours,
              podgroups[0].seminarTeacher
            )}
            {offset && renderTableRow('Зачёт', '', false, podgroups[0].offsetTeacher)}
            {exam && renderTableRow('Экзамен', '', false, podgroups[0].examTeacher)}
            <TableRow>
              <TableCell>Примечание (для составления примечания)</TableCell>
              <TableCell></TableCell>
              <TableCell>
                <Textarea />
              </TableCell>
            </TableRow>
          </>
        </TableBody>
      </Table>
    </div>
  )
}
