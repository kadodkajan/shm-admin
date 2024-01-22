import React, { useState, useEffect } from "react";
import { Card, Form, Button, Col, Table, Container, Row } from "react-bootstrap"; // Added Row import
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
          alert("Error fetching stores");
        }
      })
      .catch((error) => {
        console.error("Error fetching stores:", error);
        alert("Error fetching stores");
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
          alert("Store deleted successfully");
        window.location.reload();
      } else {
        console.error("Error deleting store:", data.message);
alert("Error deleting store");    }
    } catch (error) {
      console.error("Error deleting store:", error);
alert("Error deleting store");  }
  };

  const [store, setstore] = useState({
    storeName: "",
    storeId: "",
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
    try {
      const response = await fetch(
        "https://apiforshm-production.up.railway.app/addStore",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(store),
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        alert("store added successfully");
        window.location.reload();
    } else {
        console.error("Error adding store:", data.message);
alert("Error adding store");    }
    } catch (error) {
      console.error("Error adding store:", error);
alert("Error adding store");  }
  };

  const classDiv = {
    background: "rgba(255,255,255,0.3)",
  };
  const customStyle = {
    backgroundColor: "#739072",
  };

  return (
    <Container style={customStyle}>
      <Card className="card" style={classDiv}>
        <Card.Body>
          <Form onSubmit={handleSubmit} className="row">
            {/* Left Column */}
            <Col md={6}>
              <Form.Group controlId="formStoreName">
                <Form.Label>Store Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="storeName"
                  value={store.storeName}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </Form.Group>
              <br />
              <Form.Group controlId="formStoreId">
                <Form.Label>Store ID:</Form.Label>
                <Form.Control
                  type="text"
                  name="storeId"
                  value={store.storeId}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </Form.Group>
              <br />
            </Col>

            {/* Submit Button */}
            <Col md={12} className="mt-3 d-flex justify-content-end">
              <Button type="submit" className="btn btn-success" >
                Add Store
              </Button>
            </Col>
          </Form>
        </Card.Body>
      </Card>

      <Card className="card mt-3" style={{ ...classDiv, marginBottom: "20px" }}>
        <Card.Body>
          <Row> {/* Added Row component */}
            {stores.map((store) => (
              <Col key={store._id} md={4} className="mb-3">
                <Card>
                  <Card.Body>
                    <Row>
                      <Col>
                        <Card.Title>{store.storeName}</Card.Title>
                      </Col>
                      <Col>
                        <Card.Text>ID: {store.storeId}</Card.Text>
                      </Col>
                    </Row>

                    <br />
                    <Button
                      onClick={() => handleDelete(store.storeId)}
                      className="btn btn-danger"
                    >
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Stores;
