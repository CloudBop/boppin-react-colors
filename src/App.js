import React, { Component } from 'react';
import Palette from './Palette';
import seedColors from './seedColors';

class App extends Component {
  state = {};
  render() {
    return (
      <div className="palette">
        <div className="Palette-colors" />

        {/* <Palette {...seedColors[4]} /> */}
      </div>
    );
  }
}

export default App;
