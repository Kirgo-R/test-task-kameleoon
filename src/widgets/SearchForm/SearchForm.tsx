import React, { useContext } from 'react'
import styles from './SearchForm.module.scss'
import SearchButton from '../../ui/SearchButton/SearchButton'
import { useForm } from '../../hooks/useForm'
import QueryContext from '../../context/queryContext'
import SearchContext from '../../context/searchContext'

export function SearchForm() {
  const { values, handleChange, reset } = useForm()
  const context = useContext(QueryContext)
  const setQuery = context?.setQuery
  const searchContext = useContext(SearchContext)

  const setSearched = searchContext?.setSearched

  function onChange(evt: React.ChangeEvent<HTMLInputElement>) {
    handleChange(evt)
  }

  function handleSearch(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault()
    setQuery && setQuery(values.search)
    setSearched && setSearched(true)
    reset()
  }

  return (
    <form name="search" className={styles.form} onSubmit={handleSearch}>
      <SearchButton />
      <input
        type="text"
        name="search"
        className={styles.input}
        placeholder="What test are you looking for?"
        onChange={onChange}
        value={values.search || ''}
      />
      <span className={styles.info}>7 tests</span>
    </form>
  )
}
