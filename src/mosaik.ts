import 'reflect-metadata';
import { ThemeService } from '@pixel-brewery/mosaik-elements-foundation';
import { LucideAliases } from '@pixel-brewery/mosaik-elements-foundation/icons/lucide';
import { registerIconSet, setDefaultIconSet } from '@pixel-brewery/mosaik-icons';
import { lucidePlus, lucideSparkles } from '@pixel-brewery/mosaik-icons/lucide';
import { JoyTheme } from '@pixel-brewery/mosaik-themes';

/** Initializes the public Mosaik runtime before the application mounts. */
export function initializeMosaik(): void {
  registerIconSet('lucide', { ...LucideAliases, plus: lucidePlus, sparkles: lucideSparkles });
  setDefaultIconSet('lucide');
  ThemeService.configure({
    defaultTheme: JoyTheme.JOY_THEME,
    defaultThemeMode: 'light',
    autoInitialize: true,
  });
  ThemeService.instance.initialize();
}
