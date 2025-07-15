'use client';

import { useCompare } from '@/context/CompareContext';

export default function CompareButton({ dish }) {
  const { isCompared, toggleCompare } = useCompare();
  const selected = isCompared(dish.id);

  const handleClick = () => {
    toggleCompare(dish);
  };

  return (
    <button
      onClick={handleClick}
      className={`text-2xl ${selected ? 'text-blue-600' : 'text-gray-400'} hover:scale-110 transition`}
      aria-label="Додати до порівняння"
      title="Додати до порівняння"
    >
      🔍
    </button>
  );
}
