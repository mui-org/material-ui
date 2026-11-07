Component.propTypes = {
  elementOrType: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType]).isRequired,
  nullableElementOrType: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType]),
  optionalElementOrType: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType]),
  slots: PropTypes.shape({
    elementOrType: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType]),
    stringOrElement: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  }),
  stringOrElement: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};
