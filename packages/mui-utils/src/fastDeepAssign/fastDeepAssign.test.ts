import { describe, it, expect, afterEach } from 'vitest';
import fastDeepAssign from './fastDeepAssign';

describe('fastDeepAssign', () => {
  it('merges shallow objects', () => {
    expect(fastDeepAssign({ a: 1 } as Record<string, unknown>, { b: 2 })).to.deep.equal({
      a: 1,
      b: 2,
    });
  });

  it('merges nested objects', () => {
    expect(
      fastDeepAssign({ a: { b: 1 } } as Record<string, unknown>, { a: { c: 2 } }),
    ).to.deep.equal({ a: { b: 1, c: 2 } });
  });

  describe('prototype pollution', () => {
    afterEach(() => {
      // Defensive cleanup in case any assertion below leaves a polluted prototype.
      delete (Object.prototype as Record<string, unknown>).polluted;
    });

    it('does not pollute Object.prototype via __proto__', () => {
      const malicious = JSON.parse('{"__proto__":{"polluted":true}}');
      fastDeepAssign({} as Record<string, unknown>, malicious);
      expect(({} as Record<string, unknown>).polluted).to.equal(undefined);
    });

    it('does not pollute Object.prototype via nested __proto__', () => {
      const malicious = JSON.parse('{"a":{"__proto__":{"polluted":true}}}');
      fastDeepAssign({} as Record<string, unknown>, malicious);
      expect(({} as Record<string, unknown>).polluted).to.equal(undefined);
    });

    it('does not allow overwriting constructor', () => {
      const target = {} as Record<string, unknown>;
      fastDeepAssign(target, JSON.parse('{"constructor":{"name":"Pwned"}}'));
      expect(target.constructor).to.equal(Object);
    });
  });
});
