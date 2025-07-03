import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formateDate(date: Date) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;
}

export function randomId(len: number, pattern?: string) {
  const possibilities = {
    lowerCased: "abcdefghijklmnopqrstuvwxyz",
    capitals: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    special: "~!@#$%^&()_+-={}[];',",
  };
  if (!len) len = 30;
  if (!pattern) pattern = "aA0";

  let chars = "";

  pattern.split("").forEach((a) => {
    if (!isNaN(parseInt(a))) {
      chars += possibilities.numbers;
    } else if (/[a-z]/.test(a)) {
      chars += possibilities.lowerCased;
    } else if (/[A-Z]/.test(a)) {
      chars += possibilities.capitals;
    } else {
      chars += possibilities.special;
    }
  });

  let result = "";

  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
}
