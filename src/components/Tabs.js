import React, { Component } from 'react';
import { View, } from 'react-native';

import Keypad from './Keypad';
import PastSales from './PastSales';

import { TabNavigator, } from 'react-navigation'; //import tabs

const styles = {
    container: {
        flex: 1,
    },
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tab: {
        backgroundColor: 'white',
    }
};

const BasicApp = TabNavigator({
    'KEYPAD' : {screen: Keypad},
    'PAST SALES': {screen: PastSales},
    }, {
    tabBarOptions: {
        inactiveTintColor: '#95989A',
        activeTintColor: '#39B7EF',
        labelStyle: { fontSize: 20 },
        pressColor: '#95989A',
        indicatorStyle: {
            height: 5,
            backgroundColor: '#95989A'
        },
        style: styles.tab,
    }
    }
);





export default class Tabs extends Component {

/*
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
  };*/


  render() {
    return (
      <BasicApp />

    
    );
  }
}


/*<TabViewAnimated
style={styles.container}
navigationState={this.state}
renderScene={this._renderScene}
renderHeader={this._renderHeader}
onRequestChangeTab={this._handleChangeTab}
/>*/