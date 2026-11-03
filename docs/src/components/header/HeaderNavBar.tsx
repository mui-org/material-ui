/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import { unstable_debounce as debounce } from '@mui/utils';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import IconImage from '@mui/internal-core-docs/IconImage';
import { ROUTES } from '@mui/internal-core-docs/constants';
import { Link } from '@mui/internal-core-docs/Link';
import { MuiProductSelector } from '@mui/internal-core-docs/AppLayout';

const Navigation = styled('nav')(({ theme }) => [
  {
    '& > div': {
      cursor: 'default',
    },
    '& ul': {
      padding: 0,
      margin: 0,
      listStyle: 'none',
      display: 'flex',
    },
    '& li': {
      ...theme.typography.body2,
      color: (theme.vars || theme).palette.text.secondary,
      fontWeight: theme.typography.fontWeightSemiBold,
      '& > a, & > button': {
        display: 'inline-block',
        color: 'inherit',
        font: 'inherit',
        textDecoration: 'none',
        padding: theme.spacing('6px', '8px'),
        borderRadius: (theme.vars || theme).shape.borderRadius,
        border: '1px solid transparent',
        '&:hover': {
          color: (theme.vars || theme).palette.text.primary,
          backgroundColor: (theme.vars || theme).palette.grey[50],
          borderColor: (theme.vars || theme).palette.grey[100],
          '@media (hover: none)': {
            backgroundColor: 'initial',
            // Reset on touch devices, it doesn't add specificity
          },
        },
        '&:focus-visible': {
          outline: `3px solid ${alpha(theme.palette.primary[500], 0.5)}`,
          outlineOffset: '2px',
        },
      },
    },
  },
  theme.applyDarkStyles({
    '& li': {
      '& > a, & > button': {
        '&:hover': {
          color: (theme.vars || theme).palette.primary[50],
          backgroundColor: alpha(theme.palette.primaryDark[700], 0.8),
          borderColor: (theme.vars || theme).palette.divider,
        },
      },
    },
  }),
]);

const PRODUCT_IDS = [
  'product-core',
  'product-advanced',
  'product-templates',
  'product-design',
] as const;

type ProductSubMenuProps = {
  icon: React.ReactElement<unknown>;
  name: React.ReactNode;
  description: React.ReactNode;
  chip?: React.ReactNode;
  href: string;
} & Omit<React.JSX.IntrinsicElements['a'], 'ref'>;

const ProductSubMenu = React.forwardRef<HTMLAnchorElement, ProductSubMenuProps>(
  function ProductSubMenu({ icon, name, description, chip, href, ...props }, ref) {
    return (
      <Box
        component={Link}
        href={href}
        ref={ref}
        sx={(theme) => ({
          display: 'flex',
          alignItems: 'center',
          py: 2,
          pr: 3,
          '&:hover, &:focus': {
            backgroundColor: (theme.vars || theme).palette.grey[50],
            outline: 0,
            '@media (hover: none)': {
              backgroundColor: 'initial',
              outline: 'initial',
            },
          },
          ...theme.applyDarkStyles({
            '&:hover, &:focus': {
              backgroundColor: alpha(theme.palette.primaryDark[700], 0.4),
            },
          }),
        })}
        {...props}
      >
        <Box sx={{ px: 2 }}>{icon}</Box>
        <div style={{ flexGrow: 1 }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 'bold' }}>
              {name}
            </Typography>
            {chip}
          </div>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {description}
          </Typography>
        </div>
      </Box>
    );
  },
);

