import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

import { connect } from 'react-redux';
import { goToLocation, placePin, setOrigin, setDestination } from '../../actions';
import { ACCESS_TOKEN } from '../../constants';

accessToken = ACCESS_TOKEN;

class Geocoder extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidUpdate(prevProps) {
		if (this.props.search !== prevProps.search) {
			const query = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + this.props.search +
				".json?bbox=" + this.props.bbox +
				"&limit=10&access_token=" + accessToken;
		
			fetch(query)
				.then(response => response.json())
				.then(json => this.setState({ searchList: json.features }))
		}
	}

	_renderItem = ({item, index}) => {
		return (
			<ListItem
				onPress={() => {
					switch (this.props.type) {
						case "search":
							this.props.goToLocation(item);
							break;
						case "origin":
							this.props.setOrigin(item);
							break;
						case "destination":
							this.props.setDestination(item);
					}
					this.props.navigation.pop();
				}}
				title={item.place_name}
			/>
		);
	}
	render() {
		return (
			<FlatList
				data={this.state.searchList}
				keyExtractor={(item, index) => index.toString()}
				renderItem={this._renderItem}
			/>
		);
	}
}

const mapStateToProps = state => {
	return {
		bbox: state.bbox.join(","),
	};
}

const mapDispatchToProps = dispatch => {
	return {
		goToLocation: item => {
			dispatch(goToLocation(item));
			dispatch(placePin(item));
		},
		setOrigin: item => {
			dispatch(goToLocation(item));
			dispatch(placePin(item));
			dispatch(setOrigin());
		},
		setDestination: item => {
			dispatch(goToLocation(item));
			dispatch(placePin(item));
			dispatch(setDestination());
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Geocoder);
