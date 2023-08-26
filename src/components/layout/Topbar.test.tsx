import { describe, expect, it, render, screen } from '@tests';
import testIds from '@testIds';
import Topbar from './Topbar';

describe('<Topbar />', () => {
  it('renders component', () => {
    render(<Topbar />);

    expect(screen.getByTestId(testIds.Topbar)).toBeInTheDocument();
    expect(screen.getByTestId(testIds.AppTitle)).toBeInTheDocument();
    expect(screen.getByTestId(testIds.UserMenu.button)).toBeInTheDocument();
  });
});
