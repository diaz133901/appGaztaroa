import React, { Component } from "react";
import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, StyleSheet, Image, Text } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Icon } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import {
  fetchExcursiones,
  fetchComentarios,
  fetchCabeceras,
  fetchActividades,
} from "../redux/ActionCreators";
import Home from "./HomeComponent";
import Calendario from "./CalendarioComponent";
import DetalleExcursion from "./DetalleExcursionComponent";
import Contacto from "./ContactoComponent";
import QuienSomos from "./QuienesSomosComponent";
import Fotos from "./Fotos";
import { colorGaztaroaClaro, colorGaztaroaOscuro } from "../comun/comun";

const mapStateToProps = (state) => {
  return {
    excursiones: state.excursiones,
    comentarios: state.comentarios,
    cabeceras: state.cabeceras,
    actividades: state.actividades,
  };
};
const mapDispatchToProps = (dispatch) => ({
  fetchExcursiones: () => dispatch(fetchExcursiones()),
  fetchComentarios: () => dispatch(fetchComentarios()),
  fetchCabeceras: () => dispatch(fetchCabeceras()),
  fetchActividades: () => dispatch(fetchActividades()),
});

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <SafeAreaView
        style={styles.container}
        forceInset={{ top: "always", horizontal: "never" }}
      >
        <View style={styles.drawerHeader}>
          <View style={{ flex: 1 }}>
            <Image
              source={require("./imagenes/logo.png")}
              style={styles.drawerImage}
            />
          </View>
          <View style={{ flex: 2 }}>
            <Text style={styles.drawerHeaderText}> Gaztaroa</Text>
          </View>
        </View>
        <DrawerItemList {...props} />
      </SafeAreaView>
    </DrawerContentScrollView>
  );
}

function CalendarioStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="CalendarioMain"
      screenOptions={{
        headerTintColor: "#fff",
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <Stack.Screen
        name="Calendar"
        component={Calendario}
        options={{
          title: "Calendario Gaztaroa",
          headerLeft: () => (
            <Icon
              name="menu"
              size={28}
              color="white"
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            />
          ),
        }}
      />
      <Stack.Screen
        name="DetalleExcursion"
        component={DetalleExcursion}
        options={({ route }) => ({
          title: "Detalle Excursión",
        })}
      />
    </Stack.Navigator>
  );
}

function FotosStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="FotosMain"
      screenOptions={{
        headerTintColor: "#fff",
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: "#fff" },
        headerLeft: () => (
          <Icon
            name="menu"
            size={28}
            color="white"
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          />
        ),
      }}
    >
      <Stack.Screen
        name="FotosMain"
        component={Fotos}
        options={{
          title: "Fotos",
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: colorGaztaroaClaro,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeStack}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon name="home" type="font-awesome" size={24} color={tintColor} />
          ),
        }}
      />
      <Drawer.Screen
        name="Calendario"
        component={CalendarioStack}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon
              name="calendar"
              type="font-awesome"
              size={24}
              color={tintColor}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Contacto"
        component={ContactoStack}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon
              name="address-card"
              type="font-awesome"
              size={24}
              color={tintColor}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Quiénes somos"
        component={QuienSomosStack}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon
              name="info-circle"
              type="font-awesome"
              size={24}
              color={tintColor}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Fotos"
        component={FotosStack}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon
              name="camera"
              type="font-awesome"
              size={24}
              color={tintColor}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
function ContactoStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="ContactoMain"
      screenOptions={{
        headerTintColor: "#fff",
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: "#fff" },
        headerLeft: () => (
          <Icon
            name="menu"
            size={28}
            color="white"
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          />
        ),
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

function QuienSomosStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="QuienSomosMain"
      screenOptions={{
        headerTintColor: "#fff",
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: "#fff" },
        headerLeft: () => (
          <Icon
            name="menu"
            size={28}
            color="white"
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          />
        ),
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

function HomeStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="HomeMain"
      screenOptions={{
        headerTintColor: "#fff",
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: "#fff" },
        headerLeft: () => (
          <Icon
            name="menu"
            size={28}
            color="white"
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          />
        ),
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

class Campobase extends Component {
  componentDidMount() {
    this.props.fetchExcursiones();
    this.props.fetchComentarios();
    this.props.fetchCabeceras();
    this.props.fetchActividades();
  }

  render() {
    return (
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: colorGaztaroaOscuro,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  drawerHeaderText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Campobase);
