import { describe, it, expect } from 'vitest';
import escapeCell from './escapeCell';

describe('escapeCell', () => {
  it('escapes pipes outside backticks', () => {
    const input = 'true | false';
    const result = escapeCell(input);
    expect(result).to.equal('true \\| false');
  });

  it('does not escape pipes inside single backticks', () => {
    const input = '`true | false`';
    const result = escapeCell(input);
    expect(result).to.equal('`true | false`');
  });

  it('does not escape pipes inside multiple inline code spans', () => {
    const input = 'Use `a | b` and `x | y` here';
    const result = escapeCell(input);
    expect(result).to.equal('Use `a | b` and `x | y` here');
  });

  it('escapes pipes in normal text but not inside backticks', () => {
    const input = '`a | b` or c | d';
    const result = escapeCell(input);
    expect(result).to.equal('`a | b` or c \\| d');
  });

  it('handles strings without any pipes', () => {
    const input = 'no pipes here';
    const result = escapeCell(input);
    expect(result).to.equal('no pipes here');
  });

  it('keeps < inside code spans but escapes outside', () => {
    const input = 'Use <b>bold</b> and `<div>` tags';
    const result = escapeCell(input);
    expect(result).to.equal('Use &lt;b>bold&lt;/b> and `<div>` tags');
  });

  it('does not escape pipe at string start or end inside backticks', () => {
    const input = '`| start and end |`';
    const result = escapeCell(input);
    expect(result).to.equal('`| start and end |`');
  });

  it('escapes pipe at string start or end outside backticks', () => {
    const input = '| start | and end |';
    const result = escapeCell(input);
    expect(result).to.equal('\\| start \\| and end \\|');
  });
});
