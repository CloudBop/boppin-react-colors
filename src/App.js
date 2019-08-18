import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import NewPaletteForm from './Components/NewPaletteForm';
import Palette from './Components/Palette';
import PaletteList from './Components/PaletteList';
import SingleColorPalette from './Components/SingleColorPalette';
import { generatePalette } from './helpers/colorChromaHelpers';
import seedColors from './seedColors';

//
class App extends Component {
  constructor(props) {
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem(`palettes`));
    this.state = { palettes: savedPalettes || seedColors };
    //- passed as props to NewPalette
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }
  //
  findPalette(id) {
    //- has to be bound - is using this keyword
    return this.state.palettes.find(function(palette) {
      return palette.id === id;
    });
  }
  //
  savePalette(newPalette) {
    //- has to be bound - is using this keyword && needs argument
    this.setState(
      { palettes: [ ...this.state.palettes, newPalette ] },
      //- no parens needed && not bound in constructor as  not invoked directly from handler
      this.syncLocalStorage
    );
  }
  //
  deletePalette(id) {
    this.setState(
      //- filter all items that !== id
      prevState => ({ palettes: prevState.palettes.filter(palette => palette.id !== id) }),
      //- no parens needed && not bound in constructor as  not invoked directly from handler
      this.syncLocalStorage
    );
  }
  //
  syncLocalStorage() {
    window.localStorage.setItem(`palettes`, JSON.stringify(this.state.palettes));
  }
  //
  render() {
    return (
      //- ENABLE ANIMATIONS ON NAVIGATION ALA OSX
      //- wrap everything in single route render.
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition key={location.key} classNames="fade" timeout={5000}>
              <Switch location={location}>
                <Route
                  exact
                  //- path `/new` could confused with :id  | has to be above * (all)
                  path="/palette/new"
                  render={routeProps => (
                    <div className="page">
                      <NewPaletteForm savePalette={this.savePalette} palettes={this.state.palettes} {...routeProps} />
                    </div>
                  )}
                />
                <Route
                  exact
                  path="/"
                  //? Routes can render() or component={SomeComponent}
                  render={routeProps => (
                    <div className="page">
                      <PaletteList palettes={this.state.palettes} deletePalette={this.deletePalette} {...routeProps} />
                    </div>
                  )}
                />
                <Route
                  exact
                  path="/palette/:id"
                  render={routeProps => {
                    return (
                      <div className="page">
                        <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} />;
                      </div>
                    );
                  }}
                />
                <Route
                  exact
                  path="/palette/:paletteId/:colorId"
                  render={routeProps => (
                    <div className="page">
                      <SingleColorPalette
                        palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))}
                        colorId={routeProps.match.params.colorId}
                      >
                        Single Color Page
                      </SingleColorPalette>
                    </div>
                  )}
                />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    );
  }
}
export default App;
