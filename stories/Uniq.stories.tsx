import {
  Button,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  CardActions,
  Box,
} from '@mui/material';
import { type Story, type Meta } from '@storybook/react';

import * as React from 'react';

export default {
  title: 'Atoms/Uniqs',
  component: Card,
} satisfies Meta;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Example: Story = _args => {
  // component to see all the buttons from MAterial ui
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 345,
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: 'inset -2px -2px 4px 0px #00000047',
        }}
        variant="elevation"
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="https://res.cloudinary.com/ultraislife/image/upload/w_96,q_auto:eco/f_auto/factory/1491/square.png"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Ultra OG #97 - Snow
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Comprised of 120 completely unique, one-of-a-kind designs, the
              collection offers to be one of the most exclusive and prestigious
              brands in Web3...
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" variant="contained" color="primary">
            Buy - 1.000 UOS
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

Example.args = {};
