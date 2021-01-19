import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import React, {Component} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export default class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      name: '',
      alamat: '',
      nomer: '',
      avatar: '',
      photo: '',
      email: '',
      id: '',
      data: '',
      loading: false,
      edited: false,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('token')
      .then((value) => {
        if (value != null) {
          this.setState({token: value});
        } else {
          console.log('tidak ada token');
        }
      })
      .catch((err) => console.log('kesalahan async storage. ', err));
    this.setState({
      name: this.props.route.params.user.name,
      alamat: this.props.route.params.user.alamat,
      nomer: this.props.route.params.user.nomer,
      avatar: this.props.route.params.user.avatar,
      email: this.props.route.params.user.email,
      id: this.props.route.params.user.id,
    });
  }

  updateUser() {
    if (this.state.edited) {
      const {name, alamat, nomer, photo, email} = this.state;
      if (photo.name === undefined) {
        const kirimData = {
          name: name,
          alamat: alamat,
          nomer: nomer,
          email: email,
        };
        this.setState({loading: true});
        console.log('memperbarui user..');
        fetch(
          `http://mini-project-e.herokuapp.com/api/user/update/${this.state.id}`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${this.state.token}`,
            },
            body: this.createFormData(photo, kirimData),
          },
        )
          .then((response) => response.json())
          .then((responseJSON) => {
            if (responseJSON.status == 'success') {
              this.setState({loading: false});
              ToastAndroid.show(
                'Profil telah Anda sunting',
                ToastAndroid.SHORT,
              );
              this.getUser();
            } else {
              this.setState({loading: false});
              this.alert();
            }
          })
          .catch((err) => console.log('terjadi kesalahan. ', err));
      } else {
        this.alert2();
      }
    } else {
      this.alert2();
    }
  }

  getUser() {
    console.log('mengambil user..');
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
          this.setState({
            photo: '',
            avatar: responseJSON.user.avatar,
            name: responseJSON.user.name,
            nomer: responseJSON.user.nomer,
            alamat: responseJSON.user.alamat,
            email: responseJSON.user.email,
          });
          console.log('berhasil.');
        } else {
          console.log('gagal mengambil user.');
        }
      })
      .catch((err) => console.log(err));
  }

  createFormData = (photo, body) => {
    const data = new FormData();
    data.append('avatar', {
      name: photo.fileName,
      type: photo.type,
      uri:
        Platform.OS === 'android'
          ? photo.uri
          : photo.uri.replace('file://', ''),
    });
    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });
    return data;
  };

  handleEditPhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        this.setState({photo: response, edited: true});
        console.log(JSON.stringify(response));
      }
    });
  };

  alert() {
    Alert.alert('', 'Terjadi Kesalahan', [{text: 'Ok'}]);
  }

  alert2() {
    Alert.alert('', 'Setidaknya gambar harus dirubah.', [{text: 'Ok'}]);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.viewHeader}>
          <TouchableWithoutFeedback
            onPress={() => this.props.navigation.goBack()}>
            <Image
              source={require('../assets/back-arrow.png')}
              style={styles.iconHeader}
            />
          </TouchableWithoutFeedback>
          <Text> Pengaturan Profile </Text>
        </View>
        <View style={styles.viewProfile}>
          <View>
            <TouchableWithoutFeedback onPress={() => this.handleEditPhoto()}>
              {this.state.photo != '' ? (
                <Image
                  source={{uri: this.state.photo.uri}}
                  style={styles.imgProfile}
                />
              ) : (
                <Image
                  source={{uri: this.state.avatar}}
                  style={styles.imgProfile}
                />
              )}
            </TouchableWithoutFeedback>
            {this.state.loading ? (
              <View style={styles.viewButton}>
                <ActivityIndicator size="small" color="white" />
              </View>
            ) : (
              <TouchableNativeFeedback onPress={() => this.updateUser()}>
                <View style={styles.viewButton}>
                  <Text style={styles.textUpdate}>Update Profil</Text>
                </View>
              </TouchableNativeFeedback>
            )}
          </View>
          <View style={styles.viewSplit}></View>
          <View style={{flex: 1}}>
            <View style={styles.viewField}>
              <Image
                source={require('../assets/user-outline.png')}
                style={styles.iconHeader}
              />
              <TextInput
                placeholder="Nama Anda"
                style={styles.mainInput}
                value={this.state.name}
                onChangeText={(input) => this.setState({name: input})}
              />
            </View>
            <View style={styles.viewField}>
              <Image
                source={require('../assets/write-email-envelope-button.png')}
                style={styles.iconHeader}
              />
              <TextInput
                placeholder="Email Anda"
                style={styles.mainInput}
                value={this.state.email}
                onChangeText={(input) => this.setState({email: input})}
              />
            </View>
            <View style={styles.viewField}>
              <Image
                source={require('../assets/map-placeholder.png')}
                style={styles.iconHeader}
              />
              <TextInput
                placeholder="Alamat Anda"
                style={styles.mainInput}
                value={this.state.alamat}
                onChangeText={(input) => this.setState({alamat: input})}
              />
            </View>
            <View style={styles.viewField}>
              <Image
                source={require('../assets/phone-working-indicator.png')}
                style={styles.iconHeader}
              />
              <TextInput
                keyboardType="number-pad"
                placeholder="Nomor Anda"
                style={styles.mainInput}
                value={this.state.nomer}
                onChangeText={(input) => this.setState({nomer: input})}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewHeader: {
    backgroundColor: 'white',
    elevation: 3,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconHeader: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  imgProfile: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    borderColor: 'grey',
    borderWidth: 4,
  },
  viewProfile: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewSplit: {
    height: '100%',
    borderColor: 'grey',
    borderWidth: 0.5,
    marginHorizontal: 10,
  },
  mainInput: {
    height: 40,
    maxWidth: 160,
  },
  viewField: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewButton: {
    width: '100%',
    height: 35,
    backgroundColor: '#00db00',
    padding: 7,
    elevation: 3,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textUpdate: {
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: '#757575',
    textShadowRadius: 1,
    textShadowOffset: {
      width: 1,
      height: 1,
    },
  },
});
