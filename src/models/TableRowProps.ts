import { ISites } from './ISites'

export interface TableRowProps {
  id: number
  siteId: number
  testName: string
  getBorderColor: (siteId: number) => string
  testType: string
  testStatus: string
  currentSite: (siteId: number) => string | undefined
  getDomain: (siteId: number, sites?: ISites[]) => string | undefined
}
