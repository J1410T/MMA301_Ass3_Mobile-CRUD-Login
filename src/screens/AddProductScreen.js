import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { addProductToAPI } from "../api/fetchMenuData";
import Icon from "react-native-vector-icons/Ionicons";
import Toast from "react-native-toast-message";

const AddProductScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const addProduct = async () => {
    if (name === "" || price === "" || image === "") {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please fill all fields.",
      });
      return;
    }

    const newProduct = {
      name,
      price: parseFloat(price),
      image,
    };

    try {
      await addProductToAPI(newProduct);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Product added successfully!",
      });
      navigation.goBack();
    } catch (error) {
      console.error("Error: ", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Adding failed. Please try again later.",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Product</Text>

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

      <TouchableOpacity style={styles.button} onPress={addProduct}>
        <Text style={styles.buttonText}>Add Product</Text>
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

export default AddProductScreen;
