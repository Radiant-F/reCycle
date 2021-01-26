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

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      role: '',
      token: '',
      loading: false,
    };
  }

  login() {
    if (this.state.email && this.state.password != '') {
      this.setState({loading: true});
      console.log('mencoba login..');
      const {email, password} = this.state;
      let kirimData = {email: email, password: password};
      fetch('http://mini-project-e.herokuapp.com/api/login', {
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
            this.props.changeUser({token: responseJSON.token});
            AsyncStorage.setItem('token', responseJSON.token);
            AsyncStorage.setItem(
              'role',
              JSON.stringify(responseJSON.user.role),
            );
            if (responseJSON.user.role == '2') {
              this.setState({loading: false});
              this.props.navigation.replace('Pengurus1', {
                screen: 'Pengurus1',
              });
            } else if (responseJSON.user.role == '1') {
              this.setState({loading: false});
              this.props.navigation.replace('Nasabah', {screen: 'Nasabah'});
            } else {
              this.props.navigation.replace('Pengurus2', {
                screen: 'Pengurus2',
              });
            }
          } else {
            this.setState({loading: false});
            this.alert();
          }
        })
        .catch((err) => console.log('Terjadi Kesalahan. ', err));
    } else {
      this.setState({loading: false});
      this.alert2();
    }
  }

  alert() {
    Alert.alert(
      'Data tidak ditemukan',
      'Masukan data dengan benar atau daftar.',
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
              <Image
                source={require('../assets/user-shape.png')}
                style={styles.img}
              />
            </View>
            <View style={styles.input}>
              <Image
                source={require('../assets/user-outline.png')}
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
            <View style={styles.input}>
              <Image
                source={require('../assets/locked-padlock-outline.png')}
                style={styles.icon}
              />
              <TextInput
                onChangeText={(input) => this.setState({password: input})}
                secureTextEntry
                placeholder="Password"
                placeholderTextColor="white"
                selectionColor="white"
                style={styles.mainInput}
              />
            </View>
            {this.state.loading ? (
              <View style={styles.viewLogin}>
                <ActivityIndicator color="white" size="small" />
              </View>
            ) : (
              <TouchableNativeFeedback onPress={() => this.login()}>
                <View style={styles.viewLogin}>
                  <Text style={styles.textLogin}> Masuk </Text>
                </View>
              </TouchableNativeFeedback>
            )}
            <Text style={{color: 'white', marginVertical: 5}}>atau</Text>
            <TouchableNativeFeedback
              onPress={() => this.props.navigation.navigate('Register')}>
              <View style={styles.viewRegister}>
                <Text style={styles.textLogin}> Daftar </Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              onPress={() => this.props.navigation.navigate('Recovery')}>
              <View>
                <Text style={{...styles.text, fontWeight: 'bold'}}>
                  Lupa Password?
                </Text>
              </View>
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
    marginTop: 10,
    height: 40,
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

const MapStateToProps = (state) => {
  return {
    user: state,
  };
};

const MapDispatchToProps = (dispatch) => {
  return {
    changeUser: (input) => dispatch({type: 'CHANGE USER', payload: input}),
  };
};

export default connect(MapStateToProps, MapDispatchToProps)(Login);
