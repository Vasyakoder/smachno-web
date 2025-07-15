// app/compare/CompareClient.js
'use client';

import { useEffect, useState } from 'react';
import { useCompare } from '@/context/CompareContext';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function ComparePage() {
  const { compareList, clearCompare } = useCompare();
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const fetchDishes = async () => {
      if (compareList.length === 0) return;

      const { data, error } = await supabase
        .from('dishes')
        .select('*, restaurant:restaurants(name, rating), service:services(name)')
        .in('id', compareList.map((d) => d.id));

      if (!error) setDishes(data);
    };

    fetchDishes();
  }, [compareList]);

  if (compareList.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Порівняння страв</h1>
        <p className="text-gray-500">Ви ще не обрали страви для порівняння.</p>
        <Link href="/" className="text-blue-500 hover:underline mt-4 block">← Назад на головну</Link>
      </div>
    );
  }

return (
  <div className="max-w-6xl mx-auto p-8">
  <Breadcrumbs
  items={[
    { label: 'Головна', href: '/' },
    { label: 'Порівняння' }
  ]}
/>
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Порівняння страв</h1>
      <button onClick={clearCompare} className="text-red-500 hover:underline">Очистити</button>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className="text-left p-2 border-b"> </th>
            {dishes.map((dish) => (
              <th key={dish.id} className="text-center p-2 border-b font-medium">{dish.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 font-medium">Зображення</td>
            {dishes.map((dish) => (
              <td key={dish.id} className="text-center p-2">
                {dish.image_url ? (
                  <Image
                    src={dish.image_url}
                    alt={dish.name}
                    width={80}
                    height={80}
                    className="object-cover rounded"
                  />
                ) : (
                  '—'
                )}
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-2 font-medium">Ціна</td>
            {dishes.map((dish) => (
              <td key={dish.id} className="text-center p-2">{dish.price} грн</td>
            ))}
          </tr>
          <tr>
            <td className="p-2 font-medium">Ресторан</td>
            {dishes.map((dish) => (
              <td key={dish.id} className="text-center p-2">{dish.restaurant?.name}</td>
            ))}
          </tr>
          <tr>
            <td className="p-2 font-medium">Рейтинг</td>
            {dishes.map((dish) => (
              <td key={dish.id} className="text-center p-2">⭐ {dish.restaurant?.rating ?? '—'}</td>
            ))}
          </tr>
          <tr>
            <td className="p-2 font-medium">Сервіс доставки</td>
            {dishes.map((dish) => (
              <td key={dish.id} className="text-center p-2">{dish.service?.name}</td>
            ))}
          </tr>
          <tr>
            <td className="p-2 font-medium">Час доставки</td>
            {dishes.map((dish) => (
              <td key={dish.id} className="text-center p-2">
                {dish.delivery_time ? `${dish.delivery_time} хв` : '—'}
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-2 font-medium">Знижка</td>
            {dishes.map((dish) => (
              <td key={dish.id} className="text-center p-2">
                {dish.discount ? '✅ Так' : '—'}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>

    <div className="text-center mt-8">
      <Link
        href="/"
        className="inline-block text-blue-600 hover:underline text-sm"
      >
        ← Назад на головну
      </Link>
    </div>
  </div>
);
}
