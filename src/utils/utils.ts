export function getNowTime() {
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formatDate = new Date().toLocaleDateString(
    "es-ES",
    options as Intl.DateTimeFormatOptions
  );
  return formatDate.replace(",", "");
}
