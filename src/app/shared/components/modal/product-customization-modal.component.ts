import { Component, input, output, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuItem, MenuCustomization, CustomizationOption } from '../../../core/models/menu-item.model';
import { SelectedCustomization } from '../../../core/models/cart.model';

@Component({
  selector: 'app-product-customization-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    @if (show()) {
      <div class="modal-overlay" (click)="onCancel()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2>{{ product().name }}</h2>
            <button class="close-btn" (click)="onCancel()" type="button">✕</button>
          </div>

          <div class="modal-body">
            <div class="product-info">
              <img [src]="product().image" [alt]="product().name" class="product-image">
              <p class="product-description">{{ product().description }}</p>
              <p class="product-price">Precio base: {{ product().price.toFixed(2) }}€</p>
            </div>

            @if (product().customizations && product().customizations!.length > 0) {
              <div class="customizations">
                @for (customization of product().customizations!; track customization.id) {
                  <div class="customization-group">
                    <h3>
                      {{ customization.name }}
                      @if (customization.required) {
                        <span class="required">*</span>
                      }
                    </h3>

                    <div class="options-list">
                      @for (option of customization.options; track option.id) {
                        <label class="option-item">
                          @if (customization.maxSelections === 1 && customization.required) {
                            <input
                              type="radio"
                              [name]="customization.id"
                              [value]="option.id"
                              [checked]="isOptionSelected(customization.id, option.id)"
                              (change)="onOptionChange(customization, option)"
                            />
                          } @else {
                            <input
                              type="checkbox"
                              [name]="customization.id"
                              [value]="option.id"
                              [checked]="isOptionSelected(customization.id, option.id)"
                              (change)="onCheckboxChange(customization, option, $event)"
                              [disabled]="!isOptionSelected(customization.id, option.id) && getSelectedCount(customization.id) >= (customization.maxSelections || 1)"
                            />
                          }
                          <span class="option-label">
                            {{ option.name }}
                            @if (option.price > 0) {
                              <span class="option-price">+{{ option.price.toFixed(2) }}€</span>
                            }
                          </span>
                        </label>
                      }
                      @if ((customization.maxSelections || 1) > 1) {
                        <p class="selection-hint">Puedes elegir hasta {{ customization.maxSelections }} opciones</p>
                      }
                    </div>
                  </div>
                }
              </div>
            }

            <div class="quantity-selector">
              <label>Cantidad:</label>
              <div class="quantity-controls">
                <button type="button" (click)="decreaseQuantity()" [disabled]="quantity() <= 1">-</button>
                <span>{{ quantity() }}</span>
                <button type="button" (click)="increaseQuantity()">+</button>
              </div>
            </div>

            <div class="comments-section">
              <label for="specialInstructions">Comentarios o instrucciones especiales:</label>
              <textarea
                id="specialInstructions"
                [value]="specialInstructions()"
                (input)="onInstructionsChange($event)"
                placeholder="Ej: Sin cebolla, extra salsa, bien hecho, etc."
                rows="3"
                maxlength="200"
              ></textarea>
              <div class="char-counter">{{ specialInstructions().length }}/200</div>
            </div>

            <div class="total-price">
              <strong>Total: {{ totalPrice().toFixed(2) }}€</strong>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-cancel" (click)="onCancel()" type="button">Cancelar</button>
            <button 
              class="btn btn-confirm" 
              (click)="onConfirm()" 
              type="button"
              [disabled]="!canAddToCart()"
            >
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2000;
      padding: 1rem;
      animation: fadeIn 0.2s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .modal-content {
      background: white;
      border-radius: 12px;
      max-width: 600px;
      width: 100%;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      animation: slideUp 0.3s ease-out;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    }

    @keyframes slideUp {
      from { 
        opacity: 0;
        transform: translateY(20px);
      }
      to { 
        opacity: 1;
        transform: translateY(0);
      }
    }

    .modal-header {
      padding: 1.25rem;
      border-bottom: 1px solid #e0e0e0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .modal-header h2 {
      margin: 0;
      color: #333;
      font-size: 1.4rem;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 1.75rem;
      color: #666;
      cursor: pointer;
      padding: 0;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: background 0.2s;
    }

    .close-btn:hover {
      background: #f5f5f5;
    }

    .modal-body {
      padding: 1.25rem;
      overflow-y: auto;
      flex: 1;
    }

    .product-info {
      margin-bottom: 1.25rem;
    }

    .product-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: 8px;
      margin-bottom: 0.75rem;
    }

    .product-description {
      color: #666;
      margin-bottom: 0.5rem;
      font-size: 0.95rem;
    }

    .product-price {
      color: #d32f2f;
      font-weight: 600;
      font-size: 1.1rem;
    }

    .customizations {
      margin-bottom: 1.25rem;
    }

    .customization-group {
      margin-bottom: 1.25rem;
      padding: 1rem;
      background: #f9f9f9;
      border-radius: 8px;
    }

    .customization-group h3 {
      margin: 0 0 0.75rem 0;
      color: #333;
      font-size: 1.05rem;
    }

    .required {
      color: #d32f2f;
      font-weight: bold;
    }

    .options-list {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }

    .option-item {
      display: flex;
      align-items: center;
      padding: 0.6rem;
      background: white;
      border: 2px solid #e0e0e0;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .option-item:hover {
      border-color: #d32f2f;
      background: #fff5f5;
    }

    .option-item input[type="radio"] {
      margin-right: 0.6rem;
      cursor: pointer;
      width: 18px;
      height: 18px;
    }

    .option-item input[type="checkbox"] {
      margin-right: 0.6rem;
      cursor: pointer;
      width: 18px;
      height: 18px;
    }

    .option-item input[type="checkbox"]:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .option-item input[type="radio"]:checked + .option-label {
      color: #d32f2f;
      font-weight: 600;
    }

    .option-item input[type="checkbox"]:checked + .option-label {
      color: #d32f2f;
      font-weight: 600;
    }

    .selection-hint {
      margin-top: 0.5rem;
      font-size: 0.85rem;
      color: #666;
      font-style: italic;
    }

    .option-label {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.95rem;
    }

    .option-price {
      color: #d32f2f;
      font-weight: 600;
      font-size: 0.9rem;
    }

    .quantity-selector {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      background: #f9f9f9;
      border-radius: 8px;
      margin-bottom: 1rem;
    }

    .quantity-selector label {
      font-weight: 600;
      color: #333;
    }

    .quantity-controls {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .quantity-controls button {
      width: 32px;
      height: 32px;
      border: 2px solid #d32f2f;
      background: white;
      color: #d32f2f;
      border-radius: 50%;
      cursor: pointer;
      font-size: 1.2rem;
      font-weight: bold;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .quantity-controls button:hover:not(:disabled) {
      background: #d32f2f;
      color: white;
    }

    .quantity-controls button:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .quantity-controls span {
      min-width: 40px;
      text-align: center;
      font-weight: 600;
      font-size: 1.1rem;
    }

    .comments-section {
      margin-bottom: 1rem;
    }

    .comments-section label {
      display: block;
      font-weight: 600;
      color: #333;
      margin-bottom: 0.5rem;
      font-size: 0.95rem;
    }

    .comments-section textarea {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-family: inherit;
      font-size: 0.9rem;
      resize: vertical;
      transition: border-color 0.2s;
      box-sizing: border-box;
    }

    .comments-section textarea:focus {
      outline: none;
      border-color: #d32f2f;
    }

    .comments-section textarea::placeholder {
      color: #999;
    }

    .char-counter {
      text-align: right;
      font-size: 0.8rem;
      color: #999;
      margin-top: 0.25rem;
    }

    .total-price {
      text-align: right;
      padding: 1rem;
      background: #fff3e0;
      border-radius: 8px;
      margin-bottom: 0.75rem;
    }

    .total-price strong {
      color: #d32f2f;
      font-size: 1.3rem;
    }

    .modal-footer {
      padding: 1rem 1.25rem;
      border-top: 1px solid #e0e0e0;
      display: flex;
      gap: 0.75rem;
      justify-content: flex-end;
    }

    .btn {
      padding: 0.7rem 1.5rem;
      border: none;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 0.95rem;
    }

    .btn-cancel {
      background: #f5f5f5;
      color: #666;
    }

    .btn-cancel:hover {
      background: #e0e0e0;
    }

    .btn-confirm {
      background: #d32f2f;
      color: white;
    }

    .btn-confirm:hover:not(:disabled) {
      background: #b71c1c;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(211, 47, 47, 0.3);
    }

    .btn-confirm:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    @media (max-width: 768px) {
      .modal-content {
        max-height: 95vh;
      }

      .modal-header h2 {
        font-size: 1.2rem;
      }

      .product-image {
        height: 160px;
      }

      .modal-footer {
        flex-direction: column;
      }

      .btn {
        width: 100%;
      }
    }
  `]
})
export class ProductCustomizationModalComponent {
  show = input.required<boolean>();
  product = input.required<MenuItem>();
  confirm = output<{ customizations: SelectedCustomization[], quantity: number, specialInstructions: string }>();
  cancel = output<void>();

  quantity = signal<number>(1);
  selectedOptions = signal<Map<string, SelectedCustomization[]>>(new Map());
  specialInstructions = signal<string>('');

  totalPrice = computed(() => {
    const basePrice = this.product().price;
    let customizationsPrice = 0;
    
    // Sumar precios de todas las personalizaciones seleccionadas
    for (const selections of this.selectedOptions().values()) {
      customizationsPrice += selections.reduce((sum, custom) => sum + custom.price, 0);
    }
    
    return (basePrice + customizationsPrice) * this.quantity();
  });

  isOptionSelected(customizationId: string, optionId: string): boolean {
    const selections = this.selectedOptions().get(customizationId);
    return selections?.some(s => s.optionId === optionId) || false;
  }

  getSelectedCount(customizationId: string): number {
    return this.selectedOptions().get(customizationId)?.length || 0;
  }

  onOptionChange(customization: MenuCustomization, option: CustomizationOption): void {
    const newMap = new Map(this.selectedOptions());
    newMap.set(customization.id, [{
      customizationId: customization.id,
      optionId: option.id,
      optionName: option.name,
      price: option.price
    }]);
    this.selectedOptions.set(newMap);
  }

  onCheckboxChange(customization: MenuCustomization, option: CustomizationOption, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const newMap = new Map(this.selectedOptions());
    const currentSelections = newMap.get(customization.id) || [];
    
    if (checkbox.checked) {
      // Añadir selección si no se ha alcanzado el máximo
      const maxSelections = customization.maxSelections || 1;
      if (currentSelections.length < maxSelections) {
        newMap.set(customization.id, [
          ...currentSelections,
          {
            customizationId: customization.id,
            optionId: option.id,
            optionName: option.name,
            price: option.price
          }
        ]);
      }
    } else {
      // Remover selección
      newMap.set(
        customization.id,
        currentSelections.filter(s => s.optionId !== option.id)
      );
    }
    
    this.selectedOptions.set(newMap);
  }

  increaseQuantity(): void {
    this.quantity.update(q => q + 1);
  }

  decreaseQuantity(): void {
    if (this.quantity() > 1) {
      this.quantity.update(q => q - 1);
    }
  }

  onInstructionsChange(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.specialInstructions.set(target.value);
  }

  canAddToCart(): boolean {
    const customizations = this.product().customizations || [];
    
    // Verificar que todas las personalizaciones requeridas estén seleccionadas
    for (const customization of customizations) {
      if (customization.required) {
        const selections = this.selectedOptions().get(customization.id);
        if (!selections || selections.length === 0) {
          return false;
        }
      }
    }
    
    return true;
  }

  onConfirm(): void {
    if (this.canAddToCart()) {
      // Aplanar todas las selecciones en un solo array
      const allCustomizations: SelectedCustomization[] = [];
      for (const selections of this.selectedOptions().values()) {
        allCustomizations.push(...selections);
      }
      
      this.confirm.emit({
        customizations: allCustomizations,
        quantity: this.quantity(),
        specialInstructions: this.specialInstructions().trim()
      });
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
