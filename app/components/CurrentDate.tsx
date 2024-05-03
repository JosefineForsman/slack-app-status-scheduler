import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

function CurrentDate() {
  const [currentDayMonth, setCurrentDayMonth] = useState<string>("");

  useEffect(() => {
    const getCurrentDate = () => {
      const date = new Date();
      return date.toLocaleString('en-US', { month: 'long', day: 'numeric' });
    };

    setCurrentDayMonth(getCurrentDate());

    const timerID = setInterval(() => {
      setCurrentDayMonth(getCurrentDate());
    }, 1000 * 60 * 60 * 24);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  return (
    <Typography
      variant="subtitle1"
      sx={{
        paddingTop: 2,
        color: "#ffffff",
      }}
    >
      {currentDayMonth}
    </Typography>
  );
}

export default CurrentDate;