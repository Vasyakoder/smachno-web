'use client';

import Link from 'next/link';

export default function Breadcrumbs({ items = [] }) {
  return (
    <nav className="text-sm text-gray-600 mb-4" aria-label="Хлібні крихти">
      <ol className="list-reset flex flex-wrap items-center space-x-1 sm:space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.href ? (
              <Link
                href={item.href}
                className="text-blue-600 hover:underline whitespace-nowrap"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-gray-800 whitespace-nowrap">
                {item.label}
              </span>
            )}
            {index < items.length - 1 && (
              <span className="mx-1 text-gray-400">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
