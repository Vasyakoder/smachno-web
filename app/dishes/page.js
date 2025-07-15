// app/dishes/page.js
import DishCatalogClient from '@/components/DishCatalogClient';
import Link from 'next/link';

export const metadata = {
  title: 'Каталог страв — SmachnoGo',
  description: 'Оберіть смачну страву з ресторанів Львова. Фільтри, сортування, збереження в обране та порівняння.',
  openGraph: {
    title: 'Каталог страв — SmachnoGo',
    description: 'Оберіть смачну страву з ресторанів Львова. Зручно порівнюйте та додавайте до обраного.',
    url: 'https://smachno-go.vercel.app/dishes',
    siteName: 'SmachnoGo',
    locale: 'uk_UA',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Каталог страв — SmachnoGo',
    description: 'Оберіть смачну страву з ресторанів Львова з доставкою.',
  },
};

export default function DishCatalogPage() {
  return (
    <main className="p-8 font-sans max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6 relative">
        <h1 className="text-3xl font-bold text-center w-full">Каталог страв</h1>
        <div className="absolute right-0 flex items-center gap-4">
          <Link href="/favorites" className="text-red-500 hover:underline">
            ❤️ Обране
          </Link>
          <Link href="/compare" className="text-yellow-500 hover:underline">
            🔍 Порівняння
          </Link>
          <Link href="/" className="text-blue-500 hover:underline">
            ← На головну
          </Link>
        </div>
      </div>

      <DishCatalogClient />
    </main>
  );
}
