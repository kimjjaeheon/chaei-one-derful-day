const KST_OFFSET_MS = 9 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

/** Calendar-day difference between two instants, counted in Korea time (UTC+9). */
export function daysUntil(target: Date, now: Date): number {
  const toKstDay = (d: Date) => Math.floor((d.getTime() + KST_OFFSET_MS) / DAY_MS);
  return toKstDay(target) - toKstDay(now);
}

export function ddayLabel(days: number): string {
  if (days > 0) return `D-${days}`;
  if (days === 0) return "D-DAY";
  return `D+${-days}`;
}
