import * as React from 'react';
import PropTypes from 'prop-types';
import HighlightedCode from './HighlightedCode';

const MarkdownCode = React.forwardRef(function MarkdownCode(props) {
  const { language, encodedCode, isCopyButtonEnabled } = props;

  const code = decodeURI(encodedCode);

  return (
    <HighlightedCode language={language} isCopyButtonEnabled={isCopyButtonEnabled} code={code} />
  );
});

MarkdownCode.propTypes = {
  encodedCode: PropTypes.string,
  isCopyButtonEnabled: PropTypes.bool,
  language: PropTypes.string.isRequired,
};

export default MarkdownCode;
