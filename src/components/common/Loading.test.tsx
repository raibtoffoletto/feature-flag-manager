import testIds from '@testIds';
import { render, screen } from '@tests';
import { describe, expect, it } from 'vitest';
import Loading from './Loading';

describe('<Loading />', () => {
  it('renders component', () => {
    render(<Loading />);

    expect(screen.getByTestId(testIds.Loading)).toBeInTheDocument();
  });
});
