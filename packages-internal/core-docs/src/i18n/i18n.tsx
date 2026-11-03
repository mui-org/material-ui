import * as React from 'react';
import deepmerge from '@mui/utils/deepmerge';
import defaultTranslations from '../translations';

const TranslationsContext = React.createContext(defaultTranslations);

interface TranslationsProviderProps {
  translations?: Translations;
  children: React.ReactNode;
}

function TranslationsProvider({ translations = {}, children }: TranslationsProviderProps) {
  const currentTranslations = React.useContext(TranslationsContext);
  const mergedTranslations = React.useMemo(
    () => deepmerge(currentTranslations, translations),
    [currentTranslations, translations],
  );
  return (
    <TranslationsContext.Provider value={mergedTranslations}>
      {children}
    </TranslationsContext.Provider>
  );
}

function getPath(obj: Translations, path: string): string | null {
  if (!path || typeof path !== 'string') {
    return null;
  }

  const translation = path
    .split('.')
    .reduce(
      (acc: Translations | string | null, item) =>
        (acc && typeof acc === 'object' && acc[item]) || null,
      obj,
    );

  if (typeof translation === 'object') {
    return null;
  }
  return translation;
}

interface UserLanguageContextValue {
  userLanguage: string;
  setUserLanguage: React.Dispatch<React.SetStateAction<string>>;
}

const UserLanguageContext = React.createContext<UserLanguageContextValue>({
  userLanguage: '',
  setUserLanguage: () => {},
});
if (process.env.NODE_ENV !== 'production') {
  UserLanguageContext.displayName = 'UserLanguage';
}

export interface UserLanguageProviderProps {
  children: React.ReactNode;
  translations?: Translations;
  defaultUserLanguage: string;
}

export function UserLanguageProvider(props: UserLanguageProviderProps) {
  const { children, translations, defaultUserLanguage } = props;

  const [userLanguage, setUserLanguage] = React.useState(defaultUserLanguage);

  const contextValue = React.useMemo(() => {
    return { userLanguage, setUserLanguage };
  }, [userLanguage]);

  return (
    <TranslationsProvider translations={translations}>
      <UserLanguageContext.Provider value={contextValue}>{children}</UserLanguageContext.Provider>
    </TranslationsProvider>
  );
}

export function useUserLanguage() {
  return React.useContext(UserLanguageContext).userLanguage;
}

export function useSetUserLanguage() {
  return React.useContext(UserLanguageContext).setUserLanguage;
}

const warnedOnce: Record<string, boolean> = {};

// TODO, migrate to use warnOnce() helper
const warn = (userLanguage: string, key: string, ignoreWarning: boolean) => {
  const fullKey = `${userLanguage}:${key}`;
  // No warnings in CI env
  if (!ignoreWarning && !warnedOnce[fullKey] && typeof window !== 'undefined') {
    console.warn(`Missing translation for ${fullKey}`);

    warnedOnce[fullKey] = true;
  }
};

export interface TranslateOptions {
  ignoreWarning?: boolean;
}

export type Translate = (key: string, options?: TranslateOptions) => any;

export function useTranslate(): Translate {
  const userLanguage = useUserLanguage();

  const translations = React.useContext(TranslationsContext);

  return React.useMemo(
    () =>
      function translate(key: string, options: TranslateOptions = {}) {
        const { ignoreWarning = false } = options;
        const wordings = translations[userLanguage];

        if (!wordings) {
          console.error(`Missing language: ${userLanguage}.`);
          return '…';
        }

        const translation = getPath(wordings, key);

        if (!translation) {
          if (process.env.NODE_ENV !== 'production') {
            warn(userLanguage, key, ignoreWarning);
          }

          const enTranslation = getPath(translations.en, key);
          return enTranslation ?? null;
        }

        return translation;
      },
    [userLanguage, translations],
  );
}

export type Translations = { [key in string]?: string | Translations };

export interface RequireContext {
  (req: string): string;
  keys: () => string[];
}

export function mapTranslations(req: RequireContext): Translations {
  const result: Translations = {};
  req.keys().forEach((filename) => {
    const match = filename.match(/-([a-z]{2}).json$/);

    if (match) {
      result[match[1]] = req(filename);
    } else {
      result.en = req(filename);
    }
  });
  return result;
}
