function getDiscountPrice(price: number, discount: number) {
  return price * (discount / 100);
}

function getVatPrice(price: number, vat: number) {
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

export function calcCartItem(item: any, vat: number) {
  const discountOnTotal = getDiscountPrice(item.netPrice, item.discount);
  const vatOnTotal = getVatPrice(item.netPrice - discountOnTotal, vat);
  const discountedPrice = item.netPrice - discountOnTotal;
  const price = discountedPrice + vatOnTotal;

  const total = price * item.quantity;

  return {
    ...item,
    discountPrice: discountOnTotal * item.quantity,
    vatPrice: vatOnTotal * item.quantity,
    netTotalPrice: discountedPrice * item.quantity,
    totalPrice: total,
    totalWeight: item.weight * item.quantity,
  };
}

export function getVat(country: string) {
  return country === "IT" ? 0.22 : 0;
}