import React, { Component } from 'react';
import { FlatList, View, Text, TouchableHighlight } from 'react-native';
import { Button, Overlay } from 'react-native-elements';

import regions from '../../constants/regions';
import Header from '../../components/Header';
import { goToRegion } from '../../actions';
import { REGIONS_TEXT } from '../../utils/translations';

import { connect } from 'react-redux';

class RegionSwitcher extends Component {
	constructor(props) {
		super(props);
		this.state = {
			viewOverlay: false
		};
	}

	render() {
		const goToRegion = this.props.goToRegion;

		return (<View>
			<Button
				accessibilityLabel={"Current region: " + this.props.currRegion +
					". Select to change region."}
				buttonStyle={{
					backgroundColor: "#FFFFFF",
					borderColor: "#0000AA",
					borderWidth: 2,
					padding: 5}}
				title={this.props.currRegion}
				titleStyle={{color: "#0000AA"}}
				onPress={() => this.setState({viewOverlay: !this.state.viewOverlay})}
			/>
			<Overlay
				isVisible={this.state.viewOverlay}
				onBackdropPress={() => this.setState({viewOverlay: !this.state.viewOverlay})}
				width="auto"
				height="auto"
			>
				<View style={{width: "100%"}}>
					<Header
						title={REGIONS_TEXT}
						close={() => this.setState({viewOverlay: !this.state.viewOverlay})}
					/>
					<FlatList
						data={regions}
						renderItem={(item) =>
							<TouchableHighlight
								style={{padding: 5, width: 200}}
								onPress={() => {
									this.setState({viewOverlay: !this.state.viewOverlay});
									goToRegion(item.item);
								}}
							>
								<Text style={{fontSize: 18}}>{item.item.properties.name}</Text>
							</TouchableHighlight>
						}
						keyExtractor={(item, index) => index.toString()}
					/>
				</View>
			</Overlay>
		</View>);
	}
}

const mapStateToProps = state => {
	return {
		currRegion: state.currRegion
	}
}

const mapDispatchToProps = dispatch => {
	return {
		goToRegion: region => {
			dispatch(goToRegion(region));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(RegionSwitcher);
