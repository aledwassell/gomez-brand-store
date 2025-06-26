export const appTitle = "i am gomez";

export const getPageTitle = (prefix: string | undefined): string =>
  prefix ? `${prefix} | ${appTitle}` : appTitle;
