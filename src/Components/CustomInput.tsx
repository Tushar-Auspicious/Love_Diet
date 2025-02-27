import dayjs from "dayjs";
import React, { forwardRef, useState } from "react";
import {
  Image,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";
import DatePicker from "react-native-date-picker";
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from "react-native-image-picker";
import ICONS from "../Assets/Icons";
import COLORS from "../Utilities/Colors";
import {
  horizontalScale,
  responsiveFontSize,
  verticalScale,
} from "../Utilities/Metrics";
import CustomIcon from "./CustomIcon";
import { CustomText } from "./CustomText";

type CustomInputProps = TextInputProps & {
  placeholder?: string;
  type?:
    | "text"
    | "password"
    | "search"
    | "textArea"
    | "date"
    | "time"
    | "country"
    | "profile";
  isBackArrow?: boolean;
  onChangeText: (text: string) => void;
  value: string;
  style?: object;
  isFilterIcon?: boolean;
  onFilterPress?: () => void;
  onBackPress?: () => void;
  label?: string;
  height?: number;
  backgroundColor?: string;
  inputStyle?: StyleProp<TextStyle>;
  baseStyle?: StyleProp<ViewStyle>;
  onSelectCountry?: (country: Country) => void;
  countryCode?: CountryCode;
  labelTextColor?: string;
  onPressMain?: () => void;
};

const CustomInput = forwardRef<TextInput, CustomInputProps>(
  (
    {
      placeholder,
      isBackArrow = false,
      onChangeText,
      value,
      style,
      type = "text",
      label,
      isFilterIcon = false,
      onFilterPress,
      onBackPress,
      height = type === "textArea" ? 120 : 56,
      backgroundColor = COLORS.White,
      inputStyle,
      baseStyle,
      onSelectCountry,
      countryCode,
      labelTextColor = COLORS.Gray[800],
      onPressMain,
      ...rest
    },
    ref
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false); // State to toggle password visibility

    // Country Picker Modal
    const [visible, setVisible] = useState(false);

    // Toggle password visibility
    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    // Date Picker
    const [isPickerVisible, setPickerVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    // Handle date selection
    const handleConfirm = (date: Date) => {
      setPickerVisible(false);
      setSelectedDate(date);
      if (type === "date") {
        const formattedDate = dayjs(date).format(" MMM DD, YYYY");
        onChangeText(formattedDate);
      } else if (type === "time") {
        const formattedTime = dayjs(date).format("hh:mm A");
        onChangeText(formattedTime);
      }
    };

    const handleCancel = () => {
      setPickerVisible(false);
    };

    const onCloseCountryPicker = () => {
      setVisible(false);
    };

    const openImagePicker = () => {
      const options: ImageLibraryOptions = {
        mediaType: "photo",
        maxWidth: 500,
        maxHeight: 500,
        quality: 0.8,
      };

      launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.errorMessage) {
          console.log("ImagePicker Error: ", response.errorMessage);
        } else {
          // Assuming you want to store the selected image URI in state
          if (response.assets && response.assets.length > 0) {
            onChangeText(response.assets[0].uri!); // Save image URI
          }
        }
      });
    };

    const removeImage = () => {
      onChangeText("");
    };

    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          if (type === "date") {
            setPickerVisible(true);
          } else {
            if (onPressMain) {
              onPressMain();
            } else {
              return null;
            }
          }
        }}
        style={[
          style,
          {
            gap: verticalScale(10),
          },
        ]}
      >
        {label && (
          <CustomText variant="mRegular" color={labelTextColor}>
            {label}
          </CustomText>
        )}
        {type === "profile" ? (
          value.length > 0 ? (
            <View style={{ flexDirection: "row", gap: horizontalScale(10) }}>
              <Image
                source={{ uri: value }}
                style={{
                  height: 80,
                  width: 80,
                  resizeMode: "cover",
                  borderRadius: 100,
                }}
              />
              <TouchableOpacity
                onPress={removeImage}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: horizontalScale(10),
                  marginVertical: verticalScale(10),
                }}
              >
                <CustomIcon Icon={ICONS.RedDeleteIcon} />
                <CustomText variant="mSemiBold" color={COLORS.Red[500]}>
                  Remove Your Photo
                </CustomText>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={openImagePicker}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: horizontalScale(10),
                marginVertical: verticalScale(10),
              }}
            >
              <CustomIcon Icon={ICONS.RedUploadIcon} />
              <CustomText variant="mSemiBold" color={COLORS.Red[500]}>
                Upload Your Photo
              </CustomText>
            </TouchableOpacity>
          )
        ) : (
          <View
            style={[
              styles.container, // Base container style
              {
                backgroundColor,
              },
              (type === "search" || isBackArrow) && {
                gap: horizontalScale(10),
              }, // Add gap for search type
              baseStyle,
            ]}
          >
            {type === "country" && countryCode ? (
              <View style={styles.textInput}>
                <CountryPicker
                  visible={visible}
                  onSelect={(country) => {
                    onSelectCountry!(country);
                    setVisible(false);
                  }}
                  onClose={onCloseCountryPicker}
                  theme={{
                    onBackgroundTextColor: COLORS.Gray[800],
                    backgroundColor: COLORS.White,
                  }}
                  withCallingCode={true}
                  withCallingCodeButton
                  withFlagButton={true}
                  withFilter
                  countryCode={countryCode}
                />
                <TextInput
                  ref={ref}
                  style={[
                    styles.input,
                    inputStyle,
                    {
                      height: height,
                    },
                  ]} // Input field style
                  placeholder={placeholder} // Placeholder text
                  placeholderTextColor={COLORS.Gray[500]} // Placeholder text color
                  onChangeText={onChangeText} // Handle text change
                  value={value} // Display current value
                  {...rest}
                />
              </View>
            ) : (
              <>
                {type === "search" && (
                  <CustomIcon
                    onPress={onBackPress}
                    Icon={ICONS.SearchIcon}
                    height={24}
                    width={24}
                  />
                )}
                <TextInput
                  ref={ref}
                  style={[
                    styles.input,
                    inputStyle,
                    {
                      height: height,
                    },
                  ]} // Input field style
                  placeholder={placeholder} // Placeholder text
                  placeholderTextColor={COLORS.Gray[500]} // Placeholder text color
                  secureTextEntry={type === "password" && !isPasswordVisible} // Hide input text for password type if visibility is off
                  onChangeText={onChangeText} // Handle text change
                  value={value} // Display current value
                  editable={type !== "date" && type !== "time"}
                  onPress={() => {
                    type === "time" && setPickerVisible(!isPickerVisible);
                    type === "date" && setPickerVisible(!isPickerVisible);
                  }}
                  {...rest}
                />
              </>
            )}
            {/* Main input field */}

            {/* Toggle password visibility for password type */}
            {/* {type === "password" && (
            <TouchableOpacity
              style={styles.iconContainer} // Style for the icon container
              onPress={togglePasswordVisibility} // Toggle visibility on icon press
            >
              <CustomIcon
                Icon={isPasswordVisible ? ICONS.Apple : ICONS.EyeIcon}
                height={20}
                width={20}
              />
            </TouchableOpacity>
          )} */}

            {(type === "date" || type === "time") && (
              <>
                <View>
                  <CustomIcon
                    Icon={
                      isPickerVisible ? ICONS.UpArrowIcon : ICONS.DownArrowIcon
                    }
                    height={20}
                    width={20}
                  />
                </View>
                <DatePicker
                  modal
                  open={isPickerVisible}
                  date={selectedDate || new Date()}
                  mode={type}
                  onConfirm={handleConfirm}
                  onCancel={handleCancel}
                />
              </>
            )}
          </View>
        )}
      </TouchableOpacity>
    );
  }
);

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: horizontalScale(15),
    borderWidth: 1,
    borderColor: COLORS.Gray[200],
  },
  input: {
    flex: 1,
    fontSize: responsiveFontSize(14),
    color: COLORS.Gray[800],
  },
  iconContainer: {
    marginLeft: 10,
  },
  textInput: {
    backgroundColor: COLORS.White,
    borderRadius: 12,
    borderColor: COLORS.Gray[200],
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(10),
  },
});
