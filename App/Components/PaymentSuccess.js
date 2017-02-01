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

var totalCharge = null;
var sms = null;
export default class PaymentSuccess extends Component {

  constructor (props){
    super(props);
    
    this.state = {
      phoneNumber: null,
      refrenceNumber: '12356',
    }
  }
  
  static navigationOptions = {
    // Nav options can be defined as a function of the navigation prop:
    title: 'Payment Successful',
  };

  
  goHome(){    
    
    
    if(this.state.phoneNumber != null){
      //send text
      sms = `Thank you for your order. You receipt number is ${this.state.refrenceNumber} for the amount ${totalCharge}`;
      fetch(`http://www.bulksms.co.zm/smsservice/httpapi?username=zynlepay&password=zynle12&msg=${sms}&shortcode=2343&sender_id=0955000679&phone=${this.state.phoneNumber}&api_key=121231313213123123`);
      console.log('sms sent to ' + this.state.phoneNumber);
    }
   
    //send home
    const { navigate } = this.props.navigation;
    navigate('Charge');
  }
  
  render(){
    const  { params }  = this.props.navigation.state;
    totalCharge = params;
    return(
      <View style={styles.container}>
        
        <View style={styles.greyContainer}>
          <Text style={styles.heading3}>Payment Successful</Text>
          <Icon name="check" size={150} color='#95989A'/>
          <Text style={styles.heading2}>Payment for K{params} was successful</Text>
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
              value={this.state.phoneNumber}
              onChangeText={ (phoneNumber) => this.setState({phoneNumber}) }
              keyboardType='numeric'
            />          
          <Text style={styles.heading1}>If you do not want to send a reciept, simply leave the sms field empty.</Text>
         
          <TouchableOpacity style={styles.button} underlayColor="#39B7EF"
            onPress={this.goHome.bind(this)}
            >
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