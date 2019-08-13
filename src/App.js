import React, { Component } from 'react';
import Palette from './Components/Palette';
import PaletteList from './Components/PaletteList';
import NewPaletteForm from './Components/NewPaletteForm';
import SingleColorPalette from './Components/SingleColorPalette';
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
        {/* be careful, path `/new` could confused with :id  | has to be above*/}
        <Route exact path="/palette/new" render={routeProps => <NewPaletteForm />} />

        <Route exact path="/" render={routeProps => <PaletteList palettes={seedColors} {...routeProps} />} />

        <Route
          exact
          path="/palette/:id"
          //
          render={routeProps => {
            return <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} />;
          }}
        />

        <Route
          exact
          path="/palette/:paletteId/:colorId"
          render={routeProps => (
            <SingleColorPalette
              palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))}
              colorId={routeProps.match.params.colorId}
            >
              Single Color Page
            </SingleColorPalette>
          )}
        />
      </Switch>

      // <div className="App">
      //   <Palette palette={generatePalette(seedColors[4])} />
      // </div>
    );
  }
}
export default App;
