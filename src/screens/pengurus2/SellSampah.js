import React, {Component} from 'react';
import _ from 'lodash';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class SellSampah extends Component {
  constructor() {
    super();
    this.state = {
      jenis: '',
      total: '',
      stok_asli: '',
      stok_input: '',
      harga: '',
      token: '',
    };
  }

  toPrice(price) {
    return _.replace(price, /\B(?=(\d{3})+(?!\d))/g, '.');
  }

  stok(input) {
    if (this.state.stok_input >= this.state.stok_asli) {
      this.setState({stok_input: this.state.stok_asli});
    } else if (this.state.stok_input <= this.state.stok_asli) {
      this.setState({stok_input: input});
    } else {
      console.log('what');
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('token')
      .then((value) => {
        this.setState({token: value});
      })
      .catch((err) => console.log(err));
    this.setState({
      jenis: this.props.route.params.jenis,
      stok_asli: this.props.route.params.stok,
    });
  }

  render() {
    return (
      <View>
        <View style={styles.viewHeader}>
          <TouchableWithoutFeedback
            onPress={() => this.props.navigation.goBack()}>
            <Image
              source={require('../../assets/back-arrow.png')}
              style={styles.imgHeader}
            />
          </TouchableWithoutFeedback>
          <Text>Penjualan</Text>
        </View>
        <View style={{padding: 10}}>
          <View style={styles.viewContent}>
            <Image
              source={require('../../assets/connection-indicator.png')}
              style={styles.imgIcon}
            />
            <View>
              <Text style={{color: 'grey'}}>Tanggal</Text>
              <View style={styles.viewInput}>
                <TextInput placeholder="21 Januari 2021" style={{height: 40}} />
              </View>
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
              {this.state.jenis == '' ? (
                <ActivityIndicator size="small" color="green" />
              ) : (
                <Text style={styles.textJual}>{this.state.jenis}</Text>
              )}
            </View>
          </View>
          <View style={{margin: 5}}></View>
          <View style={styles.viewContent}>
            <Image
              source={require('../../assets/kg.png')}
              style={styles.imgIcon}
            />
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TextInput
                  placeholder="Berat Sampah"
                  placeholderTextColor="white"
                  keyboardType="decimal-pad"
                  style={{
                    ...styles.textJual,
                    width: '65%',
                    borderBottomWidth: 1,
                  }}
                  value={this.state.stok_asli}
                  onChangeText={(input) => this.stok(input)}
                />
                <Text style={{fontWeight: 'bold', fontSize: 25}}>KG</Text>
              </View>
              <Text style={{color: 'grey'}}>
                Harga per-KG: <Text style={{color: 'black'}}>Rp.2000,-</Text>
              </Text>
            </View>
          </View>
          <View style={{margin: 5}}></View>
          <View
            style={{...styles.viewContent, justifyContent: 'space-between'}}>
            <Text style={styles.textJual}>Total Penjualan</Text>
            <Text style={styles.textJual}>
              Rp.{this.toPrice(this.state.stok_input * 2000)},-
            </Text>
          </View>
          <View style={{margin: 5}}></View>
          <TouchableNativeFeedback
            onPress={() => this.props.navigation.goBack()}>
            <View style={styles.viewButton}>
              <Text style={styles.textButton}>Jual</Text>
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
    flexDirection: 'row',
    elevation: 3,
    padding: 10,
    alignItems: 'center',
  },
  imgHeader: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  viewContent: {
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 5,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgIcon: {
    width: 35,
    height: 35,
    marginRight: 15,
  },
  viewInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  textJual: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  viewButton: {
    backgroundColor: '#1d8500d4',
    padding: 10,
    elevation: 3,
    borderRadius: 5,
  },
  textButton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
});
