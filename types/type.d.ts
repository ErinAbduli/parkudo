import { TextInputProps, TouchableOpacityProps } from "react-native";

declare interface ParkingLot {
	parking_lot_id: number;
	parking_lot_name: string;
	profile_image_url: string;
	parking_lot_image_url: string;
	latOffset: number | null;
	lngOffset: number | null;
	parking_lot_slots: number;
	rating: number;
}

declare interface MarkerData {
	latitude: number;
	longitude: number;
	id: number;
	title: string;
	profile_image_url: string;
	parking_lot_image_url: string;
	parking_lot_slots: number;
	rating: number;
	first_name: string;
	last_name: string;
	time?: number;
	price?: string;
}

declare interface MapProps {
	destinationLatitude?: number;
	destinationLongitude?: number;
	onDriverTimesCalculated?: (driversWithTimes: MarkerData[]) => void;
	selectedDriver?: number | null;
	onMapReady?: () => void;
}

declare interface ParkingHistory {
	booking_id: string;
	location_address: string;
	latitude: string;
	longitude: string;
	start_time: string;
	end_time: string;
	duration_minutes: string;
	total_price: string;
	payment_status: string;
	user_id: string;
	created_at: string;
	parking_lot: {
		lot_id: string;
		name: string;
		image_url: string;
		total_slots: string;
		slot_number: string;
		manager: {
			manager_id: string;
			name: string;
			contact_number: string;
			rating: string;
		};
	};
}

declare interface ButtonProps extends TouchableOpacityProps {
	title: string;
	bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
	textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
	IconLeft?: React.ComponentType<any>;
	IconRight?: React.ComponentType<any>;
	className?: string;
}

declare interface GoogleInputProps {
	icon?: string;
	initialLocation?: string;
	containerStyle?: string;
	textInputBackgroundColor?: string;
	handlePress: ({
		latitude,
		longitude,
		address,
	}: {
		latitude: number;
		longitude: number;
		address: string;
	}) => void;
}

declare interface InputFieldProps extends TextInputProps {
	label: string;
	icon?: any;
	secureTextEntry?: boolean;
	labelStyle?: string;
	containerStyle?: string;
	inputStyle?: string;
	iconStyle?: string;
	className?: string;
}

declare interface PaymentProps {
	fullName: string;
	email: string;
	amount: string;
	driverId: number;
	rideTime: number;
}

declare interface LocationStore {
	userLatitude: number | null;
	userLongitude: number | null;
	userAddress: string | null;
	destinationLatitude: number | null;
	destinationLongitude: number | null;
	destinationAddress: string | null;
	setUserLocation: ({
		latitude,
		longitude,
		address,
	}: {
		latitude: number;
		longitude: number;
		address: string;
	}) => void;
	setDestinationLocation: ({
		latitude,
		longitude,
		address,
	}: {
		latitude: number;
		longitude: number;
		address: string;
	}) => void;
}

declare interface ParkingLotStore {
	parkingLots: MarkerData[];
	selectedParkingLot: number | null;
	setSelectedParkingLot: (parkingLotId: number) => void;
	setParkingLots: (parkingLots: MarkerData[]) => void;
	clearSelectedParkingLot: () => void;
}

declare interface DriverCardProps {
	item: MarkerData;
	selected: number;
	setSelected: () => void;
}
