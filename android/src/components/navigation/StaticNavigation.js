import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import {
  blueTextShadow,
  navBarContainerHeight,
  primaryBlue,
  titleFontSize,
} from '../../styles/common';
 
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
            style={styles.searchIcon}
            source={require('../../../../shared/images/backarrow.jpg')} />
        </TouchableWithoutFeedback>
        <Text style={styles.title}>{ this.props.title ? this.props.title : 'Enforce' }</Text>

        { 
          this.props.navigation ?
          <TouchableHighlight
            underlayColor={primaryBlue}
            onPress={ () => {
              this.props.navigation.navigate('DrawerOpen');
            }}
            style={styles.headerNavigation} >
            <Image source={require('../../../../shared/images/menu-icon.jpg')} />
          </TouchableHighlight>
          : null 
        }

      </View>
    );
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.title !== nextProps.title) return true;
    return false;
  }

  _handleArrow() {
    if (this.props.closeModal) {
      this.props.closeModal();
      return;
    }
    if (this.props.timerList) {
      this.props.navigation.navigate('Timers');
    } else {
      this.props.navigation.navigate('Overview');
    }
  }

}

StaticNavigation.propTypes = {
  closeModal: PropTypes.func,
  navigation: PropTypes.object,
  timerList: PropTypes.bool,
  title: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: primaryBlue,
    flexDirection: 'row',
    height: navBarContainerHeight,
    zIndex: 10,
  },
  searchIcon: {
    marginLeft: '2%',
  },
  title: {
    color: 'white',
    flex: .70,
    fontSize: titleFontSize,
    marginLeft: '2%',
    textAlignVertical: 'center',
    textShadowColor: blueTextShadow,
    textShadowOffset: {
      width: 2,
      height: 1
    },
  },
  headerNavigation: {
    flex: .15,
    position: 'absolute',
    right: '1%',
  },
});
