import { ChangeEvent, ComponentPropsWithoutRef, KeyboardEvent, ReactNode, forwardRef } from 'react'

import { clsx } from 'clsx'

import s from './input.module.scss'

export type InputProps = {
  error?: string
  leftIcon?: ReactNode
  onEnter?: (e: KeyboardEvent<HTMLInputElement>) => void
  onTextChange?: (value: string) => void
  rightIcon?: ReactNode
} & ComponentPropsWithoutRef<'input'>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      disabled,
      error,
      leftIcon,
      onChange,
      onEnter,
      onKeyDown,
      onTextChange,
      rightIcon,
      ...restProps
    },
    ref
  ) => {
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
      onTextChange?.(e.currentTarget.value)
    }

    const handleEnterKey = (e: KeyboardEvent<HTMLInputElement>) => {
      if (onEnter && e.key === 'Enter') {
        onEnter(e)
      }
      onKeyDown?.(e)
    }

    const classNames = {
      box: s.box,
      input: clsx(s.defaultInput, className, error && s.withErr, leftIcon && s.identIcon),
      inputContainer: s.inputContainer,
      leftIcon: s.leftIcon,
      rightIcon: s.rightIcon,
    }

    return (
      <div className={classNames.box}>
        <div className={classNames.inputContainer}>
          {leftIcon && <div className={classNames.leftIcon}>{leftIcon}</div>}
          <input
            className={classNames.input}
            disabled={disabled}
            onChange={handleInputChange}
            onKeyDown={handleEnterKey}
            ref={ref}
            {...restProps}
          />
          {rightIcon && <div className={classNames.rightIcon}>{rightIcon}</div>}
        </div>
        {error && <span className={s.inputError}>{error}</span>}
      </div>
    )
  }
)
