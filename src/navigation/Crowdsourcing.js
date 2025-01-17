import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {Button, SearchBar} from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome5';
import FeedbackForm from '../containers/FeedbackForm';

export default class Crowdsourcing extends Component {
	static navigationOptions = ({navigation}) => {
		const info = navigation.state.params.info;
		var footway = navigation.state.params.info.footway;
		footway = footway.charAt(0).toUpperCase() + footway.slice(1)
		return {
			title: info.description != null ? info.description : footway,
		}
	}

	render() {
		const { params } = this.props.navigation.state;
		return (
			<FeedbackForm
				info={params.info}
				navigation={this.props.navigation}
			/>
		);
	}
}
