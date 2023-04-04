import { Button, Box, Divider, Stack } from '@mui/material';
import { type Meta, type Story } from '@storybook/react/types-7-0';
import * as React from 'react';
import { useBreakPoint } from '../packages/uikit/src';

export default {
  title: 'Atoms/Button',
  component: Button,
} satisfies Meta;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Buttons: Story = (_args: unknown) => {
  // component to see all the buttons from MAterial ui
  return (
    <Box sx={{ p: 2 }}>
      <Divider>Primary color</Divider>
      <Stack direction={'column'} spacing={2}>
        <Button variant="contained" color="primary">
          Contained
        </Button>
        <Button variant="outlined" color="primary">
          Outlined
        </Button>
        <Button variant="text" color="primary">
          Text
        </Button>
        <Button variant="text" disabled color="primary">
          Disabled
        </Button>
        <Button variant="text" color="primary">
          Link
        </Button>
        <Button variant="text" size="small" color="primary">
          Small
        </Button>
      </Stack>
      <Divider>Secondary color</Divider>
      <Stack
        direction={'column'}
        spacing={2}
        sx={{ backgroundColor: 'primary.main', p: 2 }}
      >
        <Button variant="contained" color="secondary">
          Contained
        </Button>
        <Button variant="outlined" color="secondary">
          Outlined
        </Button>
        <Button variant="text" color="secondary">
          Text
        </Button>
        <Button variant="text" disabled color="secondary">
          Disabled
        </Button>
        <Button variant="text" color="secondary">
          Link
        </Button>
        <Button variant="text" size="small" color="secondary">
          Small
        </Button>
      </Stack>
    </Box>
  );
};

Buttons.args = {};
