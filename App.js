import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import Stacknavigator from "./StackNavigator";
import { LogBox } from "react-native";
LogBox.ignoreAllLogs();
LogBox.ignoreLogs(["timer"]);

import { AuthProvider } from "./hooks/useAuth";


export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Stacknavigator />
      </AuthProvider>
    </NavigationContainer>

  );
}