import Header from '@/components/Header'
import Navigation from '@/components/Navigation'
import SearchBlock from '@/components/SearchBlock'
import Categories from '@/components/Categories'
import InfoBlock from '@/components/InfoBlock'
import Footer from '@/components/Footer'
import categoriesData from '@/data/categories.json'

// Schema.org JSON-LD для LocalBusiness
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'AutoPartsStore',
  name: 'VAGER — Автокомплекс',
  description: 'Интернет-магазин автозапчастей VAG и автосервис в Шымкенте. Более 11 000 товаров в наличии: масла, фильтры, тормозные системы, подвеска, двигатель.',
  url: 'https://vager.kz',
  logo: 'https://vager.kz/logo.png',
  image: 'https://vager.kz/logo.png',
  telephone: ['+77089353782', '+77477371429'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'ул. Рыскулова, 503, мкр. Самал-1',
    addressLocality: 'Шымкент',
    addressRegion: 'Туркестанская область',
    postalCode: '160000',
    addressCountry: 'KZ',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 42.3520698,
    longitude: 69.5761871,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:00',
    closes: '19:00',
  },
  priceRange: '₸₸',
  sameAs: [
    'https://www.google.com/maps/place/Vager/@42.3520698,69.5736122,17z/data=!3m1!4b1!4m6!3m5!1s0x38a91db86c9a40f9:0xe4d478902f0ee2f3!8m2!3d42.3520698!4d69.5761871!16s%2Fg%2F11mxnx4jqw',
    'https://www.instagram.com/vager_autoparts_shymkent',
    'https://www.youtube.com/@YerzhanKuanyshov',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Автозапчасти VAG',
    itemListElement: categoriesData
      .filter((cat: any) => cat.product_count > 0)
      .slice(0, 10)
      .map((cat: any) => ({
        '@type': 'OfferCatalog',
        name: cat.name,
        url: `https://vager.kz/catalog/${cat.slug}`,
      })),
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '120',
  },
}

export default function Home() {
  return (
    <main>
      <div className="sticky-top-bar">
        <Header />
        <Navigation />
      </div>

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <div id="catalog" style={{ scrollMarginTop: '120px' }}>
        <SearchBlock />
        <Categories categories={categoriesData} />
      </div>
      <InfoBlock />
      <Footer />
    </main>
  )
}
