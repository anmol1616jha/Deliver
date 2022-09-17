import React from "react";
import Geolocation from '@react-native-community/geolocation';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from "react-native";

const List = ({ navigation }) => {
  const [isLoading, setLoading] = React.useState(true);
  const [userData, onChangeUserData] = React.useState([]);

  const [currentLtd, setCurrentLtd] = React.useState();
  const [currentLng, setCurrentLng] = React.useState();

  const getRestaurantData = async () => {
    try {
      const response = await fetch(
        "http://205.134.254.135/~mobile/interview/public/api/restaurants_list"
      ).then(res => res.json())
      .then(resp => {
        onChangeUserData(resp.data);
      }
      )
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const mapRedirection = (lat, long, userData) => {

    navigation.navigate("Map", {
      lat: lat,
      long: long,
      currentLtd: currentLtd,
      currentLng: currentLng,
      userData: userData
    });
  }

  React.useEffect(() => {
    getRestaurantData();
    Geolocation.getCurrentPosition(info =>setCurrentLng(info.coords.longitude));
    Geolocation.getCurrentPosition(info =>setCurrentLtd(info.coords.latitude));
  }, []);

  return (
    <View style={styles.listContainer}>
      <View style={styles.listHeader}>
        <Text style={styles.listHeaderText}>Restaurant List</Text>
      </View>
      <View style={styles.listBody}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            style={styles.flatList}
            data={userData}
            keyExtractor={(id , index) => id}
            renderItem={({ item, index }) => (
              <TouchableOpacity key={index} style={styles.restaurantCard} onPress={()=>mapRedirection(item?.latitude, item?.longitude, item)}>
                <View style={styles.cardImage}>
                  <Image source={require('../icons/img.png')} style={styles.restaurantImage} />
                </View>

                <View style={styles.cardDescription}>
                  <Text style={styles.restaurantName}>{item?.title}</Text>
                  <View style={styles.ratingContainer}>
                    {Array.from({ length: Math.round(parseFloat(item.rating)) }, (_, index) => <Image source={require('../icons/Star-fill.png')} style={styles.ratingImage} key={index} />)}
                    {Array.from({ length: (5 - Math.round(parseFloat(item.rating))) }, (_, index) => <Image source={require('../icons/Star-empty.png')} style={styles.ratingImage} key={index} />)}
                  </View>
                </View>

                <View style={styles.cardLocation}>
                  <Image source={require('../icons/map.png')} style={styles.restaurantLocation} resizeMode="contain" />
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: "#F6F8FA",
    flex: 1
  },
  listHeader: {
    backgroundColor: "#00CAA7",
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  listHeaderText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#ffffff"
  },
  listBody: {
    flex: 1,
  },
  restaurantCard: {
    backgroundColor: "#ffffff",
    width: '90%',
    height: 70,
    alignSelf: 'center',
    marginVertical: 5,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 8,
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOpacity: 0.5,
    elevation: 6,
    shadowRadius: 10
  },
  restaurantImage: {
    width: 50,
    height: 50
  },
  cardDescription: {
    width: "60%"
  },
  cardLocation: {
    backgroundColor: '#00CAA7',
    width: 50,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
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
  restaurantLocation: {
    width: 30,
    height: 30
  }
});

export default List;
