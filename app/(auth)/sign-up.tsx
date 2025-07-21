import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { fetchAPI } from "@/lib/fetch";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import ReactNativeModal from "react-native-modal";
import checkIcon from "../../assets/icons/check.png";
import emailIcon from "../../assets/icons/email.png";
import passwordIcon from "../../assets/icons/lock.png";
import personIcon from "../../assets/icons/person.png";
import signup from "../../assets/images/signup.png";
const SignUp = () => {
	const [form, setForm] = useState({
		name: "",
		email: "",
		password: "",
	});

	const [showSuccessModal, setShowSuccessModal] = useState(false);

	const [verification, setVerification] = useState({
		state: "default",
		error: "",
		code: "",
	});

	const { isLoaded, signUp, setActive } = useSignUp();

	const onSignUpPress = async () => {
		if (!isLoaded) return;

		// Start sign-up process using email and password provided
		try {
			await signUp.create({
				emailAddress: form.email,
				password: form.password,
			});

			// Send user an email with verification code
			await signUp.prepareEmailAddressVerification({
				strategy: "email_code",
			});

			// Set 'pendingVerification' to true to display second form
			// and capture OTP code
			setVerification({
				...verification,
				state: "pending",
			});
		} catch (err: any) {
			// See https://clerk.com/docs/custom-flows/error-handling
			// for more info on error handling
			Alert.alert(
				"Error",
				err.errors[0].longMessage || "An error occurred during sign-up."
			);
		}
	};

	const onVerifyPress = async () => {
		if (!isLoaded) return;

		try {
			// Use the code the user provided to attempt verification
			const signUpAttempt = await signUp.attemptEmailAddressVerification({
				code: verification.code,
			});

			// If verification was completed, set the session to active
			// and redirect the user
			if (signUpAttempt.status === "complete") {
				await fetchAPI("/(api)/user", {
					method: "POST",
					body: JSON.stringify({
						name: form.name,
						email: form.email,
						clerkId: signUpAttempt.createdSessionId,
					}),
					headers: {
						"Content-Type": "application/json",
					},
				});

				await setActive({ session: signUpAttempt.createdSessionId });
				setVerification({
					...verification,
					state: "success",
				});
			} else {
				// If the status is not complete, check why. User may need to
				// complete further steps.
				setVerification({
					...verification,
					state: "failed",
					error: "Verification failed. Please try again.",
				});
			}
		} catch (err: any) {
			// See https://clerk.com/docs/custom-flows/error-handling
			// for more info on error handling
			setVerification({
				...verification,
				state: "failed",
				error:
					err.errors[0].longMessage_ ||
					"An error occurred during verification.",
			});
		}
	};

	return (
		<ScrollView className="flex-1 bg-white">
			<View className="flex-1 bg-white">
				<View className="relative w-full h-[250px]">
					<Image source={signup} className="z-0 w-full h-[250px]" />
					<Text className="text-2xl text-black font-InterSemiBold absolute bottom-5 left-5">
						Create Your Account
					</Text>
				</View>
				<View className="p-5">
					<InputField
						label="Name"
						placeholder="Enter your name"
						icon={personIcon}
						value={form.name}
						onChangeText={(text) =>
							setForm((prev) => ({ ...prev, name: text }))
						}
					/>
					<InputField
						label="Email"
						placeholder="Enter your email"
						icon={emailIcon}
						value={form.email}
						onChangeText={(text) =>
							setForm((prev) => ({ ...prev, email: text }))
						}
					/>
					<InputField
						label="Password"
						placeholder="Enter your password"
						icon={passwordIcon}
						value={form.password}
						secureTextEntry={true}
						onChangeText={(text) =>
							setForm((prev) => ({ ...prev, password: text }))
						}
					/>

					<CustomButton
						title="Sign Up"
						onPress={onSignUpPress}
						className="mt-6"
					/>

					<OAuth />

					<Link
						href={"/sign-in"}
						className="text-lg text-center text-general-200 mt-10"
					>
						<Text className="text-neutral-400">
							Already have an account?{" "}
						</Text>
						<Text className="text-primary-500 font-InterSemiBold">
							Login
						</Text>
					</Link>
				</View>

				<ReactNativeModal
					isVisible={verification.state === "pending"}
					onModalHide={() => {
						if (verification.state === "success")
							setShowSuccessModal(true);
					}}
				>
					<View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
						<Text className="text-2xl font-InterExtraBold mb-2">
							Verificaiton!
						</Text>
						<Text className="font-Inter mb-5">
							We&apos;ve sent a verification code to {form?.email}
							.
						</Text>

						<InputField
							label="Code"
							icon={passwordIcon}
							placeholder="12345"
							value={verification.code}
							keyboardType="numeric"
							onChangeText={(code) =>
								setVerification((prev) => ({
									...prev,
									code,
								}))
							}
						/>

						{verification.error && (
							<Text className="text-red-500 text-sm mt-1">
								{verification.error}
							</Text>
						)}

						<CustomButton
							title="Verify Email"
							onPress={onVerifyPress}
							className="mt-5 bg-success-500"
						/>
					</View>
				</ReactNativeModal>

				<ReactNativeModal isVisible={showSuccessModal}>
					<View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
						<Image
							source={checkIcon}
							className="bg-green-500 rounded-full w-[90px] h-[90px] mx-auto my-5"
						/>
						<Text className="text-3xl text-black font-InterBold text-center">
							Verified!
						</Text>
						<Text className="text-base text-gray-400 font-Inter text-center mt2">
							Your account has been successfully created and
							verified.
						</Text>

						<CustomButton
							title="Continue"
							onPress={() => {
								setShowSuccessModal(false);
								router.replace("/(root)/(tabs)/home");
							}}
							className="mt-6"
						/>
					</View>
				</ReactNativeModal>
			</View>
		</ScrollView>
	);
};

export default SignUp;
