import { describe, it, expect } from 'vitest';
import { resolveDemoSourceView } from './DemoContent.helpers';

describe('DemoContentLoading', () => {
  it('uses the same source visibility metadata as hydrated content', () => {
    const metadata = {
      expanded: false,
      focusedLines: 5,
      collapsible: true,
      hasFocusProjection: true,
    };

    const loadingView = resolveDemoSourceView(metadata);
    const hydratedView = resolveDemoSourceView(metadata);

    expect(loadingView).to.deep.equal(hydratedView);
    expect(loadingView.sourceVisible).to.equal(true);
  });
});
