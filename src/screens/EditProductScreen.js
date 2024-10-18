import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { updateProductInAPI } from "../api/fetchMenuData";
import Icon from "react-native-vector-icons/Ionicons";
import Toast from "react-native-toast-message";

const EditProduct = ({ route, navigation }) => {
  const { product } = route.params;

  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price.toString());
  const [image, setImage] = useState(product.image);

  const updateProduct = async () => {
    const parsedPrice = parseFloat(price);

    // Validate price
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      Toast.show({
        type: "error",
        text1: "Invalid Price",
        text2: "Please enter a valid price greater than or equal to 0.",
      });
      return;
    }

    const updatedProduct = {
      ...product,
      name,
      price: parsedPrice,
      image,
    };

    try {
      await updateProductInAPI(product.id, updatedProduct);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Update successfully!!",
      });
      navigation.goBack();
    } catch (error) {
      console.error("Error: ", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Update failed. Please try again later.",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Product</Text>

      <View style={styles.inputContainer}>
        <Icon name="pencil" size={20} color="#888" />
        <TextInput
          style={styles.input}
          placeholder="Product Name"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="pricetag" size={20} color="#888" />
        <TextInput
          style={styles.input}
          placeholder="Price"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="image" size={20} color="#888" />
        <TextInput
          style={styles.input}
          placeholder="Image URL"
          value={image}
          onChangeText={setImage}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={updateProduct}>
        <Text style={styles.buttonText}>Update Product</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#708090",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default EditProduct;
