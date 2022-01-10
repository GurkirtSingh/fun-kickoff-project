import Box from '@mui/material/Box';
import useStyles from './useStyles';
const EditProfile = (): JSX.Element => {
  const classes = useStyles();
  return (
    <Box className={classes.root} p={6}>
      Edit Profile
    </Box>
  );
};

export default EditProfile;
