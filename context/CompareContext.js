'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const CompareContext = createContext();
const COMPARE_KEY = 'compare_dishes';

export function CompareProvider({ children }) {
  const [compareList, setCompareList] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(COMPARE_KEY);
    if (stored) {
      try {
        setCompareList(JSON.parse(stored));
      } catch {
        setCompareList([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(COMPARE_KEY, JSON.stringify(compareList));
  }, [compareList]);

  const toggleCompare = (dish) => {
    setCompareList((prev) => {
      const exists = prev.some((d) => d.id === dish.id);
      if (exists) return prev.filter((d) => d.id !== dish.id);
      if (prev.length >= 3) return prev;
      return [...prev, dish];
    });
  };

  const isCompared = (id) => compareList.some((d) => d.id === id);
  const clearCompare = () => setCompareList([]);

  return (
    <CompareContext.Provider value={{ compareList, toggleCompare, isCompared, clearCompare }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  return useContext(CompareContext);
}
