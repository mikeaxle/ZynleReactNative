import React, { Component } from 'react';


import NumPad from '../utils/NumPad'; //import number component
import Icon from 'react-native-vector-icons/SimpleLineIcons'; //import icons

/**     import redux  stuff   **/
import { connect } from 'react-redux';
import { createSale } from '../actions';


import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TextInput,
    Alert
} from 'react-native';


//define screen styles
const styles = {
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
};


//define modal styles
const stylesModal = {
    container: {

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
};

class Keypad extends Component {

  //define local state
    state = {
        totalCharge: 0,
        note: 'Product name',
        modalVisible: false
    }

    //set modal to visible
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

    //function to clear numbers on screen
    clearScreen(){
        console.log('clear');
        this.setState({ totalCharge: 0, note: 'Product name'  });
    }

    //function to add to total charge - redux
    addtoTotal(){

      //clear current charge
        this.clearScreen();

      //add to redux
       this.props.createSale({ amount: this.state.totalCharge, note: this.state.note });
    }

    render() {
        return(
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
                      <TextInput style={stylesModal.textBox}
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

              <View style={styles.subContainer}>
                <View style={styles.addNote}>

                  <TouchableOpacity
                      onPress={() => {
                  this.setModalVisible(true)}}>
                    <Text style={styles.addNote}>Item Name(s)  <Icon name="note" size={25} color="#39B7EF" /></Text>
                  </TouchableOpacity>

                </View>

                <View style={styles.itemCharge}>
                  <Text style={styles.itemChargeText}>K{this.state.totalCharge}</Text>
                </View>
              </View>

              <View style={styles.numpad}>
                <NumPad  num={'1'} onPress={this.addToScreen.bind(this, '1')}/>
                <NumPad num={'2'} onPress={this.addToScreen.bind(this, '2')}/>
                <NumPad num={'3'} onPress={this.addToScreen.bind(this, '3')}/>
              </View>

              <View style={styles.numpad}>
                <NumPad num={'4'} onPress={this.addToScreen.bind(this, '4')}/>
                <NumPad num={'5'} onPress={this.addToScreen.bind(this, '5')}/>
                <NumPad num={'6'} onPress={this.addToScreen.bind(this, '6')}/>
              </View>

              <View style={styles.numpad}>
                <NumPad num={'7'} onPress={this.addToScreen.bind(this, '7')}/>
                <NumPad num={'8'} onPress={this.addToScreen.bind(this, '8')}/>
                <NumPad num={'9'} onPress={this.addToScreen.bind(this, '9')}/>
              </View>

              <View style={styles.numpad}>
                <NumPad num={'c'} onPress={this.clearScreen.bind(this)}/>
                <NumPad num={'0'} onPress={this.addToScreen.bind(this, '0')}/>
                <NumPad num={'+'} onPress={this.addtoTotal.bind(this)}/>
              </View>

            </View>


        );
    }
}

/*map redux state to local props
 const mapStateToProps = () => {
    const { amount, note } = state.sale;
 return { amount, note }
 };*/

//connect reducers and actions
export default connect(null,{ createSale })(Keypad);