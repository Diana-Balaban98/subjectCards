import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import { TableHead, TableHeadCell, TableRow } from '@/components'

export type Column = {
  icon?: ReactNode
  key: string
  title: string
}

type TableHeaderProps = Omit<
  ComponentPropsWithoutRef<'thead'> & {
    columns: Column[]
  },
  'children'
>

export const TableHeader = forwardRef<ElementRef<'thead'>, TableHeaderProps>(
  ({ columns, ...rest }, ref) => {
    return (
      <TableHead ref={ref} {...rest}>
        <TableRow>
          {columns.map(column => {
            return (
              <TableHeadCell key={column.key}>
                <div>
                  <span>{column.title}</span>
                  {column.icon && column.icon}
                </div>
              </TableHeadCell>
            )
          })}
        </TableRow>
      </TableHead>
    )
  }
)

// {renderTableRow(
//     'Лекции',
//     lecturesHours,
//     !+lecturesHours,
//     podgroups[0].lectureTeacher,
//     true
// )}
// {renderTableRow(
//     'Лабораторные работы',
//     laboratoryHours,
//     !+laboratoryHours,
//     podgroups[0].laboratoryTeacher
// )}
// {renderTableRow(
//     'Практические работы',
//     practiceHours,
//     !+practiceHours,
//     podgroups[0].practiceTeacher
// )}
// {renderTableRow(
//     'Семинарские работы',
//     seminarHours,
//     !+seminarHours,
//     podgroups[0].seminarTeacher
// )}
// {offset && renderTableRow('Зачёт', '', false, podgroups[0].offsetTeacher)}
// {exam && renderTableRow('Экзамен', '', false, podgroups[0].examTeacher)}
// <TableRow>
//     <TableCell>Примечание (для составления примечания)</TableCell>
//     <TableCell></TableCell>
//     <TableCell>
//         <Textarea value={info && info} />
//     </TableCell>
// </TableRow>
// </>
