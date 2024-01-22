import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Form, Button,Row, Col ,Container} from "react-bootstrap";

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
      }
    } catch (error) {
      console.error("Error adding user:", error);
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
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  const classDiv = {
    background: "rgba(255,255,255,0.3)",
  };
  const customStyle = {
    backgroundColor: "#739072", 
  };
  
  return (
    <Container style={customStyle}>
  
        <div className="card" style={classDiv}>
          <div className="card-body">
            <Form onSubmit={handleSubmit} className="row">
              {/* Left Column */}
              <Col md={6}>
                <Form.Group controlId="formUserName">
                  <Form.Label>User Name:</Form.Label>
                  <Form.Control
                    type="text"
                    name="user_name"
                    value={user.user_name}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <br />
                <Form.Group controlId="formUserId">
                  <Form.Label>User ID:</Form.Label>
                  <Form.Control
                    type="text"
                    name="user_id"
                    value={user.user_id}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <br />
                <Form.Group controlId="formUserAuth">
                  <Form.Label>User Authentication:</Form.Label>
                  <Form.Control
                    type="text"
                    name="user_auth"
                    value={user.user_auth}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
  
              {/* Right Column */}
              <Col md={6}>
                <Form.Group controlId="formUserRole">
                  <Form.Label>User Role:</Form.Label>
                  <Form.Control
                    as="select"
                    name="user_role"
                    value={user.user_role}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a Role</option>
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                  </Form.Control>
                </Form.Group>
                <br />
                <Form.Group controlId="formUserLocation">
                  <Form.Label>Store:</Form.Label>
                  <Form.Control
                    as="select"
                    name="user_location"
                    value={user.user_location}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a Store</option>
                    {stores.map((store) => (
                      <option key={store._id} value={store.storeName}>
                        {store.storeName}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <br />
              </Col>
  
              {/* Submit Button */}
              <Col md={12} className="mt-3 d-flex justify-content-end">
                <Button type="submit" className="btn btn-success">
                  Add User
                </Button>
              </Col>
            </Form>
          </div>
        </div>
  
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="card mt-3" style={{ ...classDiv, marginBottom: "20px" }}>
            <div className="card-body">
            
                <div className="row">
                  {users.map((user) => (
                    <Col key={user._id} md={4} className="mb-3">
                      <Card>
                        <Card.Body>
                          <Row>
                            <Col>
                          <Card.Title>{user.user_name}</Card.Title>
                          </Col><Col>

                          <Card.Text>ID: {user.user_id}</Card.Text>
                          </Col>
                          </Row>
                          <Row>
                            <Col>
                          <Card.Text>Role: {user.user_role}</Card.Text>
                          </Col><Col>
                          <Card.Text>Store:{user.user_location}</Card.Text>
                          </Col>
                          </Row>
                         <br/>
                          <Button
                            onClick={() => handleDelete(user.user_id)}
                            className="btn btn-danger"
                          >
                            Delete
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
      
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
  
};

export default User;
