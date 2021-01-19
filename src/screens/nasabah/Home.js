import React, {Component} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
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

class Home extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      konten: '',
      saldo: '',
      type: '3',
      status: '2',
      refresh: false,
    };
  }

  toPrice(price) {
    return _.replace(price, /\B(?=(\d{3})+(?!\d))/g, '.');
  }

  componentDidMount() {
    AsyncStorage.getItem('token').then((value) => {
      this.setState({token: value});
      console.log('token tersedia.');
      this.changeStateC();
    });
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

  changeStateC() {
    this.setState({konten: 'konten3', refresh: false});
  }

  alert() {
    Alert.alert('Terjadi Kesalahan', 'uhh', [
      {
        text: 'Ok',
      },
    ]);
  }

  render() {
    console.log(this.state.konten);
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
              onPress={() => this.props.navigation.navigate('Contact')}>
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
                        : this.state.konten == 'konten2'
                        ? this.changeStateB()
                        : this.changeStateC();
                    }}
                  />
                }>
                <View style={styles.viewMoney}>
                  <View style={{width: 210}}>
                    <Text style={{color: 'white'}}>Total Saldo Anda:</Text>
                    <Text style={styles.textMoney}>
                      Rp.{this.toPrice(this.state.saldo)},-
                    </Text>
                  </View>
                </View>
                <View style={styles.content}>
                  <View style={styles.viewOption}>
                    <TouchableNativeFeedback
                      onPress={() => this.changeStateA()}>
                      <View style={styles.subViewOption}>
                        <Image
                          source={require('../../assets/icons8-money-100.png')}
                          style={styles.iconOption}
                        />
                        <Text>Penyetoran</Text>
                      </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback
                      onPress={() => this.changeStateB()}>
                      <View style={styles.subViewOption}>
                        <Image
                          source={require('../../assets/icons8-box-100.png')}
                          style={styles.iconOption}
                        />
                        <Text>Penarikan</Text>
                      </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback
                      onPress={() => this.changeStateC()}>
                      <View style={styles.subViewOption}>
                        <Image
                          source={require('../../assets/icons8-truck-100.png')}
                          style={styles.iconOption}
                        />
                        <Text>Request</Text>
                      </View>
                    </TouchableNativeFeedback>
                  </View>
                  {this.state.konten == 'konten3' ? (
                    <TouchableNativeFeedback
                      onPress={() => this.props.navigation.navigate('Request')}>
                      <View style={styles.touchSampah}>
                        <Image
                          source={require('../../assets/transaksi.png')}
                          style={styles.touchImg}
                        />
                        <Text style={styles.textTopUp}>Top Up Sampah!</Text>
                      </View>
                    </TouchableNativeFeedback>
                  ) : (
                    <></>
                  )}
                  {this.state.konten == '' ? (
                    <View style={styles.loading}>
                      <ActivityIndicator size="large" color="green" />
                    </View>
                  ) : (
                    <View>
                      {this.state.konten == 'konten1' ? (
                        <View style={styles.viewMainHistory}>
                          <View style={styles.viewKonten1}>
                            <View>
                              {this.state.type == 1 ? (
                                <View style={styles.viewType1}>
                                  <Image
                                    source={require('../../assets/recycle-picture.png')}
                                    style={styles.imgType}
                                  />
                                </View>
                              ) : (
                                <>
                                  {this.state.type == 2 ? (
                                    <View style={styles.viewType2}>
                                      <Image
                                        source={require('../../assets/recycle-picture.png')}
                                        style={styles.imgType2}
                                      />
                                    </View>
                                  ) : (
                                    <View style={styles.viewType3}>
                                      <Image
                                        source={require('../../assets/recycle-picture.png')}
                                        style={styles.imgType}
                                      />
                                    </View>
                                  )}
                                </>
                              )}
                            </View>
                            <View>
                              <Text style={{color: 'grey'}}>
                                20 Desember 2020
                              </Text>
                              <Text style={styles.textSampah}>Besi 1 KG</Text>
                            </View>
                          </View>
                          <View style={styles.subViewHistory}>
                            <Text style={{color: 'grey'}}>Total Pemasukan</Text>
                            <Text style={styles.textSampah}>
                              Rp.{this.toPrice(25000)},-
                            </Text>
                          </View>
                        </View>
                      ) : (
                        <>
                          {this.state.konten == 'konten2' ? (
                            <View style={styles.viewMainHistory}>
                              <View style={{flex: 1}}>
                                <Text style={{color: 'grey'}}>
                                  Tanggal Penarikan
                                </Text>
                                <Text style={styles.textTanggal}>
                                  20 Desember 2020
                                </Text>
                              </View>
                              <View>
                                <Text style={{color: 'grey'}}>
                                  Biaya Penarikan
                                </Text>
                                <Text style={styles.textSampah}>
                                  Rp.{this.toPrice(25000)},-
                                </Text>
                              </View>
                            </View>
                          ) : (
                            <>
                              {this.state.konten == 'konten3' ? (
                                <View style={styles.viewMainHistory}>
                                  <View style={{flexDirection: 'row'}}>
                                    <View
                                      style={{
                                        flex: 1,
                                        justifyContent: 'space-between',
                                      }}>
                                      <View style={styles.viewDelivery}>
                                        {this.state.status == 0 ? (
                                          <>
                                            <Image
                                              source={require('../../assets/clock-with-white-face.png')}
                                              style={styles.imgMap}
                                            />
                                            <Text style={styles.textStatus}>
                                              Mengunggu Konfirmasi..
                                            </Text>
                                          </>
                                        ) : (
                                          <>
                                            {this.state.status == 1 ? (
                                              <>
                                                <Image
                                                  source={require('../../assets/icons8-large-courier-truck-64.png')}
                                                  style={styles.imgMap}
                                                />
                                                <Text style={styles.textStatus}>
                                                  Sedang Dijemput..
                                                </Text>
                                              </>
                                            ) : (
                                              <>
                                                <Image
                                                  source={require('../../assets/black-check-box-with-white-check.png')}
                                                  style={styles.imgMap}
                                                />
                                                <Text style={styles.textStatus}>
                                                  Selesai
                                                </Text>
                                              </>
                                            )}
                                          </>
                                        )}
                                      </View>
                                      <Text style={{color: 'grey', bottom: 0}}>
                                        20 Desember 2020
                                      </Text>
                                    </View>
                                    <View style={styles.viewAlamat}>
                                      <View
                                        style={{
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                        }}>
                                        <Image
                                          source={require('../../assets/map-placeholder.png')}
                                          style={styles.imgMap}
                                        />
                                        <View style={{width: 100}}>
                                          <Text>BPK Blok G 21/23</Text>
                                        </View>
                                      </View>
                                      <TouchableNativeFeedback>
                                        <View style={styles.viewChat}>
                                          <Image
                                            source={require('../../assets/chat-bubbles.png')}
                                            style={styles.imgChat}
                                          />
                                          <Text style={styles.textChat}>
                                            Chat Pengurus
                                          </Text>
                                        </View>
                                      </TouchableNativeFeedback>
                                    </View>
                                  </View>
                                </View>
                              ) : (
                                <></>
                              )}
                            </>
                          )}
                        </>
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
    width: 23,
    height: 23,
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
    marginVertical: 15,
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
  textTanggal: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  textAlamat: {
    color: 'grey',
    fontSize: 12,
    includeFontPadding: false,
    marginVertical: 5,
  },
  loading: {
    alignSelf: 'center',
    marginTop: 15,
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
  viewKonten1: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  viewAlamat: {
    // alignItems: 'center',
    marginVertical: 5,
  },
  imgMap: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  textStatus: {
    fontSize: 20,
    includeFontPadding: false,
  },
  imgStatus: {
    width: 25,
    height: 25,
  },
  viewDelivery: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 7,
  },
  viewChat: {
    backgroundColor: '#1d8500d4',
    borderRadius: 5,
    elevation: 3,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  textChat: {
    color: 'white',
  },
  imgChat: {
    tintColor: 'white',
    width: 20,
    height: 20,
    marginRight: 10,
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

export default connect(MapStateToProps, MapDispatchToProps)(Home);
