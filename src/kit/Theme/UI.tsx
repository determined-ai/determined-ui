import { StyleProvider } from '@ant-design/cssinjs';
import { theme as AntdTheme, ConfigProvider } from 'antd';
import React, { Dispatch, useContext, useEffect, useMemo, useReducer, useRef } from 'react';

import {
  ThemeContext,
  ThemeDispatchContext,
  themeStateReducer,
  useThemeState,
} from 'kit/internal/theme';
import { RecordKey } from 'kit/internal/types';

import { globalCssVars, Mode, Theme } from './themeUtils';

export { StyleProvider };
export type { Theme };

interface StateUI {
  chromeCollapsed: boolean;
  isPageHidden: boolean;
  mode: Mode;
  showChrome: boolean;
  showSpinner: boolean;
  theme: Theme;
}

const initUI: StateUI = {
  chromeCollapsed: false,
  isPageHidden: false,
  mode: Mode.System,
  showChrome: true,
  showSpinner: false,
  theme: {} as Theme,
};

const StoreActionUI = {
  HideUIChrome: 'HideUIChrome',
  HideUISpinner: 'HideUISpinner',
  SetMode: 'SetMode',
  SetPageVisibility: 'SetPageVisibility',
  SetTheme: 'SetTheme',
  ShowUIChrome: 'ShowUIChrome',
  ShowUISpinner: 'ShowUISpinner',
} as const;

type ActionUI =
  | { type: typeof StoreActionUI.HideUIChrome }
  | { type: typeof StoreActionUI.HideUISpinner }
  | { type: typeof StoreActionUI.SetMode; value: Mode }
  | { type: typeof StoreActionUI.SetPageVisibility; value: boolean }
  | { type: typeof StoreActionUI.SetTheme; value: { theme: Theme } }
  | { type: typeof StoreActionUI.ShowUIChrome }
  | { type: typeof StoreActionUI.ShowUISpinner };

class UIActions {
  constructor(private dispatch: Dispatch<ActionUI>) {}

  public hideChrome = (): void => {
    this.dispatch({ type: StoreActionUI.HideUIChrome });
  };

  public hideSpinner = (): void => {
    this.dispatch({ type: StoreActionUI.HideUISpinner });
  };

  public setMode = (mode: Mode): void => {
    this.dispatch({ type: StoreActionUI.SetMode, value: mode });
  };

  public setPageVisibility = (isPageHidden: boolean): void => {
    this.dispatch({ type: StoreActionUI.SetPageVisibility, value: isPageHidden });
  };

  public setTheme = (theme: Theme): void => {
    this.dispatch({ type: StoreActionUI.SetTheme, value: { theme } });
  };

  public showChrome = (): void => {
    this.dispatch({ type: StoreActionUI.ShowUIChrome });
  };

  public showSpinner = (): void => {
    this.dispatch({ type: StoreActionUI.ShowUISpinner });
  };
}

const camelCaseToKebab = (text: string): string => {
  return text
    .trim()
    .split('')
    .map((char, index) => {
      return char === char.toUpperCase() ? `${index !== 0 ? '-' : ''}${char.toLowerCase()}` : char;
    })
    .join('');
};

const reducerUI = (state: StateUI, action: ActionUI): Partial<StateUI> | void => {
  switch (action.type) {
    case StoreActionUI.HideUIChrome:
      if (!state.showChrome) return;
      return { showChrome: false };
    case StoreActionUI.HideUISpinner:
      if (!state.showSpinner) return;
      return { showSpinner: false };
    case StoreActionUI.SetMode:
      return { mode: action.value };
    case StoreActionUI.SetPageVisibility:
      return { isPageHidden: action.value };
    case StoreActionUI.SetTheme:
      return {
        theme: action.value.theme,
      };
    case StoreActionUI.ShowUIChrome:
      if (state.showChrome) return;
      return { showChrome: true };
    case StoreActionUI.ShowUISpinner:
      if (state.showSpinner) return;
      return { showSpinner: true };
    default:
      return;
  }
};
const StateContext = React.createContext<StateUI | undefined>(undefined);
const DispatchContext = React.createContext<Dispatch<ActionUI> | undefined>(undefined);

const reducer = (state: StateUI, action: ActionUI): StateUI => {
  const newState = reducerUI(state, action);
  return { ...state, ...newState }; // TODO: check for deep equality here instead of on the full state
};

