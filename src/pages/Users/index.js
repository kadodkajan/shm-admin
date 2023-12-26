import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const User = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    user_name: "",
    user_id: "",
    user_auth: "",
    user_role: "",
    user_location: "",
  });
  const [loading, setLoading] = useState(true);
  
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users
        const usersResponse = await fetch(
          "https://apiforshm-production.up.railway.app/getAllUsers"
        );
        const usersData = await usersResponse.json();

        // Fetch stores
        const storesResponse = await fetch(
          "https://apiforshm-production.up.railway.app/getAllStores"
        );
        const storesData = await storesResponse.json();

        if (usersData.status === "success") {
          setUsers(usersData.users);
        } else {
          console.error("Error fetching users:", usersData.message);
        }

        if (storesData.status === "success") {
          setStores(storesData.stores);
        } else {
          console.error("Error fetching stores:", storesData.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Check if the input is for "user_id" and contains non-numeric characters
    if (name === "user_id" && !/^\d*$/.test(value)) {
      alert("User ID should only contain numbers");
      return; // Prevent further processing
    }

    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://apiforshm-production.up.railway.app/addUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        console.log("User added successfully");
        window.location.reload();
      } else {
        console.error("Error adding user:", data.message);
        // TODO: Handle the error, e.g., show an error message to the user
      }
    } catch (error) {
      console.error("Error adding user:", error);
      // TODO: Handle the error, e.g., show an error message to the user
    }
  };

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(
        `https://apiforshm-production.up.railway.app/deleteUser/${userId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        console.log("User deleted successfully");
        window.location.reload();
      } else {
        console.error("Error deleting user:", data.message);
        // TODO: Handle the error, e.g., show an error message to the user
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      // TODO: Handle the error, e.g., show an error message to the user
    }
  };
  

  return (
    <>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="row">
            {/* Left Column */}
            <div className="col-md-6">
              <label>
                User Name:
                <input
                  type="text"
                  name="user_name"
                  value={user.user_name}
                  onChange={handleInputChange}
                  className="form-control"
                  required

                />
              </label>
              <br />
              <label>
                User ID:
                <input
                  type="text"
                  name="user_id"
                  value={user.user_id}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </label>
              <br />
              <label>
                User Authentication:
                <input
                  type="text"
                  name="user_auth"
                  value={user.user_auth}
                  onChange={handleInputChange}
                  className="form-control"
                  required

                />
              </label>
            </div>

            {/* Right Column */}
            <div className="col-md-6">
              <br />
              <label>
                User Role:
                <select
                  name="user_role"
                  value={user.user_role}
                  onChange={handleInputChange}
                  className="form-control"
                  required

                >
                  <option value="">Select a Role</option>
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </select>
              </label>
              <br />

              <label>
                Store:
                <select
                  name="user_location"
                  value={user.user_location}
                  onChange={handleInputChange}
                  className="form-control"
                  required

                >
                  <option value="">Select a Store</option>
                  {stores.map((store) => (
                    <option key={store._id} value={store.storeName}>
                      {store.storeName}
                    </option>
                  ))}
                </select>
              </label>
              <br />
            </div>

            {/* Submit Button */}
            <div className="col-12 mt-3 d-flex justify-content-end">
              <button type="submit" className="btn btn-success">
                Add User
              </button>
            </div>
          </form>
        </div>
      </div>

      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="card mt-3">
            <div className="card-body">
              <h2 className="card-title">User List</h2>
              <table
                className="table rounded"
                style={{ overflow: "hidden", borderRadius: "15px" }}
              >
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>ID</th>
                    <th>Role</th>
                    <th>Location</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.user_name}</td>
                      <td>{user.user_id}</td>
                      <td>{user.user_role}</td>
                      <td>{user.user_location}</td>
                      <td>
                        <button
                          onClick={() => handleDelete(user.user_id)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default User;
