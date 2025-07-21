import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, View } from "react-native";
import chatIcon from "../../../assets/icons/chat.png";
import homeIcon from "../../../assets/icons/home.png";
import listIcon from "../../../assets/icons/list.png";
import profileIcon from "../../../assets/icons/profile.png";

const TabIcon = ({
	focused,
	source,
}: {
	source: ImageSourcePropType;
	focused: boolean;
}) => {
	return (
		<View
			className={`rounded-full items-center justify-center`}
			style={{ width: 48, height: 48 }}
		>
			<Image
				source={source}
				style={{
					width: focused ? 32 : 28,
					height: focused ? 32 : 28,
					tintColor: "black",
				}}
				resizeMode="contain"
			/>
		</View>
	);
};

const Layout = () => {
	return (
		<Tabs
			initialRouteName="home"
			screenOptions={{
				tabBarActiveTintColor: "white",
				tabBarInactiveTintColor: "white",
				tabBarShowLabel: true,
				tabBarStyle: {
					backgroundColor: "#fff",
					paddingBottom: 45,
					overflow: "hidden",
					height: 80,
					justifyContent: "space-between",
					alignItems: "center",
					flexDirection: "row",
					position: "absolute",
				},
			}}
		>
			<Tabs.Screen
				name="home"
				options={{
					title: "Home",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon focused={focused} source={homeIcon} />
					),
				}}
			/>
			<Tabs.Screen
				name="history"
				options={{
					title: "Parking History",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon focused={focused} source={listIcon} />
					),
				}}
			/>
			<Tabs.Screen
				name="chat"
				options={{
					title: "Chat",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon focused={focused} source={chatIcon} />
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon focused={focused} source={profileIcon} />
					),
				}}
			/>
		</Tabs>
	);
};

export default Layout;
