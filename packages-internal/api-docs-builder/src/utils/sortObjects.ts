export const sortAlphabetical =
  <K extends string>(key: K) =>
  <T extends { [key in K]: string }>(a: T, b: T) =>
    a[key].localeCompare(b[key]);
