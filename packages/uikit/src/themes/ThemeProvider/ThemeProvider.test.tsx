import { render } from '@testing-library/react';
import React from 'react';
import ThemeProvider, { type ThemeProviderProps } from './index';
import '@testing-library/jest-dom';

describe('ThemeProvider', () => {
  const testTheme = {
    palette: {
      primary: {
        main: '#000',
      },
      secondary: {
        main: '#fff',
      },
    },
  };

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
      theme: testTheme,
      children: undefined,
    });
    expect(getByText('Hello')).toBeInTheDocument();
  });
});
