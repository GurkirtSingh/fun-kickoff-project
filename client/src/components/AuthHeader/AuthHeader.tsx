import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import useStyles from './useStyles';

interface Props {
  linkTo: string;
  asideText: string;
  btnText: string;
}

const AuthFooter = ({ linkTo, asideText, btnText }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Box p={1} display="flex" justifyContent="center" alignSelf="center" className={classes.authHeader}>
      <Typography className={classes.accAside} fontWeight="600" marginRight={1}>
        {asideText}
      </Typography>
      <Typography component={Link} to={linkTo} color="primary" fontWeight="600">
        {btnText}
      </Typography>
    </Box>
  );
};

export default AuthFooter;
