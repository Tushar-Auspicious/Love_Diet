import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Alert,
  Keyboard,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { CountryCode } from "react-native-country-picker-modal";
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
import COLORS from "../../Utilities/Colors";
import {
  horizontalScale,
  isAndroid,
  verticalScale,
} from "../../Utilities/Metrics";
import styles from "./style";

// Type definitions
interface OtpState {
  value: string[];
  inputs: (TextInput | null)[];
}

const Login: FC<LoginScreenProps> = React.memo(({ navigation }) => {
  const insets = useSafeAreaInsets();

  // State management
  const [activeIndex, setActiveIndex] = useState(0);
  const [countryCode, setCountryCode] = useState<CountryCode>("US");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [forgotPasswordNumber, setForgotPasswordNumber] = useState("");
  const [forgotCountryCode, setForgotCountryCode] = useState<CountryCode>("US");
  const [createPassword, setCreatePassword] = useState("");
  const [confirmCreatePassword, setConfirmCreatePassword] = useState("");
  const [otp, setOtp] = useState<OtpState>({
    value: Array(6).fill(""),
    inputs: [],
  });
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const inputs = useRef<(TextInput | null)[]>([]);

  // Memoized handlers
  const handleInputChange = useCallback((value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    setOtp((prev) => {
      const newOtp = [...prev.value];
      newOtp[index] = value;
      if (value && index < 5) {
        inputs.current[index + 1]?.focus();
      }
      return { ...prev, value: newOtp };
    });
  }, []);

  const handleKeyPress = useCallback((event: any, index: number) => {
    if (event.nativeEvent.key === "Backspace") {
      setOtp((prev) => {
        const newOtp = [...prev.value];
        if (!newOtp[index] && index > 0) {
          inputs.current[index - 1]?.focus();
        }
        newOtp[index] = "";
        return { ...prev, value: newOtp };
      });
    }
  }, []);

  const handlePhoneNumberChange = useCallback((text: string) => {
    if (/^\d*$/.test(text)) setPhoneNumber(text);
  }, []);

  const handleContinue = useCallback(() => {
    switch (activeIndex) {
      case 0:
        Alert.alert("In Progress");
        navigation.navigate("mainStack", {
          screen: "tabs",
          params: { screen: "dashboard" },
        });
        break;
      case 3:
        setActiveIndex(0);
        break;
      default:
        setActiveIndex((prev) => prev + 1);
    }
  }, [activeIndex, navigation]);

  const handleBackPress = useCallback(() => {
    activeIndex === 0
      ? navigation.goBack()
      : setActiveIndex((prev) => prev - 1);
  }, [activeIndex, navigation]);

  // Memoized validation
  const isPrimaryButtonDisabled = useMemo(
    () =>
      ({
        0: !phoneNumber.trim() || !password.trim(),
        1: !forgotPasswordNumber.trim(),
        2: otp.value.some((val) => !val.trim()),
        3: !createPassword.trim() || !confirmCreatePassword.trim(),
      }[activeIndex]),
    [
      activeIndex,
      phoneNumber,
      password,
      forgotPasswordNumber,
      otp.value,
      createPassword,
      confirmCreatePassword,
    ]
  );

  // Memoized UI elements
  const headerText = useMemo(
    () =>
      ["Log In", "Forgot Password", "Verify Phone Number", "Create Password"][
        activeIndex
      ],
    [activeIndex]
  );
  const mainButtonText = useMemo(
    () =>
      ["Log In", "Send Link", "Verify Phone Number", "Create Password"][
        activeIndex
      ],
    [activeIndex]
  );

  const renderContent = useMemo(() => {
    const components = [
      <View style={styles.formContainer} key="login">
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
          onSelectCountry={(country) => setCountryCode(country.cca2)}
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
            onPress={() => setActiveIndex(1)}
            variant="mSemiBold"
            color={COLORS.Red[500]}
          >
            Forgot Password
          </CustomText>
        </TouchableOpacity>
      </View>,
      <View style={styles.formContainer} key="forgot">
        <CustomInput
          value={forgotPasswordNumber}
          label="Phone Number"
          placeholder="Enter phone number"
          onChangeText={(text) =>
            /^\d*$/.test(text) && setForgotPasswordNumber(text)
          }
          keyboardType="numeric"
          style={styles.phoneInput}
          backgroundColor="transparent"
          type="country"
          countryCode={forgotCountryCode}
          onSelectCountry={(country) => setForgotCountryCode(country.cca2)}
        />
        <CustomText variant="sRegular" color={COLORS.Gray[500]}>
          A link to reset your password will be sent to your phone number
        </CustomText>
      </View>,
      <View style={styles.formContainer} key="verify">
        <View style={styles.otpContainer}>
          {otp.value.map((digit, index) => (
            <CustomInput
              key={index}
              ref={(ref) => (inputs.current[index] = ref)}
              style={[
                styles.input,
                focusedIndex === index && styles.focusedInput,
              ]}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(value) => handleInputChange(value, index)}
              onKeyPress={(event) => handleKeyPress(event, index)}
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
      </View>,
      <View style={styles.formContainer} key="create">
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
      </View>,
    ];
    return components[activeIndex];
  }, [
    activeIndex,
    phoneNumber,
    password,
    forgotPasswordNumber,
    forgotCountryCode,
    otp.value,
    createPassword,
    confirmCreatePassword,
    countryCode,
    focusedIndex,
    handlePhoneNumberChange,
    handleInputChange,
    handleKeyPress,
  ]);

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true)
    );
    const hideSub = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false)
    );
    return () => {
      showSub.remove();
      hideSub.remove();
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
        <View style={{ flex: 1, paddingHorizontal: horizontalScale(16) }}>
          <View style={{ gap: verticalScale(20), flex: 1 }}>
            <View style={styles.headerContainer}>
              <View style={styles.backButton}>
                <CustomIcon
                  onPress={handleBackPress}
                  Icon={ICONS.RedbackArrow}
                />
              </View>
              <CustomText variant="xlSemiBold">{headerText}</CustomText>
            </View>
            {renderContent}
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              title={mainButtonText}
              onPress={handleContinue}
              isFullWidth
              disabled={isPrimaryButtonDisabled}
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
        </View>
      </SafeAreaView>
    </KeyboardAvoidingContainer>
  );
});

export default Login;
