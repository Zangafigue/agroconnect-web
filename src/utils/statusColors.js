export const getStatusColor = (status) => {
  switch (status) {
    case 'PENDING':   return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'CONFIRMED': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'IN_TRANSIT':return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'DELIVERED': return 'bg-green-100 text-green-800 border-green-200';
    case 'CANCELLED': return 'bg-red-100 text-red-800 border-red-200';
    case 'DISPUTED':  return 'bg-orange-100 text-orange-800 border-orange-200';
    default:          return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};
