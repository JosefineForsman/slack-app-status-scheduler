import React from "react";
import { Typography, Box } from "@mui/material";
import CurrentDate from "./CurrentDate";
import { DateTimeDisplayProps } from "../types";

const DateTimeDisplay = ({ currentTime }: DateTimeDisplayProps) => {
  return (
    <Box sx={{ display: "flex", marginLeft:"20px" }}>
      <CurrentDate />
      <Typography
        variant="subtitle1"
        sx={{
          paddingTop: 2,
          color: "#ffffff",
        }}
      >
        <Box component="span" sx={{ margin: "5px" }}>
          —
        </Box>
        {currentTime}
      </Typography>
    </Box>
  );
};

export default DateTimeDisplay;
