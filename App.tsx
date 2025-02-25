import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Appearance, LogBox, StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "./src/Redux/store";
import Routing from "./src/Routes";
import Splash from "./src/Screens/Splash";
import COLORS from "./src/Utilities/Colors";

LogBox.ignoreAllLogs();

const App = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    Appearance.setColorScheme("light");

    const timeout = setTimeout(() => {
      setIsReady(true);
    }, 1200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <Provider store={store}>
        <SafeAreaProvider>
          <StatusBar
            backgroundColor={isReady ? COLORS.White : COLORS.Red[500]}
            barStyle={isReady ? "dark-content" : "light-content"}
          />
          <NavigationContainer>
            {isReady ? <Routing /> : <Splash />}
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    </>
  );
};

export default App;
