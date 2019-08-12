import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ColorBox.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import chroma from 'chroma-js';
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
    const { name, background, moreUrl, showLink } = this.props;
    const { copied } = this.state;
    const onDarkContrast = chroma.contrast(background, 'black') < 6;
    const onLightContrast = chroma.contrast(background, 'black') >= 6;
    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div style={{ background }} className="ColorBox">
          {/* overlay to cover whole screen on copy */}
          <div style={{ background }} className={`copy-overlay ${copied && 'show'}`} />
          {/* overlay finished animation */}
          <div className={`copy-message ${copied && 'show'}`}>
            <h1>Copied!</h1>
            <p className={`${onLightContrast && 'dark-text'}`}> {background}</p>
          </div>
          <div className="copy-container">
            <div className="box-content">
              <span className={`${onDarkContrast && 'light-text'}`}> {name}</span>
            </div>
            <button className={`copy-button  ${onLightContrast && 'dark-text'}`}>Copy</button>
            {/* url as prop from parent */}
            {/* <Link to={`/palette/${paletteId}/${id}`} onClick={e => e.stopPropagation()}> */}
            {/* show MORE link on colorbox */}
            {showLink && (
              <Link to={moreUrl} onClick={e => e.stopPropagation()}>
                <span className={`see-more ${onLightContrast && 'dark-text'}`}> MORE </span>
              </Link>
            )}
          </div>
        </div>
      </CopyToClipboard>
    );
  }
}

export default ColorBox;
