export const getWeekDates = () => {
    const now = new Date();
    const dayOfWeek = (now.getUTCDay() + 6) % 7; // Adjust so Monday is 0, Sunday is 6
    const numDay = now.getUTCDate();
  
    const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), numDay - dayOfWeek));
  
    const dates = [...Array(7)].map((_, i) => {
      const date = new Date(start);
      date.setUTCDate(start.getUTCDate() + i);
      return date;
    });
  
    return dates;
  };