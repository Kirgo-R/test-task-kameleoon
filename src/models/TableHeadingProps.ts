export interface TableHeadingProps {
  columnHeading: string
  headingId: number
  handleSort?: (id: number) => void
  sort?: boolean
}
