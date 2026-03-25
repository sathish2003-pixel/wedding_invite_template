import { format, differenceInSeconds, parseISO } from "date-fns";

export function formatWeddingDate(dateStr: string): string {
  const date = parseISO(dateStr);
  return format(date, "EEEE, do MMMM yyyy");
}

export function formatShortDate(dateStr: string): string {
  const date = parseISO(dateStr);
  return format(date, "do MMM yyyy");
}

export function formatTime12h(timeStr: string): string {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const h = hours % 12 || 12;
  return `${h}:${minutes.toString().padStart(2, "0")} ${period}`;
}

export function getCountdown(targetDateStr: string): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isOver: boolean;
} {
  const target = parseISO(targetDateStr);
  const now = new Date();
  const diff = differenceInSeconds(target, now);

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true };
  }

  return {
    days: Math.floor(diff / 86400),
    hours: Math.floor((diff % 86400) / 3600),
    minutes: Math.floor((diff % 3600) / 60),
    seconds: diff % 60,
    isOver: false,
  };
}

export function getOrdinalDate(dateStr: string): string {
  const date = parseISO(dateStr);
  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
          ? "th"
          : "th";
  return `${day}${suffix} ${format(date, "MMMM yyyy")}`;
}
