import { DrawerNavigationProp } from "@react-navigation/drawer";
import {
  CompositeNavigationProp,
  NavigatorScreenParams,
  RouteProp,
} from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

export type RootStackParams = {
  authStack: NavigatorScreenParams<AuthStackParams>;
  mainStack: DrawerNavigationProp<MainStackParams>;
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
  porfile: undefined;
  settings: undefined;
  subscriptions: undefined;
  termsANdCondition: undefined;
  privacyPolicy: undefined;
  rateUs: undefined;
  contactUs: undefined;
  notifications: undefined;
  createAgreement: undefined;
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

export type DahboardProps = {
  navigation: CompositeNavigationProp<
    NativeStackNavigationProp<MainStackParams & BottomTabParams, "dashboard">,
    DrawerNavigationProp<BottomTabParams, "dashboard">
  >;
  route: RouteProp<MainStackParams & BottomTabParams, "dashboard">;
};

export type AgreementProps = {
  navigation: CompositeNavigationProp<
    NativeStackNavigationProp<MainStackParams & BottomTabParams, "aggrement">,
    DrawerNavigationProp<BottomTabParams, "aggrement">
  >;
  route: RouteProp<MainStackParams & BottomTabParams, "aggrement">;
};

export type ProgressProps = {
  navigation: CompositeNavigationProp<
    NativeStackNavigationProp<MainStackParams & BottomTabParams, "progress">,
    DrawerNavigationProp<BottomTabParams, "progress">
  >;
  route: RouteProp<MainStackParams & BottomTabParams, "progress">;
};

export type MessengerProps = {
  navigation: CompositeNavigationProp<
    NativeStackNavigationProp<MainStackParams & BottomTabParams, "messenger">,
    DrawerNavigationProp<BottomTabParams, "messenger">
  >;
  route: RouteProp<MainStackParams & BottomTabParams, "messenger">;
};
