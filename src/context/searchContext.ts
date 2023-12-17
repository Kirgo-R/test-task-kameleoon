import { createContext, Dispatch, SetStateAction } from 'react'

interface ContextProps {
  searched: boolean
  setSearched: Dispatch<SetStateAction<boolean>>
}

const SearchContext = createContext<ContextProps | undefined>(undefined)

export default SearchContext
