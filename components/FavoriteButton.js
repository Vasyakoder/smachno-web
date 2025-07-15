'use client';

import { useEffect, useState } from 'react';
import { useFavorites } from '@/context/FavoritesContext';

export default function FavoriteButton({ dishId }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(isFavorite(dishId));
  }, [dishId, isFavorite]);

  const handleClick = (e) => {
    e.stopPropagation(); // чтобы не срабатывал переход по ссылке
    toggleFavorite(dishId);
    setLiked(!liked);
  };

  return (
    <button
      onClick={handleClick}
      className={`absolute top-2 right-2 text-2xl z-20 transition-transform hover:scale-110 ${
        liked ? 'text-red-500' : 'text-white drop-shadow-lg'
      }`}
      aria-label={liked ? 'Прибрати з обраного' : 'Додати в обране'}
      title={liked ? 'У обраному' : 'Додати в обране'}
    >
      {liked ? '❤️' : '♡'}
    </button>
  );
}
