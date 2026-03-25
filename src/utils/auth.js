/**
 * Determines the internal role of a user based on their profile.
 * 
 * The backend returns role:'USER' for all non-admins.
 * Actual user type is determined by capability flags:
 *   canSell   → FARMER (Producteur / Agriculteur)
 *   canBuy    → BUYER  (Acheteur)
 *   canDeliver→ TRANSPORTER (Livreur / Transporteur)
 */
export const getUserRole = (user) => {
  if (!user) return '';

  const base = (user.role || '').toString().toUpperCase().trim();

  // Explicit admin
  if (base === 'ADMIN' || base === 'SUPERADMIN') return 'ADMIN';

  // For 'USER' (generic non-admin), resolve via capability flags
  if (base === 'USER' || base === 'FARMER' || base === 'BUYER' || base === 'TRANSPORTER' || base === 'PRODUCER') {
    // Priority: TRANSPORTER > FARMER > BUYER (most specific first)
    if (user.canDeliver) return 'TRANSPORTER';
    if (user.canSell)    return 'FARMER';
    if (user.canBuy)     return 'BUYER';

    // Fallback to explicit role string if no flags match
    if (base === 'FARMER' || base === 'PRODUCER') return 'FARMER';
    if (base === 'BUYER')  return 'BUYER';
    if (base === 'TRANSPORTER') return 'TRANSPORTER';
  }

  return base;
};

/**
 * Maps an internal role to its dashboard URL slug.
 */
export const getRoleSlug = (role) => {
  switch (role) {
    case 'FARMER':      return 'farmer';
    case 'BUYER':       return 'buyer';
    case 'TRANSPORTER': return 'transporter';
    case 'ADMIN':       return 'admin';
    default:            return 'visitor';
  }
};

/**
 * @deprecated Use getUserRole(user) instead.
 * Kept for backwards compatibility with any remaining callers.
 */
export const normalizeRole = (role) => {
  if (!role) return '';
  const r = role.toString().toUpperCase().trim();
  if (r === 'FARMER' || r === 'PRODUCER') return 'FARMER';
  if (r === 'BUYER' || r === 'CLIENT' || r === 'CUSTOMER') return 'BUYER';
  if (r === 'TRANSPORTER' || r === 'LOGISTICS' || r === 'DELIVERY' || r === 'DRIVER') return 'TRANSPORTER';
  if (r === 'ADMIN' || r === 'SUPERADMIN') return 'ADMIN';
  return r;
};
