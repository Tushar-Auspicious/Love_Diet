import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import BottomTabBar from "../Components/BottomTabBar";
import SideDrawer from "../Components/SideDrawer/SideDrawer";
import Agreement from "../Screens/Agreement";
import Dashboard from "../Screens/Dahsboard";
import Login from "../Screens/Login";
import Messenger from "../Screens/Messenger";
import OnBoarding from "../Screens/OnBoarding";
import OnBoardingPlans from "../Screens/OnBoardingPlans";
import Progress from "../Screens/Progress";
import SignUp from "../Screens/SignUp";
import Welcome from "../Screens/Welcome";
import {
  AuthStackParams,
  BottomTabParams,
  MainStackParams,
  RootStackParams,
} from "../Typings/route";
import { wp } from "../Utilities/Metrics";
import CreateAgreement from "../Screens/CreateAgreement";

const RootStack = createNativeStackNavigator<RootStackParams>();
const Auth = createNativeStackNavigator<AuthStackParams>();
const Tabs = createBottomTabNavigator<BottomTabParams>();
const Drawer = createDrawerNavigator<MainStackParams>(); // Create Drawer Navigator

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

  function TabStack() {
    return (
      <Tabs.Navigator
        screenOptions={{
          headerShown: false,
        }}
        tabBar={(props) => <BottomTabBar {...props} />}
      >
        <Tabs.Screen
          options={{
            title: "Dashboard",
          }}
          name="dashboard"
          component={Dashboard}
        />
        <Tabs.Screen
          options={{
            title: "Aggrement",
          }}
          name="aggrement"
          component={Agreement}
        />
        <Tabs.Screen
          options={{
            title: "Progress",
          }}
          name="progress"
          component={Progress}
        />
        <Tabs.Screen
          options={{
            title: "Messenger",
          }}
          name="messenger"
          component={Messenger}
        />
      </Tabs.Navigator>
    );
  }

  function DrawerStack() {
    return (
      <Drawer.Navigator
        drawerContent={(props) => <SideDrawer {...props} />}
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            width: wp(100),
          },
          drawerType: "slide",
        }}
      >
        <Drawer.Screen name="tabs" component={TabStack} />
        <Drawer.Screen name="createAgreement" component={CreateAgreement} />
      </Drawer.Navigator>
    );
  }

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStack.Screen name="mainStack" component={DrawerStack} />
      <RootStack.Screen name="authStack" component={AuthStack} />
    </RootStack.Navigator>
  );
};

export default Routing;
