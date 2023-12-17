import { createContext, Dispatch, SetStateAction } from 'react'

interface ContextProps {
  query: string
  setQuery: Dispatch<SetStateAction<string>>
}

const QueryContext = createContext<ContextProps | undefined>(undefined)

export default QueryContext
