import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    // private from react. | state never changes
    this._shades = this.gatherShades(this.props.palette, this.props.colorId);

    this.state = { format: 'hex' };
    this.changeFormat = this.changeFormat.bind(this);
  }
  changeFormat(value) {
    this.setState({ format: value });
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
    const { format } = this.state;
    // const {} = this.props.palette
    // create colorBoxes
    const colorBoxes = this._shades.map(color => (
      <ColorBox key={color.name} name={color.name} background={color[format]} showLink={false} />
    ));
    return (
      <div className="Palette">
        <Navbar handleChange={this.changeFormat} showingAllColors={false} />
        <div className="Palette-colors">{colorBoxes}</div>
        <PaletteFooter {...this.props.palette} />
      </div>
    );
  }
}

export default SingleColorPalette;
