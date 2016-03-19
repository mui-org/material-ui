import React from 'react';
import ReactDOM from 'react-dom';
import Dom from './utils/dom';
import getMuiTheme from './styles/getMuiTheme';
import WindowListenable from './mixins/window-listenable';
import throttle from 'lodash.throttle';

// heavily inspired by https://github.com/Khan/react-components/blob/master/js/layered-component-mixin.jsx
const RenderToLayer = React.createClass({

  propTypes: {
    componentClickAway: React.PropTypes.func,
    open: React.PropTypes.bool.isRequired,
    render: React.PropTypes.func.isRequired,
    useLayerForClickAway: React.PropTypes.bool,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [
    WindowListenable,
  ],

  getDefaultProps() {
    return {
      useLayerForClickAway: true,
    };
  },

  getInitialState() {
    this._renderLayerThrottled = throttle(this._renderLayer, 100);
    return {
      muiTheme: this.context.muiTheme || getMuiTheme(),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentDidMount() {
    this._renderLayer();
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    const newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({
      muiTheme: newMuiTheme,
    });
  },

  componentDidUpdate() {
    this._renderLayer();
  },

  componentWillUnmount() {
    this._unrenderLayer();
  },

  windowListeners: {
    resize: '_renderLayerThrottled',
    scroll: '_renderLayerThrottled',
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
    if (event.target !== el && event.target === window ||
      (document.documentElement.contains(event.target) && !Dom.isDescendant(el, event.target))) {
      this.props.componentClickAway(event);
    }
  },

  getLayer() {
    return this._layer;
  },

  _unrenderLayer: function() {
    if (!this._layer) {
      return;
    }

    if (this.props.useLayerForClickAway) {
      this._layer.style.position = 'relative';
      this._layer.removeEventListener('touchstart', this.onClickAway);
      this._layer.removeEventListener('click', this.onClickAway);
    } else {
      window.removeEventListener('touchstart', this.onClickAway);
      window.removeEventListener('click', this.onClickAway);
    }

    ReactDOM.unmountComponentAtNode(this._layer);
    document.body.removeChild(this._layer);
    this._layer = null;
  },

  _renderLayer() {
    const {
      open,
      render,
    } = this.props;

    if (open) {
      if (!this._layer) {
        this._layer = document.createElement('div');
        this._layer.style.position = 'absolute';
        document.body.appendChild(this._layer);

        if (this.props.useLayerForClickAway) {
          this._layer.addEventListener('touchstart', this.onClickAway);
          this._layer.addEventListener('click', this.onClickAway);
          this._layer.style.zIndex = this.state.muiTheme.zIndex.layer;
        } else {
          setTimeout(() => {
            window.addEventListener('touchstart', this.onClickAway);
            window.addEventListener('click', this.onClickAway);
          }, 0);
        }
      }
      const {documentElement, body} = document;
      const top = window.pageYOffset || documentElement.scrollTop || body.scrollTop || 0;
      const left = window.pageXOffset || documentElement.scrollLeft || body.scrollLeft || 0;

      this._layer.style.top = `${top}px`;
      this._layer.style.height = `${body.clientHeight}px`;
      this._layer.style.left = `${left}px`;
      this._layer.style.width = `${body.clientWidth}px`;
      
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
      this._unrenderLayer();
    }
  },

  render() {
    return null;
  },

});

export default RenderToLayer;
