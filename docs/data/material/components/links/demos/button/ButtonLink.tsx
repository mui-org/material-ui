import Link from '@mui/material/Link';

export default function ButtonLink() {
  return (
    // @focus-start @padding 2
    <Link
      component="button"
      variant="body2"
      onClick={() => {
        console.info("I'm a button.");
      }}
    >
      Button Link
    </Link>
    // @focus-end
  );
}
