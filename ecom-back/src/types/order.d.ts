export interface CreateOrder {
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    wilaya: string;
  };
  products: {
    productId: number;
    quantity: number;
  }[];
  total: number;
}
