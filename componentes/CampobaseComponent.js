import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./HomeComponent";
import Calendario from "./CalendarioComponent";
import DetalleExcursion from "./DetalleExcursionComponent";
import Contacto from "./ContactoComponent";
import QuienSomos from "./QuienesSomosComponent";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function CalendarioStack() {
  return (
    <Stack.Navigator
      initialRouteName="CalendarioMain"
      screenOptions={{
        headerTintColor: "#fff",
        headerStyle: { backgroundColor: "#015afc" },
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <Stack.Screen
        name="Calendar"
        component={Calendario}
        options={{
          title: "Calendario Gaztaroa",
        }}
      />
      <Stack.Screen
        name="DetalleExcursion"
        component={DetalleExcursion}
        options={{
          title: "Detalle Excursión",
        }}
      />
    </Stack.Navigator>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="HomeStack"
        component={HomeStack}
        options={{ title: "Home" }}
      />
      <Drawer.Screen
        name="CalendarioStack"
        component={CalendarioStack}
        options={{ title: "Calendario" }}
      />
      <Drawer.Screen
        name="ContactoStack"
        component={ContactoStack}
        options={{ title: "Contacto" }}
      />
      <Drawer.Screen
        name="QuienSomosStack"
        component={QuienSomosStack}
        options={{ title: "Quiénes somos" }}
      />
    </Drawer.Navigator>
  );
}

function ContactoStack() {
  return (
    <Stack.Navigator
      initialRouteName="ContactoMain"
      screenOptions={{
        headerTintColor: "#fff",
        headerStyle: { backgroundColor: "#015afc" },
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <Stack.Screen
        name="ContactoMain"
        component={Contacto}
        options={{
          title: "Contacto",
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}

function QuienSomosStack() {
  return (
    <Stack.Navigator
      initialRouteName="QuienSomosMain"
      screenOptions={{
        headerTintColor: "#fff",
        headerStyle: { backgroundColor: "#015afc" },
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <Stack.Screen
        name="QuienSomosMain"
        component={QuienSomos}
        options={{
          title: "Quiénes somos",
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="HomeMain"
      screenOptions={{
        headerTintColor: "#fff",
        headerStyle: { backgroundColor: "#015afc" },
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <Stack.Screen
        name="HomeMain"
        component={Home}
        options={{
          title: "Campo Base",
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}

function Campobase() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}

export default Campobase;
