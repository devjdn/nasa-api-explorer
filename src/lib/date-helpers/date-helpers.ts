import { toZonedTime } from "date-fns-tz";

export function getDefaultMaxDate() {
  const now = new Date();

  return new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  );
}

export function getApodMaxDate() {
  const now = new Date();

  const eastern = toZonedTime(now, "America/New_York");

  return new Date(eastern.getFullYear(), eastern.getMonth(), eastern.getDate());
}

export function getRandomDate(min: Date, max?: Date) {
  if (!max) {
    max = getDefaultMaxDate();
  }

  const diff = max.getTime() - min.getTime();
  const random = Math.random();

  return new Date(min.getTime() + random * diff);
}
