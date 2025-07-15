// app/favorites/FavoritesClient.js
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useFavorites } from '@/context/FavoritesContext';
import DishCard from '@/components/DishCard';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'Обрані страви — SmachnoGo',
  description: 'Збережені вами страви з ресторанiв Львова. Швидкий доступ до улюблених варіантів доставки.',
  openGraph: {
    title: 'Обрані страви — SmachnoGo',
    description: 'Ваш список улюблених страв для замовлення їжі у Львові.',
    url: 'https://smachno-go.vercel.app/favorites',
    siteName: 'SmachnoGo',
    locale: 'uk_UA',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Обрані страви — SmachnoGo',
    description: 'Швидкий доступ до ваших улюблених страв.',
  },
};

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (favorites.length === 0) {
      setDishes([]);
      setLoading(false);
      return;
    }

    const fetchFavorites = async () => {
      const { data, error } = await supabase
        .from('dishes')
        .select(`*, restaurant:restaurants(id, name, rating, cuisine), service:services(id, name)`)
        .in('id', favorites);

      if (error) {
        console.error('Помилка завантаження обраного:', error);
        setDishes([]);
      } else {
        setDishes(data);
      }

      setLoading(false);
    };

    fetchFavorites();
  }, [favorites]);

  return (
    <div className="max-w-7xl mx-auto p-6">
         <Breadcrumbs
        items={[
          { label: 'Головна', href: '/' },
          { label: 'Обране' }
        ]}
      />
      <h1 className="text-3xl font-bold mb-4">Обрані страви</h1>

      {loading ? (
        <p>Завантаження...</p>
      ) : dishes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {dishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Ви ще не додали жодної страви до обраного.</p>
      )}
    </div>
  );
}
