import React, { Component } from 'react';
import Palette from './Components/Palette';
import PaletteList from './Components/PaletteList';
import { Route, Switch } from 'react-router-dom';
import { generatePalette } from './helpers/colorChromaHelpers';
import seedColors from './seedColors';

class App extends Component {
  // state = {};
  findPalette(id) {
    return seedColors.find(function(palette) {
      return palette.id === id;
    });
  }
  render() {
    // console.log(generatePalette(seedColors[4]));
    return (
      <Switch>
        <Route exact path="/" render={routeProps => <PaletteList palettes={seedColors} {...routeProps} />} />

        <Route
          exact
          path="/palette/:id"
          //
          render={routeProps => {
            return <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} />;
          }}
        />
      </Switch>

      // <div className="App">
      //   <Palette palette={generatePalette(seedColors[4])} />
      // </div>
    );
  }
}
export default App;
