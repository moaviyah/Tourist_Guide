import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, {useState, useEffect} from "react";
import { BACKGROUND, PRIMARY } from "../colors";
import Icon from "react-native-vector-icons/FontAwesome";
import { getDatabase, ref, onValue, off } from 'firebase/database';

const API_KEY = 'AIzaSyB9zgTdLN3KTUB9fJWDiAwDyE2QWQUX5qk';

const CreateTrips = ({ navigation }) => {
  const [endedTrips, setEndedTrips] = useState([]);
  useEffect(() => {
    const db = getDatabase();
    const endedTripsRef = ref(db, 'completedTrips');

    // Listen for changes in the database
    onValue(endedTripsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const endedTripsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        console.log('ended',endedTripsArray)
        setEndedTrips(endedTripsArray);
      }
    });

    // Cleanup function
    return () => {
      // Detach the listener when the component unmounts
      off(endedTripsRef);
    };
  }, []);
  const categories = [
    { id: 1, title: "Lakes", imageSource: require("../assets/lake.png") },
    { id: 2, title: "Sea", imageSource: require("../assets/sea.png") },
    {
      id: 3,
      title: "Mountain",
      imageSource: require("../assets/mountain.png"),
    },
    { id: 4, title: "Forests", imageSource: require("../assets/forest.png") },
  ];

  const CategoryItem = ({ title, imageSource }) => {
    return (
      <View style={styles.categoryItem}>
        <Image source={imageSource} style={styles.categoryImage} />
        <Text style={styles.categoryTitle}>{title}</Text>
      </View>
    );
  };

  const getImageUrl = (photo_reference, width, height) => {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${width}&maxheight=${height}&photoreference=${photo_reference}&key=${API_KEY}`;
  };

  const TripItem = ({
    name,
    imageSource,
    rating,
    location,
    price,
    isFavourite,
    description
  }) => {
    return (
      <View style={styles.tripItem}>
        <Image source={{uri:getImageUrl(imageSource.photo_reference, imageSource.width, imageSource.height)}} style={styles.tripImage} />
        <Text style={styles.tripName}>{name}</Text>
        <View style={{flexDirection:'row'}}>
        <Text style={styles.tripRating}>Rating: {rating}</Text>
        <Icon name="star" size={10} style={{alignSelf:'center'}} color={'grey'}/>
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
        >
          <Icon name="map-marker" size={16} />
          <Text style={styles.tripLocation}>{location}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{fontSize:11, marginTop:5}}>
            {description}
          </Text>
          <Icon
            name={isFavourite ? "heart" : "heart-o"}
            size={24}
            color={isFavourite ? "red" : "#333"}
          />
          
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.searchButton} onPress={() => {navigation.navigate('NewTrip')}}>
        <Image source={require('../assets/create.png')} style={{height:30, width:30}}/>
        <Text
          style={{
            fontWeight: "500",
            color: "grey",
            fontSize: 16,
          }}
        >
          Create Your Trip
        </Text>
        <Image source={require('../assets/add.png')} style={{height:25, width:25}}/>
      </TouchableOpacity>
      <Text
        style={{
          fontWeight: "500",
          fontSize: 18,
          marginVertical: 15,
          marginHorizontal: 5,
        }}
      >
        Categories
      </Text>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScrollView}
        >
          {categories.map((category) => (
            <CategoryItem
              key={category.id}
              title={category.title}
              imageSource={category.imageSource}
            />
          ))}
        </ScrollView>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontWeight: "500",
            fontSize: 18,
            marginVertical: 15,
            marginHorizontal: 5,
          }}
        >
          Top Destinations
        </Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {endedTrips && endedTrips.map((trips) => (
          <TripItem
            key={trips.id}
            name={trips.address}
            imageSource={trips.image}
            rating={trips.rating}
            location={trips.lat}
            isFavourite={trips.isFavourite}
            description={trips.description}
          />

        ))}
      </ScrollView>
    </View>
  );
};

export default CreateTrips;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY,
    paddingVertical: 50,
    paddingHorizontal: 15,
  },
  searchButton: {
    paddingVertical: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent:'space-between'
  },
  categoriesText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  categoryScrollView: {
    flexDirection: "row",
    paddingBottom: 10,
    justifyContent: "space-between",
    height: 60,
  },
  categoryItem: {
    marginRight: 15,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    paddingHorizontal: 20,
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: "center",
  },
  categoryImage: {
    borderRadius: 10,
    height: 24,
    width: 24,
  },
  categoryTitle: {
    fontSize: 16,
    marginLeft: 5,
  },
  tripItem: {
    marginRight: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    width: 200,
    padding: 10,
    height: 250,
  },
  tripImage: {
    width: "100%",
    height: 120,
    borderRadius: 10,
  },
  tripName: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 5,
  },
  tripRating: {
    color: "grey",
  },
  tripLocation: {
    marginLeft: 5,
  },
  tripPrice: {
    fontWeight: "bold",
    color: "#008FA0",
  },
});
