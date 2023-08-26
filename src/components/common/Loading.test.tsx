import { describe, expect, it, render, screen } from '@tests';
import testIds from '@testIds';
import Loading from './Loading';

describe('<Loading />', () => {
  it('renders component', () => {
    render(<Loading />);

    expect(screen.getByTestId(testIds.Loading)).toBeInTheDocument();
  });
});
