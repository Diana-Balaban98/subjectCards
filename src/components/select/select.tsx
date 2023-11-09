import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as RadixSelect from '@radix-ui/react-select'
import { clsx } from 'clsx'
import { BiArrowToBottom, BiArrowToTop } from 'react-icons/bi'
import { RiArrowDownSLine } from 'react-icons/ri'

import s from './select.module.scss'

export type Options = {
  label: string
  value: string
}

export type Props = {
  className?: string
  disabled?: boolean
  options: Options[]
  placeholder?: string
} & ComponentPropsWithoutRef<typeof RadixSelect.Root>

export const Select = forwardRef<ElementRef<typeof RadixSelect.Root>, Props>(
  ({ className, disabled, options, placeholder, ...restProps }, ref) => {
    const mappedOptions = options.map(o => (
      <RadixSelect.Item className={s.selectItem} key={o.value} value={o.value}>
        <RadixSelect.ItemText>{o.label}</RadixSelect.ItemText>
      </RadixSelect.Item>
    ))

    const classNames = {
      selectTrigger: clsx(s.selectTrigger, className),
    }

    return (
      <div>
        <RadixSelect.Root {...restProps}>
          <RadixSelect.Trigger className={classNames.selectTrigger} disabled={disabled} ref={ref}>
            <RadixSelect.Value placeholder={placeholder} />
            <RadixSelect.Icon className={s.selectIcon}>
              <RiArrowDownSLine />
            </RadixSelect.Icon>
          </RadixSelect.Trigger>

          <RadixSelect.Portal>
            <RadixSelect.Content
              className={s.selectContent}
              collisionPadding={0}
              position={'popper'}
              sideOffset={3}
              sticky={'always'}
            >
              <RadixSelect.ScrollUpButton className={s.SelectScrollButton}>
                <BiArrowToTop />
              </RadixSelect.ScrollUpButton>
              <RadixSelect.Viewport className={s.selectViewport}>
                {mappedOptions}
              </RadixSelect.Viewport>
              <RadixSelect.ScrollDownButton className={s.SelectScrollButton}>
                <BiArrowToBottom />
              </RadixSelect.ScrollDownButton>
            </RadixSelect.Content>
          </RadixSelect.Portal>
        </RadixSelect.Root>
      </div>
    )
  }
)
