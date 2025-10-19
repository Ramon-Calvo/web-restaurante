import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="contact-container">
      <!-- Hero Section -->
      <section class="contact-hero">
        <div class="hero-overlay">
          <h1>Contáctanos</h1>
          <p class="subtitle">Estamos aquí para ayudarte</p>
        </div>
      </section>

      <!-- Main Content -->
      <div class="contact-content">
        <div class="container">
          <div class="contact-grid">
            <!-- Contact Form -->
            <div class="form-section">
              <h2>Envíanos un mensaje</h2>
              <p class="form-description">
                ¿Tienes alguna pregunta o sugerencia? Completa el formulario y te responderemos lo antes posible.
              </p>

              <form (ngSubmit)="onSubmit()" #contactForm="ngForm" class="contact-form">
                <div class="form-group">
                  <label for="name">Nombre completo *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    [(ngModel)]="formData.name"
                    required
                    placeholder="Tu nombre"
                    class="form-control"
                  >
                </div>

                <div class="form-group">
                  <label for="email">Correo electrónico *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    [(ngModel)]="formData.email"
                    required
                    email
                    placeholder="tu@email.com"
                    class="form-control"
                  >
                </div>

                <div class="form-group">
                  <label for="phone">Teléfono</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    [(ngModel)]="formData.phone"
                    placeholder="+34 123 456 789"
                    class="form-control"
                  >
                </div>

                <div class="form-group">
                  <label for="subject">Asunto *</label>
                  <select
                    id="subject"
                    name="subject"
                    [(ngModel)]="formData.subject"
                    required
                    class="form-control"
                  >
                    <option value="">Selecciona un asunto</option>
                    <option value="pedido">Consulta sobre pedido</option>
                    <option value="reserva">Reserva de mesa</option>
                    <option value="catering">Servicio de catering</option>
                    <option value="sugerencia">Sugerencia</option>
                    <option value="queja">Queja o reclamación</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="message">Mensaje *</label>
                  <textarea
                    id="message"
                    name="message"
                    [(ngModel)]="formData.message"
                    required
                    rows="6"
                    placeholder="Escribe tu mensaje aquí..."
                    class="form-control"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  class="btn-submit"
                  [disabled]="!contactForm.valid || isSubmitting()"
                >
                  {{ isSubmitting() ? 'Enviando...' : 'Enviar mensaje' }}
                </button>

                <div *ngIf="showSuccess()" class="alert alert-success">
                  ✓ Tu mensaje ha sido enviado correctamente. Te responderemos pronto.
                </div>

                <div *ngIf="showError()" class="alert alert-error">
                  ✗ Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.
                </div>
              </form>
            </div>

            <!-- Contact Info -->
            <div class="info-section">
              <h2>Información de contacto</h2>

              <div class="info-card">
                <div class="info-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div class="info-content">
                  <h3>Dirección</h3>
                  <p>Calle Principal, 123<br>28001 Madrid, España</p>
                </div>
              </div>

              <div class="info-card">
                <div class="info-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div class="info-content">
                  <h3>Teléfono</h3>
                  <p>
                    <a href="tel:+34912345678">+34 91 234 56 78</a><br>
                    <span class="info-note">Disponible 24/7</span>
                  </p>
                </div>
              </div>

              <div class="info-card">
                <div class="info-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div class="info-content">
                  <h3>Email</h3>
                  <p>
                    <a href="mailto:info@kebabrestaurant.com">info@kebabrestaurant.com</a><br>
                    <span class="info-note">Respuesta en 24h</span>
                  </p>
                </div>
              </div>

              <div class="info-card">
                <div class="info-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div class="info-content">
                  <h3>Horario</h3>
                  <p>
                    <strong>Lunes - Jueves:</strong> 12:00 - 23:00<br>
                    <strong>Viernes - Sábado:</strong> 12:00 - 01:00<br>
                    <strong>Domingo:</strong> 12:00 - 23:00
                  </p>
                </div>
              </div>

              <!-- Social Media -->
              <div class="social-section">
                <h3>Síguenos en redes sociales</h3>
                <div class="social-links">
                  <a href="#" class="social-link" aria-label="Facebook">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" class="social-link" aria-label="Instagram">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href="#" class="social-link" aria-label="Twitter">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a href="#" class="social-link" aria-label="WhatsApp">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Map Section -->
          <section class="map-section">
            <h2>Nuestra ubicación</h2>
            <div class="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.4293086556244!2d-3.7037902!3d40.4167754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd42287fca7c5b5d%3A0x8b5b4d8a9e4f6e1d!2sMadrid%2C%20Spain!5e0!3m2!1sen!2ses!4v1234567890123"
                width="100%"
                height="450"
                style="border:0;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </section>

          <!-- FAQ Section -->
          <section class="faq-section">
            <h2>Preguntas frecuentes</h2>
            <div class="faq-grid">
              <div class="faq-item">
                <h3>¿Hacéis entregas a domicilio?</h3>
                <p>Sí, realizamos entregas a domicilio en un radio de 5km. El tiempo estimado de entrega es de 30-45 minutos.</p>
              </div>
              <div class="faq-item">
                <h3>¿Puedo hacer un pedido para recoger?</h3>
                <p>Por supuesto. Puedes hacer tu pedido online o por teléfono y recogerlo en nuestro local.</p>
              </div>
              <div class="faq-item">
                <h3>¿Tenéis opciones vegetarianas?</h3>
                <p>Sí, ofrecemos kebab falafel y varias opciones de ensaladas 100% vegetarianas.</p>
              </div>
              <div class="faq-item">
                <h3>¿Aceptáis grupos grandes?</h3>
                <p>Sí, contáctanos con anticipación para reservar espacio para grupos grandes o eventos especiales.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .contact-container {
      min-height: 100vh;
      background: #f5f5f5;
    }

    /* Hero Section */
    .contact-hero {
      position: relative;
      background: linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%);
      color: white;
      padding: 3.5rem 1rem;
      text-align: center;
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .hero-overlay h1 {
      font-size: 2rem;
      margin-bottom: 0.75rem;
      font-weight: bold;
    }

    .hero-overlay .subtitle {
      font-size: 1.1rem;
      opacity: 0.95;
      margin-bottom: 0;
    }

    /* Main Content */
    .contact-content {
      padding: 4rem 0;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    h2 {
      font-size: 2rem;
      color: #333;
      margin-bottom: 1.5rem;
    }

    /* Contact Grid */
    .contact-grid {
      display: grid;
      grid-template-columns: 1.5fr 1fr;
      gap: 3rem;
      margin-bottom: 4rem;
    }

    /* Form Section */
    .form-section {
      background: white;
      padding: 2.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    }

    .form-description {
      color: #666;
      margin-bottom: 2rem;
      line-height: 1.6;
    }

    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
    }

    .form-group label {
      font-weight: 600;
      color: #333;
      margin-bottom: 0.5rem;
      font-size: 0.95rem;
    }

    .form-control {
      padding: 0.875rem 1rem;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.3s ease;
      font-family: inherit;
    }

    .form-control:focus {
      outline: none;
      border-color: #d32f2f;
      box-shadow: 0 0 0 3px rgba(211, 47, 47, 0.1);
    }

    .form-control::placeholder {
      color: #999;
    }

    textarea.form-control {
      resize: vertical;
      min-height: 120px;
    }

    .btn-submit {
      padding: 1rem 2rem;
      background: linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1.05rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-top: 0.5rem;
    }

    .btn-submit:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(211, 47, 47, 0.3);
    }

    .btn-submit:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .alert {
      padding: 1rem;
      border-radius: 8px;
      margin-top: 1rem;
      font-size: 0.95rem;
    }

    .alert-success {
      background: #e8f5e9;
      color: #2e7d32;
      border-left: 4px solid #4caf50;
    }

    .alert-error {
      background: #ffebee;
      color: #c62828;
      border-left: 4px solid #f44336;
    }

    /* Info Section */
    .info-section {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .info-section h2 {
      font-size: 1.75rem;
    }

    .info-card {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
      display: flex;
      gap: 1rem;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .info-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    }

    .info-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 56px;
      height: 56px;
      background: linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%);
      border-radius: 12px;
      flex-shrink: 0;
      box-shadow: 0 4px 12px rgba(211, 47, 47, 0.25);
    }

    .info-icon svg {
      color: white;
    }

    .info-content h3 {
      color: #333;
      font-size: 1.1rem;
      margin-bottom: 0.5rem;
    }

    .info-content p {
      color: #666;
      line-height: 1.6;
      margin: 0;
    }

    .info-content a {
      color: #d32f2f;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s;
    }

    .info-content a:hover {
      color: #b71c1c;
      text-decoration: underline;
    }

    .info-note {
      font-size: 0.85rem;
      color: #999;
    }

    /* Social Section */
    .social-section {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
      text-align: center;
    }

    .social-section h3 {
      color: #333;
      font-size: 1.1rem;
      margin-bottom: 1rem;
    }

    .social-links {
      display: flex;
      justify-content: center;
      gap: 1rem;
    }

    .social-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: #f5f5f5;
      transition: all 0.3s ease;
      text-decoration: none;
      color: #666;
    }

    .social-link svg {
      transition: all 0.3s ease;
    }

    .social-link:hover {
      background: #d32f2f;
      transform: translateY(-3px);
      box-shadow: 0 4px 12px rgba(211, 47, 47, 0.3);
      color: white;
    }

    /* Map Section */
    .map-section {
      margin-bottom: 4rem;
    }

    .map-container {
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
      height: 450px;
    }

    .map-container iframe {
      width: 100%;
      height: 100%;
      border: 0;
    }

    /* FAQ Section */
    .faq-section {
      margin-bottom: 2rem;
    }

    .faq-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .faq-item {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .faq-item:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    }

    .faq-item h3 {
      color: #d32f2f;
      font-size: 1.1rem;
      margin-bottom: 0.75rem;
    }

    .faq-item p {
      color: #666;
      line-height: 1.6;
      margin: 0;
    }

    /* Responsive Design */
    @media (max-width: 968px) {
      .contact-grid {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .hero-overlay h1 {
        font-size: 2.2rem;
      }

      .hero-overlay .subtitle {
        font-size: 1.1rem;
      }
    }

    @media (max-width: 768px) {
      .contact-content {
        padding: 2rem 0;
      }

      .form-section {
        padding: 1.5rem;
      }

      h2 {
        font-size: 1.6rem;
      }

      .contact-hero {
        padding: 2rem 1rem;
      }

      .hero-overlay h1 {
        font-size: 1.6rem;
      }

      .hero-overlay .subtitle {
        font-size: 0.95rem;
      }

      .map-container {
        height: 350px;
      }

      .faq-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ContactComponent {
  formData: ContactForm = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  isSubmitting = signal(false);
  showSuccess = signal(false);
  showError = signal(false);

  onSubmit(): void {
    this.isSubmitting.set(true);
    this.showSuccess.set(false);
    this.showError.set(false);

    // Simular envío del formulario
    setTimeout(() => {
      // Aquí iría la lógica real de envío (API call)
      console.log('Formulario enviado:', this.formData);
      
      this.isSubmitting.set(false);
      this.showSuccess.set(true);
      
      // Limpiar formulario
      this.formData = {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      };

      // Ocultar mensaje de éxito después de 5 segundos
      setTimeout(() => {
        this.showSuccess.set(false);
      }, 5000);
    }, 1500);
  }
}
