function getFormattedDateTime(): string {
  const now = new Date();

  const userLanguage = navigator.language || "en-US";

  const formattedDateTime = now.toLocaleString(userLanguage, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return formattedDateTime;
}

export default getFormattedDateTime();