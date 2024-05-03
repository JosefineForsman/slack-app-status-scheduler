import React from "react";
import { UserProps } from "../types";
import { Avatar } from "@mui/material";

const UserProfileImage = ({ user, isCurrentDay }: UserProps) => {
  const profileImage = user.profile?.image_512 || user.profilePicture || "";
  const filter = isCurrentDay ? "none" : "brightness(75%)";

  return (
    <Avatar
      src={profileImage}
      alt="profile-picture-icon"
      sx={{ width: "24px", height: "24px", filter }}
    />
  );
};
export default UserProfileImage;
