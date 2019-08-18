import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { withStyles } from '@material-ui/styles';
import styles from './styles/ColorBoxStyles';
import clsx from 'clsx';

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
          {/* same as clsx -> className={`${classes.copyOverlay} ${copied && classes.showOverlay}`} */}
          <div style={{ background }} className={clsx(classes.copyOverlay, { [classes.showOverlay]: copied })} />

          {/* overlay finished animation */}
          {/* <div className={`${classes.copyMessage} ${copied && classes.showMessage}`}> */}
          <div className={clsx(classes.copyMessage, { [classes.showMessage]: copied })}>
            <h1>Copied!</h1>
            <p className={classes.copyText}> {background}</p>
          </div>
          <div>
            <div className={classes.boxContent}>
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
