import React, { Component } from 'react';

/**     import redux  stuff   **/
import { connect } from 'react-redux';
import { moveToScreen, selectSale, backScreen, clearSales } from '../actions';


import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ListView,
    TouchableNativeFeedback,
    BackAndroid,
    Button
} from 'react-native';


import FormatMoney from '../utils/FormatMoney' //import number formatting function



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
        fontSize: 18,
        fontWeight: 'bold',
        color: '#95989A'
    }
};




//create SalesList Screen
class SalesList extends  Component {

    static navigationOptions = {
        // Nav options can be defined as a function of the navigation prop:
        title: `Total K`,  //use redux for charge total
        header: (navigation) => ({
            left: (
                <TouchableOpacity
                    style={{marginLeft: 20}}
                    onPress={() => navigation.dispatch({type: 'back_screen'})}>
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
            this.props.backScreen();
            return true
        })
    }



    //setup component data on mount
    componentWillMount(){

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(this.props.sale);

    }

    //remove back button listener
    componentWillUnmount() {
        BackAndroid.removeEventListener('backPress')
    }

    //call actions
    openSaleItem(rowID){
        //select row index
        this.props.selectSale(rowID);

        //navigate to sale details
        this.props.moveToScreen('SalesDetail');
    }

    //function to clear sales
    clearSales(){

        this.props.clearSales();

        //back to previous screen
        this.props.backScreen();

    }


    render() {


        return(
            <View style={styles.container}>

                <ListView
                    dataSource={this.dataSource}
                    renderRow={(rowData, sectionID, rowID) =>
                    <TouchableNativeFeedback onPress={this.openSaleItem.bind(this,rowID)}>
                    <View style={stylesItem.container}>
                     <Text style={stylesItem.text}>{FormatMoney(rowData.amount,'K','',',','.',2,2)}</Text>
                     <Text style={stylesItem.text}>{rowData.note}</Text>
                     </View>
                     </TouchableNativeFeedback>}
                    />

                <View style={{padding: 10}}>
                    <TouchableOpacity
                        style={styles.button}
                        underlayColor="#39B7EF"
                        onPress={this.clearSales.bind(this)}>
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
        //return entire sale list
        sale: state.sale,

        //return the sum of all sale items aka total amount
       // totalCharge: state.sale.reduce(function(result, item) {
        //    return result + Number(item.amount);
        //}, 0)
    }
}


//connect reducers and actions
export default connect(mapStateToProps, { moveToScreen, selectSale, backScreen, clearSales })(SalesList);