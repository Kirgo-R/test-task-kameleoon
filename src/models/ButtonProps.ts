import { MouseEventHandler } from 'react'

export interface ButtonProps {
  name: string
  handleReset?: MouseEventHandler<HTMLButtonElement> | undefined
}
