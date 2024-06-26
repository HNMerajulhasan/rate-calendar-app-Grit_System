// src/app/layout.tsx

"use client";
import { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './globals.css';

const theme = createTheme();

const RootLayout = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <head>
        <title>Rate Calendar</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
