import { Suspense } from 'react'
import CatalogPageClient from './CatalogPageClient'

export default function CatalogPage() {
  return (
    <Suspense fallback={<p className="p-6">Завантаження страв...</p>}>
      <CatalogPageClient />
    </Suspense>
  )
}
