import { API_URL } from "@env";

export const fetchMenuData = async () => {
  try {
    const response = await fetch(`${API_URL}/items`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Cannot fetch menu data:", error.message);
    return [];
  }
};

export const deleteProductFromAPI = async (id) => {
  try {
    await fetch(`${API_URL}/items/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Cannot delete", error);
  }
};

export const updateProductInAPI = async (id, updatedProduct) => {
  try {
    const response = await fetch(`${API_URL}/items/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    return await response.json();
  } catch (error) {
    console.error("Cannot update", error);
    throw error;
  }
};

export const addProductToAPI = async (newProduct) => {
  try {
    const response = await fetch(`${API_URL}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    return await response.json();
  } catch (error) {
    console.error("Cannot add", error);
    throw error;
  }
};
