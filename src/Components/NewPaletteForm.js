import React from 'react';
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
import DraggableColorBox from './DraggableColorBox';

const drawerWidth = 400;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    transition: theme.transitions.create([ 'margin', 'width' ], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
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
    marginRight: theme.spacing(2)
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth,
    // minus navbar
    height: 'calc(100vh - 64px)'
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}));

export default function NewPaletteForm(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { savePalette, palettes } = props;
  const [ open, setOpen ] = React.useState(false);
  const [ curColor, setCurrentColor ] = React.useState('teal');
  const [ newPaletteName, setNewPaletteName ] = React.useState('');
  const [ colors, setColors ] = React.useState([ { color: '#654212', name: 'suprise' } ]);
  // new color string
  const [ newColorName, setColorName ] = React.useState('');
  // lifecycle methods using hooks // same as componentDidMount
  React.useEffect(
    () => {
      // searching array of object with propertiess using destructuring
      ValidatorForm.addValidationRule('isColorNameUnique', value =>
        colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
      );
      ValidatorForm.addValidationRule('isColorUnique', newColor => {
        console.log(colors);
        return colors.every(({ color }) => {
          console.log('color: ' + color);
          console.log('new: ' + newColor);
          console.log('currents: ' + curColor);
          return color !== curColor;
        });
      });
    },
    [ colors, curColor ]
  );
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

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  function updateCurrentColor(color) {
    setCurrentColor(color.hex);
  }

  function addNewColor(args) {
    //console.log(args);
    console.log('2 curCol: ' + curColor);
    const newColor = {
      color: curColor,
      name: newColorName
    };
    setColors([ ...colors, newColor ]);
    // updateColor();
  }
  function handleChange(evt) {
    setColorName(evt.target.value);
  }
  function handleOnChange(evt) {
    console.log(evt.target.value);
    setNewPaletteName(evt.target.value);
  }
  function handleSubmitSavePalette() {
    let paletteName = newPaletteName,
      id = paletteName.toLowerCase().replace(/ /g, '-');
    //
    savePalette({
      paletteName,
      id,
      colors
    });
    props.history.push('/');
  }
  function onDeleteClick(colorName) {
    // alert(colorName);
    const removedData = colors.filter(color => color.name !== colorName);
    console.log(removedData);
    setColors(removedData);
  }
  return (
    <div className={classes.root}>
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
          </ValidatorForm>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <Typography variant="h4"> Design your palette </Typography>
        <div>
          <Button variant="contained" color="secondary">
            {'Clear palette'}
          </Button>
          <Button variant="contained" color="primary">
            {'Random Color'}
          </Button>
        </div>

        <ChromePicker
          // initial color
          color={curColor}
          // trigger function
          onChangeComplete={newColor => updateCurrentColor(newColor)}
        />

        <ValidatorForm onSubmit={addNewColor}>
          <TextValidator
            value={newColorName}
            onChange={handleChange}
            name="newColorName"
            // instantValidate={false}
            //
            validators={[ 'required', 'isColorNameUnique', 'isColorUnique' ]}
            errorMessages={[ 'Color Name is required', 'Color name must be unique!', 'Color already used.' ]}
          />

          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: curColor }}
            type="submit"
            value={curColor}
          >
            {'Add Color'}
          </Button>
        </ValidatorForm>
      </Drawer>
      <main
        className={clsx(classes.content, {
          // if open add content shit class
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
        {/* <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus. Convallis convallis tellus id interdum
          velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate eu
          scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt
          lobortis feugiat vivamus at augue. At augue eget arcu dictum varius duis at consectetur lorem. Velit sed
          ullamcorper morbi tincidunt. Lorem donec massa sapien faucibus et molestie ac.
        </Typography> */}

        {colors.map((color, index) => (
          <DraggableColorBox
            key={index}
            color={color.color}
            name={color.name}
            handleClick={() => onDeleteClick(color.name)}
          />
        ))}
      </main>
    </div>
  );
}
