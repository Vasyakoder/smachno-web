'use client'

import { useEffect, useState } from 'react'
import { useFilters } from './useFilters'

export function useBaseDishes() {
  const [baseDishes, setBaseDishes] = useState([])
  const { filters, showDiscountOnly } = useFilters()

  useEffect(() => {
    const fetchDishes = async () => {
      const res = await fetch('/api/base-dishes')
      const data = await res.json()
      setBaseDishes(data)
    }

    fetchDishes()
  }, [])

  const filteredDishes = baseDishes.filter((dish) => {
    const matchesCategory =
      filters.categories.length === 0 ||
      filters.categories.includes(dish.category)

    const matchesCuisine =
      filters.cuisines.length === 0 ||
      filters.cuisines.includes(dish.cuisine)

    const matchesDiscount =
      !showDiscountOnly || dish.dishes.some((d) => d.discount > 0)

    return matchesCategory && matchesCuisine && matchesDiscount
  })

  return { baseDishes, filteredDishes }
}
