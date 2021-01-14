import React, {Component} from 'react';
import _ from 'lodash';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
  ImageBackground,
  ScrollView,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      konten: '',
      saldo: '',
      type: '2',
      refresh: false,
    };
  }

  toPrice(price) {
    return _.replace(price, /\B(?=(\d{3})+(?!\d))/g, '.');
  }

  componentDidMount() {
    AsyncStorage.getItem('token')
      .then((value) => {
        this.setState({token: value});
        console.log('token tersedia.');
        this.changeStateA();
      })
      .catch((err) => console.log(err));
  }

  getSetor() {
    fetch('', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((response) => response.json())
      .then((responseJSON) => {
        console.log(responseJSON);
      })
      .catch((err) => console.log(err));
  }

  changeStateA() {
    this.setState({konten: 'konten1', refresh: false});
  }

  changeStateB() {
    this.setState({konten: 'konten2', refresh: false});
  }

  alert() {
    Alert.alert('Terjadi Kesalahan', 'uhh', [
      {
        text: 'Ok',
      },
    ]);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <View style={styles.subHeader}>
            <TouchableNativeFeedback
              onPress={() => this.props.navigation.openDrawer()}>
              <View>
                <Image
                  source={require('../../assets/menu-button.png')}
                  style={styles.icon}
                />
              </View>
            </TouchableNativeFeedback>
            <Text style={styles.textHeader}>reCycle</Text>
            <TouchableNativeFeedback
              onPress={() => this.props.navigation.navigate('ChatScreen')}>
              <View>
                <Image
                  source={require('../../assets/icons8-chat-64.png')}
                  style={styles.iconMsg}
                />
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
        <View>
          <ImageBackground
            blurRadius={3}
            source={require('../../assets/imgHome.png')}
            style={styles.bg}>
            <View>
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refresh}
                    onRefresh={() => {
                      this.setState({refresh: true});
                      this.state.konten == 'konten1'
                        ? this.changeStateA()
                        : this.changeStateB();
                    }}
                  />
                }>
                <View style={styles.viewMoney}>
                  <View style={{width: 210}}>
                    <Text style={{color: 'white'}}>Selamat Datang,</Text>
                    <Text style={styles.textMoney}>Pengurus</Text>
                  </View>
                </View>
                <View style={styles.content}>
                  <View style={styles.viewOption}>
                    <TouchableNativeFeedback
                      onPress={() => this.changeStateA()}>
                      <View style={styles.subViewOption}>
                        <Image
                          source={require('../../assets/icons8-box-100.png')}
                          style={styles.iconOption}
                        />
                        <Text style={styles.textOption}> Penyetoran </Text>
                      </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback
                      onPress={() => this.changeStateB()}>
                      <View style={styles.subViewOption}>
                        <Image
                          source={require('../../assets/icons8-truck-100.png')}
                          style={styles.iconOption}
                        />
                        <Text style={styles.textOption}> Request </Text>
                      </View>
                    </TouchableNativeFeedback>
                  </View>
                  {this.state.konten == 'konten1' ? (
                    <TouchableNativeFeedback
                      onPress={() =>
                        this.props.navigation.navigate('AddSampah')
                      }>
                      <View style={styles.viewPlus}>
                        <Image
                          source={require('../../assets/icons8-garbage-truck-64.png')}
                          style={styles.imgPlus}
                        />
                        <Text style={styles.textPlus}>+ Tambah Data</Text>
                      </View>
                    </TouchableNativeFeedback>
                  ) : (
                    <></>
                  )}
                  {this.state.konten == '' ? (
                    <View style={{padding: 40}}>
                      <ActivityIndicator size="large" color="green" />
                    </View>
                  ) : (
                    <View>
                      {this.state.konten == 'konten1' ? (
                        <View style={styles.viewMainHistory}>
                          <View style={{flex: 1}}>
                            <Text style={{color: 'grey', marginBottom: 10}}>
                              2020-19-10
                            </Text>
                            <View style={styles.viewContent}>
                              <Image
                                source={require('../../assets/user-shape.png')}
                                style={styles.imgUser}
                              />
                              <Text style={styles.textContent}>Asep</Text>
                            </View>
                            <View style={styles.viewContent}>
                              {this.state.type == 1 ? (
                                <>
                                  <View style={styles.viewType1}>
                                    <Image
                                      source={require('../../assets/recycle-picture.png')}
                                      style={styles.imgType}
                                    />
                                  </View>
                                  <Text style={styles.textContent}>Daun</Text>
                                </>
                              ) : (
                                <>
                                  {this.state.type == 2 ? (
                                    <>
                                      <View style={styles.viewType2}>
                                        <Image
                                          source={require('../../assets/recycle-picture.png')}
                                          style={styles.imgType2}
                                        />
                                      </View>
                                      <View>
                                        <Text style={styles.textContent}>
                                          Plastik
                                        </Text>
                                        <Text style={styles.textContent}>
                                          2 Kilogram
                                        </Text>
                                      </View>
                                    </>
                                  ) : (
                                    <>
                                      <View style={styles.viewType3}>
                                        <Image
                                          source={require('../../assets/recycle-picture.png')}
                                          style={styles.imgType}
                                        />
                                      </View>
                                      <Text style={styles.textContent}>
                                        Baterai
                                      </Text>
                                    </>
                                  )}
                                </>
                              )}
                            </View>
                          </View>
                          <View style={styles.subViewHistory}>
                            <Text style={{color: 'grey', textAlign: 'right'}}>
                              Total Harga
                            </Text>
                            <Text style={styles.textSampah}>
                              Rp.{this.toPrice(250000)},-
                            </Text>
                          </View>
                        </View>
                      ) : (
                        <TouchableNativeFeedback
                          onPress={() =>
                            this.props.navigation.navigate('ConfirmRequest')
                          }>
                          <View style={styles.viewMainHistory}>
                            <View style={{flex: 1}}>
                              <View style={{flexDirection: 'row'}}>
                                <Text style={{color: 'grey', flex: 1}}>
                                  ID Penarikan #1
                                </Text>
                                <Image
                                  source={require('../../assets/clock-with-white-face.png')}
                                  style={styles.imgStatus}
                                />
                              </View>
                              <Text
                                numberOfLines={1}
                                style={styles.textContent2}>
                                Muhammad Radiant Fadilah
                              </Text>
                              <View style={styles.viewMap}>
                                <Image
                                  source={require('../../assets/map-placeholder.png')}
                                  style={styles.imgIcon}
                                />
                                <Text>BPK Blok G 21/23</Text>
                              </View>
                              <Text style={styles.textTanggal}>
                                30 Desember 2020
                              </Text>
                            </View>
                          </View>
                        </TouchableNativeFeedback>
                      )}
                    </View>
                  )}
                </View>
              </ScrollView>
            </View>
          </ImageBackground>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    backgroundColor: 'white',
    padding: 15,
    elevation: 5,
  },
  icon: {
    width: 23,
    height: 16,
  },
  iconMsg: {
    width: 25,
    height: 25,
  },
  subHeader: {
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textHeader: {
    paddingHorizontal: 20,
    includeFontPadding: false,
    fontSize: 17,
    flex: 1,
  },
  bg: {
    width: '100%',
    height: '100%',
  },
  content: {
    backgroundColor: '#ffffffc9',
    width: '100%',
    borderRadius: 25,
    padding: 15,
    marginTop: 25,
  },
  viewMoney: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 5,
    paddingHorizontal: 20,
  },
  textMoney: {
    color: 'white',
    fontSize: 28,
    includeFontPadding: false,
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowRadius: 1,
    textShadowOffset: {
      width: 1,
      height: 1,
    },
  },
  touchSampah: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    // width: 120,
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 3,
    marginTop: 10,
  },
  touchImg: {
    width: 30,
    height: 30,
    tintColor: 'green',
    marginRight: 5,
  },
  touchTopUp: {},
  textTopUp: {
    fontSize: 17,
    fontWeight: 'bold',
    includeFontPadding: false,
  },
  viewOption: {
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 20,
    padding: 15,
    marginTop: -45,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 290,
  },
  iconOption: {
    width: 50,
    height: 50,
  },
  subViewOption: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textOption: {
    includeFontPadding: false,
  },
  viewMainHistory: {
    width: '95%',
    backgroundColor: 'white',
    elevation: 3,
    alignSelf: 'center',
    marginVertical: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textSampah: {
    fontWeight: 'bold',
    includeFontPadding: false,
    fontSize: 20,
  },
  textSub: {
    color: 'grey',
    fontSize: 12,
    includeFontPadding: false,
  },
  textSub2: {
    color: 'grey',
    fontSize: 10,
    includeFontPadding: false,
    flex: 1,
  },
  textSub3: {
    color: 'grey',
    includeFontPadding: false,
  },
  textTanggal: {
    fontWeight: 'bold',
    includeFontPadding: false,
    marginVertical: 5,
    // fontSize: 17,
  },
  textAlamat: {
    color: 'grey',
    fontSize: 12,
    includeFontPadding: false,
    marginVertical: 5,
  },
  textContent: {
    fontSize: 17,
    includeFontPadding: false,
  },
  viewContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 7,
  },
  textContent2: {
    fontSize: 20,
    includeFontPadding: false,
  },
  imgUser: {
    width: 30,
    height: 30,
    marginRight: 10,
    borderRadius: 15,
  },
  imgIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  imgStatus: {
    width: 20,
    height: 20,
  },
  imgPlus: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  viewPlus: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 2,
    alignSelf: 'center',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  textPlus: {
    fontSize: 17,
    includeFontPadding: false,
    fontWeight: 'bold',
  },
  viewType1: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    marginRight: 10,
  },
  viewType2: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    marginRight: 10,
  },
  viewType3: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    marginRight: 10,
  },
  imgType: {
    width: 17,
    height: 17,
    tintColor: 'white',
  },
  imgType2: {
    width: 17,
    height: 17,
  },
  viewMap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
});
