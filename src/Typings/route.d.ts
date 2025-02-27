import { NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParams = {
  authStack: NavigatorScreenParams<AuthStackParams>;
  mainStack: NavigatorScreenParams<MainStackParams>;
};

export type AuthStackParams = {
  welcome: undefined;
  onBoarding: undefined;
  onBoardingPlans: undefined;
  logIn: undefined;
  forgotPassword: undefined;
  verifyPhoneNumber: undefined;
  createPassword: undefined;
  signUp: undefined;
};

export type MainStackParams = {
  tabs: NavigatorScreenParams<BottomTabParams>;
};

export type BottomTabParams = {
  dashboard: undefined;
  aggrement: undefined;
  inviteFriends: undefined;
  progress: undefined;
  messenger: undefined;
};

export type WelcomeScreenProps = NativeStackScreenProps<
  AuthStackParams & RootStackParams,
  "welcome"
>;

export type OnBoardingScreenProps = NativeStackScreenProps<
  AuthStackParams & RootStackParams,
  "onBoarding"
>;

export type OnBoardingPlansScreenProps = NativeStackScreenProps<
  AuthStackParams & RootStackParams,
  "onBoardingPlans"
>;
export type LoginScreenProps = NativeStackScreenProps<
  AuthStackParams & RootStackParams & BottomTabParams,
  "logIn"
>;
export type SignUpScreenProps = NativeStackScreenProps<
  AuthStackParams & RootStackParams,
  "signUp"
>;
