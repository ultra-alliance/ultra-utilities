import { Button, Box, Typography, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { type Meta, type Story } from '@storybook/react/types-7-0';
import * as React from 'react';
import { ultraTheme } from '../packages/uikit/src';

export default {
  title: 'Theme/MUI Theme ',
  component: Button,
} satisfies Meta;

export const MuiTheme: Story = () => {
  const theme = useTheme();
  // component to see all the buttons from MAterial ui
  return (
    <Box sx={{ p: 2 }}>
      <Typography>
        The following object is our custom Ultra Theme based on Material UI
      </Typography>
      <Divider />
      <pre>{JSON.stringify(theme, null, 2)}</pre>
    </Box>
  );
};

MuiTheme.args = {};
