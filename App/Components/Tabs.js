import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import Keypad from './Keypad';
import PastSales from './PastSales';

//import tab navigation
//import { TabNavigator,} from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/*const BasicApp = TabNavigator({
  Keypad: {screen: KeyPad},
  PastSales: {screen: PastSales},
});*/

export default class Tabs extends Component {
 state = {
    index: 0,
    routes: [
      { key: '1', title: 'KEYPAD' },
      { key: '2', title: 'PAST SALES' },
    ],
  };

  _handleChangeTab = (index) => {
    this.setState({ index });
  };

  _renderHeader = (props) => {
    return <TabBar {...props} style={{backgroundColor:'white'}}  labelStyle={{color:'#95989A', fontSize:20}} indicatorStyle={{backgroundColor:'#95989A', height:5}}/>;
  };

  _renderScene = ({ route }) => {
    switch (route.key) {
    case '1':
      return <Keypad />;
    case '2':
      return <PastSales />;
    default:
      return null;
    }
  };


  render() {
    return (
      
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onRequestChangeTab={this._handleChangeTab}
      />
    
    );
  }
}


