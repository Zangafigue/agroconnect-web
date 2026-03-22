export const getSellerName = (seller) => {
  if (!seller) return 'Utilisateur';
  if (typeof seller === 'string') return seller;
  return seller.name || seller.username || 'Utilisateur';
};

export const getSellerInitials = (seller, length = 1) => {
  const name = getSellerName(seller);
  return name.substring(0, length).toUpperCase();
};
