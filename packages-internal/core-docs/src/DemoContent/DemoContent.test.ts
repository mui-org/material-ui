import { describe, it, expect } from 'vitest';
import {
  createDemoUseOptions,
  expandDemo,
  getDemoEditingDependencies,
  resetDemo,
  resolveDemoSourceView,
  toggleDemoExpanded,
} from './DemoContent.helpers';
import { buildDemoDeploymentLinks } from './demoDeploymentLinks';

describe('DemoContent behavior', () => {
  it('hard-disables live editing and uses original source actions', () => {
    const onSelectedTransformChange = () => {};
    const options = createDemoUseOptions({
      disableLiveEdit: true,
      selectedTransform: 'js',
      onSelectedTransformChange,
      exportConfig: {},
    });

    expect(options).to.include({
      disabled: true,
      resetOnExpand: true,
      actionSource: 'initial',
      selectedTransform: 'js',
      onSelectedTransformChange,
    });
  });

  it('keeps focused source visible while collapsed', () => {
    expect(
      resolveDemoSourceView({
        expanded: false,
        focusedLines: 4,
        collapsible: true,
        hasFocusProjection: true,
      }),
    ).to.deep.equal({ sourceVisible: true, hasSourceFocus: true });
  });

  it('hides collapse-to-empty source until expansion', () => {
    const collapsed = resolveDemoSourceView({
      expanded: false,
      focusedLines: 0,
      collapsible: true,
      hasFocusProjection: true,
    });
    const expanded = resolveDemoSourceView({
      expanded: true,
      focusedLines: 0,
      collapsible: true,
      hasFocusProjection: true,
    });

    expect(collapsed).to.deep.equal({ sourceVisible: false, hasSourceFocus: false });
    expect(expanded).to.deep.equal({ sourceVisible: true, hasSourceFocus: false });
  });

  it('resets controlled state and remounts the preview', () => {
    let resetCount = 0;
    let remountCount = 0;

    resetDemo(
      () => {
        resetCount += 1;
      },
      () => {
        remountCount += 1;
      },
    );

    expect(resetCount).to.equal(1);
    expect(remountCount).to.equal(1);
  });

  it('remounts a hard-disabled demo without a source reset handler', () => {
    let remountCount = 0;

    resetDemo(undefined, () => {
      remountCount += 1;
    });

    expect(remountCount).to.equal(1);
  });

  it('routes expansion through expand and collapse through setExpanded', () => {
    let expandCount = 0;
    let remountCount = 0;
    let collapseCount = 0;
    const expandedValues: boolean[] = [];

    toggleDemoExpanded(
      false,
      () => {
        expandCount += 1;
      },
      (value) => expandedValues.push(value),
      () => {
        remountCount += 1;
      },
      () => {
        collapseCount += 1;
      },
    );
    expect(collapseCount).to.equal(0);

    toggleDemoExpanded(
      true,
      () => {
        expandCount += 1;
      },
      (value) => expandedValues.push(value),
      () => {
        remountCount += 1;
      },
      () => {
        collapseCount += 1;
      },
    );

    expect(expandCount).to.equal(1);
    expect(remountCount).to.equal(1);
    expect(collapseCount).to.equal(1);
    expect(expandedValues).to.deep.equal([false]);
  });

  it('uses one expansion path for source reset and preview remount', () => {
    let expandCount = 0;
    let remountCount = 0;

    expandDemo(
      () => {
        expandCount += 1;
      },
      () => {
        remountCount += 1;
      },
    );

    expect(expandCount).to.equal(1);
    expect(remountCount).to.equal(1);
  });

  it('detects the editing runtime dependencies across demo variants', () => {
    expect(
      getDemoEditingDependencies({
        System: {
          fileName: 'Demo.tsx',
          source: 'export default function Demo() { return null; }',
        },
        Styled: {
          fileName: 'Demo.js',
          source: "import styles from './Demo.module.css';",
          extraFiles: {
            'Demo.module.css': { source: '.root {}' },
          },
        },
      }),
    ).to.deep.equal({ js: true, css: true });
  });

  it('does not preload editing runtimes without supported source files', () => {
    expect(
      getDemoEditingDependencies({
        Data: {
          fileName: 'data.json',
          source: '{}',
        },
      }),
    ).to.deep.equal({ js: false, css: false });
  });

  it('builds deployment links from the current route and demo anchor', () => {
    expect(
      buildDemoDeploymentLinks(
        {
          deployEnv: 'pull-request',
          siteName: 'docs-site',
          siteDeployUrl: 'https://deploy-id--docs-site.netlify.app',
          pullRequestId: '123',
        },
        '/guide/components/?query=value#old',
        'ExampleDemo',
      ),
    ).to.deep.equal({
      pullRequest:
        'https://deploy-preview-123--docs-site.netlify.app/guide/components/#ExampleDemo',
      next: 'https://next--docs-site.netlify.app/guide/components/#ExampleDemo',
      permalink: 'https://deploy-id--docs-site.netlify.app/guide/components/#ExampleDemo',
      master: 'https://master--docs-site.netlify.app/guide/components/#ExampleDemo',
    });
  });

  it('omits deployment links outside preview environments', () => {
    expect(
      buildDemoDeploymentLinks(
        {
          deployEnv: 'production',
          siteName: 'docs-site',
          siteDeployUrl: 'https://docs.example.com',
        },
        '/guide/',
        'ExampleDemo',
      ),
    ).to.equal(null);
  });
});
