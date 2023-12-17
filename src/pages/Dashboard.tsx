import { headings } from '../constants/constants'
import Context from '../context/context'
import { useContext, useEffect, useState } from 'react'
import { ITests } from '../models/ITests'
import { DashboardProps } from '../models/DashboardProps'
import TableHead from '../ui/TableHead/TableHead'
import TableRow from '../ui/TableRow/TableRow'
import TableWrapper from '../components/TableWrapper/TableWrapper'
import QueryContext from '../context/queryContext'
import Button from '../ui/Button/Button'
import SearchContext from '../context/searchContext'

export default function Dashboard({
  getBorderColor,
  getDomain,
  currentSite,
}: DashboardProps) {
  const context = useContext(Context)
  const queryContext = useContext(QueryContext)
  const searchContext = useContext(SearchContext)

  const sites = context?.data.sites || []
  const testsContext = context?.data.tests || []
  const query = queryContext?.query
  const setQuery = queryContext?.setQuery
  const searched = searchContext?.searched
  const setSearched = searchContext?.setSearched

  const [columnHeadings, setColumnHeadings] = useState(headings)
  const [sortedTests, setSortedTests] = useState<ITests[]>([])
  const [sortOrder, setSortOrder] = useState('asc')
  const [tests, setTests] = useState<ITests[]>(testsContext)
  const searchResultNull = tests.length === 0

  useEffect(() => {
    if (query) {
      setTests(
        testsContext.filter(test => {
          return test.name.toLowerCase().includes(query.toLowerCase())
        }),
      )
    } else {
      setTests(testsContext)
    }
  }, [query, testsContext])

  const handleGetDomain = (siteId: number) => {
    return getDomain(siteId, sites)
  }

  const getCurrentSite = (siteId: number) => {
    return currentSite(siteId, sites)
  }
  const handleSort = (id: number) => {
    const selectedHeading = columnHeadings.find(heading => heading.id === id)

    if (selectedHeading) {
      const updatedHeadings = columnHeadings.map(heading =>
        heading.id === id
          ? { ...heading, sort: sortOrder === 'asc' }
          : { ...heading, sort: false },
      )

      setColumnHeadings(updatedHeadings)

      tests &&
        tests.sort((a, b) => {
          if (selectedHeading.columnHeading === 'Site') {
            const domainA = handleGetDomain(a.siteId) || ''
            const domainB = handleGetDomain(b.siteId) || ''

            return sortOrder === 'asc'
              ? domainA.localeCompare(domainB)
              : domainB.localeCompare(domainA)
          } else if (selectedHeading.columnHeading === 'Status') {
            const statusOrder = ['online', 'paused', 'stopped', 'draft']

            const indexA = statusOrder.indexOf(a.status.toLowerCase())
            const indexB = statusOrder.indexOf(b.status.toLowerCase())

            if (indexA === -1 || indexB === -1) {
              return 0
            }

            return sortOrder === 'asc' ? indexA - indexB : indexB - indexA
          } else {
            const aValue = String(
              a[selectedHeading.columnHeading.toLowerCase()] || '',
            )
            const bValue = String(
              b[selectedHeading.columnHeading.toLowerCase()] || '',
            )

            return sortOrder === 'asc'
              ? aValue.localeCompare(bValue)
              : bValue.localeCompare(aValue)
          }
        })

      tests && setSortedTests([...tests])
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    }
  }

  const handleResetSearchResult = () => {
    setTests(tests)
    setSearched && setSearched(false)
    setQuery && setQuery('')
    console.log('reset')
  }

  return !searchResultNull ? (
    <>
      <TableWrapper>
        <thead>
          <tr>
            {columnHeadings.map(heading => (
              <TableHead
                key={heading.id}
                columnHeading={heading.columnHeading}
                headingId={heading.id}
                handleSort={handleSort}
                sort={heading.sort}
              />
            ))}
          </tr>
        </thead>
        {/* todo запрос записал в контекст. теперь нужно его передать в этот компонент и отфильтровать массив тестов*/}
        <tbody>
          {(sortedTests.length > 0 ? sortedTests : tests)?.map(test => (
            <TableRow
              key={test.id}
              id={test.id}
              siteId={test.siteId}
              testName={test.name}
              testType={test.type}
              testStatus={test.status}
              currentSite={getCurrentSite}
              getBorderColor={getBorderColor}
              getDomain={handleGetDomain}
            />
          ))}
        </tbody>
      </TableWrapper>
      {searched && (
        <Button handleReset={handleResetSearchResult} name={'Reset'} />
      )}
    </>
  ) : (
    <>
      <p>Your search did not match any results.</p>
      {searched && (
        <Button handleReset={handleResetSearchResult} name={'Reset'} />
      )}
    </>
  )
}
