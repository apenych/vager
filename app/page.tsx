import Header from '@/components/Header'
import Navigation from '@/components/Navigation'
import SearchBlock from '@/components/SearchBlock'
import Categories from '@/components/Categories'
import InfoBlock from '@/components/InfoBlock'
import Footer from '@/components/Footer'
import categoriesData from '@/data/categories.json'

export default function Home() {
  return (
    <main>
      <div className="sticky-top-bar">
        <Header />
        <Navigation />
      </div>
      <div id="catalog" style={{ scrollMarginTop: '120px' }}>
        <SearchBlock />
        <Categories categories={categoriesData} />
      </div>
      <InfoBlock />
      <Footer />
    </main>
  )
}
