import { createSupabaseServerClient } from '@/lib/supabaseServerClient';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import FavoriteButton from '@/components/FavoriteButton';
import CompareButton from '@/components/CompareButton';
import Breadcrumbs from '@/components/Breadcrumbs';

// SEO + OpenGraph
export async function generateMetadata({ params }) {
  const supabase = await createSupabaseServerClient();
  const { data: dish } = await supabase
    .from('dishes')
    .select('name, price, image_url, restaurant:restaurants(name)')
    .eq('id', params.id)
    .single();

  if (!dish) {
    return { title: 'Страва не знайдена | SmachnoGo' };
  }

  const title = `${dish.name} – ${dish.restaurant?.name ?? 'Ресторан'} | SmachnoGo`;
  const description = `Замовляйте "${dish.name}" за ${dish.price} грн з доставкою від SmachnoGo. Смачно та швидко!`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://smachno-go.vercel.app/dishes/${params.id}`,
      siteName: 'SmachnoGo',
      locale: 'uk_UA',
      type: 'article',
      images: dish.image_url ? [dish.image_url] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: dish.image_url ? [dish.image_url] : [],
    },
  };
}


// Компонент страницы
export default async function DishDetailsPage({ params }) {
  const id = params.id;
  const supabase = await createSupabaseServerClient();

  const { data: dish, error } = await supabase
    .from('dishes')
    .select(`
      *,
      restaurant:restaurants (id, name),
      service:services (name)
    `)
    .eq('id', id)
    .single();

  if (error || !dish) return notFound();

  const { data: similarDishes } = await supabase
    .from('dishes')
    .select('id, name, image_url')
    .neq('id', id)
    .eq('restaurant_id', dish.restaurant_id)
    .limit(3);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
            <Breadcrumbs
  items={[
    { label: 'Головна', href: '/' },
    { label: 'Каталог страв', href: '/dishes' },
    { label: dish.name }
  ]}
/>
      <div className="flex justify-between items-center mb-4">
        <Link href="/" className="text-blue-500 hover:underline">
          ← Назад на головну
        </Link>
        <Link href="/compare" className="text-yellow-500 hover:underline">
          🔍 Порівняння
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        {dish.image_url && (
          <div className="flex justify-center bg-gray-100">
            <div className="relative w-full max-w-[700px] aspect-[4/3]">
              <Image
                src={dish.image_url}
                alt={dish.name}
                fill
                className="object-cover rounded-t-2xl"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>
          </div>
        )}

        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2">{dish.name}</h1>
          <p className="text-lg font-semibold text-gray-700 mb-4">{dish.price} грн</p>

      {dish.restaurant && (
  <p className="text-gray-600 mb-2">
    🍴 Ресторан:{' '}
    <Link
      href={`/restaurants/${dish.restaurant.id}`}
      className="text-blue-600 font-medium hover:underline"
    >
      {dish.restaurant.name}
    </Link>
  </p>
)}

          {dish.service && (
            <p className="text-gray-600 mb-4">
              📦 Сервіс доставки: {dish.service.name}
            </p>
          )}

          <div className="flex gap-4 mt-4">
            <FavoriteButton
              dishId={dish.id}
              className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition text-sm sm:text-base"
            />
            <CompareButton
              dish={dish}
              className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition text-sm sm:text-base"
            />
          </div>
        </div>
      </div>

      {similarDishes?.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Схожі страви</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {similarDishes.map((similar) => (
              <Link key={similar.id} href={`/dishes/${similar.id}`}>
                <div className="bg-white rounded-xl shadow p-4 hover:shadow-md transition">
                  {similar.image_url ? (
                    <div className="flex justify-center">
                      <div className="relative w-full max-w-[300px] aspect-[4/3]">
                        <Image
                          src={similar.image_url}
                          alt={similar.name}
                          fill
                          className="object-cover rounded-lg"
                          sizes="(max-width: 768px) 100vw, 300px"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <div className="w-full max-w-[300px] aspect-[4/3] bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                        Немає фото
                      </div>
                    </div>
                  )}
                  <h3 className="mt-2 text-base font-medium text-center">{similar.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
