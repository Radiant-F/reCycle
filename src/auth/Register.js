import AsyncStorage from '@react-native-community/async-storage';
import React, {Component} from 'react';
import {
  Button,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  TouchableNativeFeedback,
  ScrollView,
  Alert,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      alamat: '',
      password: '',
      password_confirmation: '',
      loading: true,
    };
  }

  register() {
    if (
      this.state.name &&
      this.state.email &&
      this.state.alamat &&
      this.state.password &&
      this.state.password_confirmation != ''
    ) {
      this.setState({loading: false});
      console.log(this.state.loading);
      console.log('mendaftar..');
      const {name, email, alamat, password, password_confirmation} = this.state;
      const kirimData = {
        name: name,
        email: email,
        alamat: alamat,
        password: password,
        password_confirmation: password_confirmation,
      };
      fetch('http://mini-project-e.herokuapp.com/api/register', {
        method: 'POST',
        body: JSON.stringify(kirimData),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((responseJSON) => {
          console.log(responseJSON);
          if (responseJSON.token != null) {
            this.setState({loading: true});
            AsyncStorage.setItem(
              'role',
              JSON.stringify(responseJSON.user.role),
            );
            AsyncStorage.setItem('id', JSON.stringify(responseJSON.user.id));
            AsyncStorage.setItem('token', responseJSON.token);
            this.props.navigation.replace('Nasabah');
          } else {
            this.setState({loading: true});
            ToastAndroid.show('Email sudah terdaftar.', ToastAndroid.CENTER);
          }
        })
        .catch((err) => console.log('Terjadi kesalahan.', err));
    } else {
      this.alert();
    }
  }

  alert() {
    Alert.alert(
      '',
      'Harap isi semua form.',
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
              <Image
                source={require('../assets/add-user-button.png')}
                style={styles.img}
              />
            </View>
            <ScrollView>
              <View style={{alignItems: 'center'}}>
                <View style={styles.input}>
                  <Image
                    source={require('../assets/user-outline.png')}
                    style={styles.icon}
                  />
                  <TextInput
                    placeholder="Nama Lengkap"
                    placeholderTextColor="white"
                    selectionColor="white"
                    onChangeText={(input) => this.setState({name: input})}
                    style={styles.mainInput}
                  />
                </View>
                <View style={styles.input}>
                  <Image
                    source={require('../assets/write-email-envelope-button.png')}
                    style={styles.icon}
                  />
                  <TextInput
                    placeholder="Email"
                    placeholderTextColor="white"
                    selectionColor="white"
                    onChangeText={(input) => this.setState({email: input})}
                    style={styles.mainInput}
                  />
                </View>
                <View style={styles.input}>
                  <Image
                    source={require('../assets/map-placeholder.png')}
                    style={styles.icon}
                  />
                  <TextInput
                    placeholder="Alamat Lengkap"
                    placeholderTextColor="white"
                    selectionColor="white"
                    onChangeText={(input) => this.setState({alamat: input})}
                    style={styles.mainInput}
                  />
                </View>
                <View style={styles.input}>
                  <Image
                    source={require('../assets/locked-padlock-outline.png')}
                    style={styles.icon}
                  />
                  <TextInput
                    secureTextEntry
                    placeholder="Password"
                    placeholderTextColor="white"
                    selectionColor="white"
                    onChangeText={(input) => this.setState({password: input})}
                    style={styles.mainInput}
                  />
                </View>
                <View style={styles.input}>
                  <Image
                    source={require('../assets/locked-padlock-outline.png')}
                    style={styles.icon}
                  />
                  <TextInput
                    secureTextEntry
                    placeholder="Konfirmasi Password"
                    placeholderTextColor="white"
                    selectionColor="white"
                    onChangeText={(input) =>
                      this.setState({password_confirmation: input})
                    }
                    style={styles.mainInput}
                  />
                </View>
                {this.state.loading ? (
                  <TouchableNativeFeedback onPress={() => this.register()}>
                    <View style={styles.viewLogin}>
                      <Text style={styles.textLogin}> Daftar </Text>
                    </View>
                  </TouchableNativeFeedback>
                ) : (
                  <View style={styles.viewLogin}>
                    <ActivityIndicator size="small" color="white" />
                  </View>
                )}
                <Text style={{color: 'white', marginVertical: 5}}>
                  sudah punya akun?
                </Text>
                <TouchableNativeFeedback
                  onPress={() => this.props.navigation.goBack()}>
                  <View style={styles.viewRegister}>
                    <Text style={styles.textLogin}> Masuk </Text>
                  </View>
                </TouchableNativeFeedback>
              </View>
            </ScrollView>
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
    backgroundColor: '#854700d4',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    elevation: 1,
    padding: 10,
    width: 200,
    marginTop: 10,
  },
  viewRegister: {
    backgroundColor: '#1d8500d4',
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
    width: 65,
    height: 65,
    tintColor: 'white',
  },
});
