import axios from "axios";

export async function createPost(formData, token) {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/blogs",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    return { error: error.response?.data?.message || "An error occurred" };
  }
}
