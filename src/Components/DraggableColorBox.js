import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
// import { withStyles } from '@material-ui/styles';
// import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
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
});

const DraggableColorBox = SortableElement(props => {
  const classes = useStyles();
  const { handleClick, name, color } = props;
  return (
    <div
      //
      className={classes.root}
      style={{ backgroundColor: color }}
    >
      <div className={classes.boxContent}>
        <span> {name} </span>
        <span>
          <DeleteIcon className={classes.deleteIcon} onClick={handleClick} />
        </span>
      </div>
    </div>
  );
});

export default DraggableColorBox;
