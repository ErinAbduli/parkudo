import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import "react-native-reanimated";

import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";

export default function RootLayout() {
	const [loaded] = useFonts({
		"Inter-Bold": require("../assets/fonts/Inter-Bold.otf"),
		"Inter-Medium": require("../assets/fonts/Inter-Medium.otf"),
		"Inter-Regular": require("../assets/fonts/Inter-Regular.otf"),
		"Inter-SemiBold": require("../assets/fonts/Inter-SemiBold.otf"),
		"Inter-ExtraBold": require("../assets/fonts/Inter-ExtraBold.otf"),
		"Inter-ExtraLight": require("../assets/fonts/Inter-ExtraLight-BETA.otf"),
		"Inter-Light": require("../assets/fonts/Inter-Light-BETA.otf"),
	});

	if (!loaded) {
		// Async font loading only occurs in development.
		return null;
	}

	return (
		<ClerkProvider
			tokenCache={tokenCache}
			publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
		>
			<Stack>
				<Stack.Screen name="index" options={{ headerShown: false }} />
				<Stack.Screen name="(root)" options={{ headerShown: false }} />
				<Stack.Screen name="(auth)" options={{ headerShown: false }} />
				<Stack.Screen name="+not-found" />
			</Stack>
		</ClerkProvider>
	);
}
