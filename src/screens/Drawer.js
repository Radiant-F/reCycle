import React, {Component} from 'react';
import DrawerNasabah from './nasabah/Drawer';
import DrawerPengurus1 from './pengurus1/Drawer';
import DrawerPengurus2 from './pengurus2/Drawer';
import {connect} from 'react-redux';
import {ActivityIndicator, Alert, View} from 'react-native';

class Drawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: '',
      token: this.token(),
    };
  }

  token() {
    if (this.props.user.token) {
      console.log('token redux ', this.props.user.token);
      return this.props.user.token;
    }
    return '';
  }

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    console.log('mengambil role user..');
    fetch('http://mini-project-e.herokuapp.com/api/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((response) => response.json())
      .then((responseJSON) => {
        if (responseJSON.user.role != null) {
          this.props.changeUser({
            nomer: responseJSON.user.nomer,
            alamat: responseJSON.user.alamat,
            name: responseJSON.user.name,
            avatar: responseJSON.user.avatar,
          });
          this.setState({role: responseJSON.user.role});
          console.log('role yg sedang masuk: ', this.state.role);
        } else {
          console.log('gagal mengambil role user.');
        }
      })
      .catch((err) => console.log(err));
  }

  alert() {
    Alert.alert('Terjadi Kesalahan', 'Tidak bisa mengambil role user.', [
      {text: 'Ok'},
    ]);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.state.role == '' ? (
          <View
            style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size="large" color="red" />
          </View>
        ) : (
          <>
            {this.state.role == 1 ? (
              <DrawerNasabah navigation={this.props.navigation} />
            ) : (
              <>
                {this.state.role == 2 ? (
                  <DrawerPengurus1 navigation={this.props.navigation} />
                ) : (
                  <DrawerPengurus2 navigation={this.props.navigation} />
                )}
              </>
            )}
          </>
        )}
      </View>
    );
  }
}

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

export default connect(MapStateToProps, MapDispatchToProps)(Drawer);
