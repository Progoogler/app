import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MapView from 'react-native-maps';
import Navigation from '../navigation/StaticNavigation';
import PropTypes from 'prop-types';
import Realm from 'realm';
 
import {
  largeFontSize,
  primaryBlue,
  screenHeight,
} from '../../styles/common';

/*global require*/
export default class Metrics extends Component {
  constructor() {
    super();
    this.realm = new Realm();
  }
  static navigationOptions = {
    drawerLabel: 'Metrics',
    drawerIcon: () => (
      <Image source={require('../../../../shared/images/bar-icon.png')} />
    )
  };

  render() {
    return (
      <View style={styles.container}>
        <Navigation
          style={styles.header}
          title={'Metrics'}
          navigation={this.props.navigation}
          imageSource={require('../../../../shared/images/backarrow.jpg')} />
        <MapView.Animated
          ref={ref => { this.animatedMap = ref; }}
          style={styles.map}
          mapType="hybrid"
          showsUserLocation={true}
          initialRegion={{
            latitude: this.realm.objects('Coordinates')[0].latitude ? this.realm.objects('Coordinates')[0].latitude : 37.78926,
            longitude: this.realm.objects('Coordinates')[0].longitude ? this.realm.objects('Coordinates')[0].longitude : -122.43159,
            latitudeDelta: 0.0308,
            longitudeDelta: 0.0260,
          }} >
          <MapView.Circle
            center={{
              latitude: this.realm.objects('Coordinates')[0].latitude ? this.realm.objects('Coordinates')[0].latitude : 37.78926,
              longitude: this.realm.objects('Coordinates')[0].longitude ? this.realm.objects('Coordinates')[0].longitude : -122.43159,
            }}
            strokeWidth={1}
            strokeColor={'black'}
            fillColor={'#ff6600'}
            radius={200}/>
            <MapView.Circle
              center={{
                latitude: this.realm.objects('Coordinates')[0].latitude ? this.realm.objects('Coordinates')[0].latitude - .0125 : 37.78926 - .0125,
                longitude: this.realm.objects('Coordinates')[0].longitude ? this.realm.objects('Coordinates')[0].longitude + .0125 : -122.43159 + .0125,
              }}
              strokeWidth={1}
              strokeColor={'black'}
              fillColor={'yellow'}
              radius={1200}/>
        </MapView.Animated>
        <View style={styles.controlContainer}>
          <Text style={styles.message}>{"This page is currently in progress.\n We'll let you know when it's ready!"}</Text>
          <Image style={styles.image} source={require('../../../../shared/images/worker.jpg')} />
        </View>
      </View>
    );
  }

  componentWillMount() {
    styles.controlContainer = {
      position: 'absolute',
      top: screenHeight / 2 + 50,
      left: 0,
      right: 0,
      bottom: 0,
      borderTopWidth: 5,
      borderColor: primaryBlue,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    };
  }
}

Metrics.propTypes = { navigation: PropTypes.object.isRequired };

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  message: {
    fontSize: largeFontSize,
  },
});
