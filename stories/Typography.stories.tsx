import { Button, Box, Divider, Typography } from '@mui/material';
import { type Meta, type Story } from '@storybook/react/types-7-0';
import * as React from 'react';

export default {
  title: 'Theme/Typography',
  component: Button,
} satisfies Meta;

const typo = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'subtitle1',
  'subtitle2',
  'body1',
  'body2',
  'button',
  'caption',
  'overline',
  'inherit',
];

export const List: Story = () => {
  return (
    <Box>
      {typo.map((data: string, index: number) => (
        <Box key={index} padding={2}>
          <Divider textAlign="left">{data} </Divider>
          <Typography
            variant={
              data as
                | 'button'
                | 'caption'
                | 'h1'
                | 'h2'
                | 'h3'
                | 'h4'
                | 'h5'
                | 'h6'
                | 'inherit'
                | 'subtitle1'
                | 'subtitle2'
                | 'body1'
                | 'body2'
                | 'overline'
                | undefined
            }
          >
            Ultra is life m8 !
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

List.args = {
  label: 'Button',
  primary: true,
};
