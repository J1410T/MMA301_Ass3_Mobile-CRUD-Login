import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const formatPrice = (price) => {
  return price.toLocaleString("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const FavoriteItem = ({ item, removeFavorite }) => {
  return (
    <View style={[styles.itemContainer]}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>$ {formatPrice(item.price)}</Text>

      <TouchableOpacity
        onPress={() => removeFavorite(item)}
        style={styles.removeIcon}
      >
        <Icon name="close" size={30} color="red" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 10,
    marginBottom: 20,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    maxWidth: 320,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    alignSelf: "center",
  },
  image: {
    width: "70%",
    height: 220,
    marginBottom: 10,
    borderRadius: 10,
    borderColor: "#D3D3D3",
    borderWidth: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 5,
    color: "#333",
  },
  price: {
    fontSize: 16,
    color: "#FF4500",
    textAlign: "center",
    fontWeight: "bold",
  },

  removeIcon: {
    position: "absolute",
    top: 5,
    right: 10,
    backgroundColor: "#FFF",
    padding: 5,
  },
});

export default FavoriteItem;
