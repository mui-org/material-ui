export default function isLayoutSupported(): boolean {
  return !(
    /jsdom|HappyDOM/.test(window.navigator.userAgent) ||
    // TODO(v9): Remove the test environment check
    // eslint-disable-next-line mui/consistent-production-guard
    process.env.NODE_ENV === 'test'
  );
}