export default function HeaderNavBar() {
  const [subMenuOpen, setSubMenuOpen] = React.useState<null | 'products' | 'docs'>(null);
  const [subMenuIndex, setSubMenuIndex] = React.useState<number | null>(null);
  const navRef = React.useRef<HTMLUListElement>(null);
  const productSelectorRef = React.useRef<HTMLDivElement>(null);
  const productsMenuRef = React.useRef<HTMLButtonElement>(null);
  const docsMenuRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (typeof subMenuIndex === 'number' && subMenuOpen === 'products') {
      document.getElementById(PRODUCT_IDS[subMenuIndex])!.focus();
    }

    if (typeof subMenuIndex === 'number' && subMenuOpen === 'docs') {
      (productSelectorRef.current!.querySelector('[role="menuitem"]') as HTMLElement).focus();
    }
  }, [subMenuIndex, subMenuOpen]);

  function handleKeyDown(event: React.KeyboardEvent) {
    let menuItem;

    if (subMenuOpen === 'products') {
      menuItem = productsMenuRef.current!;
    } else if (subMenuOpen === 'docs') {
      menuItem = docsMenuRef.current!;
    } else {
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (subMenuOpen === 'products') {
        setSubMenuIndex((prevValue) => {
          if (prevValue === null) {
            return 0;
          }
          if (prevValue === PRODUCT_IDS.length - 1) {
            return 0;
          }
          return prevValue + 1;
        });
      } else if (subMenuOpen === 'docs') {
        setSubMenuIndex(0);
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (subMenuOpen === 'products') {
        setSubMenuIndex((prevValue) => {
          if (prevValue === null) {
            return 0;
          }
          if (prevValue === 0) {
            return PRODUCT_IDS.length - 1;
          }
          return prevValue - 1;
        });
      } else if (subMenuOpen === 'docs') {
        setSubMenuIndex(0);
      }
    } else if (event.key === 'Escape' || event.key === 'Tab') {
      menuItem.focus();
      setSubMenuOpen(null);
      setSubMenuIndex(null);
    }
  }

  const setSubMenuOpenDebounced = React.useMemo(
    () => debounce(setSubMenuOpen, 40),
    [setSubMenuOpen],
  );

  const setSubMenuOpenUndebounce =
    (value: typeof subMenuOpen) => (event: React.MouseEvent | React.FocusEvent) => {
      setSubMenuOpenDebounced.clear();
      setSubMenuOpen(value);

      if (event.type === 'mouseenter') {
        // Reset keyboard
        setSubMenuIndex(null);
      }
    };

  const handleClickMenu = (value: typeof subMenuOpen) => () => {
    setSubMenuOpenDebounced.clear();
    setSubMenuOpen(subMenuOpen ? null : value);
  };

  React.useEffect(() => {
    return () => {
      setSubMenuOpenDebounced.clear();
    };
  }, [setSubMenuOpenDebounced]);

  return (
    <Navigation>
      <ul ref={navRef} onKeyDown={handleKeyDown}>
        <li
          onMouseEnter={setSubMenuOpenUndebounce('products')}
          onFocus={setSubMenuOpenUndebounce('products')}
          onMouseLeave={() => setSubMenuOpenDebounced(null)}
          onBlur={setSubMenuOpenUndebounce(null)}
        >
          <ButtonBase
            ref={productsMenuRef}
            aria-haspopup
            aria-expanded={subMenuOpen === 'products' ? 'true' : 'false'}
            onClick={handleClickMenu('products')}
            aria-controls={subMenuOpen === 'products' ? 'products-popper' : undefined}
          >
            Products
          </ButtonBase>
          <Popper
            id="products-popper"
            open={subMenuOpen === 'products'}
            anchorEl={productsMenuRef.current}
            transition
            placement="bottom-start"
            style={{
              zIndex: 1200,
              pointerEvents: subMenuOpen === 'products' ? undefined : 'none',
            }}
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={250}>
                <Paper
                  variant="outlined"
                  sx={(theme) => ({
                    mt: 1,
                    minWidth: 498,
                    overflow: 'hidden',
                    borderColor: 'grey.200',
                    bgcolor: 'background.paper',
                    boxShadow: `0px 4px 16px ${alpha(theme.palette.grey[200], 0.8)}`,
                    '& ul': {
                      margin: 0,
                      padding: 0,
                      listStyle: 'none',
                    },
                    '& li:not(:last-of-type)': {
                      borderBottom: '1px solid',
                      borderColor: 'grey.100',
                    },
                    '& a': { textDecoration: 'none' },
                    ...theme.applyDarkStyles({
                      borderColor: 'primaryDark.700',
                      bgcolor: 'primaryDark.900',
                      boxShadow: `0px 4px 16px ${alpha(theme.palette.common.black, 0.8)}`,
                      '& li:not(:last-of-type)': {
                        borderColor: 'primaryDark.700',
                      },
                    }),
                  })}
                >
                  <ul>
                    <li>
                      <ProductSubMenu
                        id={PRODUCT_IDS[0]}
                        href={ROUTES.productCore}
                        icon={<IconImage name="product-core" />}
                        name="MUI Core"
                        description="Ready-to-use foundational React components, free forever."
                      />
                    </li>
                    <li>
                      <ProductSubMenu
                        id={PRODUCT_IDS[1]}
                        href={ROUTES.productAdvanced}
                        icon={<IconImage name="product-advanced" />}
                        name="MUI X"
                        description="Advanced and powerful components for complex use cases."
                      />
                    </li>
                    <li>
                      <ProductSubMenu
                        id={PRODUCT_IDS[2]}
                        href={ROUTES.productTemplates}
                        icon={<IconImage name="product-templates" />}
                        name="Templates"
                        description="Fully built templates for your application."
                      />
                    </li>
                    <li>
                      <ProductSubMenu
                        id={PRODUCT_IDS[3]}
                        href={ROUTES.productDesignKits}
                        icon={<IconImage name="product-designkits" />}
                        name="Design Kits"
                        description="Material UI components in your favorite design tool."
                      />
                    </li>
                  </ul>
                </Paper>
              </Fade>
            )}
          </Popper>
        </li>
        <li
          onMouseEnter={setSubMenuOpenUndebounce('docs')}
          onFocus={setSubMenuOpenUndebounce('docs')}
          onMouseLeave={() => setSubMenuOpenDebounced(null)}
          onBlur={setSubMenuOpenUndebounce(null)}
        >
          <ButtonBase
            ref={docsMenuRef}
            aria-haspopup
            aria-expanded={subMenuOpen === 'docs' ? 'true' : 'false'}
            onClick={handleClickMenu('docs')}
            aria-controls={subMenuOpen === 'docs' ? 'docs-popper' : undefined}
          >
            Docs
          </ButtonBase>
          <Popper
            id="docs-popper"
            open={subMenuOpen === 'docs'}
            anchorEl={docsMenuRef.current}
            transition
            placement="bottom-start"
            style={{ zIndex: 1200, pointerEvents: subMenuOpen === 'docs' ? undefined : 'none' }}
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={250}>
                <Paper
                  variant="outlined"
                  sx={(theme) => ({
                    mt: 1,
                    overflow: 'hidden',
                    borderColor: 'grey.200',
                    bgcolor: 'background.paper',
                    boxShadow: `0px 4px 16px ${alpha(theme.palette.grey[200], 0.8)}`,
                    ...theme.applyDarkStyles({
                      borderColor: 'primaryDark.700',
                      bgcolor: 'primaryDark.900',
                      boxShadow: `0px 4px 16px ${alpha(theme.palette.common.black, 0.8)}`,
                    }),
                  })}
                >
                  <MuiProductSelector ref={productSelectorRef} />
                </Paper>
              </Fade>
            )}
          </Popper>
        </li>
        <li>
          <Link href={ROUTES.pricing}>Pricing</Link>
        </li>
        <li>
          <Link href={ROUTES.about}>About us</Link>
        </li>
        <li>
          <Link href={ROUTES.blog}>Blog</Link>
        </li>
      </ul>
    </Navigation>
  );
}
