import { LinkProps } from '../../models/LinkProps'
import { Link, useLocation } from 'react-router-dom'
import Button from '../Button/Button'

export default function LinkTest({ name, pathName, id }: LinkProps) {
  const { pathname } = useLocation()

  const isRootPath = pathname === '/'

  return isRootPath ? (
    <Link to={`${pathName}/${id}`}>
      <Button name={name} />
    </Link>
  ) : (
    <Button name={name} />
  )
}
