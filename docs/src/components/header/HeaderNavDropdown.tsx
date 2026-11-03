import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded';
import { HamburgerMenuIcon } from '@mui/internal-core-docs/svgIcons';
import { Link } from '@mui/internal-core-docs/Link';
import { ROUTES } from '@mui/internal-core-docs/constants';

const Anchor = styled('a')<{ component?: React.ElementType; noLinkStyle?: boolean }>(
  ({ theme }) => [
    {
      ...theme.typography.body2,
      fontWeight: theme.typography.fontWeightBold,
      textDecoration: 'none',
      border: 'none',
      width: '100%',
      backgroundColor: 'transparent',
      color: (theme.vars || theme).palette.text.secondary,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(1),
      borderRadius: theme.spacing(1),
      transition: theme.transitions.create('background'),
      '&:hover, &:focus-visible': {
        backgroundColor: (theme.vars || theme).palette.grey[100],
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: 'transparent',
        },
      },
    },
    theme.applyDarkStyles({
      color: '#fff',
      '&:hover, &:focus-visible': {
        backgroundColor: (theme.vars || theme).palette.primaryDark[700],
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: 'transparent',
        },
      },
    }),
  ],
);

const UList = styled('ul')({
  listStyleType: 'none',
  padding: 0,
  margin: 0,
});

const PRODUCTS = [
  {
    name: 'MUI Core',
    description: 'Ready-to-use foundational React components, free forever.',
    href: ROUTES.productCore,
  },
  {
    name: 'MUI X',
    description: 'Advanced and powerful components for complex use cases.',
    href: ROUTES.productAdvanced,
  },
  {
    name: 'Templates',
    description: 'Fully built templates for your application.',
    href: ROUTES.productTemplates,
  },
  {
    name: 'Design Kits',
    description: 'Material UI components in your favorite design tool.',
    href: ROUTES.productDesignKits,
  },
];

const DOCS = [
  {
    name: 'Material UI',
    description: "Component library that implements Google's Material Design.",
    href: ROUTES.materialDocs,
  },
  {
    name: 'Base UI',
    description: 'Unstyled components for building accessible UIs.',
    href: ROUTES.baseDocs,
  },
  {
    name: 'MUI System',
    description: 'CSS utilities for rapidly laying out custom designs.',
    href: ROUTES.systemDocs,
  },
  {
    name: 'MUI X',
    description: 'Advanced components for complex use cases.',
    href: ROUTES.xIntro,
  },
];

export default function HeaderNavDropdown() {
  const [open, setOpen] = React.useState(false);
  const [productsOpen, setProductsOpen] = React.useState(true);
  const [docsOpen, setDocsOpen] = React.useState(false);
  const hambugerRef = React.useRef<HTMLButtonElement>(null);
  return (
    <React.Fragment>
      <IconButton
        color="primary"
        aria-label="Menu"
        ref={hambugerRef}
        disableRipple
        onClick={() => setOpen((value) => !value)}
        sx={{
          position: 'relative',
          '& rect': {
            transformOrigin: 'center',
            transition: '0.2s',
          },
          ...(open && {
            '& rect:first-of-type': {
              transform: 'translate(1.5px, 1.6px) rotateZ(-45deg)',
            },
            '& rect:last-of-type': {
              transform: 'translate(1.5px, -1.2px) rotateZ(45deg)',
            },
          }),
        }}
      >
        <HamburgerMenuIcon />
      </IconButton>
      <ClickAwayListener
        onClickAway={(event) => {
          if (!hambugerRef.current!.contains(event.target as Node)) {
            setOpen(false);
          }
        }}
      >
        <Collapse
          in={open}
          sx={(theme) => ({
            position: 'fixed',
            top: 56,
            left: 0,
            right: 0,
            boxShadow: `0px 16px 20px rgba(170, 180, 190, 0.3)`,
            ...theme.applyDarkStyles({
              boxShadow: '0px 16px 20px rgba(0, 0, 0, 0.8)',
            }),
          })}
        >
          <Box
            sx={{
              p: 2,
              bgcolor: 'background.default',
              maxHeight: 'calc(100vh - 56px)',
              overflow: 'auto',
            }}
          >
            <UList
              sx={(theme) => ({
                '& ul': {
                  borderLeft: '1px solid',
                  borderColor: 'grey.100',
                  ...theme.applyDarkStyles({
                    borderColor: 'primaryDark.700',
                  }),
                  pl: 1,
                  pb: 1,
                  ml: 1,
                },
              })}
            >
              <li>
                <Anchor
                  as="button"
                  onClick={() => setProductsOpen((bool) => !bool)}
                  sx={{ justifyContent: 'space-between' }}
                >
                  Products
                  <KeyboardArrowDownRounded
                    color="primary"
                    sx={{
                      transition: '0.3s',
                      transform: productsOpen ? 'rotate(-180deg)' : 'rotate(0)',
                    }}
                  />
                </Anchor>
                <Collapse in={productsOpen}>
                  <UList>
                    {PRODUCTS.map((item) => (
                      <li key={item.name}>
                        <Anchor
                          href={item.href}
                          as={Link}
                          noLinkStyle
                          sx={{ flexDirection: 'column', alignItems: 'initial' }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}
                          >
                            {item.name}
                          </Box>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {item.description}
                          </Typography>
                        </Anchor>
                      </li>
                    ))}
                  </UList>
                </Collapse>
              </li>
              <li>
                <Anchor
                  as="button"
                  onClick={() => setDocsOpen((bool) => !bool)}
                  sx={{ justifyContent: 'space-between' }}
                >
                  Docs
                  <KeyboardArrowDownRounded
                    color="primary"
                    sx={{
                      transition: '0.3s',
                      transform: docsOpen ? 'rotate(-180deg)' : 'rotate(0)',
                    }}
                  />
                </Anchor>
                <Collapse in={docsOpen}>
                  <UList>
                    {DOCS.map((item) => (
                      <li key={item.name}>
                        <Anchor
                          href={item.href}
                          as={Link}
                          noLinkStyle
                          sx={{ flexDirection: 'column', alignItems: 'initial' }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}
                          >
                            {item.name}
                          </Box>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {item.description}
                          </Typography>
                        </Anchor>
                      </li>
                    ))}
                  </UList>
                </Collapse>
              </li>
              <li>
                <Anchor href={ROUTES.pricing} as={Link} noLinkStyle>
                  Pricing
                </Anchor>
              </li>
              <li>
                <Anchor href={ROUTES.about} as={Link} noLinkStyle>
                  About us
                </Anchor>
              </li>
              <li>
                <Anchor href={ROUTES.blog} as={Link} noLinkStyle>
                  Blog
                </Anchor>
              </li>
            </UList>
          </Box>
        </Collapse>
      </ClickAwayListener>
    </React.Fragment>
  );
}
