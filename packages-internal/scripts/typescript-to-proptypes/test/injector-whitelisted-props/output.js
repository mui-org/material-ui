import PropTypes from 'prop-types';
function Foo(props) {
  return <div {...props}></div>;
}

Foo.propTypes = {
  className: PropTypes.string.isRequired,
};

export default Foo;
