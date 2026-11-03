import * as React from 'react';
import dynamic from 'next/dynamic';
import type { Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconImage from '@mui/internal-core-docs/IconImage';
import { Highlighter } from '@mui/internal-core-docs/AppLayout';
import { MuiLogomarkIcon } from '@mui/internal-core-docs/svgIcons';

const SwipeableViews = dynamic(() => import('react-swipeable-views'), { ssr: false });

function ProductItem({
  icon,
  name,
  description,
  chip,
}: {
  icon: React.ReactNode;
  name: React.ReactNode;
  description: React.ReactNode;
  chip?: React.ReactNode;
}) {
  return (
    <Box
      component="span"
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box
        component="span"
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { md: 'center' },
          gap: 2.5,
        }}
      >
        <Box
          component="span"
          sx={{
            height: 32,
            width: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>
        <span>
          <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              component="span"
              variant="body2"
              sx={{ color: 'text.primary', fontWeight: 'semiBold' }}
            >
              {name}
            </Typography>
            {chip}
          </Box>
          <Typography
            component="span"
            variant="body2"
            sx={{ color: 'text.secondary', fontWeight: 'regular', my: 0.5 }}
          >
            {description}
          </Typography>
        </span>
      </Box>
    </Box>
  );
}

export default function ProductsSwitcher(props: {
  inView?: boolean;
  productIndex: number;
  setProductIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { inView = false, productIndex, setProductIndex } = props;
  const isBelowMd = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const productElements = [
    <ProductItem
      name="Material UI"
      description="Foundational components for shipping features faster."
      icon={<MuiLogomarkIcon height={28} width={28} />}
    />,
    <ProductItem
      name="MUI X"
      description="Advanced components for complex use cases."
      icon={<IconImage name="product-advanced" height={32} width={32} />}
    />,
    <ProductItem
      name="Templates"
      description="Professionally built UIs to jumpstart your next project."
      icon={<IconImage name="product-templates" height={32} width={32} />}
    />,
    <ProductItem
      name="Design kits"
      description="The core components available on your favorite design tool."
      icon={<IconImage name="product-designkits" height={32} width={32} />}
    />,
  ];
  return (
    <React.Fragment>
      <Box
        sx={{
          display: { md: 'none' },
          maxWidth: 'calc(100vw - 40px)',
          minHeight: { xs: 200, sm: 166 },
          '& > div': { pr: '32%' },
        }}
      >
        {isBelowMd && inView && (
          <SwipeableViews
            index={productIndex}
            resistance
            enableMouseEvents
            onChangeIndex={(index) => setProductIndex(index)}
          >
            {productElements.map((elm, index) => (
              <Highlighter
                key={index}
                disableBorder
                onClick={() => setProductIndex(index)}
                selected={productIndex === index}
                sx={{
                  width: '100%',
                  transition: '0.3s',
                  transform: productIndex !== index ? 'scale(0.9)' : 'scale(1)',
                }}
              >
                {elm}
              </Highlighter>
            ))}
          </SwipeableViews>
        )}
      </Box>
      <Stack spacing={1} sx={{ display: { xs: 'none', md: 'flex' }, maxWidth: 500 }}>
        {productElements.map((elm, index) => (
          <Highlighter
            key={index}
            disableBorder
            onClick={() => setProductIndex(index)}
            selected={productIndex === index}
          >
            {elm}
          </Highlighter>
        ))}
      </Stack>
    </React.Fragment>
  );
}
