import Image from 'next/image'
import Tag from './Tag'

export default function BaseDishCard({ dish }) {
  const minPrice = Math.min(...dish.dishes.map(d => d.price)).toFixed(2)

  return (
    <div className="bg-white rounded-lg shadow-md border hover:shadow-lg transition overflow-hidden flex flex-col">
      <div className="relative w-full aspect-[4/3]">
        <Image
          src={dish.image || '/placeholder.png'}
          alt={dish.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-2">{dish.name}</h3>
          <div className="flex flex-wrap gap-2 text-sm mb-3">
            {dish.category && <Tag type="category" value={dish.category} />}
            {dish.cuisine && <Tag type="cuisine" value={dish.cuisine} />}
          </div>
        </div>

        <div className="flex items-end justify-between mt-auto">
          <p className="text-green-600 font-bold text-base">
            від {minPrice} грн
          </p>
          {/* Здесь позже будут кнопки ♡ и ♻ */}
        </div>
      </div>
    </div>
  )
}
