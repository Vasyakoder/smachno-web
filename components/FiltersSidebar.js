'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const FilterSection = ({ title, name, options, selectedValues, onChange }) => (
  <div className="mb-4">
    <h3 className="font-semibold mb-2">{title}</h3>
    {options.map((value) => (
      <label key={value} className="block text-sm">
        <input
          type="checkbox"
          value={value}
          checked={selectedValues.includes(value)}
          onChange={() => onChange(name, value)}
          className="mr-2"
        />
        {value}
      </label>
    ))}
  </div>
)

export default function FiltersSidebar({ availableCategories, availableCuisines }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedCuisines, setSelectedCuisines] = useState([])
  const [discountOnly, setDiscountOnly] = useState(false)

  useEffect(() => {
    const categories = searchParams.get('category')?.split(',') || []
    const cuisines = searchParams.get('cuisine')?.split(',') || []
    const discount = searchParams.get('discount') === 'true'
    setSelectedCategories(categories)
    setSelectedCuisines(cuisines)
    setDiscountOnly(discount)
  }, [searchParams])

  const updateParam = (key, values) => {
    const params = new URLSearchParams(searchParams.toString())
    if (values.length > 0) {
      params.set(key, values.join(','))
    } else {
      params.delete(key)
    }
    router.push(`?${params.toString()}`)
  }

  const toggleValue = (key, value, selected, setSelected) => {
    const newSelected = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value]
    setSelected(newSelected)
    updateParam(key, newSelected)
  }

  const handleDiscountChange = () => {
    const params = new URLSearchParams(searchParams.toString())
    const newValue = !discountOnly
    setDiscountOnly(newValue)
    if (newValue) {
      params.set('discount', 'true')
    } else {
      params.delete('discount')
    }
    router.push(`?${params.toString()}`)
  }

  const handleReset = () => {
    router.push('/')
  }

  return (
    <aside className="p-4 border rounded-lg shadow-sm bg-white w-full md:w-64">
      <h2 className="text-lg font-bold mb-4">Фільтри</h2>

      <FilterSection
        title="Категорії"
        name="category"
        options={availableCategories}
        selectedValues={selectedCategories}
        onChange={(name, value) =>
          toggleValue(name, value, selectedCategories, setSelectedCategories)
        }
      />

      <FilterSection
        title="Кухня"
        name="cuisine"
        options={availableCuisines}
        selectedValues={selectedCuisines}
        onChange={(name, value) =>
          toggleValue(name, value, selectedCuisines, setSelectedCuisines)
        }
      />

      <div className="mb-4">
        <label className="text-sm">
          <input
            type="checkbox"
            checked={discountOnly}
            onChange={handleDiscountChange}
            className="mr-2"
          />
          Тільки зі знижкою
        </label>
      </div>

      <button
        onClick={handleReset}
        className="text-sm text-blue-600 underline mt-2"
      >
        Скинути фільтри
      </button>
    </aside>
  )
}
