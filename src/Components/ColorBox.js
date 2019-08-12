import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ColorBox.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import chroma from 'chroma-js';
import { withStyles } from '@material-ui/styles';

// withStyles wrpped into HOC
const styles = {
  ColorBox: {
    width: '20%',
    height: props => (props.showingFullPalette ? '25%' : '50%'),
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-3.5px',
    '&:hover button': {
      opacity: '1'
    }
  },
  copyText: {
    color: props => (chroma.contrast(props.background, 'black') < 6 ? 'rgba(0,0,0,0.6)' : 'white')
  },
  colorName: {
    color: props => (chroma.contrast(props.background, 'black') < 6 ? 'white' : 'rgba(0,0,0,0.6)')
  },
  seeMore: {
    background: 'rgba(255, 255, 255, 0.3)',
    position: 'absolute',
    border: 'none',
    right: '0',
    bottom: '0',
    color: props => (chroma.contrast(props.background, 'black') < 6 ? 'white' : 'rgba(0,0,0,0.6)'),
    width: '60px',
    height: '30px',
    textAlign: 'center',
    lineHeight: '30px',
    textTransform: 'uppercase'
  },
  copyButton: {
    width: '100px',
    height: '30px',
    position: 'absolute',
    display: 'inline-block',
    top: '50%',
    left: '50%',
    marginLeft: '-50px',
    marginTop: '-15px',
    textAlign: 'center',
    outline: 'none',
    background: 'rgba(255, 255, 255, 0.3)',
    fontSize: '1rem',
    lineHeight: '30px',
    color: props => (chroma.contrast(props.background, 'black') < 6 ? 'white' : 'rgba(0,0,0,0.6)'),
    textTransform: 'uppercase',
    border: 'none',
    opacity: '0'
  }
};

class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = { copied: false };
    this.changeCopyState = this.changeCopyState.bind(this);
  }
  changeCopyState() {
    // console.log('test');
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1500);
    });
  }
  render() {
    const { name, background, moreUrl, showingFullPalette, classes } = this.props;
    const { copied } = this.state;
    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div style={{ background }} className={classes.ColorBox}>
          {/* overlay to cover whole screen on copy */}
          <div style={{ background }} className={`copy-overlay ${copied && 'show'}`} />
          {/* overlay finished animation */}
          <div className={`copy-message ${copied && 'show'}`}>
            <h1>Copied!</h1>
            <p className={classes.copyText}> {background}</p>
          </div>
          <div className="copy-container">
            <div className="box-content">
              <span className={classes.colorName}> {name}</span>
            </div>
            <button className={classes.copyButton}>Copy</button>
            {/* url as prop from parent */}
            {/* <Link to={`/palette/${paletteId}/${id}`} onClick={e => e.stopPropagation()}> */}
            {/* show MORE link on colorbox */}
            {showingFullPalette && (
              <Link to={moreUrl} onClick={e => e.stopPropagation()}>
                <span className={classes.seeMore}> MORE </span>
              </Link>
            )}
          </div>
        </div>
      </CopyToClipboard>
    );
  }
}

export default withStyles(styles)(ColorBox);
