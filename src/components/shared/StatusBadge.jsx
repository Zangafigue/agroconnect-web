export default function StatusBadge({ status }) {
  let bgColor = 'bg-gray-100';
  let textColor = 'text-gray-600';

  const s = status?.toUpperCase() || '';

  if (s === 'EN ATTENTE' || s === 'RETENU') {
    bgColor = 'bg-[#fef3c7]';
    textColor = 'text-[#92400e]';
  } else if (s === 'CONFIRMÉE' || s === 'ACTIF') {
    bgColor = 'bg-[#dcfce7]';
    textColor = 'text-[#15803d]';
  } else if (s === 'EN TRANSIT') {
    bgColor = 'bg-[#dbeafe]';
    textColor = 'text-[#1d4ed8]';
  } else if (s === 'LIVRÉE' || s === 'LIBÉRÉ') {
    bgColor = 'bg-[#16a34a]';
    textColor = 'text-white';
  } else if (s === 'LITIGE' || s === 'SUSPENDU') {
    bgColor = 'bg-[#fee2e2]';
    textColor = 'text-[#dc2626]';
  } else if (s === 'ANNULÉE') {
    bgColor = 'bg-[#f3f4f6]';
    textColor = 'text-[#6b7280]';
  }

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
      {status}
    </span>
  );
}
