'use client'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-col">
            <h3 className="footer-title">О КОМПАНИИ</h3>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">О нас</a></li>
              <li><a href="#" className="footer-link">Контакты</a></li>
              <li><a href="#" className="footer-link">Вакансии</a></li>
              <li><a href="#" className="footer-link">Новости</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3 className="footer-title">ИНТЕРНЕТ-МАГАЗИН</h3>
            <ul className="footer-links">
              <li><a href="/catalog" className="footer-link">Поиск запчастей</a></li>
              <li><a href="#" className="footer-link">Доставка</a></li>
              <li><a href="#" className="footer-link">Оплата</a></li>
              <li><a href="#" className="footer-link">Возврат и гарантия</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3 className="footer-title">КАТАЛОГ</h3>
            <ul className="footer-links">
              <li><a href="/catalog/1-4" className="footer-link">Двигатель</a></li>
              <li><a href="/catalog/1-18" className="footer-link">Ходовая часть</a></li>
              <li><a href="/catalog/1-14" className="footer-link">Тормозная система</a></li>
              <li><a href="/catalog/1-19" className="footer-link">Электрика</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3 className="footer-title">КОНТАКТЫ</h3>
            <div className="footer-contact-info">
              <p className="footer-contact-text">
                <span className="footer-icon">📍</span>
                ул. Рыскулова, 503<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;мкр. Самал-1, Шымкент
              </p>
              <p className="footer-contact-text">
                <span className="footer-icon">📞</span>
                <a href="tel:+77089353782" className="footer-phone-link">+7 708 935 37 82</a>
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Пн–Сб 9:00–19:00
              </p>
              <p className="footer-contact-text">
                <span className="footer-icon">📞</span>
                <a href="tel:+77477371429" className="footer-phone-link">+7 747 737 14 29</a>
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Пн–Сб 9:00–18:00
              </p>
              <div className="footer-social-links">
                <a href="https://wa.me/77477371429" target="_blank" rel="noopener noreferrer" className="footer-social-link">WhatsApp</a>
                <a href="https://www.instagram.com/vager_autoparts_shymkent/" target="_blank" rel="noopener noreferrer" className="footer-social-link">Instagram</a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-copyright">
          <p>© VAGER 2026. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}
