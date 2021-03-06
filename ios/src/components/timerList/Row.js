import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  primaryBlue,
  extraLargeFontSize,
  largeFontSize,
  mediumFontSize,
  smallFontSize,
  timerRowImageHeight,
  timerRowDescContainerHeight,
  timerRowButtonsContainerHeight,
} from '../../styles/common';

export default class Row extends Component {
  constructor() {
    super();
  }

  render() {
    if (this.props.data.createdAt === 0) return <View/>
    return (
      <View style={styles.container} >
        <Image
          style={{height: this.props.imageHeight}}
          source={{uri: this.props.data.mediaUri}} />
        <View style={styles.descriptionContainer}>
          <Text style={styles.timeLeft}>{this._getTimeLeft(this.props.data)}</Text>
          <View style={styles.timeContainer}>
            <Text style={styles.description}>Recorded at</Text>
            <Text style={styles.timeCreatedAt}>{this._getPrettyTimeFormat(this.props.data.createdAt)}</Text>
          </View>
        </View>
        { this.props.data.description ?
        <View style={styles.locationContainer}>
          <Text style={styles.location}>{ `${this.props.data.description}` }</Text>
        </View>
        : null }
        <View style={styles.buttonsContainer} >
          <View style={styles.rowButtonsContainers} >
            <TouchableOpacity
              style={styles.rowButton}
              activeOpacity={.9}
              onPress={() => this.props.expiredFunc(this.props.data)} >
              <Text style={styles.buttonText}> Expired </Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity
              style={styles.rowButton}
              activeOpacity={.9}
              onPress={() => this.props.uponTicketed(this.props.data)}>
              <Text style={styles.buttonText}> Ticketed </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  _onVinRequest() {

  }

  _getPrettyTimeFormat(createdAt: number): string {
    let date = new Date(createdAt);
    let hour = date.getHours();
    let minutes = date.getMinutes() + '';
    minutes = minutes.length === 1 ? '0' + minutes : minutes;
    let period = (hour < 12) ? 'AM' : 'PM';
    hour = (hour <= 12) ? hour : hour - 12;
    return `${hour}:${minutes} ${period}`;
  }

  _getTimeLeft(timer: object): object {
    if (!timer) return;
    let timeLength = timer.timeLength * 60 * 60 * 1000;
    let timeSince = new Date() - timer.createdAt;
    let timeLeft = (timeLength - timeSince) / 1000;
      if (timeLeft < 0) {
      return <Text style={styles.timeUp}>Time is up!</Text>;
    } else if (timeLeft < 60) {
      return<Text style={styles.timeUp}>less than a minute {'\n'}remaining</Text>;
    } else if (timeLeft < 3600) {
      if (timeLeft < 300 ) return <Text style={styles.timeUp}> {Math.floor(timeLeft / 60) === 1 ? '1 minute remaining' : Math.floor(timeLeft / 60) + ' minutes remaining'}</Text>;
      if (timeLeft < 3600 / 4) return <Text style={styles.timeUp}> {Math.floor(timeLeft / 60) === 1 ? '1 minute remaining' : Math.floor(timeLeft / 60) + ' minutes remaining'}</Text>;
      return <Text style={styles.timeUpNear}> {Math.floor(timeLeft / 60) === 1 ? '1 minute remaining' : Math.floor(timeLeft / 60) + ' minutes remaining'}</Text>;
    } else if (timeLeft > 3600) {
      return <Text style={styles.timeUpFar}>{Math.floor(timeLeft / 60 / 60)} hour {Math.floor((timeLeft % 3600) / 60)} minutes remaining</Text>;
    } else {
      return '';
    }
  }
}

Row.propTypes = {
  data: PropTypes.object.isRequired,
  expiredFunc: PropTypes.func.isRequired,
  uponTicketed: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timeUp: {
    fontSize: largeFontSize,
    fontWeight: 'bold',
    color:'green',
  },
  timeUpFar: {
    fontSize: smallFontSize,
    fontWeight: 'bold',
  },
  timeUpNear: {
    fontSize: mediumFontSize,
    fontWeight: 'bold',
    color: primaryBlue,
  },
  buttonsContainer: {
    alignSelf: 'stretch',
  },
  rowButtonsContainers: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: 'white',
    height: timerRowButtonsContainerHeight,//60,
  },
  rowButton: {
    flex: .5,
    backgroundColor: primaryBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    borderColor: 'white',
    borderWidth: .5,
  },
  buttonText: {
    fontSize: largeFontSize,
    color: 'white',
  },
  descriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: timerRowDescContainerHeight,//90,
    padding: '4%',
  },
  timeContainer: {
    flexDirection: 'column',
  },
  timeCreatedAt: {
    color: primaryBlue,
    fontSize: extraLargeFontSize,
  },
  locationContainer: {
    position: 'absolute',
    bottom: '45%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 50,
  },
  location: {
    textAlign: 'center',
    color: primaryBlue,
    fontSize: mediumFontSize,
    paddingLeft: '2%',
    paddingRight: '2%',
    paddingBottom: '1%',
    paddingTop: '1%',
  },
});
