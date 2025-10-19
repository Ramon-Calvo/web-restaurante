import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="login-page">
      <div class="container">
        <div class="login-card">
          <h1>Iniciar Sesión</h1>
          <p class="subtitle">Bienvenido de vuelta a Kebab Restaurant</p>

          <form (ngSubmit)="onLogin()" #loginForm="ngForm">
            <div class="form-group">
              <label for="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                [(ngModel)]="email"
                required
                email
                placeholder="tu@email.com"
                [class.error]="loginForm.submitted && !email">
              @if (loginForm.submitted && !email) {
                <span class="error-message">El correo es obligatorio</span>
              }
            </div>

            <div class="form-group">
              <label for="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                [(ngModel)]="password"
                required
                minlength="6"
                placeholder="••••••••"
                [class.error]="loginForm.submitted && !password">
              @if (loginForm.submitted && !password) {
                <span class="error-message">La contraseña es obligatoria</span>
              }
            </div>

            @if (errorMessage()) {
              <div class="alert alert--error">
                {{ errorMessage() }}
              </div>
            }

            @if (successMessage()) {
              <div class="alert alert--success">
                {{ successMessage() }}
              </div>
            }

            <button 
              type="submit" 
              class="btn btn--primary btn--full"
              [disabled]="isLoading()">
              @if (isLoading()) {
                <span>Iniciando sesión...</span>
              } @else {
                <span>Iniciar Sesión</span>
              }
            </button>
          </form>

          <div class="divider">
            <span>O</span>
          </div>

          <div class="alternative-actions">
            <p>¿No tienes cuenta? <a routerLink="/register">Crear cuenta</a></p>
            <p><a routerLink="/menu">Continuar sin iniciar sesión</a></p>
          </div>

          <div class="demo-info">
            <p><strong>Demo:</strong> Usa cualquier correo y contraseña</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-page {
      min-height: 100vh;
      background: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem 1rem;
    }

    .container {
      width: 100%;
      max-width: 450px;
    }

    .login-card {
      background: white;
      border-radius: 16px;
      padding: 3rem 2rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      border: 1px solid #e0e0e0;
    }

    h1 {
      text-align: center;
      color: #333;
      margin-bottom: 0.5rem;
      font-size: 2rem;
    }

    .subtitle {
      text-align: center;
      color: #666;
      margin-bottom: 2rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #333;
      font-weight: 500;
    }

    input {
      width: 100%;
      padding: 0.875rem 1rem;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.2s;
    }

    input:focus {
      outline: none;
      border-color: #d32f2f;
    }

    input.error {
      border-color: #f44336;
    }

    .error-message {
      display: block;
      color: #f44336;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .alert {
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 1.5rem;
      font-size: 0.9rem;
    }

    .alert--error {
      background: #ffebee;
      color: #c62828;
      border: 1px solid #ef9a9a;
    }

    .alert--success {
      background: #e8f5e9;
      color: #2e7d32;
      border: 1px solid #a5d6a7;
    }

    .btn {
      padding: 1rem 2rem;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s;
    }

    .btn--primary {
      background: #d32f2f;
      color: white;
    }

    .btn--primary:hover:not(:disabled) {
      background: #b71c1c;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(211, 47, 47, 0.3);
    }

    .btn--primary:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    .btn--full {
      width: 100%;
    }

    .divider {
      position: relative;
      text-align: center;
      margin: 2rem 0;
    }

    .divider::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      width: 100%;
      height: 1px;
      background: #e0e0e0;
    }

    .divider span {
      position: relative;
      background: white;
      padding: 0 1rem;
      color: #999;
      font-size: 0.875rem;
    }

    .alternative-actions {
      text-align: center;
    }

    .alternative-actions p {
      margin: 0.75rem 0;
      color: #666;
    }

    .alternative-actions a {
      color: #d32f2f;
      text-decoration: none;
      font-weight: 600;
    }

    .alternative-actions a:hover {
      text-decoration: underline;
    }

    .demo-info {
      margin-top: 2rem;
      padding: 1rem;
      background: #f5f5f5;
      border-radius: 8px;
      text-align: center;
    }

    .demo-info p {
      margin: 0;
      color: #666;
      font-size: 0.875rem;
    }

    @media (max-width: 768px) {
      .login-card {
        padding: 2rem 1.5rem;
      }

      h1 {
        font-size: 1.75rem;
      }
    }
  `]
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  
  isLoading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  constructor() {
    console.log('🔐 LoginComponent: Inicializado');
  }

  async onLogin(): Promise<void> {
    console.log('🔐 LoginComponent: Intento de login', { email: this.email });

    this.errorMessage.set('');
    this.successMessage.set('');

    // Validación básica
    if (!this.email || !this.password) {
      this.errorMessage.set('Por favor completa todos los campos');
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage.set('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    this.isLoading.set(true);

    try {
      // Simular llamada al servidor
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Login (en demo mode siempre funciona)
      this.authService.signIn(this.email, this.password);

      console.log('🔐 LoginComponent: Login exitoso');
      this.successMessage.set('¡Inicio de sesión exitoso! Redirigiendo...');

      // Redirigir al menú después de 1 segundo
      setTimeout(() => {
        this.router.navigate(['/menu']);
      }, 1000);

    } catch (error) {
      console.error('🔐 LoginComponent: Error en login', error);
      this.errorMessage.set('Error al iniciar sesión. Intenta de nuevo.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
