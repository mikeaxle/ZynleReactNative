import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableHighlight,
    TouchableNativeFeedback
} from 'react-native';

var styles = {
    container: {
        //width: 120,
        //height: 50,
        //paddingTop: 10,
        //paddingBottom: 10,
        borderColor: '#EFEFEF',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        //alignSelf: 'center',
        flex: 1,
        //flexDirection: 'column'


    },
    number: {
        fontSize: 35,
    },
};

export default class NumPad extends Component {

    render(){
        return (
            <TouchableNativeFeedback
                onPress={this.props.onPress}>
                <View style={styles.container}>
                    <Text style={{color: this.props.num === 'c' ? '#39B7EF' : '#95989A' && this.props.num === '+' ? '#39B7EF' : '#95989A', fontSize:35 }}>
                        {this.props.num}
                        </Text>
                </View>
            </TouchableNativeFeedback>
        );
    }
}


/*

 <TouchableHighlight
 style={styles.container}
 underlayColor={'#EDEBE5'}
 onPress={this.props.onPress}>
 <Text style={{color: this.props.num === 'c' ? '#39B7EF' : '#95989A' && this.props.num === '+' ? '#39B7EF' : '#95989A', fontSize:35 }}>{this.props.num}</Text>
 </TouchableHighlight>

 */