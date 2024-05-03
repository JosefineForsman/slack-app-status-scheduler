import React from "react";
import { Grid, Typography } from "@mui/material";
import UserStatusSection from "./UserStatusSection";
import UserProfile from "./UserProfile";
import { DaySectionProps } from "../types";

const DaySection = ({
  day,
  isToday,
  inOfficeUsers,
  workingFromHomeUsers,
  unavailableUsers,
  date
}: DaySectionProps) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={2.33}>
      <Typography
        variant="h6"
        align="left"
        sx={{ fontWeight: 700, fontSize: "24px", color:"white" }}
      >
        {typeof day === "string"
          ? day.charAt(0).toUpperCase() + day.slice(1)
          : day}
      </Typography>
      <Typography variant="h4" sx={{color:"#ffffff", fontSize:"18px", marginBottom:"10px"}}>{date.toLocaleDateString('sv-SE', { day: 'numeric', month: 'numeric' })}</Typography>
      <Grid sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <UserStatusSection
          title={`In Office (${inOfficeUsers.length})`}
          isCurrentDay={isToday}
          flexGrowValue={5.5}
          flexBasisValue="60%"
        >
          {inOfficeUsers.map((user, index) => (
            <UserProfile user={user} key={index} isCurrentDay={isToday} />
          ))}
        </UserStatusSection>
        <UserStatusSection
          title={`Working from home (${workingFromHomeUsers.length})`}
          isCurrentDay={isToday}
          flexGrowValue={4}
          flexBasisValue="35%"
        >
          {workingFromHomeUsers.map((user, index) => (
            <UserProfile user={user} key={index} isCurrentDay={isToday} />
          ))}
        </UserStatusSection>
        <UserStatusSection
          title={`Unavailable (${unavailableUsers.length}) `}
          isCurrentDay={isToday}
          flexGrowValue={0.1}
          flexBasisValue="5%"
        >
          {unavailableUsers.map((user, index) => (
            <UserProfile user={user} key={index} isCurrentDay={isToday} />
          ))}
        </UserStatusSection>
      </Grid>
    </Grid>
  );
};

export default DaySection;