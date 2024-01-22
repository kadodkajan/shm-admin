import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";

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
  const customStyle = {
    backgroundColor: "#739072",
    height: "100vh",
  };
  const classDiv = {
    background: "rgba(255,255,255,0.3)",
  };
  return (
    <Container style={customStyle}>
      
        <Card className="card" style={classDiv}>
          <Card.Body>

            <Row>
          <Col md={6}>
            <Card className="mt-3">
              <Card.Body>
                <Card.Title>Users</Card.Title>
                <Card.Text>Total Users: {users.length}</Card.Text>
              </Card.Body>
            </Card>
            </Col>
            <Col md={6}>

            <Card className="mt-3">
              <Card.Body>
                <Card.Title>Stores</Card.Title>
                <Card.Text>Total Stores: {stores.length}</Card.Text>
              </Card.Body>
            </Card>
            </Col>
            </Row>
          </Card.Body>
        </Card>
    
    </Container>
  );
}

export default Home;
