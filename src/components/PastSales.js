import React, { Component } from 'react';

//import icons
import Icon from 'react-native-vector-icons/SimpleLineIcons';


import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native'; 

var styles = StyleSheet.create({
  container: {
    //flex: 1,
    padding: 20
  },
});

export default class PastSales extends Component {

  
  render() {
    return(
      <View style={styles.container}>
        <Text>History Here</Text>
      </View>
    );
  }
}