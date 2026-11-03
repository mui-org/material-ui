
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

/*
Sandboxes for verifying correct behavior:
JSS - https://codesandbox.io/p/sandbox/typescript-case-bt065c?file=/demo.tsx
TSS - https://codesandbox.io/p/sandbox/typescript-case-7jwpms?file=/demo.tsx
 */

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    test: {
      backgroundColor: "purple",
      color: "white",
      "& $test2": {
        backgroundColor: "lime",
        color: "blue"
      }
    },
    test2: {
      backgroundColor: "blue",
      color: "lime"
    }
  })
);
export function MergeClassesNoParams({ classes: classesProp } : { classes?: any }) {
  const classes = useStyles({classes: classesProp});
  return <div className={classes.test}>Test useStyles without params but with classes prop</div>;
}

function InnerComponent({ classes } : { classes: any }) {
  return <div className={classes.test2}>Inner Test2</div>;
}
export default function ComponentUsingStyles() {
  const classes = useStyles();
  return (
    <>
      <div className={classes.test}>
        Test
        <InnerComponent classes={classes} />
      </div>
      <div className={classes.test2}>Outer Test2</div>
    </>
  );
}
