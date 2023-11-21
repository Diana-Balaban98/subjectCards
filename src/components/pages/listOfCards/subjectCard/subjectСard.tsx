import { ChangeEvent, FunctionComponent, KeyboardEvent, useState } from 'react'

import { TSubjectInfo, Teachers } from '@/api'
import {
  Button,
  Input,
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
import { removePodgroup, setIdTeacher, updateAdditionalInfo, updateAllTeachers } from '@/state'
import { BiCollection } from 'react-icons/bi'

import s from './subjectCard.module.scss'

type SubjectCardProps = {
  card: TSubjectInfo
  teachers: Teachers[]
}

export const SubjectСard: FunctionComponent<SubjectCardProps> = ({ card, teachers }) => {
  const [lectureTeacherValue, setLectureTeacherValue] = useState('')
  const [additionalInfoValue, setAdditionalInfo] = useState(card.additionalInfo)
  const dispatch = useAppDispatch()

  const valuesForTeachers = [{ id: '9', name: 'Вакансия' }, ...teachers]

  const deletePodgroup = () => {
    dispatch(removePodgroup(card.uniqueId, 1))
  }

  const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setAdditionalInfo(e.currentTarget.value)
  }

  const onKeyDownHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      dispatch(updateAdditionalInfo(card.uniqueId, additionalInfoValue))
    }
  }

  const mappedColumns = renderColumns(card.countPodgroups, deletePodgroup)

  const renderTableRow = (
    title: string,
    countHours: string,
    selectEnabled: boolean,
    podgroupName: string,
    isSelect?: boolean,
    isButton?: boolean,
    isTextArea?: boolean,
    isTextField?: boolean
  ) => {
    return (
      <TableRow>
        <TableCell>{title}</TableCell>
        <TableCell>{countHours}</TableCell>
        {card.podgroups.map((el, index) => {
          const selectTeacherHandler = (valueId: string) => {
            if (podgroupName === 'lectureTeacher') {
              setLectureTeacherValue(valueId)
            }
            dispatch(setIdTeacher(card.uniqueId, valueId, podgroupName, index))
          }

          const updateAllTeachersHandler = (indexPodgroup: number) => () => {
            console.log(title, countHours)
            dispatch(updateAllTeachers(card.uniqueId, lectureTeacherValue, indexPodgroup))
          }

          return (
            <TableCell key={`tableCell-${index}`}>
              {isSelect && (
                <>
                  <Select
                    className={s.select}
                    disabled={selectEnabled}
                    name={podgroupName}
                    onValueChange={selectTeacherHandler}
                    options={valuesForTeachers}
                    value={el[podgroupName] ? el[podgroupName] : valuesForTeachers[0].id}
                  />
                  {isButton && (
                    <Button onClick={updateAllTeachersHandler(index)} variant={'contained'}>
                      <BiCollection />
                    </Button>
                  )}
                </>
              )}
              {isTextArea && (
                <Textarea
                  onChange={onChangeHandler}
                  onKeyDown={onKeyDownHandler}
                  value={additionalInfoValue}
                />
              )}
              {isTextField && <Input type={'number'} value={el.countStudents} />}
            </TableCell>
          )
        })}
      </TableRow>
    )
  }

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
              true,
              true,
              false
            )}
            {renderTableRow(
              'Лабораторные работы',
              card.laboratoryHours,
              !Number(card.laboratoryHours),
              'laboratoryTeacher',
              true,
              false
            )}
            {renderTableRow(
              'Практические',
              card.practicHours,
              !Number(card.practicHours),
              'practiceTeacher',
              true
            )}
            {renderTableRow(
              'Семинарские',
              card.seminarHours,
              !Number(card.seminarHours),
              'seminarTeacher',
              true
            )}
            {card.offset && renderTableRow('Зачёт', '', false, 'offsetTeacher', true)}
            {card.exam && renderTableRow('Экзамен', '', false, 'examTeacher', true)}
            {Number(card.countPodgroups) > 1 &&
              renderTableRow('Количество человек', '', false, '', false, false, false, true)}
            {renderTableRow(
              'Примечание (для составления примечания)',
              '',
              false,
              '',
              false,
              false,
              true,
              false
            )}
            {/*{mappedDataForRenderTableRow}*/}
          </>
        </TableBody>
      </Table>
    </div>
  )
}
