import React from "react";
import { UserProps } from "../types";
import { Typography } from "@mui/material";

const UserName = ({
  user,
  isCurrentDay,
}: UserProps & { isCurrentDay: boolean }) => {
  const nameParts = user.real_name?.split(" ") || user.name?.split(" ") || [];
  const firstName = nameParts[0];
  const lastNameFirstLetter =
    nameParts.length > 1 ? nameParts[1].substring(0, 1) : "";

  const color = isCurrentDay ? "#EAECF0" : "#787878";

  return (
    <Typography
      sx={{
        color,
        fontSize: "10px",
        width: "100%",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        textAlign: "center",
        lineHeight: 2,
      }}
    >
      {firstName} {lastNameFirstLetter}
    </Typography>
  );
};
export default UserName;
