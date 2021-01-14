import AsyncStorage from '@react-native-community/async-storage';
import React, {Component} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';

export default class Contact extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      data: 'a',
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('token')
      .then((value) => {
        console.log(value);
        this.setState({token: value});
      })
      .catch((err) => console.log(err));
  }

  getContact() {
    fetch('', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((response) => response.json())
      .then((responseJSON) => {
        console.log(responseJSON);
        if (responseJSON.status == 'success') {
          this.setState({data: responseJSON.kontak});
        } else {
          this.alert();
        }
      })
      .catch((err) => console.log('terjadi kesalahan. ', err));
  }

  alert() {
    Alert.alert('Terjadi Kesalahan', 'Gagal mengambil kontak.', [{text: 'Ok'}]);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.headerView}>
          <Image
            source={require('../assets/icons8-chat-64.png')}
            style={styles.headerIcon}
          />
          <Text> Kontak </Text>
        </View>
        <View style={styles.viewMain}>
          {this.state.data == '' ? (
            <View>
              <ActivityIndicator size="large" color="green" />
            </View>
          ) : (
            <>
              <TouchableNativeFeedback
                onPress={() => this.props.navigation.navigate('ChatScreen')}>
                <View style={styles.viewContact}>
                  <Image
                    source={require('../assets/iconPengurus.png')}
                    style={styles.iconMessage}
                  />
                  <Text> Nama Pengurus </Text>
                </View>
              </TouchableNativeFeedback>
              <View style={styles.viewSplit}></View>
            </>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerIcon: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
    marginRight: 15,
  },
  headerView: {
    padding: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    elevation: 3,
  },
  iconMessage: {
    width: 45,
    height: 45,
    borderRadius: 35 / 2,
    marginRight: 10,
  },
  viewContact: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewMain: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10,
  },
  viewSplit: {
    borderWidth: 0.5,
    borderColor: 'grey',
    marginVertical: 5,
  },
});
