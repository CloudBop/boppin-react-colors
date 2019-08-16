import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/styles';
import React from 'react';

import styles from './styles/MiniPaletteStyles';

//
function MiniPalette(props) {
  //- classes create unique name that are scoped via js eg classes.main-193jf
  const { classes, paletteName, emoji, colors } = props;
  //- returns list of div mini color boxes
  const miniColorBoxes = colors.map(color => (
    <div className={classes.miniColor} style={{ backgroundColor: color.color }} key={color.name} />
  ));
  //
  return (
    <div className={classes.root} onClick={props.handleClick}>
      <div className={classes.delete}>
        <DeleteIcon
          className={classes.deleteIcon}
          //- inline style to overide material UI default styles
          style={{ transition: 'all 0.3s ease-in-out' }}
        />
      </div>
      <div className={classes.colors}>{miniColorBoxes}</div>
      <h5 className={classes.title}>
        {paletteName} <span>{emoji}</span>
      </h5>
    </div>
  );
}
//- Higher Order Component pattern | styles are passed to props.classes
export default withStyles(styles)(MiniPalette);
