import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Login from "../Screens/Login";
import OnBoarding from "../Screens/OnBoarding";
import OnBoardingPlans from "../Screens/OnBoardingPlans";
import SignUp from "../Screens/SignUp";
import Welcome from "../Screens/Welcome";
import {
  AuthStackParams,
  BottomTabParams,
  MainStackParams,
  RootStackParams,
} from "../Typings/route";

const RootStack = createNativeStackNavigator<RootStackParams>();
const Auth = createNativeStackNavigator<AuthStackParams>();
const Main = createNativeStackNavigator<MainStackParams>();
const Tabs = createBottomTabNavigator<BottomTabParams>();

const Routing = () => {
  function AuthStack() {
    return (
      <Auth.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Auth.Screen name="welcome" component={Welcome} />
        <Auth.Screen name="onBoarding" component={OnBoarding} />
        <Auth.Screen name="onBoardingPlans" component={OnBoardingPlans} />
        <Auth.Screen name="signUp" component={SignUp} />
        <Auth.Screen name="logIn" component={Login} />
      </Auth.Navigator>
    );
  }

  //   function TabStack() {
  //     return (
  //       <Tabs.Navigator
  //         screenOptions={{
  //           headerShown: false,
  //         }}
  //         tabBar={(props) => <BottomTabBar {...props} />}
  //       >
  //         <Tabs.Screen
  //           options={{
  //             title: "Dashboard",
  //           }}
  //           name="dashboard"
  //           component={Home}
  //         />
  //         <Tabs.Screen
  //           options={{
  //             title: "Aggrement",
  //           }}
  //           name="aggrement"
  //           component={Dating}
  //         />
  //         <Tabs.Screen
  //           options={{
  //             title: "Invite Friends",
  //           }}
  //           name="inviteFriends"
  //           component={Events}
  //         />
  //         <Tabs.Screen
  //           options={{
  //             title: "Progress",
  //           }}
  //           name="progress"
  //           component={Messages}
  //         />
  //         <Tabs.Screen
  //           options={{
  //             title: "Messenger",
  //           }}
  //           name="messenger"
  //           component={Profile}
  //         />
  //       </Tabs.Navigator>
  //     );
  //   }

  //   function MainStack() {
  //     return (
  //       <Main.Navigator
  //         screenOptions={{
  //           headerShown: false,
  //         }}
  //       >
  //         <Main.Screen name="tabs" component={TabStack} />
  //       </Main.Navigator>
  //     );
  //   }

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStack.Screen name="authStack" component={AuthStack} />
      {/* <RootStack.Screen name="mainStack" component={MainStack} /> */}
    </RootStack.Navigator>
  );
};

export default Routing;
