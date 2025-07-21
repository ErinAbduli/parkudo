import { LocationStore, MarkerData, ParkingLotStore } from "@/types/type";
import { create } from "zustand";

export const useLocationStore = create<LocationStore>((set) => ({
	userAddress: null,
	userLongitude: null,
	userLatitude: null,
	destinationLatitude: null,
	destinationLongitude: null,
	destinationAddress: null,
	setUserLocation: ({
		latitude,
		longitude,
		address,
	}: {
		latitude: number;
		longitude: number;
		address: string;
	}) => {
		set(() => ({
			userLatitude: latitude,
			userLongitude: longitude,
			userAddress: address,
		}));
	},
	setDestinationLocation: ({
		latitude,
		longitude,
		address,
	}: {
		latitude: number;
		longitude: number;
		address: string;
	}) => {
		set(() => ({
			destinationLatitude: latitude,
			destinationLongitude: longitude,
			destinationAddress: address,
		}));
	},
}));

export const useParkingLotStore = create<ParkingLotStore>((set) => ({
	parkingLots: [] as MarkerData[],
	selectedParkingLot: null,
	setSelectedParkingLot: (parkingLotId: number) =>
		set(() => ({ selectedParkingLot: parkingLotId })),
	setParkingLots: (parkingLots: MarkerData[]) =>
		set(() => ({ parkingLots: parkingLots })),
	clearSelectedParkingLot: () => set(() => ({ selectedParkingLot: null })),
}));
