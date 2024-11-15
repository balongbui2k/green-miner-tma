import { clsx, type ClassValue } from "clsx";
import currency from "currency.js";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (
  num: number,
  digits: number = 0,
  formatType: "separator" | "symbol" = "separator"
) => {
  if (formatType === "separator") {
    return currency(num, {
      separator: ",",
      precision: 0,
      symbol: "",
    }).format();
  }

  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "B" },
    { value: 1e12, symbol: "T" },
  ];

  const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;

  const item = lookup
    .slice()
    .reverse()
    .find((item) => num >= item.value);

  return item
    ? (num / item.value)
        .toFixed(digits)
        .replace(regexp, "")
        .replace(".", ",")
        .concat(item.symbol)
    : "0";
};

export const truncateFromMiddle = (
  fullStr = "",
  strLen = 10,
  middleStr = "..."
) => {
  if (fullStr.length <= strLen) return fullStr;
  const midLen = middleStr.length;
  const charsToShow = strLen - midLen;
  const frontChars = Math.ceil(charsToShow / 2);
  const backChars = Math.floor(charsToShow / 2);
  return (
    fullStr.slice(0, frontChars) +
    middleStr +
    fullStr.slice(fullStr.length - backChars)
  );
};

export const formatTime = (time: number) => {
  console.log("🚀 ~ formatTime ~ time:", time);
  const date = new Date(time);
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const seconds = date.getUTCSeconds().toString().padStart(2, "0");

  if (time < 0) {
    return "00:00:00";
  }

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};
