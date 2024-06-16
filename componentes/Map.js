import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Dimensions,
  StyleSheet,
  View,
  Text,
  Linking,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";

const MapComponent = ({ secondLocation }) => {
  const initialLocation = {
    latitude: 0,
    longitude: 0,
  };

  const [myLocation, setMyLocation] = useState(initialLocation);
  const [region, setRegion] = useState({
    latitude: initialLocation.latitude,
    longitude: initialLocation.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const mapRef = useRef(null);

  useEffect(() => {
    _getLocation();
  }, []);

  const _getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.warn("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setMyLocation(location.coords);
    } catch (err) {
      console.warn(err);
    }
  };

  const focusOnLocation = () => {
    if (myLocation.latitude && myLocation.longitude) {
      const newRegion = {
        latitude: parseFloat(myLocation.latitude),
        longitude: parseFloat(myLocation.longitude),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      if (mapRef.current) {
        mapRef.current.animateToRegion(newRegion, 1000);
      }
    }
  };

  const handleOpenGoogleMaps = () => {
    const { latitude: lat1, longitude: lng1 } = myLocation;
    const { latitude: lat2, longitude: lng2 } = secondLocation;

    const url = `https://www.google.com/maps/dir/?api=1&origin=${lat1},${lng1}&destination=${lat2},${lng2}`;

    Linking.openURL(url)
      .then(() => {
        console.log("Opened Google Maps");
      })
      .catch((err) => {
        console.error("Error opening Google Maps:", err);
      });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        ref={mapRef}
        provider="google"
      >
        {myLocation.latitude !== 0 && myLocation.longitude !== 0 && (
          <Marker
            coordinate={{
              latitude: myLocation.latitude,
              longitude: myLocation.longitude,
            }}
          ></Marker>
        )}

        <Marker
          coordinate={{
            latitude: secondLocation.latitude,
            longitude: secondLocation.longitude,
          }}
        ></Marker>
        {myLocation.latitude !== 0 &&
          myLocation.longitude !== 0 &&
          secondLocation.latitude !== 0 &&
          secondLocation.longitude !== 0 && (
            <Polyline
              coordinates={[
                {
                  latitude: myLocation.latitude,
                  longitude: myLocation.longitude,
                },
                {
                  latitude: secondLocation.latitude,
                  longitude: secondLocation.longitude,
                },
              ]}
              strokeColor="#000"
              strokeWidth={3}
            />
          )}
      </MapView>
      <View style={styles.buttonContainer}>
        <Button title="Encuentra tu ubicación" onPress={focusOnLocation} />
        <Button title="Abrir en Google Maps" onPress={handleOpenGoogleMaps} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: Dimensions.get("window").height,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
  },
});

export default MapComponent;
