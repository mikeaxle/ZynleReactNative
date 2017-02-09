import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert
} from 'react-native'; 


import NumPad from '../Utils/NumPad';
import ChargeCard from './ChargeCard';
import PaymentSuccess from './PaymentSuccess';


import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { StackNavigator } from 'react-navigation';
import LoginForm from './LoginForm';



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
    fontSize:16,
   // textAlign: 'right',
   //flex: 1
  },
  addNoteKeypad: {
   //flex:1,
    flexDirection: 'row'
    
  },
    addNoteTextKeypad: {
    color: '#B5B7B8',
    fontSize:20,
   // textAlign: 'left',
    //flex:1
  },
  numpadKeypad: {
    flexDirection: 'row',
    flex: 1,
    //justifyContent: 'space-around',
    //alignItems: 'flex-end'
  },
});

//modal styles
var stylesModal = StyleSheet.create({
  container: {
    //padding: 20
  },
  
  header: {
    //marginTop:20,
    padding: 20,
    height: 50,
    backgroundColor: '#EDEDED',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    fontSize: 20,
    color: '#95989A',
    alignSelf: 'center',
    flex: 2
  },
  
  contentArea: {
    flex:1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 20
    
  },
    textBox: {
    height: 100,
    borderRadius: 5,
    backgroundColor: '#EDEDED',
    color: '#95989A',
    padding: 10,
      fontSize: 18
    //marginTop:20,
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


//Charge Component Screen
export default class Charge extends Component {
  
  //set navigation options
  static navigationOptions = {
    title: 'Charge',
    header: {
      visible: false,
    }
  };
  
  
  //define state
   constructor(props){
    super(props);
    this.state = {
      toolTipText: 'this is a tool tip',
      totalCharge: 0,
      note: 'undefined product',
      modalVisible: false
    }
  }
  
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  
  //append numbers to screen
    addToScreen(num) {
    console.log(num + ' was pressed');
    
    //check length of screen number
    if(this.state.totalCharge.length > 5){
      
      Alert.alert('You have reached the purchase limit', 'ass', 
                  [{ text: 'Enter a lower amount' }]);
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
  
  goToCharge(){
    const { navigate } = this.props.navigation;
    if(this.state.totalCharge === 0 || this.state.totalCharge <= 9){
      Alert.alert(
        '...Sorry',
        'You must enter a value of K10 or more to charge a card.',[
          {text: 'Correct this'},
        ]
      );
    } else{
      navigate('ChargeCard',this.state)
    }
  }
  
  render(){
    return (<LoginForm />);
   // const { navigate } = this.props.navigation;
  /*  return (
      <View style={styles.container}>
        
        <View style={stylesModal.container}>
          <Modal animationType={"slide"} transparent={false} visible={this.state.modalVisible} 
            onRequestClose={() => {
              {this.setModalVisible(!this.state.modalVisible)}}}>
            <View>
              <View style={stylesModal.header}>
                  <Icon name="close" size={25} color='#95989A' style={{flex:1}} onPress={() => {this.setModalVisible(!this.state.modalVisible)}}/>
                <Text style={stylesModal.headerText}>Item Name(s)</Text>
              </View>
              <View style={stylesModal.contentArea}>
                <TextInput style={stylesModal.textBox} maxLength={30}
                  placeholder= 'Enter your item name(s) here'
                  multiline={true}
                  maxLength={30}
                  numberOfLines={2} 
                  value={this.state.note}
                  onChangeText={ (note) => this.setState({note})  }/>
                <TouchableOpacity style={stylesModal.button} underlayColor="#39B7EF" 
                  onPress={() => {this.setModalVisible(!this.state.modalVisible)}}>
                  <Text style={stylesModal.buttonText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
        
        <View style={{padding: 10}}>
          <TouchableOpacity style={styles.button} underlayColor="#39B7EF"
            onPress={this.goToCharge.bind(this)}>
            <Text style={styles.buttonText}>Charge </Text>
            <Text style={styles.buttonText}>K{this.state.totalCharge}</Text>
          </TouchableOpacity>
        </View>
        
        
        <View style={{flex:1, backgroundColor: 'white'}}>
          <View style={styles.subContainerKeypad}>
            
            <View style={styles.addNoteKeypad}>
              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(true)}}>
                <Text style={styles.addNoteTextKeypad}>Item Name(s)  <Icon name="note" size={25} color="#39B7EF" /></Text>
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
          <NumPad num={<Icon name="question" size={40} color='red'/>} />
        </View>         
        </View>
      </View>

      
    );*/
  }
};

//setup navigator
const Zynle = StackNavigator({
  Charge: { screen: Charge },
  ChargeCard: { screen: ChargeCard },
  PaymentSuccess: {screen: PaymentSuccess},
}, {
  initialRouteName: 'Charge',
});


AppRegistry.registerComponent('Zynle', () => Zynle);