export const formatCurrency = (
    value: string,
    currencyCode: string,
    locale = "en-GB"
  ) => {
    try {
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currencyCode,
      }).format(Number(value));
    } catch (error) {
      console.error(
        `Error formatting currency for code '${currencyCode}' and value '${value}':`,
        error
      );
      return `${currencyCode} ${value}`;
    }
  };