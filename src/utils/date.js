import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export const formatDate = (date, formatStr = 'PPP') => {
  if (!date) return '-';
  return format(new Date(date), formatStr, { locale: fr });
};
