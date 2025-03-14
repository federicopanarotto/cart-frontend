import { Product } from "./product.entity"

export type CartItem = {
  id: string,
  product: Product,
  quantity: number,
}