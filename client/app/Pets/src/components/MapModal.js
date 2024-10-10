import React, { useState, useEffect, useRef } from "react";
import { Modal, View, StyleSheet, TouchableOpacity, Text } from "react-native";
import MapView, {
  Marker,
  Callout,
  Polyline,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import * as Location from "expo-location";
import axios from "axios";
import { GOOGLE_MAPS_API_KEY } from "../services/config/googleMapConfig";

const MapModal = ({ visible, onClose, destination, address }) => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showCallout, setShowCallout] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [route, setRoute] = useState(null);

  const [mapRegion, setMapRegion] = useState({
    latitude: destination.latitude,
    longitude: destination.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const mapRef = useRef(null);

  const originAddress =
    "No. 100, Wenhua Rd, Xitun District, Taichung City, 407";
  const destinationAddress = address;

  const handleMarkerPress = (address) => {
    setSelectedAddress(address);
    setShowCallout(true);
  };

  const handleFocusPress = () => {
    if (location && location.coords) {
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  const handleZoomInPress = () => {
    const newRegion = {
      ...mapRegion,
      latitudeDelta: mapRegion.latitudeDelta * 0.5,
      longitudeDelta: mapRegion.longitudeDelta * 0.5,
    };
    setMapRegion(newRegion);
    mapRef.current.animateToRegion(newRegion);
  };

  const handleZoomOutPress = () => {
    const newRegion = {
      ...mapRegion,
      latitudeDelta: mapRegion.latitudeDelta * 2,
      longitudeDelta: mapRegion.longitudeDelta * 2,
    };
    setMapRegion(newRegion);
    mapRef.current.animateToRegion(newRegion);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(originAddress);
    })();
  }, []);

  useEffect(() => {
    if (location && destinationAddress) {
      fetchRoute();
    }
  }, [location, destinationAddress]);

  const fetchRoute = async () => {
    if (!location || !destinationAddress) {
      return;
    }

    const origin = encodeURIComponent(originAddress);
    const dest = encodeURIComponent(destinationAddress);
    const apiKey = GOOGLE_MAPS_API_KEY;

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${dest}&key=${apiKey}`
      );

      if (
        response.data &&
        response.data.status === "OK" &&
        response.data.routes.length > 0
      ) {
        const points = decodePolyline(
          response.data.routes[0].overview_polyline.points
        );
        setRoute(points);
      } else if (response.data.status === "ZERO_RESULTS") {
        console.warn("No routes found for the given origin and destination.");
        setRoute(null); // Clear any existing route
      } else {
        console.error("Error fetching route:", response.data.error_message);
      }
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  const decodePolyline = (t, e = 5) => {
    let points = [];
    let index = 0,
      len = t.length;
    let lat = 0,
      lng = 0;

    while (index < len) {
      let b,
        shift = 0,
        result = 0;
      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }

    return points;
  };

  const handleGoPress = () => {
    if (location && destinationAddress) {
      fetchRoute();
    }
  };

  useEffect(() => {
    if (destination) {
      setMapRegion({
        latitude: destination.latitude,
        longitude: destination.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [destination, visible]);

  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    "Location Loading....."
  );
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);
  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);
  //check if location is enable or not
  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync(); //returns true or false
    if (!enabled) {
      //if not enable
      Alert.alert("Location not enabled", "Please enable your Location", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    } else {
      setLocationServicesEnabled(enabled); //store true into state
    }
  };
  //get current location
  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync(); //used for the pop up box where we give permission to use location
    console.log(status);
    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "Allow the app to use the location services",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
      );
    }

    //get current position lat and long
    const { coords } = await Location.getCurrentPositionAsync();
    console.log(coords);

    if (coords) {
      const { latitude, longitude } = coords;
      console.log(latitude, longitude);

      //provide lat and long to get the the actual address
      let responce = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      console.log(responce);
      //loop on the responce to get the actual result
      for (let item of responce) {
        let address = `${item.name} ${item.city} ${item.postalCode}`;
        setDisplayCurrentAddress(address);
      }
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType='slide'>
      <View style={styles.modalContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          region={mapRegion}
          onRegionChange={(region) => setMapRegion(region)}
          onRegionChangeComplete={(region) => setMapRegion(region)}>
          {location && location.coords && (
            <Marker
              key='currentLocation'
              coordinate={location.coords}
              onPress={() => handleMarkerPress(originAddress)}>
              <FontAwesome6 name='location-dot' size={30} color='blue' />
              {showCallout && selectedAddress === originAddress ? (
                <Callout>
                  <View style={styles.calloutContainer}>
                    <Text style={styles.calloutText}>Your Location</Text>
                  </View>
                </Callout>
              ) : null}
            </Marker>
          )}

          <Marker
            key='destination'
            coordinate={destination}
            title={address}
            onPress={() => handleMarkerPress(destinationAddress)}>
            <FontAwesome6 name='location-dot' size={30} color='red' />
          </Marker>

          {route && (
            <Polyline
              key='route'
              coordinates={route}
              strokeWidth={5}
              strokeColor='blue'
            />
          )}
        </MapView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonWrapper} onPress={onClose}>
            <FontAwesome name='close' size={24} color='#fff' />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonWrapper}
            onPress={handleZoomInPress}>
            <FontAwesome name='search-plus' size={24} color='#fff' />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonWrapper}
            onPress={handleZoomOutPress}>
            <FontAwesome name='search-minus' size={24} color='#fff' />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonWrapper}
            onPress={handleFocusPress}>
            <FontAwesome name='crosshairs' size={24} color='#fff' />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonWrapper}
            onPress={handleGoPress}>
            <FontAwesome name='arrow-right' size={24} color='#fff' />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 20,
  },
  calloutContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: "#ccc",
    minWidth: 300,
  },
  calloutText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  buttonContainer: {
    position: "absolute",
    top: 80, // Adjust this value to position below the close button
    right: 20,
    justifyContent: "space-between",
    alignItems: "center",
    height: 200, // Adjust the height to fit your buttons
  },
  buttonWrapper: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
  },
});

export default MapModal;
