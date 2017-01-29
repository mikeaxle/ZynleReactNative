import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native'

//import icons
import Icon from 'react-native-vector-icons/EvilIcons';

var styles = StyleSheet.create({
  container: {
    height: 50,
    padding: 10,
    backgroundColor: '#24FF35',
    //alignItems: 'center',
    //alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    
  },
  tooltip: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600'
  },

});

export default class Tooltip extends Component {
  render (){
    return(
     <TouchableOpacity style={styles.container}>
        <Text  style={styles.tooltip}>{this.props.toolTipText}</Text>
        <Icon name="close" size={30} color="#fff" />
      </TouchableOpacity>
    )
  }
};

Tooltip.propTypes = {
toolTipText: React.PropTypes.string.isRequired
};