import { useLocation, useParams } from 'react-router-dom'
import styles from './Header.module.scss'

export default function Header() {
  const { pathname } = useLocation()
  const { id } = useParams()

  const title =
    pathname === `/results/${id}`
      ? 'Result'
      : pathname === `/finalize/${id}`
        ? 'Finalize'
        : 'Dashboard'

  const subTitle =
    pathname === `/results/${id}`
      ? 'Order basket redesign'
      : pathname === `/finalize/${id}`
        ? 'Spring promotion'
        : ''

  return (
    <header>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{subTitle}</p>
    </header>
  )
}
