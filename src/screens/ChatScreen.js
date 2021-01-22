import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export default class ChatScreen extends Component {
  constructor() {
    super();
    this.state = {
      idUser: '1',
    };
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.headerView}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image
              source={require('../assets/back-arrow.png')}
              style={styles.headerIcon}
            />
          </TouchableOpacity>
          <Text>Abang Ganteng</Text>
        </View>
        <View style={styles.viewSend}>
          <TextInput placeholder="Pesan" style={{flex: 1}} />
          <TouchableOpacity>
            <Image
              source={require('../assets/send-button.png')}
              style={styles.iconSend}
            />
          </TouchableOpacity>
        </View>
        <View style={{padding: 7}}>
          {/* {this.state.idUser == '2' ? ( */}
          <TouchableWithoutFeedback onLongPress={() => alert('Ditekan')}>
            <View style={styles.right}>
              <Text style={{color: 'white'}}> Hai </Text>
            </View>
          </TouchableWithoutFeedback>
          {/* ) : ( */}
          <View style={styles.left}>
            <Text style={{color: 'white'}}> Halo </Text>
          </View>
          {/* )} */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  headerView: {
    padding: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    elevation: 3,
  },
  iconSend: {
    width: 25,
    height: 25,
  },
  viewSend: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    borderRadius: 45 / 2,
    elevation: 5,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    flex: 1,
    width: '100%',
  },
  right: {
    backgroundColor: '#1d8500d4',
    padding: 5,
    borderRadius: 5,
    elevation: 3,
    alignSelf: 'flex-end',
  },
  left: {
    backgroundColor: '#854700d4',
    padding: 5,
    borderRadius: 5,
    elevation: 3,
    alignSelf: 'flex-start',
  },
});
