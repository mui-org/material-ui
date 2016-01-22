import React, {Component, PropTypes} from 'react'; // eslint-disable-line no-unused-vars

class SimpleSlidein extends Component {
  render() {
    const {slideinState, hideSlidein, header, content} = this.props;

    return (
      <section className={'simple-popup slidein-right ' + slideinState}>
        <div className="take-over-wrapper">
          <div className="content-wrapper">
          	<button className="button-close black" onClick={hideSlidein}></button>
          	<h2 className="popup-header">{header}</h2>
            <div>{content}</div>
        		<div className="clear"></div>
          </div>
        </div>
      </section>
    );
  }
}

SimpleSlidein.propTypes = {
  header: PropTypes.string,
  content: PropTypes.object.isRequired,
  slideinState: PropTypes.string.isRequired,
  hideSlidein: PropTypes.func.isRequired
};

SimpleSlidein.contextTypes = {
  muiTheme: React.PropTypes.object
};

export default SimpleSlidein;
