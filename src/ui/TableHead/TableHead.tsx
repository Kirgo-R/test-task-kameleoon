import styles from './TableHead.module.scss'
import React from 'react'
import { TableHeadingProps } from '../../models/TableHeadingProps'
import { useLocation } from 'react-router-dom'

export default function TableHead({
  columnHeading,
  headingId,
  handleSort,
  sort,
}: TableHeadingProps) {
  const { pathname } = useLocation()
  return (
    <th
      key={columnHeading}
      onClick={() => handleSort && handleSort(headingId)}
      className={
        pathname !== '/'
          ? styles['column-heading']
          : !sort
            ? [styles['column-heading_sort'], styles['sorted']].join(' ')
            : styles['column-heading_sort']
      }
    >
      {columnHeading}
    </th>
  )
}
