import { type UltraTheme, createTheme } from '@mui/material';
import { render } from '@testing-library/react';
import React from 'react';
import ThemeProvider, { type ThemeProviderProps } from './index';
import '@testing-library/jest-dom';

describe('ThemeProvider', () => {
  const testTheme = createTheme({
    palette: {
      primary: {
        main: '#000',
        light: '#000',
        dark: '#000',
        contrastText: '#fff',
      },
      secondary: {
        main: '#fff',
      },
      background: {
        default: '#fff',
      },
    },
  });

  const TestComponent = () => <p>Hello</p>;

  const renderThemeProvider = (props: ThemeProviderProps) => {
    return render(
      <ThemeProvider {...props}>
        <TestComponent />
      </ThemeProvider>,
    );
  };

  it('renders with a theme', () => {
    const { getByText } = renderThemeProvider({
      theme: testTheme as UltraTheme,
      children: undefined,
    });
    expect(getByText('Hello')).toBeInTheDocument();
  });
});
