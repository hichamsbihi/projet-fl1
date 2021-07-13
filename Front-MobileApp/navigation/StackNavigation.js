import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../Screens/WelcomeScreen";
import EquipementScreen from "../Screens/EquipementScreen";
import CorrectifScreen from "../Screens/CorrectifScreen";
import PreventifScreen from "../Screens/PreventifScreen";
import EtatStockScreen from "../Screens/EtatStockScreen";
import DocumentationScreen from "../Screens/DocumentationScreen";
import MesureScreen from "../Screens/MesureScreen";
import SchemaScreen from "../Screens/SchemaScreen";
import QsseScreen from "../Screens/QsseScreen";
import CommentaireScreen from "../Screens/CommentaireScreen";
import FiabilisationsScreen from "../Screens/FiabilisationsScreen";
import { NavigationContainer } from "@react-navigation/native";

const StackNavigator = () => {
  const Stack = createStackNavigator();
  const MyTheme = {
    colors: {
      background: "#e3a3ce",
    },
  };
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        initialRouteName="WelcomeScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="EquipementScreen" component={EquipementScreen} />
        <Stack.Screen name="EtatStockScreen" component={EtatStockScreen} />
        <Stack.Screen name="CorrectifScreen" component={CorrectifScreen} />
        <Stack.Screen name="PreventifScreen" component={PreventifScreen} />

        <Stack.Screen
          name="DocumentationScreen"
          component={DocumentationScreen}
        />
        <Stack.Screen name="MesureScreen" component={MesureScreen} />
        <Stack.Screen name="SchemaScreen" component={SchemaScreen} />
        <Stack.Screen name="QsseScreen" component={QsseScreen} />
        <Stack.Screen name="CommentaireScreen" component={CommentaireScreen} />
        <Stack.Screen name="FiabilisationsScreen" component={FiabilisationsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
