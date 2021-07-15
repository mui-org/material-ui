import { createPrimitiveStyled, StyledPrimitive } from '@material-ui/system';
import createTheme, { Theme } from '../styles/createTheme';

export type Mui = {
  [Key in keyof JSX.IntrinsicElements]: StyledPrimitive<Key, Theme>;
};

const generatePrimitives = () => {
  const styled = createPrimitiveStyled(createTheme());
  const mui = {};

  styled.htmlTags.forEach((tag) => {
    // @ts-ignore
    mui[tag] = styled(tag)();
  });

  return mui as Mui;
};

const mui = generatePrimitives();

export default mui;
