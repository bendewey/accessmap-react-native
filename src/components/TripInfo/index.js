import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { AreaChart, LineChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';

import {
	ROUTE_INFO_TEXT,
	GRAPH_X_AXIS,
	GRAPH_Y_AXIS,
	TOTAL_DISTANCE_TEXT,
	ESTIMATED_TIME_TEXT,
	STEEPEST_UPHILL_INCLINE_TEXT,
	STEEPEST_DOWNHILL_INCLINE_TEXT
} from '../../utils/translations';

import Header from '../Header';

const InfoText = props => {
	return (<View accessible={true} style={{marginBottom: 20}}>
		<Text>{props.info}</Text>
		<Text style={{color: "black"}}>{props.value}</Text>
	</View>);
}

const TripInfo = props => {
	const route = props.route.routes[0];
	const data = route.legs[0];
	const nRoutes = [...Array(data.length + 1).keys()];
	const totalDist = nRoutes.map(i => {
		if (i == 0) {
			return 0;
		}
		return data[i - 1].properties.length;
	});

	var maxUphill = -200;
	var maxDownhill = 200;
	const elevChange = nRoutes.map(i => {
		if (i == 0) {
			return 0;
		}
		if (data[i - 1].properties.hasOwnProperty("incline")) {
			maxUphill = Math.max(data[i - 1].properties.incline, maxUphill);
			maxDownhill = Math.min(data[i - 1].properties.incline, maxDownhill);
			return data[i - 1].properties.incline * data[i - 1].properties.length
		}
		return 0;
	});
	const xInc = [...Array(10).keys()];
	const xAxis = xInc.map(i => i * totalDist[totalDist.length - 1] / 9);
	for (var i = 1; i < totalDist.length; i++) {
		totalDist[i] += totalDist[i - 1];
		elevChange[i] += elevChange[i - 1];
	}
	return (
		<View style={{height: "50%"}}>
			<View>
				<Header
					title={ROUTE_INFO_TEXT}
					close={props.close}
				/>
			</View>
			<ScrollView style={{padding: 10}}>
				<Text>Experienced elevation gain</Text>
				<View style={{height: 200, flexDirection: "row", alignItems: "center"}}>
					<View style={{left: -50, position: "absolute", transform: [{rotate: "270deg"}]}}>
						<Text>{GRAPH_Y_AXIS}</Text>
					</View>
					<YAxis
						style={{marginLeft: 20}}
						data={ elevChange }
						contentInset={{top: 20, bottom: 20}}
						svg={{
							fill: "grey",
							fontSize: 10,
						}}
						numberOfTicks={10}
						formatLabel={value => `${value}`}
					/>
					<AreaChart
						style={{flex: 1, marginLeft: 16}}
						data={ elevChange }
						yAccessor={({item}) => item}
						xAccessor={({index}) => totalDist[index]}
						svg={{ fill: "rgb(240, 150, 20, 0.5)", stroke: "black", strokeWidth: 3 }}
						contentInset={{ top: 20, bottom: 20 }}
					>
						<Grid/>
					</AreaChart>
				</View>
				<XAxis
					style={{marginHorizontal: -10, marginLeft: 36}}
					data={ xAxis }
					formatLabel={(index) => `${xAxis[index].toFixed(1)}`}
					contentInset={{left: 10, right: 10}}
					svg={{fontSize: 10, fill: "black"}}
				/>
				<View style={{alignItems: "center", flex: 1}}>
					<Text>{GRAPH_X_AXIS}</Text>
				</View>
				<InfoText value={`${route.distance.toFixed(1)} meters`} info={TOTAL_DISTANCE_TEXT} />
				<InfoText value={`${(route.duration / 60).toFixed(1)} minutes`} info={ESTIMATED_TIME_TEXT} />
				<InfoText value={`${Math.round(100*maxUphill)} %`} info={STEEPEST_UPHILL_INCLINE_TEXT} />
				<InfoText value={`${Math.round(100*maxDownhill)} %`} info={STEEPEST_DOWNHILL_INCLINE_TEXT} />
			</ScrollView>
		</View>
	);
}

export default TripInfo;
