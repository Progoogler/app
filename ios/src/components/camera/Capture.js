import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  captureContainerHeight,
  mediumFontSize,
} from '../../styles/common';

var buttonSize = captureContainerHeight - 10;

export default class Capture extends Component {
  render() {
    return (
      <View style={styles.footer}>
      <View style={styles.pinContainer}>
        <TouchableOpacity
          activeOpacity={.6}
          onPress={() => this.props.setModalVisible()} >
          <Image
            style={styles.pinIcon}
            source={require('../../../../shared/images/pin.png')} />
        </TouchableOpacity>
        </View>

        <View style={styles.captureContainer}>
        <TouchableOpacity
          activeOpacity={.6}
          style={styles.capture}
          onPress={() => {
          this.props.takePicture();
        }} >
          <View></View>
        </TouchableOpacity>
        </View>

        <View style={styles.undoContainer}>
        <TouchableOpacity
          activeOpacity={.6}
          style={styles.undoButton} >
          <Text
            style={styles.undo}
            onPress={() => this.props.deletePreviousPicture() }>UNDO</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 1)',
    paddingLeft: '2%',
    paddingRight: '2%',
    height: captureContainerHeight,
  },
  pinContainer: {
    flex: 1,
  },
  captureContainer: {
    flex: 1,
  },
  capture: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'white',
    height: buttonSize,
    width: buttonSize,
    borderRadius: buttonSize / 2,
  },
  undoContainer: {
    flex: 1,
  },
  undoButton: {
    alignSelf: 'flex-end',
  },
  undo: {
    color: '#4286f4',
    fontSize: mediumFontSize,
  },
});
