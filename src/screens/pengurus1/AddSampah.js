import AsyncStorage from '@react-native-community/async-storage';
import React, {Component} from 'react';
import _ from 'lodash';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default class AddSampah extends Component {
  constructor() {
    super();
    this.state = {
      pengiriman: '',
      daftar_nasabah: 1,
      jenis_sampah: 1,
      kg: '',
      total: 0,
      token: this.getToken(),
    };
  }

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
        <ScrollView>
          <View style={{padding: 10}}>
            <View style={styles.viewContent}>
              <Image
                source={require('../../assets/user-outline.png')}
                style={styles.imgIcon}
              />
              <View style={{flex: 1}}>
                <Text style={{color: 'grey'}}>Daftar Request Nasabah</Text>
                {this.state.daftar_nasabah == '' ? (
                  <ActivityIndicator size="small" color="green" />
                ) : (
                  <Picker
                    style={{flex: 1}}
                    mode="dropdown"
                    selectedValue={this.state.daftar_nasabah}
                    onValueChange={(value, index) =>
                      this.setState({daftar_nasabah: value})
                    }>
                    <Picker.Item label="Muhammad Radiant Fadilah" value={1} />
                    <Picker.Item label="Muhammad Rizqi" value={2} />
                    <Picker.Item label="Muhammad Mujahid Muslim" value={3} />
                  </Picker>
                )}
              </View>
            </View>
            <View style={{margin: 5}}></View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={styles.viewContent4}>
                {this.state.jenis_sampah == 1 ? (
                  <Image
                    source={require('../../assets/recycle-picture.png')}
                    style={{...styles.imgIcon, tintColor: 'green'}}
                  />
                ) : this.state.jenis_sampah == 2 ? (
                  <Image
                    source={require('../../assets/recycle-picture.png')}
                    style={{...styles.imgIcon, tintColor: 'orange'}}
                  />
                ) : (
                  <Image
                    source={require('../../assets/recycle-picture.png')}
                    style={{...styles.imgIcon, tintColor: 'red'}}
                  />
                )}
                <View style={{flex: 1}}>
                  <Text style={{color: 'grey'}}>Jenis Sampah</Text>
                  <Picker
                    style={{height: 40, width: '100%'}}
                    mode="dropdown"
                    selectedValue={this.state.jenis_sampah}
                    onValueChange={(value, index) =>
                      this.setState({jenis_sampah: value})
                    }>
                    <Picker.Item label="Organik" value={1} />
                    <Picker.Item label="Anorganik" value={2} />
                    <Picker.Item label="B4" value={3} />
                  </Picker>
                </View>
              </View>
              <View style={styles.viewContent4}>
                <View style={{flex: 1}}>
                  <Text style={{color: 'grey'}}>Nama Sampah</Text>
                  <TextInput placeholder="e.g Plastik" style={{height: 40}} />
                </View>
              </View>
            </View>
            <View style={{margin: 5}}></View>
            <View style={styles.split}>
              <View style={styles.viewContent2}>
                <Image
                  source={require('../../assets/kg.png')}
                  style={styles.imgIcon}
                />
                <View
                  style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                  <TextInput
                    keyboardType="number-pad"
                    placeholder="Berat Sampah"
                    style={{height: 40, marginRight: 5}}
                    onChangeText={(input) =>
                      this.setState({total: input * 2000})
                    }
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
            <TouchableNativeFeedback
              onPress={() => this.props.navigation.goBack()}>
              <View style={styles.buttonSetor}>
                <Text style={styles.text}>Setor Sampah</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </ScrollView>
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
    width: '63%',
  },
  viewContent3: {
    backgroundColor: 'white',
    padding: 10,
    elevation: 2,
    borderRadius: 5,
  },
  viewContent4: {
    backgroundColor: 'white',
    padding: 10,
    elevation: 2,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    width: '49%',
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
