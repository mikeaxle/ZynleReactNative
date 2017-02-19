import React, { Component } from 'react';

/**     import redux  stuff   **/
import { connect } from 'react-redux';
import { moveToScreen, updateSaleAmount, updateSaleNote , deleteSale, backScreen } from '../actions';

import KeyboardSpacer from 'react-native-keyboard-spacer'; //import keyboard spacer


import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ListView,
    TextInput,
    BackAndroid,
    ScrollView
} from 'react-native';


//define scene styles
const styles = {

    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        padding:20
    },
    button: {
        backgroundColor: 'red',
        height: 75,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    buttonSave: {
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
    contentAea: {
        marginBottom: 100
    },
    textBox: {
        height: 50,
        borderRadius: 5,
        backgroundColor: '#EDEDED',
        color: 'black',
        padding: 10,
        fontSize:16,
        // marginTop:20,
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5

    }
};



//create SaleDetail Screen
class SalesDetail extends  Component {

    static navigationOptions = {
        // Nav options can be defined as a function of the navigation prop:
        title: (navigation) => `Total: K${navigation.state.title}`,
        header: (navigation) => ({
            left: (
                <TouchableOpacity
                    style={{marginLeft: 20}}
                    onPress={() => navigation.dispatch({type: 'navigate', payload: 'SalesList'})}>
                    <Image style={{width:25, height:25}} source={require('../images/Undo-100.png')}/>
                </TouchableOpacity>
            ),
            tintColor: '#95989A',
            style: {
                backgroundColor: '#EDEDED'
            }
        }),
    };

    //set up back button listener
    componentDidMount() {
        BackAndroid.addEventListener('backPress', () => {
            //dispatch back action
            this.props.backScreen('SalesList');
            return true
        })

        //set header titles
        this.props.navigation.state.title = this.props.currentSale.amount
    }

    //remove back button listener
    componentWillUnmount() {
        BackAndroid.removeEventListener('backPress')
    }


    //function to clear sales
    clearSale(){
        //delete sale at index of
        this.props.deleteSale(this.props.index);

        //dispatch back action
        this.props.backScreen();
    }

    //function to save changes
    saveSale(){

        this.props.backScreen('SalesList');
    }


    //update amount redux state
    onAmountChanged(amount){

        //remove all non number characters from input
        let newAmount = '';
        let numbers = '0123456789';

        for (var i = 0; i < amount.length; i++) {
                if ( numbers.indexOf(amount[i]) > -1 ) {
                    newAmount = newAmount + amount[i];

            }

        }
        this.props.updateSaleAmount(newAmount,this.props.index)

    }

    //update note redux state
    onNoteChanged(note){

        this.props.updateSaleNote(note,this.props.index)

    }


    render() {

        return(
            <ScrollView scrollEnabled={false} contentContainerStyle={styles.container}  >
                <View style={styles.contentAea}>

                    <View style={{marginBottom: 20}}>
                        <Text style={styles.label}>Price</Text>
                        <TextInput
                            style={styles.textBox}
                            value={this.props.currentSale.amount}
                            onChangeText={this.onAmountChanged.bind(this)}
                            keyboardType='numeric'

                        />
                    </View>

                    <View style={{marginBottom: 20}}>
                        <Text style={styles.label}>Note</Text>
                        <TextInput
                            style={styles.textBox}
                            value={this.props.currentSale.note}
                            onChangeText={this.onNoteChanged.bind(this)}
                            onSubmitEditing={this.saveSale.bind(this)}

                        />
                    </View>

                </View>

                <View style={{padding: 10}}>
                    <TouchableOpacity
                        style={styles.button}
                        underlayColor="#39B7EF"
                        onPress={this.clearSale.bind(this)}
                    >
                        <Text style={styles.buttonText}>Remove Item</Text>
                    </TouchableOpacity>
                </View>

                <View style={{padding: 10}}>
                    <TouchableOpacity
                        style={styles.buttonSave}
                        underlayColor="#39B7EF"
                        onPress={this.saveSale.bind(this)}

                    >
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }

}

//map redux state to local props
const mapStateToProps = (state) => {


    /*    if(state.sale !== []){
     return {
     currentSale: state.sale[state.selectedSale],
     index: state.selectedSale
     }
     } else {
     return null
     }*/

    return {
        currentSale: state.sale[state.selectedSale],
        index: state.selectedSale
    }

}


//connect reducers and actions
export default connect(mapStateToProps, { updateSaleAmount, updateSaleNote, deleteSale, backScreen, moveToScreen })(SalesDetail);