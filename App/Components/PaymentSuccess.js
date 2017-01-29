import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';

//import icons
import Icon from 'react-native-vector-icons/EvilIcons';

//import textinput effects
import { Hideo } from 'react-native-textinput-effects';

var styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'white'
  },
  
  greyContainer: {
    padding: 20,
    backgroundColor: '#EDEDED',
    borderColor: '#95989A',
    borderBottomWidth: 1,
   flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  
  heading1:{
    color: '#95989A',
    fontSize: 16
  },
  
  heading2:{
    color: '#95989A',
    fontSize: 16,
    fontWeight: "bold",
    textAlign: 'center'
  },
   heading3:{
    color: '#95989A',
    fontSize: 20,fontWeight: 'bold'
  },
  
  whiteContainer: {
    alignItems: 'center',
    padding: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
    
  },
  
  textBox: {
    
    //height: 50,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: '#EDEDED',
    color: '#95989A',
    //textAlign: 'center'
   // padding: 10,
    //marginBottom:10,
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

export default class PaymentSuccess extends Component {
  render(){
    return(
      <View style={styles.container}>
          
        
        <View style={styles.greyContainer}>
          <Text style={styles.heading3}>Payment Successful</Text>
          <Icon name="check" size={150} color='#95989A'/>
          <Text style={styles.heading2}>Payment for K000,000.00 was successful</Text>
          <Text style={styles.heading1}>How would u like your reciept?</Text>
        </View>
        <View style={styles.whiteContainer}>

            <Hideo
            iconClass={Icon}
            iconName={'comment'}
            iconColor={'white'}
            // this is used as backgroundColor of icon container view.
            iconBackgroundColor={'#39B7EF'}
            inputStyle={styles.textBox}
              style={{marginBottom: 5}}
            placeholder='SMS reciept'
              multiline={true}
            />

             <Hideo
            iconClass={Icon}
            iconName={'envelope'}
            iconColor={'white'}
            // this is used as backgroundColor of icon container view.
            iconBackgroundColor={'#39B7EF'}
            inputStyle={styles.textBox}
            style={{marginTop: 5}}
            placeholder='Email reciept'
               multiline={true}
            />  
          
          
          <Text style={styles.heading1}>If you do not want to send a reciept, simply leave both of the above fields empty.</Text>
         
          <TouchableOpacity style={styles.button} underlayColor="#39B7EF">
            <Text style={styles.buttonText}>Complete</Text>
          </TouchableOpacity>
        </View>  
      </View>
    );
  }
}



/*
          <TextInput style={styles.textBox} 
            placeholder='SMS reciept'
            keyboardType='phone-pad'
            />

          
          <TextInput style={styles.textBox} 
            placeholder='Email reciept'
            keyboardType='email-address'
            /> */