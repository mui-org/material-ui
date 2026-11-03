Foo.propTypes = {
  bothTypes: (props, propName) => {
    if (props[propName] == null) {
      return new Error(`Prop '${propName}' is required but wasn't specified`);
    }
    if (typeof props[propName] !== 'object' || props[propName].nodeType !== 1) {
      return new Error(`Expected prop '${propName}' to be of type Element`);
    }
    return null;
  },
  element: (props, propName) => {
    if (props[propName] == null) {
      return new Error(`Prop '${propName}' is required but wasn't specified`);
    }
    if (typeof props[propName] !== 'object' || props[propName].nodeType !== 1) {
      return new Error(`Expected prop '${propName}' to be of type Element`);
    }
    return null;
  },
  htmlElement: (props, propName) => {
    if (props[propName] == null) {
      return new Error(`Prop '${propName}' is required but wasn't specified`);
    }
    if (typeof props[propName] !== 'object' || props[propName].nodeType !== 1) {
      return new Error(`Expected prop '${propName}' to be of type Element`);
    }
    return null;
  },
  optional: (props, propName) => {
    if (props[propName] == null) {
      return null;
    }
    if (typeof props[propName] !== 'object' || props[propName].nodeType !== 1) {
      return new Error(`Expected prop '${propName}' to be of type Element`);
    }
    return null;
  },
};
