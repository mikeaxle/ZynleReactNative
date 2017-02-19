import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ToastAndroid,
    BackAndroid,
    Alert,
    AsyncStorage,
    ScrollView,
    KeyboardAvoidingView

} from 'react-native';

import Icon from 'react-native-vector-icons/EvilIcons'; //import icons
import { Hideo } from 'react-native-textinput-effects'; //import textinput effects

/**     import redux  stuff   **/
import { connect } from 'react-redux';
import { moveToScreen, clearSales } from '../actions';

import FormatMoney from '../utils/FormatMoney' //import number formatting function
import KeyboardSpacer from 'react-native-keyboard-spacer';

var styles = {
    container: {
        flex:1,
        backgroundColor: 'white'
    },

    greyContainer: {
        padding: 20,
        backgroundColor: '#EDEDED',
        borderColor: '#95989A',
        borderBottomWidth: 1,
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },

    heading1:{
        color: '#95989A',
        fontSize: 16
    },

    heading2:{
        color: '#95989A',
        fontSize: 16,
        fontWeight: "bold",
        textAlign: 'center'
    },
    heading3:{
        color: '#95989A',
        fontSize: 20,fontWeight: 'bold'
    },

    whiteContainer: {
        alignItems: 'center',
        padding: 10,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'

    },

    textBox: {

        //height: 50,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: '#EDEDED',
        color: '#95989A',
        //textAlign: 'center'
        // padding: 10,
        //marginBottom:10,
    },

    button: {
        backgroundColor: 'white',
        borderColor: '#95989A',
        borderWidth: 1,
        height: 75,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 20,
    },

    buttonText: {
        color: '#95989A',
        fontSize: 28,

    }
};

var totalCharge = null;
var sms = null;

class PaymentSuccess extends Component {


    componentWillMount(){

        //write total sale to Async storage
        this.onLoad()
    }

    //function to check async storage for history storage key
    onLoad = async () => {
        try {

            //look for key at local storage
            let storedValue = await AsyncStorage.getItem('@MyApp:history')

            console.log("stored value is: " + storedValue)

            //if key does not exist, call save method
            if(storedValue === null){

                //create transaction details array with one object being current sale total
                let transactionDetails = JSON.stringify([{amount: this.props.totalCharge, time: Date.now()}])

                console.log("the current value looks like this: "  + transactionDetails)

                //call onSave() method to create object and store
                this.onSave(transactionDetails)

            } else {

                let transactionDetails = {amount: this.props.totalCharge, time: Date()}

                //parse stored value
                storedValue = JSON.parse(storedValue)

                //pop new transaction details into array
                storedValue.push(transactionDetails)

                console.log("the TOTAL array looks like this: "  + storedValue)

                //convert to json
                storedValue = JSON.stringify(storedValue)

                //call onSave() method to create object and store
                this.onSave(storedValue)
            }
        } catch (err) {
            console.log('there was an error loading the data ' + err)
        }
    }

    //function to save to async storage
    onSave = async (text) => {

        try {

            await AsyncStorage.setItem('@MyApp:history', text)
            console.log('saved: successfully on device')


        } catch (err) {
            console.log('Error: there was an error saving data ' + err)
        }
    }

    //set up back button listener
    componentDidMount() {
        BackAndroid.addEventListener('backPress', () => {
            //show alert

            Alert.alert(
                'Not allowed...',
                'You cannot go back to the previous screen. You can start a new transaction by tapping the COMPLETE button.',
                [{text: 'Exit ZynlePay', onPress: () => BackAndroid.exitApp() },{text: 'Got it'}]
            );

            return true
        })
    }

    //remove back button listener
    componentWillUnmount() {
        BackAndroid.removeEventListener('backPress')
    }


  //define local state
  state = {
      phoneNumber: null,
      transactionIdShort: null,
      behavior: 'position'
  }

  //define navigation options for screen
    static navigationOptions = {
        // Nav options can be defined as a function of the navigation prop:
        title: 'Payment Successful',
        header: {
            visible: false
        }
    };

  //function to clear reload app and clear redux state
    goHome(){


        if(this.state.phoneNumber != null){

            //truncate transaction ID
            this.state.transactionIdShort = this.props.transactionId.slice(0,6)

            //send text
            sms = `Thank you for your order. You receipt number is ${this.state.transactionIdShort} for the amount ${FormatMoney(this.props.totalCharge,'K','',',','.',2,2)}`;
            fetch(`http://www.bulksms.co.zm/smsservice/httpapi?username=zynlepay&password=zynle12&msg=${sms}&shortcode=2343&sender_id=0955000679&phone=${this.state.phoneNumber}&api_key=121231313213123123`)
                .catch((error) => {
                    alert(error);
                });
            console.log('sms sent to ' + this.state.phoneNumber);
            ToastAndroid.show(`Receipt Sent to ${this.state.phoneNumber}`, ToastAndroid.SHORT);
        }

        //clear sales stack
        this.props.clearSales();

        //clear navigation stack
        //code here

        //back to home
       this.props.moveToScreen('Charge');


    }

    render(){

        return(
            <ScrollView scrollEnabled={false} contentContainerStyle={styles.container}  >
                    <View style={styles.greyContainer}>
                        <Text style={styles.heading3}>Payment Successful</Text>
                        <Icon name="check" size={150} color='#95989A'/>
                        <Text style={styles.heading2}>Payment for {FormatMoney(this.props.totalCharge,'K','',',','.',2,2)} was successful</Text>
                        <Text>Reference #: {this.props.transactionId}</Text>
                        <Text style={styles.heading1}>How would u like your reciept?</Text>
                    </View>

                    <View style={styles.whiteContainer}>
                        <Hideo
                            iconClass={Icon}
                            iconName={'comment'}
                            iconColor={'white'}
                            // this is used as backgroundColor of icon container view.
                            iconBackgroundColor={'#39B7EF'}
                            inputStyle={styles.textBox}
                            style={{marginBottom: 5}}
                            placeholder='SMS reciept'
                            multiline={true}
                            value={this.state.phoneNumber}
                            onChangeText={ (phoneNumber) => this.setState({phoneNumber}) }
                            keyboardType='phone-pad'
                            onSubmitEditing={this.goHome.bind(this)}
                        />
                        <Text style={styles.heading1}>If you do not want to send a reciept, simply leave the sms field empty.</Text>
                        <TouchableOpacity style={styles.button} underlayColor="#39B7EF"
                                          onPress={this.goHome.bind(this)}>
                            <Text style={styles.buttonText}>Complete</Text>
                        </TouchableOpacity>
                    </View>
            </ScrollView>
        );
    }
}


//map redux state to local props
const mapStateToProps = (state) => {

    return {

        transactionId: state.transaction,

        //return the sum of all sale items aka total amount
        totalCharge: state.sale.reduce(function(result, item) {
            return result + Number(item.amount);
        }, 0)
    };
};

export default connect(mapStateToProps, { moveToScreen, clearSales })(PaymentSuccess);
