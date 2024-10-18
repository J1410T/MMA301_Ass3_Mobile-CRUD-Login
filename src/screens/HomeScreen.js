import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  RefreshControl,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import { fetchMenuData, deleteProductFromAPI } from "../api/fetchMenuData";
import ProductItem from "../components/ProductItem";
import SearchBar from "../components/SearchBar";
import Toast from "react-native-toast-message";
import { useUser } from "../context/UserContext";

const HomeScreen = ({ navigation, favorites, setFavorites }) => {
  const { user } = useUser();
  const isAdmin = user?.isAdmin;
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);

  const loadProducts = async () => {
    const data = await fetchMenuData();
    setProducts(data);
    setFilteredProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadProducts();
    });
    return unsubscribe;
  }, [navigation]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  const toggleFavorite = (product) => {
    if (favorites.some((item) => item.id === product.id)) {
      setFavorites(favorites.filter((item) => item.id !== product.id));
    } else {
      setFavorites([...favorites, product]);
    }
  };

  const editProduct = (product) => {
    navigation.navigate("EditProduct", { product });
  };

  const deleteProduct = async (product) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this product?",
      [
        {
          text: "Cancel",
          onPress: () => hideMenu(),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            const updatedProducts = products.filter(
              (item) => item.id !== product.id
            );
            setProducts(updatedProducts);
            setFilteredProducts(updatedProducts);

            await deleteProductFromAPI(product.id);

            if (favorites.some((item) => item.id === product.id)) {
              setFavorites(favorites.filter((item) => item.id !== product.id));
            }

            Toast.show({
              text1: "Product Deleted",
              text2: `${product.name} has been deleted successfully.`,
              type: "success",
            });
          },
        },
      ],
      { cancelable: false }
    );
  };
  const onRefresh = async () => {
    setRefreshing(true);
    await loadProducts();
    setRefreshing(false);
  };

  const renderItem = ({ item, index }) => {
    const isLastOddItem =
      products.length % 2 !== 0 && index === products.length - 1;
    return (
      <ProductItem
        item={item}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        showOptions={() => {
          setSelectedProduct(item);
          setMenuVisible(true);
        }}
        isLastOddItem={isLastOddItem}
      />
    );
  };

  const hideMenu = () => setMenuVisible(false);

  return (
    <View style={{ flex: 1 }}>
      <SearchBar
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        navigation={navigation}
      />
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={1}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      {/* Show Add button only if user is admin */}
      {isAdmin && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("AddProduct")}
        >
          <Icon name="add-circle" size={30} color="white" />
        </TouchableOpacity>
      )}

      {/* Menu options for selected product */}
      {selectedProduct && (
        <Menu
          visible={menuVisible}
          anchor={<View style={{ marginTop: 30 }} />}
          onRequestClose={hideMenu}
        >
          <MenuItem
            onPress={() => {
              editProduct(selectedProduct);
              hideMenu();
            }}
          >
            Edit
          </MenuItem>
          <MenuItem
            onPress={() => {
              deleteProduct(selectedProduct);
              hideMenu();
            }}
            style={{ color: "red" }}
          >
            Delete
          </MenuItem>
          <MenuDivider />
          <MenuItem onPress={hideMenu}>Cancel</MenuItem>
        </Menu>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#708090",
    borderRadius: 30,
    padding: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
});

export default HomeScreen;
