import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useUser } from "../context/UserContext";

const formatPrice = (price) => {
  return price.toLocaleString("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const ProductItem = ({ item, favorites, toggleFavorite, showOptions }) => {
  const { user } = useUser();
  const isAdmin = user?.isAdmin;
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        onPress={() => toggleFavorite(item)}
        style={styles.favoriteIcon}
      >
        <Icon
          name={
            favorites.some((favItem) => favItem.id === item.id)
              ? "heart"
              : "heart-outline"
          }
          size={24}
          color={
            favorites.some((favItem) => favItem.id === item.id) ? "red" : "gray"
          }
        />
      </TouchableOpacity>

      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>$ {formatPrice(item.price)}</Text>

      {isAdmin && (
        <TouchableOpacity
          onPress={() => showOptions(item)}
          style={styles.optionsIcon}
        >
          <Icon name="ellipsis-vertical" size={24} color="black" />
        </TouchableOpacity>
      )}
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
  favoriteIcon: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
  },
  optionsIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
});

export default ProductItem;
