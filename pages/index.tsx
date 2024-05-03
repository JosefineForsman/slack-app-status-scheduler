import { getAllChannelMembers } from './api/getAllMembersFromChannel';
import { User, AllUsersSchedule, UserStatus } from '../app/types';
import { getUsersByStatus } from '../utils/filterStatus';
import { Box, Grid, Container } from '@mui/material';
import { CssBaseline } from '@mui/material';
import DaySection from '../app/components/DaySection';

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
    
  let currentDay = new Date().toLocaleString("en-US", { weekday: "long" });
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  
  const renderDay = (day: keyof AllUsersSchedule) => {
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
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
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
          {daysOfWeek.map((day) => renderDay(day))}
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingPage;