const buildFormatNumber = (locale: string) => {
  let formatter: Intl.NumberFormat | undefined;
  if (typeof Intl !== 'undefined' && Intl.NumberFormat) {
    try {
      formatter = new Intl.NumberFormat(locale);
    } catch {
      // fallback to String()
    }
  }
  return (value: number) => {
    if (!Number.isFinite(value)) {
      return String(value);
    }
    return formatter ? formatter.format(value) : String(value);
  };
};

export default buildFormatNumber;
