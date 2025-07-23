import Image from 'next/image';
import { createSupabaseServerClient } from '@/lib/supabaseServerClient';

export default function BaseDishDetailsWrapper(props) {
  return <BaseDishDetails {...props} />;
}

async function BaseDishDetails({ params }) {
  const supabase = await createSupabaseServerClient();
  const id = params.id;

  // Получаем базовое блюдо
  const { data: baseDish, error: baseError } = await supabase
    .from('base_dishes')
    .select('*')
    .eq('id', id)
    .single();

  if (baseError || !baseDish) {
    return <div className="p-4">Об'єднану страву не знайдено.</div>;
  }

  // Получаем предложения по этой базе
  const { data: offers, error: offersError } = await supabase
    .from('dishes')
    .select('*, restaurants(name), services(name)')
    .eq('base_dish_id', id);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">{baseDish.name}</h1>
      <p className="text-gray-600 mb-4">{baseDish.category}</p>

      {baseDish.image_url && (
        <div className="relative w-full max-w-md h-64 mb-6">
          <Image
            src={baseDish.image_url}
            alt={baseDish.name}
            fill
            className="object-cover rounded-md"
            sizes="(max-width: 768px) 100vw, 600px"
          />
        </div>
      )}

      <h2 className="text-xl font-semibold mb-4">Пропозиції від ресторанів</h2>

      {offersError && <div className="text-red-600">Помилка при завантаженні пропозицій.</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {offers.map((offer) => (
          <div key={offer.id} className="border rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-semibold">{offer.restaurants?.name || 'Невідомий ресторан'}</h3>
            <p className="text-sm text-gray-500">Сервіс: {offer.services?.name}</p>
            <p className="text-green-600 font-bold text-lg">{offer.price} грн</p>
            {offer.discount > 0 && (
              <p className="text-red-500">Знижка: {offer.discount}%</p>
            )}
            {offer.delivery_time && (
              <p className="text-sm text-gray-600">Доставка: {offer.delivery_time} хв</p>
            )}
            {offer.restaurant_rating && (
              <p className="text-yellow-500">Рейтинг: {offer.restaurant_rating}⭐</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
