import testIds from '@testIds';
import { render, screen } from '@tests';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Topbar from './Topbar';

describe('<Topbar />', () => {
  it('renders component', () => {
    render(
      <MemoryRouter>
        <Topbar />
      </MemoryRouter>,
    );

    expect(screen.getByTestId(testIds.Topbar)).toBeInTheDocument();
    expect(screen.getByTestId(testIds.AppTitle)).toBeInTheDocument();
    expect(screen.getByTestId(testIds.UserMenu.button)).toBeInTheDocument();
  });
});
