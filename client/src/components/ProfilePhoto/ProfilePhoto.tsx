import Box from '@mui/material/Box';
import useStyles from './useStyles';
const ProfilePhoto = (): JSX.Element => {
  const classes = useStyles();
  return (
    <Box className={classes.root} p={6}>
      Profile Photo
    </Box>
  );
};

export default ProfilePhoto;
