import { describe, expect, it, render, screen } from '@tests';
import testIds from '@testIds';
import Layout from './Layout';

describe('<Layout />', () => {
  it('renders component', () => {
    render(<Layout />);

    expect(screen.getByTestId(testIds.Topbar)).toBeInTheDocument();
  });
});
