import outIcon from "@/assets/icons/out.png";
import searchIcon from "@/assets/icons/search.png";
import noResultImage from "@/assets/images/no-result.png";
import GoogleTextInput from "@/components/GoogleTextInput";
import Map from "@/components/Map";
import RideCard from "@/components/RideCard";
import { useLocationStore } from "@/store";
import { useUser } from "@clerk/clerk-expo";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	Image,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const recentParkingHistory = [
	{
		booking_id: "1",
		location_address: "Kathmandu City Parking, Nepal",
		latitude: "27.717245",
		longitude: "85.323961",
		start_time: "2024-08-12T08:00:00",
		end_time: "2024-08-12T11:00:00",
		duration_minutes: 180,
		total_price: "900.00",
		payment_status: "paid",
		user_id: "1",
		created_at: "2024-08-12T05:19:20.620007",
		parking_lot: {
			lot_id: "P1",
			name: "Kathmandu City Parking",
			image_url: "https://ucarecdn.com/parking-lot-1.jpg",
			total_slots: 50,
			slot_number: "B12",
			manager: {
				manager_id: "2",
				name: "David Brown",
				contact_number: "+977-9812345678",
				rating: "4.6",
			},
		},
	},
	{
		booking_id: "2",
		location_address: "PMC Parking, Pune, India",
		latitude: "18.520430",
		longitude: "73.856744",
		start_time: "2024-08-10T17:30:00",
		end_time: "2024-08-10T20:30:00",
		duration_minutes: 180,
		total_price: "300.00",
		payment_status: "paid",
		user_id: "1",
		created_at: "2024-08-10T16:50:17.683046",
		parking_lot: {
			lot_id: "P2",
			name: "PMC Parking Lot",
			image_url: "https://ucarecdn.com/parking-lot-2.jpg",
			total_slots: 100,
			slot_number: "D22",
			manager: {
				manager_id: "1",
				name: "James Wilson",
				contact_number: "+91-9988776655",
				rating: "4.8",
			},
		},
	},
	{
		booking_id: "3",
		location_address: "Zagreb Center Parking",
		latitude: "45.815011",
		longitude: "15.981919",
		start_time: "2024-08-05T09:00:00",
		end_time: "2024-08-05T12:00:00",
		duration_minutes: 180,
		total_price: "240.00",
		payment_status: "paid",
		user_id: "1",
		created_at: "2024-08-05T08:30:01.809053",
		parking_lot: {
			lot_id: "P3",
			name: "Zagreb Center Lot",
			image_url: "https://ucarecdn.com/parking-lot-3.jpg",
			total_slots: 75,
			slot_number: "C7",
			manager: {
				manager_id: "1",
				name: "James Wilson",
				contact_number: "+385-912345678",
				rating: "4.8",
			},
		},
	},
	{
		booking_id: "4",
		location_address: "Osaka Station Parking",
		latitude: "34.693725",
		longitude: "135.502254",
		start_time: "2024-08-03T13:00:00",
		end_time: "2024-08-03T14:30:00",
		duration_minutes: 90,
		total_price: "180.00",
		payment_status: "paid",
		user_id: "1",
		created_at: "2024-08-03T12:20:54.297838",
		parking_lot: {
			lot_id: "P4",
			name: "Osaka Station Lot",
			image_url: "https://ucarecdn.com/parking-lot-4.jpg",
			total_slots: 60,
			slot_number: "A3",
			manager: {
				manager_id: "3",
				name: "Michael Johnson",
				contact_number: "+81-9012345678",
				rating: "4.7",
			},
		},
	},
];

export default function Home() {
	const { setUserLocation, setDestinationLocation } = useLocationStore();
	const { user } = useUser();
	const loading = false;

	const [hasPermission, setHasPermission] = useState(false);

	const handleSignOut = () => {};

	const handleDestinationPress = () => {
		// Handle destination press logic here
	};

	useEffect(() => {
		const requestLocationPermission = async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setHasPermission(false);
				return;
			}

			let location = await Location.getCurrentPositionAsync({});

			const address = await Location.reverseGeocodeAsync({
				latitude: location.coords?.latitude,
				longitude: location.coords?.longitude,
			});

			setUserLocation({
				latitude: location.coords?.latitude,
				longitude: location.coords?.longitude,
				address: `${address[0].name}, ${address[0].region}`,
			});
		};
		requestLocationPermission();
	}, [setUserLocation]);

	return (
		<SafeAreaView className="bg-general-500">
			<FlatList
				data={recentParkingHistory?.slice(0, 5)}
				renderItem={({ item }) => <RideCard parkingHistory={item} />}
				className="px-5"
				keyboardShouldPersistTaps="handled"
				contentContainerStyle={{
					paddingBottom: 70,
				}}
				ListEmptyComponent={() => (
					<View className="flex flex-col items-center justify-center">
						{!loading ? (
							<>
								<Image
									source={noResultImage}
									className="w-40 h-40"
									alt="No results found image"
									resizeMode="contain"
								/>
								<Text className="text-sm">
									No recent rides found!
								</Text>
							</>
						) : (
							<ActivityIndicator size="small" color="#000" />
						)}
					</View>
				)}
				ListHeaderComponent={() => (
					<>
						<View className="flex flex-row items-center justify-between my-5">
							<Text className="text-2xl font-InterExtraBold capitalize">
								Welcome,{" "}
								{user?.firstName ||
									user?.emailAddresses[0]?.emailAddress.split(
										"@"
									)[0]}
								!
							</Text>
							<TouchableOpacity
								onPress={handleSignOut}
								className="justify-center items-center w-10 h-10"
							>
								<Image source={outIcon} className="h-5 w-5" />
							</TouchableOpacity>
						</View>
						<GoogleTextInput
							icon={searchIcon}
							containerStyle="bg-white shadow-md shadown-neutral-300"
							handlePress={handleDestinationPress}
						/>
						<>
							<Text className="text-xl font-InterBold mt-5 mb-3">
								Your Current Location
							</Text>
							<View className="flex flex-row items-center bg-transparent h-[300px]">
								<Map />
							</View>
						</>
						<Text className="text-xl font-InterBold mt-5 mb-3">
							Recent Parking History
						</Text>
					</>
				)}
			/>
		</SafeAreaView>
	);
}
