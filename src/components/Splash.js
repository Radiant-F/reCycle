import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';

class Splash extends Component {
  componentDidMount() {
    setTimeout(() => {
      AsyncStorage.getItem('token')
        .then((value) => {
          if (value != null) {
            this.props.changeUser({token: value});
            AsyncStorage.getItem('role').then((value) => {
              if (value == '1') {
                console.log('nasabah masuk');
                this.props.navigation.replace('Nasabah', {screen: 'Nasabah'});
              } else if (value == '2') {
                console.log('pengurus1 masuk');
                this.props.navigation.replace('Pengurus1', {
                  screen: 'Pengurus1',
                });
              } else {
                console.log('pengurus2 masuk');
                this.props.navigation.replace('Pengurus2', {
                  screen: 'Pengurus2',
                });
              }
            });
          } else {
            AsyncStorage.getItem('first').then((value) => {
              if (value != null) {
                this.props.navigation.replace('Login');
              } else {
                this.props.navigation.replace('Intro');
              }
            });
          }
        })
        .catch((err) => console.log('asyncstorage error.', err));
    }, 1000);
  }

  render() {
    return (
      <View style={styles.mainView}>
        <Image
          source={require('../assets/block-recycle-reduce-reuse-logo-wallpapers.jpeg')}
          style={styles.bg}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  bg: {
    width: '100%',
    height: '100%',
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

export default connect(MapStateToProps, MapDispatchToProps)(Splash);
