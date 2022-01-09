import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'black',
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          marginTop: 10,
        },
      },
    },
  },
  typography: {
    fontFamily: '"Roboto", "Arial"',
    fontSize: 12,
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },
  palette: {
    primary: { main: '#f14140' },
  },
  shape: {
    borderRadius: 5,
  },
  spacing: 6,
});
