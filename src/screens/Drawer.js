import AsyncStorage from '@react-native-community/async-storage';
import React, {Component} from 'react';
import DrawerNasabah from './nasabah/Drawer';
import DrawerPengurus1 from './pengurus1/Drawer';
import DrawerPengurus2 from './pengurus2/Drawer';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';

export default class Drawer extends Component {
  constructor() {
    super();
    this.state = {
      role: '',
      token: '',
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('token')
      .then((value) => {
        if (value != null) {
          this.setState({token: value});
          this.getRole();
        } else {
          console.log('token tidak tersedia.');
        }
      })
      .catch((err) => console.log(err));
  }

  getRole() {
    console.log('mengambil role user..');
    fetch('http://mini-project-e.herokuapp.com/api/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((response) => response.json())
      .then((responseJSON) => {
        if (responseJSON.user.role != null) {
          this.setState({role: responseJSON.user.role});
          console.log('role yg sedang masuk: ', this.state.role);
        } else {
          console.log('gagal mengambil role user.');
        }
      })
      .catch((err) => console.log(err));
  }

  alert() {
    Alert.alert('Terjadi Kesalahan', 'Tidak bisa mengambil role user.', [
      {text: 'Ok'},
    ]);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.state.role == '' ? (
          <View
            style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size="large" color="red" />
          </View>
        ) : (
          <>
            {this.state.role == 1 ? (
              <DrawerNasabah navigation={this.props.navigation} />
            ) : (
              <>
                {this.state.role == 2 ? (
                  <DrawerPengurus1 navigation={this.props.navigation} />
                ) : (
                  <DrawerPengurus2 navigation={this.props.navigation} />
                )}
              </>
            )}
          </>
        )}
      </View>
    );
  }
}
