import React, { Component } from 'react';
import Slider from 'rc-slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import 'rc-slider/assets/index.css';
import './Navbar.css';

class Navbar extends Component {
  constructor(props) {
    super(props);
    // control input
    this.state = { format: 'hex' };
    this.handleChange = this.handleChange.bind(this);
  }
  // controlled input
  handleChange(e) {
    this.setState({ format: e.target.value });
    // example of async nature of setState line below may not pass new state
    // this.props.handleChange(this.state.format);
    // either pass callback to setState or use below
    this.props.handleChange(e.target.value);
  }
  // state = {  }

  render() {
    const { level, changeLevel } = this.props;
    const { format } = this.state;
    return (
      <header className="Navbar">
        <div className="logo">
          <a href="#">react color picker</a>
        </div>
        <div className="slider-container">
          <span> Level: {level} </span>
          <div className="slider">
            <Slider defaultValue={level} min={100} max={900} step={100} onAfterChange={changeLevel} />
          </div>
        </div>
        <div className="select-container">
          <Select value={format} onChange={this.handleChange}>
            <MenuItem value="hex">Hex - #ffffff</MenuItem>
            <MenuItem value="rgb">rgb - rgb(255,255,255) </MenuItem>
            <MenuItem value="rgba">rgba - rgba(255,255,255, 1.0) </MenuItem>
          </Select>
        </div>
      </header>
    );
  }
}

export default Navbar;
