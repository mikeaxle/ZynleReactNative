/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

//import charge component
import Charge from './App/Components/Charge';

import Keypad from './App/Components/Keypad';

//crypto js
//import './shim.js';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
} from 'react-native';


var styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: 'white',
  },
});

export default class Zynle extends Component {
  render() {
    return (
        <Charge />
    );
  }
}

AppRegistry.registerComponent('Zynle', () => Zynle);
