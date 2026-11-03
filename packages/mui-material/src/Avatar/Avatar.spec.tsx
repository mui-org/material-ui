import * as React from 'react';
import Avatar from '@mui/material/Avatar';

function SlotPropsImgShouldSupportSx() {
  <Avatar slotProps={{ img: { sx: { objectFit: 'contain' } } }} />;
}

function CustomImg() {
  return <img alt="" />;
}
<Avatar slotProps={{ img: { alt: '' } }} />;
<Avatar slots={{ img: CustomImg }} />;

// Next.js Image component
interface StaticImageData {
  src: string;
  height: number;
  width: number;
  blurDataURL?: string;
  blurWidth?: number;
  blurHeight?: number;
}
interface StaticRequire {
  default: StaticImageData;
}
type StaticImport = StaticRequire | StaticImageData;

type ImageLoaderProps = {
  src: string;
  width: number;
  quality?: number;
};

type ImageLoader = (p: ImageLoaderProps) => string;

type PlaceholderValue = 'blur' | 'empty' | `data:image/${string}`;

type OnLoadingComplete = (img: HTMLImageElement) => void;

declare const Image: React.ForwardRefExoticComponent<
  Omit<
    React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
    'height' | 'width' | 'loading' | 'ref' | 'alt' | 'src' | 'srcSet'
  > & {
    src: string | StaticImport;
    alt: string;
    width?: number | `${number}`;
    height?: number | `${number}`;
    fill?: boolean;
    loader?: ImageLoader;
    quality?: number | `${number}`;
    priority?: boolean;
    loading?: 'eager' | 'lazy' | undefined;
    placeholder?: PlaceholderValue;
    blurDataURL?: string;
    unoptimized?: boolean;
    overrideSrc?: string;
    onLoadingComplete?: OnLoadingComplete;
    layout?: string;
    objectFit?: string;
    objectPosition?: string;
    lazyBoundary?: string;
    lazyRoot?: string;
  } & React.RefAttributes<HTMLImageElement | null>
>;

<Avatar slots={{ img: Image }} />;
