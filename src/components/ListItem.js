import React, { Component } from 'react';
import { View, Text, TouchableNativeFeedback } from 'react-native';

/**     import redux  stuff   **/
import { connect } from 'react-redux';
import { selectSale } from '../actions';


const styles = {
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#95989A'
    }
}

class ListItem  extends Component {


    render(){

        console.log(this.props.sale);

        return(
            <TouchableNativeFeedback
                onPress={() => this.props.selectSale()}>
                <View style={styles.container}>
                    <Text style={styles.text}>K{this.props.sale.amount}</Text>
                    <Text style={styles.text}>{this.props.sale.note}</Text>
                    <Text style={styles.text}>{this.props.sale.index}</Text>
                </View>
            </TouchableNativeFeedback>
        );
    }
}


export default connect(null, { selectSale })(ListItem);
