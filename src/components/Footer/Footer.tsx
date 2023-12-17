import { Link, useLocation } from 'react-router-dom'
import styles from './Footer.module.scss'

export default function Footer() {
  const { pathname } = useLocation()

  return (
    <>
      {pathname !== '/' ? (
        <Link to="/" className={styles.link}>
          Back
        </Link>
      ) : (
        ''
      )}
    </>
  )
}
