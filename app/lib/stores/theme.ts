import { atom } from 'nanostores';
import { openDatabase, saveTheme, getTheme } from '~/lib/persistence/db';

export type Theme = 'dark' | 'light';

export const kTheme = 'bolt_theme';

export function themeIsDark() {
  return themeStore.get() === 'dark';
}

export const DEFAULT_THEME = 'light';

export const themeStore = atom<Theme>(await initStore());

async function getThemeFromDB(): Promise<Theme> {
  const db = await openDatabase();
  if (db) {
    const themeResult = await getTheme(db);
    return (themeResult?.value as Theme) || DEFAULT_THEME;
  }
  return DEFAULT_THEME;
}

async function initStore() {
  if (!import.meta.env.SSR) {
    const themeAttribute = document.querySelector('html')?.getAttribute('data-theme');
    const dbTheme = await getThemeFromDB();

    return dbTheme ?? (themeAttribute as Theme) ?? DEFAULT_THEME;
  }

  return DEFAULT_THEME;
}

export async function toggleTheme() {
  const currentTheme = themeStore.get();
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  themeStore.set(newTheme);

  document.querySelector('html')?.setAttribute('data-theme', newTheme);

  const db = await openDatabase();
  if (db) {
    await saveTheme(db, newTheme);
  }
}
