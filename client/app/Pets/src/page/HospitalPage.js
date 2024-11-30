import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  Linking,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { ApiPaths } from "../services/ApiPaths";
import { GOOGLE_MAPS_API_KEY } from "@env";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const HospitalPage = () => {
  const [hospitals, setHospitals] = useState([]);
  const [region, setRegion] = useState({
    latitude: 24.1757202,
    longitude: 120.6477006,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    const fetchCurrentLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location access is required.");
        return;
      }

      try {
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
          enableHighAccuracy: true,
        });

        setCurrentLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        setRegion((prevRegion) => ({
          ...prevRegion,
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }));
      } catch (error) {
        Alert.alert("Error", "Unable to fetch current location.");
        console.error("Error fetching location:", error);
      }
    };

    const fetchHospitals = async () => {
      try {
        const response = await fetch(ApiPaths.getAllHospitalsAddress);
        const data = await response.json();

        const geocodedData = await Promise.all(
          data.map(async (hospital) => {
            const coordinates = await geocodeAddress(hospital.address); // Hàm geocode
            return { ...hospital, coordinates };
          })
        );

        setHospitals(geocodedData);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    };

    fetchCurrentLocation();
    fetchHospitals();
  }, []);

  const geocodeAddress = async (address) => {
    try {
      const API_KEY = GOOGLE_MAPS_API_KEY;

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${API_KEY}`
      );

      const data = await response.json();

      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        return { latitude: lat, longitude: lng };
      }
    } catch (error) {
      console.error("Error geocoding address:", error);
    }
    return null;
  };

  const zoomIn = () => {
    setRegion((prevRegion) => ({
      ...prevRegion,
      latitudeDelta: prevRegion.latitudeDelta / 2,
      longitudeDelta: prevRegion.longitudeDelta / 2,
    }));
  };

  const zoomOut = () => {
    setRegion((prevRegion) => ({
      ...prevRegion,
      latitudeDelta: prevRegion.latitudeDelta * 2,
      longitudeDelta: prevRegion.longitudeDelta * 2,
    }));
  };

  // Hàm mở Google Maps
  const openGoogleMaps = (latitude, longitude) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    Linking.openURL(url).catch((err) =>
      Alert.alert("Error", "Unable to open Google Maps.")
    );
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}>
        {currentLocation && (
          <Marker coordinate={currentLocation} title='Your Location'>
            <MaterialCommunityIcons
              name='human-handsup'
              size={40}
              color='blue'
            />
          </Marker>
        )}
        {hospitals.map(
          (hospital) =>
            hospital.coordinates && (
              <Marker
                key={hospital.id}
                coordinate={hospital.coordinates}
                title={hospital.address}
                onPress={() =>
                  openGoogleMaps(
                    hospital.coordinates.latitude,
                    hospital.coordinates.longitude
                  )
                }>
                <MaterialCommunityIcons
                  name='hospital-marker'
                  size={32}
                  color='red'
                />
              </Marker>
            )
        )}
      </MapView>

      {/* Nút zoom in/zoom out */}
      <View style={styles.zoomControls}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (currentLocation) {
              setRegion({
                ...region,
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              });
            } else {
              Alert.alert("Error", "Unable to fetch current location.");
            }
          }}>
          <FontAwesome6 name='location-crosshairs' size={24} color='black' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={zoomIn}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={zoomOut}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  zoomControls: {
    position: "absolute",
    bottom: 20,
    right: 20,
    flexDirection: "column",
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    elevation: 5,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  recenterButtonContainer: {
    position: "absolute",
    bottom: 100,
    right: 20,
  },
  recenterButton: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    elevation: 5,
  },
  recenterButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HospitalPage;
