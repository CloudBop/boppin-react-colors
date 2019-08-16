import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/styles';
import React, { Component } from 'react';

import styles from './styles/MiniPaletteStyles';

//
class MiniPalette extends Component {
  constructor(props) {
    //- not refer to props in constructor
    super(props);
    this.deletePalette = this.deletePalette.bind(this);
  }
  //
  deletePalette(e) {
    e.stopPropagation();
    alert('hooray!');
    this.props.handleDelete(this.props.id);
  }
  //
  render() {
    //- classes create unique name that are scoped via js eg classes.main-193jf
    const { classes, paletteName, emoji, colors, handleClick } = this.props;
    //- returns list of div mini color boxes
    const miniColorBoxes = colors.map(color => (
      <div className={classes.miniColor} style={{ backgroundColor: color.color }} key={color.name} />
    ));
    //
    return (
      <div className={classes.root} onClick={handleClick}>
        <div className={classes.delete}>
          <DeleteIcon
            className={classes.deleteIcon}
            //- inline style to overide material UI default styles
            style={{ transition: 'all 0.3s ease-in-out' }}
            onClick={this.deletePalette}
          />
        </div>
        <div className={classes.colors}>{miniColorBoxes}</div>
        <h5 className={classes.title}>
          {paletteName} <span>{emoji}</span>
        </h5>
      </div>
    );
  }
}
//- Higher Order Component pattern | styles are passed to props.classes
export default withStyles(styles)(MiniPalette);
