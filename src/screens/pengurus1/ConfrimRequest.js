import AsyncStorage from '@react-native-community/async-storage';
import React, {Component} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export default class ConfrimRequest extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      data: 'a',
      loading: true,
      nama_lokasi: '',
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('token')
      .then((value) => {
        this.setState({token: value});
      })
      .catch((err) => console.log('kesalahan async storage. ', err));
  }

  getLocation() {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        this.setState({lokasi: position.coords});
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
        this.setState({nama_lokasi: responseJSON});
        console.log(this.state.nama_lokasi);
      })
      .catch((err) => console.log(err));
  }

  getData() {
    this.setState({data: 'a', loading: false});
    // fetch(``, {
    //   method: 'GET',
    //   headers: {
    //     ContentType: 'application/json',
    //     Authorization: `Bearer ${this.state.token}`,
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((responseJSON) => {
    //     if (responseJSON.status == 'success') {
    //       this.setState({data: responseJSON});
    //       console.log(this.state.data);
    //     } else {
    //       this.alert();
    //     }
    //   })
    //   .catch((err) => console.log('terjadi kesalahan. ', err));
  }

  alert() {
    Alert.alert('Terjadi Kesalahan', 'Periksa koneksi Anda.', [{text: 'Ok'}]);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.viewHeader}>
          <TouchableWithoutFeedback
            onPress={() => this.props.navigation.goBack()}>
            <Image
              source={require('../../assets/back-arrow.png')}
              style={styles.imgHeader}
            />
          </TouchableWithoutFeedback>
          <Text> Permintaan Jemput Sampah </Text>
        </View>
        <ScrollView>
          {this.state.data == '' ? (
            <View style={{padding: 10}}>
              <ActivityIndicator size="large" color="green" />
            </View>
          ) : (
            <View style={{padding: 10}}>
              <View style={styles.viewUser}>
                <Image
                  source={require('../../assets/user-shape.png')}
                  style={styles.imgIcon}
                />
                <View>
                  <Text style={{color: 'grey'}}>Nama Nasabah</Text>
                  <Text style={styles.textNasabah}>
                    Muhammad Radiant Fadilah
                  </Text>
                </View>
              </View>
              <View style={{margin: 5}}></View>
              <View style={styles.viewUser}>
                <Image
                  source={require('../../assets/phone-working-indicator.png')}
                  style={styles.imgIcon}
                />
                <View>
                  <Text style={{color: 'grey'}}>Nomor Telepon</Text>
                  <Text style={styles.textNasabah}>098928390</Text>
                </View>
              </View>
              <View style={{margin: 5}}></View>
              <View style={styles.viewUser}>
                <Image
                  source={require('../../assets/map-placeholder.png')}
                  style={styles.imgIcon}
                />
                <View>
                  <Text style={{color: 'grey'}}>Alamat</Text>
                  <Text style={styles.textNasabah}>Bandung</Text>
                </View>
              </View>
              {/* <View style={{margin: 5}}></View>
              {this.state.nama_lokasi == '' ? (
                <View style={styles.viewMap}>
                  <ActivityIndicator color="green" size="large" />
                </View>
              ) : (
                <View style={styles.viewMap}>
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
                  <Text style={styles.textAdress}>
                    {this.state.nama_lokasi.display_name}
                  </Text>
                </View>
              )} */}
              <View style={{margin: 5}}></View>
              <View style={styles.viewUser}>
                <Image
                  source={require('../../assets/chat-bubbles.png')}
                  style={styles.imgIcon}
                />
                <View>
                  <Text style={{color: 'grey'}}>Keterangan</Text>
                  <View style={styles.viewMessage}>
                    <Text>
                      Tolong angkut kulkas bekas saya pak. Rumah saya yang warna
                      Tolong angkut kulkas bekas saya pak. Rumah saya yang warna
                      Tolong angkut kulkas bekas saya pak. Rumah saya yang warna
                      ijo.
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{margin: 5}}></View>
              <TouchableNativeFeedback>
                <View style={styles.viewButton}>
                  <Text style={styles.textButton}>Konfirmasi Penjemputan</Text>
                </View>
              </TouchableNativeFeedback>
              <View style={{margin: 5}}></View>
              <TouchableNativeFeedback>
                <View style={styles.viewButton2}>
                  <Text style={styles.textButton}>Tolak Penjemputan</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewHeader: {
    padding: 10,
    backgroundColor: 'white',
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgHeader: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  viewUser: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 10,
  },
  imgIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  textNasabah: {
    fontSize: 20,
  },
  viewMessage: {
    padding: 10,
    borderWidth: 1,
    maxWidth: '92%',
    marginTop: 5,
  },
  viewMap: {
    backgroundColor: 'white',
    padding: 10,
    elevation: 2,
    borderRadius: 10,
    alignItems: 'center',
  },
  mapField: {
    borderWidth: 1,
    width: 300,
    height: 250,
  },
  textAdress: {
    textAlign: 'center',
    marginTop: 5,
  },
  viewButton: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#1d8500d4',
    elevation: 3,
    justifyContent: 'center',
    borderRadius: 5,
  },
  viewButton2: {
    width: 250,
    padding: 10,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#854700d4',
    elevation: 3,
    justifyContent: 'center',
    borderRadius: 5,
  },
  textButton: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
  },
});
