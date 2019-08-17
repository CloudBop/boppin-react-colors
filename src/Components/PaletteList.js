import { withStyles } from '@material-ui/styles';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import MiniPalette from './MiniPalette';
import styles from './styles/PaletteListStyles';

class PaletteList extends Component {
  goToPalette(id) {
    // console.log('Hiya!');
    this.props.history.push(`/palette/${id}`);
  }
  render() {
    const { palettes, classes, deletePalette } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1 className={classes.heading}>React Colors</h1>
            <Link to="/palette/new"> Create New Palette </Link>
          </nav>
          <div className={classes.palettes}>
            {palettes.map(palette => (
              <MiniPalette
                {...palette}
                handleDelete={deletePalette}
                key={palette.id}
                id={palette.id}
                handleClick={() => this.goToPalette(palette.id)}
              />
              // <p>
              //   <Link to={`/palette/${palette.id}`}>{palette.paletteName} </Link>
              // </p>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
// higher order component
export default withStyles(styles)(PaletteList);
