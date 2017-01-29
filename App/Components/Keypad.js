import React, { Component } from 'react';

//import number component
import NumPad from '../Utils/NumPad';

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
  flex: 1,
   // marginTop: 70
  },
  subContainer: {
    height: 90,
    padding: 10,
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemCharge: {
   // flex: 1
  },
  itemChargeText: {
    color: '#B5B7B8',
    fontSize:30,
    textAlign: 'right',
   // flex: 1
  },
  addNote: {
   // flex:1
    flexDirection: 'row'
    
  },
    addNoteText: {
    color: '#B5B7B8',
    fontSize:20,
    textAlign: 'left',
  //  flex:1
  },
  numpad: {
    flexDirection: 'row',
    flex: 1,
    //justifyContent: 'space-around',
    //alignItems: 'flex-end'
  },
});




export default class Keypad extends Component {
  
  constructor (props){
    super(props);
    
    this.initialState = {
      itemCharge: 0,
      totalCharge: 0
    };
    
    this.state = this.initialState;
    //this.addToScreen = this.addToScreen.bind(this);
  }
  
  
  addToScreen(num) {
    alert(num);
  }
  
  clearScreen(){
    alert('clicked');
  }
  
  render() {
    return(
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <View style={styles.addNote}>
            <TouchableOpacity>
              <Text style={styles.addNoteText}>Add Note  <Icon name="note" size={25} color="#39B7EF" /></Text>
              
            </TouchableOpacity>
          </View>
          
          <View style={styles.itemCharge}>
            <Text style={styles.itemChargeText}>K{this.state.itemCharge}</Text>
          </View> 
      </View>
        
        <View style={styles.numpad}>
          <NumPad  num={'1'} onPress={this.addToScreen('2')}/>
          <NumPad num={'2'} onPress={this.addToScreen('2')}/>
          <NumPad num={'3'} onPress={this.addToScreen('3')}/>
        </View>
      </View>

      
    );
  }
}




/* 
        <View style={styles.numpad}>
          <NumPad num={'4'} onPress={this.addToScreen('4')}/>
          <NumPad num={'5'} onPress={this.addToScreen('5')}/>
          <NumPad num={'6'} onPress={this.addToScreen('6')}/>
        </View>
        <View style={styles.numpad}>
          <NumPad num={'7'} onPress={this.addToScreen('7')}/>
          <NumPad num={'8'} onPress={this.addToScreen('8')}/>
          <NumPad num={'9'} onPress={this.addToScreen('9')}/>
        </View>
         <View style={styles.numpad}>
          <NumPad num={'C'} />
          <NumPad num={'0'} onPress={this.addToScreen('0')}/>
          <NumPad num={'+'}/>
        </View>
*/