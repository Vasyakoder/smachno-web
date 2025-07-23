'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function BaseDishCard({ dish }) {
  const { id, name, image_url, category, cuisine } = dish

  return (
    <Link href={`/catalog/${id}`} className="block">
      <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-white flex flex-col h-full">
        {image_url ? (
          <div className="relative w-full h-48">
            <Image
              src={image_url}
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 25vw"
              priority={false}
            />
          </div>
        ) : (
          <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
            Без зображення
          </div>
        )}
        <div className="p-4 flex flex-col flex-grow">
          <h2 className="text-lg font-semibold mb-1">{name}</h2>
          <p className="text-sm text-gray-600">{category}</p>
          <p className="text-sm text-gray-500">{cuisine}</p>
        </div>
      </div>
    </Link>
  )
}
