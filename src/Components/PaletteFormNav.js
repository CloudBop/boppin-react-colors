import React from 'react';
import { Link } from 'react-router-dom';
import PaletteMetaForm from './PaletteMetaForm';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import { ValidatorForm } from 'react-material-ui-form-validator';
import useStyles from './styles/NewPaletteFormNavStyles';
export default function PaletteFormNav(props) {
  const classes = useStyles();
  // const theme = useTheme();
  //
  const { open, palettes, handleSubmitSavePalette, handleDrawerOpen } = props;
  const [ formShowing, setNavDialogueOpen ] = React.useState(false);
  // lifecycle - component did mount
  React.useEffect(
    () => {
      // console.log('testing');
      ValidatorForm.addValidationRule('isPaletteNameUnique', value => {
        // console.log('fored! ' + value);
        // console.log(palettes);
        return palettes.every(({ paletteName }) => {
          // console.log(paletteName);
          return paletteName.toLowerCase() !== value.toLowerCase();
        });
      });
    },
    [ palettes ]
  );
  //
  function showForm() {
    // console.log('dialogueOpen');
    setNavDialogueOpen(true);
  }
  function hideForm() {
    // console.log('dialogueClose');
    setNavDialogueOpen(false);
  }
  // render
  return (
    <div>
      <CssBaseline />

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
            Create Color Palette
          </Typography>
        </Toolbar>

        <div className={classes.navBtns}>
          <Link to="/">
            <Button className={classes.button} variant="contained" color="secondary">
              Go Back
            </Button>
          </Link>
          <Button className={classes.button} variant="contained" color="primary" onClick={showForm}>
            Save
          </Button>

          {/*  */}
          {formShowing && (
            <PaletteMetaForm
              handleSubmitSavePalette={handleSubmitSavePalette}
              palettes={palettes}
              dialogueClose={hideForm}
            />
          )}
        </div>
      </AppBar>
    </div>
  );
}
