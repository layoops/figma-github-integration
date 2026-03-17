interface FormatDateProps {
  type?: 'date' | 'full';
  value?: string | Date;
  locale?: string;
}

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatDate({ type = 'date', value = new Date().toISOString() }: FormatDateProps) {
  const dateValue = typeof value === 'string' ? new Date(value) : value;
  if (type === 'date')
    return `${dateValue.getDate()}.${dateValue.getMonth() + 1}.${dateValue.getFullYear()}`;
  return `${days[dateValue.getDay()]}, ${dateValue.getDate()} ${
    months[dateValue.getMonth()]
  } ${dateValue.getFullYear()} ${dateValue.getHours()}:${
    (dateValue.getMinutes() < 10 ? '0' : '') + dateValue.getMinutes()
  } GMT+${-dateValue.getTimezoneOffset() / 60}`;
}
