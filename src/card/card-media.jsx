import React from 'react';
import Styles from '../styles';
import StylePropable from '../mixins/style-propable';
import muiThemeable from '../muiThemeable';

let CardMedia = React.createClass({

  mixins: [
    StylePropable,
  ],

  propTypes: {
    /**
     * The MUI Theme to use to render this component with.
     */
    _muiTheme: React.PropTypes.object.isRequired,

    actAsExpander: React.PropTypes.bool,
    children: React.PropTypes.node,
    expandable: React.PropTypes.bool,
    mediaStyle: React.PropTypes.object,
    overlay: React.PropTypes.node,
    overlayContainerStyle: React.PropTypes.object,
    overlayContentStyle: React.PropTypes.object,
    overlayStyle: React.PropTypes.object,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
  },

  getStyles() {
    return {
      root: {
        position: 'relative',
      },
      overlayContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
      },
      overlay: {
        height: '100%',
        position: 'relative',
      },
      overlayContent: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        paddingTop: 8,
        background: Styles.Colors.lightBlack,
      },
      media: {},
      mediaChild: {
        verticalAlign: 'top',
        maxWidth: '100%',
        minWidth: '100%',
        width: '100%',
      },
    };
  },

  render() {
    let styles = this.getStyles();
    let rootStyle = this.prepareStyles(styles.root, this.props.style);
    let mediaStyle = this.prepareStyles(styles.media, this.props.mediaStyle);
    let overlayContainerStyle = this.prepareStyles(styles.overlayContainer, this.props.overlayContainerStyle);
    let overlayContentStyle = this.prepareStyles(styles.overlayContent, this.props.overlayContentStyle);
    let overlayStyle = this.prepareStyles(styles.overlay, this.props.overlayStyle);

    let children = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {style: this.prepareStyles(styles.mediaChild, child.props.style)});
    });

    let overlayChildren = React.Children.map(this.props.overlay, (child) => {
      if (child.type.displayName === 'CardHeader' || child.type.displayName === 'CardTitle') {
        return React.cloneElement(child, {
          titleColor: Styles.Colors.darkWhite,
          subtitleColor: Styles.Colors.lightWhite,
        });
      }
      else if (child.type.displayName === 'CardText') {
        return React.cloneElement(child, {
          color: Styles.Colors.darkWhite,
        });
      }
      else {
        return child;
      }
    });

    return (
      <div {...this.props} style={rootStyle}>
        <div style={mediaStyle}>
          {children}
        </div>
        {(this.props.overlay) ?
          <div style={overlayContainerStyle}>
            <div style={overlayStyle}>
              <div style={overlayContentStyle}>
                {overlayChildren}
              </div>
            </div>
          </div> : ''}
      </div>
    );
  },
});

CardMedia = muiThemeable(CardMedia);

export default CardMedia;
