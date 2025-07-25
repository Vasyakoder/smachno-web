'use client'

import { useFilters } from '@/hooks/useFilters'

export default function FiltersSidebar() {
  const {
    filters,
    setFilter,
    resetFilters,
    uniqueCategories,
    uniqueCuisines,
    showDiscountOnly,
    setShowDiscountOnly,
  } = useFilters()

  return (
    <div className="flex flex-col gap-4 text-sm text-gray-800">
      <div>
        <h3 className="font-semibold mb-1">Категорії</h3>
        <div className="flex flex-col gap-1">
          {uniqueCategories.length > 0 ? (
            uniqueCategories.map((category) => (
              <label key={category} className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={() => setFilter('categories', category)}
                />
                {category}
              </label>
            ))
          ) : (
            <p className="text-gray-400">Категорії недоступні</p>
          )}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-1">Кухня</h3>
        <div className="flex flex-col gap-1">
          {uniqueCuisines.length > 0 ? (
            uniqueCuisines.map((cuisine) => (
              <label key={cuisine} className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.cuisines.includes(cuisine)}
                  onChange={() => setFilter('cuisines', cuisine)}
                />
                {cuisine}
              </label>
            ))
          ) : (
            <p className="text-gray-400">Кухні недоступні</p>
          )}
        </div>
      </div>

      <label className="inline-flex items-center gap-2">
        <input
          type="checkbox"
          checked={showDiscountOnly}
          onChange={() => setShowDiscountOnly((prev) => !prev)}
        />
        Тільки зі знижкою
      </label>

      <button
        onClick={resetFilters}
        className="text-blue-600 underline text-sm mt-2"
      >
        Скинути фільтри
      </button>
    </div>
  )
}
