'use client';
import Image from 'next/image';
import Link from 'next/link';
import FavoriteButton from '@/components/FavoriteButton';
import CompareButton from '@/components/CompareButton';

export default function DishCard({ dish }) {
  const { id, name, price, image_url, category, restaurant, service } = dish;
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
    <div className="bg-white rounded-2xl shadow hover:shadow-md transition overflow-hidden relative">
      {/* Кнопки */}
      <div className="absolute top-3 right-3 flex gap-2 z-10">
        <FavoriteButton dishId={id} />
        <CompareButton dish={dish} />
      </div>

      <Link href={`/dishes/${id}`}>
        <div className="relative flex justify-center bg-gray-100">
          <div className="relative w-full max-w-[400px] aspect-[4/3]">
            <Image
              src={isValidImage ? image_url : '/no-image.jpg'}
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
        </div>
      </Link>

      <div className="p-4 space-y-1">
        <h2 className="text-lg font-semibold">{name}</h2>

        {/* Категория с цветом */}
        {category && (
          <button
            onClick={(e) => {
              e.preventDefault(); // чтобы не переходить по ссылке
              const url = new URL(window.location.href);
              url.searchParams.set('category', category);
              window.location.href = url.toString();
            }}
            className={`inline-block text-xs font-medium px-2 py-1 rounded-md ${getCategoryStyle(category)}`}
          >
            🍽️ {category}
          </button>
        )}

        {restaurant && (
          <p className="text-sm text-gray-600">
            🍴 {restaurant.name}
            {restaurant.rating !== undefined && (
              <span className="ml-2 text-yellow-500">
                ⭐ {Number(restaurant.rating).toFixed(1)}
              </span>
            )}
          </p>
        )}

        <p className="text-base font-bold">{price} грн</p>
        {service && <p className="text-sm text-gray-500">📦 {service.name}</p>}
      </div>
    </div>
  );
}
