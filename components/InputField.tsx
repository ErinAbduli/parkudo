import { InputFieldProps } from "@/types/type";
import React from "react";
import {
	Image,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	View,
} from "react-native";

const InputField = ({
	label,
	labelStyle,
	icon,
	secureTextEntry = false,
	containerStyle,
	inputStyle,
	iconStyle,
	className,
	...props
}: InputFieldProps) => {
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
			>
				<View className="my-2 w-full">
					<Text
						className={`text-lg font-InterSemiBold mb-3 ${labelStyle}`}
					>
						{label}
					</Text>
					<View
						className={`flex flex-row justify-start items-center relative bg-neutral-100 rounded-full border border-neutral-100 focus:border-primary-500 ${containerStyle}`}
					>
						{icon && (
							<Image
								source={icon}
								className={`w-6 h-6 ml-4 ${iconStyle}`}
							/>
						)}
						<TextInput
							className={`rounded-full p-4 font-InterSemiBold text-[15px] flex-1 text-left ${inputStyle}`}
							secureTextEntry={secureTextEntry}
							placeholderTextColor={`#9CA3AF`}
							{...props}
						/>
					</View>
				</View>
			</KeyboardAvoidingView>
		</TouchableWithoutFeedback>
	);
};

export default InputField;
