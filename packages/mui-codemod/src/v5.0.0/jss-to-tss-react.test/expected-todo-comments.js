/*
Comments to be preserved when clsx import is removed. These comments should come before
any comments that they get combined with.
 */
/*
Comments that should not be lost when the clsx import comments are preserved.
 */
import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
const useStyles = makeStyles()((_theme, _params, classes) => ({
  test: {
    backgroundColor: "purple",
    color: "white",
    [`&.${classes.qualifier}`]: {
      textDecoration: props => (props.textDecoration)
    },
  },
  qualifier: {},
}));

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useExportedStyles = makeStyles()({
  test: {
    backgroundColor: "purple",
    color: "white",
  }
});

// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. Unsupported arrow function syntax.
// Arrow function has parameter type of Identifier instead of ObjectPattern (for example `(props) => ({...})` instead of `({color}) => ({...})`).
const useStyles2 = makeStyles()({
  test2: props => ({
    backgroundColor: "blue",
    color: "lime"
  })
});

// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. Unsupported arrow function syntax.
// Arrow function has body type of BlockStatement instead of ObjectExpression.
const useStyles3 = makeStyles()({
  test3: props => {
    return {
      backgroundColor: "blue",
      color: "lime"
    };
  }
});

// TODO jss-to-tss-react codemod: '@global' is not supported by tss-react.
// See https://mui.com/material-ui/customization/how-to-customize/#4-global-css-override for alternatives.
const useGlobalStyles = makeStyles()(() => ({
  '@global': {
    '.sample': {
      backgroundColor: "purple",
      color: "white",
    }
  }
}));

function InnerComponent() {
  const { classes } = useStyles2();
  return <div className={classes.test2}>Inner Test</div>;
}
function ComponentUsingStyles(props) {
  const { classes, cx } = useStyles(props, {
    props: props
  });
  return (
    <>
      <div className={classes.test}>Test<InnerComponent/></div>
      <div className={cx(classes.test, classes.qualifier)}>Qualifier Test</div>
      </>
  );
}

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export default useStyles3;
