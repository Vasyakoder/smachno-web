// app/restaurant/[id]/page.js
import { createSupabaseServerClient } from '@/lib/supabaseServerClient';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';

export async function generateMetadata({ params }) {
  const supabase = await createSupabaseServerClient();
  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('name, cuisine, category, rating, image_url')
    .eq('id', params.id)
    .single();

  if (!restaurant) {
    return {
      title: 'Ресторан не знайдено | SmachnoGo',
    };
  }

  const title = `${restaurant.name} — ресторан у Львові | SmachnoGo`;
  const description = `Деталі про ресторан "${restaurant.name}": кухня ${restaurant.cuisine}, категорія ${restaurant.category}, рейтинг ${restaurant.rating}/5.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://smachno-go.vercel.app/restaurant/${params.id}`,
      siteName: 'SmachnoGo',
      locale: 'uk_UA',
      type: 'article',
      images: restaurant.image_url ? [restaurant.image_url] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: restaurant.image_url ? [restaurant.image_url] : [],
    },
  };
}


export default async function RestaurantPage({ params }) {
  const supabase = await createSupabaseServerClient();

  const { data: restaurant, error } = await supabase
    .from('restaurants')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !restaurant) return notFound();

  const { data: dishes } = await supabase
    .from('dishes')
    .select('id, name, image_url, price')
    .eq('restaurant_id', restaurant.id)
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 font-sans">
      <Breadcrumbs
  items={[
    { label: 'Головна', href: '/' },
    { label: 'Ресторани', href: '/restaurants' },
    { label: restaurant.name }
  ]}
/>
      <div className="mb-6 flex justify-between items-center">
        <Link href="/" className="text-blue-500 hover:underline">← На головну</Link>
        <Link href="/dishes" className="text-blue-500 hover:underline">Каталог страв</Link>
      </div>

      <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-8">
        {restaurant.image_url && (
          <div className="flex justify-center bg-gray-100">
            <div className="relative w-full max-w-[800px] aspect-[4/3]">
              <Image
                src={restaurant.image_url}
                alt={restaurant.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          </div>
        )}

        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2">{restaurant.name}</h1>
          <p className="text-gray-600 mb-1">🍽 Кухня: {restaurant.cuisine}</p>
          <p className="text-gray-600 mb-1">🏷 Категорія: {restaurant.category}</p>
          <p className="text-gray-600">⭐ Рейтинг: {restaurant.rating}</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Страви ресторану</h2>

      {dishes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {dishes.map((dish) => (
            <Link key={dish.id} href={`/dishes/${dish.id}`}>
              <div className="bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden">
                {dish.image_url ? (
                  <div className="flex justify-center bg-gray-100">
                    <div className="relative w-full max-w-[400px] aspect-[4/3]">
                      <Image
                        src={dish.image_url}
                        alt={dish.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="w-full aspect-[4/3] bg-gray-100 flex items-center justify-center text-sm text-gray-400">
                    Немає фото
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-medium text-lg mb-1">{dish.name}</h3>
                  <p className="text-gray-600">{dish.price} грн</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">У цього ресторану ще немає страв.</p>
      )}
    </div>
  );
}
