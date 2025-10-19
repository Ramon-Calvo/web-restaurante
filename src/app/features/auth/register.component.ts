import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="register-page">
      <div class="container">
        <div class="register-card">
          <h1>Crear Cuenta</h1>
          <p class="subtitle">Únete a Kebab Restaurant</p>

          <form (ngSubmit)="onRegister()" #registerForm="ngForm">
            <div class="form-group">
              <label for="name">Nombre Completo</label>
              <input
                type="text"
                id="name"
                name="name"
                [(ngModel)]="name"
                required
                placeholder="Juan Pérez"
                [class.error]="registerForm.submitted && !name">
              @if (registerForm.submitted && !name) {
                <span class="error-message">El nombre es obligatorio</span>
              }
            </div>

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
                [class.error]="registerForm.submitted && !email">
              @if (registerForm.submitted && !email) {
                <span class="error-message">El correo es obligatorio</span>
              }
            </div>

            <div class="form-group">
              <label for="phone">Teléfono</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                [(ngModel)]="phone"
                required
                placeholder="+34 600 000 000"
                [class.error]="registerForm.submitted && !phone">
              @if (registerForm.submitted && !phone) {
                <span class="error-message">El teléfono es obligatorio</span>
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
                placeholder="Mínimo 6 caracteres"
                [class.error]="registerForm.submitted && !password">
              @if (registerForm.submitted && !password) {
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
                <span>Creando cuenta...</span>
              } @else {
                <span>Crear Cuenta</span>
              }
            </button>
          </form>

          <div class="divider">
            <span>O</span>
          </div>

          <div class="alternative-actions">
            <p>¿Ya tienes cuenta? <a routerLink="/login">Iniciar sesión</a></p>
            <p><a routerLink="/menu">Continuar sin registrarse</a></p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .register-page {
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

    .register-card {
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

    @media (max-width: 768px) {
      .register-card {
        padding: 2rem 1.5rem;
      }

      h1 {
        font-size: 1.75rem;
      }
    }
  `]
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  name = '';
  email = '';
  phone = '';
  password = '';
  
  isLoading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  constructor() {
    console.log('📝 RegisterComponent: Inicializado');
  }

  async onRegister(): Promise<void> {
    console.log('📝 RegisterComponent: Intento de registro', { 
      name: this.name, 
      email: this.email 
    });

    this.errorMessage.set('');
    this.successMessage.set('');

    // Validación básica
    if (!this.name || !this.email || !this.phone || !this.password) {
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

      // Registro exitoso
      this.authService.signIn(this.email, this.password);

      console.log('📝 RegisterComponent: Registro exitoso');
      this.successMessage.set('¡Cuenta creada exitosamente! Redirigiendo...');

      // Redirigir al menú después de 1 segundo
      setTimeout(() => {
        this.router.navigate(['/menu']);
      }, 1000);

    } catch (error) {
      console.error('📝 RegisterComponent: Error en registro', error);
      this.errorMessage.set('Error al crear la cuenta. Intenta de nuevo.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
