// Home.js
import React, { useState, useEffect } from "react";

function Home() {
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const classDiv = {
    background: "rgba(255,255,255,0.3)",
  };

  return (
    <div className="card" style={{ minHeight: "96vh", backgroundColor: "#739072" }}>
      <div className="card-body">
        <div className="card" style={classDiv}>
          <div className="card-body">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Users</h5>
                <p className="card-text">Total Users: {users.length}</p>
              </div>
            </div>
            <div className="card mt-3">
              <div className="card-body">
                <h5 className="card-title">Stores</h5>
                <p className="card-text">Total Stores: {stores.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
