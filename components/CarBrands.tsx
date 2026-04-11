'use client'

export default function CarBrands() {
  const brands = [
    { name: 'ВАЗ', icon: '🚗' },
    { name: 'ГАЗ', icon: '🚐' },
    { name: 'УАЗ', icon: '🚙' },
    { name: 'Toyota', icon: '🚗' },
    { name: 'Honda', icon: '🚗' },
    { name: 'Nissan', icon: '🚗' },
    { name: 'Hyundai', icon: '🚗' },
    { name: 'Kia', icon: '🚗' },
    { name: 'Volkswagen', icon: '🚗' },
    { name: 'BMW', icon: '🚗' },
    { name: 'Mercedes', icon: '🚗' },
    { name: 'Audi', icon: '🚗' },
    { name: 'Chevrolet', icon: '🚗' },
    { name: 'Ford', icon: '🚗' },
    { name: 'Mazda', icon: '🚗' },
    { name: 'Mitsubishi', icon: '🚗' },
  ]

  return (
    <section style={styles.brandsSection}>
      <div style={styles.container}>
        <h2 style={styles.title}>Выберите марку автомобиля</h2>
        
        <div style={styles.brandsGrid}>
          {brands.map((brand, index) => (
            <div key={index} style={styles.brandCard}>
              <span style={styles.brandIcon}>{brand.icon}</span>
              <span style={styles.brandName}>{brand.name}</span>
            </div>
          ))}
        </div>

        <div style={styles.showAll}>
          <button style={styles.showAllButton}>Показать все марки →</button>
        </div>
      </div>
    </section>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  brandsSection: {
    padding: '50px 0',
    backgroundColor: '#fff',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '40px',
    fontSize: '28px',
    color: '#1a1a1a',
  },
  brandsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '20px',
    marginBottom: '30px',
  },
  brandCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    border: '2px solid #eee',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  brandIcon: {
    fontSize: '40px',
    marginBottom: '10px',
  },
  brandName: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  showAll: {
    textAlign: 'center',
  },
  showAllButton: {
    padding: '12px 30px',
    backgroundColor: 'transparent',
    border: '2px solid #ff6600',
    color: '#ff6600',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
}
