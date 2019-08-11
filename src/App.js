import React, { Component } from 'react';
import Palette from './Components/Palette';
import { generatePalette } from './helpers/colorChromaHelpers';
import seedColors from './seedColors';

class App extends Component {
  state = {};
  render() {
    // console.log(generatePalette(seedColors[4]));
    return (
      <div className="App">
        <Palette palette={generatePalette(seedColors[4])} />
      </div>
    );
  }
}
export default App;
