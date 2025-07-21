import { calculateRegion, generateMarkersFromData } from "@/lib/map";
import { useLocationStore, useParkingLotStore } from "@/store";
import { MarkerData } from "@/types/type";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import markerIcon from "../assets/icons/marker (2).png";
import selectedMarkerIcon from "../assets/icons/selected-marker.png";

const parkingLots = [
	{
		id: "1",
		name: "Central Park Garage",
		location: "Downtown, Main Street 12",
		image_url:
			"https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
		capacity: 150,
		available_spots: 40,
		rating: "4.80",
	},
	{
		id: "2",
		name: "City Plaza Parking",
		location: "City Plaza, Block A",
		image_url:
			"https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
		capacity: 200,
		available_spots: 75,
		rating: "4.60",
	},
	{
		id: "3",
		name: "Green Street Lot",
		location: "Green Street, Near Market",
		image_url:
			"https://ucarecdn.com/0330d85c-232e-4c30-bd04-e5e4d0e3d688/-/preview/826x822/",
		capacity: 120,
		available_spots: 20,
		rating: "4.70",
	},
	{
		id: "4",
		name: "Riverside Parking",
		location: "Riverside Blvd 45",
		image_url:
			"https://ucarecdn.com/fdfc54df-9d24-40f7-b7d3-6f391561c0db/-/preview/626x417/",
		capacity: 180,
		available_spots: 50,
		rating: "4.90",
	},
];

const Map = () => {
	const {
		userLongitude,
		userLatitude,
		destinationLatitude,
		destinationLongitude,
	} = useLocationStore();

	const { selectedParkingLot, setParkingLots } = useParkingLotStore();

	const [markers, setMarkers] = useState<MarkerData[]>([]);
	const [refreshKey, setRefreshKey] = useState(0);

	const region = calculateRegion({
		userLongitude,
		userLatitude,
		destinationLatitude,
		destinationLongitude,
	});

	// useEffect(() => {
	// 	console.log("userLocation", { userLatitude, userLongitude });
	// 	if (Array.isArray(parkingLots)) {
	// 		if (!userLatitude || !userLongitude) return;

	// 		const newMarkers = generateMarkersFromData({
	// 			data: parkingLots,
	// 			userLatitude,
	// 			userLongitude,
	// 		});

	// 		setMarkers((prevMarkers) => {
	// 			const isSame =
	// 				JSON.stringify(prevMarkers) === JSON.stringify(newMarkers);
	// 			return isSame ? prevMarkers : newMarkers;
	// 		});
	// 	}
	// }, [userLatitude, userLongitude]);

	useEffect(() => {
		if (userLatitude == null || userLongitude == null) return;

		const newMarkers = generateMarkersFromData({
			data: parkingLots,
			userLatitude,
			userLongitude,
		});

		setMarkers(newMarkers);
		setRefreshKey((prevKey) => prevKey + 1);
	}, [userLatitude, userLongitude]);

	if (!userLatitude || !userLongitude) {
		return <Text>LOADING...</Text>;
	}

	return (
		<MapView
			key={refreshKey}
			provider={PROVIDER_DEFAULT}
			style={{ width: "100%", height: "100%", borderRadius: 16 }}
			tintColor="#000000"
			mapType="mutedStandard"
			showsPointsOfInterest={false}
			userInterfaceStyle="light"
			showsUserLocation={true}
			initialRegion={region}
		>
			{markers?.map((marker) => (
				<Marker
					key={marker.id}
					coordinate={{
						latitude: marker.latitude,
						longitude: marker.longitude,
					}}
					tracksViewChanges={true}
					style={{
						width: 25,
						height: 25,
					}}
					title={marker.title}
				>
					<View
						style={{
							width: 25,
							height: 25,
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Image
							source={
								selectedParkingLot === marker.id
									? selectedMarkerIcon
									: markerIcon
							}
							style={{ width: 25, height: 25 }}
							resizeMode="contain"
						/>
					</View>
				</Marker>
			))}
		</MapView>
	);
};

export default Map;
