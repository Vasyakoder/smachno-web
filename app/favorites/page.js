import FavoritesClient from './FavoritesClient';

export const metadata = {
  title: 'Обрані страви — SmachnoGo',
  description: 'Збережені вами страви з ресторанiв Львова. Швидкий доступ до улюблених варіантів доставки.',
  openGraph: {
    title: 'Обрані страви — SmachnoGo',
    description: 'Швидкий доступ до збережених страв. Дивіться свої улюблені варіанти для доставки їжі.',
    url: 'https://smachno-go.vercel.app/favorites',
    siteName: 'SmachnoGo',
    locale: 'uk_UA',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Обрані страви — SmachnoGo',
    description: 'Ваш список улюблених страв з різних ресторанів Львова.',
  },
};

export default function FavoritesPage() {
  return <FavoritesClient />;
}
