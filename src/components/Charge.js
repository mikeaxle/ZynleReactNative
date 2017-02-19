import React, { Component } from 'react'

/**     import redux  stuff   **/
import { connect } from 'react-redux'
import { moveToScreen, createSale } from '../actions'

import Tabs from './Tabs'

import FormatMoney from '../utils/FormatMoney' //import number formatting function

import {
    View,
    Text,
    Image,
    TouchableOpacity,
    BackAndroid,
    Alert,
    AsyncStorage

} from 'react-native';


var styles = {
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
  }
  
};


class Charge extends Component {

    //define navigation option - hide header
    static navigationOptions = {
        title: 'Login Form',
        header: {
            visible: false
        }
    }

    //set up back button listener
    componentDidMount() {
        BackAndroid.addEventListener('backPress', () => {
            //show alert
            Alert.alert(
                'Caution',
                'Would You like to exit ZynlePay?',
                [{text: 'Exit ZynlePay', onPress: () => BackAndroid.exitApp() },{text: 'Cancel'}]
            );

            return true
        })
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('backPress')
    }

    //set local state
    state = {
      toolTipText: 'this is a tool tip',
    }

    //function to go to charge screen
    goToCharge(){

      //check if totalCharge is more than zero
        if(this.props.totalCharge === 0 ){
          //display alert
            Alert.alert(
                'Invalid Amount',
                'You must enter a value more than zero to charge a card.',[
                    {text: 'Correct this'},
                ]
            )
        } else{
           //navigate to chargeCard
            this.props.moveToScreen('ChargeCard');
        }
    }
  
  render(){

       // console.log("this is the total: " + this.state.storedValue)
    return (
      <View style={styles.container}>

        <View style={styles.header}>

            <TouchableOpacity
                onPress={() => { this.props.totalSales === 0 ? Alert.alert('No sales...', 'You have no sales to edit', [{text: 'Add Sales'}]) : this.props.moveToScreen('SalesList')}}
                style={{flexDirection:'row'}}>
                <Text style={styles.headerText}>Current Sale </Text>
                <Image style={styles.saleImage} source={require('../images/salesDock.png')} >
                    <Text style={{color:"#95989A", fontSize:15, fontWeight:"bold"}}>{this.props.totalSales}</Text>
                </Image>
            </TouchableOpacity>
        </View>
      
        <View style={{padding: 10}}>
          <TouchableOpacity
              style={styles.button}
              underlayColor="#39B7EF"
              onPress={this.goToCharge.bind(this)}
          >
            <Text style={styles.buttonText}>Charge </Text>
            <Text style={styles.buttonText}>
                {FormatMoney(this.props.totalCharge,'K','',',','.',2,2)}
                </Text>
          </TouchableOpacity>
        </View>

          <Tabs/>
      </View>

    );
  }
};

//map redux state to local props
const mapStateToProps = (state) => {

    return {

        //return length of sale array aka total number of sales
        totalSales: state.sale.length,

        //return the sum of all sale items aka total amount
        totalCharge: state.sale.reduce(function(result, item) {
            return result + Number(item.amount);
        }, 0) 
    };
};


//connect reducers and actions
export default connect(mapStateToProps,{ moveToScreen })(Charge);

