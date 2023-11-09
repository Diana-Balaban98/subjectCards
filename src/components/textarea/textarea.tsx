import { ComponentPropsWithoutRef, forwardRef } from 'react'

type TextAreaProps = {
  className?: string
} & ComponentPropsWithoutRef<'textarea'>
import { clsx } from 'clsx'

import s from './textarea.module.scss'

export const Textarea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, ...restProps }, ref) => {
    const textAreaClassName = clsx(className, s.textarea)

    return (
      <div>
        <textarea className={textAreaClassName} {...restProps} ref={ref}></textarea>
      </div>
    )
  }
)
