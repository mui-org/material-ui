import * as React from 'react';
import { UserLanguageProvider } from '../i18n';
import type { Translations } from '../i18n';
import { AdProvider } from '../Ad';
import type { AdConfig } from '../Ad';
import {
  LANGUAGES,
  LANGUAGES_IGNORE_PAGES,
  LANGUAGES_IN_PROGRESS,
  LANGUAGES_SSR,
} from '../constants';
import type { NotificationMessage } from '../AppLayout/layout/Notifications';

// #target-branch-reference
const NOTIFICATIONS_URL =
  'https://raw.githubusercontent.com/mui/material-ui/master/docs/notifications.json';

async function defaultFetchNotifications(): Promise<NotificationMessage[]> {
  const response = await fetch(NOTIFICATIONS_URL);
  return response.json();
}

export type VersionEntry = { version: string; url: string };

// #target-branch-reference
const VERSIONS_URL = 'https://raw.githubusercontent.com/mui/material-ui/master/docs/versions.json';

async function defaultFetchVersions(): Promise<VersionEntry[]> {
  const response = await fetch(VERSIONS_URL);
  const data = await response.json();
  return data.versions;
}

export interface DocsConfig {
  LANGUAGES: string[];
  LANGUAGES_SSR: string[];
  LANGUAGES_IN_PROGRESS: string[];
  LANGUAGES_IGNORE_PAGES: (pathname: string) => boolean;
  fetchNotifications?: () => Promise<NotificationMessage[]>;
  fetchVersions?: () => Promise<VersionEntry[]>;
  hostUrl?: string;
}

export const DEFAULT_DOCS_CONFIG: DocsConfig = {
  LANGUAGES,
  LANGUAGES_SSR,
  LANGUAGES_IN_PROGRESS,
  LANGUAGES_IGNORE_PAGES,
  fetchNotifications: defaultFetchNotifications,
  fetchVersions: defaultFetchVersions,
};

const DocsConfigContext = React.createContext<DocsConfig>(DEFAULT_DOCS_CONFIG);

export interface DocsProviderProps {
  config?: DocsConfig;
  adConfig?: Partial<AdConfig>;
  defaultUserLanguage: string;
  children?: React.ReactNode;
  translations?: Translations;
}

export function DocsProvider({
  config,
  adConfig,
  defaultUserLanguage,
  translations,
  children,
}: DocsProviderProps) {
  return (
    <DocsConfigContext.Provider value={config || DEFAULT_DOCS_CONFIG}>
      <AdProvider config={adConfig}>
        <UserLanguageProvider defaultUserLanguage={defaultUserLanguage} translations={translations}>
          {children}
        </UserLanguageProvider>
      </AdProvider>
    </DocsConfigContext.Provider>
  );
}

export function useDocsConfig() {
  const config = React.useContext(DocsConfigContext);
  if (!config) {
    return DEFAULT_DOCS_CONFIG;
  }
  return config;
}

export function useFetchNotifications(): () => Promise<NotificationMessage[]> {
  const config = useDocsConfig();
  return config.fetchNotifications ?? defaultFetchNotifications;
}

export function useFetchVersions(): () => Promise<VersionEntry[]> {
  const config = useDocsConfig();
  return config.fetchVersions ?? defaultFetchVersions;
}
