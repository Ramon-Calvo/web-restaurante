import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="about-container">
      <!-- Hero Section -->
      <section class="about-hero">
        <div class="hero-overlay">
          <h1>Nuestra Historia</h1>
          <p class="subtitle">Sabor auténtico desde 2005</p>
        </div>
      </section>

      <!-- Main Content -->
      <div class="about-content">
        <!-- Historia -->
        <section class="history-section">
          <div class="section-header">
            <h2>20 Años de Tradición</h2>
          </div>
          <div class="content-grid">
            <div class="text-content">
              <p class="highlight">
                Desde <strong>2005</strong>, hemos estado sirviendo los mejores kebabs de la ciudad, 
                manteniendo la receta tradicional que nos caracteriza.
              </p>
              <p>
                Comenzamos como un pequeño local familiar con el sueño de compartir 
                los auténticos sabores de la cocina mediterránea. Hoy, dos décadas después, 
                seguimos fieles a nuestras raíces, utilizando las mismas técnicas artesanales 
                y el mismo amor por la comida que nos vio nacer.
              </p>
              <p>
                Cada kebab que preparamos lleva consigo 20 años de experiencia, 
                perfeccionamiento y pasión por lo que hacemos.
              </p>
            </div>
            <div class="image-content">
              <img 
                src="https://www.gourmetkebab.es/wp-content/uploads/2022/06/receta-kebab-de-pollo.jpg" 
                alt="Kebab de pollo enrollado con ingredientes frescos"
                class="restaurant-image"
              >
              <p class="image-caption">Nuestro delicioso kebab de pollo con verduras frescas</p>
            </div>
          </div>
        </section>

        <!-- Calidad -->
        <section class="quality-section">
          <div class="section-header">
            <h2>Ingredientes de Primera Calidad</h2>
          </div>
          <div class="quality-grid">
            <div class="quality-card">
              <div class="card-icon">
                <img src="https://www.gourmetkebab.es/wp-content/uploads/2020/05/montar-un-kebab.jpg" alt="Cómo montar un kebab">
              </div>
              <h3>Carne Premium</h3>
              <p>
                Seleccionamos cuidadosamente nuestras carnes de proveedores locales 
                de confianza. Solo utilizamos cortes premium de ternera y pollo, 
                marinados con nuestra mezcla secreta de especias durante 24 horas.
              </p>
            </div>
            <div class="quality-card">
              <div class="card-icon">
                <img src="https://www.gourmetkebab.es/wp-content/uploads/2024/02/receta-kapsalon.jpg" alt="Kapsalon kebab">
              </div>
              <h3>Verduras Frescas</h3>
              <p>
                Cada mañana recibimos verduras frescas del mercado local. 
                Lechuga crujiente, tomates maduros, cebollas dulces y pepinos 
                frescos para garantizar el mejor sabor en cada bocado.
              </p>
            </div>
            <div class="quality-card">
              <div class="card-icon">
                <img src="https://www.gourmetkebab.es/wp-content/uploads/2019/09/tipos-de-pan-Kebab.jpg" alt="Pan para kebab">
              </div>
              <h3>Pan Artesanal</h3>
              <p>
                Nuestro pan pita se hornea diariamente en nuestro horno tradicional. 
                Suave por dentro, ligeramente crujiente por fuera, perfecto para 
                envolver todos nuestros ingredientes frescos.
              </p>
            </div>
            <div class="quality-card">
              <div class="card-icon">
                <img src="https://www.gourmetkebab.es/wp-content/uploads/2022/03/salsa-yogur-para-kebab.jpg" alt="Salsa de yogur">
              </div>
              <h3>Salsas Caseras</h3>
              <p>
                Todas nuestras salsas son preparadas diariamente con recetas familiares. 
                Desde nuestra famosa salsa blanca, hasta nuestra salsa picante.
                Cada una es única y deliciosa.
              </p>
            </div>
          </div>
        </section>

        <!-- Valores -->
        <section class="values-section">
          <div class="section-header">
            <h2>Nuestros Valores</h2>
          </div>
          <div class="values-list">
            <div class="value-item">
              <div class="value-icon">✓</div>
              <div class="value-content">
                <h3>Calidad Sin Compromisos</h3>
                <p>No escatimamos en ingredientes. Solo lo mejor para nuestros clientes.</p>
              </div>
            </div>
            <div class="value-item">
              <div class="value-icon">✓</div>
              <div class="value-content">
                <h3>Tradición y Autenticidad</h3>
                <p>Respetamos las recetas originales siguiendo las recetas tradiciones.</p>
              </div>
            </div>
            <div class="value-item">
              <div class="value-icon">✓</div>
              <div class="value-content">
                <h3>Servicio Excepcional</h3>
                <p>Cada cliente es parte de nuestra familia. Tu satisfacción es nuestra prioridad.</p>
              </div>
            </div>
            <div class="value-item">
              <div class="value-icon">✓</div>
              <div class="value-content">
                <h3>Sostenibilidad</h3>
                <p>Trabajamos con proveedores locales y minimizamos nuestro impacto ambiental.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- CTA -->
        <section class="cta-section">
          <h2>¿Listo para probar la diferencia?</h2>
          <p>Visítanos o haz tu pedido online</p>
          <div class="cta-buttons">
            <a href="/menu" class="btn-primary">Ver Menú</a>
            <a href="/contact" class="btn-secondary">Contáctanos</a>
          </div>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .about-container {
      min-height: 100vh;
    }

    .about-hero {
      position: relative;
      height: 350px;
      background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
                  url('https://www.gourmetkebab.es/wp-content/uploads/2022/04/receta-kebab-con-arroz.jpg') center/cover;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      text-align: center;
    }

    .hero-overlay h1 {
      font-size: 3rem;
      margin: 0;
      font-weight: 700;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }

    .subtitle {
      font-size: 1.5rem;
      margin-top: 0.5rem;
      font-weight: 300;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    }

    .about-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 4rem 1.5rem;
    }

    .section-header {
      text-align: center;
      margin-bottom: 3.5rem;
    }

    .section-header .icon {
      font-size: 3rem;
      display: block;
      margin-bottom: 0.5rem;
    }

    .section-header h2 {
      font-size: 2.2rem;
      color: #333;
      margin: 0;
    }

    /* History Section */
    .history-section {
      margin-bottom: 6rem;
    }

    .content-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
    }

    .text-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .text-content p {
      line-height: 1.9;
      color: #555;
      margin-bottom: 1.5rem;
      font-size: 1.05rem;
    }

    .text-content .highlight {
      font-size: 1.15rem;
      color: #d32f2f;
      font-weight: 500;
    }

    .image-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .restaurant-image {
      width: 100%;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
      transition: transform 0.3s;
    }

    .restaurant-image:hover {
      transform: scale(1.02);
    }

    .image-caption {
      text-align: center;
      color: #666;
      font-size: 0.9rem;
      margin-top: 0.8rem;
      font-style: italic;
    }

    /* Quality Section */
    .quality-section {
      margin-bottom: 6rem;
      background: #f9f9f9;
      padding: 4rem 2.5rem;
      border-radius: 12px;
    }

    .quality-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2.5rem;
    }

    .quality-card {
      background: white;
      padding: 2.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      transition: transform 0.3s, box-shadow 0.3s;
    }

    .quality-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    }

    .card-icon {
      width: 100%;
      height: 150px;
      margin-bottom: 2rem;
      border-radius: 8px;
      overflow: hidden;
    }

    .card-icon img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s;
    }

    .quality-card:hover .card-icon img {
      transform: scale(1.1);
    }

    .quality-card h3 {
      color: #d32f2f;
      margin-bottom: 1rem;
      font-size: 1.3rem;
    }

    .quality-card p {
      color: #666;
      line-height: 1.8;
      font-size: 0.95rem;
    }

    /* Values Section */
    .values-section {
      margin-bottom: 6rem;
    }

    .values-list {
      max-width: 900px;
      margin: 0 auto;
    }

    .value-item {
      display: flex;
      gap: 1.5rem;
      margin-bottom: 2.5rem;
      padding: 2rem;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      transition: transform 0.2s;
    }

    .value-item:hover {
      transform: translateX(5px);
    }

    .value-icon {
      font-size: 2rem;
      color: #4caf50;
      font-weight: bold;
      flex-shrink: 0;
    }

    .value-content h3 {
      color: #333;
      margin: 0 0 0.75rem 0;
      font-size: 1.2rem;
    }

    .value-content p {
      color: #666;
      margin: 0;
      line-height: 1.7;
    }

    /* CTA Section */
    .cta-section {
      text-align: center;
      padding: 2.5rem 2rem;
      background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
      border-radius: 12px;
      margin-bottom: 3rem;
    }

    .cta-section h2 {
      font-size: 1.6rem;
      color: #333;
      margin-bottom: 0.5rem;
    }

    .cta-section p {
      color: #666;
      font-size: 1rem;
      margin-bottom: 1.5rem;
    }

    .cta-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }

    .btn-primary, .btn-secondary {
      padding: 0.75rem 2rem;
      border-radius: 25px;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.95rem;
      transition: all 0.3s;
      display: inline-block;
    }

    .btn-primary {
      background: #d32f2f;
      color: white;
      box-shadow: 0 4px 12px rgba(211, 47, 47, 0.3);
    }

    .btn-primary:hover {
      background: #b71c1c;
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(211, 47, 47, 0.4);
    }

    .btn-secondary {
      background: white;
      color: #d32f2f;
      border: 2px solid #d32f2f;
    }

    .btn-secondary:hover {
      background: #d32f2f;
      color: white;
      transform: translateY(-2px);
    }

    /* Responsive */
    @media (max-width: 768px) {
      .about-hero {
        height: 250px;
      }

      .hero-overlay h1 {
        font-size: 2rem;
      }

      .subtitle {
        font-size: 1.1rem;
      }

      .about-content {
        padding: 3rem 1.5rem;
      }

      .section-header {
        margin-bottom: 2.5rem;
      }

      .history-section {
        margin-bottom: 4rem;
      }

      .content-grid {
        grid-template-columns: 1fr;
        gap: 2.5rem;
      }

      .text-content p {
        margin-bottom: 1.25rem;
      }

      .quality-section {
        margin-bottom: 4rem;
        padding: 3rem 1.5rem;
      }

      .quality-grid {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .quality-card {
        padding: 2rem;
      }

      .values-section {
        margin-bottom: 4rem;
      }

      .value-item {
        margin-bottom: 2rem;
        padding: 1.5rem;
      }

      .cta-section {
        padding: 2rem 1.5rem;
        margin-bottom: 2rem;
      }

      .cta-section h2 {
        font-size: 1.4rem;
      }

      .cta-section p {
        font-size: 0.95rem;
        margin-bottom: 1.25rem;
      }

      .cta-buttons {
        flex-direction: column;
        gap: 0.75rem;
      }

      .btn-primary, .btn-secondary {
        width: 100%;
        max-width: 280px;
        padding: 0.7rem 1.5rem;
        font-size: 0.9rem;
      }

      .section-header h2 {
        font-size: 1.8rem;
      }
    }
  `]
})
export class AboutComponent {
  constructor() {
    console.log('📖 AboutComponent: Componente Nosotros inicializado');
  }
}
