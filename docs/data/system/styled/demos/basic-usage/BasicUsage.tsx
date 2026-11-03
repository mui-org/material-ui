import { styled } from '@mui/system';

const MyComponent = styled('div')({
  color: 'darkslategray',
  backgroundColor: 'aliceblue',
  padding: 8, // will be converted to `8px`
  borderRadius: 4, // will be converted to `4px`
});

export default function BasicUsage() {
  return (
    // @focus @padding 2
    <MyComponent>Styled div</MyComponent>
  );
}
