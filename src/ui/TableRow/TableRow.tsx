import styles from './TableRow.module.scss'
import React from 'react'
import { TableRowProps } from '../../models/TableRowProps'
import LinkTest from '../LinkTest/LinkTest'

export default function TableRow({
  testName,
  siteId,
  id,
  testType,
  testStatus,
  getBorderColor,
  currentSite,
  getDomain,
}: TableRowProps) {
  return (
    <tr
      key={id}
      className={`${styles['table-row']} ${
        styles[`border-${getBorderColor(siteId)}`]
      }`}
    >
      <td className={styles.name}>{testName}</td>
      <td className={styles.type}>{testType}</td>
      <td
        className={`${styles.status} ${styles[testStatus.toLowerCase()] || ''}`}
      >
        {testStatus}
      </td>
      <td className={styles.site}>
        <a href={currentSite(siteId)}>{getDomain(siteId)}</a>
      </td>
      <td className={styles.button}>
        <LinkTest
          id={id}
          pathName={[4, 2, 3, 6].includes(id) ? 'results' : 'finalize'}
          name={[4, 2, 3, 6].includes(id) ? 'Result' : 'Finalize'}
        />
      </td>
    </tr>
  )
}
