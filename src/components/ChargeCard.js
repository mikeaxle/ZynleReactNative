import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    BackAndroid,
    Image,
    ActivityIndicator,
    ScrollView,
    NativeModules

} from 'react-native';

//instantiate magnetic card reader module
const magnetic = NativeModules.mreaderManager

import Api from '../utils/Api'; //import zynle api
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; //import icons
import { Hideo } from 'react-native-textinput-effects'; //import textinput effects
import { CardIOModule, CardIOUtilities } from 'react-native-awesome-card-io'; //import carIO

/**     import redux  stuff   **/
import { connect } from 'react-redux';
import { moveToScreen, backScreen, getTrasnactionId } from '../actions';

//import creditcardutils from 'creditcardutils';

//define screen styes
var styles = {
    container: {
        flex:1,
        padding: 20,
        //marginTop: 10,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'space-between'

    },
    textBox: {
        height: 40,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: '#EDEDED',
        padding: 10,
        fontSize:16,
        // marginTop:20,
    },
    subContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10

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


//variable to render status
var statusIcon = null;

class ChargeCard extends Component {

    static navigationOptions = {


        // Nav options can be defined as a function of the navigation prop:
        title: (navigation) => `Charging K${navigation.state.title}`,
        header: (navigation) => ({
            left: (
                <TouchableOpacity
                    style={{marginLeft: 20}}
                    onPress={() => navigation.dispatch({type: 'navigate', payload: 'Charge'})}>
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
            this.props.moveToScreen('Charge');
            return true
        })


        //set header title
        this.props.navigation.state.title = this.props.totalCharge
        
    }

    componentWillMount(){

                //test
        magnetic.greetUser("Mike", (res)=> {
            console.log("the user was greeted: " + res )
        })

    }

   componentWillUnmount() {
        BackAndroid.removeEventListener('backPress')
        //magnetic.onDestroy()
    }


    //define local state
    state = {
        cardReaderConnected: false, //card swipe flag

        res: null,


        //**     card details
        nameOnCard: '',
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: ''

    }
    
    //method to run magentic card listener and return result
    magenticCardScan(){
        magnetic.run( (cardNo, cardHolder, expDate) => {
            this.setState({
                nameOnCard: cardHolder,
                cardNumber: cardNo,
                expiryMonth: expDate.substring(2), 
                expiryYear: expDate.substring(0,2)
            })
        })
    }

//charge card method
    chargeCard(){

        //validation
        /*if (this.state.cardNumber === null || this.state.expiryDate === null || this.state.cvv === null){
         Alert.alert('Scan card using peripheral or camera, or enter card details manually');
         } else {
         //call zynle api


         //navigate to success screen

         }*/
        this.setState({ 'loading': true});

        //Call zynle api and attempt to make payment
        this.state.res = Api.CallWebAPI(this.props.totalCharge, this.state.cardNumber, this.state.expiryMonth, this.state.expiryYear, this.state.cvv,'Sales From ZynlePay App',this.state.nameOnCard)
            .then((response) => {

                //set loading to true

                console.log(response)

                if(response.responseDescription === 'Success'){

                    //save transaction id in redux state

                    this.props.getTrasnactionId(response.transactionId);

                    //navigate to charge screen
                    this.props.moveToScreen('PaymentSuccess');

                } else {
                    //set loading to false
                    this.setState({ 'loading': false})
                    Alert.alert(
                        'Transaction Failed',
                        'The card was not charged.',
                        [{text: 'Ok'}]
                    );
                }

            })
            .catch((error) => {
                this.setState({ 'loading': false})
                Alert.alert(
                    'No internet connectivity...',
                    'It appears your phone is not connected to the internet. Please connect to a wifi network or turn on your mobile data',
                    [{text: 'Got it', onPress: () => console.log(error)}]
                )
            })
    }

//scan card method
    scanCard() {
        CardIOModule
            .scanCard()
            .then(card => {

                console.log(card);
                // the scanned card
                this.setState({
                    nameOnCard: card.cardholderName,
                    cardNumber: card.cardNumber,
                    expiryMonth: card.expiryMonth.toString(),
                    expiryYear: card.expiryYear.toString(),
                    cvv: card.cvv,
                    loading: false

                });
                ;

            })
            .catch((error) => {
                // the user cancelled
                Alert.alert('Card Scan Cancelled',
                    'If you are unable to scan your card for some reason, you can still enter the card details manually or use the card reader peripheral',
                    [
                        {text:'Try other options', onPress: () => console.log(error)}

                    ]);
            })
    }

    //check if card reader is connected and return value of status text
    checkCardReader(){
        if(this.state.cardReaderConnected){
            //if true: render green icon
            statusIcon =  <View style={styles.subContainer}>
                <Icon name="check-circle" size={25} color='green'/>
                <Text>  The card reader is connected!</Text>
            </View>;
        } else {
            //if false: render red icon
            statusIcon = <View style={styles.subContainer}>
                <Icon name="close-circle" size={25} color='red'/>
                <Text style={{color:'#95989A', fontSize:16}}>  The card reader is NOT connected!</Text>
            </View>;
        }
        return statusIcon;
    }


    //function to render spinner or button
    renderSpinnerOrButton(){

        //check state value of loading varibale
        if(this.state.loading){

            //render spinner
            return <ActivityIndicator size= "large" style={{height: 55, margin:20}}/>

        } else {
            //render button
            return                 <TouchableOpacity style={styles.button} underlayColor="#39B7EF"
                                                     onPress={this.chargeCard.bind(this)}>
                <Text style={styles.buttonText}>Charge Card</Text>
            </TouchableOpacity>
        }


    }



    render(){
        /** call card magentic reader listener  */
        this.magenticCardScan()
      
        return(
            <ScrollView scrollEnabled={false} contentContainerStyle={styles.container}  >
                <View>
                    {this.checkCardReader()}
                </View>

                <Hideo
                    iconClass={Icon}
                    iconName={'account-settings'}
                    iconColor={'white'}
                    // this is used as backgroundColor of icon container view.
                    iconBackgroundColor={'#39B7EF'}
                    inputStyle={styles.textBox}
                    style={{marginBottom: 5}}
                    placeholder='Name of card holder'
                    multiline={true}
                    onChangeText={(nameOnCard) => this.setState({nameOnCard})}
                    value={this.state.nameOnCard}
                />


                <Hideo
                    iconClass={Icon}
                    iconName={'credit-card'}
                    iconColor={'white'}
                    // this is used as backgroundColor of icon container view.
                    iconBackgroundColor={'#39B7EF'}
                    inputStyle={styles.textBox}
                    style={{marginBottom: 5}}
                    placeholder='Debit or credit card number'
                    multiline={true}
                    keyboardType='numeric'
                    onChangeText={(cardNumber) => this.setState({cardNumber})}
                    value={this.state.cardNumber}
                />

                <Hideo
                    iconClass={Icon}
                    iconName={'lock'}
                    iconColor={'white'}
                    // this is used as backgroundColor of icon container view.
                    iconBackgroundColor={'#39B7EF'}
                    inputStyle={styles.textBox}
                    style={{marginBottom: 5}}
                    placeholder='CVV'
                    multiline={true}
                    keyboardType='numeric'
                    onChangeText={(cvv) => this.setState({cvv})}
                    value={this.state.cvv}
                    secureTextEntry
                />

                <Text style={{fontSize: 16, color: '#95989A', alignSelf: 'center', marginBottom: 5}}>Expiry Date</Text>
                <View style={{flexDirection: 'row', flex: 1, }}>
                    <Hideo
                        iconClass={Icon}
                        iconName={'calendar'}
                        iconColor={'white'}
                        // this is used as backgroundColor of icon container view.
                        iconBackgroundColor={'#39B7EF'}
                        inputStyle={styles.textBox}
                        style={{marginBottom: 5,marginRight:5}}
                        placeholder='MM'
                        multiline={true}
                        keyboardType='numeric'
                        onChangeText={(expiryMonth) => this.setState({expiryMonth})}
                        value={this.state.expiryMonth}
                        maxLength={2}
                    />

                    <Hideo
                        iconClass={Icon}
                        iconName={'calendar-range'}
                        iconColor={'white'}
                        // this is used as backgroundColor of icon container view.
                        iconBackgroundColor={'#39B7EF'}
                        inputStyle={styles.textBox}
                        style={{marginBottom: 5, marginLeft:5}}
                        placeholder='YY'
                        multiline={true}
                        keyboardType='numeric'

                        onChangeText={(expiryYear) => this.setState({expiryYear})}
                        value={this.state.expiryYear}
                        maxLength={2}
                    />
                </View>


                <View style={{alignItems: 'center', marginTop:10}}>
                    <TouchableOpacity
                        onPress={this.scanCard.bind(this)}>
                        <Icon name="credit-card-scan" size={70} color="#39B7EF"/>
                        <Text style={{fontSize:18, fontWeight: '600', alignSelf: 'center'}}>Scan</Text>
                    </TouchableOpacity>

                </View>

                {this.renderSpinnerOrButton()}

            </ScrollView>
        );
    }
}


//map redux state to local props
const mapStateToProps = (state) => {

    return {

        //return the sum of all sale items aka total amount
        totalCharge: state.sale.reduce(function(result, item) {
            return result + Number(item.amount);
        }, 0)
    };
};


export default connect(mapStateToProps,{ moveToScreen, backScreen, getTrasnactionId })(ChargeCard);