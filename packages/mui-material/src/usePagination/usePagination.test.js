import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { createRenderer } from '@mui/internal-test-utils';
import usePagination from '@mui/material/usePagination';

describe('usePagination', () => {
  const { render } = createRenderer();
  const serialize = (items) => items.map((item) => (item.type === 'page' ? item.page : item.type));

  const renderHook = (useHook) => {
    const result = React.createRef();
    function TestCase() {
      const hookResult = useHook();
      React.useEffect(() => {
        result.current = hookResult;
      }, [hookResult]);
      return null;
    }
    render(<TestCase />);
    return { result };
  };

  it('has one page by default', () => {
    const { items } = renderHook(() => usePagination()).result.current;
    expect(items).to.have.length(3);
    expect(items[1]).to.have.property('page', 1);
  });

  it('has disabled previous & next buttons by default', () => {
    const { items } = renderHook(() => usePagination()).result.current;
    expect(items[0]).to.have.property('type', 'previous');
    expect(items[0]).to.have.property('disabled', true);
    expect(items[2]).to.have.property('type', 'next');
    expect(items[2]).to.have.property('disabled', true);
  });

  it('has a disabled previous button & an enabled next button when count > 1', () => {
    const { items } = renderHook(() => usePagination({ count: 2 })).result.current;
    expect(items[0]).to.have.property('type', 'previous');
    expect(items[0]).to.have.property('disabled', true);
    expect(items[3]).to.have.property('type', 'next');
    expect(items[3]).to.have.property('disabled', false);
    expect(items[3]).to.have.property('page', 2);
  });

  it('has an enabled previous button & disabled next button when page === count', () => {
    const { items } = renderHook(() => usePagination({ count: 2, page: 2 })).result.current;
    expect(items[0]).to.have.property('type', 'previous');
    expect(items[0]).to.have.property('disabled', false);
    expect(items[0]).to.have.property('page', 1);
    expect(items[3]).to.have.property('type', 'next');
    expect(items[3]).to.have.property('disabled', true);
  });

  it('has a disabled first button when showFirstButton === true', () => {
    const { items } = renderHook(() => usePagination({ showFirstButton: true })).result.current;
    expect(items[0]).to.have.property('type', 'first');
    expect(items[0]).to.have.property('disabled', true);
    expect(items[0]).to.have.property('page', 1);
  });

  it('has a disabled last button when showLastButton === true', () => {
    const { items } = renderHook(() => usePagination({ showLastButton: true })).result.current;
    expect(items[3]).to.have.property('type', 'last');
    expect(items[3]).to.have.property('disabled', true);
    expect(items[3]).to.have.property('page', 1);
  });

  it('has an enabled first button when showFirstButton === true && page > 1', () => {
    const { items } = renderHook(() => usePagination({ showFirstButton: true, count: 2, page: 2 }))
      .result.current;
    expect(items[0]).to.have.property('type', 'first');
    expect(items[0]).to.have.property('disabled', false);
    expect(items[0]).to.have.property('page', 1);
  });

  it('has an enabled last button when showLastButton === true && page < count', () => {
    const { items } = renderHook(() => usePagination({ showLastButton: true, count: 2 })).result
      .current;
    expect(items[4]).to.have.property('type', 'last');
    expect(items[4]).to.have.property('disabled', false);
    expect(items[4]).to.have.property('page', 2);
  });

  it('has no ellipses when count <= 7', () => {
    const { items } = renderHook(() => usePagination({ count: 7 })).result.current;
    expect(items[1]).to.have.property('page', 1);
    expect(items[2]).to.have.property('page', 2);
    expect(items[3]).to.have.property('page', 3);
    expect(items[4]).to.have.property('page', 4);
    expect(items[5]).to.have.property('page', 5);
    expect(items[6]).to.have.property('page', 6);
    expect(items[7]).to.have.property('page', 7);
  });

  it('has an end ellipsis by default when count >= 8', () => {
    const { items } = renderHook(() => usePagination({ count: 8 })).result.current;
    expect(items).to.have.length(9);
    expect(items[2]).to.have.property('page', 2);
    expect(items[6]).to.have.property('type', 'end-ellipsis');
    expect(items[6]).to.have.property('page', null);
  });

  it('has a start ellipsis when page >= 5', () => {
    const { items } = renderHook(() => usePagination({ count: 8, page: 5 })).result.current;
    expect(items[2]).to.have.property('type', 'start-ellipsis');
    expect(items[2]).to.have.property('page', null);
    expect(items[6]).to.have.property('page', 7);
  });

  it('has start & end ellipsis when count >= 9', () => {
    const { items } = renderHook(() => usePagination({ count: 9, page: 5 })).result.current;
    expect(items).to.have.length(9);
    expect(items[2]).to.have.property('type', 'start-ellipsis');
    expect(items[2]).to.have.property('page', null);
    expect(items[6]).to.have.property('type', 'end-ellipsis');
    expect(items[6]).to.have.property('page', null);
  });

  it('can have a reduced siblingCount', () => {
    const { items } = renderHook(() => usePagination({ count: 7, page: 4, siblingCount: 0 })).result
      .current;
    expect(items).to.have.length(7);
    expect(items[2]).to.have.property('type', 'start-ellipsis');
    expect(items[3]).to.have.property('page', 4);
    expect(items[4]).to.have.property('type', 'end-ellipsis');
  });

  it('can have an increased siblingCount', () => {
    const { items } = renderHook(() => usePagination({ count: 11, page: 6, siblingCount: 2 }))
      .result.current;
    expect(items).to.have.length(11);
    expect(items[2]).to.have.property('type', 'start-ellipsis');
    expect(items[3]).to.have.property('page', 4);
    expect(items[4]).to.have.property('page', 5);
    expect(items[5]).to.have.property('page', 6);
    expect(items[6]).to.have.property('page', 7);
    expect(items[7]).to.have.property('page', 8);
    expect(items[8]).to.have.property('type', 'end-ellipsis');
  });

  it('can have an increased boundaryCount', () => {
    const { items } = renderHook(() => usePagination({ count: 11, page: 6, boundaryCount: 2 }))
      .result.current;
    expect(items).to.have.length(11);
    expect(items[1]).to.have.property('page', 1);
    expect(items[2]).to.have.property('page', 2);
    expect(items[3]).to.have.property('type', 'start-ellipsis');
    expect(items[7]).to.have.property('type', 'end-ellipsis');
    expect(items[8]).to.have.property('page', 10);
    expect(items[9]).to.have.property('page', 11);
  });

  it('should support boundaryCount={0}', () => {
    let items;

    items = renderHook(() =>
      usePagination({ count: 11, page: 6, boundaryCount: 0, siblingCount: 0 }),
    ).result.current.items;
    expect(serialize(items)).to.deep.equal([
      'previous',
      'start-ellipsis',
      6,
      'end-ellipsis',
      'next',
    ]);

    items = renderHook(() =>
      usePagination({ count: 11, page: 6, boundaryCount: 0, siblingCount: 1 }),
    ).result.current.items;
    expect(serialize(items)).to.deep.equal([
      'previous',
      'start-ellipsis',
      5,
      6,
      7,
      'end-ellipsis',
      'next',
    ]);
  });

  it('keeps ellipses when boundary and sibling counts are zero', () => {
    const expectedByPage = [
      [1, ['previous', 1, 2, 'end-ellipsis', 'next']],
      [2, ['previous', 1, 2, 'end-ellipsis', 'next']],
      [5, ['previous', 'start-ellipsis', 5, 'end-ellipsis', 'next']],
      [7, ['previous', 'start-ellipsis', 7, 'end-ellipsis', 'next']],
      [9, ['previous', 'start-ellipsis', 9, 10, 'next']],
      [10, ['previous', 'start-ellipsis', 9, 10, 'next']],
    ];

    expectedByPage.forEach(([page, expected]) => {
      const items = renderHook(() =>
        usePagination({ count: 10, page, boundaryCount: 0, siblingCount: 0 }),
      ).result.current.items;
      expect(serialize(items), `page=${page}`).to.deep.equal(expected);
    });
  });

  it('should never render a page item outside of the count range', () => {
    [0, 1, 2, 3, 4, 5, 11].forEach((count) => {
      [1, 3, 7].forEach((page) => {
        const items = renderHook(() =>
          usePagination({ count, page, boundaryCount: 0, siblingCount: 0 }),
        ).result.current.items;
        serialize(items)
          .filter((item) => typeof item === 'number')
          .forEach((item) => {
            expect(item).to.be.within(1, count);
          });
      });
    });
  });

  it('should keep every page reachable when they all fit', () => {
    let items;

    items = renderHook(() =>
      usePagination({ count: 2, page: 1, boundaryCount: 0, siblingCount: 0 }),
    ).result.current.items;
    expect(serialize(items)).to.deep.equal(['previous', 1, 2, 'next']);

    items = renderHook(() =>
      usePagination({ count: 3, page: 2, boundaryCount: 0, siblingCount: 0 }),
    ).result.current.items;
    expect(serialize(items)).to.deep.equal(['previous', 1, 2, 3, 'next']);

    items = renderHook(() =>
      usePagination({ count: 4, page: 1, boundaryCount: 0, siblingCount: 0 }),
    ).result.current.items;
    expect(serialize(items)).to.deep.equal(['previous', 1, 2, 'end-ellipsis', 'next']);
  });

  it('should stay navigable without previous & next buttons', () => {
    const items = renderHook(() =>
      usePagination({
        count: 3,
        page: 2,
        boundaryCount: 0,
        siblingCount: 0,
        hidePrevButton: true,
        hideNextButton: true,
      }),
    ).result.current.items;
    expect(serialize(items)).to.deep.equal([1, 2, 3]);
  });
});
