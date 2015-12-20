import React from 'react';
import ReactDOM from 'react-dom';
import Dom from './utils/dom';
import muiThemeable from './muiThemeable';

// heavily inspired by https://github.com/Khan/react-components/blob/master/js/layered-component-mixin.jsx
let RenderToLayer = React.createClass({

  propTypes: {
    /**
     * The MUI Theme to use to render this component with.
     */
    _muiTheme: React.PropTypes.object.isRequired,

    componentClickAway: React.PropTypes.func,
    open: React.PropTypes.bool.isRequired,
    render: React.PropTypes.func.isRequired,
    useLayerForClickAway: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      useLayerForClickAway: true,
    };
  },

  componentDidMount() {
    this._renderLayer();
  },

  componentDidUpdate() {
    this._renderLayer();
  },

  componentWillUnmount() {
    if (this._layer) {
      this._unrenderLayer();
    }
  },

  onClickAway(event) {
    if (event.defaultPrevented) {
      return;
    }

    if (!this.props.componentClickAway) {
      return;
    }

    if (!this.props.open) {
      return;
    }

    const el = this._layer;
    if (event.target !== el && (event.target === window)
        || (document.documentElement.contains(event.target) && !Dom.isDescendant(el, event.target))) {
      this.props.componentClickAway(event);
    }
  },

  getLayer() {
    return this._layer;
  },

  render() {
    return null;
  },

  _renderLayer() {
    const {
      open,
      render,
    } = this.props;

    if (open) {
      if (!this._layer) {
        this._layer = document.createElement('div');
        document.body.appendChild(this._layer);

        if (this.props.useLayerForClickAway) {
          this._layer.addEventListener('touchstart', this.onClickAway);
          this._layer.addEventListener('click', this.onClickAway);
          this._layer.style.position = 'fixed';
          this._layer.style.top = 0;
          this._layer.style.bottom = 0;
          this._layer.style.left = 0;
          this._layer.style.right = 0;
          this._layer.style.zIndex = this.props._muiTheme.zIndex.layer;
        } else {
          setTimeout(() => {
            window.addEventListener('touchstart', this.onClickAway);
            window.addEventListener('click', this.onClickAway);
          }, 0);
        }
      }

      // By calling this method in componentDidMount() and
      // componentDidUpdate(), you're effectively creating a "wormhole" that
      // funnels React's hierarchical updates through to a DOM node on an
      // entirely different part of the page.

      const layerElement = render();

      if (layerElement === null) {
        this.layerElement = ReactDOM.unstable_renderSubtreeIntoContainer(this, null, this._layer);
      } else {
        this.layerElement = ReactDOM.unstable_renderSubtreeIntoContainer(this, layerElement, this._layer);
      }
    } else {
      if (this._layer) {
        if (this.props.useLayerForClickAway) {
          this._layer.style.position = 'relative';
          this._layer.removeEventListener('touchstart', this.onClickAway);
          this._layer.removeEventListener('click', this.onClickAway);
        } else {
          window.removeEventListener('touchstart', this.onClickAway);
          window.removeEventListener('click', this.onClickAway);
        }

        this._unrenderLayer();
      }
    }
  },

  _unrenderLayer: function() {
    ReactDOM.unmountComponentAtNode(this._layer);
    document.body.removeChild(this._layer);
    this._layer = null;
  },

});

RenderToLayer = muiThemeable(RenderToLayer);

export default RenderToLayer;
