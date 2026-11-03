// --jsx accepts arbitrary component names (e.g. DialogTitle, Skeleton, SvgIcon)
<DialogTitle
  sx={{
    display: "flex",
    alignItems: "center"
  }}>Title</DialogTitle>;

<Skeleton
  sx={{
    height: 60,
    width: 100,
    mb: 2
  }} />;

<SvgIcon
  sx={{
    width: "1rem",
    height: "1rem"
  }} />;
