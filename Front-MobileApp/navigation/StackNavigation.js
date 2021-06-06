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

const Stack = createStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator initialRouteName="WelcomeScreen">
    <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
    <Stack.Screen name="EquipementScreen" component={EquipementScreen} />
    <Stack.Screen name="CorrectifScreen" component={CorrectifScreen} />
    <Stack.Screen name="PreventifScreen" component={PreventifScreen} />
    <Stack.Screen name="EtatStockScreen" component={EtatStockScreen} />
    <Stack.Screen name="DocumentationScreen" component={DocumentationScreen} />
    <Stack.Screen name="MesureScreen" component={MesureScreen} />
    <Stack.Screen name="SchemaScreen" component={SchemaScreen} />
    <Stack.Screen name="QsseScreen" component={QsseScreen} />
    <Stack.Screen name="CommentaireScreen" component={CommentaireScreen} />
  </Stack.Navigator>
);

export default StackNavigator;
