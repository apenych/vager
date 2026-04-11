'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { VAGBrands } from '@/data/vagCars'
import Link from 'next/link'

function SearchBlockContent() {
  const [query, setQuery] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [selectedModel, setSelectedModel] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  const activeTab = searchParams.get('tab') || 'article'
  const currentBrand = VAGBrands.find(b => b.id === selectedBrand)
  const models = currentBrand ? currentBrand.models : []

  const handleSearch = () => {
    if (query.trim() || selectedBrand) {
      const params = new URLSearchParams()
      if (query.trim()) params.set('q', query.trim())
      if (selectedBrand) params.set('brand', selectedBrand)
      if (selectedModel) params.set('model', selectedModel)
      params.set('tab', activeTab)
      router.push(`/search?${params.toString()}`)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <section className="search-section">
        <form action="/search" method="GET" className="search-tabs-form">
          <input type="hidden" name="tab" value={activeTab} />
          
          <div className="search-tabs">
            <Link
              href={`?tab=article`}
              className={`search-tab ${activeTab === 'article' ? 'search-tab-active' : ''}`}
              scroll={false}
              style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              По артикулу
            </Link>
            <Link
              href={`?tab=name`}
              className={`search-tab ${activeTab === 'name' ? 'search-tab-active' : ''}`}
              scroll={false}
              style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              По названию
            </Link>
          </div>

          <div className="search-filters">
            <div className="search-filter-row">
              <label className="search-filter-label">Марка:</label>
              <select
                className="search-filter-select"
                name="brand"
                value={selectedBrand}
                onChange={(e) => { setSelectedBrand(e.target.value); setSelectedModel('') }}
              >
                <option value="">Все марки</option>
                {VAGBrands.map(brand => (
                  <option key={brand.id} value={brand.id}>{brand.name}</option>
                ))}
              </select>
            </div>

            {selectedBrand && (
              <div className="search-filter-row">
                <label className="search-filter-label">Модель:</label>
                <select
                  className="search-filter-select"
                  name="model"
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                >
                  <option value="">Все модели</option>
                  {models.map(model => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="search-box">
            <input
              className="search-input"
              type="text"
              name="q"
              placeholder={
                activeTab === 'article' ? 'Введите артикул (например: 4A7D2, 8D0422371K)' :
                'Введите название запчасти (например: глушитель, фильтр, ремень)'
              }
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              type="submit"
              className="search-button"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              Найти
            </button>
          </div>
        </form>

        <div className="search-hints">
          {activeTab === 'article' && (
            <span className="search-hint">💡 Введите артикул запчасти или OEM-номер производителя</span>
          )}
          {activeTab === 'name' && (
            <span className="search-hint">💡 Введите название запчасти: глушитель, фильтр, ремень, подшипник</span>
          )}
        </div>
      </section>
  )
}

export default function SearchBlock() {
  return (
    <Suspense fallback={
      <section className="search-section" style={{ minHeight: '300px', backgroundColor: '#f5f5f5' }}></section>
    }>
      <SearchBlockContent />
    </Suspense>
  )
}
