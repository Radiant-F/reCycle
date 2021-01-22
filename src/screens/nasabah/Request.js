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
      nomer: this.getUserRequires('nomer'),
      alamat: this.getUserRequires('alamat'),
      keterangan: '',
      token: this.getUserRequires(),
      user: '',
      lokasi: '',
      id: '',
      nama_lokasi: '',
      loading: false,
      switch: false,
    };
  }

  getUserRequires(option) {
    if (option == 'nomer') {
      return this.props.user.nomer;
    } else if (option == 'alamat') {
      return this.props.user.alamat;
    } else {
      return this.props.user.token;
    }
  }

  componentDidMount() {
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
        });
        console.log(this.state.nama_lokasi.display_name);
      })
      .catch((err) => console.log(err));
  }

  getUser() {
    console.log('mengambil info user..');
    fetch('http://mini-project-e.herokuapp.com/api/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((response) => response.json())
      .then((responseJSON) => {
        this.setState({
          user: responseJSON.user,
          id: responseJSON.user.id,
        });
        console.log('user id: ', this.state.id);
        this.getLocation();
      })
      .catch((err) => this.error(err));
  }

  sendRequest() {
    if (
      this.state.name &&
      this.state.nomer &&
      this.state.keterangan &&
      this.state.alamat != ''
    ) {
      console.log('mengirim request..');
      this.setState({loading: true});
      const {name, nomer, keterangan, alamat} = this.state;
      const kirimData = {
        name: name,
        nomer: nomer,
        keterangan: keterangan,
        alamat: alamat,
      };
      fetch(
        `http://mini-project-e.herokuapp.com/api/penjemputan/create/${this.state.id}`,
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
        .catch((err) => this.error(err));
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

  error(err) {
    console.log(err);
    Alert.alert('Terjadi Kesalahan', 'Periksa koneksi Anda.', [{text: 'Ok'}]);
    this.setState({loading: false});
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
                  value={this.state.nomer}
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
                {this.state.switch ? (
                  <TextInput
                    style={{...styles.mainInput, maxWidth: '100%'}}
                    placeholder="Alamat Pengiriman"
                    onChangeText={(input) => this.setState({alamat: input})}
                    value={this.state.nama_lokasi.display_name}
                  />
                ) : (
                  <TextInput
                    style={{...styles.mainInput, maxWidth: '100%'}}
                    placeholder="Alamat Pengiriman"
                    onChangeText={(input) => this.setState({alamat: input})}
                    value={this.state.alamat}
                  />
                )}
              </View>
            </View>
            <View style={{margin: 2}}></View>
            <TouchableNativeFeedback
              onPress={() => this.setState({switch: !this.state.switch})}>
              <View
                style={{
                  ...styles.viewContent,
                  justifyContent: 'space-between',
                  marginBottom: 2,
                }}>
                <Text>Gunakan Lokasi Saat Ini?</Text>
                <Switch
                  value={this.state.switch}
                  thumbColor={this.state.switch ? '#1d8500d4' : '#854700d4'}
                  onValueChange={() =>
                    this.setState({switch: !this.state.switch})
                  }
                />
              </View>
            </TouchableNativeFeedback>
            <View style={{margin: 2}}></View>
            {this.state.switch ? (
              <View style={styles.viewContent2}>
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
                    <Text style={{textAlign: 'center'}}>
                      {this.state.nama_lokasi.display_name}
                    </Text>
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
              <View style={styles.viewButton}>
                <ActivityIndicator color="white" size="small" />
              </View>
            ) : (
              <TouchableNativeFeedback onPress={() => this.sendRequest()}>
                <View style={styles.viewButton}>
                  <Text style={styles.textButton}>Setor</Text>
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
  viewContent2: {
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
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
