const INDIAN_MOBILE_PATTERN = /^[6-9]\d{9}$/;

export function normalizeMobile(value: string) {
  return value.replace(/\D/g, "").slice(0, 10);
}

export function isValidIndianMobile(value: string) {
  return INDIAN_MOBILE_PATTERN.test(value.trim());
}
