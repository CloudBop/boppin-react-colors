import React, { Component } from 'react';
import Palette from './Components/Palette';
import { Route, Switch } from 'react-router-dom';
import { generatePalette } from './helpers/colorChromaHelpers';
import seedColors from './seedColors';

class App extends Component {
  state = {};
  render() {
    // console.log(generatePalette(seedColors[4]));
    return (
      <Switch>
        <Route exact path="/" render={() => <h1>Palette list goes here</h1>} />
        <Route exact path="/palette/:id" render={() => <h1>Individual Palette</h1>} />
      </Switch>
      // <div className="App">
      //   <Palette palette={generatePalette(seedColors[4])} />
      // </div>
    );
  }
}
export default App;
