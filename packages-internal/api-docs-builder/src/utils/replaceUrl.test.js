import { describe, it, expect } from 'vitest';
import replaceUrl, {
  replaceMaterialLinks,
  replaceAPILinks,
  replaceComponentLinks,
} from './replaceUrl';

describe('replaceUrl', () => {
  it('replace material related pathname', () => {
    expect(replaceMaterialLinks(`/guides/minimizing-bundle-size/`)).to.equal(
      `/material-ui/guides/minimizing-bundle-size/`,
    );
    expect(replaceMaterialLinks(`/customization/theme-components/#default-props`)).to.equal(
      `/material-ui/customization/theme-components/#default-props`,
    );
    expect(replaceMaterialLinks(`/getting-started/usage/`)).to.equal(
      `/material-ui/getting-started/usage/`,
    );
    expect(replaceMaterialLinks(`/discover-more/related-projects/`)).to.equal(
      `/material-ui/discover-more/related-projects/`,
    );
    expect(replaceMaterialLinks(`/experimental-api/css-theme-variables/overview/`)).to.equal(
      `/material-ui/experimental-api/css-theme-variables/overview/`,
    );
    expect(replaceMaterialLinks(`/migration/upgrade-to-grid-v2/`)).to.equal(
      `/material-ui/migration/upgrade-to-grid-v2/`,
    );
  });

  it('should not change if links have been updated', () => {
    expect(replaceMaterialLinks(`/material-ui/guides/minimizing-bundle-size/`)).to.equal(
      `/material-ui/guides/minimizing-bundle-size/`,
    );
    expect(
      replaceMaterialLinks(`/material-ui/customization/theme-components/#default-props`),
    ).to.equal(`/material-ui/customization/theme-components/#default-props`);
    expect(replaceMaterialLinks(`/material-ui/getting-started/usage/`)).to.equal(
      `/material-ui/getting-started/usage/`,
    );
    expect(replaceMaterialLinks(`/material-ui/discover-more/related-projects/`)).to.equal(
      `/material-ui/discover-more/related-projects/`,
    );
  });

  it('replace correct component links', () => {
    expect(replaceComponentLinks(`/components/button-group/`)).to.equal(
      `/material-ui/react-button-group/`,
    );
    expect(replaceComponentLinks(`/components/button-group/#main-content`)).to.equal(
      `/material-ui/react-button-group/#main-content`,
    );
    expect(replaceComponentLinks(`/components/buttons/`)).to.equal(`/material-ui/react-button/`);
    expect(replaceComponentLinks(`/components/buttons/#main-content`)).to.equal(
      `/material-ui/react-button/#main-content`,
    );

    expect(replaceComponentLinks(`/components/checkboxes/`)).to.equal(
      `/material-ui/react-checkbox/`,
    );
    expect(replaceComponentLinks(`/components/checkboxes/#main-content`)).to.equal(
      `/material-ui/react-checkbox/#main-content`,
    );

    expect(replaceComponentLinks(`/components/radio-buttons/`)).to.equal(
      `/material-ui/react-radio-button/`,
    );
    expect(replaceComponentLinks(`/components/radio-buttons/#main-content`)).to.equal(
      `/material-ui/react-radio-button/#main-content`,
    );

    expect(replaceComponentLinks(`/components/selects/`)).to.equal(`/material-ui/react-select/`);
    expect(replaceComponentLinks(`/components/selects/#main-content`)).to.equal(
      `/material-ui/react-select/#main-content`,
    );

    expect(replaceComponentLinks(`/components/switches/`)).to.equal(`/material-ui/react-switch/`);
    expect(replaceComponentLinks(`/components/switches/#main-content`)).to.equal(
      `/material-ui/react-switch/#main-content`,
    );

    expect(replaceComponentLinks(`/components/text-fields/`)).to.equal(
      `/material-ui/react-text-field/`,
    );
    expect(replaceComponentLinks(`/components/text-fields/#main-content`)).to.equal(
      `/material-ui/react-text-field/#main-content`,
    );

    expect(replaceComponentLinks(`/components/avatars/`)).to.equal(`/material-ui/react-avatar/`);
    expect(replaceComponentLinks(`/components/avatars/#main-content`)).to.equal(
      `/material-ui/react-avatar/#main-content`,
    );

    expect(replaceComponentLinks(`/components/badges/`)).to.equal(`/material-ui/react-badge/`);
    expect(replaceComponentLinks(`/components/badges/#main-content`)).to.equal(
      `/material-ui/react-badge/#main-content`,
    );

    expect(replaceComponentLinks(`/components/chips/`)).to.equal(`/material-ui/react-chip/`);
    expect(replaceComponentLinks(`/components/chips/#main-content`)).to.equal(
      `/material-ui/react-chip/#main-content`,
    );

    expect(replaceComponentLinks(`/components/dividers/`)).to.equal(`/material-ui/react-divider/`);
    expect(replaceComponentLinks(`/components/dividers/#main-content`)).to.equal(
      `/material-ui/react-divider/#main-content`,
    );

    expect(replaceComponentLinks(`/components/icons/`)).to.equal(`/material-ui/icons/`);

    expect(replaceComponentLinks(`/components/material-icons/`)).to.equal(
      `/material-ui/material-icons/`,
    );

    expect(replaceComponentLinks(`/components/lists/`)).to.equal(`/material-ui/react-list/`);
    expect(replaceComponentLinks(`/components/lists/#main-content`)).to.equal(
      `/material-ui/react-list/#main-content`,
    );

    expect(replaceComponentLinks(`/components/image-list/`)).to.equal(
      `/material-ui/react-image-list/`,
    );
    expect(replaceComponentLinks(`/components/image-list/#main-content`)).to.equal(
      `/material-ui/react-image-list/#main-content`,
    );

    expect(replaceComponentLinks(`/components/no-ssr/`)).to.equal(`/material-ui/react-no-ssr/`);
    expect(replaceComponentLinks(`/components/no-ssr/#main-content`)).to.equal(
      `/material-ui/react-no-ssr/#main-content`,
    );

    expect(replaceComponentLinks(`/components/trap-focus/`)).to.equal(
      `/material-ui/react-trap-focus/`,
    );
    expect(replaceComponentLinks(`/components/trap-focus/#main-content`)).to.equal(
      `/material-ui/react-trap-focus/#main-content`,
    );

    expect(replaceComponentLinks(`/components/progress/`)).to.equal(`/material-ui/react-progress/`);
    expect(replaceComponentLinks(`/components/progress/#main-content`)).to.equal(
      `/material-ui/react-progress/#main-content`,
    );

    expect(replaceComponentLinks(`/components/tables/`)).to.equal(`/material-ui/react-table/`);
    expect(replaceComponentLinks(`/components/tables/#main-content`)).to.equal(
      `/material-ui/react-table/#main-content`,
    );

    expect(replaceComponentLinks(`/components/tooltips/`)).to.equal(`/material-ui/react-tooltip/`);
    expect(replaceComponentLinks(`/components/tooltips/#main-content`)).to.equal(
      `/material-ui/react-tooltip/#main-content`,
    );

    expect(replaceComponentLinks(`/components/dialogs/`)).to.equal(`/material-ui/react-dialog/`);
    expect(replaceComponentLinks(`/components/dialogs/#main-content`)).to.equal(
      `/material-ui/react-dialog/#main-content`,
    );

    expect(replaceComponentLinks(`/components/snackbars/`)).to.equal(
      `/material-ui/react-snackbar/`,
    );
    expect(replaceComponentLinks(`/components/snackbars/#main-content`)).to.equal(
      `/material-ui/react-snackbar/#main-content`,
    );

    expect(replaceComponentLinks(`/components/cards/`)).to.equal(`/material-ui/react-card/`);
    expect(replaceComponentLinks(`/components/cards/#main-content`)).to.equal(
      `/material-ui/react-card/#main-content`,
    );

    expect(replaceComponentLinks(`/components/breadcrumbs/`)).to.equal(
      `/material-ui/react-breadcrumbs/`,
    );
    expect(replaceComponentLinks(`/components/breadcrumbs/#main-content`)).to.equal(
      `/material-ui/react-breadcrumbs/#main-content`,
    );

    expect(replaceComponentLinks(`/components/drawers/`)).to.equal(`/material-ui/react-drawer/`);
    expect(replaceComponentLinks(`/components/drawers/#main-content`)).to.equal(
      `/material-ui/react-drawer/#main-content`,
    );

    expect(replaceComponentLinks(`/components/links/`)).to.equal(`/material-ui/react-link/`);
    expect(replaceComponentLinks(`/components/links/#main-content`)).to.equal(
      `/material-ui/react-link/#main-content`,
    );

    expect(replaceComponentLinks(`/components/menus/`)).to.equal(`/material-ui/react-menu/`);
    expect(replaceComponentLinks(`/components/menus/#main-content`)).to.equal(
      `/material-ui/react-menu/#main-content`,
    );

    expect(replaceComponentLinks(`/components/steppers/`)).to.equal(`/material-ui/react-stepper/`);
    expect(replaceComponentLinks(`/components/steppers/#main-content`)).to.equal(
      `/material-ui/react-stepper/#main-content`,
    );

    expect(replaceComponentLinks(`/components/tabs/`)).to.equal(`/material-ui/react-tabs/`);
    expect(replaceComponentLinks(`/components/tabs/#main-content`)).to.equal(
      `/material-ui/react-tabs/#main-content`,
    );

    expect(replaceComponentLinks(`/components/transitions/`)).to.equal(`/material-ui/transitions/`);
    expect(replaceComponentLinks(`/components/pickers/`)).to.equal(`/material-ui/pickers/`);
    expect(replaceComponentLinks(`/components/about-the-lab/`)).to.equal(
      `/material-ui/about-the-lab/`,
    );

    expect(replaceComponentLinks(`/components/data-grid/features/`)).to.equal(
      `/x/react-data-grid/features/`,
    );
  });

  it('replace correct API links', () => {
    expect(replaceAPILinks(`/api/button/`)).to.equal(`/material-ui/api/button/`);
    expect(replaceAPILinks(`/api/no-ssr/`)).to.equal(`/base-ui/api/no-ssr/`);
    expect(replaceAPILinks(`/api/portal/`)).to.equal(`/base-ui/api/portal/`);
    expect(replaceAPILinks(`/api/textarea-autosize/`)).to.equal(`/base-ui/api/textarea-autosize/`);
    expect(replaceAPILinks(`/api/button-unstyled/`)).to.equal(`/base-ui/api/button-unstyled/`);
    expect(replaceAPILinks(`/api/loading-button/`)).to.equal(`/material-ui/api/loading-button/`);
    expect(replaceAPILinks(`/api/tab-list/`)).to.equal(`/material-ui/api/tab-list/`);
    expect(replaceAPILinks(`/api/tab-panel/`)).to.equal(`/material-ui/api/tab-panel/`);
    expect(replaceAPILinks(`/api/tab-panel-unstyled/`)).to.equal(
      `/base-ui/api/tab-panel-unstyled/`,
    );
    expect(replaceAPILinks(`/api/tabs-list-unstyled/`)).to.equal(
      `/base-ui/api/tabs-list-unstyled/`,
    );
    expect(replaceAPILinks(`/api/tabs-unstyled/`)).to.equal(`/base-ui/api/tabs-unstyled/`);
    expect(replaceAPILinks(`/api/unstable-trap-focus/`)).to.equal(
      `/base-ui/api/unstable-trap-focus/`,
    );
    expect(replaceAPILinks(`/api/click-away-listener/`)).to.equal(
      `/base-ui/api/click-away-listener/`,
    );
    expect(replaceAPILinks(`/api/data-grid/data-grid/`)).to.equal(`/x/api/data-grid/data-grid/`);
    expect(replaceAPILinks(`/system/basic/`)).to.equal(`/system/basic/`);
  });

  it('should do nothing if the components have updated', () => {
    expect(replaceComponentLinks(`/material-ui/react-button-group/`)).to.equal(
      `/material-ui/react-button-group/`,
    );
    expect(replaceComponentLinks(`/x/react-data-grid/features/`)).to.equal(
      `/x/react-data-grid/features/`,
    );
  });

  it('should do nothing if the APIs have updated', () => {
    expect(replaceAPILinks(`/material-ui/api/button/`)).to.equal(`/material-ui/api/button/`);
    expect(replaceAPILinks(`/base-ui/api/button-unstyled/`)).to.equal(
      `/base-ui/api/button-unstyled/`,
    );
    expect(replaceAPILinks(`/material-ui/api/loading-button/`)).to.equal(
      `/material-ui/api/loading-button/`,
    );
    expect(replaceAPILinks(`/x/api/data-grid/`)).to.equal(`/x/api/data-grid/`);
  });

  it('only replace links for new routes (/material-ui/* & /x/*)', () => {
    expect(replaceUrl(`/guides/minimizing-bundle-size/`, '/material-ui/react-buttons')).to.equal(
      `/material-ui/guides/minimizing-bundle-size/`,
    );
    expect(replaceUrl(`/integrations/tailwindcss/`, '/material-ui')).to.equal(
      `/material-ui/integrations/tailwindcss/`,
    );
    expect(
      replaceUrl(`/components/data-grid/getting-started/#main-content`, '/x/react-data-grid'),
    ).to.equal(`/x/react-data-grid/getting-started/#main-content`);
    expect(
      replaceUrl(`/components/data-grid/components/#main-content`, '/x/react-data-grid'),
    ).to.equal(`/x/react-data-grid/components/#main-content`);
    expect(replaceUrl(`/api/button-unstyled`, '/base-ui/api/button-unstyled')).to.equal(
      `/base-ui/api/button-unstyled`,
    );
    expect(replaceUrl(`/styles/api/`, `/system/basics`)).to.equal(`/system/styles/api/`);
  });

  it('[i18n] only replace links for new routes (/material-ui/* & /x/*)', () => {
    expect(
      replaceUrl(`/zh/guides/minimizing-bundle-size/`, '/zh/material-ui/react-buttons'),
    ).to.equal(`/zh/material-ui/guides/minimizing-bundle-size/`);
    expect(
      replaceUrl(`/zh/components/data-grid/getting-started/#main-content`, '/zh/x/react-data-grid'),
    ).to.equal(`/zh/x/react-data-grid/getting-started/#main-content`);
    expect(
      replaceUrl(`/zh/components/data-grid/components/#main-content`, '/zh/x/react-data-grid'),
    ).to.equal(`/zh/x/react-data-grid/components/#main-content`);
    expect(replaceUrl(`/zh/api/button-unstyled`, '/zh/base-ui/api/button-unstyled')).to.equal(
      `/zh/base-ui/api/button-unstyled`,
    );
    expect(replaceUrl(`/zh/styles/api/`, `/system/basics`)).to.equal(`/zh/system/styles/api/`);
  });

  it('does not replace for old routes', () => {
    expect(replaceUrl(`/guides/minimizing-bundle-size/`, '/components/buttons')).to.equal(
      `/guides/minimizing-bundle-size/`,
    );
    expect(
      replaceUrl(`/components/data-grid/getting-started/#main-content`, '/components/buttons'),
    ).to.equal(`/components/data-grid/getting-started/#main-content`);
  });

  it('does not replace for x marketing page', () => {
    expect(replaceUrl(`/components/data-grid/getting-started/#main-content`, '/x/')).to.equal(
      `/components/data-grid/getting-started/#main-content`,
    );
  });
});
