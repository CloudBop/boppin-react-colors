import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { arrayMove } from 'react-sortable-hoc';
import DraggableColorList from './DraggableColorList';

export default function PaletteFormNav(props) {
  //
  // const { savePalette, palettes, maxColor } = props;
  // const [ open, setOpen ] = React.useState(false);

  // render
  return (
    <div>
      <CssBaPaletteseline />

      <AppBar
        position="fixed"
        color="default"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Persistent drawer
          </Typography>
          <ValidatorForm onSubmit={handleSubmitSavePalette}>
            <TextValidator
              label="Palette Name"
              value={newPaletteName}
              onChange={handleOnChange}
              name="newPaletteName"
              validators={[ 'required', 'isPaletteNameUnique' ]}
              errorMessages={[ 'Enter Palette Name', ' Palette name in use.' ]}
            />
            <Button variant="contained" color="primary" type="submit">
              Save Palette
            </Button>

            <Link to="/">
              <Button variant="contained" color="secondary">
                Go Back
              </Button>
            </Link>
          </ValidatorForm>
        </Toolbar>
      </AppBar>
    </div>
  );
}
