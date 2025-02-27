import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useMemo, useState } from "react";
import { Appearance, LogBox, StatusBar, StatusBarStyle } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "./src/Redux/store";
import Routing from "./src/Routes";
import Splash from "./src/Screens/Splash";
import COLORS from "./src/Utilities/Colors";

LogBox.ignoreAllLogs();

const App = () => {
  const [isReady, setIsReady] = useState(false);
  const [currentRoute, setCurrentRoute] = useState<string | null>(null);

  useEffect(() => {
    Appearance.setColorScheme("light");

    const timeout = setTimeout(() => {
      setIsReady(true);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  // Function to get the current route name from navigation state
  const getCurrentRouteName = (state: any): string | null => {
    if (!state) return null;

    const route = state.routes[state.index];
    if (route.state) {
      // If the route has nested navigators, recurse into the nested state
      return getCurrentRouteName(route.state);
    }
    return route.name;
  };

  // Handler for navigation state changes
  const handleNavigationStateChange = (state: any) => {
    const routeName = getCurrentRouteName(state);
    setCurrentRoute(routeName);
  };

  const statusBarColor = useMemo((): {
    bgColor: string;
    content: StatusBarStyle;
  } => {
    if (currentRoute === "onBoardingPlans") {
      return {
        bgColor: COLORS.Red[500],
        content: "light-content",
      };
    } else {
      return {
        bgColor: COLORS.White,
        content: "dark-content",
      };
    }
  }, [currentRoute]);

  return (
    <>
      <Provider store={store}>
        <SafeAreaProvider>
          <StatusBar
            backgroundColor={isReady ? statusBarColor.bgColor : COLORS.Red[500]}
            barStyle={isReady ? statusBarColor.content : "light-content"}
          />
          <NavigationContainer onStateChange={handleNavigationStateChange}>
            {isReady ? <Routing /> : <Splash />}
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    </>
  );
};

export default App;
