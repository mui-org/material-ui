import * as React from 'react';
import { styled } from '@material-ui/system';
import { SwitchUnstyled, switchUnstyledClasses } from '@material-ui/unstyled';

const Root = styled('span')(`
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 32px;
  height: 20px;
  background: #B3C3D3;
  border-radius: 10px;
  margin: 10px;
  cursor: pointer;

  &.${switchUnstyledClasses.disabled} {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &.${switchUnstyledClasses.checked} {
    background: #007FFF;
  }
`);

const Thumb = styled('span')(`
  display: block;
  width: 14px;
  height: 14px;
  top: 3px;
  left: 3px;
  border-radius: 16px;
  background-color: #FFF;
  position: relative;
  transition: all 200ms ease;

  .${switchUnstyledClasses.focusVisible} & {
    background-color: rgba(255,255,255,1);
    box-shadow: 0 0 1px 8px rgba(0,0,0,0.25);
  }

  .${switchUnstyledClasses.checked} & {
    left: 14px;
    top: 3px;
    background-color: #FFF;
  }
`);

const Input = styled('input')(`
  cursor: inherit;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 1;
  margin: 0;
`);

export default function StylingSlots() {
  return <SwitchUnstyled components={{ Root, Thumb, Input }} />;
}
