import React, { Component } from 'react';
import Palette from './Components/Palette';
import seedColors from './seedColors';

class App extends Component {
  state = {};
  render() {
    return (
      <div className="App">
        <Palette {...seedColors[4]} />
      </div>
    );
  }
}
export default App;
