import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/styles';
import React, { PureComponent } from 'react';

import styles from './styles/MiniPaletteStyles';

class MiniPalette extends PureComponent {
  constructor(props) {
    //- not refer to props in constructor
    super(props);
    this.deletePalette = this.deletePalette.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  //
  deletePalette(e) {
    e.stopPropagation();
    this.props.openDialoge(this.props.id);
  }
  handleClick() {
    this.props.goToPalette(this.props.id);
  }
  //
  render() {
    //- classes create unique name that are scoped via js eg classes.main-193jf
    const { classes, paletteName, emoji, colors } = this.props;
    //- returns list of div mini color boxes

    console.log('TCL: MiniPalette -> render -> ', classes);
    const miniColorBoxes = colors.map(color => (
      <div className={classes.miniColor} style={{ backgroundColor: color.color }} key={color.name} />
    ));
    //
    return (
      //- invoke function handleClick here. In child fores re-renders as arrow functions in props are NEVER the same
      <div className={classes.root} onClick={this.handleClick}>
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
