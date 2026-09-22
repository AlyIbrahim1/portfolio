import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode, Ref } from 'react'
import { Icon } from './Icon'
import type { IconName } from '../../types/portfolio'

type CommonProps = {
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon'
  size?: 'md' | 'sm'
  round?: boolean
  icon?: IconName
  iconStart?: IconName
  shine?: boolean
  children?: ReactNode
}

type LinkButtonProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
    href: string
    ref?: Ref<HTMLAnchorElement>
  }

type NativeButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never
    ref?: Ref<HTMLButtonElement>
  }

export type ButtonProps = LinkButtonProps | NativeButtonProps

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    round = false,
    icon,
    iconStart,
    shine = false,
    children,
    className = '',
    ...rest
  } = props
  const classes = [
    'btn',
    `btn-${variant}`,
    size === 'sm' ? 'btn-sm' : '',
    round ? 'is-round' : '',
    shine ? 'shine-sweep' : '',
    className,
  ].filter(Boolean).join(' ')
  const content = (
    <>
      {iconStart && <Icon name={iconStart} />}
      {children}
      {icon && <Icon name={icon} />}
    </>
  )

  if (props.href) {
    return <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} href={props.href}>{content}</a>
  }

  return <button className={classes} type="button" {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>{content}</button>
}
