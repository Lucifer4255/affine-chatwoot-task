import { AppThemeService } from '@affine/core/modules/theme';
import { useService } from '@toeverything/infra';
import { ThemeProvider as NextThemeProvider, useTheme } from 'next-themes';
import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';
// import ./index.css;
import { useTenant } from '../context/tenant-context';

const themes = ['dark', 'light','tangerine', 'mint','dark-mint', 'dark-tangerine'];

function ThemeObserver() {
  const { resolvedTheme } = useTheme();
  const service = useService(AppThemeService);
  const tenant = useTenant();

  useEffect(() => {
    service.appTheme.theme$.next(resolvedTheme);
  }, [resolvedTheme, service.appTheme.theme$]);

  return null;
}

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  return (
    <NextThemeProvider themes={themes} enableSystem={true}>
      {children}
      <ThemeObserver />
    </NextThemeProvider>
  );
};
