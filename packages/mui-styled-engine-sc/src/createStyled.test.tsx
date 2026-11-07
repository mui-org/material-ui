import { describe, it, expect, vi } from 'vitest';
import * as ReactDOMServer from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import createStyled from '@mui/system/createStyled';

vi.mock('@mui/styled-engine', async () => import('@mui/styled-engine-sc'));

function renderCss(element: React.ReactElement) {
  const sheet = new ServerStyleSheet();
  try {
    ReactDOMServer.renderToString(sheet.collectStyles(element));
    return sheet.getStyleTags();
  } finally {
    sheet.seal();
  }
}

describe('createStyled with styled-components', () => {
  const styled = createStyled();

  it('keeps sx on an independent component after creating a wrapper', () => {
    const Inner = styled('div', { slot: 'root' })({ color: 'red' });
    expect(renderCss(<Inner sx={{ margin: '4px' }} />)).to.contain('margin:4px;');

    const Outer = styled(Inner)({ color: 'blue' });
    expect(renderCss(<Outer sx={{ margin: '4px' }} />)).to.contain('margin:4px;');
    expect(renderCss(<Inner sx={{ margin: '8px' }} />)).to.contain('margin:8px;');
  });

  it('evaluates sx once in a composed chain', () => {
    const Inner = styled('div', { slot: 'root' })`
      color: red;
    `;
    const Middle = styled(Inner)`
      color: blue;
    `;
    const Outer = styled(Middle)`
      color: green;
    `;
    const sx = vi.fn(() => ({ margin: '8px' }));

    expect(renderCss(<Outer sx={sx} />)).to.contain('margin:8px;');
    expect(sx).toHaveBeenCalledTimes(1);
  });

  it('skips sx only for the skipSx wrapper', () => {
    const Inner = styled('div', { slot: 'root' })({ color: 'red' });
    const Outer = styled(Inner, { skipSx: true })({ color: 'blue' });
    const sx = vi.fn(() => ({ margin: '8px' }));

    expect(renderCss(<Outer sx={sx} />)).not.to.contain('margin:8px;');
    expect(sx).toHaveBeenCalledTimes(0);
    expect(renderCss(<Inner sx={sx} />)).to.contain('margin:8px;');
    expect(sx).toHaveBeenCalledTimes(1);
  });
});
