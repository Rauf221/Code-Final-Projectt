export interface Order {
    id: string;
    productId: number;
    quantity: number;
    status: 'pending' | 'paid' | 'shipped' | 'received' | 'cancelled';
    customerIp: string;
    stripeSessionId: string;
    createdAt: Date;
    updatedAt: Date;
  }