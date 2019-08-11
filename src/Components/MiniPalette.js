import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
  main: {
    backgroundColor: 'purple',
    border: '3px solid teal'
  },
  secondary: {
    backgroundColor: 'pink',
    '& h1': {
      color: 'white'
    }
  }
};

function MiniPalette(props) {
  // classes create unique name that are scoped via js eg classes.main-193jf
  const { classes } = props;
  return (
    <div className={classes.main}>
      <h1>Mini Palette</h1>
      <section className={classes.secondary}>
        <h1>Mini Palette</h1>lorem
      </section>
    </div>
  );
}

// Higher Order Component pattern | styles are passed to props
export default withStyles(styles)(MiniPalette);
