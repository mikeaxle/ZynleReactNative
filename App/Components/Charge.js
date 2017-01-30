import React, { Component } from 'react';
import NumPad from '../Utils/NumPad';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { StackNavigator } from 'react-navigation';
import ChargeCard from './ChargeCard';

import {
  AppRegistry,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native'; 


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
  },
    containerKeypad: {
      flex: 8,
   // marginTop: 70
  },
  subContainerKeypad: {
    height: 90,
    padding: 10,
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemChargeTextKeypad: {
    color: '#B5B7B8',
    fontSize:14,
    textAlign: 'left',
   // flex: 1
  },
  addNoteKeypad: {
   // flex:1
    flexDirection: 'row'
    
  },
    addNoteTextKeypad: {
    color: '#B5B7B8',
    fontSize:20,
    textAlign: 'left',
  //  flex:1
  },
  numpadKeypad: {
    flexDirection: 'row',
    flex: 1,
    //justifyContent: 'space-around',
    //alignItems: 'flex-end'
  }
  
});


//Charge Component Screen
export default class Charge extends Component {
  
  static navigationOptions = {
    title: 'Charge'
  };
  
  //define state
   constructor(props){
    super(props);
    this.state = {
      toolTipText: 'this is a tool tip',
      totalCharge: 0,
      note: 'this is the note'
    }
  }
  
  
  //append numbers to screen
    addToScreen(num) {
    console.log(num + ' was pressed');
    
    //check length of screen number
    if(this.state.totalCharge.length > 5){
      alert('You have reached the purchase limit');
    } else {
      //check if itemCharge is zero
      if(this.state.totalCharge === 0){
      
      //assign number pressed to itemCharge
      this.setState({ totalCharge: num });
      } else {
        //append number pressed at to screen
        this.setState({ totalCharge: this.state.totalCharge + num });
      }
    }
  }
  
  //clear numbers on screen 
  clearScreen(){
    console.log('clear');
    this.setState({ totalCharge: 0 });
    _itemChage = 0;
  }
  
  
  render(){
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>  
        <View style={{padding: 10}}>
          <TouchableOpacity style={styles.button} underlayColor="#39B7EF"
            onPress={() => navigate('ChargeCard',this.state)}>
            <Text style={styles.buttonText}>Charge </Text>
            <Text style={styles.buttonText}>K{this.state.totalCharge}</Text>
          </TouchableOpacity>
        </View>
        
        
        <View style={{flex:1, backgroundColor: 'white'}}>
          <View style={styles.subContainerKeypad}>
            <View style={styles.addNoteKeypad}>
              <TouchableOpacity>
                <Text style={styles.addNoteTextKeypad}>Add Note  <Icon name="note" size={25} color="#39B7EF" /></Text>
              </TouchableOpacity>
            </View>
            <View style={styles.itemChargeKeypad}>
              <Text style={styles.itemChargeTextKeypad}>{this.state.note}</Text>
            </View> 
          </View>
          
          
        <View style={styles.numpadKeypad}>
          <NumPad  num={'1'} onPress={this.addToScreen.bind(this, '1')}/>
          <NumPad num={'2'} onPress={this.addToScreen.bind(this, '2')}/>
          <NumPad num={'3'} onPress={this.addToScreen.bind(this, '3')}/>
        </View>
        <View style={styles.numpadKeypad}>
          <NumPad num={'4'} onPress={this.addToScreen.bind(this, '4')}/>
          <NumPad num={'5'} onPress={this.addToScreen.bind(this, '5')}/>
          <NumPad num={'6'} onPress={this.addToScreen.bind(this, '6')}/>
        </View>
        <View style={styles.numpadKeypad}>
          <NumPad num={'7'} onPress={this.addToScreen.bind(this, '7')}/>
          <NumPad num={'8'} onPress={this.addToScreen.bind(this, '8')}/>
          <NumPad num={'9'} onPress={this.addToScreen.bind(this, '9')}/>
        </View>
         <View style={styles.numpadKeypad}>
          <NumPad num={'C'} onPress={this.clearScreen.bind(this)}/>
          <NumPad num={'0'} onPress={this.addToScreen.bind(this, '0')}/>
          <NumPad num={'?'} />
        </View>         
          
        </View>
      </View>

      
    );
  }
};

//setup navigator
const Zynle = StackNavigator({
  Charge: { screen: Charge },
  ChargeCard: { screen: ChargeCard },
});


AppRegistry.registerComponent('Zynle', () => Zynle);