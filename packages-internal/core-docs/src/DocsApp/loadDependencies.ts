import { loadCSS } from 'fg-loadcss';

let dependenciesLoaded = false;

export function loadDependencies(): void {
  if (dependenciesLoaded) {
    return;
  }

  dependenciesLoaded = true;

  loadCSS(
    'https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Two+Tone',
    (document.querySelector('#material-icon-font') as HTMLElement | null) ?? undefined,
  );
}
