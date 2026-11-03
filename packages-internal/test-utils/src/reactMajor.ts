import * as React from 'react';

const [reactMajor, reactMinor] = React.version.split('.').map((n) => parseInt(n, 10));

export default reactMajor;
export { reactMajor, reactMinor };
