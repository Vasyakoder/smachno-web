'use client'

import { useBaseDishes } from '@/hooks/useBaseDishes'
import BaseDishCard from '@/components/BaseDishCard'
import FiltersSidebar from '@/components/FiltersSidebar'

export default function CatalogPage() {
  const { baseDishes, loading, error } = useBaseDishes()

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <aside className="w-full max-w-xs p-4 sticky top-0 h-screen overflow-y-auto border-r border-gray-200 bg-gray-50">
        <h2 className="text-lg font-semibold mb-4">Фільтри</h2>
        <FiltersSidebar />
      </aside>

      <section className="flex-1 p-4">
        {loading ? (
          <p className="text-center text-gray-500">Завантаження...</p>
        ) : error ? (
          <p className="text-center text-red-500">Помилка завантаження</p>
        ) : baseDishes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {baseDishes.map((dish) => (
              <BaseDishCard key={dish.id} dish={dish} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Страв не знайдено</p>
        )}
      </section>
    </div>
  )
}
