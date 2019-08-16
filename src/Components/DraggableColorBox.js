import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
// import { withStyles } from '@material-ui/styles';
// import { withStyles } from '@material-ui/core/styles';
import useStyles from './styles/DraggableColorBoxStyles';

import DeleteIcon from '@material-ui/icons/Delete';

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
