export default function Avatar({ name, role, size = 'md' }) {
  const getInitials = (n) => {
    if (!n) return 'U';
    const parts = n.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return n.substring(0, 2).toUpperCase();
  };

  const initials = getInitials(name);

  let bgColor = 'bg-[#f3f4f6]';
  let textColor = 'text-[#374151]';

  const r = role?.toUpperCase();
  if (r === 'FARMER') {
    bgColor = 'bg-[#dcfce7]';
    textColor = 'text-[#15803d]';
  } else if (r === 'BUYER') {
    bgColor = 'bg-[#dbeafe]';
    textColor = 'text-[#1d4ed8]';
  } else if (r === 'TRANSPORTER') {
    bgColor = 'bg-[#fef3c7]';
    textColor = 'text-[#92400e]';
  }

  let sizeClasses = 'w-9 h-9 text-sm';
  if (size === 'sm') sizeClasses = 'w-7 h-7 text-xs';
  if (size === 'lg') sizeClasses = 'w-12 h-12 text-lg';

  return (
    <div className={`rounded-full flex items-center justify-center font-bold ${sizeClasses} ${bgColor} ${textColor} shrink-0`}>
      {initials}
    </div>
  );
}
