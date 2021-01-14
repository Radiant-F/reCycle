import AsyncStorage from '@react-native-community/async-storage';
import React, {Component} from 'react';
import {Button, Text, View, ImageBackground, StyleSheet} from 'react-native';
import Nasabah from '../screens/nasabah/Home';
import Pengurus1 from '../screens/pengurus1/Home';
import Pengurus2 from '../screens/pengurus2/Home';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      loading: false,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('role').then((value) => {
      this.setState({user: value});
    });
  }

  render() {
    return (
      <View>
        {this.state.user == '' ? (
          <View>
            <Text> Loading </Text>
          </View>
        ) : (
          <>
            {this.state.user == '1' ? (
              <>{this.props.navigation.replace('Nasabah')}</>
            ) : (
              <>
                {this.state.user == '2' ? (
                  <> {this.props.navigation.replace('Pengurus1')} </>
                ) : (
                  <> {this.props.navigation.replace('Pengurus1')} </>
                )}
              </>
            )}
          </>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bg: {
    width: '100%',
    height: '100%',
  },
});
