import AsyncStorage from '@react-native-community/async-storage';
import React, {Component} from 'react';
import _ from 'lodash';
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export default class AddSampah extends Component {
  constructor() {
    super();
    this.state = {
      pengiriman: '',
      daftar_nasabah: '',
      jenis_sampah: '',
      kg: '',
      total: 0,
      //   potongan: (this.state.total / 100) * 20,
      token: this.getToken(),
    };
  }

  //   componentDidMount() {
  //     this.getNasabah();
  //   }

  toPrice(price) {
    return _.replace(price, /\B(?=(\d{3})+(?!\d))/g, '.');
  }

  getToken() {
    AsyncStorage.getItem('token')
      .then((value) => {
        this.setState({token: value});
      })
      .catch((err) => console.log(err));
  }

  getNasabah() {
    fetch(``, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((response) => response.json())
      .then((responseJSON) => {
        if (responseJSON.status != 'error') {
          this.setState({daftar_nasabah: responseJSON});
          console.log(this.state.daftar_nasabah);
        } else {
          this.setState({daftar_nasabah: 'Kosong'});
          this.alert();
        }
      })
      .catch((err) => this.error(err));
  }

  alert() {
    Alert.alert('Kosong', 'Tidak ada nasabah yang tersedia.');
  }

  error(err) {
    console.log(err);
    this.setState({daftar_nasabah: 'Kosong'});
    Alert.alert('Terjadi Kesalahan', 'Periksa koneksi jaringan.', [
      {text: 'Ok'},
    ]);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.viewHeader}>
          <TouchableWithoutFeedback
            onPress={() => this.props.navigation.goBack()}>
            <Image
              source={require('../../assets/back-arrow.png')}
              style={styles.imgIcon}
            />
          </TouchableWithoutFeedback>
          <Text> Tambah Data Sampah </Text>
        </View>
        <View style={{padding: 10}}>
          <View style={styles.viewContent}>
            <Image
              source={require('../../assets/user-outline.png')}
              style={styles.imgIcon}
            />
            <View>
              <Text style={{color: 'grey'}}>Daftar Request Nasabah</Text>
              {this.state.daftar_nasabah == '' ? (
                <ActivityIndicator size="small" color="green" />
              ) : (
                <Text style={{fontWeight: 'bold', fontSize: 17}}>
                  Muhammad Radiant Fadilah
                </Text>
              )}
            </View>
          </View>
          <View style={{margin: 5}}></View>
          <View style={styles.viewContent}>
            <Image
              source={require('../../assets/recycle-picture.png')}
              style={styles.imgIcon}
            />
            <View>
              <Text style={{color: 'grey'}}>Jenis Sampah</Text>
              {this.state.jenis_sampah == '' ? (
                <ActivityIndicator size="small" color="green" />
              ) : (
                <Text style={{fontWeight: 'bold', fontSize: 17}}>Plastik</Text>
              )}
            </View>
          </View>
          <View style={{margin: 5}}></View>
          <View style={styles.split}>
            <View style={styles.viewContent2}>
              <Image
                source={require('../../assets/kg.png')}
                style={styles.imgIcon}
              />
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TextInput
                  keyboardType="number-pad"
                  placeholder="Berat Sampah"
                  style={{height: 40, marginRight: 5}}
                  onChangeText={(input) => this.setState({total: input * 2000})}
                />
                <Text style={{fontWeight: 'bold'}}>KG</Text>
              </View>
            </View>
            {this.state.pengiriman == 1 ? (
              <TouchableNativeFeedback
                onPress={() => this.setState({pengiriman: 2})}>
                <View style={styles.button1}>
                  <Text style={styles.text}> Dijemput </Text>
                </View>
              </TouchableNativeFeedback>
            ) : (
              <TouchableNativeFeedback
                onPress={() => this.setState({pengiriman: 1})}>
                <View style={styles.button2}>
                  <Text style={styles.text}> Diantar </Text>
                </View>
              </TouchableNativeFeedback>
            )}
          </View>
          <View style={{margin: 5}}></View>
          <View style={styles.viewContent3}>
            <View style={styles.viewText}>
              <Text>Total Harga Sampah:</Text>
              <Text style={{fontWeight: 'bold'}}>
                Rp.{this.toPrice(this.state.total)},-
              </Text>
            </View>
            {this.state.pengiriman == 1 ? (
              <View style={styles.viewText}>
                <Text> + Potongan Penjemputan 20%:</Text>
                <Text style={{fontWeight: 'bold'}}>
                  Rp.{this.toPrice((this.state.total / 100) * 20)},-
                </Text>
              </View>
            ) : (
              <></>
            )}
            <View style={styles.viewText}>
              <Text style={styles.textTotal}>Total Pemasukan:</Text>
              {this.state.pengiriman == 1 ? (
                <Text style={styles.textTotal}>
                  Rp.
                  {this.toPrice(
                    this.state.total - (this.state.total / 100) * 20,
                  )}
                  ,-
                </Text>
              ) : (
                <Text style={styles.textTotal}>
                  Rp.{this.toPrice(this.state.total)},-
                </Text>
              )}
            </View>
          </View>
          <View style={{margin: 5}}></View>
          <TouchableNativeFeedback>
            <View style={styles.buttonSetor}>
              <Text style={styles.text}>Setor Sampah</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewHeader: {
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
  },
  imgIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  viewContent: {
    backgroundColor: 'white',
    padding: 10,
    elevation: 2,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewContent2: {
    backgroundColor: 'white',
    padding: 10,
    elevation: 2,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    width: '60%',
  },
  viewContent3: {
    backgroundColor: 'white',
    padding: 10,
    elevation: 2,
    borderRadius: 5,
  },
  button1: {
    backgroundColor: '#1d8500d4',
    padding: 10,
    elevation: 2,
    borderRadius: 3,
    width: '35%',
    height: 59,
    justifyContent: 'center',
  },
  button2: {
    backgroundColor: '#854700d4',
    padding: 10,
    elevation: 2,
    borderRadius: 3,
    width: '35%',
    height: 59,
    justifyContent: 'center',
  },
  split: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
  viewText: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  textTotal: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  buttonSetor: {
    backgroundColor: '#1d8500d4',
    borderRadius: 5,
    elevation: 3,
    padding: 10,
    alignItems: 'center',
  },
});
