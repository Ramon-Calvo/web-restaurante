import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer__content">
          <div class="footer__section">
            <h3>Kebab Restaurant</h3>
            <p>La mejor comida turca en tu ciudad</p>
            <div class="social-links">
              <a href="#" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>

          <div class="footer__section">
            <h4>Enlaces Rápidos</h4>
            <ul>
              <li><a routerLink="/">Inicio</a></li>
              <li><a routerLink="/menu">Menú</a></li>
              <li><a routerLink="/about">Nosotros</a></li>
              <li><a routerLink="/contact">Contacto</a></li>
            </ul>
          </div>

          <div class="footer__section">
            <h4>Horario</h4>
            <ul class="schedule">
              <li>Lunes - Viernes: 12:00 - 00:00</li>
              <li>Sábados: 12:00 - 01:00</li>
              <li>Domingos: 13:00 - 23:00</li>
            </ul>
          </div>

          <div class="footer__section">
            <h4>Contacto</h4>
            <ul class="contact">
              <li>
                <div class="contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <span>+34 900 123 456</span>
              </li>
              <li>
                <div class="contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <span>info&#64;kebabrestaurant.com</span>
              </li>
              <li>
                <div class="contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <span>Calle Principal, 123<br>Madrid, 28001</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="footer__bottom">
          <p>&copy; {{ currentYear }} Kebab Restaurant. Todos los derechos reservados.</p>
          <div class="footer__links">
            <a routerLink="/privacy">Privacidad</a>
            <a routerLink="/terms">Términos y Condiciones</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: #1a1a1a;
      color: #fff;
      padding: 1.5rem 0 0.5rem;
      margin-top: 2rem;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    .footer__content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .footer__section h3 {
      color: #d32f2f;
      margin-bottom: 0.5rem;
      font-size: 1rem;
    }

    .footer__section h4 {
      color: #fff;
      margin-bottom: 0.5rem;
      font-size: 0.95rem;
    }

    .footer__section p {
      color: #999;
      line-height: 1.4;
      font-size: 0.85rem;
    }

    .footer__section ul {
      list-style: none;
      padding: 0;
    }

    .footer__section ul li {
      margin-bottom: 0.3rem;
    }

    .footer__section ul li a {
      color: #999;
      text-decoration: none;
      font-size: 0.85rem;
      transition: color 0.2s;
    }

    .footer__section ul li a:hover {
      color: #d32f2f;
    }

    .social-links {
      display: flex;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }

    .social-links a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #333;
      color: #fff;
      font-size: 1rem;
      transition: all 0.2s;
    }

    .social-links a:hover {
      background: #d32f2f;
      transform: translateY(-2px);
    }

    .schedule li {
      color: #999;
      line-height: 1.4;
      font-size: 0.85rem;
    }

    .contact li {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      margin-bottom: 0.65rem;
      color: #999;
      line-height: 1.4;
      font-size: 0.85rem;
    }

    .contact-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 34px;
      height: 34px;
      background: linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%);
      border-radius: 8px;
      flex-shrink: 0;
      box-shadow: 0 2px 8px rgba(211, 47, 47, 0.25);
    }

    .contact-icon svg {
      color: white;
      width: 18px;
      height: 18px;
    }

    .footer__bottom {
      border-top: 1px solid #333;
      padding-top: 0.75rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .footer__bottom p {
      color: #666;
      margin: 0;
      font-size: 0.8rem;
    }

    .footer__links {
      display: flex;
      gap: 1rem;
    }

    .footer__links a {
      color: #666;
      text-decoration: none;
      font-size: 0.8rem;
      transition: color 0.2s;
    }

    .footer__links a:hover {
      color: #d32f2f;
    }

    @media (max-width: 768px) {
      .footer {
        padding: 1.25rem 0 0.5rem;
        margin-top: 1.5rem;
      }

      .footer__content {
        grid-template-columns: 1fr;
        gap: 0.85rem;
      }

      .footer__section h3 {
        font-size: 0.95rem;
        margin-bottom: 0.4rem;
      }

      .footer__section h4 {
        font-size: 0.9rem;
        margin-bottom: 0.4rem;
      }

      .contact-icon {
        width: 30px;
        height: 30px;
      }

      .contact-icon svg {
        width: 16px;
        height: 16px;
      }

      .social-links a {
        width: 30px;
        height: 30px;
      }

      .footer__bottom {
        flex-direction: column;
        text-align: center;
      }
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
