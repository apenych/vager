'use client'

import Link from 'next/link'

interface Category {
  id: string
  name: string
  slug: string
  product_count: number
  quantity: number
}

interface CategoriesProps {
  categories: Category[]
}

const categoryIcons: { [key: string]: string } = {
  '1.2.': '🔧', '1.3.': '🛢️', '1.4.': '⚙️', '1.5.': '🔐',
  '1.6.': '🔨', '1.7.': '❄️', '1.8.': '🚗', '1.9.': '⛽',
  '1.10.': '💡', '1.11.': '⚡', '1.12.': '🔄', '1.13.': '🌡️',
  '1.14.': '🛑', '1.15.': '🔩', '1.16.': '🔗', '1.17.': '🌬️',
  '1.18.': '🚙', '1.19.': '🔌',
}

export default function Categories({ categories }: CategoriesProps) {
  const regularCategories = categories.filter(c => c.product_count > 0 && !c.id.startsWith('2.'))
  const usedCategories = categories.filter(c => c.product_count > 0 && c.id.startsWith('2.'))

  return (
    <section className="categories-section">
      <div className="categories-container">
        <h2 className="categories-title">Категории товаров</h2>

        <div className="categories-grid">
          {regularCategories.map((category) => (
            <Link href={`/catalog/${category.slug}`} key={category.id} className="category-link">
              <div className="category-card">
                <span className="category-icon">{categoryIcons[category.id] || '📦'}</span>
                <h3 className="category-name">{category.name}</h3>
                <p className="category-count">{category.product_count} товаров</p>
              </div>
            </Link>
          ))}
        </div>

        {usedCategories.length > 0 && (
          <>
            <h2 className="categories-title" style={{ marginTop: '50px' }}>Б/У запчасти</h2>
            <div className="categories-grid">
              {usedCategories.map((category) => (
                <Link href={`/catalog/${category.slug}`} key={category.id} className="category-link">
                  <div className="category-card">
                    <span className="category-icon">♻️</span>
                    <h3 className="category-name">{category.name}</h3>
                    <p className="category-count">{category.product_count} товаров</p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
