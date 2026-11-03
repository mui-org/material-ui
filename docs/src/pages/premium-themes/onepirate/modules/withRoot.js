import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Roboto_Condensed, Work_Sans } from 'next/font/google';
import theme from './theme';

const robotoCondensed = Roboto_Condensed({
  weight: ['700'],
  subsets: ['latin'],
});
const workSans = Work_Sans({
  weight: ['300', '400'],
  subsets: ['latin'],
});

export default function withRoot(Component) {
  function WithRoot(props) {
    return (
      <div className={`${robotoCondensed.className} ${workSans.className}`}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...props} />
        </ThemeProvider>
      </div>
    );
  }

  return WithRoot;
}
