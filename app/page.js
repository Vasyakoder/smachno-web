// app/page.js
export const metadata = {
  title: 'SmachnoGo — доставка їжі у Львові',
  description: 'Агрегатор доставки їжі у Львові: страви, ресторани, порівняння та обране. Знаходь найкраще швидко та зручно.',
  openGraph: {
    title: 'SmachnoGo — доставка їжі у Львові',
    description: 'Каталог страв, ресторанів, збереження в обране та порівняння. Знаходь найкращу їжу у Львові!',
    url: 'https://smachno-go.vercel.app',
    siteName: 'SmachnoGo',
    locale: 'uk_UA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SmachnoGo — доставка їжі у Львові',
    description: 'Каталог страв, ресторанів, збереження в обране та порівняння.',
  },
};

import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10 text-center font-sans">
      <h1 className="text-4xl font-bold mb-4">SmachnoGo</h1>
      <p className="text-lg text-gray-600 mb-10">Агрегатор доставки їжі у Львові</p>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/dishes"
          className="bg-blue-600 text-white py-4 px-6 rounded-xl hover:bg-blue-700 transition shadow-md"
        >
          🍽 Каталог страв
        </Link>
        <Link
          href="/restaurants"
          className="bg-green-600 text-white py-4 px-6 rounded-xl hover:bg-green-700 transition shadow-md"
        >
          🍴 Ресторани
        </Link>
        <Link
          href="/favorites"
          className="bg-pink-600 text-white py-4 px-6 rounded-xl hover:bg-pink-700 transition shadow-md sm:col-span-2"
        >
          ❤️ Обране
        </Link>
        <Link
          href="/compare"
          className="bg-yellow-500 text-white py-4 px-6 rounded-xl hover:bg-yellow-600 transition shadow-md sm:col-span-2"
        >
          🔍 Порівняння страв
        </Link>
      </div>
    </main>
  );
}
