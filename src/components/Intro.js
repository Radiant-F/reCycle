import React, {Component} from 'react';
import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import Lottie from 'lottie-react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class Intro extends Component {
  constructor() {
    super();
    this.state = {
      isFirst: 'a',
    };
  }

  componentDidMount() {
    AsyncStorage.setItem('first', this.state.isFirst);
  }

  render() {
    return (
      <View style={styles.mainView}>
        <Lottie
          source={require('../assets/23968-save-environment.json')}
          autoPlay
          style={{width: 350, height: 350}}
        />
        <Text style={styles.text}>
          Kumpulkan sampah masyarakat, selamatkan lingkungan, dan dapatkan uang!
        </Text>
        <TouchableNativeFeedback
          onPress={() => this.props.navigation.replace('Login')}>
          <View style={styles.button}>
            <Text style={styles.text2}> Gaskeun </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#c25100',
    includeFontPadding: false,
    textAlign: 'center',
    marginVertical: 10,
    // textShadowColor: '#24c200',
    // textShadowRadius: 1,
    textShadowOffset: {
      width: 1,
      height: 1,
    },
  },
  button: {
    width: 150,
    height: 40,
    backgroundColor: '#1d8500d4',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    elevation: 1,
  },
  text2: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
    includeFontPadding: false,
    textShadowColor: '#A52A2A',
    textShadowRadius: 1,
    textShadowOffset: {
      width: 1,
      height: 1,
    },
  },
});
