import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    BackAndroid

} from 'react-native';


import Api from '../utils/Api'; //import zynle api
import Icon from 'react-native-vector-icons/FontAwesome'; //import icons
import { Hideo } from 'react-native-textinput-effects'; //import textinput effects
import { CardIOModule, CardIOUtilities } from 'react-native-awesome-card-io'; //import carIO

/**     import redux  stuff   **/
import { connect } from 'react-redux';
import { moveToScreen } from '../actions';


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
        height: 50,
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
        marginBottom: 20

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

    componentDidMount() {


        BackAndroid.addEventListener('backPress', () => {
            const { navigate } = this.props.navigation

          //  this.nav.goBack(null);
           // if (ChargeCard(nav)) return false
            this.props.moveToScreen('Charge');
            return true

        })
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('backPress')
    }

    static navigationOptions = {
        // Nav options can be defined as a function of the navigation prop:
        title: `Charge K`,  //use redux for charge total
        header: {
            visible: true,
            right:<Icon name="question-circle" size={25} color='#95989A'style={{marginRight:20}}/>
        }
    };

    //define local state
    state = {
        cardReaderConnected: false, //card swipe flag

        /**     card details        **/
        nameOnCard: 'Michael Lungu',
        cardNumber: '4383755000927515',
        expiryMonth: '04',
        expiryYear: '22',
        cvv: '549'
        }





//charge card method
    chargeCard(){

        //validation
        /*if (this.state.cardNumber === null || this.state.expiryDate === null || this.state.cvv === null){
         alert('Scan card using peripheral or camera, or enter card details manually');
         } else {
         //call zynle api


         //navigate to success screen

         }*/

        //Call zynle api and attempt to make payment
        //var requestResponse = Api.CallWebAPI(sale.totalCharge, this.state.cardNumber, this.state.expiryMonth, this.state.expiryYear, this.state.cvv, sale.note, this.state.nameOnCard);

        //navigate to charge screen
        this.props.moveToScreen('PaymentSuccess');
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
                    cvv: card.cvv

                });

                console.log(this.state);

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
                <Icon name="times-circle" size={25} color='red'/>
                <Text style={{color:'#95989A', fontSize:16}}>  The card reader is NOT connected!</Text>
            </View>;
        }
        return statusIcon;
    }

    render(){


        return(
            <View style={styles.container}>
                <View>
                    {this.checkCardReader()}
                </View>

                <Hideo
                    iconClass={Icon}
                    iconName={'smile-o'}
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
                        iconName={'calendar-o'}
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
                    />

                    <Hideo
                        iconClass={Icon}
                        iconName={'calendar-o'}
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
                    />
                </View>


                <View style={{alignItems: 'center', marginTop:10}}>
                    <TouchableOpacity
                        onPress={this.scanCard.bind(this)}>
                        <Icon name="camera" size={50} color="#39B7EF"/>
                        <Text style={{fontSize:18, fontWeight: '600', alignSelf: 'center'}}>Scan</Text>
                    </TouchableOpacity>

                </View>

                <TouchableOpacity style={styles.button} underlayColor="#39B7EF"
                                  onPress={this.chargeCard.bind(this)}>
                    <Text style={styles.buttonText}>Charge Card</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

export default connect(null,{ moveToScreen })(ChargeCard);