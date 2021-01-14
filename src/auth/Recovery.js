import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableNativeFeedback,
  Alert,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';

export default class Recovery extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      role: '',
      token: '',
      loading: false,
      done: false,
    };
  }

  recover() {
    if (this.state.email != '') {
      this.setState({loading: true, done: false});
      console.log('mencoba pemulihan..');
      const {email} = this.state;
      let kirimData = {email: email};
      fetch('http://mini-project-e.herokuapp.com/api/forget', {
        method: 'GET',
        body: JSON.stringify(kirimData),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((responseJSON) => {
          console.log(responseJSON);
          if (responseJSON != null) {
            this.setState({done: true});
          } else {
            this.setState({loading: false});
            this.alert();
          }
        })
        .catch(
          (err) => console.log('Terjadi Kesalahan. ', err),
          this.alert(),
          this.setState({loading: false}),
        );
    } else {
      this.setState({loading: false});
      this.alert2();
    }
  }

  alert() {
    Alert.alert(
      'Email Tidak Ditemukan',
      'Masukan data dengan benar atau mungkin anda belum daftar?',
      [
        {
          text: 'Daftar',
          onPress: () => this.props.navigation.navigate('Register'),
        },
        {
          text: 'Ok',
        },
      ],
      {cancelable: false},
    );
  }

  alert2() {
    Alert.alert(
      '',
      'Harap isi semua forum.',
      [
        {
          text: 'Ok',
        },
      ],
      {cancelable: false},
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          blurRadius={2}
          source={require('../assets/imgView.jpg')}
          style={styles.bg}>
          <View style={styles.mainView}>
            <View style={styles.viewImg}>
              {this.state.done ? (
                <Image
                  source={require('../assets/unlocked-padlock.png')}
                  style={styles.img}
                />
              ) : (
                <Image
                  source={require('../assets/locked-padlock.png')}
                  style={styles.img}
                />
              )}
            </View>
            <View style={styles.input}>
              <Image
                source={require('../assets/write-email-envelope-button.png')}
                style={styles.icon}
              />
              <TextInput
                onChangeText={(input) => this.setState({email: input})}
                placeholder="Email"
                placeholderTextColor="white"
                selectionColor="white"
                style={styles.mainInput}
              />
            </View>
            {this.state.password == '' ? (
              <></>
            ) : (
              <TouchableNativeFeedback>
                <Text style={{fontWeight: 'bold', color: 'white'}}>
                  Lihat Password Baru Anda
                </Text>
              </TouchableNativeFeedback>
            )}
            {this.state.loading ? (
              <View style={styles.viewLogin}>
                <ActivityIndicator color="white" size="small" />
              </View>
            ) : (
              <TouchableNativeFeedback onPress={() => this.recover()}>
                <View style={styles.viewLogin}>
                  <Text style={styles.textLogin}> Kirim Email </Text>
                </View>
              </TouchableNativeFeedback>
            )}
            <TouchableNativeFeedback
              onPress={() => this.props.navigation.goBack()}>
              <Text style={{...styles.text, fontWeight: 'bold'}}>
                Sudah Ingat?
              </Text>
            </TouchableNativeFeedback>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bg: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainView: {
    width: '90%',
    padding: 15,
    backgroundColor: '#00000087',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
  icon: {
    width: 25,
    height: 25,
    tintColor: 'white',
    marginHorizontal: 10,
  },
  input: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  mainInput: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    width: '76%',
    color: 'white',
  },
  textLogin: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
    includeFontPadding: false,
  },
  viewLogin: {
    backgroundColor: '#1d8500d4',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    elevation: 1,
    padding: 10,
    width: 200,
    marginVertical: 10,
  },
  viewRegister: {
    backgroundColor: '#854700d4',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    elevation: 1,
    padding: 10,
    width: 130,
    marginBottom: 10,
  },
  viewImg: {
    backgroundColor: '#000000c2',
    padding: 10,
    borderRadius: 100 / 2,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -70,
  },
  img: {
    width: 55,
    height: 55,
    tintColor: 'white',
  },
});
