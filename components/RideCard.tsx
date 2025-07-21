import dollarIcon from "@/assets/icons/dollar-svgrepo-com (1).png";
import toIcon from "@/assets/icons/to.png";
import { formatDate } from "@/lib/utils";
import { ParkingHistory } from "@/types/type";
import React from "react";
import { Image, Text, View } from "react-native";

const RideCard = ({
	parkingHistory: {
		parking_lot,
		latitude,
		longitude,
		location_address,
		duration_minutes,
		total_price,
		created_at,
		payment_status,
	},
}: {
	parkingHistory: ParkingHistory;
}) => {
	return (
		<View className="flex flex-row items-center bg-white rounded-lg shadow-sm shadow-neutral-300 mb-3">
			<View className="flex flex-col items-center justify-center p-3">
				<View className="flex flex-row items-center justify-between">
					<Image
						source={{
							uri: `https://maps.geoapify.com/v1/staticmap?style=klokantech-basic&width=600&height=400&center=lonlat:${longitude},${latitude}&zoom=14&apiKey=39fc6f1b2dd84387bd444885e674c349`,
						}}
						className="w-[80px] h-[90px] rounded-lg"
					/>
					<View className="flex flex-col mx-5 gap-y-5 flex-1">
						<View className="flex flex-row items-center gap-x-2">
							<Image source={toIcon} className="h-5 w-5" />
							<Text
								className="text-md font-InterMedium"
								numberOfLines={1}
							>
								{location_address}
							</Text>
						</View>
						<View className="flex flex-row items-center gap-x-2">
							<Image
								source={dollarIcon}
								className="h-[19px] w-[19px]"
							/>
							<Text
								className="text-md font-InterMedium"
								numberOfLines={1}
							>
								${total_price}
							</Text>
						</View>
					</View>
				</View>
				<View className="flex flex-col w-full mt-5 bg-general-500 rounded-lg p-3 items-start justify-center">
					<View className="flex flex-row items-center w-full justify-between mb-5">
						<Text className="text-md font-InterMedium text-gray-500">
							Date
						</Text>
						<Text className="text-md font-InterMedium text-gray-500">
							{formatDate(created_at)}
						</Text>
					</View>
					<View className="flex flex-row items-center w-full justify-between mb-5">
						<Text className="text-md font-InterMedium text-gray-500">
							Parking Lot
						</Text>
						<Text className="text-md font-InterMedium text-gray-500">
							{parking_lot?.name}
						</Text>
					</View>
					<View className="flex flex-row items-center w-full justify-between mb-5">
						<Text className="text-md font-InterMedium text-gray-500">
							Total Slots
						</Text>
						<Text className="text-md font-InterMedium text-gray-500">
							{parking_lot?.total_slots}
						</Text>
					</View>
					<View className="flex flex-row items-center w-full justify-between mb-5">
						<Text className="text-md font-InterMedium text-gray-500">
							Payment Status
						</Text>
						<Text
							className={`capitalize text-md font-InterMedium text-gray-500 ${payment_status === "paid" ? "text-green-500" : "text-red-500"}`}
						>
							{payment_status}
						</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

export default RideCard;
