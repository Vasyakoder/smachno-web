'use client';
import Image from 'next/image';
import Link from 'next/link';
import FavoriteButton from '@/components/FavoriteButton';
import CompareButton from '@/components/CompareButton';

export default function DishCard({ dish }) {
  const {
    id,
    name,
    price,
    image_url,
    category,
    restaurant,
    service,
    discount,
  } = dish;

  const isValidImage = image_url && image_url.includes('supabase.co');

  const getCategoryStyle = (category) => {
    switch (category?.toLowerCase()) {
      case 'піца':
        return 'bg-yellow-100 text-yellow-800';
      case 'суші':
        return 'bg-pink-100 text-pink-800';
      case 'бургери':
        return 'bg-red-100 text-red-800';
      case 'кебаб':
        return 'bg-orange-100 text-orange-800';
      case 'десерти':
        return 'bg-purple-100 text-purple-800';
      case 'напої':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow hover:shadow-md transition overflow-hidden relative flex flex-col">
      {/* Кнопки */}
      <div className="absolute top-3 right-3 flex gap-2 z-10">
        <FavoriteButton dishId={id} />
        <CompareButton dish={dish} />
      </div>

      <Link href={`/dishes/${id}`} className="block">
<div className="relative w-full aspect-[4/3] bg-gray-100 dark:bg-neutral-800 overflow-hidden rounded-t-2xl">
  <Image
    src={isValidImage ? image_url : '/no-image.jpg'}
    alt={name}
    fill
    priority
    className="object-cover"
    sizes="(max-width: 768px) 100vw, 400px"
  />
  {discount > 0 && (
    <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md z-30">
      🔥 Знижка
    </div>
  )}
</div>

      </Link>

      <div className="p-4 flex flex-col gap-1 grow">
        <h2 className="text-lg font-semibold">{name}</h2>

        {category && (
          <button
            onClick={(e) => {
              e.preventDefault();
              const url = new URL(window.location.href);
              url.searchParams.set('category', category);
              window.location.href = url.toString();
            }}
            className={`inline-block text-xs font-medium px-2 py-1 rounded-md ${getCategoryStyle(
              category
            )}`}
          >
            🍽️ {category}
          </button>
        )}

        {restaurant && (
          <p className="text-sm text-gray-600 dark:text-gray-300">
            🍴 {restaurant.name}
            {restaurant.rating !== undefined && (
              <span className="ml-2 text-yellow-500">
                ⭐ {Number(restaurant.rating).toFixed(1)}
              </span>
            )}
          </p>
        )}

        <p className="text-base font-bold">{price} грн</p>

        {service && (
          <p className="text-sm text-gray-500 dark:text-gray-400">📦 {service.name}</p>
        )}
      </div>
    </div>
  );
}
