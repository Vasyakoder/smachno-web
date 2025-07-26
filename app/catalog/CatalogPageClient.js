'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useSearchParams, useRouter } from 'next/navigation'
import BaseDishCard from '@/components/BaseDishCard'

export default function CatalogPageClient() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  const searchParams = useSearchParams()
  const [baseDishes, setBaseDishes] = useState([])
  const [loading, setLoading] = useState(true)

  const filtersString = searchParams.get('filters')
  let filters = {}

  try {
    filters = filtersString ? JSON.parse(filtersString) : {}
  } catch (error) {
    console.error('Invalid filters JSON:', error)
  }

  useEffect(() => {
    async function fetchBaseDishes() {
      setLoading(true)

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
        console.error('Ошибка при загрузке base_dishes:', error)
      }

      setBaseDishes(data || [])
      setLoading(false)
    }

    fetchBaseDishes()
  }, [filtersString])

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {loading ? (
        <p>Завантаження...</p>
      ) : baseDishes.length === 0 ? (
        <p>Страви не знайдені.</p>
      ) : (
        baseDishes.map((dish) => <BaseDishCard key={dish.id} dish={dish} />)
      )}
    </div>
  )
}
