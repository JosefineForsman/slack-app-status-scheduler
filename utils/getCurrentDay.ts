import { useState, useEffect } from "react";

export const useCurrentDay = () => {
  const [day, setDay] = useState("");

  useEffect(() => {
    const date = new Date();
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    setDay(days[(date.getDay() + 6) % 7]);
  }, []);

  return day;
};
