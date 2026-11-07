import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { createRenderer, screen } from '@mui/internal-test-utils';
import MultipleSelectForm from '../../data/material/components/selects/demos/multiple-form/MultipleSelectForm';

describe('MultipleSelectForm demo', () => {
  const { render } = createRenderer();

  it('submits one form entry per selected value', async () => {
    const { user } = render(<MultipleSelectForm />);

    await user.click(screen.getByRole('combobox', { name: 'Tags' }));
    await user.click(screen.getByRole('option', { name: 'React' }));
    await user.click(screen.getByRole('option', { name: '.NET' }));
    await user.keyboard('[Escape]');
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(screen.getByRole('status', { name: 'Submitted tags' })).to.have.text(
      '["react","dotnet"]',
    );
  });

  it('submits no stale entries after clearing the selection', async () => {
    const { user } = render(<MultipleSelectForm />);

    await user.click(screen.getByRole('combobox', { name: 'Tags' }));
    await user.click(screen.getByRole('option', { name: 'React' }));
    await user.keyboard('[Escape]');
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    expect(screen.getByRole('status', { name: 'Submitted tags' })).to.have.text('["react"]');

    await user.click(screen.getByRole('button', { name: 'Clear selection' }));
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(screen.getByRole('status', { name: 'Submitted tags' })).to.have.text('[]');
  });

  it('supports selecting an option with the keyboard', async () => {
    const { user } = render(<MultipleSelectForm />);

    await user.tab();
    expect(screen.getByRole('combobox', { name: 'Tags' })).toHaveFocus();
    await user.keyboard('[ArrowDown][Enter][Escape]');
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(screen.getByRole('status', { name: 'Submitted tags' })).to.have.text('["react"]');
  });
});
