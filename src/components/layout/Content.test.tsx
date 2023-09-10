import { render, screen } from '@tests';
import { describe, expect, it } from 'vitest';
import Content from './Content';

describe('<Content />', () => {
  it('renders component', () => {
    const id = 'page-content';
    const title = 'Page Title';

    render(<Content title={title} data-testid={id} />);

    expect(screen.getByTestId(id)).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
  });
});
