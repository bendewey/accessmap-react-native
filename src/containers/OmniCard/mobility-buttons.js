import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from '../../components/Icon';

import {
	MOBILITY_MODE_CUSTOM,
	MOBILITY_MODE_WHEELCHAIR,
	MOBILITY_MODE_POWERED,
	MOBILITY_MODE_CANE,
} from '../../constants';
import {
	CUSTOM_MODE_TEXT,
	WHEELCHAIR_MODE_TEXT,
	POWERED_MODE_TEXT,
	CANE_MODE_TEXT
} from '../../utils/translations';

import { setMobilityMode } from '../../actions';
import { connect } from 'react-redux';

const MobilityButtonRender = props => {
	const _onPress = () => {
		props.setMobilityMode(props.mode);
	}
	const selected = props.mode == props.mobilityMode;
	const buttonColor = selected ? "#0000AA" : "#FFFFFF";

	return (
		<Button
			accessibilityLabel={"Mobility Mode: " + props.label + ". " +
				(selected ? "Currently selected" : "Select to set mode")}
			buttonStyle={{...styles.mobilityButton, backgroundColor: buttonColor}}
			icon={<Icon
				name={props.name}
				size={25}
				color={selected ? "#EEEEEE" : "#555555" }
			/>}
			title={selected ? props.label : null}
			titleStyle={{marginLeft: 3, fontSize: 15}}
			onPress={_onPress}
		/>
	);
}

const mapStateToProps = state => {
	return {
		mobilityMode: state.mobilityMode,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setMobilityMode: mode => {
			dispatch(setMobilityMode(mode));
		},
	};
};

const MobilityButton = connect(mapStateToProps, mapDispatchToProps)(MobilityButtonRender);

const MobilityButtonGroup = props => {
	return (
		<View style={{flexDirection: "row"}}>
			<MobilityButton
				name="person-pin"
				label={CUSTOM_MODE_TEXT}
				mode={MOBILITY_MODE_CUSTOM}
			/>
			<MobilityButton
				name="wheelchair"
				label={WHEELCHAIR_MODE_TEXT}
				mode={MOBILITY_MODE_WHEELCHAIR}
			/>
			<MobilityButton
				name="wheelchair-powered"
				label={POWERED_MODE_TEXT}
				mode={MOBILITY_MODE_POWERED}
			/>
			<MobilityButton
				name="cane-user"
				label={CANE_MODE_TEXT}
				mode={MOBILITY_MODE_CANE}
			/>
		</View>
	);
}

export default MobilityButtonGroup;

const styles = StyleSheet.create({
	mobilityButton: {
		borderRadius: 20,
		marginTop: 5,
		height: 40,
	},
});
