// app/layout.js
import './globals.css';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { CompareProvider } from '@/context/CompareContext';

export const metadata = {
  title: 'SmachnoGo',
  description: 'Каталог доставки їжі у Львові',
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk">
      <body>
        <FavoritesProvider>
          <CompareProvider>
            {children}
          </CompareProvider>
        </FavoritesProvider>
      </body>
    </html>
  );
}

