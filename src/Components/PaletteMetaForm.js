import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

export default function FormDialog(props) {
  const { palettes, handleSubmitSavePalette } = props;
  const [ open, setOpen ] = React.useState(false);
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
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates occasionally.
          </DialogContentText>

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

          {/* <TextField autoFocus margin="dense" id="name" label="Email Address" type="email" fullWidth /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
