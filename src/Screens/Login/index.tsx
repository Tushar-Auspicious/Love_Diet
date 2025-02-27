import React, {
  FC,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Alert,
  BackHandler,
  Keyboard,
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
import { LoginScreenProps } from "../../Typings/route";
import { RBSheetRef } from "../../Typings/type";
import COLORS from "../../Utilities/Colors";
import {
  horizontalScale,
  hp,
  isAndroid,
  responsiveFontSize,
  verticalScale,
} from "../../Utilities/Metrics";

const Login: FC<LoginScreenProps> = ({ navigation }) => {
  const refRBSheet = useRef<RBSheetRef>(null);
  const insets = useSafeAreaInsets();

  const [activeIndex, setActiveIndex] = useState(0);

  const [countryCode, setCountryCode] = useState<CountryCode>("US");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const [forgotPasswordNumber, setForgotPasswordNumber] = useState("");
  const [forgotCountryCode, setForgotCountryCode] = useState<CountryCode>("US");

  const [createPassword, setCreatePassword] = useState("");
  const [confirmCreatePassword, setConfirmCreatePassword] = useState("");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef<(TextInput | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

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
    if (/^\d*$/.test(text)) {
      setPhoneNumber(text);
    }
  };

  const handleContinue = () => {
    if (activeIndex === 0) {
      Alert.alert("In Progress");
      navigation.navigate("mainStack", {
        screen: "tabs",
        params: {
          screen: "dashboard",
        },
      });
    }
    if (activeIndex === 1) {
      setActiveIndex(activeIndex + 1);
    }
    if (activeIndex === 2) {
      setActiveIndex(activeIndex + 1);
    }
    if (activeIndex === 3) {
      setActiveIndex(0);
    }
  };

  const handlePressForgotPassword = () => {
    setActiveIndex(activeIndex + 1);
  };

  const handleBackPress = () => {
    if (activeIndex === 0) {
      navigation.goBack();
    } else {
      setActiveIndex(activeIndex - 1);
    }
  };

  const isPrmaryButtonDisabled = () => {
    if (activeIndex === 0) {
      return !phoneNumber.trim() || !password.trim();
    }
    if (activeIndex === 1) {
      return !forgotPasswordNumber.trim();
    }
    if (activeIndex === 2) {
      return otp.some((val) => !val.trim());
    }
    if (activeIndex === 3) {
      return !createPassword.trim() || !confirmCreatePassword.trim();
    } else {
      return false;
    }
  };

  const renderHeaderText = useMemo(() => {
    if (activeIndex === 0) {
      return "Log In";
    }
    if (activeIndex === 1) {
      return "Forgot Password";
    }
    if (activeIndex === 2) {
      return "Verify Phone Number";
    }
    if (activeIndex === 3) {
      return "Create Password";
    }
  }, [activeIndex]);

  const renderMainButtonText = useMemo(() => {
    if (activeIndex === 0) {
      return "Log In";
    }
    if (activeIndex === 1) {
      return "Send Link";
    }
    if (activeIndex === 2) {
      return "Verify Phone Number";
    } else {
      return "Create Password";
    }
  }, [activeIndex]);

  const renderLoginUI = () => {
    return (
      <View style={styles.formContainer}>
        <CustomInput
          value={phoneNumber}
          label="Phone Number"
          placeholder="Enter phone number"
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
        <CustomInput
          value={password}
          label="Password"
          placeholder="Enter your password"
          type="password"
          onChangeText={setPassword}
          style={styles.phoneInput}
          backgroundColor="transparent"
        />
        <TouchableOpacity style={{ alignSelf: "flex-end" }}>
          <CustomText
            onPress={handlePressForgotPassword}
            variant="mSemiBold"
            color={COLORS.Red[500]}
          >
            Forgot Password
          </CustomText>
        </TouchableOpacity>
      </View>
    );
  };

  const renderForgotPasswordUI = () => {
    return (
      <View style={styles.formContainer}>
        <CustomInput
          value={forgotPasswordNumber}
          label="Phone Number"
          placeholder="Enter phone number"
          onChangeText={(text) => {
            if (/^\d*$/.test(text)) {
              setForgotPasswordNumber(text);
            }
          }}
          keyboardType="numeric"
          style={styles.phoneInput}
          backgroundColor="transparent"
          type="country"
          countryCode={forgotCountryCode}
          onSelectCountry={(country) => {
            setForgotCountryCode(country.cca2);
          }}
        />
        <CustomText variant="sRegular" color={COLORS.Gray[500]}>
          A link to reset your password will be sent to your phone number
        </CustomText>
      </View>
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

  useLayoutEffect(() => {
    refRBSheet.current?.open();
  }, [activeIndex, navigation]);

  useEffect(() => {
    // Handle Android Back Button
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
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
          { paddingBottom: verticalScale(10) + insets.bottom },
        ]}
      >
        <RBSheet
          ref={refRBSheet}
          useNativeDriver={false}
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
          closeOnPressBack={true}
          onClose={() => navigation.goBack()}
        >
          <View style={{ gap: verticalScale(20) }}>
            <View style={styles.headerContainer}>
              <View style={styles.backButton}>
                <CustomIcon
                  onPress={handleBackPress}
                  Icon={ICONS.RedbackArrow}
                />
              </View>
              <CustomText variant="xlSemiBold">{renderHeaderText}</CustomText>
            </View>

            {activeIndex === 0 && renderLoginUI()}
            {activeIndex === 1 && renderForgotPasswordUI()}
            {activeIndex === 2 && renderVerifyPhoneNumber()}
            {activeIndex === 3 && rnederCreatePasswordUI()}
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              title={renderMainButtonText}
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

export default Login;

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
    paddingTop: verticalScale(10),
    height: hp(90),
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    justifyContent: "space-between",
  },
  headerContainer: {
    paddingVertical: verticalScale(10),
    width: "100%",
    gap: verticalScale(20),
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    left: 0,
  },
  formContainer: {
    gap: verticalScale(10),
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
});
