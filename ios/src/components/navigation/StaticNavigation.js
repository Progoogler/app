import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';

/* global require */
export default class StaticNavigation extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View style={styles.container} >
        <TouchableWithoutFeedback style={styles.back} onPress={() => this._handleArrow()} >
          <Image
            style={styles.icon}
            source={require('../../../../shared/images/backarrow.jpg')} />
        </TouchableWithoutFeedback>
        <Text style={styles.title}>{ this.props.title ? this.props.title : 'Enforce' }</Text>

        { this.props.navigation ?
        <TouchableHighlight
          underlayColor='#4286f4'
          onPress={ () => {
            this.props.navigation.navigate('DrawerOpen');
          }}
          style={styles.headerNavigation} >
            <Image source={require('../../../../shared/images/menu-icon.jpg')} style={{height: 45}}/>
        </TouchableHighlight>
        : null }

      </View>
    );
  }

  _handleArrow() {
    this.props.navigation && this.props.navigation.navigate('Overview');
    !this.props.navigation && this.props.closeModal();
  }

}

StaticNavigation.propTypes = {
  navigation: PropTypes.object,
  title: PropTypes.string.isRequired,
  closeModal: PropTypes.func,
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    paddingTop: 15,
    alignItems: 'center',
    backgroundColor: '#4286f4',
    zIndex: 10,
  },
  back: {
    height: 50,
    width: 40,
    marginLeft: 25,
  },
  icon: {
    marginLeft: 15,
  },
  title: {
    flex: .70,
    fontSize: 28,
    marginLeft: 28,
    color: 'white',
    textAlignVertical: 'center',
    textShadowColor: '#3399ff',
    textShadowOffset: {
      width: 2,
      height: 1
    },
  },
  headerNavigation: {
    flex: .15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});