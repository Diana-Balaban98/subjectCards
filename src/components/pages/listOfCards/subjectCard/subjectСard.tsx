import { FunctionComponent } from 'react'

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
import data from '@/data.json'
import { AiOutlinePlus } from 'react-icons/ai'

import s from './subjectCard.module.scss'

type SubjectCardProps = {
  additionalInfo: string
  course: string
  exam: boolean
  groupName: string
  laboratoryHours: string
  lecturesHours: string
  offset: boolean
  practiceHours: string
  semester: string
  seminarHours: string
  studentsCount: string
  subjectName: string
}

export const SubjectСard: FunctionComponent<SubjectCardProps> = props => {
  const { course, exam, groupName, offset, semester, studentsCount, subjectName, ...restProps } =
    props

  const renderTableRow = (label: string, value: string, selectEnabled: boolean) => (
    <TableRow>
      <TableCell>{label}</TableCell>
      <TableCell>{value}</TableCell>
      <TableCell>
        <Select disabled={!selectEnabled} options={data['teachers']} placeholder={'Вакансия'} />
      </TableCell>
    </TableRow>
  )

  const classNames = {
    count: s.count,
    name: s.name,
    subjectInfo: s.subjectInfo,
    subjectTitle: s.subjectTitle,
    wrapperCard: s.wrapperCard,
  }

  return (
    <div className={classNames.wrapperCard}>
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
            {renderTableRow('Лекции', restProps.lecturesHours, true)}
            {renderTableRow('Лабораторные работы', restProps.laboratoryHours, false)}
            {renderTableRow('Практические работы', restProps.practiceHours, true)}
            {renderTableRow('Семинарские работы', restProps.seminarHours, false)}
            {offset && renderTableRow('Зачёт', '', true)}
            {exam && renderTableRow('Экзамен', '', true)}
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
