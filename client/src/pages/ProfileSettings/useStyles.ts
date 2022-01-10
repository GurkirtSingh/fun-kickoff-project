import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: '5rem',
    minHeight: '100vh',
    backgroundColor: '#E5E5E5',
    '&.Mui-selected': {
      color: 'black',
    },
  },
}));

export default useStyles;
