import React, { useState, useEffect } from "react";
import "../../App.css";

const Stores = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    // Fetch stores when the component mounts
    fetch("https://apiforshm-production.up.railway.app/getAllStores")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setStores(data.stores);
        } else {
          console.error("Error fetching stores:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching stores:", error);
      });
  }, []);

  const handleDelete = async (storeId) => {
    try {
      const response = await fetch(
        `https://apiforshm-production.up.railway.app/deletestore/${storeId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        console.log("Store deleted successfully");
        window.location.reload();
      } else {
        console.error("Error deleting store:", data.message);
        // TODO: Handle the error, e.g., show an error message to the user
      }
    } catch (error) {
      console.error("Error deleting store:", error);
      // TODO: Handle the error, e.g., show an error message to the user
    }
  };
  const [store, setstore] = useState({
    storeName: "",
    storeId: "",
    // Add more fields as needed
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "storeId" && !/^\d*$/.test(value)) {
      alert("Store ID should only contain numbers");
      return; // Prevent further processing
    }
    setstore((prevStore) => ({
      ...prevStore,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(store);
    try {
      const response = await fetch(
        "https://apiforshm-production.up.railway.app/addStore",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(store), // Assuming `store` is the state containing your form data
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        console.log("store added successfully");
        window.location.reload();

        // TODO: Handle success, e.g., redirect or show a success message
      } else {
        console.error("Error adding store:", data.message);
        // TODO: Handle the error, e.g., show an error message to the user
      }
    } catch (error) {
      console.error("Error adding store:", error);
      // TODO: Handle the error, e.g., show an error message to the user
    }
  };
  const classDiv = {
    background: "rgba(255,255,255,0.3)",
  };
  return (
    <>
      <div
        className="card"
        style={{ minHeight: "96vh", backgroundColor: "#739072" }}
      >
        <div className="card-body">
          <div className="card" style={classDiv}>
            <div className="card-body">
              <form onSubmit={handleSubmit} className="row">
                {/* Left Column */}
                <div className="col-md-6">
                  <label>
                    Store Name:
                    <input
                      type="text"
                      name="storeName"
                      value={store.storeName}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    />
                  </label>
                  <br />
                  <label>
                    Store ID:
                    <input
                      type="text"
                      name="storeId"
                      value={store.storeId}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    />
                  </label>
                  <br />
                </div>

                {/* Submit Button */}
                <div className="col-12 mt-3 d-flex justify-content-end">
                  <button type="submit" className="btn btn-success">
                    Add Store
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="card mt-3" style={classDiv}>
            <div className="card-body">
              <table 
               
              >
               
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>ID</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {stores.map((store) => (
                    <tr key={store._id}>
                      <td>{store.storeName}</td>
                      <td>{store.storeId}</td>
                      <td>
                        <button
                          onClick={() => handleDelete(store.storeId)}
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
        </div>
      </div>
    </>
  );
};

export default Stores;
