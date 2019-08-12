import React, { Component } from 'react';
import ColorBox from './ColorBox';

class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    // private from react. | state never changes
    this._shades = this.gatherShades(this.props.palette, this.props.colorId);
  }
  gatherShades(palette, colorToFilterBy) {
    let shades = [];
    let allColors = palette.colors;
    console.log(allColors);
    for (let key in allColors) {
      shades = shades.concat(allColors[key].filter(color => color.id === colorToFilterBy));
    }

    // return all shades of given color | removing 0 index which is remnent of olor hue/alpha algo
    return shades.slice(1);
  }
  render() {
    // create colorBoxes
    const colorBoxes = this._shades.map(color => (
      <ColorBox key={color.id} name={color.name} background={color.hex} showLink={false} />
    ));
    return (
      <div className="Palette">
        <h1>Single color palette</h1>;
        <div className="Palette-colors">{colorBoxes}</div>
      </div>
    );
  }
}

export default SingleColorPalette;
