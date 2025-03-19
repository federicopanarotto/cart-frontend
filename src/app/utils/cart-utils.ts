import { CartItem } from "../services/cart-item.entity";

export function getDiscountPrice(price: number, discount: number) {
  return price * discount;
}

export function getVatPrice(price: number, vat: number) {
  return price * vat;
}

export function getTransportFee(weight: number) {
  let transportFee = 0;
  if (weight > 2000) {
    transportFee = 7;
  }
  if (weight > 5000) {
    transportFee = 15;
  }
  if (weight > 10000) {
    transportFee = 20;
  }
  return transportFee;
}

export function calcCartItem(item: CartItem, vat: number) {
  const discountOnTotal = getDiscountPrice(item.product.netPrice, item.product.discount);
  const vatOnTotal = getVatPrice(item.product.netPrice - discountOnTotal, vat);
  const discountedPrice = item.product.netPrice - discountOnTotal;
  const price = discountedPrice + vatOnTotal;

  const total = price * item.quantity;

  return {
    ...item,
    discountPrice: discountOnTotal * item.quantity,
    vatPrice: vatOnTotal * item.quantity,
    netTotalPrice: discountedPrice * item.quantity,
    totalPrice: total,
    totalWeight: item.product.weight * item.quantity,
  };
}