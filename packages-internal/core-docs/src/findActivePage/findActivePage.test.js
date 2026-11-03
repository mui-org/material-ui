import { describe, it, expect } from 'vitest';
import findActivePage from './findActivePage';

describe('findActivePage', () => {
  describe('old structure', () => {
    const pages = [
      {
        pathname: '/getting-started',
        icon: 'DescriptionIcon',
        children: [{ pathname: '/getting-started/installation' }],
      },
      {
        pathname: '/react-',
        icon: 'ToggleOnIcon',
        children: [
          {
            pathname: '/components',
            subheader: '/components/inputs',
            children: [
              { pathname: '/components/autocomplete' },
              { pathname: '/components/buttons', title: 'Button' },
              { pathname: '/components/button-group' },
              { pathname: '/components/checkboxes', title: 'Checkbox' },
              { pathname: '/components/floating-action-button' },
              { pathname: '/components/radio-buttons', title: 'Radio button' },
              { pathname: '/components/rating' },
              { pathname: '/components/selects', title: 'Select' },
              { pathname: '/components/slider' },
              { pathname: '/components/switches', title: 'Switch' },
              { pathname: '/components/text-fields', title: 'Text field' },
              { pathname: '/components/transfer-list' },
              { pathname: '/components/toggle-button' },
            ],
          },
        ],
      },
    ];

    it('return first level page', () => {
      expect(findActivePage(pages, '/getting-started').activePage).to.deep.equal({
        pathname: '/getting-started',
        icon: 'DescriptionIcon',
        children: [{ pathname: '/getting-started/installation' }],
      });
    });

    it('return nested page', () => {
      expect(findActivePage(pages, '/getting-started/installation').activePage).to.deep.equal({
        pathname: '/getting-started/installation',
      });
    });

    it('return deep nested page', () => {
      expect(findActivePage(pages, '/components/radio-buttons').activePage).to.deep.equal({
        pathname: '/components/radio-buttons',
        title: 'Radio button',
      });
    });
  });

  describe('new structure', () => {
    const pages = [
      {
        pathname: '/material-ui/react-',
        icon: 'ToggleOnIcon',
        children: [
          {
            pathname: '/material-ui/components',
            subheader: '/components/inputs',
            children: [
              { pathname: '/material-ui/react-autocomplete' },
              { pathname: '/material-ui/react-buttons', title: 'Button' },
              { pathname: '/material-ui/react-button-group' },
              { pathname: '/material-ui/react-checkboxes', title: 'Checkbox' },
              { pathname: '/material-ui/react-floating-action-button' },
              { pathname: '/material-ui/react-radio-buttons', title: 'Radio button' },
              { pathname: '/material-ui/react-rating' },
              { pathname: '/material-ui/react-selects', title: 'Select' },
              { pathname: '/material-ui/react-slider' },
              { pathname: '/material-ui/react-switches', title: 'Switch' },
              { pathname: '/material-ui/react-text-fields', title: 'Text field' },
              { pathname: '/material-ui/react-transfer-list' },
              { pathname: '/material-ui/react-toggle-button' },
            ],
          },
        ],
      },
    ];

    it('return deep nested page', () => {
      expect(findActivePage(pages, '/material-ui/react-radio-buttons').activePage).to.deep.equal({
        pathname: '/material-ui/react-radio-buttons',
        title: 'Radio button',
      });
    });
  });
});
