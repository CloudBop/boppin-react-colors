import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import clsx from 'clsx';
import React from 'react';
import { arrayMove } from 'react-sortable-hoc';

import ColorPickerForm from './ColorPickerForm';
import DraggableColorList from './DraggableColorList';
import PaletteFormNav from './PaletteFormNav';
import useStyles from './styles/NewPaletteFormStyles';

export default function NewPaletteForm(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { savePalette, palettes, maxColor } = props;
  const [ open, setOpen ] = React.useState(false);
  // const [ curColor, setCurrentColor ] = React.useState('teal');
  const [ colors, setColors ] = React.useState(palettes[0].colors);
  // new color string
  // const [ newColorName, setColorName ] = React.useState('');
  const paletteIsFull = colors.length >= maxColor;

  // called every re render - console.log(maxColor);
  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  function addNewColor(newColor) {
    // console.log('2 curCol: ' + curColor);

    setColors([ ...colors, newColor ]);
    // updateColor();
  }
  // function handleChange(evt) {
  // setColorName(evt.target.value);
  // }

  function handleSubmitSavePalette(newPalette) {
    // console.log(newPaletteName);
    newPalette.colors = colors;
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-');
    //
    savePalette(newPalette);
    props.history.push('/');
  }
  function removeColor(colorName) {
    // alert(colorName);
    const removedData = colors.filter(color => color.name !== colorName);
    // console.log(removedData);
    setColors(removedData);
  }
  function onSortEnd({ oldIndex, newIndex }) {
    setColors(arrayMove(colors, oldIndex, newIndex));
  }
  function clearColors() {
    setColors([]);
  }
  function randomColor() {
    const randomPaletteIndex = Math.floor(Math.random() * props.palettes.length);
    const randomPalette = props.palettes[randomPaletteIndex];
    const randomColorIndex = Math.floor(Math.random() * randomPalette.colors.length);
    const randomColor = randomPalette.colors[randomColorIndex];
    setColors([ ...colors, randomColor ]);
  }
  return (
    <div className={classes.root}>
      <PaletteFormNav
        open={open}
        classes={classes}
        palettes={palettes}
        handleSubmitSavePalette={handleSubmitSavePalette}
        handleDrawerOpen={handleDrawerOpen}
      />
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

        <div className={classes.container}>
          <Typography
            // material-ui props
            variant="h4"
            gutterBottom
          >
            {' '}
            Design your palette{' '}
          </Typography>
          <div className={classes.buttons}>
            <Button className={classes.btn} variant="contained" color="secondary" onClick={clearColors}>
              {'Clear palette'}
            </Button>
            <Button
              className={classes.btn}
              variant="contained"
              color="primary"
              onClick={randomColor}
              disabled={paletteIsFull}
            >
              {'Random Color'}
            </Button>
          </div>

          <ColorPickerForm colors={colors} addNewColor={addNewColor} paletteIsFull={paletteIsFull} />
        </div>
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

        <DraggableColorList
          colors={colors}
          removeColor={removeColor}
          axis={'xy'}
          onSortEnd={onSortEnd}
          //- Distance befove evt trigger (in px) sometimes trash click will be swallowed by sortable drag (fired onMouseDown).
          distance={20}
        />
      </main>
    </div>
  );
}

NewPaletteForm.defaultProps = {
  maxColor: 20
};
