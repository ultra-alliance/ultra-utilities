import { Box, Divider } from '@mui/material';
import { type Meta, type Story } from '@storybook/react/types-7-0';
import * as React from 'react';
import { ultraColors } from '../packages/uikit/src';
export default {
  title: 'Theme/Colors',
  component: Box,
} satisfies Meta;

export const List: Story = () => {
  return (
    <Box>
      {Object.entries(ultraColors).map(([key, _value]: [string, string]) => (
        <Box key={key} padding={2}>
          <Divider textAlign="left">
            {' '}
            {key} - {_value}
          </Divider>
          <Box
            sx={{
              borderRadius: 1,
              boxShadow: theme => theme.shadows[1],
            }}
            width={'100%'}
            height="30px"
            bgcolor={_value}
          />
        </Box>
      ))}
    </Box>
  );
};

List.args = {
  label: 'Button',
  primary: true,
};
