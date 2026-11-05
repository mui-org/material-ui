import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { createRenderer, isJsdom, screen, waitFor } from '@mui/internal-test-utils';
import { menu2PopupClasses } from '@mui/material/Unstable_Menu2Popup';
import MenuRfcExperiment from '../../../../pages/experiments/menu2-playground';

vi.mock('next/link', () => ({ __esModule: true, default: 'a' }));
vi.mock('@mui/internal-core-docs/AppLayout', () => ({ AppLayoutHead: () => null }));

describe.skipIf(isJsdom())('Menu2 playground backdrop settings', () => {
  const { render } = createRenderer();

  async function renderPlayground() {
    const view = render(<MenuRfcExperiment />);
    await view.user.selectOptions(
      screen.getByRole('combobox', { name: 'animation' }),
      'off',
    );
    return view;
  }

  ['Project', 'Successor'].forEach((triggerName) => {
    it(`uses a transparent click-away backdrop by default for ${triggerName}`, async () => {
      const { baseElement, user } = await renderPlayground();
      expect(
        screen.getByRole('combobox', { name: 'visual backdrop' }),
      ).to.have.value('default');
      const trigger = screen.getByRole('button', { name: triggerName });

      await user.click(trigger);
      await screen.findByRole('menu', { name: triggerName });

      const backdrop = baseElement.querySelector<HTMLElement>(
        `.${menu2PopupClasses.backdrop}`,
      )!;
      expect(backdrop).not.to.equal(null);
      expect(getComputedStyle(backdrop).backgroundColor).to.equal(
        'rgba(0, 0, 0, 0)',
      );
      expect(getComputedStyle(backdrop).pointerEvents).to.equal('auto');

      await user.click(backdrop);

      await waitFor(() => expect(screen.queryByRole('menu')).to.equal(null));
      expect(trigger).to.have.attribute('aria-expanded', 'false');
    });

    it(`omits the backdrop when None is selected for ${triggerName}`, async () => {
      const { baseElement, user } = await renderPlayground();
      await user.selectOptions(
        screen.getByRole('combobox', { name: 'visual backdrop' }),
        'none',
      );

      await user.click(screen.getByRole('button', { name: triggerName }));
      await screen.findByRole('menu', { name: triggerName });

      expect(baseElement.querySelector(`.${menu2PopupClasses.backdrop}`)).to.equal(
        null,
      );
    });

    it(`dims the backdrop only when Dimmed is selected for ${triggerName}`, async () => {
      const { baseElement, user } = await renderPlayground();
      await user.selectOptions(
        screen.getByRole('combobox', { name: 'visual backdrop' }),
        'dimmed',
      );

      await user.click(screen.getByRole('button', { name: triggerName }));
      await screen.findByRole('menu', { name: triggerName });

      const backdrop = baseElement.querySelector<HTMLElement>(
        `.${menu2PopupClasses.backdrop}`,
      )!;
      expect(backdrop).not.to.equal(null);
      expect(getComputedStyle(backdrop).backgroundColor).to.equal(
        'rgba(0, 0, 0, 0.5)',
      );
    });
  });

  it('does not force a backdrop on a non-modal menu with Default selected', async () => {
    const { baseElement, user } = await renderPlayground();
    await user.click(screen.getByRole('checkbox', { name: 'modal' }));

    await user.click(screen.getByRole('button', { name: 'Project' }));
    await screen.findByRole('menu', { name: 'Project' });

    expect(baseElement.querySelector(`.${menu2PopupClasses.backdrop}`)).to.equal(
      null,
    );
  });

  it('does not force a backdrop on a hover-opened menu with Default selected', async () => {
    const { baseElement, user } = await renderPlayground();
    await user.click(
      screen.getByRole('checkbox', { name: 'openOnHover (trigger)' }),
    );

    await user.hover(screen.getByRole('button', { name: 'Project' }));
    await screen.findByRole('menu', { name: 'Project' });

    expect(baseElement.querySelector(`.${menu2PopupClasses.backdrop}`)).to.equal(
      null,
    );
  });
});
