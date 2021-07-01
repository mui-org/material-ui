import { expect } from 'chai';
import { createSandbox } from 'sinon';

describe('custom matchers', () => {
  const consoleSandbox = createSandbox();

  beforeEach(() => {
    // otherwise our global setup throws on unexpected calls in afterEach
    consoleSandbox.stub(console, 'warn');
    consoleSandbox.stub(console, 'error');
  });

  afterEach(() => {
    consoleSandbox.restore();
  });

  describe('toErrorDev()', () => {
    it('passes if the message is exactly the same', () => {
      expect(() => console.error('expected message')).toErrorDev('expected message');
    });

    it('passes if the message is a subset', () => {
      expect(() => console.error('expected message')).toErrorDev('pected messa');
    });

    it('passes if multiple messages are expected', () => {
      expect(() => {
        console.error('expected message');
        console.error('another message');
      }).toErrorDev(['expected message', 'another message']);
    });

    it('fails if an expected console.error call wasnt recorded with a useful stacktrace', () => {
      let caughtError;
      try {
        console.error('expected message');
        expect(() => {}).toErrorDev('expected message');
      } catch (error) {
        caughtError = error;
      }

      expect(caughtError).to.have.property('stack');
      expect(caughtError.stack).to.include(
        'Could not match the following console.error calls. ' +
          "Make sure previous actions didn't call console.error by wrapping them in expect(() => {}).not.toErrorDev(): \n\n" +
          '  - "expected message"\n' +
          '    at Context.', // `Context.it` in node 12.x, `Context.<anonymous>` in later node version
      );
      // check that the top stackframe points to this test
      // if this test is moved to another file the next assertion fails
      expect(caughtError.stack).to.match(
        /- "expected message"\s+at Context\.(<anonymous>|it) \(.+\/initMatchers\.test\.js:\d+:\d+\)/,
      );
    });

    it('is case sensitive', () => {
      let caughtError;
      try {
        expect(() => console.error('expected Message')).toErrorDev('expected message');
      } catch (error) {
        caughtError = error;
      }

      expect(caughtError).to.have.property('stack');
      expect(caughtError.stack).to.include(
        'Recorded unexpected console.error calls: \n\n' +
          '  - Expected #1 "expected message" to be included in \n' +
          '"expected Message"\n' +
          '    at callback',
      );
      // check that the top stackframe points to this test
      // if this test is moved to another file the next assertion fails
      expect(caughtError.stack).to.match(
        /"expected Message"\s+at callback \(.+\/initMatchers\.test\.js:\d+:\d+\)/,
      );
    });

    it('fails if the order of calls does not match', () => {
      expect(() => {
        expect(() => {
          console.error('another message');
          console.error('expected message');
        }).toErrorDev(['expected message', 'another message']);
      }).to.throw('Recorded unexpected console.error calls');
    });

    it('fails if there are fewer messages than expected', () => {
      expect(() => {
        expect(() => {
          console.error('expected message');
        }).toErrorDev(['expected message', 'another message']);
      }).to.throw('Could not match the following console.error calls');
    });

    it('passes if no messages were recored if expected', () => {
      expect(() => {}).not.toErrorDev();
      expect(() => {}).not.toErrorDev([]);
    });

    it('fails if no arguments are used as a way of negating', () => {
      expect(() => {
        expect(() => {}).toErrorDev();
      }).to.throw(
        "Expected to call console.error but didn't provide messages. " +
          "If you don't expect any messages prefer `expect().not.toErrorDev();",
      );
    });

    it('fails if arguments are passed when negated', () => {
      expect(() => {
        expect(() => {}).not.toErrorDev('not unexpected?');
      }).to.throw(
        'Expected no call to console.error but provided messages. ' +
          "If you want to make sure a certain message isn't logged prefer the positive. " +
          'By expecting certain messages you automatically expect that no other messages are logged',
      );
    });

    it('ignores `false` messages', () => {
      const isReact16 = false;
      expect(() => {
        expect(() => {}).toErrorDev([isReact16 && 'some legacy error message']);
      }).not.to.throw();
    });
  });
});
