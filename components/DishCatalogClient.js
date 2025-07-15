'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import DishCard from './DishCard';
import Link from 'next/link';
import categoryColors from './categoryColors';

export default function DishCatalogClient() {
  const [dishes, setDishes] = useState([]);
  const [error, setError] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [services, setServices] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedRestaurants, setSelectedRestaurants] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [onlyDiscounted, setOnlyDiscounted] = useState(false); // 🟡 Новое состояние

  const [sortOrder, setSortOrder] = useState('created_at_desc');
  const [page, setPage] = useState(1);
  const pageSize = 12;

  useEffect(() => {
    const fetchMeta = async () => {
      const [{ data: restaurantList }, { data: serviceList }, { data: dishesList }] = await Promise.all([
        supabase.from('restaurants').select('id, name, cuisine'),
        supabase.from('services').select('id, name'),
        supabase.from('dishes').select('category').neq('category', null),
      ]);

      setRestaurants(restaurantList || []);
      setServices(serviceList || []);

      const cuisineSet = new Set(restaurantList?.map(r => r.cuisine).filter(Boolean));
      setCuisines([...cuisineSet]);

      const categorySet = new Set((dishesList || []).map(d => d.category).filter(Boolean));
      setCategories([...categorySet]);
    };

    fetchMeta();
  }, []);

  useEffect(() => {
    const fetchDishes = async () => {
      let query = supabase
        .from('dishes')
        .select(`*, restaurant:restaurants(id, name, rating, cuisine), service:services(id, name)`, { count: 'exact' });

      if (selectedRestaurants.length > 0) query = query.in('restaurant_id', selectedRestaurants);
      if (selectedServices.length > 0) query = query.in('service_id', selectedServices);
      if (selectedCuisines.length > 0) query = query.in('cuisine', selectedCuisines);
      if (selectedCategories.length > 0) query = query.in('category', selectedCategories);
      if (onlyDiscounted) query = query.gt('discount', 0); // 🟡 Фильтр по скидке

      switch (sortOrder) {
        case 'price_asc':
          query = query.order('price', { ascending: true });
          break;
        case 'price_desc':
          query = query.order('price', { ascending: false });
          break;
        case 'name_asc':
          query = query.order('name', { ascending: true });
          break;
        case 'name_desc':
          query = query.order('name', { ascending: false });
          break;
        case 'created_at_asc':
          query = query.order('created_at', { ascending: true });
          break;
        default:
          query = query.order('created_at', { ascending: false });
          break;
      }

      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;
      query = query.range(from, to);

      const { data, error } = await query;

      if (error) {
        setError(error.message);
      } else {
        setDishes(data || []);
      }
    };

    fetchDishes();
  }, [
    selectedRestaurants,
    selectedServices,
    selectedCuisines,
    selectedCategories,
    onlyDiscounted,
    sortOrder,
    page
  ]);

  const toggleItem = (list, setList, value) => {
    setPage(1);
    setList(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
  };

  const resetFilters = () => {
    setSelectedRestaurants([]);
    setSelectedServices([]);
    setSelectedCuisines([]);
    setSelectedCategories([]);
    setOnlyDiscounted(false);
    setPage(1);
  };

  return (
    <div className="flex gap-8 max-w-7xl mx-auto px-4">
      {/* Фильтры слева */}
      <aside className="w-64 space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Категорії</h3>
          {categories.map((cat) => (
            <label
              key={cat}
              className={`flex items-center gap-2 mb-2 p-1 rounded cursor-pointer ${categoryColors[cat] || 'bg-gray-100 text-gray-800'}`}
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleItem(selectedCategories, setSelectedCategories, cat)}
              />
              {cat}
            </label>
          ))}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Кухня</h3>
          {cuisines.map((cuisine) => (
            <label key={cuisine} className="flex items-center gap-2 mb-1">
              <input
                type="checkbox"
                checked={selectedCuisines.includes(cuisine)}
                onChange={() => toggleItem(selectedCuisines, setSelectedCuisines, cuisine)}
              />
              {cuisine}
            </label>
          ))}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Ресторани</h3>
          {restaurants.map((r) => (
            <label key={r.id} className="flex items-center gap-2 mb-1">
              <input
                type="checkbox"
                checked={selectedRestaurants.includes(r.id)}
                onChange={() => toggleItem(selectedRestaurants, setSelectedRestaurants, r.id)}
              />
              {r.name}
            </label>
          ))}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Сервіси</h3>
          {services.map((s) => (
            <label key={s.id} className="flex items-center gap-2 mb-1">
              <input
                type="checkbox"
                checked={selectedServices.includes(s.id)}
                onChange={() => toggleItem(selectedServices, setSelectedServices, s.id)}
              />
              {s.name}
            </label>
          ))}
        </div>

        {/* 🟡 Новый фильтр — только со скидками */}
        <div>
          <label className="flex items-center gap-2 mt-4">
            <input
              type="checkbox"
              checked={onlyDiscounted}
              onChange={() => {
                setOnlyDiscounted((prev) => !prev);
                setPage(1);
              }}
            />
            Лише зі знижками
          </label>
        </div>

        <button onClick={resetFilters} className="mt-4 text-sm text-blue-600 hover:underline">
          🔄 Скинути фільтри
        </button>
      </aside>

      {/* Каталог справа */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Каталог страв</h1>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border p-2 rounded-md"
          >
            <option value="created_at_desc">Нові спочатку</option>
            <option value="created_at_asc">Старі спочатку</option>
            <option value="price_asc">Ціна: від дешевих</option>
            <option value="price_desc">Ціна: від дорогих</option>
            <option value="name_asc">Назва: A → Я</option>
            <option value="name_desc">Назва: Я → A</option>
          </select>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        {dishes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {dishes.map((dish) => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Страви не знайдено</p>
        )}

        {/* Пагинация */}
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Попередня
          </button>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Наступна
          </button>
        </div>
      </div>
    </div>
  );
}
