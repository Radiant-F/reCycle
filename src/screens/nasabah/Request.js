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
} from 'react-native';
import {TextInput, TouchableNativeFeedback} from 'react-native-gesture-handler';

class Request extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      id: this.getID(),
      nomer: '',
      keterangan: '',
      alamat: '',
      pesan: '',
      token: this.getToken(),
      loading: false,
      lokasi: '',
      nama_lokasi: '',
    };
  }

  getID() {
    AsyncStorage.getItem('id')
      .then((value) => {
        JSON.parse(value);
        this.setState({id: value});
      })
      .catch((err) => console.log('terjadi kesalahan async storage. ', err));
  }

  getToken() {
    if (this.props.user.token) {
      return this.props.user.token;
    }
    return '';
  }

  componentDidMount() {
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
        `http://mini-project-e.herokuapp.com/api/penjemputan/${this.state.id}`,
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
          <View style={styles.content}>
            <View style={styles.viewMainInput}>
              <View style={styles.viewInput}>
                <Image
                  source={require('../../assets/iconPengurus.png')}
                  style={styles.headerIcon}
                />
                <TextInput
                  onChangeText={(input) => this.setState({name: input})}
                  placeholder="Nama Pengirim"
                />
              </View>
            </View>
            <View style={styles.viewMainInput}>
              <View style={styles.viewInput}>
                <Image
                  source={require('../../assets/phone-working-indicator.png')}
                  style={styles.headerIcon}
                />
                <TextInput
                  onChangeText={(input) => this.setState({nomer: input})}
                  placeholder="Nomor Telepon Anda"
                />
              </View>
            </View>
            <View style={styles.viewMainInput}>
              <View style={styles.viewInput}>
                <Image
                  source={require('../../assets/map-placeholder.png')}
                  style={styles.headerIcon}
                />
                <TextInput
                  onChangeText={(input) => this.setState({alamat: input})}
                  placeholder="Alamat Pengiriman"
                />
              </View>
            </View>
            <View style={styles.viewMainInput}>
              <View style={styles.viewMap}>
                {this.state.nama_lokasi == '' ? (
                  <View>
                    <ActivityIndicator size="large" color="green" />
                    <Text>Melacak Anda..</Text>
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
            </View>
            <View style={styles.viewMainInput}>
              <View style={styles.viewInput}>
                <Image
                  source={require('../../assets/chat-bubbles.png')}
                  style={styles.headerIcon}
                />
                <TextInput
                  onChangeText={(input) => this.setState({keterangan: input})}
                  placeholder="Tambah Keterangan"
                />
              </View>
            </View>
            {this.state.loading ? (
              <View style={styles.viewTouch}>
                <ActivityIndicator color="green" size="large" />
              </View>
            ) : (
              <TouchableNativeFeedback onPress={() => this.sendRequest()}>
                <View style={styles.viewTouch}>
                  <Text style={styles.textTouch}>Minta Jemput</Text>
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
  viewInput: {
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderWidth: 0.5,
    height: 45,
  },
  viewMainInput: {
    width: 300,
    margin: 5,
  },
  textInput: {
    marginVertical: 15,
    includeFontPadding: false,
    fontSize: 20,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  viewTouch: {
    width: 300,
    backgroundColor: '#1d8500d4',
    height: 45,
    borderRadius: 5,
    elevation: 2,
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  textTouch: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  viewMap: {
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 2,
    alignItems: 'center',
    padding: 10,
    borderWidth: 0.5,
    height: 350,
    justifyContent: 'center',
  },
  viewSubMap: {
    width: 200,
    height: 200,
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
