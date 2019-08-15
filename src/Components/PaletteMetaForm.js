import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

export default function PaletteMetaForm(props) {
  const { palettes, handleSubmitSavePalette, dialogueClose } = props;
  const [ open, setOpen ] = React.useState(true);
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

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" onClose={dialogueClose}>
      <DialogTitle id="form-dialog-title">Choose a palette name</DialogTitle>
      <ValidatorForm onSubmit={() => handleSubmitSavePalette(newPaletteName)}>
        <DialogContent>
          <DialogContentText>Enter a name for your palette</DialogContentText>

          <TextValidator
            label="Palette Name"
            value={newPaletteName}
            onChange={handleOnChange}
            name="newPaletteName"
            fullWidth
            margin="normal"
            validators={[ 'required', 'isPaletteNameUnique' ]}
            errorMessages={[ 'Enter Palette Name', ' Palette name in use.' ]}
          />
          {/* <TextField autoFocus margin="dense" id="name" label="Email Address" type="email" fullWidth /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={dialogueClose} color="primary">
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Save Palette
          </Button>
        </DialogActions>
      </ValidatorForm>
    </Dialog>
  );
}