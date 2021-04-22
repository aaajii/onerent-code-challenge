import React from 'react';
import CreateLink from './CreateProperty';
import Header from './Header';
import LinkList from './PropertyList';
import Login from "./Login";
import Search from "./Search";
import { Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <div className="center w85">
      <Header />
      <div className="ph3 pv1 background-gray">
        <Switch>
          <Route exact path="/" component={LinkList} />
          <Route
            exact
            path="/create"
            component={CreateLink}
          />
          <Route exact path="/login" component={Login} />
          <Route exact path="/search" component={Search} />
        </Switch>
      </div>
    </div>
  );
};

export default App;