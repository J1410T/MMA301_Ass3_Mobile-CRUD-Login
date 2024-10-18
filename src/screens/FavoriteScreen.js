import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, Text, RefreshControl } from "react-native";
import FavoriteItem from "../components/FavoriteItem";
import { fetchMenuData } from "../api/fetchMenuData";

const FavoriteScreen = ({ favorites, setFavorites }) => {
  const [refreshing, setRefreshing] = useState(false);

  const loadFavorites = async () => {
    const allProducts = await fetchMenuData();
    const updatedFavorites = allProducts.filter((product) =>
      favorites.some((fav) => fav.id === product.id)
    );
    setFavorites(updatedFavorites);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadFavorites();
    setRefreshing(false);
  };

  const removeFavorite = (product) => {
    setFavorites(favorites.filter((item) => item.id !== product.id));
  };

  const renderItem = ({ item, index }) => {
    const isLastOddItem =
      favorites.length % 2 !== 0 && index === favorites.length - 1;

    return (
      <FavoriteItem
        item={item}
        removeFavorite={removeFavorite}
        isLastOddItem={isLastOddItem}
      />
    );
  };

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Empty List</Text>
    </View>
  );

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      numColumns={1}
      ListEmptyComponent={renderEmptyComponent}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

const styles = StyleSheet.create({
  row: {
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
  },
});

export default FavoriteScreen;
