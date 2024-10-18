import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { API_URL } from "@env";

const ProfileScreen = ({ navigation }) => {
  const { user } = useUser();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log("API_URL:", API_URL);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_URL}/accounts/${user.id}`);
        setProfileData(response.data);
      } catch (error) {
        setError("Failed to load user data");
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  const handleLogout = () => {
    navigation.replace("Login");
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#708090" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!profileData) {
    return (
      <View style={styles.container}>
        <Text>No user data found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.yingbao}>颖宝使用的珠宝</Text> */}
      <Image source={{ uri: profileData.image }} style={styles.image} />
      <Text style={styles.username}>{profileData.username}</Text>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f4f8",
  },
  yingbao: {
    marginBottom: 20,
    fontSize: 28,
    fontWeight: "light",
    color: "#2c3e50",
  },
  image: {
    width: "60%",
    height: 250,
    marginBottom: 10,
    borderRadius: 10,
    borderColor: "#D3D3D3",
    borderWidth: 1,
  },
  username: {
    marginBottom: 20,
    fontSize: 28,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  logoutButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  logoutButton: {
    borderRadius: 10,
    backgroundColor: "#708090",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    marginTop: 10,
    width: "35%",
    alignSelf: "center",
    overflow: "hidden",
  },
  errorText: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
  },
});

export default ProfileScreen;
