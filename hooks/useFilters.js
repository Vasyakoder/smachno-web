'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'

export function useFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const categories = useMemo(() => {
    const param = searchParams.get('category')
    return param ? param.split(',') : []
  }, [searchParams])

  const cuisines = useMemo(() => {
    const param = searchParams.get('cuisine')
    return param ? param.split(',') : []
  }, [searchParams])

  const showDiscountOnly = searchParams.get('discount') === 'true'

  const toggleValue = useCallback((param, value) => {
    const current = new Set(searchParams.getAll(param).flatMap(p => p.split(',')))
    if (current.has(value)) {
      current.delete(value)
    } else {
      current.add(value)
    }
    return [...current]
  }, [searchParams])

  const updateFilters = useCallback((type, value) => {
    const current = new URLSearchParams(searchParams.toString())
    const updatedValues = toggleValue(type, value)

    if (updatedValues.length > 0) {
      current.set(type, updatedValues.join(','))
    } else {
      current.delete(type)
    }

    router.push(`?${current.toString()}`)
  }, [router, searchParams, toggleValue])

  const toggleDiscount = useCallback(() => {
    const current = new URLSearchParams(searchParams.toString())
    if (showDiscountOnly) {
      current.delete('discount')
    } else {
      current.set('discount', 'true')
    }
    router.push(`?${current.toString()}`)
  }, [router, searchParams, showDiscountOnly])

  const resetFilters = useCallback(() => {
    router.push(``)
  }, [router])

  return {
    filters: { categories, cuisines },
    showDiscountOnly,
    updateFilters,
    toggleDiscount,
    resetFilters,
  }
}
