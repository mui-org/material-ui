import { describe, it, expect } from 'vitest';
import { createRenderer } from '@mui/internal-test-utils';
import { GlobalStyles } from '@mui/system';

describe('<GlobalStyles />', () => {
  const { render } = createRenderer();

  it('should work', () => {
    expect(() => render(<GlobalStyles styles={{}} />)).not.to.throw();
  });
});
