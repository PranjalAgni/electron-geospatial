import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import HomeComponent from './components/Home/HomeComponent';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" component={HomeComponent} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
