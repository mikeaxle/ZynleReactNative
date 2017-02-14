import React, { Component } from 'react';

/**     import redux  stuff   **/
import { connect } from 'react-redux';
import { moveToScreen, updateSale, deleteSale } from '../actions';


import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ListView,
    TextInput,
    BackAndroid
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
        marginBottom: 170
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

    //set up back button listener
    componentDidMount() {
        BackAndroid.addEventListener('backPress', () => {
            const { navigate } = this.props.navigation

            //  this.nav.goBack(null);
            // if (ChargeCard(nav)) return false
            this.props.moveToScreen('SalesList');
            return true

        })
    }

    //remove back button listener
    componentWillUnmount() {
        BackAndroid.removeEventListener('backPress')
    }


    //define navigation option - hide header
    static navigationOptions = {
        title: 'Amount: K',  //add variable from redux
        header: {
            visible: true,
        }
    };

    //function to clear sales
    clearSale(){
        this.props.deleteSale(this.props.index)
        this.props.moveToScreen('SalesList')
    }

    //function to save changes
    saveSale(){
        this.props.updateSale(this.props.currentSale.amount, this.props.currentSale.note, this.props.index)
       // this.props.moveToScreen('SalesList')
    }


    render() {

        //console.log(this.props.currentSale);
        return(
            <View style={styles.container}>
                <View style={styles.contentAea}>

                    <View style={{marginBottom: 20}}>
                        <Text style={styles.label}>Price</Text>
                        <TextInput
                            style={styles.textBox}
                            value={this.props.currentSale.amount}
                            
                        />
                    </View>

                    <View style={{marginBottom: 20}}>
                        <Text style={styles.label}>Note</Text>
                        <TextInput
                            style={styles.textBox}
                            value={this.props.currentSale.note}
                            
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
                        onChangeText={this.saveSale.bind(this)}
                    >
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }

}

//map redux state to local props
 const mapStateToProps = (state) => {

 return {
     currentSale: state.sale[state.selectedSale],
     index: state.selectedSale
 }
}


//connect reducers and actions
export default connect(mapStateToProps, { moveToScreen, updateSale, deleteSale })(SalesDetail);