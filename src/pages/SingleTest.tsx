import TableWrapper from '../components/TableWrapper/TableWrapper'
import TableHead from '../ui/TableHead/TableHead'
import { headings } from '../constants/constants'
import TableRow from '../ui/TableRow/TableRow'
import { useContext, useEffect, useState } from 'react'
import { ITests } from '../models/ITests'
import { api } from '../utils/api'
import { useParams } from 'react-router-dom'
import { DashboardProps } from '../models/DashboardProps'
import Context from '../context/context'

export default function SingleTest({
  getBorderColor,
  getDomain,
  currentSite,
}: DashboardProps) {
  const [test, setTest] = useState<ITests | null>(null)
  const { id } = useParams()

  const context = useContext(Context)
  const sites = context?.data.sites || []

  useEffect(() => {
    id &&
      api.getTestById(id).then(res => {
        setTest(res.data)
      })
  }, [id])

  const handleGetDomain = (siteId: number) => {
    return getDomain(siteId, sites)
  }

  const getCurrentSite = (siteId: number) => {
    return currentSite(siteId, sites)
  }

  return (
    <TableWrapper>
      <thead>
        <tr>
          {headings.map(heading => (
            <TableHead
              key={heading.id}
              columnHeading={heading.columnHeading}
              headingId={heading.id}
            />
          ))}
        </tr>
      </thead>
      <tbody>
        <TableRow
          id={test?.id || 0}
          siteId={test?.siteId || 0}
          testName={test?.name || ''}
          getBorderColor={getBorderColor}
          testType={test?.type || ''}
          testStatus={test?.status || ''}
          currentSite={handleGetDomain}
          getDomain={getCurrentSite}
        />
      </tbody>
    </TableWrapper>
  )
}
