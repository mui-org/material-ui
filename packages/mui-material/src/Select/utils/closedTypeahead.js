import * as React from 'react';
import areEqualValues from './areEqualValues';

function hasOwnValueProp(child) {
  return Object.prototype.hasOwnProperty.call(child.props, 'value');
}

function getTextFromReactNode(node) {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  let text = '';

  React.Children.forEach(node, (child) => {
    if (typeof child === 'string' || typeof child === 'number') {
      text += String(child);
    } else if (React.isValidElement(child)) {
      text += getTextFromReactNode(child.props.children);
    }
  });

  return text;
}

export function getMatchingOptionIndex(options, search, startIndex = 0) {
  if (options.length === 0) {
    return -1;
  }

  const normalizedStartIndex = ((startIndex % options.length) + options.length) % options.length;

  for (let offset = 0; offset < options.length; offset += 1) {
    const index = (normalizedStartIndex + offset) % options.length;

    if (options[index].label.startsWith(search)) {
      return index;
    }
  }

  return -1;
}

export function canCycleRepeatedCharacter(options, key) {
  return !options.some((option) => option.label[0] === key && option.label[1] === key);
}

export function getTypeaheadOptions(childrenArray, value) {
  const options = [];
  let selectedIndex = -1;

  for (let index = 0; index < childrenArray.length; index += 1) {
    const child = childrenArray[index];

    if (!React.isValidElement(child) || !hasOwnValueProp(child) || child.props.disabled) {
      continue;
    }

    // Closed typeahead cannot exclude CSS-hidden text because no option DOM is mounted.
    const label = getTextFromReactNode(child.props.children).trim().toLowerCase();

    if (label === '') {
      continue;
    }

    if (selectedIndex === -1 && areEqualValues(value, child.props.value)) {
      selectedIndex = options.length;
    }

    options.push({
      child,
      label,
      value: child.props.value,
    });
  }

  return {
    options,
    selectedIndex,
  };
}
