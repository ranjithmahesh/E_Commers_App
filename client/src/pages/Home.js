import axios from "axios";
import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import ProductCard from "../components/card";

function Home() {
  const [data, setData] = useState([]);

  const fetchApi = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/task/all");

      setData(response.data.allProductDetails);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div className="container">
      <h1>All Product</h1>
      <Row xs={1} md={2} xl={4} className="gy-5 gx-5">
        {data.length > 0 ? (
          data.map((item, index) => (
            <Col key={index}>
              <ProductCard data={item} />
            </Col>
          ))
        ) : (
          <p
            style={{
              width: 500,
              height: 250,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 300,
            }}
          >
            No products found.
          </p>
        )}
      </Row>
    </div>
  );
}

export default Home;
