import React, { Component, } from 'react';
import { 
  View, 
  StyleSheet
} from 'react-native';

import NumPad from '../Utils/NumPad';


var styles = StyleSheet.create({
    numpadKeypad: {
    flexDirection: 'row',
    flex: 1,
    //justifyContent: 'space-around',
    //alignItems: 'flex-end'
  },
});

export default class KeyPad extends Component {

  render() {
    return (
      <View>
        
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
          <NumPad num={<Icon name="question" size={40} color='red'/>} />
        </View>         
        </View>
    )
  }
}

