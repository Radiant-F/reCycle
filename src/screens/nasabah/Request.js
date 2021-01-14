import AsyncStorage from '@react-native-community/async-storage';
import React, {Component} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {connect} from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ScrollView,
  ActivityIndicator,
  Switch,
} from 'react-native';
import {TextInput, TouchableNativeFeedback} from 'react-native-gesture-handler';

class Request extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      user: '',
      nomer: '',
      keterangan: '',
      alamat: '',
      pesan: '',
      loading: false,
      lokasi: '',
      nama_lokasi: '',
      token: this.getToken(),
      switch: false,
    };
  }

  getToken() {
    if (this.props.user.token) {
      return this.props.user.token;
    }
    return '';
  }

  componentDidMount() {
    // this.getUser()
    this.getLocation();
  }

  getLocation() {
    Geolocation.getCurrentPosition(
      (position) => {
        // console.log(position);
        this.setState({lokasi: position.coords});
        console.log(this.state.lokasi);
        this.getLocationInfo();
      },
      (error) => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }

  getLocationInfo() {
    console.log('mengambil info lokasi..');
    fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${this.state.lokasi.latitude}&lon=${this.state.lokasi.longitude}&format=json`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then((response) => response.json())
      .then((responseJSON) => {
        this.setState({
          nama_lokasi: responseJSON,
          alamat: responseJSON.display_name,
        });
        console.log(this.state.nama_lokasi);
      })
      .catch((err) => console.log(err));
  }

  getUser() {
    fetch('http://mini-project-e.herokuapp.com/api/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((response) => response.json())
      .then((responseJSON) => {
        this.setState({user: responseJSON.user});
      })
      .catch((err) => console.log(err));
  }

  sendRequest() {
    if (
      this.state.name &&
      this.state.id &&
      this.state.nomer &&
      this.state.keterangan &&
      this.state.alamat != ''
    ) {
      console.log('mengirim request..');
      this.setState({loading: true});
      const {name, id, nomer, keterangan, alamat} = this.state;
      const kirimData = {
        name: name,
        user_id: id,
        nomer: nomer,
        keterangan: keterangan,
        alamat: alamat,
      };
      fetch(
        `http://mini-project-e.herokuapp.com/api/penjemputan/${this.state.user.id}`,
        {
          method: 'POST',
          body: JSON.stringify(kirimData),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.state.token}`,
          },
        },
      )
        .then((response) => response.json())
        .then((responseJSON) => {
          console.log(responseJSON);
          if (responseJSON.status != 'error') {
            this.alert();
            this.setState({loading: false});
            this.props.navigation.goBack();
          } else {
            this.setState({loading: false});
            this.error();
          }
        })
        .catch((err) => console.log(err));
    } else {
      this.alert2();
    }
  }

  alert() {
    Alert.alert('Berhasil', 'Request berhasil dikirim.', [{text: 'Ok'}], {
      cancelable: false,
    });
  }

  alert2() {
    Alert.alert('', 'Harap isi semua form.', [{text: 'Ok'}], {
      cancelable: false,
    });
  }

  error() {
    Alert.alert('Terjadi Kesalahan', 'Gagal mengirim request.', [{text: 'Ok'}]);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.headerView}>
          <TouchableWithoutFeedback
            onPress={() => this.props.navigation.goBack()}>
            <Image
              source={require('../../assets/back-arrow.png')}
              style={styles.headerIcon}
            />
          </TouchableWithoutFeedback>
          <Text> Request Penjemputan Sampah </Text>
        </View>
        <ScrollView>
          <View style={{padding: 10}}>
            <View style={styles.viewContent}>
              <Image
                source={require('../../assets/iconPengurus.png')}
                style={styles.imgIcon}
              />
              <View style={{flex: 1}}>
                <Text style={{color: 'grey'}}>
                  Nama Pengirim (max 15 karakter)
                </Text>
                <TextInput
                  maxLength={15}
                  style={styles.mainInput}
                  placeholder="Abang Pengurus"
                  onChangeText={(input) => this.setState({name: input})}
                />
              </View>
            </View>
            <View style={{margin: 5}}></View>
            <View style={styles.viewContent}>
              <Image
                source={require('../../assets/phone-working-indicator.png')}
                style={styles.imgIcon}
              />
              <View style={{flex: 1}}>
                <Text style={{color: 'grey'}}>Nomor Telepon</Text>
                <TextInput
                  maxLength={15}
                  style={styles.mainInput}
                  placeholder="08xxx"
                  onChangeText={(input) => this.setState({nomer: input})}
                  defaultValue={this.state.user.nomer}
                  keyboardType="number-pad"
                />
              </View>
            </View>
            <View style={{margin: 5}}></View>
            <View style={styles.viewContent}>
              <Image
                source={require('../../assets/map-placeholder.png')}
                style={styles.imgIcon}
              />
              <View style={{flex: 1}}>
                <Text style={{color: 'grey'}}>Alamat Pengiriman</Text>
                <TextInput
                  style={{...styles.mainInput, maxWidth: '100%'}}
                  placeholder="Alamat Pengiriman"
                  onChangeText={(input) => this.setState({alamat: input})}
                  defaultValue={
                    this.state.user.alamat == ''
                      ? this.state.switch
                        ? this.state.alamat
                        : this.state.user.alamat
                      : this.state.user.alamat
                  }
                />
              </View>
            </View>
            <View style={{margin: 2}}></View>
            <View
              style={{...styles.viewContent, justifyContent: 'space-between'}}>
              <Text>Gunakan Lokasi Saat Ini?</Text>
              <Switch
                value={this.state.switch}
                thumbColor={this.state.switch ? '#1d8500d4' : '#854700d4'}
                onValueChange={() =>
                  this.setState({switch: !this.state.switch})
                }
              />
            </View>
            <View style={{margin: 2}}></View>
            {this.state.switch ? (
              <View style={styles.viewContent}>
                {this.state.nama_lokasi == '' ? (
                  <View style={styles.viewMap}>
                    <ActivityIndicator color="green" size="large" />
                    <Text>Melacak Anda</Text>
                  </View>
                ) : (
                  <>
                    <MapView
                      showsCompass
                      showsMyLocationButton
                      style={{width: 250, height: 250, marginBottom: 10}}
                      provider={PROVIDER_GOOGLE}
                      region={{
                        latitude: this.state.lokasi.latitude,
                        longitude: this.state.lokasi.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                      }}>
                      <Marker
                        coordinate={{
                          latitude: this.state.lokasi.latitude,
                          longitude: this.state.lokasi.longitude,
                        }}></Marker>
                    </MapView>
                    <Text>{this.state.nama_lokasi.display_name}</Text>
                  </>
                )}
              </View>
            ) : (
              <></>
            )}
            <View style={{margin: 5}}></View>
            <View style={styles.viewContent}>
              <Image
                source={require('../../assets/chat-bubbles.png')}
                style={styles.imgIcon}
              />
              <View style={{flex: 1}}>
                <Text style={{color: 'grey'}}>Tambah Keterangan</Text>
                <TextInput
                  style={styles.inputMessage}
                  placeholder="Rumah saya warna hijau"
                  onChangeText={(input) => this.setState({keterangan: input})}
                />
              </View>
            </View>
            <View style={{margin: 5}}></View>
            {this.state.loading ? (
              <View style={styles.viewTouch}>
                <ActivityIndicator color="green" size="large" />
              </View>
            ) : (
              <TouchableNativeFeedback onPress={() => this.sendRequest()}>
                <View style={styles.viewButton}>
                  <Text style={styles.textButton}>Minta Jemput</Text>
                </View>
              </TouchableNativeFeedback>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  headerView: {
    padding: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    elevation: 3,
  },
  viewButton: {
    padding: 10,
    backgroundColor: '#1d8500d4',
    borderRadius: 5,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  textButton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  viewMap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
  },
  viewSubMap: {
    width: 200,
    height: 200,
  },
  imgIcon: {
    width: 35,
    height: 35,
    marginRight: 15,
  },
  viewContent: {
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  mainInput: {
    height: 40,
    fontSize: 17,
    fontWeight: 'bold',
    includeFontPadding: false,
    borderBottomWidth: 0.5,
  },
  inputMessage: {
    borderWidth: 0.5,
    marginTop: 5,
    height: 40,
    paddingHorizontal: 10,
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

export default connect(MapStateToProps, MapDispatchToProps)(Request);
