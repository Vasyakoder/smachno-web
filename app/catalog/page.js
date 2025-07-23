import { createSupabaseServerClient } from '@/lib/supabaseServerClient'
import FiltersSidebar from '@/components/FiltersSidebar'
import BaseDishCard from '@/components/BaseDishCard'
import { notFound } from 'next/navigation'

export default async function CatalogPage({ searchParams }) {
  const supabase = await createSupabaseServerClient()

  // Получаем все base_dishes
  let query = supabase.from('base_dishes').select('*')

  // Применяем фильтры
  if (searchParams.category) {
    const categories = searchParams.category.split(',')
    query = query.in('category', categories)
  }

  if (searchParams.cuisine) {
    const cuisines = searchParams.cuisine.split(',')
    query = query.in('cuisine', cuisines)
  }

  if (searchParams.discount === 'true') {
    query = query.gt('discount', 0)
  }

  const { data: baseDishes, error } = await query

  if (error) {
    console.error(error)
    return notFound()
  }

  // Получаем все уникальные категории и кухни (для фильтров)
  const { data: allDishes } = await supabase.from('base_dishes').select('category, cuisine')
  const availableCategories = Array.from(new Set(allDishes.map((d) => d.category).filter(Boolean)))
  const availableCuisines = Array.from(new Set(allDishes.map((d) => d.cuisine).filter(Boolean)))

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-64">
        <FiltersSidebar
          availableCategories={availableCategories}
          availableCuisines={availableCuisines}
        />
      </div>

      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {baseDishes.length > 0 ? (
          baseDishes.map((dish) => <BaseDishCard key={dish.id} dish={dish} />)
        ) : (
          <p className="col-span-full text-center text-gray-600">Страв не знайдено</p>
        )}
      </div>
    </div>
  )
}
