import React from 'react';

import { hex2hsl, hsl2str } from 'kit/internal/functions';
import md5 from 'kit/internal/md5';
import { themeLightDetermined, useThemeState } from 'kit/internal/theme';
import Tooltip from 'kit/Tooltip';
import { ValueOf } from 'kit/utils/types';

import css from './Avatar.module.scss';
import { UIProvider } from './Theme';

export const Size = {
  ExtraLarge: 'extra-large',
  Large: 'large',
  Medium: 'medium',
} as const;

export type Size = ValueOf<typeof Size>;

export interface Props {
  displayName: string;
  hideTooltip?: boolean;
  /** do not color the bg based on displayName */
  noColor?: boolean;
  size?: Size;
  square?: boolean;
}

export const getInitials = (name = ''): string => {
  // Reduce the name to initials.
  const initials = name
    .split(/\s+/)
    .map((n) => n.charAt(0).toUpperCase())
    .join('');

  // If initials are long, just keep the first and the last.
  return initials.length > 2
    ? `${initials.charAt(0)}${initials.substring(initials.length - 1)}`
    : initials;
};

export const getColor = (name = '', darkMode: boolean): string => {
  const hslColor = name ? hex2hsl(md5(name).substring(0, 6)) : hex2hsl('#808080');
  return hsl2str({
    ...hslColor,
    l: darkMode ? 38 : 60,
  });
};

const Avatar: React.FC<Props> = ({
  displayName,
  hideTooltip,
  noColor,
  size = Size.Medium,
  square,
}) => {
  const { themeState } = useThemeState();
  const isDarkMode = themeState.darkMode;

  const style = {
    backgroundColor: noColor ? 'var(--theme-stage-strong)' : getColor(displayName, isDarkMode),
    borderRadius: square ? '10%' : '100%',
    color: noColor ? 'var(--theme-stage-on-strong)' : 'white',
  };
  const classes = [css.base, css[size]];

  const avatar = (
    <UIProvider theme={themeLightDetermined}>
      <div className={classes.join(' ')} id="avatar" style={style}>
        {getInitials(displayName)}
      </div>
    </UIProvider>
  );

  return hideTooltip ? (
    avatar
  ) : (
    <Tooltip content={displayName} placement="right">
      {avatar}
    </Tooltip>
  );
};

export default Avatar;
