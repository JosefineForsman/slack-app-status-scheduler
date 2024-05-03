import { UserProps } from "../types";
import UserProfileImage from "./UserProfileImage";
import UserName from "./Username";
import React from "react";
import { Box } from "@mui/material";

const UserProfile = ({
  user,
  isCurrentDay,
}: UserProps & { isCurrentDay: boolean }) => {
  return (
    <Box
      key={user.id}
      sx={{
        width: "fit-content",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <UserProfileImage user={user} isCurrentDay={isCurrentDay} />
        <UserName user={user} isCurrentDay={isCurrentDay} />
      </Box>
    </Box>
  );
};

export default UserProfile;
