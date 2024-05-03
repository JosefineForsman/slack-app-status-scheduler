import { getAllChannelMembers } from './api/getAllMembersFromChannel';
import { useState, useEffect } from 'react';
import { User, AllUsersSchedule, UserStatus } from '../app/types';
import { getLocalTime } from '../utils/getLocalTime';
import { getUsersByStatus } from '../utils/filterStatus';
import { Box, Grid, Container, Typography } from '@mui/material';
import { CssBaseline } from '@mui/material';
import DaySection from '../app/components/DaySection';
import DateTimeDisplay from '@/app/components/DisplayTime';
import { getCurrentWeekNumber } from '@/utils/getWeekNumber';
import { getWeekDates } from '@/utils/getWeekDays';

export async function getStaticProps() {
  const [getUserProfileInfo] = await Promise.all([getAllChannelMembers()]);

  return {
    props: {
      allMembers: getUserProfileInfo,
    },
    revalidate: 10 * 60,
  };
}

const LandingPage = ({ allMembers }: { allMembers: User[] }) => {
  const [currentTime, setCurrentTime] = useState<string | null>(null);
  const currentWeekNumber = getCurrentWeekNumber();
  const weekDates = getWeekDates()
    
  let currentDay = new Date().toLocaleString("en-US", { weekday: "long" });
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  useEffect(() => {
    const timeIntervalId = setInterval(() => {
      setCurrentTime(getLocalTime());
    }, 1000);

    const reloadTimeoutId = setTimeout(() => {
      window.location.reload();
    }, 10 * 60 * 1000);

    return () => {
      clearInterval(timeIntervalId);
      clearTimeout(reloadTimeoutId);
    };
  }, []);
  
  const renderDay = (day: keyof AllUsersSchedule, index : number) => {
    const isToday = day === currentDay;

    let inOfficeUsers: any = [];
    let workingFromHomeUsers: any = [];
    let unavailableUsers: any = [];

    if (isToday) {
      inOfficeUsers = getUsersByStatus(allMembers, UserStatus.InOffice);
      workingFromHomeUsers = getUsersByStatus(allMembers, UserStatus.WorkingFromHome);
      unavailableUsers = getUsersByStatus(allMembers, UserStatus.Unavailable);
    }

    return (
      <DaySection
        key={day.toString()}
        day={day.toString()}
        date={weekDates[index]}
        isToday={isToday}
        inOfficeUsers={inOfficeUsers}
        workingFromHomeUsers={workingFromHomeUsers}
        unavailableUsers={unavailableUsers}
      />
    );
  };

  return (
    <Box sx={{ backgroundColor: "#000000" }}>
      <CssBaseline />
      <Container
        sx={{
          minWidth: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            marginTop: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <DateTimeDisplay currentTime={currentTime} />
          </Box>
          <Box>
            <Typography sx={{color: "#ffffff", fontSize: "30px", marginRight:"40px"}}>Week {currentWeekNumber}</Typography>
          </Box>
        </Box>
        <Grid
          container
          sx={{
            gap: "10px",
            display: "flex",
            height: "750px",
            padding: "20px",
          }}
        >
          {daysOfWeek.map((day, index) => renderDay(day, index ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingPage;