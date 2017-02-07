import React, { Component } from 'react';
import Tabs from './Tabs';
import Api from '../Utils/Api';

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native'; 

//import icons
import Icon from 'react-native-vector-icons/FontAwesome';

var styles = StyleSheet.create ({
  container: {
    flex: 1,
    //padding: 10,
    //marginTop: 40,
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  button: {
    backgroundColor: '#39B7EF',
    height: 75,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  buttonText: {
    color: 'white',
    fontSize: 28,
  },
  header: {
    alignItems: 'center',
    //justifyContent: 'center',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerText: {
    color:'#95989A',
    fontSize:20,
  },
  
  saleImage: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft:5,
    marginLeft:5
  }
  
});


export default class Charge extends Component {
  
   constructor(props){
    super(props);
    this.state = {
      toolTipText: 'this is a tool tip',
      numberOfsales: 0,
      totalCharge: 0,
    }
  }
  
  
  render(){
    Api.CallWebAPI("20.0", "4383755000927515", "08", "22", "549", "shoes", "Michael Lungu");
    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.headerText}>Current Sale
          </Text>
          <Image style={styles.saleImage}
            source={require('../Images/salesDock.png')} >
            <Text style={{color:"#95989A", fontSize:15, fontWeight:"bold"}}>{this.state.numberOfsales}</Text>
          </Image>
        </View>
      
        <View style={{padding: 10}}>
          <TouchableOpacity style={styles.button} underlayColor="#39B7EF">
            <Text style={styles.buttonText}>Charge </Text>
            <Text style={styles.buttonText}>K{this.state.totalCharge}</Text>
          </TouchableOpacity>
        </View>
        <Tabs />
      </View>
      
    );
  }
};