/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

//import charge component
import Charge from './App/Components/Charge';

import Keypad from './App/Components/Keypad'; //test code

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
} from 'react-native';


var styles = StyleSheet.create({
  container: {
    //flex: 1,
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
