import React, { Component } from 'react';

/**     import redux  stuff   **/
import { connect } from 'react-redux';
import { moveToScreen, createSale } from '../actions';

import Tabs from './Tabs';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
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
            visible: false,
        }
    };

    state = {
      toolTipText: 'this is a tool tip',
    };

    //function to go to charge screen
    goToCharge(){

      //check if totalCharge is more than zero
      /*  if(this.state.totalCharge === 0 ){
          //display alert
            Alert.alert(
                '...Sorry',
                'You must enter a value to charge a card.',[
                    {text: 'Correct this'},
                ]
            );
        } else{
           //navigate to chargeCard
        }*/


        this.props.moveToScreen('ChargeCard');


    }
  
  
  render(){

      console.log(this.props);

    return (
      <View style={styles.container}>

        <View style={styles.header}>

            <TouchableOpacity
                onPress={() => this.props.moveToScreen('SalesList')}
                style={{flexDirection:'row'}}>
                <Text style={styles.headerText}>Current Sale</Text>
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
            <Text style={styles.buttonText}>K{this.props.totalCharge}</Text>
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