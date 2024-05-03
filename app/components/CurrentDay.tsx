import React from "react";
import { useCurrentDay } from "../../utils/getCurrentDay";
import { Typography } from "@mui/material";

const CurrentDay = () => {
  const dayName = useCurrentDay();
  return (
    <Typography
      variant="h1"
      sx={{
        fontSize: "48px",
      }}
    >
      {dayName}
    </Typography>
  );
};

export default CurrentDay;