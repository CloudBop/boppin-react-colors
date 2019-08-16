import Button from '@material-ui/core/Button';
import React from 'react';
import { ChromePicker } from 'react-color';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

import useStyles from './styles/ColorPickerFormStyles';

//
export default function ColorPickerForm(props) {
  const classes = useStyles();
  const { paletteIsFull, addNewColor, colors } = props;
  const [ curColor, setCurrentColor ] = React.useState('teal');
  const [ newColorName, setColorName ] = React.useState('');
  //
  function updateCurrentColor(color) {
    setCurrentColor(color.hex);
  }
  //
  function handleChange(evt) {
    setColorName(evt.target.value);
  }
  //
  function handleSubmit() {
    const newColor = {
      color: curColor,
      name: newColorName
    };

    addNewColor(newColor);
    setColorName('');
  }
  //- lifecycle methods using hooks // similar but different to componentDidMount
  React.useEffect(
    () => {
      //- searching array of object with propertiess using destructuring
      ValidatorForm.addValidationRule('isColorNameUnique', value =>
        colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
      );
      ValidatorForm.addValidationRule('isColorUnique', newColor => {
        //// REMEMBER THIS WAS BROKEN
        return colors.every(({ color }) => {
          //? state confuses this...
          return color !== curColor;
        });
      });
    },
    //- watch for changes: something more nuanced happening than tradition lifecycle methods
    [ colors, curColor ]
  );

  return (
    <div className={classes.testing}>
      <ChromePicker
        className={classes.picker}
        // initial color
        color={curColor}
        // trigger function
        onChangeComplete={newColor => updateCurrentColor(newColor)}
      />

      <ValidatorForm onSubmit={handleSubmit}>
        <TextValidator
          className={classes.colorNameInput}
          value={newColorName}
          onChange={handleChange}
          placeholder="color name"
          name="newColorName"
          // material-ui settings
          variant="filled"
          margin="normal"
          // instantValidate={false}
          //
          validators={[ 'required', 'isColorNameUnique', 'isColorUnique' ]}
          errorMessages={[ 'Color Name is required', 'Color name must be unique!', 'Color already used.' ]}
        />

        <Button
          className={classes.addColor}
          variant="contained"
          color="primary"
          type="submit"
          value={curColor}
          style={{ backgroundColor: paletteIsFull ? 'grey' : curColor }}
          disabled={paletteIsFull}
        >
          {paletteIsFull ? 'Full Palette' : 'Add Color'}
        </Button>
      </ValidatorForm>
    </div>
  );
}
