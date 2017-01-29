import React, { Component } from 'react';
import {
  View,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
  
} from 'react-native';

//import icons
import Icon from 'react-native-vector-icons/EvilIcons';

var styles = StyleSheet.create({
  container: {
    flex:1,
  },
  
  header: {
    marginTop:20,
    //padding: 20,
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
    height: 50,
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


export default class AddNote extends Component {
  
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon name="close" size={30} color='#95989A' style={{flex:1}}/>
          <Text style={styles.headerText}>Add Note</Text>
        </View>
        <View style={styles.contentArea}>
          <TextInput
            style={styles.textBox}
            maxLength={30}
            />
          
          <TouchableOpacity style={styles.button} underlayColor="#39B7EF">
            <Text style={styles.buttonText}>Charge Card</Text>
          </TouchableOpacity>
        
        </View>
        
      </View>
    );
  }
}