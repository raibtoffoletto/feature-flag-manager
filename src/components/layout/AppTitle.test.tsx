import { describe, expect, it, matchBrokenText, render, screen } from '@tests';
import testIds from '@testIds';
import AppTitle from './AppTitle';

describe('<AppTitle />', () => {
  it('renders component', () => {
    render(<AppTitle />);

    expect(screen.getByTestId(testIds.AppTitle)).toBeInTheDocument();
    expect(screen.getByTestId('CloudSyncIcon')).toBeInTheDocument();
    expect(screen.getByText(matchBrokenText('feature'))).toBeInTheDocument();
    expect(screen.getByText(matchBrokenText('flag'))).toBeInTheDocument();
    expect(screen.getByText(matchBrokenText('manager'))).toBeInTheDocument();
  });
});
