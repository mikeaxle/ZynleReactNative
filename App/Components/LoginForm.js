import React, { Component, } from 'react';
import {
  View, 
  TouchableHighlight,
  Text, 
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Alert
  
} from 'react-native';

//import textinput effects
import { Hideo } from 'react-native-textinput-effects';

//import icons
import Icon from 'react-native-vector-icons/FontAwesome';

import base64 from 'base-64';

import Spinner from './Spinner'; 

const styles = StyleSheet.create({
  container: {
    flex:1,
   //justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white'
    //flexDirection: 'column',
    
  },
  icon: {
    //margin: 30,
    backgroundColor: '#39B7EF',
    padding: 20,
    borderRadius: 100,
    alignItems: 'center',
  },
    textBox: {
    height: 50,
   borderTopRightRadius: 5,
   borderBottomRightRadius: 5,
    backgroundColor: '#EDEDED',
    color: '#95989A',
    padding: 10,
    fontSize:16,
   // marginTop:20,
  },
    button: {
    backgroundColor: '#39B7EF',
    borderColor: '#39B7EF',
    borderWidth: 1,
    height: 75,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 28,
  }
});


class LoginForm extends Component {
  
    static navigationOptions = {
    title: 'Login Form',
    header: {
      visible: false,
    }
  };
    
  state = { 
    'username': '0977547820',
    'password': '1234',
    'merchant_id': '45',
    'loading': false,
    'error': ''
  }
  
