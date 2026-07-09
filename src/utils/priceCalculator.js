const multiplyPriceByQuantity = (unitPrice, quantity) => {
  const parsedPrice = parseFloat(unitPrice);
  const parsedQuantity = parseInt(quantity, 10);
  
  if (isNaN(parsedPrice) || isNaN(parsedQuantity)) return 0;
  return parsedPrice * parsedQuantity;
};

module.exports = { multiplyPriceByQuantity };
