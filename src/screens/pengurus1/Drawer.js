import AsyncStorage from '@react-native-community/async-storage';
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  Image,
  Alert,
} from 'react-native';

export default class Drawer extends Component {
  logout() {
    console.log('dadah.');
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('role');
    this.props.navigation.replace('Login');
  }

  confirmLogout() {
    Alert.alert('Mau Keluar?', 'Sesi Anda akan berakhir.', [
      {text: 'Tidak'},
      {text: 'Ya', onPress: () => this.logout()},
    ]);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View>
          <Image
            source={require('../../assets/block-recycle-reduce-reuse-logo-wallpapers.jpeg')}
            style={styles.ppCover}
          />
          <View style={styles.pp}>
            <Image
              source={require('../../assets/iconPengurus.png')}
              style={{width: 80, height: 80}}
            />
          </View>
          <View style={styles.viewProfile}>
            <View style={styles.viewTextUser}>
              <Text style={{color: 'grey'}}>Selamat datang,</Text>
              <Text style={styles.textUser}>Admin</Text>
            </View>
            <TouchableNativeFeedback
              onPress={() => this.props.navigation.navigate('ProfileEdit')}>
              <View style={styles.subViewProfile}>
                <Image
                  source={require('../../assets/settings-cogwheel-button.png')}
                  style={styles.iconProfile}
                />
                <Text>Pengaturan</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={() => this.confirmLogout()}>
              <View style={styles.subViewProfile}>
                <Image
                  source={require('../../assets/change-power-options.png')}
                  style={styles.iconProfile}
                />
                <Text>Keluar</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#854700d4',
    alignSelf: 'center',
    borderRadius: 5,
    elevation: 3,
    height: 35,
    width: 100,
    justifyContent: 'center',
  },
  textLogout: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    includeFontPadding: false,
  },
  pp: {
    width: 90,
    height: 90,
    borderRadius: 90 / 2,
    borderColor: 'grey',
    borderWidth: 3,
    marginTop: -45,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  ppCover: {
    width: '100%',
    height: 125,
  },
  viewProfile: {
    paddingHorizontal: 10,
  },
  iconProfile: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  subViewProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#80808040',
    padding: 5,
    borderRadius: 5,
  },
  viewSplit: {
    marginBottom: 10,
    width: '100%',
    borderColor: '#8080808a',
    borderWidth: 0.5,
  },
  textUser: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  viewTextUser: {
    marginBottom: 7,
    borderLeftColor: 'black',
    borderLeftWidth: 1,
    paddingLeft: 10,
  },
});
