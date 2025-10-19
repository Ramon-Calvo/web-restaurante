export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  image: string;
  available: boolean;
  ingredients: string[];
  allergens?: string[];
  spicyLevel?: number;
  isVegetarian?: boolean;
  isVegan?: boolean;
  customizations?: MenuCustomization[];
}

export enum MenuCategory {
  KEBAB = 'kebab',
  DURUM = 'durum',
  PLATO = 'plato',
  ENSALADA = 'ensalada',
  BEBIDA = 'bebida',
  POSTRE = 'postre',
  EXTRA = 'extra'
}

export interface MenuCustomization {
  id: string;
  name: string;
  options: CustomizationOption[];
  required: boolean;
  maxSelections?: number;
}

export interface CustomizationOption {
  id: string;
  name: string;
  price: number;
}
