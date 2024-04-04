import browser from 'webextension-polyfill';
import localforage from 'localforage';
import { CustomTheme } from '../../../interface/types/CustomThemes';
import { removeTheme } from './removeTheme';


export const deleteTheme = async (themeId: string) => {
  try {
    const theme = await localforage.getItem(themeId) as CustomTheme;
    removeTheme(theme);

    await localforage.removeItem(themeId);
    const themeIds = await localforage.getItem('customThemes') as string[] | null;
    if (themeIds) {
      const updatedThemeIds = themeIds.filter((id) => id !== themeId);
      await localforage.setItem('customThemes', updatedThemeIds);
    }

    await browser.storage.local.set({ selectedTheme: '' });
  } catch (error) {
    console.error('Error deleting theme:', error);
  }
};
