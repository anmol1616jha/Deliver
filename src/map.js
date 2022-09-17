import React from 'react';
import {StyleSheet, View, Dimensions, Image, Text} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const Map = ({route, navigation}) => {
    const lat = parseFloat(route.params.lat);
    const long = parseFloat(route.params.long);
    const currentLtd = parseFloat(route.params.currentLtd);
    const currentLng = parseFloat(route.params.currentLng);
    const userData = route.params.userData;
    
    const [coordinates] = React.useState([
        {
          latitude: lat,
          longitude: long,
        },
        {
          latitude: currentLtd,
          longitude: currentLng
        },
      ]);
      
      return (
        <View style={styles.container}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: coordinates[0].latitude,
              longitude: coordinates[0].longitude,
              latitudeDelta: 10,
              longitudeDelta: 10,
            }}>
            <MapViewDirections
              origin={coordinates[0]}
              destination={coordinates[1]}
              apikey={'AIzaSyD--b5F5sLYCgFgttWa1A1FwMla5mNdAAw'}
              strokeWidth={4}
              strokeColor="#111111"
            />
            <Marker coordinate={coordinates[0]}>
            <View style={styles.marker}>

                <View style={styles.cardDescription}>
                  <Image source={require('../icons/img.png')} style={styles.restaurantImage} />

                  <View style={styles.namestar}>
                    <Text style={styles.restaurantName}>{userData?.title}</Text>
                    <View style={styles.ratingContainer}>
                      {Array.from({ length: Math.round(parseFloat(userData.rating)) }, (_, index) => <Image source={require('../icons/Star-fill.png')} style={styles.ratingImage} key={index} />)}
                      {Array.from({ length: (5 - Math.round(parseFloat(userData.rating))) }, (_, index) => <Image source={require('../icons/Star-empty.png')} style={styles.ratingImage} key={index} />)}
                    </View>
                  </View>
                </View>

                <Image source={require('../icons/shop-pin.png')} style={styles.restaurantLocation} resizeMode="contain" />
              </View>
            </Marker>

            <Marker coordinate={coordinates[1]}>
            <View style={styles.circle}>
            </View>
            </Marker>
          </MapView>
        </View>
      );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  restaurantName: {
    fontSize: 15,
    fontWeight: "600"
  },
  ratingContainer: {
    display: "flex",
    flexDirection: "row"
  },
  ratingImage: {
    width: 15,
    height:15
  },
  cardDescription: {
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5
  },
  namestar: {
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: 'column'
  },
  restaurantImage: {
    width: 50,
    height: 50,
    borderRadius: 50
  },
  restaurantLocation: {
    width: 50,
    height: 50
  },
  marker: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  circle: {
    width:30,
    height: 30,
    backgroundColor: "#fff",
    borderRadius: 50,
    borderWidth: 10,
    borderColor: "#00CAA7"
    
  }
});
export default Map;