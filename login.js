/**
 * Uses as Sample React Native App Login.ios.js
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Login Page!!
        </Text>
        <Text style={styles.instructions}>
          The intention is to include it and run it on Index after rendering text
        </Text>
        <Text style={styles.instructions}>
          Armands,{'\n'}
          can you provide a small tutorial that is up to date on how to call a funciton from an other fiel
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});