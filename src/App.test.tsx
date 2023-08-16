import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('<App />', () => {
  it('render app component', () => {
    render(<App />);

    expect(screen.getByText(/feature.flag.manager/i)).toBeInTheDocument();
  });
});
