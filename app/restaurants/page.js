// app/restaurants/page.js
import { createSupabaseServerClient } from '@/lib/supabaseServerClient';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'Ресторани — SmachnoGo',
  description: 'Каталог ресторанів у Львові з рейтингами, кухнею та категоріями. Обирай найкращі заклади для доставки їжі.',
  openGraph: {
    title: 'Ресторани — SmachnoGo',
    description: 'Обирай найкращі ресторани Львова з доставкою страв додому.',
    url: 'https://smachno-go.vercel.app/restaurants',
    siteName: 'SmachnoGo',
    locale: 'uk_UA',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Ресторани — SmachnoGo',
    description: 'Обирай найкращі ресторани Львова з доставкою.',
  },
};

export default async function RestaurantsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: restaurants, error } = await supabase
    .from('restaurants')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return <p className="p-4">Помилка: {error.message}</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: 'Головна', href: '/' },
          { label: 'Ресторани' }
        ]}
      />
      <h1 className="text-3xl font-bold mb-8 text-center">Ресторани</h1>

      {restaurants.length > 0 ? (
<div className="grid grid-cols-3 gap-6 justify-items-center">
  {restaurants.map((restaurant) => (
    <Link
      key={restaurant.id}
      href={`/restaurants/${restaurant.id}`}
      className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden w-[320px]"
    >
      <div className="flex justify-center bg-gray-100">
        <div className="relative w-full aspect-[4/3]">
          {restaurant.image_url ? (
            <Image
              src={restaurant.image_url}
              alt={restaurant.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 320px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm bg-gray-100 rounded-t-2xl">
              Немає зображення
            </div>
          )}
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-1">{restaurant.name}</h2>
        <p className="text-sm text-gray-600">🍽️ Кухня: {restaurant.cuisine}</p>
        <p className="text-sm text-gray-600">🏷️ Категорія: {restaurant.category}</p>
        <p className="text-sm text-gray-600">⭐ Рейтинг: {restaurant.rating}</p>
      </div>
    </Link>
  ))}
</div>
      ) : (
        <p className="text-gray-500 text-center">Ресторанів ще не додано</p>
      )}
    </div>
  );
}
