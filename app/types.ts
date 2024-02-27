import { type } from "os";

export type Product = {
  id: number;
  title: string;
  collection: string;
  description: string;
  price: number;
  image: string;
};

export type CartItem = {
  product: Product;
  quantity: number; 
};