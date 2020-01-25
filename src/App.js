import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import HomeComponent from './components/Home/HomeComponent';
import MapComponent from './components/Map/MapComponent';
import { Navbar, NavbarBrand } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <div>
        <Navbar bg="dark" variant="dark">
          <NavbarBrand>Geospatial</NavbarBrand>
        </Navbar>
        <Switch>
          <Route path="/" exact component={HomeComponent} />
          <Route path="/maps" exact component={MapComponent} />
          <Redirect to={'/'} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
