type FormatDateProps = {
  type?: 'date' | 'full';
  value?: string | Date;
  locale?: string;
};

const DAYS: Record<string, string[]> = {
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  ru: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
};

const MONTHS: Record<string, string[]> = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  ru: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'авг', 'сен', 'окт', 'ноя', 'дек'],
};

const DATE_ORDER: Record<string, ('day' | 'month' | 'year')[]> = {
  en: ['month', 'day', 'year'],
  ru: ['day', 'month', 'year'],
};

function pad(v: number) {
  return v < 10 ? `0${v}` : `${v}`;
}

export function formatDate({ type = 'date', value = new Date(), locale = 'en' }: FormatDateProps) {
  const date = typeof value === 'string' ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return '';

  const lang = locale.split('-')[0].toLowerCase();

  const days = DAYS[lang] ?? DAYS.en;
  const months = MONTHS[lang] ?? MONTHS.en;
  const order = DATE_ORDER[lang] ?? DATE_ORDER.en;

  const parts = {
    day: pad(date.getDate()),
    month: pad(date.getMonth() + 1),
    year: date.getFullYear(),
  };

  if (type === 'date') {
    return order.map((k) => parts[k]).join(lang === 'en' ? '/' : '.');
  }

  const time = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
  const tz = `GMT${date.getTimezoneOffset() <= 0 ? '+' : ''}${-date.getTimezoneOffset() / 60}`;

  return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} ${time} ${tz}`;
}
