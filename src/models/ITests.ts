export interface ITests {
  [key: string]: string | number | boolean

  id: number
  name: string
  type: string
  status: string
  siteId: number
}
