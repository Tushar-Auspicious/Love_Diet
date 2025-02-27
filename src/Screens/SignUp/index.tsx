import React, {
  FC,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  BackHandler,
  FlatList,
  Keyboard,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { CountryCode } from "react-native-country-picker-modal";
import RBSheet from "react-native-raw-bottom-sheet";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import ICONS from "../../Assets/Icons";
import CustomIcon from "../../Components/CustomIcon";
import CustomInput from "../../Components/CustomInput";
import { CustomText } from "../../Components/CustomText";
import { KeyboardAvoidingContainer } from "../../Components/KeyboardAvoidingComponent";
import PrimaryButton from "../../Components/PrimaryButton";
import countryData from "../../Seeds/CountryData";
import { SignUpScreenProps } from "../../Typings/route";
import { RBSheetRef } from "../../Typings/type";
import COLORS from "../../Utilities/Colors";
import {
  horizontalScale,
  hp,
  isAndroid,
  responsiveFontSize,
  verticalScale,
} from "../../Utilities/Metrics";

const genderOptions = ["Male", "Female", "Other"]; // Gender options

const SignUp: FC<SignUpScreenProps> = ({ navigation }) => {
  const refRBSheet = useRef<RBSheetRef>(null);

  const insets = useSafeAreaInsets();
  const totalSteps = 4;

  const [activeIndex, setActiveIndex] = useState(1);

  const [countryCode, setCountryCode] = useState<CountryCode>("US");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [createPassword, setCreatePassword] = useState("");
  const [confirmCreatePassword, setConfirmCreatePassword] = useState("");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef<(TextInput | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const [profilePicture, setProfilePicture] = useState("");
  const [name, setName] = useState("");
  const [surName, setSurName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState<string>(""); // New state for gender

  const [isCountryModal, setIsCountryModal] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState(countryData);

  const [country, setCountry] = useState("");
  const [searchedCountry, setSearchedCountry] = useState("");

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const handleInputChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return; // Allow only digits (0-9) or empty values

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputs.current[index + 1]?.focus(); // Move focus to the next input
    }
  };

  const handleKeyPress = (event: any, index: number) => {
    if (event.nativeEvent.key === "Backspace") {
      const newOtp = [...otp];

      if (!newOtp[index] && index > 0) {
        inputs.current[index - 1]?.focus(); // Move focus to the previous input if empty
      }

      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const handlePhoneNumberChange = (text: string) => {
    // Allow only numeric values
    if (/^\d*$/.test(text)) {
      setPhoneNumber(text);
    }
  };

  const handleContinue = () => {
    if (activeIndex < totalSteps) {
      setActiveIndex(activeIndex + 1);
    } else {
      if (isCountryModal) {
        setIsCountryModal(false);
      } else {
        navigation.replace("logIn");
      }
    }
  };

  const handleBackPress = () => {
    if (activeIndex === 1) {
      navigation.goBack();
    } else {
      if (activeIndex === totalSteps && isCountryModal) {
        setIsCountryModal(false);
      } else {
        setActiveIndex(activeIndex - 1);
      }
    }
  };

  const renderHeaderText = useMemo(() => {
    if (activeIndex === 1) {
      return {
        title: "Add Phone Number",
        subTitle: "Enter your phone number to start using LoveDiet",
      };
    }
    if (activeIndex === 2) {
      return {
        title: "Verify Phone Number",
        subTitle: "Enter your phone number to start using LoveDiet",
      };
    }
    if (activeIndex === 3) {
      return {
        title: "Create Password",
        subTitle: "Create a password to protect your LoveDiet account",
      };
    }
    if (activeIndex === 4) {
      return {
        title: "Add Your Info",
        subTitle: "Enter your info to start using LoveDiet",
      };
    }
  }, [activeIndex]);

  const renderAddPhoneNumberUI = () => {
    return (
      <View style={styles.formContainer}>
        <CustomInput
          value={phoneNumber}
          label="Phone Number"
          placeholder="(00) 000 00 00"
          onChangeText={handlePhoneNumberChange}
          keyboardType="numeric"
          style={styles.phoneInput}
          backgroundColor="transparent"
          type="country"
          countryCode={countryCode}
          onSelectCountry={(country) => {
            setCountryCode(country.cca2);
          }}
        />
      </View>
    );
  };

  const renderAddYourProfileUI = () => {
    return (
      <ScrollView
        contentContainerStyle={{
          gap: verticalScale(20),
        }}
      >
        <CustomInput
          value={profilePicture}
          label="Your Photo"
          type="profile"
          onChangeText={setProfilePicture}
          style={styles.phoneInput}
          backgroundColor="transparent"
        />
        <CustomInput
          value={name}
          label="Name"
          placeholder="Enter your name"
          onChangeText={setName}
          style={styles.phoneInput}
          backgroundColor="transparent"
        />
        <CustomInput
          value={surName}
          label="Surname"
          placeholder="Enter your surname"
          onChangeText={setSurName}
          style={styles.phoneInput}
          backgroundColor="transparent"
        />
        <CustomInput
          value={email}
          label="Email"
          placeholder="Enter your email"
          onChangeText={setEmail}
          style={styles.phoneInput}
          backgroundColor="transparent"
        />
        <CustomInput
          value={confirmEmail}
          label="Confirm Email"
          placeholder="Enter your email"
          onChangeText={setConfirmEmail}
          style={styles.phoneInput}
          backgroundColor="transparent"
        />
        <CustomInput
          value={birthDate}
          label="Date of Birth"
          placeholder="Select date of birth"
          type="date"
          onChangeText={setBirthDate}
          style={styles.phoneInput}
          backgroundColor="transparent"
        />

        <CustomInput
          value={gender}
          label="Gender"
          placeholder="Select your gender"
          onChangeText={setGender}
          style={styles.phoneInput}
          backgroundColor="transparent"
          editable={false}
        />
        <CustomInput
          value={country}
          label="Country"
          placeholder="Select country"
          onChangeText={handlePhoneNumberChange}
          keyboardType="numeric"
          style={styles.phoneInput}
          backgroundColor="transparent"
          editable={false}
          onPressMain={() => {
            setIsCountryModal(true);
          }}
        />
        {/* </TouchableOpacity> */}
      </ScrollView>
    );
  };

  const renderVerifyPhoneNumber = () => {
    return (
      <View style={styles.formContainer}>
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <CustomInput
              key={index}
              ref={(ref: TextInput | null) => (inputs.current[index] = ref)}
              style={[
                styles.input,
                focusedIndex === index && styles.focusedInput, // Apply border color when focused
              ]}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(value) => handleInputChange(value, index)}
              onKeyPress={(event: any) => handleKeyPress(event, index)}
              autoFocus={index === 0}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(null)}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.resendcode}>
          <CustomText variant="xsSemiBold" color={COLORS.Red[500]}>
            Resend Code
          </CustomText>
        </TouchableOpacity>
      </View>
    );
  };

  const rnederCreatePasswordUI = () => {
    return (
      <View style={styles.formContainer}>
        <CustomInput
          value={createPassword}
          label="Password"
          placeholder="Enter your password"
          onChangeText={setCreatePassword}
          style={styles.phoneInput}
          type="password"
          backgroundColor="transparent"
        />
        <CustomInput
          value={confirmCreatePassword}
          label="Confirm Password"
          placeholder="Enter your password"
          onChangeText={setConfirmCreatePassword}
          style={styles.phoneInput}
          type="password"
          backgroundColor="transparent"
        />
      </View>
    );
  };

  const renderCountrySearch = () => {
    return (
      <View style={styles.countrySearchContainer}>
        <CustomInput
          value={searchedCountry}
          type="search"
          placeholder="Search by title"
          onChangeText={(text) => {
            setSearchedCountry(text);
            const filtered = countryData.filter((country) =>
              country.name.common.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredCountries(filtered);
          }}
          style={styles.phoneInput}
          backgroundColor="transparent"
        />
        <FlatList
          data={filteredCountries}
          contentContainerStyle={styles.countryListContent}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.countryItem,
                {
                  borderWidth: 1,
                  borderColor:
                    country === item.name.common
                      ? COLORS.Red[500]
                      : "transparent",
                },
              ]}
              onPress={() => {
                setCountry(item.name.common);
              }}
            >
              <CustomText>{item.flag}</CustomText>
              <CustomText variant="xsRegular" color={COLORS.Gray[500]}>
                {item.name.common}
              </CustomText>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.name.common}
        />
      </View>
    );
  };

  const isPrmaryButtonDisabled = () => {
    if (activeIndex === 1) {
      return !phoneNumber.trim();
    }
    if (activeIndex === 2) {
      return otp.some((val) => !val.trim());
    }
    if (activeIndex === 3) {
      return !createPassword.trim() || !confirmCreatePassword.trim();
    }
    if (activeIndex === 4) {
      if (isCountryModal) {
        return !country.trim();
      } else {
        return (
          !profilePicture ||
          !name.trim() ||
          !surName.trim() ||
          !email.trim() ||
          !confirmEmail.trim() ||
          !birthDate.trim() ||
          // !gender.trim() ||
          !country.trim()
        );
      }
    } else {
      return false;
    }
  };

  useLayoutEffect(() => {
    refRBSheet.current?.open();
  }, [activeIndex, navigation]);

  useEffect(() => {
    // Handle Android Back Button
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        console.log("ssss");

        if (activeIndex === 0) {
          navigation.goBack();
        } else {
          setActiveIndex((prevIndex) => prevIndex - 1);
        }
        return true; // Prevent default behavior
      }
    );

    return () => backHandler.remove(); // Cleanup on unmount
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingContainer>
      <SafeAreaView
        style={[
          styles.container,
          {
            paddingBottom: verticalScale(10) + insets.bottom,
          },
        ]}
      >
        <RBSheet
          key={1}
          ref={refRBSheet}
          useNativeDriver={false}
          onClose={() => navigation.goBack()}
          customStyles={{
            wrapper: styles.rbSheetWrapper,
            draggableIcon: styles.rbSheetDraggableIcon,
            container: [
              styles.rbSheetContainer,
              {
                paddingTop: isKeyboardVisible
                  ? isAndroid
                    ? verticalScale(30) + insets.top
                    : verticalScale(10)
                  : verticalScale(10),
                paddingBottom: insets.bottom + verticalScale(10),
                gap: verticalScale(20),
              },
            ],
          }}
          customModalProps={{
            animationType: "slide",
            statusBarTranslucent: true,
          }}
          customAvoidingViewProps={{
            enabled: false,
          }}
        >
          <View style={{ gap: verticalScale(20) }}>
            {!isCountryModal && (
              <View style={styles.headerContainer}>
                <CustomIcon
                  onPress={handleBackPress}
                  Icon={ICONS.RedbackArrow}
                />
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    alignItems: "center",
                    gap: horizontalScale(10),
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      height: 8,
                      backgroundColor: COLORS.Gray[100],
                      borderRadius: 20,
                    }}
                  >
                    <View
                      style={{
                        width: `${(activeIndex / totalSteps) * 100}%`, // Dynamic width
                        height: 8,
                        backgroundColor: COLORS.Red[500],
                        borderRadius: 20,
                      }}
                    />
                  </View>
                  <CustomText variant="mMedium">{`${activeIndex}/${totalSteps}`}</CustomText>
                </View>
              </View>
            )}

            <View style={{ alignItems: "center" }}>
              <CustomText variant="xlSemiBold" style={{ textAlign: "center" }}>
                {isCountryModal ? "Select Country" : renderHeaderText?.title}
              </CustomText>
              {!isCountryModal && (
                <CustomText
                  variant="sRegular"
                  color={COLORS.Gray[500]}
                  style={{ textAlign: "center", width: "80%" }}
                >
                  {renderHeaderText?.subTitle}
                </CustomText>
              )}
            </View>
          </View>
          {activeIndex === 1 && renderAddPhoneNumberUI()}
          {activeIndex === 2 && renderVerifyPhoneNumber()}
          {activeIndex === 3 && rnederCreatePasswordUI()}
          {isCountryModal
            ? renderCountrySearch()
            : activeIndex === 4 && renderAddYourProfileUI()}
          <View style={styles.buttonContainer}>
            <PrimaryButton
              title="Continue"
              onPress={handleContinue}
              isFullWidth
              disabled={isPrmaryButtonDisabled()}
            />
            <PrimaryButton
              title="Back"
              onPress={handleBackPress}
              isFullWidth
              backgroundColor={COLORS.White}
              textColor={COLORS.Red[500]}
              style={styles.secondaryButton}
            />
          </View>
        </RBSheet>
      </SafeAreaView>
    </KeyboardAvoidingContainer>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
    justifyContent: "center",
  },
  rbSheetWrapper: {
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  rbSheetDraggableIcon: {},
  rbSheetContainer: {
    paddingHorizontal: horizontalScale(16),
    height: hp(90),
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    justifyContent: "space-between",
  },
  headerContainer: {
    flexDirection: "row",
    paddingVertical: verticalScale(10),
    width: "100%",
    gap: verticalScale(20),
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    position: "absolute",
    left: 0,
  },
  formContainer: {
    gap: verticalScale(10),
    flex: 1,
  },
  phoneInput: {
    width: "100%",
  },
  buttonContainer: {},
  secondaryButton: {
    borderColor: COLORS.Red[500],
    borderWidth: 1,
  },

  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: horizontalScale(10),
    marginVertical: verticalScale(10),
  },
  input: {
    flex: 1,
    fontSize: responsiveFontSize(16),
    textAlign: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.Gray[300],
  },
  focusedInput: {
    borderColor: COLORS.Red[300], // Change this to your preferred focus color
    borderWidth: 2,
  },
  resendcode: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  countrySearchContainer: {
    flex: 1,
    gap: verticalScale(10),
  },
  countryList: {
    flex: 1,
  },
  countryListContent: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
    rowGap: verticalScale(8),
  },
  countryItem: {
    flexDirection: "row",
    gap: horizontalScale(10),
    alignItems: "center",
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
    borderRadius: 10,
  },
});