   sha1(msg) {
        
        function rotate_left(n, s) {
            var t4 = (n << s) | (n >>> (32 - s));
            return t4;
        }
        ;
        function lsb_hex(val) {
            var str = "";
            var i;
            var vh;
            var vl;
            for (i = 0; i <= 6; i += 2) {
                vh = (val >>> (i * 4 + 4)) & 0x0f;
                vl = (val >>> (i * 4)) & 0x0f;
                str += vh.toString(16) + vl.toString(16);
            }
            return str;
        }
        ;
        function cvt_hex(val) {
            var str = "";
            var i;
            var v;
            for (i = 7; i >= 0; i--) {
                v = (val >>> (i * 4)) & 0x0f;
                str += v.toString(16);
            }
            return str;
        }
        ;
        function Utf8Encode(string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";
            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                } else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
            }
            return utftext;
        }
        ;
        var blockstart;
        var i, j;
        var W = new Array(80);
        var H0 = 0x67452301;
        var H1 = 0xEFCDAB89;
        var H2 = 0x98BADCFE;
        var H3 = 0x10325476;
        var H4 = 0xC3D2E1F0;
        var A, B, C, D, E;
        var temp;
        msg = Utf8Encode(msg);
        var msg_len = msg.length;
        var word_array = new Array();
        for (i = 0; i < msg_len - 3; i += 4) {
            j = msg.charCodeAt(i) << 24 | msg.charCodeAt(i + 1) << 16 |
                    msg.charCodeAt(i + 2) << 8 | msg.charCodeAt(i + 3);
            word_array.push(j);
        }
        switch (msg_len % 4) {
            case 0:
                i = 0x080000000;
                break;
            case 1:
                i = msg.charCodeAt(msg_len - 1) << 24 | 0x0800000;
                break;
            case 2:
                i = msg.charCodeAt(msg_len - 2) << 24 | msg.charCodeAt(msg_len - 1) << 16 | 0x08000;
                break;
            case 3:
                i = msg.charCodeAt(msg_len - 3) << 24 | msg.charCodeAt(msg_len - 2) << 16 | msg.charCodeAt(msg_len - 1) << 8 | 0x80;
                break;
        }
        word_array.push(i);
        while ((word_array.length % 16) != 14)
            word_array.push(0);
        word_array.push(msg_len >>> 29);
        word_array.push((msg_len << 3) & 0x0ffffffff);
        for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {
            for (i = 0; i < 16; i++)
                W[i] = word_array[blockstart + i];
            for (i = 16; i <= 79; i++)
                W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
            A = H0;
            B = H1;
            C = H2;
            D = H3;
            E = H4;
            for (i = 0; i <= 19; i++) {
                temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
                E = D;
                D = C;
                C = rotate_left(B, 30);
                B = A;
                A = temp;
            }
            for (i = 20; i <= 39; i++) {
                temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
                E = D;
                D = C;
                C = rotate_left(B, 30);
                B = A;
                A = temp;
            }
            for (i = 40; i <= 59; i++) {
                temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
                E = D;
                D = C;
                C = rotate_left(B, 30);
                B = A;
                A = temp;
            }
            for (i = 60; i <= 79; i++) {
                temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
                E = D;
                D = C;
                C = rotate_left(B, 30);
                B = A;
                A = temp;
            }
            H0 = (H0 + A) & 0x0ffffffff;
            H1 = (H1 + B) & 0x0ffffffff;
            H2 = (H2 + C) & 0x0ffffffff;
            H3 = (H3 + D) & 0x0ffffffff;
            H4 = (H4 + E) & 0x0ffffffff;
        }
        var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
        return temp.toLowerCase();
    }  

  

  
  checkLogin(){
    
    this.setState({ 
      'error': '', 
      'loading': true
    });
    
    //create login submit url
    var request_id = Math.floor(Date.now() / 1000);
    var secret = "b1ad6c0262edce80e705c030760951a35530c771";
    var generate_key = base64.encode(this.sha1(secret + request_id));  
    var url = `http://www.zynlepay.com:8070/zynlepay/zpay/api/userLogin?api_id=0977547820&username=${this.state.username}&password=${this.state.password}&merchant_id=${this.state.merchant_id}&request_id=${request_id}&key=${generate_key}`;
    
    //send login request
    fetch(url).then((response)=> {    
      
      //hide spinner 
      this.setState({ 'loading': false});
      
      if(response.status === 200){
        console.log("success");
        
        //navigate to charge screen
        const { navigate } = this.props.navigation;
        navigate('Charge');
        
        
        //write to Asych Storage
        
        
      } else {
        console.log("failed")
        
        //alert authentication error
        Alert.alert(
          'Something went wrong...',
          'Your login details didn\'t work. If you do not have login credentials, please contact Zynle customer care at 0977547820',
          [{text: 'Got it', onPress: () => console.log('close error box')}]
        );
      }
    })
    .catch((error) => {
      //hide spinner 
      this.setState({ 'loading': false});
      
      //alert network error
      Alert.alert(
          'No internet connectivity...',
          'It appears your phone is not connected to the internet. Please connect to a wifi network or turn on your mobile data',
          [{text: 'Got it', onPress: () => console.log(error)}]
        );
      
      
    });
    
  }
  
  
  renderSpinner(){
    if(this.state.loading){
      return <ActivityIndicator size= "large" style={{height: 55, margin:20}}/>

    } else {
      
      return             <TouchableHighlight style={styles.button} onPress={this.checkLogin.bind(this)}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
    }
    
    
  }

  render() {
    return (
      <View style={styles.container}>
        
        <View style={{flexDirection:'row', alignItems:'center', flex:1, marginBottom:170, marginTop:20}}>        
             <Icon name="credit-card" size={40} color="#fff" style={styles.icon}/>
          <Text style={{fontSize:35}}>  Zynle</Text>
          <Text style={{fontSize:35, color: '#39B7EF'}}>Pay</Text>
        </View>
         
          
                <Hideo
            iconClass={Icon}
            iconName={'phone'}
            iconColor={'white'}
            //this is used as backgroundColor of icon container view.
            iconBackgroundColor={'#39B7EF'}
           inputStyle={styles.textBox}
            style={{marginBottom: 5}}
            placeholder='phone number'
              multiline={true}
            onChangeText={(username) => this.setState({username})}
            value={this.state.username}

                  
            />
        <Hideo
            iconClass={Icon}
            iconName={'chain'}
            iconColor={'white'}
            // this is used as backgroundColor of icon container view.
            iconBackgroundColor={'#39B7EF'}
            inputStyle={styles.textBox}
            style={{marginBottom: 5}}
            placeholder='password'
              multiline={true}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
          secureTextEntry
            />
        <Hideo
            iconClass={Icon}
            iconName={'id-badge'}
            iconColor={'white'}
            // this is used as backgroundColor of icon container view.
            iconBackgroundColor={'#39B7EF'}
            inputStyle={styles.textBox}
            style={{marginBottom: 5}}
            placeholder='Agent ID'
              multiline={true}
            onChangeText={(merchant_id) => this.setState({merchant_id})}
            value={this.state.merchant_id}
            />
        
               
        {this.renderSpinner()}
      </View>
    )
  }
}

export default LoginForm;