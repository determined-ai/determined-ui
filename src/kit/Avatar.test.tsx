import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { ThemeProvider, UIProvider } from 'kit/Theme';

import Avatar, { Props } from './Avatar';

vi.mock('kit/Tooltip');
const user = userEvent.setup();

const setup = ({ displayName, hideTooltip = false, ...props }: Props) => {
  render(
    <ThemeProvider>
      <UIProvider>
        <Avatar displayName={displayName} hideTooltip={hideTooltip} {...props} />
      </UIProvider>
    </ThemeProvider>,
  );
};

describe('Avatar', () => {
  const displayName = 'Bugs Bunny';
  const initials = 'BB';

  it('should display initials of name', async () => {
    setup({ displayName });

    expect(await screen.findByText(initials)).toBeInTheDocument();
  });

  it('should display name on hover', async () => {
    setup({ displayName });

    await user.hover(await screen.findByText(initials));

    expect(await screen.findByText(displayName)).toBeInTheDocument();
  });

  it('shouldnt display name on hover if hideTooltip is true', async () => {
    setup({ displayName, hideTooltip: true });

    await user.hover(await screen.findByText(initials));

    expect(screen.queryByText(displayName)).not.toBeInTheDocument();
  });
});
