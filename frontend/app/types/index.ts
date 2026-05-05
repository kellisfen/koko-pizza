export type Category =
  | 'pizza'
  | 'roman'
  | 'combo'
  | 'snacks'
  | 'coffee'
  | 'drinks'
  | 'cocktails'
  | 'breakfasts'
  | 'desserts'
  | 'sauces';

export interface CategoryInfo {
  id: Category;
  name: string;
  count?: number;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: Category;
  image?: string;
  description: string;
  is_new?: boolean;
  is_popular?: boolean;
  for_kids?: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  address: string;
  status: 'pending' | 'preparing' | 'in_delivery' | 'delivered';
  createdAt: string;
  estimatedTime: number;
}

export interface User {
  email: string;
  name: string;
  phone: string;
}
