import { format, formatDistanceToNow, parseISO } from 'date-fns';

type InputValue = Date | string | number | null | undefined;

export function fDate(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fDateISOString(
  inputDate: string | null | undefined,
  excludeTime?: boolean
): string {
  if (!inputDate) {
    return format(new Date(), 'dd MMM yyyy HH:mm:ss');
  }

  const ISORegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/;
  const isISO = ISORegex.test(inputDate);

  if (!isISO) {
    return inputDate;
  }

  const date = parseISO(inputDate);
  return excludeTime ? format(date, 'dd MMM yyyy') : format(date, 'dd MMM yyyy HH:mm:ss');
}

export function fDateTime(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd MMM yyyy HH:mm:ss';

  return date ? format(new Date(date), fm) : '';
}

// export function fTimestamp(date: InputValue) {
//   return date ? getTime(new Date(date)) : '';
// }

export function fToNow(date: InputValue) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}

export function fMonth(numbers: number[]) {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Mei',
    'Jun',
    'Jul',
    'Agt',
    'Sep',
    'Okt',
    'Nov',
    'Des',
  ];

  return numbers.map((number) => monthNames[number - 1] || 'Invalid');
}
