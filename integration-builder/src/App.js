import React from 'react';
import './App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import IntegratorPopupDialogContent from './IntegratorPopupDialogContent';
import './common/global_styles.css';
import './common/antd_styles.css';

function App() {

  const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#556cd6',
            light: '#8b9aff',
            dark: '#0c42a4'
        },
        secondary: {
            main: '#ff9e22',
            light: '#ffcf57',
            dark: '#c66f00'
        },
        error: {
            main: '#FF0000',
        },
        info: {
            main: '#eceff1'
        },
        success: {
            main: '#00C851'
        },
        background: {
            default: '#fff',
        },
        grey: {
            main: '#757575'
        }
    },
    typography: {
    },
  });


  const example_integration = {
    redisID: "YOUR_INTEGRATION_KEY",
    typeFormats: { time: "Total Minutes", capper: "T/F" },
    queryObject: { time: 1245 },
    accessorToColumnTypeMap: { time: "time", capper: "boolean" },
    type: "GET",
    authentication: { authActive: true, authHash: "asdf" }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <IntegratorPopupDialogContent options={example_integration} onClose={() => {}}/>
    </ThemeProvider>
  );
}

export default App;
