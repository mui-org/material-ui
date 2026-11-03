'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import debounce from '@mui/utils/debounce';
import useForkRef from '@mui/utils/useForkRef';
import useEnhancedEffect from '@mui/utils/useEnhancedEffect';
import useEventCallback from '@mui/utils/useEventCallback';
import ownerWindow from '@mui/utils/ownerWindow';
import type { TextareaAutosizeProps } from './TextareaAutosize.types';

function getStyleValue(value: string) {
  return parseInt(value, 10) || 0;
}

const styles: {
  shadow: React.CSSProperties;
} = {
  shadow: {
    // Visibility needed to hide the extra text area on iPads
    visibility: 'hidden',
    // Remove from the content flow
    position: 'absolute',
    // Ignore the scrollbar width
    overflow: 'hidden',
    height: 0,
    top: 0,
    left: 0,
    // Create a new layer, increase the isolation of the computed values
    transform: 'translateZ(0)',
  },
};

type TextareaStyles = {
  outerHeightStyle: number;
  overflowing: boolean;
};

function isObjectEmpty(object: TextareaStyles) {
  // eslint-disable-next-line
  for (const _ in object) {
    return false;
  }
  return true;
}

function isEmpty(obj: TextareaStyles) {
  return isObjectEmpty(obj) || (obj.outerHeightStyle === 0 && !obj.overflowing);
}

/**
 *
 * Demos:
 *
 * - [Textarea Autosize](https://next.mui.com/material-ui/react-textarea-autosize/)
 *
 * API:
 *
 * - [TextareaAutosize API](https://next.mui.com/material-ui/api/textarea-autosize/)
 */
