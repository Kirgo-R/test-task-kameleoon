import { createContext } from 'react'
import { ServerData } from '../models/ServerData'

interface ContextProps {
  data: ServerData
}

const Context = createContext<ContextProps | undefined>(undefined)

export default Context
