import testIds from '@testIds';
import { render, screen } from '@tests';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Layout from './Layout';

describe('<Layout />', () => {
  it('renders component', () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>,
    );

    expect(screen.getByTestId(testIds.Topbar)).toBeInTheDocument();
    expect(screen.getByTestId(testIds.LayoutMain)).toBeInTheDocument();
  });
});
