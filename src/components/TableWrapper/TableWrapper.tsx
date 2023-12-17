import { PropsWithChildren } from 'react'
import styles from './TableWrapper.module.scss'

export default function TableWrapper({ children }: PropsWithChildren) {
  return <table className={styles.table}>{children}</table>
}
