import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useHistory } from 'react-router-dom';
import useStyles from './useStyles';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CssBaseline from '@mui/material/CssBaseline';
import TabPanel from '../../components/TabPanel/TabPanel';
import EditProfile from '../../components/EditProfile/EditProfile';
import ProfilePhoto from '../../components/ProfilePhoto/ProfilePhoto';

export default function ProfileSettings(): JSX.Element {
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  const { initSocket } = useSocket();
  const history = useHistory();

  const [value, setValue] = useState(0);

  useEffect(() => {
    initSocket();
  }, [initSocket]);

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  function a11yProps(index: number) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }
  return (
    <Grid container className={classes.root}>
      <CssBaseline />
      <Grid item xs={10} sm={4}>
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs for setting selection"
        >
          <Tab label="Edit profile" {...a11yProps(0)} />
          <Tab label="Profile Photo" {...a11yProps(1)} />
          <Tab label="Payment" {...a11yProps(2)} />
          <Tab label="Security" {...a11yProps(3)} />
          <Tab label="Settings" {...a11yProps(4)} />
        </Tabs>
      </Grid>
      <Grid item xs={10} sm={8} md={6}>
        <TabPanel value={value} index={0}>
          <EditProfile />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ProfilePhoto />
        </TabPanel>
      </Grid>
    </Grid>
  );
}
