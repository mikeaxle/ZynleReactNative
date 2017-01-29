/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

//import charge component
import Charge from './App/Components/Charge';

import Keypad from './App/Components/Keypad';

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
        <Keypad />
    );
  }
}

AppRegistry.registerComponent('Zynle', () => Zynle);
