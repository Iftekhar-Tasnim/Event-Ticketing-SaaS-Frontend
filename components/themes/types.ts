// Modern Dark Theme - Shared Types and Interfaces

export interface Event {
  id: string;
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  startAt: Date | string;
  endAt?: Date | string;
  venue: string;
  city: string;
  price: number;
  status: string;
  capacity: number;
  soldCount: number;
}

export interface Ticket {
  id: string;
  eventId: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  soldCount: number;
  status: string;
}

export interface CartItem {
  id: string;
  ticket: Ticket;
  event: Event;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  totalAmount: number;
  status: string;
  items: OrderItem[];
  createdAt: Date | string;
  paidAt?: Date | string;
}

export interface OrderItem {
  id: string;
  ticket: Ticket;
  event: Event;
  quantity: number;
  pricePerTicket: number;
  subtotal: number;
  qrCode?: string;
}

export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
}
