import React from 'react';
import { withStyles, mergeClasses } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {
  root: {
    height: '20%',
    width: '25%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-3.5px',
    '&:hover svg': {
      color: 'white',
      transform: 'scale(1.5)'
    }
  },
  boxContent: {
    width: '100%',
    left: '0',
    bottom: '0',
    position: 'absolute',
    padding: '10px',
    color: 'rgba(0,0,0,0.5)',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: '12px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  deleteIcon: {
    transition: 'all 0.3s ease-in-out'
  }
};

const DraggableColorBox = props => {
  const { classes } = props;
  return (
    <div
      //
      className={classes.root}
      style={{ backgroundColor: props.color }}
    >
      <div className={classes.boxContent}>
        <span className> {props.name} </span>
        <span>
          <DeleteIcon className={classes.deleteIcon} />
        </span>
      </div>
    </div>
  );
};

export default withStyles(styles)(DraggableColorBox);
