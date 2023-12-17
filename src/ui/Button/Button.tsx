import { ButtonProps } from '../../models/ButtonProps'
import styles from './Button.module.scss'

export default function Button({ name, handleReset }: ButtonProps) {
  const buttonStyle =
    name === 'Result'
      ? [styles.button, styles.result].join(' ')
      : name === 'Reset'
        ? [styles.button, styles.reset].join(' ')
        : [styles.button, styles.finalize].join(' ')

  return (
    <button
      onClick={handleReset}
      type="button"
      name={name}
      className={buttonStyle}
    >
      {name}
    </button>
  )
}
