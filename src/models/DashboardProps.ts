import { ISites } from './ISites'

export interface DashboardProps {
  getBorderColor: (siteId: number) => string
  getDomain: (siteId: number, sites: ISites[]) => string | undefined
  currentSite: (siteId: number, sites: ISites[]) => string | undefined
}
