import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Landing from './Landing';
import GameMaster from './GameMaster';
import styles from '../styles/index.css';

const FourOhFour = () => (
  <h1>
    404
  </h1>
);

const Root = ({ store }) => (
  <Provider store={store}>
    <div className={styles.container}>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/gameMaster" component={GameMaster} />
        <Route component={FourOhFour} />
      </Switch>
    </div>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.objectOf([
    PropTypes.arrayOf(PropTypes.number).isRequired,
    PropTypes.objectOf(PropTypes.arrayOf(PropTypes.number)),
    PropTypes.number,
    PropTypes.bool,
    PropTypes.func,
  ]).isRequired,
};

export default Root;
