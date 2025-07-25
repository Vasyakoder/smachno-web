'use client'

import { useState, useEffect } from 'react'

export function useFilters() {
  const [filters, setFilters] = useState({
    categories: [],
    cuisines: [],
  })

  const [showDiscountOnly, setShowDiscountOnly] = useState(false)

  const [uniqueCategories, setUniqueCategories] = useState([])
  const [uniqueCuisines, setUniqueCuisines] = useState([])

  // Загружаем уникальные категории и кухни один раз при инициализации
  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/base-dishes')
      const data = await res.json()

      const categories = [...new Set(data.map((dish) => dish.category).filter(Boolean))]
      const cuisines = [...new Set(data.map((dish) => dish.cuisine).filter(Boolean))]

      setUniqueCategories(categories)
      setUniqueCuisines(cuisines)
    }

    fetchData()
  }, [])

  function setFilter(type, value) {
    setFilters((prev) => {
      const updated = prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value]
      return { ...prev, [type]: updated }
    })
  }

  function resetFilters() {
    setFilters({ categories: [], cuisines: [] })
    setShowDiscountOnly(false)
  }

  return {
    filters,
    setFilter,
    resetFilters,
    uniqueCategories,
    uniqueCuisines,
    showDiscountOnly,
    setShowDiscountOnly,
  }
}
