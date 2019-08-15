import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
const drawerWidth = 400;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    transition: theme.transitions.create([ 'margin', 'width' ], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '64px'
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create([ 'margin', 'width' ], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: 'purple'
  }
}));
export default function PaletteFormNav(props) {
  const classes = useStyles();
  // const theme = useTheme();
  //
  const { open, palettes, handleSubmitSavePalette, handleDrawerOpen } = props;
  // const [ open, setOpen ] = React.useState(false);
  const [ newPaletteName, setNewPaletteName ] = React.useState('');
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
  function handleOnChange(evt) {
    // console.log(evt.target.value);
    setNewPaletteName(evt.target.value);
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
          <ValidatorForm onSubmit={() => handleSubmitSavePalette(newPaletteName)}>
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
          </ValidatorForm>
          <Link to="/">
            <Button variant="contained" color="secondary">
              Go Back
            </Button>
          </Link>
        </div>
      </AppBar>
    </div>
  );
}
