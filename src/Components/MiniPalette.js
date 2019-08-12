import React from 'react';
import { withStyles } from '@material-ui/styles';
import styles from './styles/MiniPaletteStyles';

function MiniPalette(props) {
  // classes create unique name that are scoped via js eg classes.main-193jf
  const { classes, paletteName, emoji, colors } = props;
  const miniColorBoxes = colors.map(color => (
    <div className={classes.miniColor} style={{ backgroundColor: color.color }} key={color.name} />
  ));
  return (
    <div className={classes.root} onClick={props.handleClick}>
      <div className={classes.colors}>
        {miniColorBoxes}
        {/*MiniPalette  */}
      </div>
      <h5 className={classes.title}>
        {paletteName} <span>{emoji}</span>
      </h5>
    </div>
  );
}

// Higher Order Component pattern | styles are passed to props
export default withStyles(styles)(MiniPalette);
