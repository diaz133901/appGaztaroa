import React, { useState, useEffect } from "react";
import { View, Button, StyleSheet } from "react-native";
import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAuth, getAuth, signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getReactNativePersistence } from "firebase/auth";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/configureStore";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Campobase from "./componentes/CampobaseComponent";
import { StatusBar } from "expo-status-bar";
import AuthComponent from "./componentes/AuthComponent";
import { firebaseConfig } from "./comun/firebase";

let app;
let auth;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} else {
  app = getApp();
  auth = getAuth(app);
}

const store = ConfigureStore();

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <View style={styles.container}>
          {user ? (
            <>
              <Campobase />
              <StatusBar style="auto" />
              <Button title="Cerrar Sesión" onPress={handleSignOut} />
            </>
          ) : (
            <AuthComponent auth={auth} setUser={setUser} />
          )}
        </View>
      </SafeAreaProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
