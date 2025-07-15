// app/compare/page.js

import CompareClient from './CompareClient';

export const metadata = {
  title: 'Порівняння страв — SmachnoGo',
  description: 'Порівняння страв з різних ресторанів Львова: ціна, рейтинг, доставка, знижки. Оберіть найкраще!',
  openGraph: {
    title: 'Порівняння страв — SmachnoGo',
    description: 'Порівняйте страви за ціною, сервісом доставки та рейтингом ресторану.',
    url: 'https://smachno-go.vercel.app/compare',
    siteName: 'SmachnoGo',
    locale: 'uk_UA',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Порівняння страв — SmachnoGo',
    description: 'Зручне порівняння страв для замовлення доставки їжі у Львові.',
  },
};

export default function ComparePage() {
  return <CompareClient />;
}
