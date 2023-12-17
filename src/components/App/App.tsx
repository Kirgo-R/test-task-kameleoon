import { Route, Routes } from 'react-router-dom'
import Layout from '../Layout/Layout'
import Dashboard from '../../pages/Dashboard'
import Context from '../../context/context'
import { useEffect, useMemo, useState } from 'react'
import { api } from '../../utils/api'
import { ISites } from '../../models/ISites'
import { ITests } from '../../models/ITests'
import SingleTest from '../../pages/SingleTest'
import QueryContext from '../../context/queryContext'
import SearchContext from '../../context/searchContext'

export default function App() {
  const [data, setData] = useState({
    sites: [] as ISites[],
    tests: [] as ITests[],
    finalize: [] as ITests[],
    results: [] as ITests[],
  })
  const [query, setQuery] = useState('')
  const [searched, setSearched] = useState(false)

  useEffect(() => {
    api
      .getSites()
      .then(res => {
        setData(prevData => ({ ...prevData, sites: res.data }))
      })
      .catch(err => console.error(`Ошибка при получении списка сайтов ${err}`))
  }, [])

  useEffect(() => {
    api
      .getTests()
      .then(res => {
        setData(prevData => ({ ...prevData, tests: res.data }))
      })
      .catch(err => console.error(`Ошибка при получении списка тестов ${err}`))
  }, [])

  const getBorderColor = (siteId: number): string => {
    switch (siteId) {
      case 1:
        return 'red'
      case 2:
        return 'sky'
      case 3:
        return 'blue'
      default:
        return ''
    }
  }

  const getDomain = (siteId: number, sites: ISites[]): string | undefined => {
    const site = sites?.find(site => site.id === siteId)
    return (
      site &&
      (site.url || '')
        .replace(/^(https?:\/\/)?(www\.)?/i, '')
        .replace(/\/$/, '')
    )
  }

  const currentSite = (siteId: number, sites: ISites[]): string | undefined => {
    const site = sites?.find(site => site.id === siteId)
    if (site) {
      return site.url
    }
  }

  const memoizedData = useMemo(() => ({ data }), [data])

  return (
    <>
      <SearchContext.Provider value={{ searched, setSearched }}>
        <QueryContext.Provider value={{ query, setQuery }}>
          <Context.Provider value={memoizedData}>
            <Routes>
              <Route element={<Layout />} path="/">
                <Route
                  index
                  element={
                    <Dashboard
                      getBorderColor={getBorderColor}
                      getDomain={getDomain}
                      currentSite={currentSite}
                    />
                  }
                />
                <Route
                  element={
                    <SingleTest
                      getBorderColor={getBorderColor}
                      currentSite={currentSite}
                      getDomain={getDomain}
                    />
                  }
                  path="/finalize/:id"
                />
                <Route
                  element={
                    <SingleTest
                      getBorderColor={getBorderColor}
                      currentSite={currentSite}
                      getDomain={getDomain}
                    />
                  }
                  path="/results/:id"
                />
              </Route>
            </Routes>
          </Context.Provider>
        </QueryContext.Provider>
      </SearchContext.Provider>
    </>
  )
}
