import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

function Profile() {
  const [data, setData] = useState({});
  const [isUpdating, setIsUpdating] = useState(false); // State to toggle update form visibility
  const [formData, setFormData] = useState({ name: "" }); // State for form data

  const token = localStorage.getItem("token");

  const getProductDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/auth/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(res.data.UserDeatil);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:8000/api/auth/update`,
        { name: formData.name },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("User data updated successfully!");
      setFormData({ name: "" });
      setIsUpdating(false); // Hide update form after successful update
      getProductDetails(); // Refresh the user data
    } catch (err) {
      console.error(err);
      alert("Failed to update user data.");
    }
  };

  return (
    <div className="container">
      <h1 style={{ marginTop: 50 }}>Profile</h1>
      {data ? (
        <div
          style={{
            backgroundColor: "#f6f1d5",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 20,
            borderRadius: 10,
            width: 500,
            padding: 20,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h4>
              Name: <span style={{ color: "blue" }}>{data.name}</span>
            </h4>
            <h4>
              Email: <span style={{ color: "blue" }}>{data.email}</span>
            </h4>
          </div>
          {isUpdating ? (
            <form
              style={{ display: "flex", justifyContent: "center", gap: 10 }}
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                name="name"
                placeholder="New Name"
                onChange={handleInputChange}
                value={formData.name}
              />
              <Button type="submit">Update</Button>
            </form>
          ) : (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button onClick={() => setIsUpdating(true)}>Update Data</Button>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Profile;
