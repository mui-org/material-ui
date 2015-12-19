import React from 'react';
import StylePropable from './mixins/style-propable';
import AutoPrefix from './styles/auto-prefix';
import muiThemeable from './muiThemeable';

/**
 *  BeforeAfterWrapper
 *    An alternative for the ::before and ::after css pseudo-elements for
 *    components whose styles are defined in javascript instead of css.
 *
 *  Usage: For the element that we want to apply before and after elements to,
 *    wrap its children with BeforeAfterWrapper. For example:
 *
 *                                            <Paper>
 *  <Paper>                                     <div> // See notice
 *    <BeforeAfterWrapper>        renders         <div/> // before element
 *      [children of paper]       ------>         [children of paper]
 *    </BeforeAfterWrapper>                       <div/> // after element
 *  </Paper>                                    </div>
 *                                            </Paper>
 *
 *  Notice: Notice that this div bundles together our elements. If the element
 *    that we want to apply before and after elements is a HTML tag (i.e. a
 *    div, p, or button tag), we can avoid this extra nesting by passing using
 *    the BeforeAfterWrapper in place of said tag like so:
 *
 *  <p>
 *    <BeforeAfterWrapper>   do this instead   <BeforeAfterWrapper elementType='p'>
 *      [children of p]          ------>         [children of p]
 *    </BeforeAfterWrapper>                    </BeforeAfterWrapper>
 *  </p>
 *
 *  BeforeAfterWrapper features spread functionality. This means that we can
 *  pass HTML tag properties directly into the BeforeAfterWrapper tag.
 *
 *  When using BeforeAfterWrapper, ensure that the parent of the beforeElement
 *  and afterElement have a defined style position.
 */

let BeforeAfterWrapper = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    /**
     * The MUI Theme to use to render this component with.
     */
    _muiTheme: React.PropTypes.object.isRequired,

    afterElementType: React.PropTypes.string,
    afterStyle: React.PropTypes.object,
    beforeElementType: React.PropTypes.string,
    beforeStyle: React.PropTypes.object,
    children: React.PropTypes.node,
    elementType: React.PropTypes.string,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      beforeElementType: 'div',
      afterElementType: 'div',
      elementType: 'div',
    };
  },

  render() {
    let {
      beforeStyle,
      afterStyle,
      beforeElementType,
      afterElementType,
      elementType,
      ...other,
    } = this.props;

    let beforeElement, afterElement;

    beforeStyle = AutoPrefix.all({boxSizing: 'border-box'});
    afterStyle = AutoPrefix.all({boxSizing: 'border-box'});

    if (this.props.beforeStyle) beforeElement =
      React.createElement(this.props.beforeElementType,
        {
          style: this.prepareStyles(beforeStyle, this.props.beforeStyle),
          key: '::before',
        });
    if (this.props.afterStyle) afterElement =
      React.createElement(this.props.afterElementType,
        {
          style: this.prepareStyles(afterStyle, this.props.afterStyle),
          key: '::after',
        });

    let children = [beforeElement, this.props.children, afterElement];

    let props = other;
    props.style = this.prepareStyles(this.props.style);

    return React.createElement(this.props.elementType, props, children);
  },

});

BeforeAfterWrapper = muiThemeable(BeforeAfterWrapper);

export default BeforeAfterWrapper;