const TextareaAutosize = React.forwardRef(function TextareaAutosize(
  props: TextareaAutosizeProps,
  forwardedRef: React.ForwardedRef<Element>,
) {
  const { onChange, maxRows, minRows = 1, style, value, ...other } = props;

  const { current: isControlled } = React.useRef(value != null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const handleRef = useForkRef(forwardedRef, textareaRef);
  const heightRef = React.useRef<number>(null);
  const hiddenTextareaRef = React.useRef<HTMLTextAreaElement>(null);

  const calculateTextareaStyles = React.useCallback(() => {
    const textarea = textareaRef.current;
    const hiddenTextarea = hiddenTextareaRef.current;

    if (!textarea || !hiddenTextarea) {
      return undefined;
    }

    const containerWindow = ownerWindow(textarea);
    const computedStyle = containerWindow.getComputedStyle(textarea);

    // If input's width is shrunk and it's not visible, don't sync height.
    if (computedStyle.width === '0px') {
      return {
        outerHeightStyle: 0,
        overflowing: false,
      };
    }

    hiddenTextarea.style.width = computedStyle.width;
    hiddenTextarea.value = textarea.value || props.placeholder || 'x';
    if (hiddenTextarea.value.slice(-1) === '\n') {
      // Certain fonts which overflow the line height will cause the textarea
      // to report a different scrollHeight depending on whether the last line
      // is empty. Make it non-empty to avoid this issue.
      hiddenTextarea.value += ' ';
    }

    const boxSizing = computedStyle.boxSizing;
    const padding =
      getStyleValue(computedStyle.paddingBottom) + getStyleValue(computedStyle.paddingTop);
    const border =
      getStyleValue(computedStyle.borderBottomWidth) + getStyleValue(computedStyle.borderTopWidth);

    // The height of the inner content
    const innerHeight = hiddenTextarea.scrollHeight;

    // Measure height of a textarea with a single row
    hiddenTextarea.value = 'x';
    const singleRowHeight = hiddenTextarea.scrollHeight;

    // The height of the outer content
    let outerHeight = innerHeight;

    if (minRows) {
      outerHeight = Math.max(Number(minRows) * singleRowHeight, outerHeight);
    }
    if (maxRows) {
      outerHeight = Math.min(Number(maxRows) * singleRowHeight, outerHeight);
    }
    outerHeight = Math.max(outerHeight, singleRowHeight);

    // Take the box sizing into account for applying this value as a style.
    const outerHeightStyle = outerHeight + (boxSizing === 'border-box' ? padding + border : 0);
    const overflowing = Math.abs(outerHeight - innerHeight) <= 1;

    return { outerHeightStyle, overflowing };
  }, [maxRows, minRows, props.placeholder]);

  const didHeightChange = useEventCallback(() => {
    const textarea = textareaRef.current;
    const textareaStyles = calculateTextareaStyles();

    if (!textarea || !textareaStyles || isEmpty(textareaStyles)) {
      return false;
    }

    const outerHeightStyle = textareaStyles.outerHeightStyle;

    return heightRef.current != null && heightRef.current !== outerHeightStyle;
  });

  const syncHeight = React.useCallback(() => {
    const textarea = textareaRef.current;
    const textareaStyles = calculateTextareaStyles();

    if (!textarea || !textareaStyles || isEmpty(textareaStyles)) {
      return;
    }

    const outerHeightStyle = textareaStyles.outerHeightStyle;
    if (heightRef.current !== outerHeightStyle) {
      heightRef.current = outerHeightStyle;
      textarea.style.height = `${outerHeightStyle}px`;
    }
    textarea.style.overflow = textareaStyles.overflowing ? 'hidden' : '';
  }, [calculateTextareaStyles]);

  const frameRef = React.useRef(-1);

  useEnhancedEffect(() => {
    const debouncedHandleResize = debounce(syncHeight);
    const textarea = textareaRef?.current;

    if (!textarea) {
      return undefined;
    }

    const containerWindow = ownerWindow(textarea);

    containerWindow.addEventListener('resize', debouncedHandleResize);

    let resizeObserver: ResizeObserver;

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        if (didHeightChange()) {
          // avoid "ResizeObserver loop completed with undelivered notifications" error
          // by temporarily unobserving the textarea element while manipulating the height
          // and reobserving one frame later
          resizeObserver.unobserve(textarea);
          cancelAnimationFrame(frameRef.current);
          syncHeight();
          frameRef.current = requestAnimationFrame(() => {
            resizeObserver.observe(textarea);
          });
        }
      });
      resizeObserver.observe(textarea);
    }

    return () => {
      debouncedHandleResize.clear();
      cancelAnimationFrame(frameRef.current);
      containerWindow.removeEventListener('resize', debouncedHandleResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [calculateTextareaStyles, syncHeight, didHeightChange]);

  useEnhancedEffect(() => {
    syncHeight();
  });

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isControlled) {
      syncHeight();
    }

    const textarea = event.target;
    const countOfCharacters = textarea.value.length;
    const isLastCharacterNewLine = textarea.value.endsWith('\n');
    const isEndOfTheLine = textarea.selectionStart === countOfCharacters;

    // Set the cursor position to the very end of the text.
    if (isLastCharacterNewLine && isEndOfTheLine) {
      textarea.setSelectionRange(countOfCharacters, countOfCharacters);
    }

    if (onChange) {
      onChange(event);
    }
  };

  return (
    <React.Fragment>
      <textarea
        value={value}
        onChange={handleChange}
        ref={handleRef}
        // Apply the rows prop to get a "correct" first SSR paint
        rows={minRows as number}
        style={style}
        {...other}
      />
      <textarea
        aria-hidden
        className={props.className}
        readOnly
        ref={hiddenTextareaRef}
        tabIndex={-1}
        style={{
          ...styles.shadow,
          ...style,
          paddingTop: 0,
          paddingBottom: 0,
        }}
      />
    </React.Fragment>
  );
}) as React.ForwardRefExoticComponent<TextareaAutosizeProps & React.RefAttributes<Element>>;

TextareaAutosize.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Maximum number of rows to display.
   */
  maxRows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Minimum number of rows to display.
   * @default 1
   */
  minRows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * @ignore
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  placeholder: PropTypes.string,
  /**
   * @ignore
   */
  style: PropTypes.object,
  /**
   * @ignore
   */
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.number,
    PropTypes.string,
  ]),
} as any;

export default TextareaAutosize;
