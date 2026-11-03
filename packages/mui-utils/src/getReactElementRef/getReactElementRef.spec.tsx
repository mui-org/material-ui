import getReactElementRef from '@mui/utils/getReactElementRef';

// @ts-expect-error: A boolean is not a React element.
getReactElementRef(false);

// @ts-expect-error: null is not a React element.
getReactElementRef(null);

// @ts-expect-error: undefined is not a React element.
getReactElementRef(undefined);

// @ts-expect-error: A number is not a React element.
getReactElementRef(1);

// @ts-expect-error: An array of elements is not a single React element.
getReactElementRef([<div key="1" />, <div key="2" />]);

getReactElementRef(<div />);
