import React, { Component } from 'react';
import {
	Animated,
	AsyncStorage,
	Picker,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import PropTypes from 'prop-types';

import States from '../../../../shared/statesList';
import {
	largeFontSize,
	mainButtonsHeight,
	mediumFontSize,
	navBarContainerHeight,
  primaryBlue,
	screenHeight,
	screenWidth,
	verificationContainerHeight,
	verifyPickerInputWidth,
} from '../../styles/common';



export default class VerifyModal extends Component {
	constructor() {
		super();
		this.state = {
			license: '',
			licenseBackground: 'white',
			licenseText: primaryBlue,
			state: '',
			states: [],
		};
		this.animatedBottom = new Animated.Value(-320);
		this.mounted = false;
	}

	render() {
		return (

				<View 
					style={{
						width: screenWidth,
						backgroundColor: primaryBlue,
						height: verificationContainerHeight, //320,
						padding: '5%',
						zIndex: 11,
					}}
				>
					<View style={styles.containerBorder}>
						<Text style={styles.title}>Verify Information</Text>
						<View style={styles.rowContainer}>
							<Text style={styles.inputLabel}>License:</Text>
							<TextInput
								style={{ 
									backgroundColor: this.state.licenseBackground, 
									borderRadius: 5,
									color: this.state.licenseText,
									width: 150, 
									marginLeft: 15,
									paddingLeft: 15,
								}}
								autoCorrect={false}
								maxLength={7}
								fontSize={largeFontSize}
								autoCapitalize={'characters'}
								underlineColorAndroid={'transparent'}
								onFocus={() => this._onLicenseFocus()}
								onBlur={() => this._onLicenseBlur()}
								onChangeText={(text) => this._onLicenseChangeText(text)}
								value={this.state.license} />
						</View>
						<View style={styles.rowContainer}>
							<Text style={styles.inputLabel}>{'State:     '}</Text>
							<View style={styles.pickerContainer}>
								<Picker
									style={styles.picker}
									selectedValue={this.state.state}
									onValueChange={(val) => this._onStateChange(val)}
								>
									{ this.state.states }
								</Picker>
							</View>
						</View>

						<View style={styles.buttonsContainer}>
							<TouchableOpacity 
								activeOpacity={.9}
								onPress={() => {
									if (this.props.minimizeVerifyContainerForMenu) this.props.minimizeVerifyContainerForMenu();
									this.props.minimizeVerifyContainer();
								}}
							>
								<View style={styles.cancelButton}>
									<Text style={styles.cancelText}>Cancel</Text>
								</View>
							</TouchableOpacity>
							<TouchableOpacity 
								style={styles.confirmButton}
								activeOpacity={.9}
								onPress={() => {
									this.props.handleVINSearch(this.state.license, this.state.state);
									if (this.props.minimizeVerifyContainerForMenu) this.props.minimizeVerifyContainerForMenu();
									this.props.minimizeVerifyContainer();
								}}
							>
								<Text style={styles.confirmText}>Confirm</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
		);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.license !== this.state.license) this.setState({license: nextProps.license});
	}

	componentDidMount() {
		this.mounted = true;
		this._animateContainer();
		this._buildPicker();
		this._getAndSetState();
	}

	componentWillUnmount() {
		this.mounted = false;
	}

	_animateContainer() {
		Animated.timing(
			this.animatedBottom, {
				toValue: screenHeight - (mainButtonsHeight + navBarContainerHeight + 320),
				duration: 1000
			}
		).start();
	}

	async _getAndSetState() {
		if (this.props.state) {
			this.mounted && this.setState({state: this.props.state});
		} else {
			var profileSettings = await AsyncStorage.getItem('@Enforce:profileSettings');
			profileSettings = JSON.parse(profileSettings);
			this.mounted && this.setState({state: profileSettings.spelledState ? profileSettings.spelledState : 'Alabama'});
		}
	}

	_buildPicker() {
		var states = [],
				key = 0;

		for (let state in States) {
			states.push(<Picker.Item label={state} value={state} key={key}/>);
			key++;
		}
		this.mounted && this.setState({states});
	}

	_onLicenseChangeText(license) {
		if (/\W/.test(license)) return;
		if (license.length === 0) {
			this.setState({license, licenseBorder: 'red'});
		} else if (this.state.licenseBorder === 'red') {
			this.setState({license, licenseBorder: 'black'});
		} else {
			this.setState({license});
		}
	}

	_onLicenseFocus() {
		this.mounted && this.setState({licenseBackground: primaryBlue, licenseText: 'white'});
	}

	_onLicenseBlur() {
		this.mounted && this.setState({licenseBackground: 'white', licenseText: primaryBlue});
	}


	_onStateChange(state) {
		this.setState({state});
	}
}

VerifyModal.propTypes = {
	handleVINSearch: PropTypes.func.isRequired,
	license: PropTypes.string, 
	minimizeVerifyContainer: PropTypes.func.isRequired,
	minimizeVerifyContainerForMenu: PropTypes.func,
	state: PropTypes.string,
}

const styles = StyleSheet.create({
  containerBorder: {
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 5,
    padding: '6%',
	},
	rowContainer: {
		alignItems: 'center',
		alignSelf: 'stretch',
		flexDirection: 'row',
		marginBottom: '2%',
	},
	title: {
		fontSize: largeFontSize,
		fontWeight: 'bold',
		marginBottom: '4%',
	},
	inputLabel: {
		fontSize: mediumFontSize,
		marginRight: '2%',
	},
	pickerContainer: {
		borderBottomWidth: 1, 
		paddingLeft: 15,
		width: verifyPickerInputWidth, 
	},
	picker: {
		marginTop: '2%',
		color: primaryBlue,
		width: 150,
	},
	buttonsContainer: {
		alignItems: 'center',
		alignSelf: 'center',
		flexDirection: 'row',
		marginTop: '3%',
	},
	cancelButton: {
		marginRight: '20%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	cancelText: {
		color: primaryBlue,
		padding: '8%',
	},
	confirmButton: {
		backgroundColor: primaryBlue,
		borderRadius: 5,
	},
	confirmText: {
		color: 'white',
		padding: '5%',
	},
});