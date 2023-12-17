import Header from '../Header/Header'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../Footer/Footer'
import styles from './Layout.module.scss'
import { SearchForm } from '../../widgets/SearchForm/SearchForm'

export default function Layout() {
  const { pathname } = useLocation()

  return (
    <>
      <Header />
      <main className={styles.main}>
        {pathname === '/' ? <SearchForm /> : ''}
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
