const MONTHS: Record<string, string> = {
  '01': 'Jan',
  '02': 'Feb',
  '03': 'Mar',
  '04': 'Apr',
  '05': 'May',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Aug',
  '09': 'Sep',
  '10': 'Oct',
  '11': 'Nov',
  '12': 'Dec',
};

/** Formats YYYY-MM to "Mon YYYY" */
export function formatMonthYear(ym: string): string {
  const [y, m] = ym.split('-');
  if (!y || !m) return ym;
  const label = MONTHS[m] ?? m;
  return `${label} ${y}`;
}

export function formatExperienceRange(start: string, end: string): string {
  const left = formatMonthYear(start);
  if (end.toLowerCase() === 'present') return `${left} – Present`;
  return `${left} – ${formatMonthYear(end)}`;
}
