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
      type: 1,
      jenis: 'Organik',
      stok: '100',
      refresh: false,
    };
  }

  toPrice(price) {
    return _.replace(price, /\B(?=(\d{3})+(?!\d))/g, '.');
  }

  componentDidMount() {
    AsyncStorage.getItem('token')
      .then((value) => {
        console.log('token tersedia.');
        this.setState({token: value});
        this.changeStateA();
      })
      .catch((err) => console.log('terjadi kesalahan. ', err));
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
                  <View>
                    <Text style={{color: 'white'}}>Saldo Bank:</Text>
                    <Text style={styles.textMoney}>Rp. {this.toPrice()},-</Text>
                  </View>
                </View>
                <View style={styles.content}>
                  <View style={styles.viewOption}>
                    <TouchableNativeFeedback
                      onPress={() => this.changeStateA()}>
                      <View style={styles.subViewOption}>
                        <Image
                          source={require('../../assets/icons8-box-other-100.png')}
                          style={styles.iconOption}
                        />
                        <Text style={styles.textOption}>Stok</Text>
                      </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback
                      onPress={() => this.changeStateB()}>
                      <View style={styles.subViewOption}>
                        <Image
                          source={require('../../assets/icons8-money-100.png')}
                          style={styles.iconOption}
                        />
                        <Text style={styles.textOption}>Pemasukan</Text>
                      </View>
                    </TouchableNativeFeedback>
                  </View>
                  {this.state.konten == '' ? (
                    <TouchableNativeFeedback
                      onPress={() =>
                        this.props.navigation.navigate('SellSampah')
                      }>
                      <View style={styles.viewPlus}>
                        <Image
                          source={require('../../assets/transaksi.png')}
                          style={styles.imgPlus}
                        />
                        <Text style={styles.textPlus}>Jual Sampah!</Text>
                      </View>
                    </TouchableNativeFeedback>
                  ) : (
                    <></>
                  )}
                  {this.state.konten == '' ? (
                    <View style={{padding: 20}}>
                      <ActivityIndicator size="large" color="green" />
                    </View>
                  ) : (
                    <View>
                      {this.state.konten == 'konten1' ? (
                        <>
                          <TouchableNativeFeedback
                            onPress={() =>
                              this.props.navigation.navigate('SellSampah', {
                                jenis: this.state.jenis,
                                stok: this.state.stok,
                              })
                            }>
                            <View style={styles.viewMainHistory}>
                              <View style={styles.viewContent}>
                                <View style={styles.viewContentType}>
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
                                  <View>
                                    <Text style={{color: 'grey'}}>Sampah</Text>
                                    <Text style={styles.texType}>
                                      {this.state.jenis}
                                    </Text>
                                  </View>
                                </View>
                                <View>
                                  <Text
                                    style={{color: 'grey', textAlign: 'right'}}>
                                    Stok
                                  </Text>
                                  <Text style={styles.texType}>
                                    {this.state.stok} KG
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </TouchableNativeFeedback>
                        </>
                      ) : (
                        <>
                          {this.state.konten == 'konten2' ? (
                            <>
                              <View style={styles.viewMainHistory}>
                                <View style={styles.viewContent}>
                                  <View style={{flex: 1}}>
                                    <Text style={styles.texType}>
                                      Organik 5 KG
                                    </Text>
                                    <Text style={{color: 'grey'}}>
                                      27 Desember 2020
                                    </Text>
                                  </View>
                                  <View>
                                    <Text style={{color: 'grey'}}>
                                      Total Pemasukan
                                    </Text>
                                    <Text style={styles.texType}>
                                      Rp. {this.toPrice(90000)},-
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            </>
                          ) : (
                            <></>
                          )}
                        </>
                      )}
                    </View>
                  )}
                </View>
                <View style={{marginTop: 56}}></View>
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
  texType: {
    fontWeight: 'bold',
    fontSize: 20,
    includeFontPadding: false,
  },
  viewContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewContentType: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewPlus: {
    padding: 8,
    borderRadius: 5,
    elevation: 3,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  imgPlus: {
    width: 30,
    height: 30,
    tintColor: 'green',
    marginRight: 10,
  },
  textPlus: {
    fontSize: 17,
    fontWeight: 'bold',
  },
});
