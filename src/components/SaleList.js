import React, { Component } from 'react';

/**     import redux  stuff   **/
import { connect } from 'react-redux';
import { moveToScreen, selectSale } from '../actions';


import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ListView,
    TouchableNativeFeedback,
    BackAndroid
} from 'react-native';

//import ListItem from './ListItem'; //import list item


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

    //define navigation option - show header
    static navigationOptions = {

        title:'Total K',
        header: {
            visible: true,
        }
    };


    constructor(props){
        super(props);
        this.state = {
            red: 'ass'
        }
    }

    //set up back button listener
    componentDidMount() {
        BackAndroid.addEventListener('backPress', () => {
            const { navigate } = this.props.navigation

            //  this.nav.goBack(null);
            // if (ChargeCard(nav)) return false
            this.props.moveToScreen('Charge');
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
        this.props.selectSale(rowID);
        this.props.moveToScreen('SalesDetail');

    }

    //function to clear sales
    clearSales(){

    }


    render() {


        return(
            <View style={styles.container}>

                <ListView
                    dataSource={this.dataSource}
                    renderRow={(rowData, sectionID, rowID) =>
                    <TouchableNativeFeedback onPress={this.openSaleItem.bind(this,rowID)}>
                    <View style={stylesItem.container}>
                     <Text style={stylesItem.text}>K{rowData.amount}</Text>
                     <Text style={stylesItem.text}>{rowData.note}</Text>
                     <Text style={stylesItem.text}>{rowID}</Text>
                     </View>
                     </TouchableNativeFeedback>}
                    />

                <View style={{padding: 10}}>
                    <TouchableOpacity
                        style={styles.button}
                        underlayColor="#39B7EF"
                        onPress={() => this.props.moveToScreen('SalesDetail')}>
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
export default connect(mapStateToProps, { moveToScreen, selectSale })(SalesList);