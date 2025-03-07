export const formatDate = (utcDateTime: string): string => {
  const utcTime = new Date(utcDateTime);

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return utcTime.toLocaleDateString("en-US", { timeZone });
};
