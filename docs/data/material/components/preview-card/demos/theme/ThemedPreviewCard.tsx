import Link from '@mui/material/Link';
import PreviewCard from '@mui/material/PreviewCard';
import PreviewCardPopup, {
  previewCardPopupClasses,
  PreviewCardPopupDataAttributes,
} from '@mui/material/PreviewCardPopup';
import PreviewCardTrigger from '@mui/material/PreviewCardTrigger';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// @focus-start
const theme = createTheme({
  components: {
    MuiPreviewCardTrigger: {
      defaultProps: { delay: 200 },
    },
    MuiPreviewCardPopup: {
      defaultProps: { elevation: 2 },
      styleOverrides: {
        root: ({ theme: t }) => ({
          borderRadius: t.spacing(1),
          [`&.${previewCardPopupClasses.open}`]: {
            borderTop: `4px solid ${(t.vars || t).palette.primary.main}`,
          },
          [`&[${PreviewCardPopupDataAttributes.side}="top"]`]: {
            borderTop: 'none',
            borderBottom: `4px solid ${(t.vars || t).palette.primary.main}`,
          },
        }),
      },
      variants: [
        {
          props: { elevation: 2 },
          style: { maxWidth: 280 },
        },
      ],
    },
  },
});
// @focus-end

export default function ThemedPreviewCard() {
  return (
    <ThemeProvider theme={theme}>
      <Typography>
        Read the{' '}
        <PreviewCard>
          <PreviewCardTrigger render={<Link href="#theme">theming guide</Link>} />
          <PreviewCardPopup>
            <Typography variant="body2">
              The theme adds a primary border on the side next to the trigger.
            </Typography>
          </PreviewCardPopup>
        </PreviewCard>{' '}
        first.
      </Typography>
    </ThemeProvider>
  );
}