const useUI = (): { actions: UIActions; ui: StateUI } => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error('useStore(UI) must be used within a ThemeProvider');
  }
  const dispatchContext = useContext(DispatchContext);
  if (dispatchContext === undefined) {
    throw new Error('useStoreDispatch must be used within a ThemeProvider');
  }
  const uiActions = useMemo(() => new UIActions(dispatchContext), [dispatchContext]);
  return { actions: uiActions, ui: context };
};

export const ThemeProvider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initUI);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export const UIProvider: React.FC<{
  children?: React.ReactNode;
  darkMode?: boolean;
  theme: Theme;
}> = ({ children, theme, darkMode = false }) => {
  const [state, dispatch] = useReducer(themeStateReducer, { darkMode });
  return (
    <ThemeContext.Provider value={state}>
      <ThemeDispatchContext.Provider value={dispatch}>
        <UI darkMode={darkMode} theme={theme}>
          {children}
        </UI>
      </ThemeDispatchContext.Provider>
    </ThemeContext.Provider>
  );
};

export const UI: React.FC<{
  children?: React.ReactNode;
  darkMode?: boolean;
  theme: Theme;
}> = ({ children, theme, darkMode = false }) => {
  const { actions } = useThemeState();

  useEffect(() => {
    actions.setDarkMode(darkMode);
  }, [darkMode, actions]);

  const ref = useRef<HTMLDivElement>(null);

  // Set global CSS variables shared across themes.
  Object.keys(globalCssVars).forEach((key) => {
    const value = (globalCssVars as Record<RecordKey, string>)[key];
    document.documentElement.style.setProperty(`--${camelCaseToKebab(key)}`, value);
  });

  // Set each theme property as top level CSS variable.
  Object.keys(theme).forEach((key) => {
    const value = (theme as Record<RecordKey, string>)[key];
    ref.current?.style.setProperty(`--theme-${camelCaseToKebab(key)}`, value);
  });

  /**
   * A few specific HTML elements and free form text entries
   * within the application are styled based on the color-scheme
   * css property set specifically on the documentElement.
   *
   * Examples include:
   *  - the "Section" titles in the Drawer component which are
   *    <h5> elements.
   * - The "Settings" section title within the Drawer which is
   *   free form text.
   * - The Paragraph component within the Drawer.
   * - The "ThemeToggle" mode text on the DesignKit page.
   *
   *  the following line is needed to ensure styling in these
   *  specific cases is still applied correctly.
   */
  document.documentElement.style.setProperty('color-scheme', darkMode ? 'dark' : 'light');

  const lightThemeConfig = {
    components: {
      Tooltip: {
        colorBgDefault: 'var(--theme-float)',
        colorTextLightSolid: 'var(--theme-float-on)',
      },
    },
    token: {
      colorPrimary: '#1890ff',
    },
  };

  const darkThemeConfig = {
    components: {
      Checkbox: {
        colorBgContainer: 'transparent',
      },
      DatePicker: {
        colorBgContainer: 'transparent',
      },
      Input: {
        colorBgContainer: 'transparent',
      },
      InputNumber: {
        colorBgContainer: 'transparent',
      },
      Modal: {
        colorBgElevated: 'var(--theme-stage)',
      },
      Pagination: {
        colorBgContainer: 'transparent',
      },
      Radio: {
        colorBgContainer: 'transparent',
      },
      Select: {
        colorBgContainer: 'transparent',
      },
      Tree: {
        colorBgContainer: 'transparent',
      },
    },
    token: {
      colorLink: '#57a3fa',
      colorLinkHover: '#8dc0fb',
      colorPrimary: '#1890ff',
    },
  };

  const baseThemeConfig = {
    components: {
      Button: {
        colorBgContainer: 'transparent',
      },
      Progress: {
        marginXS: 0,
      },
    },
    token: {
      borderRadius: 2,
      fontFamily: 'var(--theme-font-family)',
    },
  };

  const algorithm = darkMode ? AntdTheme.darkAlgorithm : AntdTheme.defaultAlgorithm;
  const { token: baseToken, components: baseComponents } = baseThemeConfig;
  const { token, components } = darkMode ? darkThemeConfig : lightThemeConfig;

  const configTheme = {
    algorithm,
    components: {
      ...baseComponents,
      ...components,
    },
    token: {
      ...baseToken,
      ...token,
    },
  };

  return (
    <div className="ui-provider" ref={ref}>
      <ConfigProvider theme={configTheme}>{children}</ConfigProvider>
    </div>
  );
};

export default useUI;
