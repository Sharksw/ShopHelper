/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import NavigatorContainer from "./containers/NavigatorContainer";

import configureStore from "./config/store";

const { store, persistor } = configureStore();

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <NavigatorContainer />
    </PersistGate>
  </Provider>
);

export default () => <App />;
