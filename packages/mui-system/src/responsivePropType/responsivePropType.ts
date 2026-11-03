import PropTypes from 'prop-types';

const responsivePropType: object =
  process.env.NODE_ENV !== 'production'
    ? PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object, PropTypes.array])
    : {};

export default responsivePropType;
