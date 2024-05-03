export function getLocalTime(): string {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      timeZone: "Europe/Stockholm",
      hour: "2-digit",
      minute: "2-digit",
    };
  
    const formatter = new Intl.DateTimeFormat("sv-SE", options);
    return formatter.format(now);
  }
  