import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { SearchNameSchema, NameSchema } from '../utils/rules'
import { useState } from 'react'

type FormData = NameSchema
const nameSchema = SearchNameSchema

export default function useSearchProducts() {
  const [searchName, setSearchName] = useState('')

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(nameSchema)
  })

  const onSubmitSearch = handleSubmit((data) => {
    setSearchName(data.name)
  })

  return { onSubmitSearch, register, searchName }
}
