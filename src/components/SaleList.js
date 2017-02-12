import React, { Component } from 'react';

/**     import redux  stuff   **/
import { connect } from 'react-redux';
import { moveToScreen } from '../actions';


import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ListView
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
    buttonText: {
        color: 'white',
        fontSize: 28,
    },


}


//create SalesList Screen
class SalesList extends  Component {

    //define navigation option - hide header
    static navigationOptions = {
        title: 'Total: K',  //add variable from redux
        header: {
            visible: true,
        }
    };

    //function to clear sales
    clearSales(){

    }


    render() {
        return(
            <View style={styles.container}>
                <Text>This text is here</Text>

                <View style={{padding: 10}}>
                    <TouchableOpacity
                        style={styles.button}
                        underlayColor="#39B7EF"
                        onPress={() => this.props.moveToScreen('SalesDetail')}
                    >
                        <Text style={styles.buttonText}>Clear Sale</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }

}

//map redux state to local props
const mapStateToProps = (state) => {

    return {
        sale: state.sale
    }
}


//connect reducers and actions
export default connect(mapStateToProps, { moveToScreen })(SalesList);