const dateFormat = new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric" });
const numberFormat = new Intl.NumberFormat("en");

export function formatNumber(value) {
  return value == null ? "—" : numberFormat.format(value);
}

export function formatContestDate(seconds) {
  return Number.isFinite(seconds) ? dateFormat.format(seconds * 1000) : "—";
}

export function formatDelta(value) {
  if (value > 0) return "+" + formatNumber(value);
  if (value < 0) return "−" + formatNumber(Math.abs(value));
  return "0";
}

export function deltaClass(value) {
  if (value > 0) return "gain";
  if (value < 0) return "loss";
  return "";
}
