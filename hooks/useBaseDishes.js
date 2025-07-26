'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useSearchParams } from 'next/navigation'

export default function useBaseDishes() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  const searchParams = useSearchParams()

  const [baseDishes, setBaseDishes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const filtersString = searchParams.get('filters')
  let filters = {}

  try {
    filters = filtersString ? JSON.parse(filtersString) : {}
  } catch (err) {
    console.error('❌ Ошибка парсинга filters JSON:', err)
    filters = {}
  }

  useEffect(() => {
    const fetchBaseDishes = async () => {
      setLoading(true)
      setError(null)

      try {
        let query = supabase.from('base_dishes').select('*, dishes(*)')

        if (filters.category?.length) {
          query = query.in('category', filters.category)
        }

        if (filters.cuisine?.length) {
          query = query.in('cuisine', filters.cuisine)
        }

        if (filters.discount === true) {
          query = query.gte('min_discount', 1)
        }

        const { data, error } = await query

        if (error) {
          console.error('❌ Supabase error:', error)
          setError(error)
          setBaseDishes([])
        } else {
          setBaseDishes(data || [])
        }
      } catch (err) {
        console.error('❌ Unexpected error:', err)
        setError(err)
        setBaseDishes([])
      }

      setLoading(false)
    }

    fetchBaseDishes()
  }, [filtersString])

  return { baseDishes, loading, error }
}
