import React from "react";
import { Grid, Typography } from "@mui/material";
import { SectionProps } from "../types";
import { Icon } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { Box } from "@mui/material";

const getIcon = (title: string) => {
  if (title.includes("In Office")) {
    return (
      <CircleIcon sx={{ fontSize: "16px", color: "#63CF51", mr: "10px" }} />
    );
  } else if (title.includes("Working from home")) {
    return <Icon sx={{ marginRight: "10px", fontSize: "19px" }}>🏡</Icon>;
  } else if (title.includes("Unavailable")) {
    return (
      <Icon
        sx={{
          marginRight: "10px",
          fontSize: "14px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        ⛔
      </Icon>
    );
  } else {
    return null;
  }
};

const UserStatusSection = ({
  title,
  children,
  isCurrentDay = false,
  flexGrowValue,
  flexBasisValue,
}: SectionProps) => {
    const backgroundColor = isCurrentDay
    ? "#2E2E2E"
    : "#141414";
    const color = isCurrentDay ? "#FBFBFB" : "#787878";
  const [titleText, count] = title.split("(");
  return (
    <Grid
      item
      sx={{
        borderRadius: "9px",
        backgroundColor,
        marginBottom: "10px",
        display: "flex",
        flexDirection: "column",
        flexGrow: flexGrowValue,
        flexBasis: flexBasisValue,
      }}
    >
      <Box sx={{ margin: "10px" }}>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            color,
            borderRadius: "9px",
            padding: "2 4",
            fontSize: "12px",
            fontWeight: 600,
          }}
        >
          {getIcon(title)}
          {titleText}
          <span
            style={{
              fontWeight: "normal",
              marginLeft: "4px",
            }}
          >
            ({count}
          </span>
        </Typography>
      </Box>

      <Grid
        container
        sx={{
          gap: "10px",
          margin: "12px",
        }}
      >
        {children}
      </Grid>
    </Grid>
  );
};

export default UserStatusSection;
