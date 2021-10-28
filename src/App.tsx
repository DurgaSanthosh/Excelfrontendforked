/*eslint no-unused-vars: 0*/
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from './components/common/PrivateRoute/PrivateRoute';
import Home from './pages/Home/Home';
import Test from './pages/Test/Test';
import DalalBull from './pages/DalalBull/DalalBull';
import Kryptos from './pages/Kryptos/Kryptos';
import Spinner from './components/common/Spinner/Spinner';

import './App.scss';

import Authorisation from './components/Authorisation/Authorisation';

const App = () => {
  return (
    <div className="main-background">
      <Authorisation />
      {/*<Suspense fallback={<Spinner />}> */}
      <Router>
        <PrivateRoute exact path='/test' component={Test} />
        <PrivateRoute path='/Dalalbull' component={DalalBull} />
        <PrivateRoute path='/Kryptos' component={Kryptos} />
        <Route exact path='/' component={Home} />
      </Router>
      {/* </Suspense> */}
    </div>
  );
};

export default App;