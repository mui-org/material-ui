'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import type { SliderValueLabelProps } from './SliderValueLabel.types';
import sliderClasses from './sliderClasses';

const useValueLabelClasses = (props: SliderValueLabelProps) => {
  const { open } = props;

  const utilityClasses = {
    offset: clsx({
      [sliderClasses.valueLabelOpen]: open,
    }),
    circle: sliderClasses.valueLabelCircle,
    label: sliderClasses.valueLabelLabel,
  };

  return utilityClasses;
};

/**
 * @ignore - internal component.
 */
export default function SliderValueLabel(props: SliderValueLabelProps) {
  const { children, className, value } = props;
  const classes = useValueLabelClasses(props);

  if (!children) {
    return null;
  }

  return React.cloneElement(
    children,
    {
      className: children.props.className,
    },
    <React.Fragment>
      {children.props.children}
      <span className={clsx(classes.offset, className)} aria-hidden>
        <span className={classes.circle}>
          <span className={classes.label}>{value}</span>
        </span>
      </span>
    </React.Fragment>,
  );
}

SliderValueLabel.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
  value: PropTypes.node,
} as any;
