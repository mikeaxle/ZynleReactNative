import React, { Component } from 'react';

//import icons
import Icon from 'react-native-vector-icons/SimpleLineIcons';


import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ListView,
    AsyncStorage
} from 'react-native';

import FormatMoney from '../utils/FormatMoney' //import number formatting function

import dateFormat from 'dateformat';

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


};

const stylesItem = {
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5
    },
    text: {
        fontSize: 14,
        //fontWeight: '400',
        color: '#95989A'
    }
};

//let history = [{amount: 0, time: 0}]

export default class PastSales extends Component {

//'@MyApp:history'

  ///read async storage
   onLoad = async (oResult) => {

       let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
       if(oResult){
           try{
               oResult = JSON.parse(oResult);
               this._history = oResult;
               this.setState({dataSource: ds.cloneWithRows(this._history)});
           }
           catch(exp){
               console.log(exp);
           }
       }


    }

    state = {
        dataSource: null
    }

    componentWillMount() {

        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })

        AsyncStorage.getItem('@MyApp:history').then((value) => {this.onLoad(value)})

        this._history = [{amount: 0, time: 0}]
        this.state.dataSource =  ds.cloneWithRows(this._history)
    }


    renderItem(rowData){

       let now = dateFormat(rowData.time, "h:MM ddd mmm dS, yyyy")

        return (
            <View style={stylesItem.container}>
                <Icon name="credit-card" size={25} color='#95989A'/>
                <Text style={stylesItem.text}>{FormatMoney(rowData.amount,'K','',',','.',2,2)}</Text>
                <Text style={stylesItem.text}>{now}</Text>
            </View>
        )
    }

  
  render() {
    return(
        <View style={styles.container}>
          <Text></Text>
          <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderItem}
          />
        </View>
    );
  }
}