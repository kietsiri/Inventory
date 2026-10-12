export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'MacBook Air M2', price: 34900, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500' },
  { id: '2', name: 'Smart Watch Series 9', price: 13900, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500' },
  { id: '3', name: 'Holo Charizard', price: 37000, image: 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=500' },
];