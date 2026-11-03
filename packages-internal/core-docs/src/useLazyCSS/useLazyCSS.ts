import * as React from 'react';
import { loadCSS } from 'fg-loadcss';

/**
 * Enhanced lazy CSS loader that wraps CSS in a layer using fetch to avoid CORS issues
 * @param {string} href - URL of the CSS file to load
 * @param {string} before - CSS selector to insert before
 * @param {object} options - Additional options
 * @param {string} options.layer - Optional CSS layer name to wrap the CSS in
 * @returns {() => void} cleanup function
 */
export default function useLazyCSS(href: string, before: string, options: { layer?: string } = {}) {
  React.useEffect(() => {
    // If no layer is specified, add style and clean it on unmount
    if (!options.layer) {
      const link = loadCSS(href, document.querySelector(before) as HTMLElement);
      return () => {
        link.parentElement?.removeChild(link);
      };
    }

    // With layer option, we need to fetch the CSS content and wrap it
    let styleElement: HTMLStyleElement | null = null;
    const abortController = new AbortController();

    // Fetch the CSS content directly to avoid CORS issues with cssRules
    fetch(href, { signal: abortController.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch CSS: ${response.statusText}`);
        }
        return response.text();
      })
      .then((cssText) => {
        // Create a style element with the CSS wrapped in the specified layer
        styleElement = document.createElement('style');
        styleElement.setAttribute('data-href', href);
        styleElement.textContent = `@layer ${options.layer} {\n${cssText}\n}`;

        // Insert at the specified position
        const beforeElement = document.querySelector(before);
        if (beforeElement?.parentNode) {
          beforeElement.parentNode.insertBefore(styleElement, beforeElement);
        } else {
          document.head.appendChild(styleElement);
        }
      })
      .catch((error) => {
        // Ignore abort errors, log others
        if (error !== 'useEffect' && error.name !== 'AbortError') {
          if (process.env.NODE_ENV !== 'production') {
            console.error('Error loading CSS with layer:', error);
          }

          // Fall back to regular link element if fetch fails
          styleElement = loadCSS(href, document.querySelector(before) as HTMLElement);
        }
      });

    // Cleanup function
    return () => {
      // Cancel any pending fetch
      abortController.abort('useEffect');

      // Remove the style element if it was created
      if (styleElement && styleElement.parentElement) {
        styleElement.parentElement.removeChild(styleElement);
      }
    };
  }, [href, before, options.layer]);
}
