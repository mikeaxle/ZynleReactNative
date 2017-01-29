import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
  
} from 'react-native';

//import icons
import Icon from 'react-native-vector-icons/FontAwesome';


//import textinput effects
import { Hideo } from 'react-native-textinput-effects';


var styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 20,
    //marginTop: 10,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between'
    
  },
  textBox: {
    height: 50,
   borderTopRightRadius: 5,
   borderBottomRightRadius: 5,
    backgroundColor: '#EDEDED',
    color: '#95989A',
    padding: 10,
   // marginTop:20,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
    
  },
  button: {
    backgroundColor: 'white',
    borderColor: '#95989A',
    borderWidth: 1,
    height: 75,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
  buttonText: {
    color: '#95989A',
    fontSize: 28,
  }
  
});

//variable to render status 
var statusIcon = null;

export default class ChargeCard extends Component {
  
  constructor (props){
    super(props);
    this.state = {
      //put method here that checks for device
      cardReaderConnected: false,
      
      //card details temp storage
      nameOnCard: null,
      debitCardNumber: null,
      expiryDate: null,
      CVV: null
    }
  }
  
  
  //check if card reader is connected and return value of status text
  checkCardReader(){
    if(this.state.cardReaderConnected){
      //if true: render green icon
      statusIcon =  <View style={styles.subContainer}>
          <Icon name="check-circle" size={25} color='green'/>
          <Text>  The card reader is connected!</Text>
        </View>;
    } else {
      //if false: render red icon
      statusIcon = <View style={styles.subContainer}>
          <Icon name="times-circle" size={25} color='red'/>
          <Text style={{color:'#95989A', fontSize:16}}>  The card reader is NOT connected!</Text>
        </View>;
    }
    return statusIcon;
  }
  
  render(){
    return(
      <View style={styles.container}>
        <View>
          {this.checkCardReader()}
        </View>
        <Hideo
            iconClass={Icon}
            iconName={'smile-o'}
            iconColor={'white'}
            // this is used as backgroundColor of icon container view.
            iconBackgroundColor={'#39B7EF'}
            inputStyle={styles.textBox}
              style={{marginBottom: 5}}
            placeholder='Name of card holder'
              multiline={true}
            />
        <Hideo
            iconClass={Icon}
            iconName={'credit-card'}
            iconColor={'white'}
            // this is used as backgroundColor of icon container view.
            iconBackgroundColor={'#39B7EF'}
            inputStyle={styles.textBox}
              style={{marginBottom: 5}}
            placeholder='Debit or credit card number'
              multiline={true}
                          keyboardType='numeric'
            />
                <Hideo
            iconClass={Icon}
            iconName={'calendar-o'}
            iconColor={'white'}
            // this is used as backgroundColor of icon container view.
            iconBackgroundColor={'#39B7EF'}
            inputStyle={styles.textBox}
              style={{marginBottom: 5}}
            placeholder='Expiry date of card'
              multiline={true}
                          keyboardType='numeric'
            />
                <Hideo
            iconClass={Icon}
            iconName={'lock'}
            iconColor={'white'}
            // this is used as backgroundColor of icon container view.
            iconBackgroundColor={'#39B7EF'}
            inputStyle={styles.textBox}
              style={{marginBottom: 5}}
            placeholder='CVV'
              multiline={true}
                          keyboardType='numeric'
            />
        
        
        <View style={{alignItems: 'center'}}>
          <Icon name="camera" size={50} color="#39B7EF"/>
          <Text style={{fontSize:18, fontWeight: '600'}}>Scan</Text>
        </View>
        
        <TouchableOpacity style={styles.button} underlayColor="#39B7EF">
            <Text style={styles.buttonText}>Charge Card</Text>
        </TouchableOpacity>
        
      </View>
    );
  }
}