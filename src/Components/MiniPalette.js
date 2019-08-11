import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
  root: {
    backgroundColor: 'white',
    border: '1px solid black',
    borderRadius: '5px',
    padding: '0.5rem',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  colors: {
    backgroundColor: 'grey'
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0',
    color: 'black',
    paddingTop: '0.5rem',
    fontSize: '1rem',
    position: 'relatiive'
  },
  emoji: {
    marginLeft: '0.5rem',
    fontSize: '1.5rem'
  }
};

function MiniPalette(props) {
  // classes create unique name that are scoped via js eg classes.main-193jf
  const { classes, paletteName, emoji } = props;
  return (
    <div className={classes.root}>
      <div className={classes.colors} />
      <h5 className={classes.title}>
        {paletteName} <span>{emoji}</span>
      </h5>
    </div>
  );
}

// Higher Order Component pattern | styles are passed to props
export default withStyles(styles)(MiniPalette);
