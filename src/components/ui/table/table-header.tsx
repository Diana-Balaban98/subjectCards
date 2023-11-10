import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import { TableHead, TableHeadCell, TableRow } from '@/components'

type Column = {
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
