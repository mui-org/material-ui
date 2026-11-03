// No import statements — components are auto-imported
<Box
  sx={{
    display: "flex",
    gap: 2,
    p: 3
  }}>
  <Typography
    sx={{
      fontSize: 14,
      fontWeight: 600
    }}>Hello</Typography>
</Box>;

<Stack direction="row" spacing={2} sx={{
  mt: 1
}} />;

<Link color="inherit" href="https://mui.com/" sx={{
  mb: 2
}}>MUI</Link>;

const sx = { display: 'flex' };
<Box
  sx={[{
    m: 2
  }, ...(Array.isArray(sx) ? sx : [sx])]} />;
