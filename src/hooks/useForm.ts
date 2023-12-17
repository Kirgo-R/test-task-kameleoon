import { ChangeEvent, useState } from 'react'
import { IFormValues } from '../models/IFormValues'

export function useForm() {
  const [values, setValues] = useState<IFormValues>({})

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setValues(prevValues => ({ ...prevValues, [name]: value }))
  }

  const reset = () => {
    setValues({})
  }

  return { values, handleChange, setValues, reset }
}
