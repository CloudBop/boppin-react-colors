import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/styles';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styles from './styles/NavbarStyles';
// import './Navbar.css';
class Navbar extends Component {
  constructor(props) {
    super(props);
    // control input
    // {
    // open = Snackbar @ bottm left,
    // format = rgba || hex || rgba
    // }
    this.state = { format: 'hex', open: false };
    this.handleFormatChange = this.handleFormatChange.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }
  // controlled input
  handleFormatChange(e) {
    this.setState({ format: e.target.value, open: true });
    // example of async nature of setState line below may not pass new state
    // this.props.handleChange(this.state.format);
    // either pass callback to setState or use below
    this.props.handleChange(e.target.value);
  }
  closeSnackbar() {
    this.setState({ open: false });
  }
  // state = {  }

  render() {
    const { level, changeLevel, showingAllColors, classes } = this.props;
    const { format } = this.state;
    return (
      <header className={classes.Navbar}>
        <div className={classes.logo}>
          <Link to="/">react color picker</Link>
        </div>
        {showingAllColors && (
          <div>
            <span> Level: {level} </span>
            <div className={classes.slider}>
              <Slider
                defaultValue={level}
                min={100}
                max={900}
                step={100}
                onAfterChange={changeLevel}
                // dotStyle={‌{
                //   backgroundColor: "transparent",
                //   borderColor: "transparent"
                // }}
                // handleStyle={‌{
                //   backgroundColor: "green",
                //   outline: "none",
                //   border: "2px solid green",
                //   boxShadow: "none",
                //   width: "13px",
                //   height: "13px",
                //   marginLeft: "-7px",
                //   marginTop: "-3px"
                // }}
                // railStyle={‌{
                //   height: "8px"
                // }}
                // trackStyle={‌{
                //   backgroundColor: "transparent"
                // }}
              />
            </div>
          </div>
        )}
        <div className={classes.selectContainer}>
          <Select value={format} onChange={this.handleFormatChange}>
            <MenuItem value="hex">Hex - #ffffff</MenuItem>
            <MenuItem value="rgb">rgb - rgb(255,255,255) </MenuItem>
            <MenuItem value="rgba">rgba - rgba(255,255,255, 1.0) </MenuItem>
          </Select>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={this.state.open}
          autoHideDuration={3000}
          message={<span id="message-id">Format changed to {format.toUpperCase()}! </span>}
          contentprops={{
            'aria-describedby': 'message-id'
          }}
          onClose={this.closeSnackbar}
          action={[
            <IconButton onClick={this.closeSnackbar} colors="inherit" keys="close" aria-label="close">
              <CloseIcon />
            </IconButton>
          ]}
        />
      </header>
    );
  }
}

export default withStyles(styles)(Navbar);
