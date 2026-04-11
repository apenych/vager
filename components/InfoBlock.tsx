'use client'

import Image from 'next/image'
import { useState } from 'react'

const photos = [
  'IMG_1059.jpg', 'IMG_1060.jpg', 'IMG_1070.jpg', 'IMG_1073.jpg',
  'IMG_1077.jpg', 'IMG_1116.jpg', 'IMG_1120.jpg', 'IMG_1126.jpg',
  'IMG_1133.jpg', 'IMG_1142.jpg', 'IMG_1152.jpg', 'IMG_1166.jpg',
  'IMG_1176.jpg', 'IMG_1190.jpg', 'IMG_1198.jpg', 'IMG_1202.jpg',
  'IMG_1222.jpg', 'IMG_1231.jpg', 'IMG_1233.jpg', 'IMG_1249.jpg',
  'IMG_1253.jpg', 'IMG_1262.jpg', 'IMG_1280.jpg', 'IMG_1281.jpg',
]

export default function InfoBlock() {
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null)

  return (
    <section className="info-section">
      <div className="info-container">
        <div className="info-grid">
          <div className="info-card">
            <span className="info-icon">💳</span>
            <h3 className="info-title">Оплата заказа</h3>
            <p className="info-text">Наличные, банковские карты, онлайн-перевод</p>
          </div>

          <div className="info-card">
            <span className="info-icon">🚚</span>
            <h3 className="info-title">Доставка</h3>
            <p className="info-text">Доставка по Шымкенту и всему Казахстану</p>
          </div>

          <div className="info-card">
            <span className="info-icon">↩️</span>
            <h3 className="info-title">Возврат товара</h3>
            <p className="info-text">Возврат в течение 14 дней с момента покупки</p>
          </div>
        </div>

        {/* Услуги */}
        <div id="services" className="services-section">
          <h2 className="section-title">Наши услуги</h2>
          <p className="services-subtitle">Наш автокомплекс оказывает полный спектр услуг по обслуживанию и ремонту автомобилей</p>

          <div className="services-grid">
            <div className="service-card">
              <span className="service-icon">🔧</span>
              <h3 className="service-title">Шиномонтаж</h3>
              <p className="service-desc">Сезонная замена шин, балансировка колёс</p>
            </div>

            <div className="service-card">
              <span className="service-icon">🔩</span>
              <h3 className="service-title">Мелкосрочный ремонт</h3>
              <p className="service-desc">Оперативное устранение мелких неисправностей</p>
            </div>

            <div className="service-card">
              <span className="service-icon">⚙️</span>
              <h3 className="service-title">Ремонт ходовой части</h3>
              <p className="service-desc">Диагностика и ремонт подвески, рулевого управления</p>
            </div>

            <div className="service-card">
              <span className="service-icon">🛠️</span>
              <h3 className="service-title">Ремонт двигателя</h3>
              <p className="service-desc">Услуги высококвалифицированных мотористов</p>
            </div>

            <div className="service-card">
              <span className="service-icon">⛽</span>
              <h3 className="service-title">Топливные системы</h3>
              <p className="service-desc">Ремонт дозаторов и топливной системы KE Jettronic, моно-впрыск. Проверка форсунок высокого давления. Ремонт топливных систем FSI, GDI, MPi</p>
            </div>

            <div className="service-card">
              <span className="service-icon">❄️</span>
              <h3 className="service-title">Система охлаждения</h3>
              <p className="service-desc">Ремонт системы охлаждения на спец. оборудовании</p>
            </div>

            <div className="service-card">
              <span className="service-icon">🌬️</span>
              <h3 className="service-title">Автокондиционеры</h3>
              <p className="service-desc">Диагностика и заправка автокондиционеров</p>
            </div>
          </div>

          <div className="service-contact">
            <a
              href="https://wa.me/77781011227?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%9F%D0%B8%D1%88%D1%83%20%D1%81%20%D1%81%D0%B0%D0%B9%D1%82%D0%B0%20Vager.kz.%20%D0%A5%D0%BE%D1%82%D0%B5%D0%BB%20%D0%B1%D1%8B%20%D0%B7%D0%B0%D0%BF%D0%B8%D1%81%D0%B0%D1%82%D1%8C%D1%81%D1%8F%20%D0%BD%D0%B0%20%D0%BE%D0%B1%D1%81%D0%BB%D1%83%D0%B6%D0%B8%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5%20%D0%B0%D0%B2%D1%82%D0%BE%D0%BC%D0%BE%D0%B1%D0%B8%D0%BB%D1%8F."
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-service-btn"
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#e0e0e0'; e.currentTarget.style.transform = 'scale(1.03)' }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#25D366'; e.currentTarget.style.transform = 'scale(1)' }}
            >
              💬 Записаться на услугу
            </a>
            <p className="service-contact-text">Михаил, управляющий</p>
          </div>
        </div>

        <div className="divider"></div>

        {/* О компании */}
        <div id="about" className="about-section">
          <h2 className="section-title">О компании VAGER</h2>
          <p className="about-text">
            Автокомплекс <strong>VAGER</strong> — ваш надёжный партнёр в мире автомобилей с 2006 года.
            Компания была основана <strong>Куанышовым Ержаном Сапарбаевичем</strong> в Шымкенте
            и за годы работы заслужила доверие тысяч клиентов по всему Казахстану.
          </p>
          <p className="about-text">
            Мы специализируемся на <strong>продаже автозапчастей</strong> для всех марок автомобилей —
            от оригинальных деталей до качественных аналогов. В нашем каталоге более <strong>11 000 товаров</strong>:
            масла и техническиекие жидкости, детали двигателя, ходовой части, тормозной системы,
            электрики, оптики, фильтров и многое другое.
          </p>
          <p className="about-text">
            Помимо продажи запчастей, наш автокомплекс оказывает <strong>полный спектр услуг
            по обслуживанию и ремонту автомобилей</strong>: шиномонтаж, ремонт ходовой части,
            обслуживание топливных систем, диагностика и заправка автокондиционеров,
            ремонт системы охлаждения на специализированном оборудовании и многое другое.
          </p>
          <div className="about-features">
            <div className="feature"><span className="feature-icon">✓</span><span>Работаем с 2006 года</span></div>
            <div className="feature"><span className="feature-icon">✓</span><span>Более 11 000 товаров</span></div>
            <div className="feature"><span className="feature-icon">✓</span><span>Гарантия качества</span></div>
            <div className="feature"><span className="feature-icon">✓</span><span>Профессиональный сервис</span></div>
          </div>

          <div className="about-gallery">
            <h3 className="gallery-title">Наш автосервис</h3>
            <p className="gallery-subtitle">Загляните к нам — посмотрите на наше оборудование и рабочие процессы</p>
            <div className="gallery-grid">
              {photos.map((photo, i) => (
                <div key={i} className="gallery-item" onClick={() => setPreviewPhoto(photo)}>
                  <Image
                    src={`/photos/${photo}`}
                    alt={`Фото автосервиса VAGER ${i + 1}`}
                    width={300}
                    height={200}
                    style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', cursor: 'pointer' }}
                  />
                </div>
              ))}
            </div>
          </div>

          {previewPhoto && (
            <div className="preview-overlay" onClick={() => setPreviewPhoto(null)}>
              <div className="preview-container" onClick={(e) => e.stopPropagation()}>
                <button className="preview-close" onClick={() => setPreviewPhoto(null)} type="button">✕</button>
                <Image
                  src={`/photos/${previewPhoto}`}
                  alt="Просмотр фото"
                  width={800}
                  height={600}
                  style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: '8px' }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
